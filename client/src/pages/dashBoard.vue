<template>
  <div style="height:100%">
    <headerBar :showNav="showNav"></headerBar>
    <div class="dashboard">
        <router-view/>
    </div>
  </div>
</template>

<script>
import headerBar from "@/components/header";
export default {
  name: "DashBoard",
  components: {
    headerBar
  },
  data() {
    return {
      showNav:true
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.dashboard {
  width: 100%;
  background-color: #f0f2f5;
  margin-top:46px;
  padding: 18px 30px 30px 30px;
  min-height: 0;
}
</style>
