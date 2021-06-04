<template>
  <div class="video">
    <ListTitle :showRefresh="showRefresh"></ListTitle>
    <el-main>
      <div class="main-box">
        <div class="table-title" style="line-height: 40px;margin-bottom:0px">
          <div class="table-title-left">视频连线</div>
        </div>
      </div>
    </el-main>
  </div>
</template>
<script>
import ListTitle from 'components/listCommon/listTtitle'
export default {
  components:{
    ListTitle,
  },
  data(){
    return {
      showRefresh: false, //是否显示刷新按钮
      userId: '',
    }
  },
  created() {
    if (this.websock) {
      this.websock.close(); // 关闭websocket连接
    }
    this.initWebSocket();
  },
  methods:{
    // 初始化WebSocket
    initWebSocket(){
      if( typeof WebSocket == "undefined") {
        alert('您的浏览器不支持WebSocket')
        return false
      }
      const wsuri = 'ws://(后端WebSocket地址)/websocket/' + this.userId
      this.websock = new WebSocket(wsuri);
      this.websock.onopen = this.websocketonopen;
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
    },
    // 连接成功
    websocketonopen() {
      console.log('连接成功')
      let self = this
      this.timer = setInterval(() => {
        try {
          self.websock.send('test')
          console.log('发送消息')
        }catch (err){
          console.log('断开了:'+err)
          self.connection()
        }
      }, 30000)
    },
    // 接收后端返回的数据，可以根据需要进行处理
    websocketonmessage(e) {
      let vm = this
      let dataJson = JSON.parse(e.data)
      console.log(dataJson)
    },
    // 连接建立失败重连
    websocketonerror(e) {
      console.log('连接失败的信息：', e)
      this.initWebSocket(); // 连接失败后尝试重新连接
    },
    // 关闭连接
    websocketclose(e){
      console.log('断开连接', e)
    }
  },
  destroyed() {
    //页面销毁时关闭ws连接
    if (this.websock) {
      this.websock.close(); // 关闭websocket
    }
  }
}
</script>
<style lang="scss" scoped>
.video{
  width: 100%;
  height: 100%;
}
</style>