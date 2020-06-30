// 获取Aes加密
import CryptoJS from 'crypto-js'

const key = CryptoJS.enc.Utf8.parse('JtZ9RzYpN2tEVayl') // 十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse('JtZ9RzYpN2tEVayl') // 十六位十六进制数作为密钥偏移量

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
    let srcs = CryptoJS.enc.Utf8.parse(data)
    let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext)
  }

  /**
   * 解密
   * @param text 待解密文本
   */
  static decrypt(data) {
    let decrypt = CryptoJS.AES.decrypt(data, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
    return decryptedStr.toString()
  }
}
