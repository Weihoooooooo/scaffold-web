<template>
  <el-form
    ref="form"
    :model="village"
    :rules="rules"
    class="my-form"
    label-suffix=":"
    label-width="100px"
    @submit.native.prevent="save"
  >
    <el-form-item label="物业费" prop="property">
      <el-input-number
        v-model="village.property"
        placeholder="物业费"
        :min="min"
        :step="0.01"
        step-strictly
      />
      <el-tag><b>元/m&sup2;</b></el-tag>
    </el-form-item>
    <el-form-item label="水费" prop="water">
      <el-input-number
        v-model="village.water"
        placeholder="水费"
        :min="min"
        :step="0.01"
        step-strictly
      />
      <el-tag><b>元/m&sup3;</b></el-tag>
    </el-form-item>
    <el-form-item label="电费" prop="electric">
      <el-input-number
        v-model="village.electric"
        placeholder="电费"
        :min="min"
        :step="0.01"
        step-strictly
      />
      <el-tag><b>元/kwh</b></el-tag>
    </el-form-item>
    <el-form-item label="停车费" prop="park">
      <el-input-number
        v-model="village.park"
        placeholder="停车费"
        :min="min"
        :step="0.01"
        step-strictly
      />
      <el-tag><b>元/h</b></el-tag>
    </el-form-item>
    <el-form-item>
      <el-button
        :loading="loading"
        type="primary"
        round
        @click.native.prevent="save"
      >保存配置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { getVillage, updateVillage } from '@/api/commons/village'

export default {
  name: 'Village',
  data() {
    return {
      village: {},
      loading: false,
      min: 0.00,
      rules: {
        property: [
          { required: true, message: '物业费不能为空！', trigger: 'blur' }
        ],
        water: [
          { required: true, message: '水费不能为空！', trigger: 'blur' }
        ],
        electric: [
          { required: true, message: '电费不能为空！', trigger: 'blur' }
        ],
        park: [
          { required: true, message: '停车费不能为空！', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      getVillage().then(res => {
        this.village = res.data
      })
    },
    save() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          updateVillage(this.village).then(() => {
            this.$notify({
              title: '保存成功！',
              message: '参数保存成功！',
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

<style scoped lang="scss">
.my-form{
  margin-top: 20px;
  margin-left: 30px;

  .my-input{
    width:50%
  }
}
</style>
