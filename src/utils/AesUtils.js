// 获取Aes加密
import * as CryptoJS from 'crypto-js'

const key = 'qiyue666'
const iv = 'hongdanhongdan66'

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
  static decrypt() {
    let data =
      'TPN9E/l+nfkogwaWYpS6/5FO28xEd2ok8t5fDhcyFworxxnqpyJACqQGY1ZXpgcUdTyWCJdD2Njhq7vLSMZ7yB/n09X+9vCZqmywaNYO3smQql1SD3ek4ILcktFukNS6SjtlBCOQ6hHZ+Bu9Wosn7aXwZ5rwLLpWKAdfBBBskn5uOavAJs6telR4D8du5ZpyVzYA9LbnaSHers+QuVEqqeTVg1mck0ntiVSTm+hmc55mH6Ijl3KqlATUhMPT+k3JOegF2ZQ2cLGPaZpiDICrdbYVvmiE7iU1J/6eBavU29tivNMN0FjJyH64fxQ6e+o2B5WA8bqJ+cudnnqpjZLDG3jINF+bZX8q6n5f94Xmtww7gWpVjdNfM9cIynVfVEPIeXiekJubpF5l5D3lgcIpnysHROOvVfacBzVNBa6J9XzQmX9RfYAjMpi9Mavn49lHSHj5U3O7QLqwnYqQNBB8Y7tqRd7nYnWrKU0KPgQfnYQAM1f10ivCra/4wNYRzCcV68HGPzGHr0EDqEL0otGwNHgUWLcX/oYoMl5Q1q4JWikKP2o2tCv15zihbU5Igqv6fiwm/AjC6JZ0fceUPNIwiH8DmufsJOrwpGqHrfBPp6rW6uCYnQvrARvZvdjOqI7mFi66/BddKGeXSu3JUP6tG42GqEFuD9fM8JAOT/Watg1G8BIsmfS0/6IsBA5HojaoSou7kFDUl8Cn/lPptnP1oSu0NprzTFuaEOLY8zIuo5ain7MStL30MWkdyNaLZYoG50iIfq0js05Ma3V9VH8B9cmwixt86eSecnZ1AMzsw2kfNnWzyltq8x/lcvzErTQyOK6h6YjgJ377xyMeqEbLoLMB8vozjvtqxRdHT0oA1sIbUKbgN0BMXUtSi3/86ZAtN5mXHVedbMl0dqIqMixt20FtkaYq8dYkaMZCdTgsY57CnRPDPAtSSLFnRZASDzAQ8VU09Bxrf6aID/cO498UxxWFhBtpbwe195KR11FTLfuk0aM5AeWwSXWnWPoL5qW0dnsQnKVMLAPQXvWGmrt46l9HOSFwqrR5U00e+KMaKtyXEDSRgP86esqxE0a3AxTxNQJ26NWzwAH1BbfdbbU3k4ex+QTzYq5NUfrJZNBXXHJQW9c4E0T5r+0upZH5jjHaNP0BRoRJiDvPxdyAb9lyy3djYpw2yjKx4TtjmLTp+y+WABwiqkLJkr8pOH0dV4I0W+hAeur0fPuDEQXT9TcbTCkePdX0YnBozGen6S23K98PM3Yl7mA4/ut18s/atyrMyMo/tbcli3X5qR9LaI40PEhT6J+yuQVAib8e+8+ltBcACaYNomwl3Z639c57+KsSfRIkmfyh8ZTF/DceMiLrGtgarknKpI8az6n0N7djyV6BVAKImCRXCGF3NRwd2vRKcLbl+PbpUHL3W5QQNMvxXCiHWwxFjvs/Bqxv4aoMi2rsqztxgKl9JeW63jQSfhqIfqjGjbTYu3Zj6wd7TyRR3w=='
    var _key = CryptoJS.enc.Utf8.parse(key)
    var decrypt = CryptoJS.AES.decrypt(data, _key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 })
    console.log(CryptoJS.enc.Utf8.stringify(decrypt).toString())
    return CryptoJS.enc.Utf8.stringify(decrypt).toString()
  }
}
