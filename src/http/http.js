import axios from 'axios';
import qs from 'qs';
import { Message } from 'element-ui';
import that from '../main';

const $http = axios.create({
    baseURL: 'http://49.4.52.75:28020', //线上
    timeout: 1800000,
    responseType: 'json',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
});

// 请求qs序列化
$http.interceptors.request.use(
    config => {
        const token = sessionStorage.getItem('token');
        if (
            config.method === 'post' &&
            config.headers['Content-Type'] ===
            'application/x-www-form-urlencoded'
        ) {
            config.data = qs.stringify(config.data);
        }
        if (token) {
            config.headers.token = token;
        }
        return config;
    },
    error => {
        Message({
            showClose: true,
            message: error && error.data.error_msg,
            type: 'error'
        });
        return Promise.reject(error.data.error_msg);
    }
);

// 接收数据，刷新token
$http.interceptors.response.use(
    res => {
        if (res.data) {
            if (res.data.token && res.data.token.length) {
                sessionStorage.setItem('token', res.data.token);
            }

            switch (res.data.error_code) {
                case '-1':
                    Message.warning({
                        showClose: true,
                        message: '系统维护中，请稍后重试！'
                    });
                    sessionStorage.clear();
                    setTimeout(() => {
                        that.$router.push({
                            path: '/'
                        });
                    }, 1000);
                    break;
                case '0':
                    return res.data;
                case '1':
                    Message.error({
                        showClose: true,
                        message: res.data.error_msg
                    });
                    break;
                case '2':
                    Message.warning({
                        showClose: true,
                        message: '您没有登录权限，请重新登录确认，正在跳转到登录页面'
                    });
                    sessionStorage.clear();
                    setTimeout(() => {
                        that.$router.push({
                            path: '/'
                        });
                    }, 1000);
                    break;
                default:
                    //其他默认返回的blob文件流
                    return res.data;
            }
        } else {
            return res;
        }
    },
    error => {
        console.log(error);
    }
);

export default $http;