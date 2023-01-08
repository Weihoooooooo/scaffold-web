<template>
  <div class="app-container">
    <sw-back-top-and-bottom />
    <div class="head-container">
      <sw-search-date-picker-operation />
      <sw-button-operation :permission="permission" />
    </div>
    <sw-dialog
      :visible="dialog"
      :close-on-click-modal="false"
      :before-close="closeVerifyAccount"
      append-to-body
      width="520px"
      top="150px"
    >
      <template #title>
        验证密码
      </template>
      <template #content>
        <el-form
          ref="pwdForm"
          label-width="75px"
          :model="pwd"
          style="padding-right: 25px"
          label-suffix=":"
          @submit.native.prevent="handlerOpenVerifyAccount"
        >
          <el-form-item
            label="密码"
            prop="password"
            :rules="[
              { required: true, message: '密码不能为空！', trigger: 'blur' }
            ]"
          >
            <el-input
              ref="pass"
              v-model="pwd.password"
              type="password"
              clearable
              placeholder="请输入密码"
            />
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <el-button round @click="closeVerifyAccount">{{ $t('cancel') }}</el-button>
        <el-button type="primary" round @click.native.prevent="handlerOpenVerifyAccount">{{ $t('ok') }}</el-button>
      </template>
    </sw-dialog>
    <sw-dialog
      :visible="crud.status.cu > 0"
      :before-close="crud.cancelCU"
      :close-on-click-modal="false"
      append-to-body
      width="720px"
      top="70px"
    >
      <template #title>
        <div>{{ crud.status.title }}</div>
      </template>
      <template #content>
        <el-form
          ref="form"
          inline
          :model="form"
          label-suffix=":"
          label-width="120px"
          :rules="rules"
        >
          <el-form-item v-if="crud.status.add === 1" label="业主电话" prop="phone">
            <el-input v-model="form.phone" clearable placeholder="业主电话" />
          </el-form-item>
          <el-form-item v-if="crud.status.edit === 1" label="业主姓名" prop="ownerName">
            <el-input v-model="form.ownerName" clearable placeholder="业主姓名" />
          </el-form-item>
          <el-form-item label="建筑栋号" prop="buildingNum">
            <sw-select
              v-model="form.buildingNum"
              :options="buildingList"
              :enums="false"
              placeholder="建筑栋号"
            />
          </el-form-item>
          <el-form-item label="梯户独立编号" prop="identityId">
            <el-input v-model="form.identityId" clearable placeholder="梯户独立编号" />
          </el-form-item>
          <el-form-item label="面积" prop="area">
            <el-input-number
              v-model="form.area"
              controls-position="right"
              :min="1"
              :max="300"
              :precision="2"
              step="0.01"
            />
            <el-tag type="info" size="mini">m&sup2;</el-tag>
          </el-form-item>
          <el-form-item label="水表读数" prop="meterWater">
            <el-input-number
              v-model="form.meterWater"
              placeholder="水表读数"
              :min="0.00"
              :precision="2"
              step="0.01"
            />
            <el-tag type="info" size="mini">m&sup3;</el-tag>
          </el-form-item>
          <el-form-item label="电表读数" prop="meterElectric">
            <el-input-number
              v-model="form.meterElectric"
              placeholder="电表读数"
              :min="0.00"
              :precision="2"
              step="0.01"
            />
            <el-tag type="info" size="mini">kwh</el-tag>
          </el-form-item>
          <el-form-item label="常住人数" prop="peopleNumber">
            <el-input-number
              v-model="form.peopleNumber"
              placeholder="常住人数"
              :min="0"
              step="1"
            />
          </el-form-item>
          <el-form-item label="是否已居住" prop="isLive">
            <sw-select
              v-model="form.isLive"
              :options="$enum.getValueDescList('IsLiveEnum')"
              placeholder="请选择"
            />
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <el-button round @click="crud.cancelCU">{{ $t('cancel') }}</el-button>
        <el-button :loading="crud.cu === 2" type="primary" round @click="crud.submitCU">{{ $t('ok') }}</el-button>
      </template>
    </sw-dialog>
    <sw-table
      ref="scaffoldTable"
      :table-header="tableHeader.household"
      :table-data="crud.data"
      :crud="crud"
      :last-col-permission="['root','Household:update','Household:delete']"
    >
      <template slot="isLive" slot-scope="scope">
        <el-tag v-if="scope.row.isLive === 1" size="mini" type="success">{{ $enum.getDescByValue('IsLiveEnum',scope.row.isLive) }}</el-tag>
        <el-tag v-else size="mini" type="danger">{{ $enum.getDescByValue('IsLiveEnum',scope.row.isLive) }}</el-tag>
      </template>
      <template slot="identityId" slot-scope="scope">
        <span style="color: black;font-weight: bold">{{ scope.row.identityId }}</span>
      </template>
      <template slot="area" slot-scope="scope">
        <span style="color: red">{{ scope.row.area }}&nbsp;</span><el-tag type="info" size="mini">m&sup2;</el-tag>
      </template>
      <template slot="lastMeterWater" slot-scope="scope">
        <span style="color: red">{{ scope.row.lastMeterWater }}&nbsp;</span><el-tag type="info" size="mini">m&sup3;</el-tag>
      </template>
      <template slot="lastMeterElectric" slot-scope="scope">
        <span style="color: red">{{ scope.row.lastMeterElectric }}&nbsp;</span><el-tag type="info" size="mini">kwh</el-tag>
      </template>
      <template slot="data-operate" slot-scope="scope">
        <sw-update-delete-operation
          :permission="permission"
          :data="scope.row"
        />
      </template>
    </sw-table>
  </div>
