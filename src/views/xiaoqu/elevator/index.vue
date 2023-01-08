<template>
  <div class="app-container">
    <sw-back-top-and-bottom />
    <el-tabs v-model="activeTag">
      <el-tab-pane label="电梯列表" name="elevator">
        <div class="head-container">
          <sw-search-date-picker-operation
            picker-width="200"
            :show-create-time-picker="false"
            @reset="reset"
          >
            <template #center>
              <sw-select
                v-if="elevatorSelector"
                v-model="timeType"
                :options="timeOptions"
                :enums="false"
                placeholder="选择查找的时间类型"
                width="200"
              />
              <el-date-picker
                v-model="query[timeType]"
                :default-time="['00:00:00','23:59:59']"
                type="daterange"
                range-separator="-"
                value-format="yyyy-MM-dd HH:mm:ss"
                :start-placeholder="String($t('crud.searchDatePickerOperation.startTime'))"
                :end-placeholder="String($t('crud.searchDatePickerOperation.endTime'))"
                align="left"
                style="width: 300px"
              />
            </template>
            <template #right>
              <sw-select
                v-if="elevatorSelector"
                v-model="query.buildingId"
                :options="buildingNums"
                :enums="false"
                placeholder="请选择楼宇栋号"
                width="200"
                @change="crud.toQuery"
              />
            </template>
          </sw-search-date-picker-operation>
          <sw-button-operation :permission="permissions" />
        </div>
        <sw-dialog
          :visible="maintainDialog"
          :close-on-click-modal="false"
          append-to-body
          :before-close="closeMaintainDialog"
          width="400px"
        >
          <template #title>
            <div>维护登记</div>
          </template>
          <template #content>
            <el-form
              ref="maintainForm"
              :rules="maintainRules"
              :model="maintain"
              label-suffix=":"
            >
              <el-form-item label="维护人" prop="maintainPeople">
                <el-input v-model="maintain.maintainPeople" clearable placeholder="维护人" />
              </el-form-item>
              <el-form-item label="维护人电话" prop="maintainPeoplePhone">
                <el-input v-model="maintain.maintainPeoplePhone" clearable placeholder="维护人电话" />
              </el-form-item>
            </el-form>
          </template>
          <template #footer>
            <el-button round @click="closeMaintainDialog">{{ $t('cancel') }}</el-button>
            <el-button :loading="maintainLoading" round type="primary" @click="submitMaintain">{{ $t('ok') }}</el-button>
          </template>
        </sw-dialog>
        <sw-dialog
          :visible="crud.status.cu > 0"
          :before-close="crud.cancelCU"
          :close-on-click-modal="false"
          append-to-body
        >
          <template #title>
            <div>{{ crud.status.title }}</div>
          </template>
          <template #content>
            <el-form
              ref="form"
              inline
              :model="form"
              :rules="rules"
              label-suffix=":"
              label-position="top"
              style="padding-left: 30px"
            >
              <el-form-item label="电梯编号" prop="identityId">
                <el-input
                  ref="first"
                  v-model="form.identityId"
                  clearable
                  placeholder="电梯编号"
                />
              </el-form-item>
              <el-form-item label="所属楼宇" prop="buildingId">
                <sw-select
                  v-model="form.buildingId"
                  :options="buildingNums"
                  placeholder="请选择楼宇"
                  :enums="false"
                />
              </el-form-item>
              <el-form-item label="核载人数" prop="numberOfPeople">
                <el-input-number
                  v-model="form.numberOfPeople"
                  controls-position="right"
                  :min="1"
                  :max="99"
                />
              </el-form-item>
              <el-form-item label="核载重量(kg)" prop="numberOfWeight">
                <el-input-number
                  v-model="form.numberOfWeight"
                  controls-position="right"
                  :min="0.01"
                  :precision="2"
                  :step="0.01"
                />
              </el-form-item>
              <el-form-item label="有无机房" prop="isComputerRoom">
                <el-radio-group v-model="form.isComputerRoom" size="mini">
                  <el-radio-button label="1">有机房</el-radio-button>
                  <el-radio-button label="0">无机房</el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="井道尺寸(长*宽)(mm)" prop="hoistwaySize">
                <el-input
                  v-model="form.hoistwaySize"
                  clearable
                  placeholder="井道尺寸(长*宽)(mm)"
                />
              </el-form-item>
              <el-form-item label="基坑深度(m)" prop="depthOfFoundationPit">
                <el-input-number
                  v-model="form.depthOfFoundationPit"
                  controls-position="right"
                  :min="0.01"
                  :precision="2"
                  :step="0.01"
                />
              </el-form-item>
              <el-form-item label="门洞预留尺寸(长*宽)(mm)" prop="reservedSizeOfDoorOpening">
                <el-input
                  v-model="form.reservedSizeOfDoorOpening"
                  clearable
                  placeholder="门洞预留尺寸(长*宽)(mm)"
                />
              </el-form-item>
              <el-form-item label="提升高度(m)" prop="liftingHeight">
                <el-input-number
                  v-model="form.liftingHeight"
                  controls-position="right"
                  :min="0.01"
                  :precision="2"
                  :step="0.01"
                />
              </el-form-item>
              <el-form-item label="维护间隔(天)" prop="day">
                <el-input-number
                  v-model="form.day"
                  controls-position="right"
                  :min="1"
                />
              </el-form-item>
              <el-form-item label="是否启用" prop="enabled">
                <el-radio-group v-model="form.enabled" size="mini">
                  <el-radio-button :label="true">是</el-radio-button>
                  <el-radio-button :label="false">否</el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="电梯类型" prop="elevatorTypes">
                <el-select
                  v-model="form.elevatorTypes"
                  style="width: 400px"
                  multiple
                  placeholder="请选择电梯的类型"
                  clearable
                  @remove-tag="deleteTag"
                  @change="changeType"
                >
                  <el-option
                    v-for="item in typeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
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
          :table-header="tableHeader.elevator"
          :table-data="crud.data"
          :crud="crud"
          :last-col-permission="['root','Elevator:update','Elevator:delete']"
          last-col-width="190"
        >
          <template slot="isComputerRoom" slot-scope="scope">
            <el-tag v-if="scope.row.isComputerRoom === 0" type="danger" size="mini">{{ $enum.getDescByValue('ElevatorComputerRoomEnum',scope.row.isComputerRoom) }}</el-tag>
            <el-tag v-else size="mini">{{ $enum.getDescByValue('ElevatorComputerRoomEnum',scope.row.isComputerRoom) }}</el-tag>
          </template>
          <template slot="numberOfPeople" slot-scope="scope">
            <span style="font-weight: bold;color: red">{{ scope.row.numberOfPeople }}</span>
          </template>
          <template slot="numberOfWeight" slot-scope="scope">
            <span style="font-weight: bold;color: red">{{ scope.row.numberOfWeight }}</span>&nbsp;<el-tag type="info" size="mini">kg</el-tag>
          </template>
          <template slot="depthOfFoundationPit" slot-scope="scope">
            <span>{{ scope.row.depthOfFoundationPit }}</span>&nbsp;<el-tag type="info" size="mini">m</el-tag>
          </template>
          <template slot="liftingHeight" slot-scope="scope">
            <span style="font-weight: bold">{{ scope.row.liftingHeight }}</span>&nbsp;<el-tag type="info" size="mini">m</el-tag>
          </template>
          <template slot="day" slot-scope="scope">
            <span style="font-weight: bold;color: red">{{ scope.row.day }}</span>&nbsp;<el-tag type="info" size="mini">天</el-tag>
          </template>
          <template slot="enabled" slot-scope="scope">
            <el-switch
              v-model="scope.row.enabled"
              active-color="#409EFF"
              inactive-color="#F56C6C"
              @change="changeEnabled(scope.row,scope.row.enabled)"
            />
          </template>
          <template slot="elevatorTypesString" slot-scope="scope">
            <el-tag
              v-for="(item,index) in scope.row.elevatorTypesString"
              :key="index"
              size="mini"
            >{{ item }}</el-tag>&nbsp;
          </template>
          <template slot="maintainPeoplePhone" slot-scope="scope">
            <sw-desensitize-popover :content="scope.row.maintainPeoplePhone" strategy="phone" />
          </template>
          <template slot="maintainPeople" slot-scope="scope">
            <sw-desensitize-popover :content="scope.row.maintainPeople" />
          </template>
          <template slot="data-operate" slot-scope="scope">
            <sw-update-delete-operation
              :permission="permissions"
              :data="scope.row"
            >
              <template #left>
                <el-button round size="mini" type="warning" @click="openMaintain(scope.row.id)">维护</el-button>
              </template>
            </sw-update-delete-operation>
          </template>
        </sw-table>
      </el-tab-pane>
      <el-tab-pane label="电梯类型" name="elevatorType">
        <elevator-type />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getBuildingNums } from '@/api/xiaoqu/building'
