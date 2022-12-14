<template>
  <div class="app-container">
    <sw-back-top-and-bottom />
    <div class="head-container">
      <sw-search-date-picker-operation
        :input-placeholder="String($t('rolePage.inputPlaceholder'))"
        input-width="250"
      />
      <sw-button-operation :permission="permission" />
    </div>
    <sw-dialog
      :visible="crud.status.cu > 0"
      :before-close="crud.cancelCU"
      :close-on-click-modal="false"
      append-to-body
      width="520px"
      top="60px"
    >
      <template #title>
        {{ crud.status.title }}
      </template>
      <template #content>
        <el-form
          ref="form"
          inline
          :model="form"
          label-width="150px"
          label-suffix=":"
          :rules="rules"
        >
          <el-form-item :label="String($t('rolePage.form.name'))" prop="name">
            <el-input ref="first" v-model="form.name" clearable :placeholder="String($t('rolePage.form.name'))" />
          </el-form-item>
          <el-form-item label="zh-CN" prop="nameZhCn">
            <el-input v-model="form.nameZhCn" clearable placeholder="zh-CN" />
          </el-form-item>
          <el-form-item label="zh-HK" prop="nameZhHk">
            <el-input v-model="form.nameZhHk" clearable placeholder="zh-HK" />
          </el-form-item>
          <el-form-item label="zh-TW" prop="nameZhTw">
            <el-input v-model="form.nameZhTw" clearable placeholder="zh-TW" />
          </el-form-item>
          <el-form-item label="en-US" prop="nameEnUs">
            <el-input v-model="form.nameEnUs" clearable placeholder="en-US" />
          </el-form-item>
          <el-form-item :label="String($t('rolePage.form.permission'))" prop="permission">
            <el-input v-model="form.permission" clearable :placeholder="String($t('rolePage.form.permission'))" />
          </el-form-item>
          <el-form-item :label="String($t('rolePage.form.level'))" prop="level">
            <el-input-number
              v-if="crud.status.edit === 1"
              v-model.number="form.level"
              :min="Number(levelMin)"
              :max="Number(levelMax)"
              :placeholder="String($t('rolePage.form.level'))"
              controls-position="right"
              style="width: 145px;"
            />
            <el-input-number
              v-if="crud.status.add === 1"
              v-model.number="form.level"
              :min="1"
              :placeholder="String($t('rolePage.form.level'))"
              controls-position="right"
              style="width: 145px;"
            />
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <el-button round @click="crud.cancelCU">{{ $t('cancel') }}</el-button>
        <el-button :loading="crud.cu === 2" type="primary" round @click="crud.submitCU">{{ $t('ok') }}</el-button>
      </template>
    </sw-dialog>
    <el-row :gutter="15">
      <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="17" style="margin-bottom: 10px">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="role-span">{{ $t('rolePage.roleCardTitle') }}</span>
          </div>
          <sw-table
            ref="scaffoldTable"
            :table-header="tableHeader.roles"
            :table-data="crud.data"
            :crud="crud"
            highlight-current-row
            :default-sort="{prop:'level',order:'ascending'}"
            :last-col-permission="['root','Role:delete','Role:update']"
            :last-col-label="String($t('rolePage.operate'))"
            @current-change="handleCurrentChange"
          >
            <template slot="data-operate" slot-scope="scope">
              <sw-update-delete-operation
                v-if="scope.row.level >= level"
                :permission="permission"
                :data="scope.row"
              />
            </template>
          </sw-table>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="7">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <el-tooltip
              class="item"
              effect="light"
              :content="String($t('rolePage.tooltipContent'))"
              placement="top"
            >
              <span class="role-span">
                {{ $t('rolePage.menuCardTitle') }}
              </span>
            </el-tooltip>
            <el-button
              v-permission="['root','Role:update']"
              :disabled="!showButton"
              :loading="menuLoading"
              icon="el-icon-check"
              style="float: right; padding: 6px 9px"
              type="primary"
              @click="saveMenus"
            >{{ $t('rolePage.save') }}</el-button>
          </div>
          <el-tree
            ref="menu"
            :data="menus"
            :default-checked-keys="menuIds"
            :props="defaultProps"
            accordion
            show-checkbox
            node-key="id"
          />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CRUD, { crud, form, header, presenter } from '@/utils/crud'
