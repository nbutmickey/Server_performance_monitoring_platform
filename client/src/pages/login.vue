<template>
<div class="login">
      <div class="login-form">
        <div class="title">服务器性能监控平台</div>
        <div class="tips" v-if="showTips">{{tips}}</div>
        <div class="item">
          <a-input type="text" placeholder="用户名" v-model="userName"></a-input>
        </div>
        <div class="item">
          <a-input type="password" placeholder="密码" v-model="passWord"></a-input>
        </div>
        <div class="item" v-if="register">
          <a-input type="text" placeholder="手机号" v-model="phoneNumber"></a-input>
        </div>
        <div class="item">
          <a-checkbox @change="onChange">记住密码</a-checkbox>
        </div>
        <div class="item">
          <a-button type="primary"  v-if="!register" @click="handleSubmit" >登录</a-button>
          <a-button type="primary"    v-else @click="handleSubmit" >注册</a-button>
        </div>
        <div class="item">
          <a v-show="!register" @click="changeButton">还没账号?点我注册</a>
          <a v-show="register" @click="changeButton">已有账号，返回登录</a>
        </div>
      </div>
    </div>
  <!-- <div class="login-container">
    <div class="login-form-box">
     <div class="login-title">{{this.register?'注 册':'登 录'}}</div>
      <a-form
        id="components-form-demo-normal-login"
        :form="form"
        class="login-form"
        @submit="handleSubmit"
      >
        <a-form-item>
          <a-input
            v-decorator="[
          'username',
          { rules: [{ required: true, message: '用户名不能为空!' }] },
        ]"
            placeholder="Username"
          >
            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            v-decorator="[
          'password',
          { rules: [{ required: true, message: '密码不能为空!' }] },
        ]"
            type="password"
            placeholder="Password"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item v-if="register">
          <a-input
            v-decorator="[
          'phonenumber',
          { rules: [
          { required: true, message: '手机号码不能为空!' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号!'}
          ] },
        ]"
            placeholder="phonenumber"
          >
            <a-icon slot="prefix" type="phone" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item >
          <template  v-if="!this.register">
            <a-checkbox
            v-decorator="[
          'remember',
          {
            valuePropName: 'checked',
            initialValue: true,
          },
        ]"
         >Remember me</a-checkbox>
          </template>
          <a-button type="primary" :loading="loading" html-type="submit" class="login-form-button">{{this.register?'注册':'登录'}}</a-button>
          <a-button type="link" @click="changeToRegister">{{this.register?'返回登录':'还没账号 ? 点我注册一个吧'}}</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div> -->
</template>

<script>
import {setCookie,getCookie} from "@/common/js/utils"
export default {
  data() {
    return {
      register:false,
      showTips:false,
      isCheck:false,
      userName:'',
      passWord:'',
      phoneNumber:'',
      tips:''
    };
  },
  mounted () {
    let username=getCookie("username");
    let password=getCookie("password");
    if(username&&password&&!this.register){
      this.userName=username;
      this.passWord=password;
    }
  },
  methods: {
    changeButton(){
      this.userName='';
      this.passWord='';
      this.register=!this.register;
    },
    onChange(e){
      this.isCheck=e.target.checked
    },
    async handleSubmit() {
      if(this.userName===''){
              this.tips='用户名不能为空';
              this.showTips=true;
      }else if(this.passWord===''){
              this.tips='密码不能为空';
              this.showTips=true;
      }else{
        if(this.isCheck){
            setCookie("username",this.userName);
            setCookie("password",this.passWord);
        }
        if(this.register){
            if(this.phoneNumber!==''){
              let {success,note}=await this.$post('/users/reg',{username:this.userName,password:this.passWord,phonenumber:this.phoneNumber})
              if(success){
                this.$message.success("注册成功，点击返回登录吧~");
              }else{
                this.tips=note;
                this.showTips=true;
              }
            }else{
              this.tips='手机号不能为空';
              this.showTips=true;
            }
        }else{
            let {success,note,username,token}=await this.$post('/users/login',{username:this.userName,password:this.passWord})
            if(success){
              //本地存储token的逻辑
              localStorage.setItem("token",token);
              localStorage.setItem("username",username);
              this.$message.success(note);
              this.$router.push('/application');
            }else{
                this.tips=note;
                this.showTips=true;
            }
          }
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.login{
    .login-form{
    position: fixed;
    top: 50%;
    left: 50%;
    width: 450px;
    padding: 20px;
    box-shadow: 0 0 30px #efefefef;
    border-top:4px solid #118060;
    transform: translate(-50%,-50%);
    .tips{
      width: 100%;
      height: 30px;
      border-left: 4px solid #e96868;
      line-height: 30px;
      padding-left: 10px;
      color: #e96868;
      margin-bottom: 15px;
      font-size: 0.8rem;
    }
    .title{
      font-size: 1.5rem;
      text-align: center;
      margin-bottom: 30px;
      color: #118060;
    }
    .item{
      margin-bottom: 30px;
      &:last-child{
        margin-bottom: 0;
        text-align: center;
        a{
          font-size: 0.5rem;
          cursor: pointer;
          &:hover{
            color: #136c7e;
          }
        }
      }

    }
      button{
        width: 100%;
      }
  }
  @media screen and (max-width: 768px){
  .login{
    .login-form{
      width: 80%;
    }
  }
}
}
</style>
