<template>
  <div class="app-container">
    <sw-back-top-and-bottom />
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <el-input
          v-model="query.filter"
          clearable
          size="small"
          :placeholder="$t('onlinePage.blurry')"
          style="width: 200px"
          @keyup.enter.native="crud.toQuery"
        />
        <sw-search-reset-operation :crud="crud" />
      </div>
      <sw-button-operation>
        <el-button
          slot="left"
          type="danger"
          icon="el-icon-delete"
          round
          :loading="delLoading"
          :disabled="crud.selections.length === 0"
          @click="doDelete(crud.selections)"
        >
          {{ $t('onlinePage.forcedOut') }}
        </el-button>
      </sw-button-operation>
    </div>

    <sw-table
      ref="scaffoldTable"
      :table-header="tableHeader.online"
      :table-data="tableData"
      :crud="crud"
      :default-sort="{prop:'loginTime',order:'descending'}"
      last-col-width="100"
      :last-col-label="String($t('onlinePage.operation'))"
    >
      <template slot="username" slot-scope="scope">
        <span v-if="scope.row.username === 'root'" style="color: red;font-weight: bold">
          {{ scope.row.username }}
        </span>
        <span v-else>{{ scope.row.username }}</span>
      </template>
      <template slot="browser" slot-scope="scope">
        <el-tag size="mini">{{ scope.row.browser }}</el-tag>
      </template>
      <template slot="data-operate" slot-scope="scope">
        <el-popover
          :ref="scope.$index"
          v-permission="['root','Online:delete']"
          placement="top"
          width="180"
        >
          <p>{{ $t('onlinePage.tips') }}</p>
          <div style="text-align: right;margin: 0">
            <el-button size="mini" round @click="$refs[scope.$index].doClose()">
              {{ $t('cancel') }}
            </el-button>
            <el-button
              :loading="delLoading"
              type="danger"
              size="mini"
              round
              @click="delMethod(scope.row.key,scope.$index)"
            >
              {{ $t('ok') }}
            </el-button>
          </div>
          <el-button slot="reference" size="mini" type="danger" round icon="el-icon-delete">
            {{ $t('onlinePage.forcedOut') }}
          </el-button>
        </el-popover>
      </template>
    </sw-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CRUD, { crud, header, presenter } from '@/utils/crud'
import { del } from '@/api/monitor/online'
import i18n from '@/i18n'

// crud??????presenter??????
const defaultCrud = CRUD({ title: String(i18n.t('onlinePage.title')), url: '/online' })
export default {
  name: 'Online',
  mixins: [presenter(defaultCrud), header(), crud()],
  data() {
    return {
      delLoading: false,
      permission: {}
    }
  },
  computed: {
    ...mapGetters([
      'user', 'tableHeader'
    ]),
    tableData() {
      if (this.user.username === 'root') {
        return this.crud.data
      } else {
        return this.crud.data.filter(i => {
          return i.username !== 'root'
        })
      }
    }
  },
  created() {
    this.crud.msg.del = String(this.$i18n.t('onlinePage.forcedOutSuccess'))
    this.crud.optShow = {
      add: false,
      edit: false,
      del: false,
      download: true
    }
  },
  methods: {
    doDelete(data) {
      this.$confirm(String(this.$i18n.t('onlinePage.title1')) + data.length + String(this.$i18n.t('onlinePage.title2')), String(this.$i18n.t('confirmTips')), {
        confirmButtonText: String(this.$i18n.t('ok')),
        cancelButtonText: String(this.$i18n.t('cancel')),
        type: 'warning'
      }).then(() => {
        this.delMethod(data)
      }).catch(() => {
      })
    },
    // ????????????
    delMethod(key, index) {
      const ids = []
      if (key instanceof Array) {
        key.forEach(val => {
          ids.push(val.key)
        })
      } else {
        ids.push(key)
      }
      this.delLoading = true
      del(ids).then(response => {
        this.delLoading = false
        if (this.$refs[index]) {
          this.$refs[index].doClose()
        }
        this.crud.dleChangePage(1)
        this.crud.delSuccessNotifyForResult(response.data)
        this.crud.toQuery()
      }).catch(() => {
        this.delLoading = false
        if (this.$refs[index]) {
          this.$refs[index].doClose()
        }
      })
    }
  }
}
</script>
