<template>
  <div>
    <el-table
      ref="table"
      v-loading="crud.loading"
      class="my-table"
      style="width: 100%;"
      :data="tableData"
      :border="isBorder"
      :stripe="isStripe"
      :default-sort="defaultSort"
      :tooltip-effect="tooltipEffect"
      :header-cell-style="{color:'#333333',fontWeight:'bold'}"
      :size="size"
      :highlight-current-row="highlightCurrentRow"
      :tree-props="treeProps"
      :row-key="rowKey"
      @current-change="currentChange"
      @select="select"
      @select-all="selectAll"
      @selection-change="crud.selectionChangeHandler"
      @sort-change="changeFlag"
    >
      <slot v-if="openExpand" name="expand-col" />

      <el-table-column
        v-if="showFirstCol"
        type="selection"
        :width="firstColWidth"
        :fixed="firstColFixed"
        :align="firstColAlign"
      />

      <template v-for="(item,index) in tableHeader">
        <el-table-column
          v-if="columns.visible(item.prop)"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :fixed="item.fixed"
          :width="item.width"
          :sortable="item.sortable"
          :show-overflow-tooltip="item.showOverflowTooltip"
          :align="colAlignComputed(item.align)"
        >
          <template slot-scope="scope">
            <slot v-if="item.slot" :name="item.prop" :row="scope.row" :$index="scope.$index" />
            <span v-else-if="scope.row[item.prop] === null || scope.row[item.prop] === '' || scope.row[item.prop] === undefined">
              {{ $t('nodata') }}
            </span>
            <template
              v-else-if="item.prop === 'createTime' || item.prop === 'updateTime'
                || item.prop === 'answerTime' || item.prop === 'loginTime'
                || item.prop === 'lastMaintainTime'"
            >
              <sw-relative-time
                v-if="flag"
                :timestamp="scope.row[item.prop]"
              />
            </template>
            <span v-else>{{ scope.row[item.prop] }}</span>
          </template>
        </el-table-column>
      </template>

      <el-table-column
        v-if="isLastCol"
        v-permission="lastColPermission"
        :label="lastColLabel"
        :width="lastColWidth"
        :align="lastColAlign"
        :fixed="lastColFixed"
      >
        <template slot-scope="scope">
          <slot name="data-operate" :row="scope.row" :$index="scope.$index" />
        </template>
        <template v-if="showRefresh" slot="header">
          <div style="display: inline-block;float: right;cursor:pointer;" @click="crud.refresh()">
            {{ lastColLabel }}
            <i class="el-icon-refresh" />
          </div>
        </template>
      </el-table-column>

      <slot name="right-col" />
    </el-table>

    <sw-pagination-operation v-if="isPagination" />

  </div>
</template>

<script>
import i18n from '@/i18n'

function obColumns(columns) {
  return {
    visible(col) {
      return !columns || !columns[col] ? true : columns[col].visible
    }
  }
}

