<template>
  <el-form
    ref="form"
    :model="form"
    :rules="rules"
    class="my-form"
    label-width="200px"
    label-suffix=":"
    @submit.native.prevent="doSubmit"
  >
    <el-form-item :label="String($t('sysSetting.sysName'))" prop="name">
      <el-input
        v-model="form.name"
        :placeholder="String($t('sysSetting.sysName'))"
        clearable
        class="my-input"
      />
    </el-form-item>
    <el-form-item :label="String($t('sysSetting.sysNameZhCn'))" prop="nameZhCn">
      <el-input
        v-model="form.nameZhCn"
        :placeholder="String($t('sysSetting.sysNameZhCn'))"
        clearable
        class="my-input"
      />
    </el-form-item>
    <el-form-item :label="String($t('sysSetting.sysNameZhHk'))" prop="nameZhHk">
      <el-input v-model="form.nameZhHk" :placeholder="String($t('sysSetting.sysNameZhHk'))" clearable class="my-input" />
    </el-form-item>
    <el-form-item :label="String($t('sysSetting.sysNameZhTw'))" prop="nameZhTw">
      <el-input v-model="form.nameZhTw" :placeholder="String($t('sysSetting.sysNameZhTw'))" clearable class="my-input" />
    </el-form-item>
    <el-form-item :label="String($t('sysSetting.sysNameEnUs'))" prop="nameEnUs">
      <el-input v-model="form.nameEnUs" :placeholder="String($t('sysSetting.sysNameEnUs'))" clearable class="my-input" />
    </el-form-item>
    <el-form-item :label="String($t('sysSetting.sysLogo'))" prop="sysLogo">
      <el-input v-model="form.sysLogo" :placeholder="String($t('sysSetting.sysLogo'))" clearable class="my-input" />
    </el-form-item>
    <el-form-item :label="String($t('sysSetting.userInitPassword'))" prop="userInitPassword">
      <el-input
        v-model="form.userInitPassword"
        type="password"
        :placeholder="String($t('sysSetting.userInitPassword'))"
        show-password
        clearable
        class="my-input"
      />
    </el-form-item>
    <el-form-item>
      <el-button
        :loading="loading"
        type="primary"
        round
        @click.native.prevent="doSubmit"
      >{{ $t('sysSetting.saveBtn') }}</el-button>
      <el-form-item />
    </el-form-item>
  </el-form>
</template>

<script>
import { validUrl } from '@/utils/validate'
import { getSettings, save } from '@/api/tools/sysSetting'
import i18n from '@/i18n'

export default {
  name: 'SystemSettings',
  data() {
    return {
      form: {},
      loading: false,
      rules: {
        name: [
          { required: true, message: String(i18n.t('sysSetting.form.sysName')), trigger: 'blur' }
        ],
        nameZhCn: [
          { required: true, message: String(i18n.t('sysSetting.form.sysNameZhCn')), trigger: 'blur' }
        ],
        nameZhHk: [
          { required: true, message: String(i18n.t('sysSetting.form.sysNameZhHk')), trigger: 'blur' }
        ],
        nameZhTw: [
          { required: true, message: String(i18n.t('sysSetting.form.sysNameZhTw')), trigger: 'blur' }
        ],
        nameEnUs: [
          { required: true, message: String(i18n.t('sysSetting.form.sysNameEnUs')), trigger: 'blur' }
        ],
        sysLogo: [
          { required: true, trigger: 'blur', validator: validUrl }
        ],
        userInitPassword: [
          { required: true, message: String(i18n.t('sysSetting.form.userInitPassword')), trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      getSettings().then(res => {
        this.form = res.data
      })
    },
    doSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          save(this.form).then(res => {
            this.$notify({
              title: String(i18n.t('sysSetting.saveSuccess')),
              message: String(i18n.t('sysSetting.saveMessage')),
              duration: 2000,
              type: 'success'
            })
            this.loading = false
          }).catch(err => {
            this.loading = false
            console.log(err.response.data.message)
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.my-form{
  margin-top: 20px;
  margin-left: 30px;

  .my-input{
    width:50%
  }
}
</style>
