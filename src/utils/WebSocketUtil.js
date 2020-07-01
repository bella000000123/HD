import AesUtils from '@/utils/AesUtils'
import store from '@/store'

function tryToParseJson(str) {
  try {
    return JSON.parse(str)
  } catch (e) {
    return ''
    //
  }
}

class WebSocketUtil {
  constructor({ url, protocol }) {
    this.ws = ''
    this.actionKey = 'SYS_ACTION'
    this.actionMap = {}
    this.autoReconnect = true
    this.maxRetryTimes = 3
    this.retryDelay = 3000

    this.onMessage = () => {}
    this.onCreate = () => {}
    this.onClose = () => {}
    this.onRetry = () => {}
    this.onError = () => {}
    this.onJson = () => {}

    this.url = url
    this.protocol = protocol
  }

  init() {
    this.close()
    const ws = new WebSocket(this.url)
    ws.onclose = () => {
      if (
        !this.autoReconnect || // needn't reconnect
        this.shouldClose || // really want to close
        (this.maxRetryTimes && this.retryTimes + 1 > this.maxRetryTimes)
      ) {
        console.log('这里是不重启ws')
        this.onClose()
        return
      }
      console.log('这里是重启ws')

      this.onRetry(this.retryTimes)
      this.retryTimes += 1
      setTimeout(() => {
        this.init()
      }, this.retryDelay)
    }
    ws.onerror = e => {
      this.onError(e)
      ws && ws.close()
    }
    // 接收数据
    ws.onmessage = this.handleMessage
    const decorator = {
      send(data) {
        const sendData = data.constructor === String ? data : JSON.stringify(data)
        ws.send(sendData)
      }
    }
    ws.onopen = () => {
      // websocket 打开连接的回调
      this.retryTimes = 1
      this.ws = ws
      this.onCreate(decorator, ws)
    }
  }

  close() {
    if (this.ws && this.ws.readyState === WebSocket.CONNECTING) {
      // 如果已初始化并且处于重连状态
      this.shouldClose = true
      this.ws && this.ws.close()
    }
  }

  handleMessage({ data }) {
    // 处理接受的消息
    const result = tryToParseJson(data)
    if (result) {
      store.dispatch('handleNewMatchItem', result)
    }
    // return obj;
  }
}

export default WebSocketUtil
