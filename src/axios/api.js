import http from './index';
const getBanner = params => {
  return http.get(`/api/home/index/getBanner`, params).then(res => res.data);
};
const articleList = params => {
  return http.get(`/api/home/article/articleList`, params).then(res => res.data);
};
const focusMatch = params => {
  return http.get(`/api/home/match/focusMatch`, params).then(res => res.data);
};
const analyseList = params => {
  return http.get(`/api/home/index/analyseList`, params).then(res => res.data);
};
const hotPushers = params => {
  return http.get(`/api/home/pusher/hotPushers`, params).then(res => res.data);
};

const rankingList = params => {
  return http.get(`/api/home/ranking/getOneTournamentRanking`, params).then(res => res.data);
};

const getThreeCateArticle = params => {
  return http.get(`/api/home/article/getThreeCateArticle`, params).then(res => res.data);
};
//完结和未来
const getNowMatchList = params => {
  return http.get(`/api/home/now_match/getNowMatchList`, params).then(res => res.data);
};
const getBeginMatch = params => {
  return http.get(`/api/home/now_match/getThreeTypeMatch`, params).then(res => res.data);
};
const getEndMatch = params => {
  return http.get(`/api/home/now_match/getEndMatch`, params).then(res => res.data);
};
const getUnBeginMatch = params => {
  return http.get(`/api/home/now_match/getUnBeginMatch`, params).then(res => res.data);
};
const getOneMatchBaiJia = params => {
  return http.get(`/api/home/now_match/getOneMatchBaiJia`, params).then(res => res.data);
};
const getOneMatchDetail = params => {
  return http.get(`/api/home/now_match/getOneMatchDetail`, params).then(res => res.data);
};
const getOneMatchInformation = params => {
  return http.get(`/api/home/now_match/getOneMatchInformation`, params).then(res => res.data);
};
const getEndMatchByTeamId = params => {
  return http.get(`/api/home/now_match/getEndMatchByTeamId`, params).then(res => res.data);
};
const getUnBeginMatchByTeamId = params => {
  return http.get(`/api/home/now_match/getUnBeginMatchByTeamId`, params).then(res => res.data);
};
const getTwoTeamMatchEd = params => {
  return http.get(`/api/home/now_match/getTwoTeamMatchEd`, params).then(res => res.data);
};
const getMatchTournamentRankingByTeamId = params => {
  return http.get(`/api/home/now_match/getMatchTournamentRankingByTeamId`, params).then(res => res.data);
};
const getOneMatchTeamInfo = params => {
  return http.get(`/api/home/now_match/getOneMatchTeamInfo`, params).then(res => res.data);
};
const getTournamentMatchByTeamId = params => {
  return http.get(`/api/home/now_match/getTournamentMatchByTeamId`, params).then(res => res.data);
};
const getArticleDetail = params => {
  return http.get(`/api/home/article/getArticleDetail`, params).then(res => res.data);
};
const doFollowPusher = params => {
  return http.post(`/api/home/pusher/doFollowPusher`, params).then(res => res.data);
};
const unFollowPusher = params => {
  return http.post(`/api/home/pusher/unFollowPusher`, params).then(res => res.data);
};
const addArticleComment = params => {
  return http.post(`/api/home/comment/addArticleComment`, params).then(res => res.data);
};
const delArticleComment = params => {
  return http.post(`/api/home/comment/delArticleComment`, params).then(res => res.data);
};
const getArticleCommentList = params => {
  return http.get(`/api/home/comment/getArticleCommentList`, params).then(res => res.data);
};

const likeArticleComment = params => {
  return http.post(`/api/home/comment/likeArticleComment`, params).then(res => res.data);
};

const unLikeArticleComment = params => {
  return http.post(`/api/home/comment/unLikeArticleComment`, params).then(res => res.data);
};
const register = params => {
  return http.post(`/api/home/login/register`, params).then(res => res.data);
};
const checkPhone = params => {
  return http.post(`/api/home/login/checkPhone`, params).then(res => res.data);
};
const getCode = params => {
  return http.post(`/api/home/login/getCode`, params).then(res => res.data);
};
const passwordLogin = params => {
  return http.post(`/api/home/login/passwordLogin`, params).then(res => res.data);
};
const codeLogin = params => {
  return http.post(`/api/home/login/codeLogin`, params).then(res => res.data);
};
const getUserInfo = params => {
  return http.get(`/api/home/users/getUserInfo`, params).then(res => res.data);
};
const updateUserInfo = params => {
  return http.post(`/api/home/users/updateUserInfo`, params).then(res => res.data);
};
const changePassword = params => {
  return http.post(`/api/home/users/changePassword`, params).then(res => res.data);
};
const changeMobile = params => {
  return http.post(`/api/home/users/changeMobile`, params).then(res => res.data);
};
const getFollowPushers = params => {
  return http.get(`/api/home/users/getFollowPushers`, params).then(res => res.data);
};
const logOut = params => {
  return http.post(`/api/home/users/logOut`, params).then(res => res.data);
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
  getMatchTournamentRankingByTeamId: getMatchTournamentRankingByTeamId,
  getOneMatchTeamInfo: getOneMatchTeamInfo,
  getTournamentMatchByTeamId: getTournamentMatchByTeamId,
  getArticleDetail: getArticleDetail,
  doFollowPusher: doFollowPusher,
  addArticleComment: addArticleComment,
  delArticleComment: delArticleComment,
  getArticleCommentList: getArticleCommentList,
  unLikeArticleComment: unLikeArticleComment,
  likeArticleComment: likeArticleComment,
  register: register,
  checkPhone: checkPhone,
  getCode: getCode,
  passwordLogin: passwordLogin,
  codeLogin: codeLogin,
  getUserInfo: getUserInfo,
  updateUserInfo: updateUserInfo,
  getFollowPushers: getFollowPushers,
  changePassword: changePassword,
  changeMobile: changeMobile,
  unFollowPusher: unFollowPusher,
  logOut: logOut
};
