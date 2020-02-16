<template>
  <div style="width:100%;">
    <div class="content-box">
      <timeDimension :title="title" v-on:changeTimeDimension="changeTimeDimension"></timeDimension>
      <div class="container">
        <div style="width:50%" id="c1"></div>
        <div style="height:335px;width:50%">
          <a-table
            :columns="columns"
            :dataSource="data"
            :loading="loading"
            :scroll="{ y: 320 }"
            :pagination="pagination"
            size="middle"
            :rowKey="record => record.type"
          ></a-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import china from "@/common/json/china.json";
import timeDimension from "@/components/timeDimension"
export default {
  props: {
    title: String,
    data: Array
  },
  components: {
    timeDimension
  },
  data() {
    return {
      chart: null,
      ds:null,
      chinaMap:null,
      china,
      columns: [
        {
          title: "省市区",
          dataIndex: "province"
        },
        {
          title: "pv",
          dataIndex: "pv",
          width:150
        },
        {
          title: "uv",
          dataIndex: "uv",
          width:150
        }
      ],
      pagination:false,
      loading: false
    };
  },
  mounted() {
    this.renderMapChart();
    this.mapDataSettle(this.data);
  },
  watch:{
    data(val){
      this.mapDataSettle(val);
    }
  },
  methods: {
    changeTimeDimension: function(e) {
      this.$emit("changeTimeDimension", e.target.value);
    },
    mapDataSettle:function(data){
      // 用户数据处理
      const userDv = this.ds
        .createView()
        .source(data)
        .transform({
          geoDataView: this.chinaMap, //使用geo数据来源
          field: "province", //标注地名的字段
          type: "geo.region", //由地名获取地理位置区域
          as: ["longitude", "latitude"] //longitude和latitude为多边形的顶点集
        });

      const userView= this.chart.view(); //将this.chart的view复制给userView
      userView.source(userDv)
      userView
        .polygon()
        .tooltip("province*pv*uv")
        // .size("pv",[0,100])
        .color("pv", "#0050B3-#1890FF-#40A9FF-#69C0FF-#BAE7FF")
        .position("longitude*latitude");
      this.chart.render();
    },
    renderMapChart: function() {
      this.chart= new G2.Chart({
        container: "c1",
        forceFit: true,
        height: 400,
        padding: 'auto'
      });
      this.chart.tooltip({
        showTitle: false
      });
      //同步度量
      this.chart.scale({
        longitude: {
          sync: true
        },
        latitude: {
          sync: true
        }
      });
      //关闭所有坐标轴
      this.chart.axis(false);


      // 绘制中国地图背景
      this.ds = new DataSet();
      //接入中国地图的geo数据
      this.chinaMap = this.ds.createView("back").source(china, {
        type: "GeoJSON"
      });
      //创建视图返回view对象
      const chinaView= this.chart.view();
      //接入数据源
      chinaView.source(this.chinaMap);
      //关闭提示信息
      chinaView.tooltip(false);
      chinaView
        .polygon()  //表示创建一个多边形，属于几何标记
        .position("longitude*latitude") //将数据值映射到图形位置上的方法
        .style({
          fill: "#fff", //填充绘画的颜色
          stroke: "#ccc", //笔触的颜色
          lineWidth: 1 //当前线条的宽度
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.content-box {
  margin-bottom: 16px;
  background: #fff;
  padding: 16px;
  border-radius: 4px;
  box-shadow: 0 0 4px rgba(82, 94, 102, 0.15);
  .container {
    width: 100%;
    display: flex;
    flex-direction: row;
  }
}
</style>