<template>
  <el-dropdown trigger="hover" @command="handleChangeLanguage">
    <div>
      <sw-svg
        icon-class="i18n"
        class-name="i18n-select"
      />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item disabled style="text-align: center;color: black;font-size: 14px;padding: 0">{{ String($t('navbar.i18nSelect')) }}</el-dropdown-item>
      <hr color="#dcdfe6">
      <template v-for="item in i18nOptions">
        <el-dropdown-item
          :key="item.value"
          :disabled="lang === item.value"
          :command="item.value"
        >
          <template #default>
            <sw-svg
              :icon-class="item.icon"
              class-name="i18n-select-item"
            />
            {{ item.title }}
          </template>
        </el-dropdown-item>
      </template>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  name: 'SwI18nSelect',
  data() {
    return {
      i18nOptions: [
        {
          title: '中国大陆/zh-CN',
          value: 'zh-CN',
          icon: 'i18n-zh_CN'
        },
        {
          title: '中國香港/zh-HK',
          value: 'zh-HK',
          icon: 'i18n-zh_HK-zh_TW'
        },
        {
          title: '中國臺灣/zh-TW',
          value: 'zh-TW',
          icon: 'i18n-zh_HK-zh_TW'
        },
        {
          title: 'English/en-US',
          value: 'en-US',
          icon: 'i18n-en_US'
        }
      ]
    }
  },
  computed: {
    lang() {
      return localStorage.getItem('lang')
    }
  },
  methods: {
    handleChangeLanguage(lang) {
      localStorage.setItem('lang', lang)
      window.location.reload()
    }
  }
}
</script>

<style scoped>
.i18n-select {
  font-size: 20px;
  font-weight: bold;
}

.i18n-select-item {
  font-size: 18px;
}
</style>
