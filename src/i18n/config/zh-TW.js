import zhTWLocale from 'element-ui/lib/locale/lang/zh-TW'
import enumZhTWLocale from '@/enums/lang/zh-TW'

export default {
  ...zhTWLocale,
  ...enumZhTWLocale,
  global: {
    title: 'Scaffold - 管理系統',
    login: '登入',
    caseNumber: '粵ICP備XXXXXXXX號'
  },
  login: {
    title: 'Scaffold - 智慧物業管理系統',
    welcome: 'Scaffold - 歡迎登錄',
    placeholderUsername: '請輸入用戶名',
    placeholderPassword: '請輸入密碼',
    placeholderCode: '點擊圖片更換驗證碼',
    rememberMe: '記住我',
    loginButton: '登入',
    loginLoading: '登入中...',
    rules: {
      usernameMessage: '用戶名不能為空',
      passwordMessage: '密碼不能為空',
      codeMessage: '驗證碼不能為空'
    },
    errorMessage: '輸入的資訊有誤！'
  },
  dashboard: {
    title: '首頁'
  },
  center: {
    title: '個人中心'
  },
  navbar: {
    codeAddress: '源碼地址',
    screenFull: '全屏縮放',
    i18nSelect: '語言切換',
    sizeSelect: '佈局設定',
    systemLayoutSettings: '系統佈局設定',
    personalCenter: '個人中心',
    logout: '登出'
  },
  settings: {
    systemLayoutSettings: '系統佈局設定',
    themeColor: '主題顏色',
    isShowLabels: '顯示標籤',
    isFixedHead: '固定頭部',
    isShowLogo: '顯示LOGO',
    isShowOnceMenu: '選單手風琴模式',
    showFooter: '是否開啟頁腳'
  },
  code: {
    frontCode: '前端源碼',
    backCode: '後端源碼'
  },
  logout: {
    message: '確定註銷並退出系統嗎？'
  },
  tagsView: {
    refresh: '重繪',
    close: '關閉',
    closeOther: '關閉其他',
    closeAll: '關閉全部'
  },
  headerSearch: '査詢',
  no: '暫無',
  nodata: '暫無數據',
  error: '錯誤',
  serverException: '服務器异常',
  networkTimeOut: '網絡請求超時',
  apiRequestFail: '介面請求失敗',
  message_401: '登入狀態已過期，您可以繼續留在該頁面，或者重新登入',
  title_401: '系統提示',
  confirmButtonText_401: '重新登入',
  confirmTips: '提示',
  ok: '確定',
  cancel: '取消',
  systemMonitor: {
    systemInfo: {
      title: '系統資訊',
      os: '作業系統',
      jdk: 'Java版本',
      runTime: '程式啟動時間',
      timeNow: '系統當前時間'
    },
    cpu: {
      title: 'CPU',
      cpuInfo: 'CPU資訊',
      cpuUseRate: 'CPU使用率'
    },
    ram: {
      title: '記憶體',
      ramTotal: '記憶體總量',
      ramUsed: '已用記憶體',
      ramUsedRate: '記憶體使用率'
    },
    disk: {
      title: '磁片',
      diskTotal: '磁片總量',
      diskUsed: '已用磁片',
      diskUsedRate: '磁片使用率'
    },
    jvm: {
      heapTitle: 'JVM堆記憶體',
      nonHeapTitle: 'JVM非堆記憶體',
      heapInit: '初始大小',
      heapMax: '最大可用',
      heapUsed: '已使用',
      heapCommitted: '已申請',
      noInfo: '暫無資訊'
    }
  },
  realTimeLog: {
    title: '後臺實时日誌',
    tips: '1秒重繪一次',
    closeText: '清屏',
    scrollBottom: '滾動至底部',
    openAutoScroll: '開啟自動滾動',
    closeAutoScroll: '關閉自動滾動'
  },
  crud: {
    js: {
      state: {
        add: '新增',
        edit: '編輯'
      },
      submit: '提交成功',
      add: '新增成功',
      edit: '編輯成功',
      del: '删除成功'
    },
    buttonOperation: {
      add: '新增',
      edit: '編輯',
      del: '删除',
      download: '匯出',
      chooseAll: '全選',
      tip1: '確認删除選中的',
      tip2: '條數據?',
      tip3: '請至少選擇一列'
    },
    searchResetOperation: {
      search: '蒐索',
      reset: '重置'
    },
    searchDatePickerOperation: {
      placeholder: '請輸入你要搜索的內容',
      startTime: '開始日期',
      endTime: '結束日期'
    },
    updateDeleteOperation: {
      msg: '確定刪除本條數據嗎?'
    }
  },
  onlinePage: {
    title: '線上用戶',
    blurry: '模糊搜索',
    forcedOut: '强退',
    forcedOutSuccess: '强退成功!',
    tips: '確定強制退出該用戶嗎?',
    operation: '操作',
    title1: '確認强退選中的',
    title2: '個用戶嗎?'
  },
  playLogsPage: {
    title: '操作日誌',
    none: '無',
    delTitle: '確認清空所有操作日誌嗎?',
    empty: '清空'
  },
  tableHeader: {
    online: {
      username: '用戶名',
      ip: '登入IP',
      browser: '瀏覽器',
      address: '登入地點',
      loginTime: '登入時間'
    },
    playLogs: {
      logs: {
        username: '用戶名',
        requestIp: 'IP',
        address: 'IP來源',
        title: '操作',
        browser: '瀏覽器',
        businessType: '業務類型',
        time: '操作耗時',
        createTime: '操作時間'
      },
      expand: {
        requestMethod: '請求類型',
        requestUrl: '請求URL',
        status: '操作狀態',
        method: '請求方法',
        requestParams: '請求參數',
        responseResult: '響應結果'
      }
    },
    errorLogs: {
      logs: {
        username: '用戶名',
        requestIp: 'IP',
        address: 'IP來源',
        title: '操作',
        logType: '日誌等級',
        browser: '瀏覽器',
        businessType: '業務類型',
        createTime: '操作時間'
      },
      expand: {
        requestMethod: '請求類型',
        requestUrl: '請求URL',
        status: '操作狀態',
        method: '請求方法',
        requestParams: '請求參數',
        responseResult: '響應結果'
      }
    },
    center: {
      playLogs: {
        title: '操作',
        requestIp: 'IP',
        browser: '瀏覽器',
        address: 'IP來源',
        time: '耗時',
        createTime: '操作時間'
      },
      errorLogs: {
        title: '操作',
        requestIp: 'IP',
        browser: '瀏覽器',
        address: 'IP來源',
        createTime: '操作時間'
      }
    },
    user: {
      username: '用戶名',
      avatarPath: '頭像',
      sex: '性別',
      email: '郵箱',
      phone: '電話',
      enabled: '狀態',
      updateTime: '修改時間',
      createTime: '註冊時間'
    },
    avatar: {
      username: '用戶名',
      path: '頭像',
      realName: '檔名',
      size: '文件大小',
      enabled: '是否已稽核',
      updateTime: '修改時間',
      createTime: '創建時間'
    },
    role: {
      name: '角色',
      permission: '角色許可權',
      level: '角色等級',
      updateTime: '修改時間',
      createTime: '創建時間'
    },
    menu: {
      name: '選單名稱',
      iconCls: '圖標',
      sort: '排序',
      componentName: '組件名',
      url: '路徑',
      permission: '許可權',
      hidden: '可見',
      enabled: '狀態',
      type: '選單類型',
      createTime: '創建時間'
    },
    owner: {
      name: '業主姓名',
      sex: '性別',
      phone: '手機',
      identityId: '身份證',
      email: '郵箱',
      createTime: '創建時間',
      updateTime: '修改時間'
    },
    localStorage: {
      serverUrl: '預覽圖',
      fileName: '檔名',
      suffix: '檔案尾碼',
      type: '檔案類型',
      size: '文件大小',
      creteTime: '上傳時間'
    },
    feedback: {
      ownerName: '業主名稱',
      title: '標題',
      feedbackType: '迴響類型',
      content: '內容',
      feedbackImage: '迴響圖片',
      answer: '回復',
      username: '處理人',
      result: '處理結果',
      remarks: '備註',
      answerTime: '回復時間',
      createTime: '迴響時間'
    },
    building: {
      buildingNum: '樓宇棟號',
      floor: '樓宇層數',
      floorNum: '一梯幾戶',
      number: '總戶數',
      createTime: '創建時間',
      updateTime: '修改時間'
    }
  },
  scaffoldJsonViewer: {
    copyText: '複製',
    copiedText: '已復制'
  },
  errorLogsPage: {
    title: '錯誤日誌',
    none: '無',
    exceptionInfo: '異常詳情',
    lookInfo: '查看異常',
    delTitle: '確認清空所有操作日誌嗎?',
    empty: '清空',
    noUser: '未知用戶'
  },
  userCenter: {
    leftCard: {
      title: '個人信息(頭像需要審核通過後才能顯示)',
      avatarAlt: '點擊更換頭像',
      loginName: '登入帳號',
      sex: '性別',
      phone: '手機號碼',
      email: '郵箱',
      lastChangePass: '上一次修改密碼',
      lastChangeAvatar: '上一次修改頭像',
      resTime: '註冊時間',
      securitySetting: '安全設置',
      changePass: '修改密碼',
      changeEmail: '修改郵箱',
      no: '暫無'
    },
    rightCard: {
      playLogs: '操作日誌',
      errorLogs: '异常日誌'
    },
    avatar: {
      changeSuccess: '頭像修改成功！',
      changeFail: '頭像上傳失敗！',
      typeTip: '上傳的頭像只能是 JPG 或者 PNG格式！',
      sizeTip: '上傳的頭像圖片大小不能超過50MB！'
    },
    update: {
      pass: {
        oldPass: '舊密碼',
        newPass: '新密碼',
        confirmPass: '確認密碼',
        reset: '重置',
        confirmTip: '兩次輸入的密碼不一致',
        inputPassAgain: '請再次輸入密碼',
        newPassNotNull: '新密碼不能為空',
        tips: '必須以字母開頭，長度在6~18之間，只能包含字母、數位和底線',
        changePass: '修改密碼',
        inputOldPass: '請輸入舊密碼',
        toLogin: '密碼修改成功，請重新登入'
      },
      email: {
        newEmail: '新郵箱',
        prefix: '請輸入郵箱首碼',
        suffix: '請選擇尾碼',
        code: '驗證碼',
        codeTip: '請輸入驗證碼',
        password: '當前密碼',
        passwordTip: '請輸入密碼',
        changeEmail: '修改郵箱',
        getCode: '獲取驗證碼',
        passRule: '當前密碼不能為空',
        prefixRule: '郵箱首碼不能為空',
        codeRule: '驗證碼不能為空',
        suffixRule: '請選擇郵箱尾碼',
        codeSending: '驗證碼發送中',
        codeSendSuccess: '發送成功，驗證碼有效期5分鐘',
        codeBtnTip1: '秒後重新發送',
        codeBtnTip2: '重新發送',
        emailIsNull: '郵箱為空',
        emailError1: '郵箱不能為原郵箱',
        emailError2: '郵箱格式錯誤'
      }
    }
  },
  userPage: {
    placeholderInput: '請輸入用戶名査詢',
    placeholderPhone: '請輸入手機號後四位',
    placeholderSelect: '狀態',
    form: {
      username: '用戶名',
      phone: '電話',
      email: '郵箱',
      sex: '性別',
      man: '男',
      woman: '女',
      status: '狀態',
      statusOk: '啟用',
      statusNo: '禁用',
      role: '角色',
      rolePlaceholder: '請選擇'
    },
    column: {
      operate: '操作'
    },
    title: '用戶',
    validPhone: {
      error1: '請輸入電話號碼',
      error2: '請輸入正確的11比特手機號碼'
    },
    validUsername: {
      error1: '請輸入用戶名',
      error2: '長度在 2 到 10 個字元'
    },
    validEmail: {
      error1: '請輸入郵箱地址',
      error2: '請輸入正確的郵箱地址'
    },
    validRoles: {
      error: '請選擇角色'
    },
    createdTip: '新增成功，默認密碼：123456',
    rolesIsNull: '角色不能為空',
    enabledTips: {
      tip1: '此操作將',
      tip2: '，是否繼續？',
      tip3: '成功'
    }
  },
  avatarPage: {
    placeholderInput: '請輸入用戶名査詢',
    placeholderState: '稽核狀態',
    operate: '操作',
    title: '頭像',
    enable: '啟用',
    disable: '禁用',
    enabledTips: {
      tip1: '此操作將',
      tip2: '用戶 [',
      tip3: '] 的頭像，是否繼續？',
      tip4: '成功'
    }
  },
  menuPage: {
    title: '選單',
    state: '狀態',
    form: {
      type: '選單類型',
      type_1: '頂級選單',
      type_2: '子功能表',
      type_3: '許可權選單',
      iconCls: '功能表圖示',
      iconSelect: '點擊選擇圖標',
      parentId: '上級選單',
      treeSelect: '點擊選擇上級選單',
      name1: '選單操作許可權',
      name2: '選單名稱',
      path: '前端使用的Path',
      url: '後端使用的Url',
      permission: '許可權標識',
      keepAlive: '保持啟動',
      yes: '是',
      no: '否',
      sort: '排序',
      hidden: '選單可見',
      enabled: '選單是否可用',
      component: '組件路徑',
      componentName: '組件名稱'
    },
    operate: '操作',
    enable: '啟用',
    disable: '禁用',
    rules: {
      name: '請輸入選單名稱',
      name1: '請輸入選單操作許可權',
      path: '請輸入前端使用的Path',
      url: '請輸入後端使用的Url',
      componentName: '請輸入組件名稱',
      component: '請輸入組件路徑',
      permission: '請輸入許可權標識'
    },
    topMenu: '頂級選單',
    changeEnabled: {
      tip1: '此操作將',
      tip2: ' 選單 [',
      tip3: '] , 是否繼續?'
    },
    success: '成功'
  },
  scaffoldIconSelect: {
    placeholder: '請輸入圖標名稱'
  },
  scaffoldScreenFull: {
    tip: '你的瀏覽器不支持該操作!'
  },
  scaffoldSizeSelect: {
    tip: '佈局設定成功!'
  },
  scaffoldThemePicker: {
    tip: '正在編譯主題...'
  },
  scaffoldTreeSelect: {
    tip: '點擊選擇!'
  },
  scaffoldTable: {
    operate: '操作'
  },
  scaffoldRelativeTime: {
    just: '剛剛',
    minute: '分鐘前',
    hour: '小時前',
    day: '天前'
  },
  rolePage: {
    title: '角色',
    inputPlaceholder: '請輸入角色名稱或許可權等級蒐索',
    form: {
      name: '角色名稱',
      permission: '角色許可權',
      level: '角色級別'
    },
    roleCardTitle: '角色清單（修改選單後該角色需要註銷重新登入）',
    operate: '操作',
    tooltipContent: '選擇指定角色分配選單',
    menuCardTitle: '選單分配',
    save: '保存',
    rules: {
      name: '請輸入名稱',
      permission: '請輸入許可權',
      nameZhCn: '請輸入中國大陸名稱',
      nameZhHk: '請輸入中國香港名稱',
      nameZhTw: '請輸入中國臺灣名稱',
      nameEnUs: '請輸入英文名稱',
      saveSuccess: '保存成功!'
    }
  },
  validate: {
    ip: '請輸入正確的IP地址',
    phoneTwo: '請輸入正確的電話號碼或者固話號碼',
    telephone: '請輸入正確的固話（格式：區號+號碼，如010-1234567）',
    idNo: '請輸入正確的身份證號碼',
    phone1: '請輸入手機號碼！',
    phone2: '請輸入正確的11比特手機號碼',
    email1: '請輸入郵箱！',
    email2: '請輸入正確的郵箱！',
    url1: '請輸入URL！',
    url2: '請輸入正確的URL！'
  },
  ownerPage: {
    title: '業主',
    inputPlaceholder: '請輸入姓名或者手機號後四比特蒐索',
    form: {
      name: '業主姓名',
      phone: '業主電話',
      sex: '性別',
      male: '男',
      female: '女',
      identityId: '身份證',
      email: '郵箱'
    },
    dialog: {
      title: '驗證密碼',
      pass: '密碼',
      passPlaceholder: '請輸入密碼',
      pwd: '密碼不能為空！'
    },
    operate: '操作',
    btnText: '重置密碼',
    content1: '確認重置密碼嗎?',
    content2: '原始密碼為身份證號後六比特',
    rule: '請輸入姓名',
    resetSuccess: '重置成功!',
    notify: {
      title: '錯誤',
      message: '密碼錯誤！'
    }
  },
  localStoragePage: {
    title: '存儲',
    upload: '上傳',
    fileUpload: '檔案上傳',
    fileUpdate: '編輯檔案',
    fileName: '檔名',
    fileNamePlaceholder: '檔名（不帶尾碼）',
    putFile: '添加檔案',
    uploadTip: '可上傳任意格式檔案，且不超過20M',
    uploadErrorTip: '上傳文件大小不能超過 20MB！',
    uploadSuccess: '上傳成功!',
    uploadFail: '上傳失敗!',
    uploadFailTip: '文件上傳失敗!'
  },
  sysSetting: {
    sysName: '系統標題',
    sysNameZhCn: '系統標題zh-CN',
    sysNameZhHk: '系統標題zh-HK',
    sysNameZhTw: '系統標題zh-TW',
    sysNameEnUs: '系統標題en-US',
    sysLogo: '系統Logo地址',
    userInitPassword: '用戶初始密碼',
    form: {
      sysName: '請輸入系統標題',
      sysNameZhCn: '請輸入系統標題zh-CN',
      sysNameZhHk: '請輸入系統標題zh-HK',
      sysNameZhTw: '請輸入系統標題zh-TW',
      sysNameEnUs: '請輸入系統標題en-US',
      userInitPassword: '請輸入用戶初始密碼'
    },
    saveSuccess: '保存成功！',
    saveMessage: '系統參數保存成功！',
    saveBtn: '保存配寘'
  },
  notice: {
    title: '通知',
    inputPlaceholder: '請輸入通知標題和內容査詢',
    isOverdue: '是否過期',
    sendScope: '發送範圍',
    sender: '發送人',
    noticeScope: '通知範圍',
    all: '全體業主',
    allP: '全體員工',
    allp: '全體人員',
    overdue: '已過期',
    noOverdue: '未過期',
    noticeTitle: '通知標題',
    noticeContent: '通知內容',
    delPopoverTip: '確認删除該通知嗎?'
  },
  feedback: {
    placeholderInput: '請輸入迴響標題，內容或備註進行蒐索',
    type: '迴響類型',
    result: '處理結果',
    unResolved: '未解决',
    resolved: '已解决',
    other: '其他',
    ownerName: '迴響業主',
    title: '迴響標題',
    content: '迴響內容',
    image: '迴響圖片',
    answer: '回復',
    remarks: '備註',
    noData: '暫無數據',
    feedback: '反饋',
    message: '回復不能為空!',
    no: '無'
  },
  building: {
    title: '樓宇',
    buildingNum: '建築棟號',
    floor: '建築層數',
    floorNum: '一梯幾戶',
    message1: '請輸入建築棟號',
    message2: '建築層數必須是數位',
    message3: '該項必須是數位'
  },
  scaffoldLogoAlt: '首頁',
  scaffoldSelect: {
    placeholder: '請選擇'
  },
  data: '數據'
}
