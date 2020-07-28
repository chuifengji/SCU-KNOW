/**
 * 对所有网络请求的封装,cloud端除外
 */
import config from "./config.js"
console.log(config)
import request from './request.js'
class netHandlers {
  constructor() {
    this._baseUrl = config.request_server_url
    this._defaultHeaderGet = { 'data-type': 'application/json' }
    this._defaultHeaderOthers = { 'data-type': 'application/x-www-form-urlencoded' }
    this._request = new request(this._defaultHeaderGet,this._defaultHeaderOthers)
    this._request.setErrorHandler(this.errorHander)
  }

  /**
   * 统一的异常处理方法
   */
  errorHander(res) {
    console.error(res)
  }
/**
 * 
 * 获取数据
 */
netGetData() {
 let header = {
  'content-type': 'text/plain' // 默认值
}
 return this._request.getRequest(this._baseUrl + '/personal/login',{},header).then(res => res.data)
}
/**
 * 
 * 以关键字搜索
 */
netSearch(value){
  return this._request.getRequest(this._baseUrl+"search_question/"+value+"/").then(res=>res.data)
}
/**
 * 
 * 反馈
 */
netFeedback(feedback_question,feedback_type){
  let data = {
    feedback_question: feedback_question,
    feedback_type: feedback_type
  }
  return this._request.postRequest(this._baseUrl+"feedback/",data).then(res=>{res.data})
}

}
export default netHandlers



