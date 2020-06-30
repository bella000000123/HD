// 获取Aes加密
import * as CryptoJS from 'crypto-js'

const key = 'qiyue666'
const iv = 'FsCPpA5t48bRs3v1'

/**
 * @FileName: AesUtil
 * @Description: AES加密工具类，使用方法
 *  加密
 *  let encrypted = AesUtil.encrypt("mazaiting");
 *  解密
 *  let decrypted = AesUtil.decrypt("mazaiting");
 */
export default class AesUtils {
  /**
   * 加密
   * @param text 加密文本
   */
  static encrypt(data) {
    var _key = CryptoJS.enc.Utf8.parse(key)
    var _iv = CryptoJS.enc.Utf8.parse(iv)
    return CryptoJS.AES.encrypt(JSON.stringify(data), _key, { iv: _iv, mode: CryptoJS.mode.CBC }).toString()
  }

  /**
   * 解密
   * @param text 待解密文本
   */
  // static decrypt(data) {
  //   var _key = CryptoJS.enc.Utf8.parse(key)
  //   var _iv = CryptoJS.enc.Utf8.parse(iv)

  //   let decrypted = CryptoJS.AES.decrypt(data, _key, { iv: _iv, mode: CryptoJS.mode.CBC })

  //   return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8))
  // }

  //解密
  static decrypt(data) {
    var _key = CryptoJS.enc.Utf8.parse(key)
    var decrypt = CryptoJS.AES.decrypt(data, _key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 })
    return CryptoJS.enc.Utf8.stringify(decrypt).toString()
  }
}
