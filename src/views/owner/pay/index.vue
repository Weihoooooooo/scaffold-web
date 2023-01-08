<template>
  <div class="app-container">
    <sw-back-top-and-bottom />
    <div class="head-container">
      <sw-search-date-picker-operation
        hidden-input
      >
        <template #left>
          <sw-select
            :options="buildingNums"
            placeholder="请选择楼宇"
            :enums="false"
            @change="handlerChoice"
          />
          <sw-select
            v-model="query.householdId"
            :options="households"
            placeholder="请选择梯户"
            :enums="false"
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
          <!-- 利用表单生成器生成表单内容 -->
        </el-form>
      </template>
      <template #footer>
        <el-button round @click="crud.cancelCU">{{ $t('cancel') }}</el-button>
        <el-button :loading="crud.cu === 2" type="primary" round @click="crud.submitCU">{{ $t('ok') }}</el-button>
      </template>
    </sw-dialog>
    <sw-table
      ref="scaffoldTable"
      :table-header="tableHeader.householdPay"
      :table-data="crud.data"
      :crud="crud"
      last-col-width="100"
      :last-col-permission="['root','HouseholdPay:update','HouseholdPay:delete']"
    >
      <template slot="household.identityId" slot-scope="scope">
        <span style="color: black;font-weight: bold">{{ scope.row.household.identityId }}</span>
      </template>
      <template slot="payWater" slot-scope="scope">
        <span>{{ scope.row.payWater }}</span>&nbsp;<el-tag type="info" size="mini">元</el-tag>
      </template>
      <template slot="buildingNum" slot-scope="scope">
        <span style="color: red;font-weight: bold">{{ scope.row.buildingNum }}</span>
      </template>
      <template slot="payElectric" slot-scope="scope">
        <span>{{ scope.row.payElectric }}</span>&nbsp;<el-tag type="info" size="mini">元</el-tag>
      </template>
      <template slot="payProperty" slot-scope="scope">
        <span>{{ scope.row.payProperty }}</span>&nbsp;<el-tag type="info" size="mini">元</el-tag>
      </template>
      <template slot="isPayWater" slot-scope="scope">
        <el-tag v-if="scope.row.isPayWater === 1" size="mini" type="success">{{ $enum.getDescByValue('PayEnum',scope.row.isPayWater) }}</el-tag>
        <el-tag v-else size="mini" type="danger">{{ $enum.getDescByValue('PayEnum',scope.row.isPayWater) }}</el-tag>
      </template>
      <template slot="isPayElectric" slot-scope="scope">
        <el-tag v-if="scope.row.isPayElectric === 1" size="mini" type="success">{{ $enum.getDescByValue('PayEnum',scope.row.isPayElectric) }}</el-tag>
        <el-tag v-else size="mini" type="danger">{{ $enum.getDescByValue('PayEnum',scope.row.isPayElectric) }}</el-tag>
      </template>
      <template slot="isPayProperty" slot-scope="scope">
        <el-tag v-if="scope.row.isPayProperty === 1" size="mini" type="success">{{ $enum.getDescByValue('PayEnum',scope.row.isPayProperty) }}</el-tag>
        <el-tag v-else size="mini" type="danger">{{ $enum.getDescByValue('PayEnum',scope.row.isPayProperty) }}</el-tag>
      </template>
      <template slot="data-operate" slot-scope="scope">
        <sw-update-delete-operation
          :show-edit="false"
          :permission="permission"
          :data="scope.row"
        />
      </template>
    </sw-table>
  </div>
</template>

<script>
import { del } from '@/api/owner/pay'
import { mapGetters } from 'vuex'
import CRUD, { crud, header, presenter } from '@/utils/crud'
import { getBuildingNums } from '@/api/xiaoqu/building'
import { getListForBuildingId } from '@/api/commons/household'

const defaultCrud = CRUD({
  url: '/householdPays',
  title: '业主缴费',
  crudMethod: { del }
})

export default {
  name: 'HouseholdPay',
  mixins: [
    presenter(defaultCrud),
    crud(),
    header()
  ],
  data() {
    return {
      permission: {
        del: ['root', 'HouseholdPay:delete']
      },
      buildingNums: [],
      households: []
    }
  },
  computed: {
    ...mapGetters(['tableHeader'])
  },
  created() {
    this.crud.optShow = {
      add: false,
      edit: false,
      del: true,
      download: true
    }
    this.getBuildingNums()
  },
  methods: {
    getBuildingNums() {
      getBuildingNums().then(res => {
        this.buildingNums = res.data
      })
    },
    handlerChoice(buildingId) {
      console.log(this.query)
      if (buildingId) {
        getListForBuildingId(buildingId).then(res => {
          this.households = res.data
          this.query.householdId = null
        })
      }
    }
  }
}
</script>
