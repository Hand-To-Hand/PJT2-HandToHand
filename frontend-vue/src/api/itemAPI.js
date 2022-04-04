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

/*╔═════════════════════════════╗
	║    NFT 작품 정보 CRUD API    ║
	╚═════════════════════════════╝*/

/**
 * 등록된 모든 작품 조회
 * @param {Function} success  요청 성공 시 수행할 콜백 함수
 * @param {Function} fail     요청 실패 시 수행할 콜백 함수
 */
const getItems = (success = defaultSuccess, fail = defaultFail) => {
  api.get('/items').then(success).catch(fail);
};

/**
 * 해당 유저의 작품 조회
 * @param {*} userAddr
 * @param {Function} success  요청 성공 시 수행할 콜백 함수
 * @param {Function} fail     요청 실패 시 수행할 콜백 함수
 */
const getUsersItems = (
  userAddr,
  success = defaultSuccess,
  fail = defaultFail,
) => {
  const params = { 'wallet-address': userAddr };
  api.get('/items', { params }).then(success).catch(fail);
};

/**
 * 판매 중인 작품 조회
 * @param {Function} success  요청 성공 시 수행할 콜백 함수
 * @param {Function} fail     요청 실패 시 수행할 콜백 함수
 */
const getItemsOnSale = (success = defaultSuccess, fail = defaultFail) => {
  api.get('/items/onSale').then(success).catch(fail);
};

/**
 * NFT 등록
 * @param {*} tokenUri
 * @param {*} ownerAddr
 * @param {*} tokenId
 * @param {Function} success  요청 성공 시 수행할 콜백 함수
 * @param {Function} fail     요청 실패 시 수행할 콜백 함수
 */
const addItem = (
  tokenUri,
  ownerAddr,
  tokenId,
  success = defaultSuccess,
  fail = defaultFail,
) => {
  const data = {
    hash: tokenUri,
    ownerAddress: ownerAddr,
    tokenId: tokenId,
  };

  api.post('/items/add', JSON.stringify(data)).then(success).catch(fail);
};

/**
 * NFT 소유자 업데이트
 * @param {*} newOwnerAddr
 * @param {*} tokenId
 * @param {Function} success  요청 성공 시 수행할 콜백 함수
 * @param {Function} fail     요청 실패 시 수행할 콜백 함수
 */
const updateNftOwner = (
  newOwnerAddr,
  tokenId,
  success = defaultSuccess,
  fail = defaultFail,
) => {
  const data = {
    ownerAddress: newOwnerAddr,
    tokenId: tokenId,
  };

  api.patch('/items/update', JSON.stringify(data)).then(success).catch(fail);
};

/**
 * 좋아요 업데이트
 * @param {Function} success  요청 성공 시 수행할 콜백 함수
 * @param {Function} fail     요청 실패 시 수행할 콜백 함수
 */
const updateItemLikes = (success = defaultSuccess, fail = defaultFail) => {
  api.patch('/items').then(success).catch(fail);
};

export {
  getItems,
  getUsersItems,
  getItemsOnSale,
  addItem,
  updateNftOwner,
  updateItemLikes,
};