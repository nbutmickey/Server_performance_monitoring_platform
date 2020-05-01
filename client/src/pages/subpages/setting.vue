<template>
  <div style="height:100%">
    <headerBar :showNav="headerBar"></headerBar>
    <div class="setting-container">
      <h3>复制/粘贴探针</h3>
      <p>您的appID：<span style="color:#ff3333;font-weight:bold">{{appID}}</span></p>
      <p>复制下方的代码，将其粘贴在页面HTML的head中。</p>
      <div class="setting-code">{{this.codeStr}}</div>
    </div>
  </div>
</template>

<script>
import headerBar from "@/components/header";
export default {
  data() {
    return {
      headerBar: false,
      appID:"",
      codeStr:"" 
      };
  },
  mounted() {
      this.appID=localStorage.getItem("appID");
      this.codeStr=`\<script\>(function(){window._appID="${this.appID}";function getCookie(key){if(document.cookie.length>0){c_start=document.cookie.indexOf(key+"=");if(c_start!=-1){c_start=c_start+key.length+1;c_end=document.cookie.indexOf(";",c_start);if(c_end==-1){c_end=document.cookie.length;return unescape(document.cookie.substring(c_start,c_end))}else{return false}}}}let xmlHttp;if(window.XMLHttpRequest){xmlHttp=new XMLHttpRequest()}else{xmlHttp=new ActiveXObject("Microsoft.XMLHTTP")}xmlHttp.open("GET","http://121.199.49.71:3001/collect/clientID/?appID="+window._appID+"&clientID="+getCookie("userID"),true);xmlHttp.send();xmlHttp.onreadystatechange=function(){if(xmlHttp.readyState===4){if(xmlHttp.status>=200&&xmlHttp.status<300||xmlHttp.status===304){let success=JSON.parse(xmlHttp.responseText).success;if(success){let User_Cookie=JSON.parse(xmlHttp.responseText).cookie;let exp=new Date();exp.setTime(exp.getTime()+365*24*60*60*1000);document.cookie="userID="+User_Cookie+";expires="+exp.toGMTString()}let fp=document.createElement("script");fp.type="text/javascript";fp.async=true;fp.src="http://1121.199.49.71:3001/static/javascripts/collection.js";let s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(fp,s)}}}})()<\/script\>`
  },
  components: {
    headerBar
  }
};
</script>

<style scoped lang="less">
.setting-container {
  background-color: #f0f2f5;
  height: 100%;
  margin-top: 46px;
  padding: 20px;
}
.setting-code {
  height: auto;  
  background-color: #fff;
  padding: 16px;
  border-radius: 5px ;
}
</style>