export default {
  name: 'SwTable',
  props: {
    // CRUD??????
    crud: {
      type: Object,
      required: true
    },
    // ???????????????
    tableData: {
      type: Array,
      required: true,
      default: function () {
        return []
      }
    },
    // ???????????????
    isBorder: {
      type: Boolean,
      required: false,
      default: false
    },
    // ???????????????????????????????????????
    defaultSort: {
      type: Object,
      required: false,
      default: () => {
        return { prop: 'createTime', order: 'descending' }
      }
    },
    // ??????????????????
    isStripe: {
      type: Boolean,
      required: false,
      default: true
    },
    // tooltip effect ??????
    tooltipEffect: {
      type: String,
      required: false,
      default: 'light'
    },
    // eslint-disable-next-line vue/require-default-prop
    size: {
      type: String,
      required: false
    },
    // ????????????????????????
    highlightCurrentRow: {
      type: Boolean,
      required: false,
      default: false
    },
    // ?????????????????????????????????
    treeProps: {
      type: Object,
      default() {
        return {
          hasChildren: 'hasChildren',
          children: 'children'
        }
      }
    },
    // eslint-disable-next-line vue/require-default-prop
    rowKey: {
      type: [String, Function],
      required: false
    },
    // ?????????????????????
    isFirstCol: {
      type: Boolean,
      required: false,
      default: true
    },
    // ??????????????????expand??????
    openExpand: {
      type: Boolean,
      required: false,
      default: false
    },
    // ??????????????????
    firstColWidth: {
      type: String,
      required: false,
      default: '55'
    },
    // ??????????????????(left/right)
    firstColFixed: {
      type: String || Boolean,
      required: false,
      default: 'left'
    },
    // ???????????????
    tableHeader: {
      type: Array,
      required: true
    },
    // ????????????????????????
    firstColAlign: {
      type: String,
      required: false,
      default: 'center'
    },
    // ??????????????????
    colAlign: {
      type: String,
      required: false,
      default: 'center'
    },
    // ????????????????????????
    isLastCol: {
      type: Boolean,
      required: false,
      default: true
    },
    // ??????????????????????????????
    lastColPermission: {
      type: Array,
      required: false,
      default: () => {}
    },
    // ?????????????????????
    lastColLabel: {
      type: String,
      required: false,
      default: String(i18n.t('scaffoldTable.operate'))
    },
    // ?????????????????????
    lastColWidth: {
      type: String,
      required: false,
      default: '125'
    },
    // ???????????????????????????
    lastColAlign: {
      type: String,
      required: false,
      default: 'center'
    },
    // ?????????????????????(left/right)
    lastColFixed: {
      type: [String, Boolean],
      required: false,
      default: 'right'
    },
    // ????????????"expand"?????????
    expandTitle: {
      type: Array,
      required: false,
      default: () => {}
    },
    // ??????????????????
    isPagination: {
      type: Boolean,
      required: false,
      default: true
    },
    // ????????????????????????(???????????????????????????)
    showRefresh: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      flag: true,
      columns: obColumns()
    }
  },
  computed: {
    showFirstCol() {
      if (this.openExpand) {
        return false
      } else {
        return this.isFirstCol
      }
    }
  },
  mounted() {
    const columns = {}
    this.$refs.table.columns.forEach(e => {
      if (!e.property || e.type !== 'default') {
        return
      }
      columns[e.property] = {
        label: e.label,
        visible: true
      }
    })
    this.columns = obColumns(columns)
    this.crud.updateProp('tableColumns', columns)
  },
  // ???????????????????????????????????????
  beforeUpdate() {
    this.updateLayout()
  },
  updated() {
    this.updateLayout()
  },
  methods: {
    // ?????????SWRelativeTime????????????????????????????????????????????????
    changeFlag() {
      this.flag = false
      this.$nextTick(() => {
        this.flag = true
      })
    },
    currentChange(val) {
      this.$emit('current-change', val)
    },
    select(selection, row) {
      this.$emit('select', selection, row)
    },
    selectAll(selection) {
      this.$emit('select-all', selection)
    },
    updateLayout() {
      this.$nextTick(() => {
        this.$refs.table.doLayout()
      })
    },
    colAlignComputed(itemAlign) {
      if (itemAlign) {
        return itemAlign
      } else {
        return this.colAlign
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.my-table {
  ::v-deep .el-table__body-wrapper {
    // ?????????????????????
    &::-webkit-scrollbar {
      width: 17px;
      height: 17px;
      background-color: #dddee0;
    }

    // ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
    &::-webkit-scrollbar-thumb {
      background: rgba(144, 147, 153, 0.54);
      cursor: pointer;
      border-radius: 10px;
      position: relative;
      transition: background-color .3s;
      transition-property: background-color;
      transition-duration: 0.3s;
      transition-timing-function: ease;
      transition-delay: 0s;
    }

    ::-webkit-scrollbar-track {
      border-radius: 10px;
    }
  }
}

.demo-table-expand {
  font-size: 0;
  margin-left: 25px;
}
</style>
