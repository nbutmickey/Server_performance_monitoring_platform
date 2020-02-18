<template>
  <div>
     <resourceTypePanel></resourceTypePanel>
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
      msg: "resource"
    };
  },
  components: {
    resourceTypePanel,
    resourceDetailPanel
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>