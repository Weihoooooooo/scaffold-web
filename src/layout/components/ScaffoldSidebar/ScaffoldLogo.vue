<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <!-- 过渡动画 -->
    <transition name="sidebarLogoFade">
      <!-- 菜单栏关闭状态 -->
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo" :alt="$t('scaffoldLogoAlt')">
        <h1 v-else class="sidebar-title">{{ title }}</h1>
      </router-link>
      <!-- 菜单栏开启状态 -->
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo" :alt="$t('scaffoldLogoAlt')">
        <h1 class="sidebar-title">{{ title }}</h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
import { getLogoAndTitle } from '@/api/tools/logo'

export default {
  name: 'SwLogo',
  props: {
    // 设置属性,菜单是否关闭
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title: '',
      logo: ''
    }
  },
  mounted() {
    getLogoAndTitle().then(res => {
      this.logo = res.data.logo
      this.title = res.data.title
    })
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 6px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0;
    }
  }
}
</style>