import CRUD, { crud, form, header, presenter } from '@/utils/crud'
import { add, edit, del, maintain } from '@/api/xiaoqu/elevator'
import { getTypeList } from '@/api/xiaoqu/elevatorType'
import ElevatorType from '@/views/xiaoqu/elevator/elevatorType'
import i18n from '@/i18n'

const defaultCrud = CRUD({
  url: '/elevators',
  title: '电梯',
  crudMethod: { add, edit, del }
})

const defaultForm = {
  id: null,
  buildingId: null,
  identityId: '',
  numberOfPeople: 1,
  numberOfWeight: 0.01,
  isComputerRoom: 0,
  hoistwaySize: '',
  depthOfFoundationPit: 0.01,
  reservedSizeOfDoorOpening: '',
  liftingHeight: 0.01,
  enabled: false,
  day: 1,
  elevatorTypes: []
}

let elevatorTypes = []

export default {
  name: 'Elevator',
  components: {
    ElevatorType
  },
  mixins: [
    presenter(defaultCrud),
    header(),
    crud(),
    form(defaultForm)
  ],
  data() {
    const validateFormat = (rule, value, callback) => {
      if (value === null || value === '') {
        callback(new Error('井道尺寸不能为空！'))
      } else {
        if (value.indexOf('*') === -1) {
          callback(new Error('填入的数据项必须有\'*\'!'))
        }
        callback()
      }
    }
    return {
      activeTag: 'elevator',
      maintain: {
        id: null,
        maintainPeople: '',
        maintainPeoplePhone: ''
      },
      maintainDialog: false,
      maintainLoading: false,
      elevatorSelector: true,
      buildingNums: [],
      permissions: {
        add: ['root', 'Elevator:add'],
        edit: ['root', 'Elevator:update'],
        del: ['root', 'Elevator:delete']
      },
      timeOptions: [
        { label: '创建时间', value: 'createTime' },
        { label: '上一次维护时间', value: 'lastMaintainTime' },
        { label: '下一次维护时间', value: 'nextMaintainTime' }
      ],
      timeType: 'createTime',
      typeList: [],
      rules: {
        identityId: [
          { required: true, message: '电梯唯一编号不能为空！', trigger: 'blur' }
        ],
        hoistwaySize: [
          { validator: validateFormat, trigger: 'blur' }
        ],
        reservedSizeOfDoorOpening: [
          { validator: validateFormat, trigger: 'blur' }
        ],
        buildingId: [
          { required: true, message: '请选择楼宇！', trigger: 'blur' }
        ]
      },
      maintainRules: {
        maintainPeople: [
          { required: true, message: '维护人不能为空！', trigger: 'blur' }
        ],
        maintainPeoplePhone: [
          { required: true, message: '维护人手机不能为空！', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['tableHeader'])
  },
  watch: {
    timeType(newVal, oldVal) {
      this.query[oldVal] = undefined
    }
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
    getElevatorType() {
      getTypeList().then(res => {
        this.typeList = res.data
      })
    },
    [CRUD.HOOK.afterToCU](crud, form) {
      this.getElevatorType()
    },
    [CRUD.HOOK.beforeToEdit](crud, form) {
      elevatorTypes = []
      const types = []
      form.elevatorTypes.forEach(function (type, index) {
        types.push(type.id)
        // 初始化编辑时候的类型
        const ele = { id: type.id }
        elevatorTypes.push(ele)
      })
      form.elevatorTypes = types
    },
    [CRUD.HOOK.afterAddError](crud) {
      this.afterErrorMethod(crud)
    },
    [CRUD.HOOK.afterEditError](crud) {
      this.afterErrorMethod(crud)
    },
    [CRUD.HOOK.afterSubmit](crud) {
      this.afterErrorMethod(crud)
    },
    // 提交前做的操作
    [CRUD.HOOK.afterValidateCU](crud) {
      if (this.form.elevatorTypes.length === 0) {
        this.$message({
          message: '类型不能为空',
          type: 'warning'
        })
        return false
      }
      crud.form.elevatorTypes = elevatorTypes
      return true
    },
    reset() {
      this.elevatorSelector = false
      this.$nextTick(() => {
        this.elevatorSelector = true
      })
    },
    deleteTag(value) {
      elevatorTypes.forEach(function (data, index) {
        if (data.id === value) {
          elevatorTypes.splice(index, value)
        }
      })
    },
    changeType(value) {
      elevatorTypes = []
      value.forEach(function (data, index) {
        const ElevatorType = { id: data }
        elevatorTypes.push(ElevatorType)
      })
    },
    afterErrorMethod(crud) {
      // 恢复select
      const initRoles = []
      elevatorTypes.forEach(function(type, index) {
        initRoles.push(type.id)
      })
      crud.form.elevatorTypes = initRoles
    },
    closeMaintainDialog() {
      this.maintainDialog = false
      this.maintain.id = null
    },
    submitMaintain() {
      this.$refs.maintainForm.validate((valid) => {
        if (valid) {
          this.maintainLoading = true
          maintain(this.maintain).then((res) => {
            this.crud.toQuery()
            this.maintainLoading = false
            this.closeMaintainDialog()
            this.$notify({
              title: res.data,
              type: 'success'
            })
          }).catch(() => {
            this.maintainLoading = false
          })
        } else {
          return false
        }
      })
    },
    openMaintain(id) {
      this.maintainDialog = true
      this.maintain.id = id
    },
    changeEnabled(data, val) {
      const operate = val === true ? '启用' : '禁用'
      this.$confirm('此操作将' + operate + ' [' + data.identityId + '] ' + ', 是否继续?', '提示', {
        confirmButtonText: String(i18n.t('ok')),
        cancelButtonText: String(i18n.t('cancel')),
        type: 'warning'
      }).then(() => {
        edit(data).then(() => {
          this.crud.notify(operate + '成功！', CRUD.NOTIFICATION_TYPE.SUCCESS)
        }).catch(() => {
          data.enabled = !data.enabled
        })
      }).catch(() => {
        data.enabled = !data.enabled
      })
    }
  }
}
</script>