</template>

<script>
import { add, edit, del } from '@/api/commons/household'
import { mapGetters } from 'vuex'
import CRUD, { crud, form, header, presenter } from '@/utils/crud'
import { getById, verifyAccount } from '@/api/owner/owner'
import { encrypt } from '@/utils/rsaEncrypt'
import { getBuildingNums } from '@/api/xiaoqu/building'

const defaultCrud = CRUD({
  url: '/households',
  title: '梯户信息表',
  crudMethod: { add, edit, del }
})

const defaultForm = {
  id: null,
  ownerId: null,
  phone: '',
  buildingId: null,
  identityId: '',
  area: 0.00,
  meterWater: 0.00,
  meterElectric: 0.00,
  peopleNumber: 0,
  isLive: null,
  ownerName: ''
}
export default {
  name: 'Household',
  mixins: [
    presenter(defaultCrud),
    crud(),
    header(),
    form(defaultForm)
  ],
  data() {
    return {
      flag: false,
      dialog: false,
      buildingList: [],
      pwd: {
        password: ''
      },
      permission: {
        add: ['root', 'Household:add'],
        edit: ['root', 'Household:update'],
        del: ['root', 'Household:delete']
      },
      rules: {
        identityId: [
          { required: true, message: '梯户独立编号不能为空', trigger: 'blur' }
        ],
        area: [
          { required: true, message: '面积不能为空', trigger: 'blur' }
        ],
        peopleNumber: [
          { required: true, message: '常住人数不能为空', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '业主手机号不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['tableHeader'])
  },
  created() {
    this.init()
  },
  methods: {
    closeVerifyAccount() {
      this.dialog = false
      this.flag = false
      this.pwd.password = ''
      this.$refs.pwdForm.resetFields()
      this.crud.cancelCU()
    },
    [CRUD.HOOK.beforeToEdit](crud, form) {
      if (!this.flag) {
        this.dialog = true
        this.$nextTick(() => {
          this.$refs.pass.focus()
        })
        this.data = form
        return false
      } else {
        getById(form.ownerId).then(res => {
          this.crud.form.ownerName = res.data.name
        })
      }
    },
    handlerOpenVerifyAccount() {
      this.$refs.pwdForm.validate((valid) => {
        if (valid) {
          verifyAccount(encrypt(this.pwd.password)).then(res => {
            if (res.data === 'Password error!') {
              this.flag = false
              this.$notify({
                title: '错误',
                message: '密码错误!',
                type: 'error'
              })
            } else {
              this.pwd.password = ''
              this.$refs.pwdForm.resetFields()
              this.dialog = false
              this.flag = true
              this.crud.toEdit(this.data)
            }
          })
        } else {
          return false
        }
      })
    },
    init() {
      getBuildingNums().then(res => {
        this.buildingList = res.data
      })
    }
  }
}
</script>
