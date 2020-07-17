import axios from 'axios';
// 使用element-ui Message做消息提醒
import { Message, Loading } from 'element-ui';

//axios.defaults.baseURL = process.env.BASE_URL
axios.timeout = 10 * 1000;

//http request 拦截器
axios.interceptors.request.use(
  config => {
    // 获取token
    // const token = localStorage.getItem('token');
    const token = '77f8f1d9ba4e2094406e6f85fbc1fd631189c9befa9a04fc1b11a3a48a3e2c23';
    // 添加token到headers
    if (token) {
      config.headers.token = token;
    }
    // 鉴权参数设置
    if (config.method === 'get') {
      //get请求下 参数在params中，其他请求在data中
      config.params = config.params || {};
      // let json = JSON.parse(JSON.stringify(config.params));
      //一些参数处理
    } else {
      config.data = config.data || {};
      //一些参数处理
    }
    return config;
  },
  err => {
    Message({
      message: err.message,
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject(err);
  }
);
//http response 拦截器
axios.interceptors.response.use(
  response => {
    //一些统一code的返回处理
    if (response.data.code === 501) {
      // 登录验证
      //做了个示例跳转项目中登录，并记录下相对路径
      // router.push({
      //     name: 'login', //从哪个页面跳转
      //     query: {
      //         retUrl: window.location.href.split('#')[1] || '',
      //         is_new_user_url: 1
      //     }
      // })
    }
    return response;
  },
  err => {
    Message({
      message: err.message,
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject(err);
  }
);

export default {
  //   get
  get(url, params = {}) {
    let loading = Loading.service();
    return new Promise((resolve, reject) => {
      loading.close();
      axios
        .get(url, {
          params: params
        })
        .then(response => {
          if (response.data.code != 1) {
            //错误处理
            Message({
              message: response.data.message,
              type: 'error',
              duration: 5 * 1000
            });
          }
          //返回成功处理  这里传的啥 后续调用的时候 res就是啥
          resolve(response.data.data); //我们后台所有数据都是放在返回的data里所以这里统一处理了
        })
        .catch(err => {
          reject(err);
          let message = '请求失败！请检查网络';
          //错误返回
          if (err.response) message = err.response.data.message;
          Message({
            message: message,
            type: 'error',
            duration: 5 * 1000
          });
        });
    });
  },
  //   post
  post(url, data = {}) {
    return new Promise((resolve, reject) => {
      axios.post(url, data).then(
        response => {
          if (response.data.code != 1) {
            Message({
              message: response.data.message,
              type: 'error',
              duration: 5 * 1000
            });
          }
          resolve(response.data.data);
        },
        err => {
          reject(err);
          let message = '请求失败！请检查网络';
          if (err.response) message = err.response.data.message;
          Message({
            message: message,
            type: 'error',
            duration: 5 * 1000
          });
        }
      );
    });
  }
};
