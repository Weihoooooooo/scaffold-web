import i18n from '@/i18n'

const state = {
  online: [
    { prop: 'username', label: String(i18n.t('tableHeader.online.username')), sortable: false, slot: true },
    { prop: 'ip', label: String(i18n.t('tableHeader.online.ip')), sortable: false },
    { prop: 'browser', label: String(i18n.t('tableHeader.online.browser')), sortable: false, slot: true },
    { prop: 'address', label: String(i18n.t('tableHeader.online.address')), sortable: false },
    { prop: 'loginTime', label: String(i18n.t('tableHeader.online.loginTime')), sortable: true }
  ],
  playLogs: {
    logs: [
      { prop: 'username', label: String(i18n.t('tableHeader.playLogs.logs.username')), width: '100', slot: true },
      { prop: 'requestIp', label: String(i18n.t('tableHeader.playLogs.logs.requestIp')), width: '150' },
      { prop: 'address', label: String(i18n.t('tableHeader.playLogs.logs.address')), width: '200', showOverflowTooltip: true },
      { prop: 'title', label: String(i18n.t('tableHeader.playLogs.logs.title')), width: '200' },
      { prop: 'browser', label: String(i18n.t('tableHeader.playLogs.logs.browser')) },
      { prop: 'businessType', label: String(i18n.t('tableHeader.playLogs.logs.businessType')), slot: true },
      { prop: 'time', label: String(i18n.t('tableHeader.playLogs.logs.time')), sortable: true, width: '100', slot: true },
      { prop: 'createTime', label: String(i18n.t('tableHeader.playLogs.logs.createTime')), sortable: true, width: '150' }
    ],
    expand: [
      { prop: 'requestMethod', label: String(i18n.t('tableHeader.playLogs.expand.requestMethod')) },
      { prop: 'requestUrl', label: String(i18n.t('tableHeader.playLogs.expand.requestUrl')) },
      { prop: 'status', label: String(i18n.t('tableHeader.playLogs.expand.status')) },
      { prop: 'method', label: String(i18n.t('tableHeader.playLogs.expand.method')) },
      { prop: 'requestParams', label: String(i18n.t('tableHeader.playLogs.expand.requestParams')) },
      { prop: 'responseResult', label: String(i18n.t('tableHeader.playLogs.expand.responseResult')) }
    ]
  },
  errorLogs: {
    logs: [
      { prop: 'username', label: String(i18n.t('tableHeader.errorLogs.logs.username')), width: '100', slot: true },
      { prop: 'requestIp', label: String(i18n.t('tableHeader.errorLogs.logs.requestIp')), width: '150' },
      { prop: 'address', label: String(i18n.t('tableHeader.errorLogs.logs.address')), width: '200', showOverflowTooltip: true },
      { prop: 'title', label: String(i18n.t('tableHeader.errorLogs.logs.title')), width: '200' },
      { prop: 'logType', label: String(i18n.t('tableHeader.errorLogs.logs.logType')), slot: true },
      { prop: 'browser', label: String(i18n.t('tableHeader.errorLogs.logs.browser')) },
      { prop: 'businessType', label: String(i18n.t('tableHeader.errorLogs.logs.businessType')), slot: true },
      { prop: 'createTime', label: String(i18n.t('tableHeader.errorLogs.logs.createTime')), sortable: true, width: '200' }
    ],
    expand: [
      { prop: 'requestMethod', label: String(i18n.t('tableHeader.errorLogs.expand.requestMethod')) },
      { prop: 'requestUrl', label: String(i18n.t('tableHeader.errorLogs.expand.requestUrl')) },
      { prop: 'status', label: String(i18n.t('tableHeader.errorLogs.expand.status')) },
      { prop: 'method', label: String(i18n.t('tableHeader.errorLogs.expand.method')) },
      { prop: 'requestParams', label: String(i18n.t('tableHeader.errorLogs.expand.requestParams')) },
      { prop: 'responseResult', label: String(i18n.t('tableHeader.errorLogs.expand.responseResult')) }
    ]
  },
  center: {
    playLogs: [
      { prop: 'title', label: String(i18n.t('tableHeader.center.playLogs.title')), width: '200' },
      { prop: 'requestIp', label: String(i18n.t('tableHeader.center.playLogs.requestIp')), width: '150' },
      { prop: 'browser', label: String(i18n.t('tableHeader.center.playLogs.browser')) },
      { prop: 'address', label: String(i18n.t('tableHeader.center.playLogs.address')), showOverflowTooltip: true },
      { prop: 'time', label: String(i18n.t('tableHeader.center.playLogs.time')), sortable: true, width: '100', slot: true },
      { prop: 'createTime', label: String(i18n.t('tableHeader.center.playLogs.createTime')), sortable: true, width: '200' }
    ],
    errorLogs: [
      { prop: 'title', label: String(i18n.t('tableHeader.center.errorLogs.title')), width: '200' },
      { prop: 'requestIp', label: String(i18n.t('tableHeader.center.errorLogs.requestIp')), width: '150' },
      { prop: 'browser', label: String(i18n.t('tableHeader.center.errorLogs.browser')) },
      { prop: 'address', label: String(i18n.t('tableHeader.center.errorLogs.address')), showOverflowTooltip: true },
      { prop: 'createTime', label: String(i18n.t('tableHeader.center.errorLogs.createTime')), sortable: true, width: '200' }
    ]
  },
  users: [
    { prop: 'username', label: String(i18n.t('tableHeader.user.username')), width: '100', fixed: 'left', slot: true },
    { prop: 'avatar.path', label: String(i18n.t('tableHeader.user.avatarPath')), slot: true },
    { prop: 'sex', label: String(i18n.t('tableHeader.user.sex')), slot: true },
    { prop: 'email', label: String(i18n.t('tableHeader.user.email')), width: '200', slot: true },
    { prop: 'phone', label: String(i18n.t('tableHeader.user.phone')), width: '150', slot: true },
    { prop: 'enabled', label: String(i18n.t('tableHeader.user.enabled')), slot: true },
    { prop: 'updateTime', label: String(i18n.t('tableHeader.user.updateTime')), sortable: true, width: '200' },
    { prop: 'createTime', label: String(i18n.t('tableHeader.user.createTime')), sortable: true, width: '200' }
  ],
  avatars: [
    { prop: 'username', label: String(i18n.t('tableHeader.avatar.username')), width: '150', fixed: 'left', slot: true },
    { prop: 'path', label: String(i18n.t('tableHeader.avatar.path')), width: '150', slot: true },
    { prop: 'realName', label: String(i18n.t('tableHeader.avatar.realName')), showOverflowTooltip: true },
    { prop: 'size', label: String(i18n.t('tableHeader.avatar.size')), width: '150' },
    { prop: 'enabled', label: String(i18n.t('tableHeader.avatar.enabled')), width: '150', slot: true },
    { prop: 'updateTime', label: String(i18n.t('tableHeader.avatar.updateTime')), sortable: true, width: '200' },
    { prop: 'createTime', label: String(i18n.t('tableHeader.avatar.createTime')), sortable: true, width: '200' }
  ],
  roles: [
    { prop: 'name', label: String(i18n.t('tableHeader.role.name')), width: '100', fixed: 'left' },
    { prop: 'nameZhCn', label: 'zh-CN', width: '100' },
    { prop: 'nameZhHk', label: 'zh-HK', width: '100' },
    { prop: 'nameZhTw', label: 'zh-TW', width: '100' },
    { prop: 'nameEnUs', label: 'en-US', width: '100' },
    { prop: 'permission', label: String(i18n.t('tableHeader.role.permission')), width: '100' },
    { prop: 'level', label: String(i18n.t('tableHeader.role.level')), sortable: true, width: '100' },
    { prop: 'updateTime', label: String(i18n.t('tableHeader.role.updateTime')), sortable: true, width: '200' },
    { prop: 'createTime', label: String(i18n.t('tableHeader.role.createTime')), sortable: true, width: '200' }
  ],
  menus: [
    { prop: 'name', label: String(i18n.t('tableHeader.menu.name')), width: '200', showOverflowTooltip: true, fixed: 'left', align: 'left' },
    { prop: 'iconCls', label: String(i18n.t('tableHeader.menu.iconCls')), width: '100', slot: true },
    { prop: 'sort', label: String(i18n.t('tableHeader.menu.sort')), sortable: true, width: '100', slot: true },
    { prop: 'componentName', label: String(i18n.t('tableHeader.menu.componentName')), width: '150', showOverflowTooltip: true },
    { prop: 'url', label: String(i18n.t('tableHeader.menu.url')), showOverflowTooltip: true },
    { prop: 'permission', label: String(i18n.t('tableHeader.menu.permission')), width: '200' },
    { prop: 'hidden', label: String(i18n.t('tableHeader.menu.hidden')), slot: true },
    { prop: 'enabled', label: String(i18n.t('tableHeader.menu.enabled')), slot: true },
    { prop: 'type', label: String(i18n.t('tableHeader.menu.type')), width: '150', slot: true },
    { prop: 'createTime', label: String(i18n.t('tableHeader.menu.createTime')), sortable: true, width: '200' }
  ],
  ownerInfo: [
    { prop: 'name', label: String(i18n.t('tableHeader.owner.name')), fixed: 'left', width: '150' },
    { prop: 'sex', label: String(i18n.t('tableHeader.owner.sex')), slot: true },
    { prop: 'phone', label: String(i18n.t('tableHeader.owner.phone')), width: '150', slot: true },
    { prop: 'identityId', label: String(i18n.t('tableHeader.owner.identityId')), width: '250' },
    { prop: 'email', label: String(i18n.t('tableHeader.owner.email')), width: '200', slot: true },
    { prop: 'createTime', label: String(i18n.t('tableHeader.owner.createTime')), width: '200', sortable: true },
    { prop: 'updateTime', label: String(i18n.t('tableHeader.owner.updateTime')), width: '200', sortable: true }
  ],
  localStorage: [
    { prop: 'serverUrl', label: String(i18n.t('tableHeader.localStorage.serverUrl')), fixed: 'left', width: '150', slot: true },
    { prop: 'fileName', label: String(i18n.t('tableHeader.localStorage.fileName')), showOverflowTooltip: true },
    { prop: 'suffix', label: String(i18n.t('tableHeader.localStorage.suffix')), slot: true },
    { prop: 'type', label: String(i18n.t('tableHeader.localStorage.type')), slot: true },
    { prop: 'size', label: String(i18n.t('tableHeader.localStorage.size')), slot: true },
    { prop: 'createTime', label: String(i18n.t('tableHeader.localStorage.creteTime')), width: '200', sortable: true }
  ],
  feedback: [
    { prop: 'ownerName', label: String(i18n.t('tableHeader.feedback.ownerName')), fixed: 'left', width: '150' },
    { prop: 'title', label: String(i18n.t('tableHeader.feedback.title')), width: '150', showOverflowTooltip: true, fixed: 'left' },
    { prop: 'type', label: String(i18n.t('tableHeader.feedback.feedbackType')), slot: true, width: '150' },
    { prop: 'content', label: String(i18n.t('tableHeader.feedback.content')), showOverflowTooltip: true, width: '150' },
    { prop: 'feedbackImage', label: String(i18n.t('tableHeader.feedback.feedbackImage')), width: '150', slot: true },
    { prop: 'answer', label: String(i18n.t('tableHeader.feedback.answer')), showOverflowTooltip: true, width: '150' },
    { prop: 'username', label: String(i18n.t('tableHeader.feedback.username')), width: '150' },
    { prop: 'result', label: String(i18n.t('tableHeader.feedback.result')), width: '150', slot: true },
    { prop: 'remarks', label: String(i18n.t('tableHeader.feedback.remarks')), showOverflowTooltip: true, width: '200' },
    { prop: 'answerTime', label: String(i18n.t('tableHeader.feedback.answerTime')), width: '200' },
    { prop: 'createTime', label: String(i18n.t('tableHeader.feedback.createTime')), sortable: true, width: '200' }
  ],
  building: [
    { prop: 'buildingNum', label: i18n.t('tableHeader.building.buildingNum'), fixed: 'left', width: '200' },
    { prop: 'floor', label: i18n.t('tableHeader.building.floor'), width: '200', sortable: true, slot: true },
    { prop: 'floorNum', label: i18n.t('tableHeader.building.floorNum'), width: '150', sortable: true, slot: true },
    { prop: 'number', label: i18n.t('tableHeader.building.number'), sortable: true, width: '150', slot: true },
    { prop: 'createTime', label: i18n.t('tableHeader.building.createTime'), sortable: true, width: '200' },
    { prop: 'updateTime', label: i18n.t('tableHeader.building.updateTime'), width: '200' }
  ],
  elevator: [
    { prop: 'identityId', label: '电梯编号', fixed: 'left', width: '150' },
    { prop: 'buildingNum', label: '所属楼宇', fixed: 'left', width: '150' },
    { prop: 'numberOfPeople', label: '核载人数', slot: true, sortable: true, width: '120' },
    { prop: 'numberOfWeight', label: '核载重量', width: '120', slot: true, sortable: true },
    { prop: 'isComputerRoom', label: '有无机房', slot: true },
    { prop: 'hoistwaySize', label: '井道尺寸(mm)', width: '150' },
    { prop: 'depthOfFoundationPit', label: '基坑深度', width: '120', sortable: true, slot: true },
    { prop: 'reservedSizeOfDoorOpening', label: '门洞预留尺寸(mm)', width: '150' },
    { prop: 'liftingHeight', label: '提升高度', width: '120', slot: true, sortable: true },
    { prop: 'lastMaintainTime', label: '上一次维护时间', width: '200', sortable: true },
    { prop: 'nextMaintainTime', label: '下一次维护时间', width: '200', sortable: true },
    { prop: 'day', label: '维护间隔', slot: true, width: '120', sortable: true },
    { prop: 'maintainPeople', label: '维护人', width: '150', slot: true },
    { prop: 'maintainPeoplePhone', label: '维护人电话', width: '150', slot: true },
    { prop: 'enabled', label: '是否启用', slot: true },
    { prop: 'elevatorTypesString', label: '电梯类型', slot: true, width: '200' },
    { prop: 'createTime', label: i18n.t('tableHeader.building.createTime'), sortable: true, width: '200' }
  ],
  elevatorType: [
    { prop: 'name', label: '电梯类型', fixed: 'left' },
    { prop: 'nameZhCn', label: 'zh-CN' },
    { prop: 'nameZhHk', label: 'zh-HK' },
    { prop: 'nameZhTw', label: 'zh-TW' },
    { prop: 'nameEnUs', label: 'en-US' },
    { prop: 'createTime', label: '创建时间', sortable: true, width: '200' },
    { prop: 'updateTime', label: '修改时间', sortable: true, width: '200' }
  ],
  parkLot: [
    { prop: 'region', label: '停车场区域', fixed: 'left' },
    { prop: 'number', label: '小车车位', sortable: true, slot: true },
    { prop: 'floor', label: '停车场层数', sortable: true, slot: true },
    { prop: 'otherNumber', label: '其他车位数', sortable: true, slot: true },
    { prop: 'enabled', label: '是否启用', slot: true },
    { prop: 'createTime', label: '创建时间', sortable: true, width: '200' },
    { prop: 'updateTime', label: '修改时间', sortable: true, width: '200' }
  ],
  park: [
    { prop: 'region', label: '停车场区域', fixed: 'left', slot: true },
    { prop: 'type', label: '车位类型', slot: true },
    { prop: 'isBuy', label: '是否被购买', slot: true },
    { prop: 'identityId', label: '车位独立编号' },
    { prop: 'price', label: '车位价格', sortable: true, slot: true },
    { prop: 'createTime', label: '创建时间', sortable: true, width: '200' }
  ],
  car: [
    { prop: 'name', label: '业主姓名', fixed: 'left' },
    { prop: 'carNumber', label: '车牌号码', fixed: 'left', slot: true },
    { prop: 'parkVO.region', label: '车位区域', slot: true },
    { prop: 'parkVO.identityId', label: '车位编号', slot: true },
    { prop: 'parkVO.type', label: '车位类型', slot: true },
    { prop: 'carColor', label: '车辆颜色', slot: true },
    { prop: 'createTime', label: '创建时间', sortable: true, width: '200' },
    { prop: 'updateTime', label: '修改时间', sortable: true, width: '200' }
  ],
  household: [
    { prop: 'ownerName', label: '业主姓名', fixed: 'left' },
    { prop: 'buildingNum', label: '栋号', fixed: 'left', width: '150' },
    { prop: 'identityId', label: '梯户独立编号', width: '100', fixed: 'left', slot: true },
    { prop: 'area', label: '面积', sortable: true, width: '100', slot: true },
    { prop: 'lastMeterWater', label: '上一次水表读数', sortable: true, width: '150', slot: true },
    { prop: 'lastMeterElectric', label: '上一次电表读数', sortable: true, width: '150', slot: true },
    { prop: 'peopleNumber', label: '常住人数', sortable: true, width: '150' },
    { prop: 'isLive', label: '是否居住', slot: true },
    { prop: 'createTime', label: '创建时间', sortable: true, width: '200' },
    { prop: 'updateTime', label: '修改时间', sortable: true, width: '200' }
  ],
  visitor: [
    { prop: 'name', label: '访客姓名', fixed: 'left' },
    { prop: 'phone', label: '访客电话号码' },
    { prop: 'buildingNum', label: '到访楼宇' },
    { prop: 'householdVO.identityId', label: '到访梯户', slot: true },
    { prop: 'householdVO.isLive', label: '是否居住', slot: true },
    { prop: 'createTime', label: '创建时间', sortable: true, width: '200' },
    { prop: 'updateTime', label: '修改时间', sortable: true, width: '200' }
  ],
  householdPay: [
    { prop: 'buildingNum', label: '楼宇', fixed: 'left', slot: true },
    { prop: 'household.identityId', label: '梯户', fixed: 'left', slot: true, width: '100' },
    { prop: 'ownerName', label: '业主', fixed: 'left' },
    { prop: 'payWater', label: '水费', sortable: true, slot: true, width: '150' },
    { prop: 'payElectric', label: '电费', sortable: true, slot: true, width: '150' },
    { prop: 'payProperty', label: '物管费', sortable: true, slot: true, width: '150' },
    { prop: 'year', label: '年份', sortable: true },
    { prop: 'month', label: '月份', sortable: true },
    { prop: 'isPayWater', label: '是否支付水费', width: '150', slot: true },
    { prop: 'isPayElectric', label: '是否支付电费', width: '150', slot: true },
    { prop: 'isPayProperty', label: '是否支付物管费', width: '150', slot: true },
    { prop: 'createTime', label: '创建时间', sortable: true, width: '200' },
    { prop: 'updateTime', label: '修改时间', sortable: true, width: '200' }
  ]
}

export default { state }
