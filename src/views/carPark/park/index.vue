<template>
  <div class="app-container">
    <sw-back-top-and-bottom />
    <div class="head-container">
      <sw-search-date-picker-operation @reset="reset">
        <template #right>
          <sw-select
            v-if="typeSelector"
            v-model="query.type"
            placeholder="车位类型"
            :options="$enum.getValueDescList('ParkTypeEnum')"
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
          <el-form-item label="停车场区域" prop="parkLotId">
            <sw-select
              v-model="form.parkLotId"
              :options="regionList"
              placeholder="请选择停车场区域"
              :enums="false"
              width="150"
            />
          </el-form-item>
          <el-form-item label="车位类型" prop="type">
            <sw-select
              v-model="form.type"
              placeholder="车位类型"
              :options="$enum.getValueDescList('ParkTypeEnum')"
            />
          </el-form-item>
          <el-form-item label="是否购买" prop="isBuy">
            <sw-select
              v-model="form.isBuy"
              placeholder="是否购买"
              :options="$enum.getValueDescList('IsBuyEnum')"
            />
          </el-form-item>
          <el-form-item label="车位独立编号" prop="identityId">
            <el-input v-model="form.identityId" clearable placeholder="车位独立编号" />
          </el-form-item>
          <el-form-item label="车位价格(元)" prop="price">
            <el-input-number
              v-model="form.price"
              controls-position="right"
              :min="0.01"
              :precision="2"
              :step="0.01"
            />
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
      :table-header="tableHeader.park"
      :table-data="crud.data"
      :crud="crud"
      :last-col-permission="['root','Park:update','Park:delete']"
    >
      <template slot="region" slot-scope="scope">
        <span style="font-weight: bold;color: red">{{ scope.row.region }}</span>
      </template>
      <template slot="price" slot-scope="scope">
        <b>￥</b><span>{{ scope.row.price }}</span>&nbsp;<el-tag type="info" size="mini">万</el-tag>
      </template>
      <template slot="type" slot-scope="scope">
        <el-tag v-if="scope.row.type === 0" size="mini">
          {{ $enum.getDescByValue('ParkTypeEnum',scope.row.type) }}
        </el-tag>
        <el-tag v-else size="mini" type="success">
          {{ $enum.getDescByValue('ParkTypeEnum',scope.row.type) }}
        </el-tag>
      </template>
      <template slot="isBuy" slot-scope="scope">
        <el-tag v-if="scope.row.isBuy === 1" size="mini" type="danger">
          {{ $enum.getDescByValue('IsBuyEnum',scope.row.isBuy) }}
        </el-tag>
        <el-tag v-else size="mini" type="success">
          {{ $enum.getDescByValue('IsBuyEnum',scope.row.isBuy) }}
        </el-tag>
      </template>
      <template slot="data-operate" slot-scope="scope">
        <sw-update-delete-operation
          :permission="permission"
          :data="scope.row"
        />
      </template>
    </sw-table>
  </div>
</template>

<script>
import { add, edit, del } from '@/api/carPark/park'
import { mapGetters } from 'vuex'
import CRUD, { crud, form, header, presenter } from '@/utils/crud'
import { getRegions } from '@/api/carPark/parkLot'

const defaultCrud = CRUD({
  url: '/parks',
  title: '车位信息表',
  crudMethod: { add, edit, del }
})

const defaultForm = {
  id: null,
  parkLotId: null,
  region: '',
  type: null,
  isBuy: null,
  identityId: '',
  price: 0.00
}
export default {
  name: 'Park',
  mixins: [
    presenter(defaultCrud),
    crud(),
    header(),
    form(defaultForm)
  ],
  data() {
    return {
      typeSelector: true,
      regionList: [],
      permission: {
        add: ['root', 'Park:add'],
        edit: ['root', 'Park:update'],
        del: ['root', 'Park:delete']
      },
      rules: {
        identityId: [
          { required: true, message: '车位独立编号不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['tableHeader'])
  },
  created() {
    this.getRegionList()
  },
  methods: {
    getRegionList() {
      getRegions().then(res => {
        this.regionList = res.data
      })
    },
    reset() {
      this.typeSelector = false
      this.$nextTick(() => {
        this.typeSelector = true
      })
    }
  }
}
</script>
