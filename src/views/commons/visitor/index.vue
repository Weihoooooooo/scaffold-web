<template>
  <div class="app-container">
    <sw-back-top-and-bottom />
    <div class="head-container">
      <sw-search-date-picker-operation input-placeholder="请输入访客姓名或电话" />
      <sw-button-operation :permission="permission" />
    </div>
    <sw-dialog
      :visible="crud.status.cu > 0"
      :before-close="crud.cancelCU"
      :close-on-click-modal="false"
      append-to-body
      width="400px"
      top="70px"
    >
      <template #title>
        <div>{{ crud.status.title }}</div>
      </template>
      <template #content>
        <el-form
          ref="form"
          :model="form"
          label-suffix=":"
          label-width="120px"
          :rules="rules"
        >
          <el-form-item label="到访楼宇" prop="buildingId">
            <sw-select
              v-model="form.buildingId"
              :options="buildingNums"
              placeholder="请选择楼宇"
              :enums="false"
              @change="handlerChoice"
            />
          </el-form-item>
          <el-form-item label="到访梯户" prop="householdId">
            <sw-select
              v-model="form.householdId"
              :options="households"
              placeholder="请选择梯户"
              :enums="false"
            />
          </el-form-item>
          <el-form-item label="访客姓名" prop="name">
            <el-input
              v-model="form.name"
              clearable
              placeholder="访客姓名"
            />
          </el-form-item>
          <el-form-item label="访客电话" prop="phone">
            <el-input
              v-model="form.phone"
              clearable
              placeholder="访客电话"
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
      :table-header="tableHeader.visitor"
      :table-data="crud.data"
      :crud="crud"
      :last-col-permission="['root','Visitor:update','Visitor:delete']"
    >
      <template slot="householdVO.identityId" slot-scope="scope">
        <span>{{ scope.row.householdVO.identityId }}</span>
      </template>
      <template slot="householdVO.isLive" slot-scope="scope">
        <el-tag v-if="scope.row.isLive === 1" size="mini" type="success">{{ $enum.getDescByValue('IsLiveEnum',scope.row.householdVO.isLive) }}</el-tag>
        <el-tag v-else size="mini" type="danger">{{ $enum.getDescByValue('IsLiveEnum',scope.row.householdVO.isLive) }}</el-tag>
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
import { add, edit, del } from '@/api/commons/visitor'
import { mapGetters } from 'vuex'
import CRUD, { crud, form, header, presenter } from '@/utils/crud'
import { getBuildingNums } from '@/api/xiaoqu/building'
import { getListForBuildingId } from '@/api/commons/household'
import { validPhone } from '@/utils/validate'

const defaultCrud = CRUD({
  url: '/visitors',
  title: '访客信息',
  crudMethod: { add, edit, del }
})

const defaultForm = {
  id: null,
  name: '',
  phone: '',
  buildingId: null,
  householdId: null
}
export default {
  name: 'Visitor',
  mixins: [
    presenter(defaultCrud),
    crud(),
    header(),
    form(defaultForm)
  ],
  data() {
    return {
      buildingNums: [],
      households: [],
      permission: {
        add: ['root', 'Visitor:add'],
        edit: ['root', 'Visitor:update'],
        del: ['root', 'Visitor:delete']
      },
      rules: {
        name: [
          { required: true, message: '访客姓名不能为空', trigger: 'blur' }
        ],
        phone: [
          { required: true, trigger: 'blur', validator: validPhone }
        ],
        householdId: [
          { required: true, trigger: 'blur', message: '该项不能为空' }
        ],
        buildingId: [
          { required: true, trigger: 'blur', message: '该项不能为空' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['tableHeader'])
  },
  created() {
    this.getBuildingNums()
  },
  methods: {
    getBuildingNums() {
      getBuildingNums().then(res => {
        this.buildingNums = res.data
      })
    },
    handlerChoice(buildingId) {
      if (this.crud.status.add === 1) {
        getListForBuildingId(buildingId).then(res => {
          this.households = res.data
        })
      }
      if (this.crud.status.edit === 1) {
        this.crud.form.householdId = null
        getListForBuildingId(buildingId).then(res => {
          this.households = res.data
        })
      }
    },
    [CRUD.HOOK.beforeToEdit](crud, form) {
      getListForBuildingId(form.buildingId).then(res => {
        this.households = res.data
      })
    }
  }
}
</script>
