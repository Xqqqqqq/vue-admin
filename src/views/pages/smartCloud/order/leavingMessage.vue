<template>
  <div class="card-box">
    <el-card class="card-box-el" shadow="always">
      <div class="infinite-list-wrapper" style="overflow: auto">
        <el-timeline>
          <div v-if="allmessages.length > 0">
            <el-timeline-item
              v-for="(item, index) in allmessages"
              :key="index"
              :timestamp="item.createTime"
              placement="top">
              <el-card style="min-height: 100px; width: 95%">
                <div class="list-wrapper-person">{{ item.memberName }}：</div>
                <div class="list-wrapper-content">{{ item.content }}</div>
              </el-card>
            </el-timeline-item>
          </div>
          <div v-else>
            <el-timeline-item placement="top">
              <el-card style="min-height: 100px">
                <p>暂无留言~</p>
              </el-card>
            </el-timeline-item>
          </div>
        </el-timeline>
      </div>
      <div class="el-card-messages">
        <el-input
          type="textarea"
          :rows="5"
          placeholder="输入留言"
          maxlength="200"
          v-model="message"
        ></el-input>
        <el-button type="primary" round class="submit-message" @click="submitMessage"
          >留言</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      message: "",
      allmessages:[{
        createTime: '2020-1-1',
        memberName: '李医生',
        content: '费时间的看法'
      },{
        createTime: '2020-1-1',
        memberName: 'dd',
        content: '费时间的看法'
      },{
        createTime: '2020-1-1',
        memberName: 'dd',
        content: '费时间的看法'
      },{
        createTime: '2020-1-1',
        memberName: 'dd',
        content: '费时间的看法'
      },{
        createTime: '2020-1-1',
        memberName: 'dd',
        content: '费时间的看法'
      },{
        createTime: '2020-1-1',
        memberName: 'dd',
        content: '费时间的看法'
      }]
    };
  },
  methods: {
    submitMessage() {
      if (
        this.message == "" ||
        this.message.replace(/(^\s*)|(\s*$)/g, "") == ""
      ) {
        this.$message("写点啥提交也行呀😉");
        return;
      }
      //  这里往下写调用后端的代码；
    },
  },
};
</script>
<style lang="scss" scoped>
.card-box{
  width: 100%;
  height: 100%;
  position: relative;
  .infinite-list-wrapper {
    width: 100%;
    height: 60vh;
    text-align: left;
    .list-wrapper-person{
      font-size: 22px;
      margin-bottom: 10px;
    }
    .list-wrapper-content{
      font-size: 18px;
    }
  }
  .el-card-messages{
    position: absolute;
    left: 50%;
    bottom: 0;
    width: 90%;
    transform: translateX(-50%);
  }
}
@media screen and (max-width: 3000px) and (min-width: 767px) {
  .card-box-el {
    margin: auto;
    margin-top: 20px;
    width: 80%;
    height: 95%;
    position: relative;
  }
}
/*
屏幕小于768px的
*/
@media screen and (max-width: 768px) and (min-width: 100px) {
  .card-box-el {
    width: 100%;
    height: 100%;
    position: relative;
  }
}
</style>