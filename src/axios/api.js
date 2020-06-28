import http from "./index";
const getBanner = (params) => {
  return http.get(`/api/home/index/getBanner`, params).then((res) => res.data);
};
const articleList = (params) => {
  return http
    .get(`/api/home/article/articleList`, params)
    .then((res) => res.data);
};
const focusMatch = (params) => {
  return http.get(`/api/home/match/focusMatch`, params).then((res) => res.data);
};
const analyseList = (params) => {
  return http
    .get(`/api/home/index/analyseList`, params)
    .then((res) => res.data);
};
const hotPushers = (params) => {
  return http
    .get(`/api/home/pusher/hotPushers`, params)
    .then((res) => res.data);
};

const rankingList = (params) => {
  return http
    .get(`/api/home/ranking/rankingList`, params)
    .then((res) => res.data);
};

const getThreeCateArticle = (params) => {
  return http
    .get(`/api/home/article/getThreeCateArticle`, params)
    .then((res) => res.data);
};
//完结和未来
const getNowMatchList = (params) => {
  return http
    .post(`/api/home/now_match/getNowMatchList`, params)
    .then((res) => res.data);
};
const getBeginMatch = (params) => {
  return http
    .post(`/api/home/now_match/getBeginMatch`, params)
    .then((res) => res.data);
};
const getEndMatch = (params) => {
  return http
    .post(`/api/home/now_match/getEndMatch`, params)
    .then((res) => res.data);
};
const getUnBeginMatch = (params) => {
  return http
    .post(`/api/home/now_match/getUnBeginMatch`, params)
    .then((res) => res.data);
};
const getOneMatchBaiJia = (params) => {
  return http
    .post(`/api/home/now_match/getOneMatchBaiJia`, params)
    .then((res) => res.data);
};
const getOneMatchDetail = (params) => {
  return http
    .post(`/api/home/now_match/getOneMatchDetail`, params)
    .then((res) => res.data);
};
const getOneMatchInformation = (params) => {
  return http
    .post(`/api/home/now_match/getOneMatchInformation`, params)
    .then((res) => res.data);
};
const getEndMatchByTeamId = (params) => {
  return http
    .post(`/api/home/now_match/getEndMatchByTeamId`, params)
    .then((res) => res.data);
};
const getUnBeginMatchByTeamId = (params) => {
  return http
    .post(`/api/home/now_match/getUnBeginMatchByTeamId`, params)
    .then((res) => res.data);
};
const getTwoTeamMatchEd = (params) => {
  return http
    .post(`/api/home/now_match/getTwoTeamMatchEd`, params)
    .then((res) => res.data);
};

export default {
  getBanner: getBanner,
  articleList: articleList,
  focusMatch: focusMatch,
  analyseList: analyseList,
  hotPushers: hotPushers,
  rankingList: rankingList,
  getThreeCateArticle: getThreeCateArticle,
  getNowMatchList: getNowMatchList,
  getUnBeginMatch: getUnBeginMatch,
  getBeginMatch: getBeginMatch,
  getEndMatch: getEndMatch,
  getOneMatchBaiJia: getOneMatchBaiJia,
  getOneMatchDetail: getOneMatchDetail,
  getOneMatchInformation: getOneMatchInformation,
  getEndMatchByTeamId: getEndMatchByTeamId,
  getUnBeginMatchByTeamId: getUnBeginMatchByTeamId,
  getTwoTeamMatchEd: getTwoTeamMatchEd,
};
