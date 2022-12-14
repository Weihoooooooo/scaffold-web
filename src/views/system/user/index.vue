<template>
  <div class="app-container">
    <sw-back-top-and-bottom />
    <div class="head-container">
      <sw-search-date-picker-operation
        :input-placeholder="String($t('userPage.placeholderInput'))"
        @reset="reset"
      >
        <template #center>
          <el-input
            v-model="query.phone"
            clearable
            :placeholder="String($t('userPage.placeholderPhone'))"
            style="width: 200px"
            @keyup.enter.native="crud.toQuery"
          />
        </template>
        <template #right>
          <sw-select
            v-if="userSelector"
            v-model="query.enabled"
            :options="enabledTypeOptions"
            :placeholder="String($t('userPage.placeholderSelect'))"
            width="90"
            @change="crud.toQuery"
          />
        </template>
      </sw-search-date-picker-operation>
      <sw-button-operation :permission="permission" />
    </div>
    <sw-dialog
      :visible="crud.status.cu > 0"
      :before-close="crud.cancelCU"
      :close-on-click-modal="false"
      append-to-body
      width="570px"
      top="100px"
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
          label-width="90px"
          label-suffix=":"
        >
          <el-form-item :label="String($t('userPage.form.username'))" prop="username">
            <el-input ref="first" v-model="form.username" clearable :placeholder="String($t('userPage.form.username'))" />
          </el-form-item>
          <el-form-item :label="String($t('userPage.form.phone'))" prop="phone">
            <el-input v-model.number="form.phone" clearable :placeholder="String($t('userPage.form.phone'))" />
          </el-form-item>
          <el-form-item :label="String($t('userPage.form.email'))" prop="email">
            <el-input v-model="form.email" clearable :placeholder="String($t('userPage.form.email'))" />
          </el-form-item>
          <el-form-item :label="String($t('userPage.form.sex'))">
            <el-radio-group v-model="form.sex" style="width: 178px">
              <el-radio label="1">{{ $t('userPage.form.man') }}</el-radio>
              <el-radio label="0">{{ $t('userPage.form.woman') }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item :label="String($t('userPage.form.status'))">
            <el-radio-group v-model="form.enabled" :disabled="form.id === user.id">
              <el-radio :label="true">{{ $t('userPage.form.statusOk') }}</el-radio>
              <el-radio :label="false">{{ $t('userPage.form.statusNo') }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item style="margin-bottom: 0" :label="String($t('userPage.form.role'))" prop="roles">
            <el-select
              v-model="form.roles"
              style="width:400px"
              multiple
              :placeholder="String($t('userPage.form.rolePlaceholder'))"
              clearable
              @remove-tag="deleteTag"
              @change="changeRole"
            >
              <el-option
                v-for="item in roles"
                :key="item.name"
                :disabled="level !== 1 && item.level <= level"
                :label="item.name"
                :value="item.id"
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
      :table-header="tableHeader.users"
      :table-data="crud.data"
      :crud="crud"
      :last-col-permission="['root','User:delete','User:update']"
    >
      <template slot="avatar.path" slot-scope="scope">
        <sw-avatar-image :src="scope.row.avatar.path" />
      </template>
      <template slot="username" slot-scope="scope">
        <span v-if="scope.row.username === 'root'" style="color: red;font-weight: bold">{{ scope.row.username }}</span>
        <span v-else>{{ scope.row.username }}</span>
      </template>
      <template slot="phone" slot-scope="scope">
        <sw-desensitize-popover :content="scope.row.phone" strategy="phone" />
      </template>
      <template slot="sex" slot-scope="scope">
        {{ $enum.getDescByValue('SexEnum',scope.row.sex) }}
      </template>
      <template slot="email" slot-scope="scope">
        <sw-desensitize-popover :content="scope.row.email" strategy="email" />
      </template>
      <template slot="enabled" slot-scope="scope">
        <el-switch
          v-model="scope.row.enabled"
          :disabled="user.id === scope.row.id"
          active-color="#409EFF"
          inactive-color="#F56C6C"
          @change="changeEnabled(scope.row, scope.row.enabled)"
        />
      </template>
      <template slot="data-operate" slot-scope="scope">
        <sw-update-delete-operation
          :permission="permission"
          :data="scope.row"
          :disabled-del="scope.row.id === user.id"
        />
      </template>
    </sw-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import i18n from '@/i18n'
import { add, del, edit } from '@/api/system/user'
import CRUD, { crud, form, header, presenter } from '@/utils/crud'
import { getRoles } from '@/api/system/roles'
import { validPhone } from '@/utils/validate'

let userRoles = []

const defaultCrud = CRUD({
  title: String(i18n.t('userPage.title')),
  url: '/users',
  crudMethod: { add, edit, del }
})
const defaultForm = {
  username: null,
  sex: String(i18n.t('userPage.form.man')),
  email: null,
  phone: null,
  enabled: false,
  roles: []
}

export default {
  name: 'User',
  mixins: [
    presenter(defaultCrud),
    header(),
    form(defaultForm),
    crud()
  ],
  data() {
    return {
      userSelector: true,
      roles: [],
      enabledTypeOptions: [
        { value: true, desc: String(i18n.t('userPage.form.statusOk')) },
        { value: false, desc: String(i18n.t('userPage.form.statusNo')) }
      ],
      permission: {
        add: ['User:add', 'root'],
        edit: ['User:update', 'root'],
        del: ['User:delete', 'root']
      },
      rules: {
        username: [
          { required: true, message: String(i18n.t('userPage.validUsername.error1')), trigger: 'blur' },
          { min: 2, max: 10, message: String(i18n.t('userPage.validUsername.error2')), trigger: 'blur' }
        ],
        phone: [
          { required: true, trigger: 'blur', validator: validPhone }
        ],
        email: [
          { required: true, message: String(i18n.t('userPage.validEmail.error1')), trigger: 'blur' },
          { type: 'email', message: String(i18n.t('userPage.validEmail.error2')), trigger: 'blur' }
        ],
        roles: [
          { required: true, message: String(i18n.t('userPage.validRoles.error')), trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'level', 'tableHeader',
      'user'
    ])
  },
  created() {
    this.$nextTick(() => {
      this.crud.toQuery()
      this.crud.msg.add = String(i18n.t('userPage.createdTip'))
    })
  },
  methods: {
    // ??????????????????????????????
    [CRUD.HOOK.afterToCU](crud, form) {
      this.getRoles()
    },
    // ?????????????????????????????????
    [CRUD.HOOK.beforeToEdit](crud, form) {
      userRoles = []
      const roles = []
      form.roles.forEach(function(role, index) {
        roles.push(role.id)
        // ??????????????????????????????
        const rol = { id: role.id }
        userRoles.push(rol)
      })
      form.roles = roles
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
    // ?????????????????????
    [CRUD.HOOK.afterValidateCU](crud) {
      if (this.form.roles.length === 0) {
        this.$message({
          message: String(i18n.t('userPage.rolesIsNull')),
          type: 'warning'
        })
        return false
      }
      crud.form.roles = userRoles
      return true
    },
    changeEnabled(data, val) {
      const operate = val === true ? String(i18n.t('userPage.form.statusOk')) : String(i18n.t('userPage.form.statusNo'))
      this.$confirm(String(i18n.t('userPage.enabledTips.tip1')) + operate + ' [' + data.username + '] ' + String(i18n.t('userPage.enabledTips.tip2')), String(i18n.t('confirmTips')), {
        confirmButtonText: String(i18n.t('ok')),
        cancelButtonText: String(i18n.t('cancel')),
        type: 'warning'
      }).then(() => {
        edit(data).then(res => {
          this.crud.notify(operate + String(i18n.t('userPage.enabledTips.tip3')), CRUD.NOTIFICATION_TYPE.SUCCESS)
        }).catch(() => {
          data.enabled = !data.enabled
        })
      }).catch(() => {
        data.enabled = !data.enabled
      })
    },
    changeRole(value) {
      userRoles = []
      value.forEach(function (data, index) {
        const role = { id: data }
        userRoles.push(role)
      })
    },
    deleteTag(value) {
      userRoles.forEach(function(data, index) {
        if (data.id === value) {
          userRoles.splice(index, value)
        }
      })
    },
    getRoles() {
      getRoles().then(res => {
        this.roles = res.data.content
      }).catch(() => {})
    },
    afterErrorMethod(crud) {
      // ??????select
      const initRoles = []
      userRoles.forEach(function(role, index) {
        initRoles.push(role.id)
      })
      crud.form.roles = initRoles
    },
    reset() {
      this.userSelector = false
      this.$nextTick(() => {
        this.userSelector = true
      })
    }
  }
}
</script>
