<template>
  <div class="app-container">
    <sw-back-top-and-bottom />
    <div class="head-container">
      <sw-search-date-picker-operation
        :input-placeholder="String($t('feedback.placeholderInput'))"
        input-width="270"
        @reset="reset"
      >
        <template #right>
          <sw-select
            v-if="feedbackSelector"
            v-model="query.type"
            :options="$enum.getValueDescList('FeedbackTypeEnum')"
            width="150"
            :placeholder="String($t('feedback.type'))"
            @change="crud.toQuery"
          />
          <sw-select
            v-if="feedbackSelector"
            v-model="query.result"
            :options="$enum.getValueDescList('FeedbackResultEnum')"
            :placeholder="String($t('feedback.result'))"
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
      top="50px"
    >
      <template #title>
        {{ crud.status.title }}
      </template>
      <template #content>
        <el-form
          ref="form"
          inline
          :model="form"
          :rules="rules"
          label-suffix=":"
          label-width="170px"
        >
          <el-form-item :label="String($t('feedback.result'))" prop="result">
            <el-radio-group v-model="form.result" @change="typeChange">
              <el-radio-button label="0">{{ $t('feedback.unResolved') }}</el-radio-button>
              <el-radio-button label="1">{{ $t('feedback.resolved') }}</el-radio-button>
              <el-radio-button label="2">{{ $t('feedback.other') }}</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item :label="String($t('feedback.ownerName'))" prop="ownerName">
            <el-input v-model="form.ownerName" disabled :placeholder="String($t('feedback.ownerName'))" style="width: 450px" />
          </el-form-item>
          <el-form-item :label="String($t('feedback.title'))" prop="title">
            <el-input v-model="form.title" disabled :placeholder="String($t('feedback.title'))" style="width: 450px" />
          </el-form-item>
          <el-form-item :label="String($t('feedback.content'))" prop="content">
            <el-input
              v-model="form.content"
              disabled
              :autosize="{ minRows: 4, maxRows: 8}"
              type="textarea"
              :placeholder="String($t('feedback.content'))"
              style="width: 450px"
            />
          </el-form-item>
          <el-form-item :label="String($t('feedback.image'))" prop="feedbackImage">
            <template v-if="form.feedbackImage">
              <el-image
                v-for="(item,index) in handlerImage(form.feedbackImage)"
                :key="index"
                :src="item"
                :preview-src-list="handlerImage(form.feedbackImage)"
                fit="cover"
                lazy
                style="width: 100px;height: 100px;margin-right: 15px"
              />
            </template>
            <span v-else>{{ $t('feedback.no') }}</span>
          </el-form-item>
          <el-form-item :label="String($t('feedback.answer'))" prop="answer">
            <el-input
              v-model="form.answer"
              :autosize="{ minRows: 4, maxRows: 8}"
              type="textarea"
              :placeholder="String($t('feedback.answer'))"
              style="width: 450px"
            />
          </el-form-item>
          <el-form-item
            v-show="form.result.toString() !== '1'"
            :label="String($t('feedback.remarks'))"
            prop="remarks"
          >
            <el-input
              v-model="form.remarks"
              :autosize="{ minRows: 4, maxRows: 8}"
              type="textarea"
              :placeholder="String($t('feedback.remarks'))"
              style="width: 450px"
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
      :table-header="tableHeader.feedback"
      :table-data="crud.data"
      :crud="crud"
      :last-col-permission="['root','Feedback:update','Feedback:delete']"
    >
      <template slot="type" slot-scope="scope">
        <el-tag v-if="scope.row.type === 2" effect="dark" size="mini" type="success">{{ $enum.getDescByValue('FeedbackTypeEnum',scope.row.type) }}</el-tag>
        <el-tag v-else-if="scope.row.type === 0" effect="dark" size="mini" type="warning">{{ $enum.getDescByValue('FeedbackTypeEnum',scope.row.type) }}</el-tag>
        <el-tag v-else effect="dark" size="mini" type="danger">{{ $enum.getDescByValue('FeedbackTypeEnum',scope.row.type) }}</el-tag>
      </template>
      <template slot="feedbackImage" slot-scope="scope">
        <sw-avatar-image
          v-if="scope.row.feedbackImage"
          shape="square"
          :src="handlerImage(scope.row.feedbackImage)[0]"
          :preview-list="handlerImage(scope.row.feedbackImage)"
        />
        <span v-else>{{ $t('feedback.noData') }}</span>
      </template>
      <template slot="result" slot-scope="scope">
        <el-tag v-if="scope.row.result === 0" effect="dark" size="mini" type="warning">{{ $enum.getDescByValue('FeedbackResultEnum',scope.row.result) }}</el-tag>
        <el-tag v-else-if="scope.row.result === 1" effect="dark" size="mini" type="success">{{ $enum.getDescByValue('FeedbackResultEnum',scope.row.result) }}</el-tag>
        <el-tag v-else effect="dark" size="mini" type="info">{{ $enum.getDescByValue('FeedbackResultEnum',scope.row.result) }}</el-tag>
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
import { mapGetters } from 'vuex'
import CRUD, { crud, form, header, presenter } from '@/utils/crud'
import { del, edit } from '@/api/xiaoqu/feedback'
import i18n from '@/i18n'

const defaultCrud = CRUD({
  url: '/feedbacks',
  title: String(i18n.t('feedback.feedback')),
  sort: ['create_time,desc'],
  crudMethod: { edit, del }
})

const defaultForm = {
  id: null,
  username: '',
  type: null,
  title: '',
  content: '',
  feedbackImage: null,
  answer: '',
  result: '?????????',
  remarks: ''
}

export default {
  name: 'Feedback',
  mixins: [
    presenter(defaultCrud),
    header(),
    crud(),
    form(defaultForm)
  ],
  data() {
    return {
      feedbackSelector: true,
      permission: {
        edit: ['root', 'Feedback:update'],
        del: ['root', 'Feedback:delete']
      },
      rules: {
        answer: [
          { required: true, trigger: 'blur', message: String(i18n.t('feedback.message')) }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'tableHeader'
    ])
  },
  created() {
    this.crud.optShow = {
      add: false,
      edit: true,
      del: true,
      download: true
    }
  },
  methods: {
    handlerImage(str) {
      if (str) {
        return str.split(',')
      } else {
        return str
      }
    },
    typeChange(label) {
      this.$refs.form.clearValidate()
    },
    reset() {
      this.feedbackSelector = false
      this.$nextTick(() => {
        this.feedbackSelector = true
      })
    }
  }
}
</script>
