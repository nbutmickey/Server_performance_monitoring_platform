<template>
  <div>
     <resourceTypePanel :data="resData"></resourceTypePanel>
     <resourceDetailPanel></resourceDetailPanel>
  </div>
</template>

<script>
// import "../common/style/main.less"
import resourceTypePanel from "@/components/resourceTypePanel"
import resourceDetailPanel from "@/components/resourceDetailPanel"
export default {
  data() {
    return {
      resData:{
        fileSize:[],
        resDuration:[],
        resNum:[]
      }
    };
  },
  components: {
    resourceTypePanel,
    resourceDetailPanel
  },
  mounted () {
   this.getResTypeInfo();
  },
  methods: {
    getResTypeInfo:async function(){
      let { success, result } = await this.$get("/info/resTypeInfo");
      if(success){
        Object.keys(result).forEach((key)=>{
          if(result[key].length!==0)
              result[key]=result[key].sort((a,b)=>{return a.value-b.value})      
      })
      this.resData=result;
   }
  }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>