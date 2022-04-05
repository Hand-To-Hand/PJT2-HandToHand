/**
 * @author Hyeonsooryu
 */

import apiInstance from './index';

const api = apiInstance();

const defaultSuccess = (res) => {
  console.log(res);
};
const defaultFail = (err) => {
  console.log(err);
};

/**
 * 회원 추가
 * @param {*} walletAddr      지갑 주소
 * @param {Function} success  요청 성공 시 수행할 콜백 함수
 * @param {Function} fail     요청 실패 시 수행할 콜백 함수
 */
const addUser = (walletAddr, success = defaultSuccess, fail = defaultFail) => {
  const headers = { 'wallet-address': walletAddr };
  api.post('/users', null, { headers }).then(success).catch(fail);
};

/**
 * 닉네임 수정
 * @param {*} nickname        닉네임
 * @param {*} walletAddr      지갑 주소
 * @param {Function} success  요청 성공 시 수행할 콜백 함수
 * @param {Function} fail     요청 실패 시 수행할 콜백 함수
 */
const updateNickname = (nickname, walletAddr, success, fail) => {
  const headers = { 'nickname': nickname, 'wallet-address': walletAddr };
  api.patch('/users', null, { headers });
};

export { addUser, updateNickname };