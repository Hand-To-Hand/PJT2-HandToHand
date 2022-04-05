/**
 * @author Hyeonsooryu
 */

import Web3 from 'web3';

// Web3
const web3 = new Web3(
  new Web3.providers.HttpProvider(process.env.VUE_APP_ETHEREUM_RPC_URL),
);

/**
 * 트랜잭션 전송을 위한 공통 로직
 * 전달받은 개인키로 서명한 트랜잭션을 전송합니다.
 * @param {String} fromAddr 보내는 주소
 * @param {String} privKey 보내는 주소의 개인키
 * @param {String} toAddr 받는 주소
 * @param {String} data 입력 데이터
 * @returns {Promise} 함수 실행 결과
 */
export default async function sendTransaction(fromAddr, privKey, toAddr, data) {
  const gas = await data.estimateGas({ from: fromAddr });

  // 트랜잭션 객체
  const tx = {
    gas: gas,
    to: toAddr,
    data: data.encodeABI(),
  };

  let result = null;

  // 서명
  await web3.eth.accounts.signTransaction(tx, privKey).then(async (rawTx) => {
    // 트랜잭션 보내기
    await web3.eth
      .sendSignedTransaction(rawTx.rawTransaction)
      .once('receipt', (receipt) => {
        result = receipt;
      })
      .on('confirmation', (confirmationNumber) => {
        if (confirmationNumber == 1) {
          console.log('start');
        } else if (confirmationNumber == 3) {
          console.log('confirm end!');
        }
      })
      .on('error', (error) => {
        console.log(error);
      });
  });
  return result;
}
