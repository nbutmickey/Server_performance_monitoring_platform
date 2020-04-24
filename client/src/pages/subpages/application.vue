<template>
  <div style="height:100%">
    <headerBar :showNav="showNav"></headerBar>
    <div class="application-container">
      <div class="application-add">
        <a-button type="primary" @click="showModal" icon="plus">新建站点</a-button>
      </div>
      <div class="application-card">
        <a-card
          :title="item.appName"
          v-for="(item,index) in appInfo"
          :key="index"
          :bordered="false"
          :hoverable="true"
          style="width: 31%;height:200px;margin:20px 15px 0 15px;cursor:pointer"
        >
          <a-popconfirm slot="extra" @confirm="deleteApp(item.appID)" placement="leftBottom" title="删除应用意味着所有数据会被抹掉,确定吗？" okText="我确定" cancelText="放弃">
            <a href="#">删除</a>
          </a-popconfirm>
          <div  @click="enterApp(item.appID)">
            <p><span>应用ID :</span> {{item.appID}}</p>
            <p><span>监控域 :</span> {{item.monitoringDomain}}</p>
            <p><span>创建时间 :</span> {{item.createTime}}</p>
          </div>
        </a-card>
      </div>
    </div>

    <a-modal title="填写应用信息" v-model="visible" :footer="null">
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item label="应用名称" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-input
            v-decorator="['appName', { rules: [{ required: true, message: '应用名称不能为空!' }] }]"
          />
        </a-form-item>
        <a-form-item label="监控URL" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-input
            v-decorator="['monitorURL', { rules: [{ required: true, message: '监控的URL不能为空!' }] }]"
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
          <a-button type="primary" html-type="submit">提交数据</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import headerBar from "@/components/header";
import {  getCookie } from "@/common/js/utils"
export default {
  data() {
    return {
      visible: false,
      showNav: false,
      form:this.$form.createForm(this, { name: 'newApplicationInfo' }),
      appInfo: []
    };
  },
  components: {
    headerBar
  },
  created () {
    this.fetchAllAppInfo();
  },
  methods: {
    enterApp(appID){
      localStorage.setItem("appID",appID);
      this.$router.push('/general')
    },
    showModal() {
      this.visible = true;
    },
    async deleteApp(appID){
      let {success,result}=await this.$post('/manage/deleteApp',{appID:appID});
      if(success){
          this.$message.warning('应用删除成功');
          this.fetchAllAppInfo();
      }else{
         this.$message.error('应用删除失败!');
      }
    },
    handleSubmit(e){
      e.preventDefault();
      this.form.validateFields(async (err, appInfo) => {
        if (!err) {
          let userName=localStorage.getItem("username");
          let {success,result,note}=await this.$post('/manage/newApp',{monitoringDomain:appInfo.monitorURL,userName:userName,appName:appInfo.appName}); 
          if(success){
            this.$message.success("应用新建成功");
            this.fetchAllAppInfo();
            this.visible = false;
          }else {
            this.$message.error(note);
          }
        }
      });
    },
    async fetchAllAppInfo(){
      let userName=localStorage.getItem("username");
      let {success,result}=await this.$get('/manage/getAllApplication',{userName:userName});
      if(success){
          this.appInfo=result;
       }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.application-container {
  background-color: #f0f2f5;
  height: 100%;
  margin-top: 46px;
  padding: 20px;
  .application-add {
    text-align: right;
  }
  .application-card {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
