import $http from './http';

//登录
export const submitLogin = data => {
  return $http.post('/base/login/checkUserInfo', data, {
      headers: {
          'Content-Type': 'application/json'
      }
  });
};