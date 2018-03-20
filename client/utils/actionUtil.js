// import cookie from 'react-cookie';
// import AppConstant from '../constants/app';

// export const setToken = token => cookie.save(AppConstant.TOKEN, token, {path: '/'});
// export const getToken = () => cookie.load(AppConstant.TOKEN);
// export const clearToken = () => cookie.remove(AppConstant.TOKEN, {path: '/'});



export const setToken = token => sessionStorage.setItem("user_token", token);
export const getToken = () => sessionStorage.getItem("user_token");
export const clearToken = () => {sessionStorage.removeItem("user_token")};