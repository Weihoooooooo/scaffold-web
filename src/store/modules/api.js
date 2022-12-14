const baseUrl = process.env.VUE_APP_SERVICE_API
const apiBaseUrl = process.env.VUE_APP_BASE_API
const api = {
  state: {
    // 基础路径
    baseApi: baseUrl,
    // Druid SQL监控
    sqlMonitorApi: baseUrl + '/druid',
    // Swagger接口文档
    swaggerApi: baseUrl + '/doc.html',
    // 修改头像API
    updateAvatarApi: apiBaseUrl + '/users/avatar',
    // ICON列表API
    iconListApi: baseUrl + '/local/iconList/index.html',
    // 文件上传
    fileUploadApi: apiBaseUrl + '/localStorage',
    // Actuator Monitor控制台
    actuatorMonitorApi: baseUrl + '/monitor'
  }
}

export default api