import { add, del, edit, editMenu, getLevelScope, getRoleById } from '@/api/system/roles'
import { getMenusTree } from '@/api/system/menu'
import i18n from '@/i18n'

const defaultCrud = CRUD({
  url: '/roles',
  title: String(i18n.t('rolePage.title')),
  crudMethod: { edit, del, add }
})
const defaultForm = {
  id: null,
  name: null,
  permission: null,
  level: 4, nameZhCn: null, nameZhHk: null, nameZhTw: null, nameEnUs: null
}
export default {
  name: 'Role',
  mixins: [
    presenter(defaultCrud),
    form(defaultForm),
    header(),
    crud()
  ],
  data() {
    return {
      permission: {
        add: ['Role:add', 'root'],
        edit: ['Role:update', 'root'],
        del: ['Role:delete', 'root']
      },
      defaultProps: { children: 'children', label: 'label' },
      levelMin: '',
      levelMax: '',
      currentId: 0,
      menuLoading: false,
      showButton: false,
      menus: [],
      menuIds: [],
      rules: {
        name: [
          { required: true, message: String(i18n.t('rolePage.rules.name')), trigger: 'blur' }
        ],
        permission: [
          { required: true, message: String(i18n.t('rolePage.rules.permission')), trigger: 'blur' }
        ],
        nameZhCn: [
          { required: true, message: String(i18n.t('rolePage.rules.nameZhCn')), trigger: 'blur' }
        ],
        nameZhHk: [
          { required: true, message: String(i18n.t('rolePage.rules.nameZhHk')), trigger: 'blur' }
        ],
        nameZhTw: [
          { required: true, message: String(i18n.t('rolePage.rules.nameZhTw')), trigger: 'blur' }
        ],
        nameEnUs: [
          { required: true, message: String(i18n.t('rolePage.rules.nameEnUs')), trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'tableHeader', 'level'
    ])
  },
  created() {
    this.getMenus()
  },
  methods: {
    // ??????????????????????????????
    [CRUD.HOOK.afterToCU](crud, form) {
      this.getLevelScope()
    },
    getLevelScope() {
      getLevelScope().then(res => {
        this.levelMax = res.data.max
        this.levelMin = res.data.min
      })
    },
    getMenus() {
      getMenusTree().then(res => {
        this.menus = res.data
      })
    },
    handleCurrentChange(val) {
      if (val) {
        const _this = this
        // ?????????????????????
        this.$refs.menu.setCheckedKeys([])
        // ?????????????????????id
        this.currentId = val.id
        this.showButton = this.level <= val.level
        // ?????????
        this.menuIds = []
        // ??????????????????????????????
        val.menus.forEach(function (data, index) {
          _this.menuIds.push(data.id)
        })
      }
    },
    saveMenus() {
      this.menuLoading = true
      const role = {
        id: this.currentId,
        menus: []
      }
      // ??????????????????????????????,????????????
      this.$refs.menu.getHalfCheckedNodes().forEach(function (data, index) {
        const menu = { id: data.id }
        role.menus.push(menu)
      })
      // ??????????????????Key???
      this.$refs.menu.getCheckedKeys().forEach(function (data, index) {
        const menu = { id: data }
        role.menus.push(menu)
      })
      // ????????????
      editMenu(role).then(res => {
        this.crud.notify(String(i18n.t('rolePage.rules.saveSuccess')), CRUD.NOTIFICATION_TYPE.SUCCESS)
        this.menuLoading = false
        this.update()
        this.crud.toQuery()
      }).catch(err => {
        this.menuLoading = false
        console.log(err.response.data.message)
      })
    },
    update() {
      // ??????????????? ????????????
      getRoleById(this.currentId).then(res => {
        for (let i = 0; i < this.crud.data.length; i++) {
          if (res.data.id === this.crud.data[i].id) {
            this.crud.data[i] = res.data
            break
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.box-card{
  border-radius: 10px;

  .role-span{
    font-weight: bold;color: #303133;
    font-size: 15px;
  }
}
</style>
