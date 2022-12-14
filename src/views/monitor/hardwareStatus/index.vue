<template>
  <div class="state-container">
    <el-row v-loading="loading" :gutter="20" class="panel-group">
      <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
        <el-card shadow="always" class="card-panel">
          <div slot="header" class="card-panel-header">
            <span><b>{{ $t('systemMonitor.systemInfo.title') }}</b></span>
          </div>
          <el-descriptions border :column="1">
            <el-descriptions-item>
              <template slot="label">
                <span class="card-panel-black">{{ $t('systemMonitor.systemInfo.os') }}</span>
              </template>
              <b>{{ systemParams.os }}</b>
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <span class="card-panel-black">{{ $t('systemMonitor.systemInfo.jdk') }}</span>
              </template>
              <el-tag effect="plain" size="small">{{ systemParams.jvmJavaVersion }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <span class="card-panel-black">{{ $t('systemMonitor.systemInfo.runTime') }}</span>
              </template>
              {{ systemParams.runTime }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <span class="card-panel-black">{{ $t('systemMonitor.systemInfo.timeNow') }}</span>
              </template>
              <b>{{ timeNow }}</b>
            </el-descriptions-item>
          </el-descriptions>
          <el-skeleton animated :rows="3" style="margin-top: 10px;" />
        </el-card>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
        <el-card shadow="always" class="card-panel">
          <div slot="header" class="card-panel-header">
            <span><b>{{ $t('systemMonitor.cpu.title') }}</b></span>
          </div>
          <el-descriptions :column="1" border>
            <el-descriptions-item>
              <template slot="label">
                <span class="card-panel-black">{{ $t('systemMonitor.cpu.cpuInfo') }}</span>
              </template>
              <span>{{ systemParams.cpuInfo }}</span>
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <span class="card-panel-black">{{ $t('systemMonitor.cpu.cpuUseRate') }}</span>
              </template>
              <div style="text-align: center;line-height: normal;overflow-inline: hidden">
                <el-progress
                  v-if="!isNaN(Number(systemParams.cpuUseRate))"
                  type="dashboard"
                  :stroke-width="10"
                  :percentage="Number(systemParams.cpuUseRate) >= 100 ? 100 : Number(systemParams.cpuUseRate)"
                  :color="colors"
                />
              </div>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
        <el-card shadow="always" class="card-panel">
          <div slot="header" class="card-panel-header">
            <span><b>{{ $t('systemMonitor.ram.title') }}</b></span>
          </div>
          <el-descriptions border :column="1">
            <el-descriptions-item>
              <template slot="label">
                <span class="card-panel-black">{{ $t('systemMonitor.ram.ramTotal') }}</span>
              </template>
              {{ systemParams.ramTotal }} (G)
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <span class="card-panel-black">{{ $t('systemMonitor.ram.ramUsed') }}</span>
              </template>
              <b style="color: red">{{ systemParams.ramUsed }}</b> (G)
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <span class="card-panel-black">{{ $t('systemMonitor.ram.ramUsedRate') }}</span>
              </template>
              <div style="text-align: center;line-height: normal">
                <el-progress
                  v-if="!isNaN(getRate(systemParams.ramUsed,systemParams.ramTotal))"
                  type="dashboard"
                  :stroke-width="10"
                  :percentage="getRate(systemParams.ramUsed,systemParams.ramTotal)"
                  :color="colors"
                />
              </div>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
        <el-card shadow="always" class="card-panel">
          <div slot="header" class="card-panel-header">
            <span><b>{{ $t('systemMonitor.disk.title') }}</b></span>
          </div>
          <el-descriptions border :column="1">
            <el-descriptions-item>
              <template slot="label">
                <span class="card-panel-black">{{ $t('systemMonitor.disk.diskTotal') }}</span>
              </template>
              {{ systemParams.diskTotal }} (G)
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <span class="card-panel-black">{{ $t('systemMonitor.disk.diskUsed') }}</span>
              </template>
              <b style="color: red;">{{ systemParams.diskUsed }}</b> (G)
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <span class="card-panel-black">{{ $t('systemMonitor.disk.diskUsedRate') }}</span>
              </template>
              <div style="text-align: center;line-height: normal">
                <el-progress
                  v-if="!isNaN(getRate(systemParams.diskUsed,systemParams.diskTotal))"
                  type="circle"
                  :stroke-width="15"
                  :percentage="getRate(systemParams.diskUsed,systemParams.diskTotal)"
                  :color="colors"
                />
              </div>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
        <el-card shadow="always" class="card-panel">
          <div slot="header" class="card-panel-header">
            <span><b>{{ $t('systemMonitor.jvm.heapTitle') }}</b></span>
          </div>
          <el-progress
            v-if="!isNaN(getRate(systemParams.jvmHeapUsed,systemParams.jvmHeapMax))"
            :percentage="getRate(systemParams.jvmHeapUsed,systemParams.jvmHeapMax)"
            :stroke-width="20"
            :text-inside="true"
            type="line"
            :color="colors"
          />
          <el-descriptions border :column="1" style="margin-top: 20px">
            <el-descriptions-item>
              <template slot="label">
                <span class="card-panel-black">{{ $t('systemMonitor.jvm.heapInit') }}</span>
              </template>
              {{ systemParams.jvmHeapInit }} (M)
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <span class="card-panel-black">{{ $t('systemMonitor.jvm.heapMax') }}</span>
              </template>
              <b>{{ systemParams.jvmHeapMax }}</b> (M)
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <span class="card-panel-black">{{ $t('systemMonitor.jvm.heapUsed') }}</span>
              </template>
              <b style="color: red;">{{ systemParams.jvmHeapUsed }}</b> (M)
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <span class="card-panel-black">{{ $t('systemMonitor.jvm.heapCommitted') }}</span>
              </template>
              {{ systemParams.jvmHeapCommitted }} (M)
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
        <el-card shadow="always" class="card-panel">
          <div slot="header" class="card-panel-header">
            <span><b>{{ $t('systemMonitor.jvm.nonHeapTitle') }}</b></span>
          </div>
          <el-descriptions border :column="1">
            <el-descriptions-item>
              <template slot="label">
                <span class="card-panel-black">{{ $t('systemMonitor.jvm.heapInit') }}</span>
              </template>
              {{ systemParams.jvmNonHeapInit }} (M)
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <span class="card-panel-black">{{ $t('systemMonitor.jvm.heapMax') }}</span>
              </template>
              <span v-if="systemParams.jvmNonHeapMax !== '-.00'"><b>{{ systemParams.jvmNonHeapMax }}</b> (M)</span>
              <span v-else><el-tag type="danger" effect="plain" size="small">{{ $t('systemMonitor.jvm.noInfo') }}</el-tag></span>
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <span class="card-panel-black">{{ $t('systemMonitor.jvm.heapUsed') }}</span>
              </template>
              <b>{{ systemParams.jvmNonHeapUsed }}</b> (M)
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <span class="card-panel-black">{{ $t('systemMonitor.jvm.heapCommitted') }}</span>
              </template>
              {{ systemParams.jvmNonHeapUsed }} (M)
            </el-descriptions-item>
          </el-descriptions>
          <el-skeleton animated style="margin-top: 10px;" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import dayjs from 'dayjs'
import { closeWebSocket, createWebSocket } from '@/utils/socket'

export default {
  name: 'HardwareStatus',
  data() {
    return {
      loading: true,
      timeNow: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      timer: '',
      systemParams: {
        os: '', // ????????????
        jvmJavaVersion: '', // Java??????
        runTime: '', // ??????????????????
        cpuInfo: '', // CPU??????
        cpuUseRate: '', // CPU?????????
        ramTotal: '', // ????????????(G)
        ramUsed: '', // ????????????(G)
        diskTotal: '', // ????????????(G)
        diskUsed: '', // ????????????(G)
        jvmHeapInit: '', // JVM???????????????(M)
        jvmHeapMax: '', // JVM?????????????????????(M)
        jvmHeapUsed: '', // JVM?????????????????????(M)
        jvmHeapCommitted: '', // JVM????????????????????????(M)
        jvmNonHeapInit: '', // JVM????????????????????????(M)
        jvmNonHeapMax: '', // JVM????????????????????????(M)
        jvmNonHeapUsed: '', // JVM?????????????????????(M)
        jvmNonHeapCommitted: ''// JVM?????????????????????(M)
      },
      colors: [
        { color: '#f56c6c', percentage: 100 },
        { color: '#e6a23c', percentage: 65 },
        { color: '#5cb87a', percentage: 35 }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ]),
    flag() {
      return this.roles.includes('HardwareStatus:read')
    }
  },
  mounted() {
    if (this.flag) {
      createWebSocket(`/monitor`, this.callback)
    }
    this.timer = setInterval(() => {
      this.timeNow = dayjs().format('YYYY-MM-DD HH:mm:ss')
    }, 1000)
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  destroyed() {
    // ???????????????WebSocket??????????????????????????????????????????????????????WebSocket???????????????????????????
    closeWebSocket()
  },
  methods: {
    // WebSocket??????
    callback(msg) {
      if (msg.code === 10006) {
        this.systemParams = msg.data
        this.loading = false
      }
    },
    getRate(used, total) {
      let result = (used / total) * 100
      result = result.toFixed(2)
      if (Number(result) >= 100) {
        return 100
      } else {
        return Number(result)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.state-container {
  padding: 18px 22px 22px 22px;
  background-color: rgba(240, 242, 245, 0.99);

  .panel-group {
    margin-top: 5px;

    .card-panel-col {
      margin-bottom: 32px;

      .card-panel {
        height: 350px;
        border-radius: 10px;

        .card-panel-black {
          color: black;
        }

        .card-panel-header {
          text-align: center;
          font-size: 20px;
        }
      }
    }
  }

}
</style>

