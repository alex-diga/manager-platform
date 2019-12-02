import axios from 'axios';
import Qs from 'qs';

const ajax = {
  // 获取所有文件分类模型标签数据
  GETMODELLABEL: '/api/docs/all/model/labels',
  // 获取NER模型码值列表
  GETNERMODELCODE: '/api/docs/ner/model-code',
  // 获取ner聚合参数doc
  GETNERAGGREGATIONDOC: '/api/docs/ner-aggregation-doc',
  // 获取md文件
  GETMDFILES: '/api/docs/get/document/mds',
  // ner聚合
  nerAggregation: '/api/ner-aggregation/handle',
  // ocr图片识别
  ocrPhoto: '/api/ocr/photo/handle',
  // ocrpdf识别
  ocrPdfUp:'/api/ocr/pdf/handle',
  // ocrpdf交叉页识别
  crossPdf:'/api/ocr/cross/pdf/handle',
  // 类案推送
  casePush:'/api/push/similarcasses/handle',
  // 法条推送
  springPush: '/api/push/lawspush/handle',
  // 文件服务
  classification:'/api/writclassify/whethercontain/model/handle',
  // 获取模型码值列表
  getModelCode:'/api/docs/ner/model-code',
  // ner推理
  nerInfer:'/api/ner-infer/model-code',
  // 文书脱敏
  POSTMASKING: '/api/masking-test',
  // 查询ner模型是否存在
  POSTMODELEXIST: '/api/ner-model/check-support'
};


// 获取所有文件分类模型标签数据
function getDocModelLabel() {
  return axios.get(ajax.GETMODELLABEL)
}
// 获取NER模型码值列表
function getNerModelCodel() {
  return axios.get(ajax.GETNERMODELCODE)
}
// 获取ner聚合参数doc
function getNerAggegationDoc() {
  return axios.get(ajax.GETNERAGGREGATIONDOC)
}
// 获取md文件
function getMDFilesData() {
  return axios.get(ajax.GETMDFILES)
};
// ner聚合
function postNerAggregation(data) {
  return axios.post(ajax.nerAggregation, JSON.stringify(data),{headers: { 'Content-Type': 'application/json' }})
}
// ocr图片识别
function postOcrPhoto(data) {
  return axios.post(ajax.ocrPhoto, data,{headers: { 'Content-Type': 'multipart/form-data' }})
}
// pdf文件识别
function postOcrPdfUp(data) {
  return axios.post(ajax.ocrPdfUp, data,{headers: { 'Content-Type': 'multipart/form-data' }})
}

// pdf交叉页文件识别
function postOcrPdfCross(data) {
  return axios.post(ajax.crossPdf, data,{headers: { 'Content-Type': 'multipart/form-data' }})
}

// 类案推送
function postCasePush(data) {
  return axios.post(ajax.casePush, Qs.stringify(data),{
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }})
}

// 法条推送
function postSpringPush(data) {
  return axios.post(ajax.springPush, Qs.stringify(data),{
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }})
}

// 文件服务
function postClassification(data) {
  return axios.post(ajax.classification, Qs.stringify(data),{
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }})
}

// 获取模型码值列表

function getModelCode(){
  return axios.get(ajax.getModelCode)
}

// ner推理
function postNerInfer(data) {
  return axios.post(ajax.nerInfer, data,{headers: { 'Content-Type': 'application/json' }})
}

// 文书脱敏
function postMaskingText(data) {
  return axios.post(ajax.POSTMASKING, Qs.stringify(data),{
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }})
}

// 查询ner模型是否存在
function postModelExist(data) {
  return axios.post(ajax.POSTMODELEXIST, data,{headers: { 'Content-Type': 'application/json' }})
}

export default {
  getDocModelLabel,
  getNerModelCodel,
  getNerAggegationDoc,
  getMDFilesData,
  postNerAggregation,
  postOcrPhoto,
  postOcrPdfUp,
  postOcrPdfCross,
  postCasePush,
  postSpringPush,
  postClassification,
  getModelCode,
  postNerInfer,
  postMaskingText,
  postModelExist
};
