/**
 * 对所有网络请求的封装
 */
import config from "./config.js"
import request from './request.js'
class netHandlers {
  constructor() {
    this._baseUrl = config.request_server_url
    this._defaultHeaderGet = { 'data-type': 'application/json' }
    this._defaultHeaderOthers = { "Content-Type": "application/x-www-form-urlencoded" }
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
 return this._request.getRequest(config.request_cloud_url,{},header).then(res => res.data)
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
    feedback_question,
    feedback_type,
  }
  return this._request.postRequest(this._baseUrl+"feedback/",data).then(res=>{res.data})
}
/**
 * 
 * 点评-喜欢
 */
netRemarkLike(id){
  return this._request.postRequest(this._baseUrl+""+id+"/",{}).then(res=>{res.data})//TODO：这里接口为空，不知是遗漏了还是本来就没有，忘了hhh 20-07-28
}
/**
 * 
 * 点评-不喜欢
 */
netRemarkDislike(id){
  return this._request.postRequest(this._baseUrl+"dislike_question/"+id+"/",{}).then(res=>{res.data})
}
}
export default netHandlers



