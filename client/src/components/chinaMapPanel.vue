<template>
  <div style="width:100%;">
    <div class="content-box">
      <div class="title">
        <span class="box-panel-title-small">{{title}}</span>
        <span class="box-panel-time-dimension">
          <a-popover placement="right" class="radio-gap">
            <template slot="content">
              <a-radio-group defaultValue="0" size="small" @change="changeTimeDimension">
                <a-radio-button value="0">30分钟</a-radio-button>
                <a-radio-button value="1">60分钟</a-radio-button>
                <a-radio-button value="2">12小时</a-radio-button>
                <a-radio-button value="3">24小时</a-radio-button>
                <a-radio-button value="4">最近3天</a-radio-button>
                <a-radio-button value="5">最近7天</a-radio-button>
              </a-radio-group>
            </template>
            <a-icon type="clock-circle" />
          </a-popover>
        </span>
      </div>
      <div class="container">
        <div style="width:50%" id="c1"></div>
        <div style="height:335px;width:50%">
            <a-table
            :columns="columns"
            :dataSource="userData"
            :loading="loading"
            :pagination="pagination"
            :size="size"
            :rowKey="record => record.type"
          ></a-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import china from '@/common/json/china.json';
export default {
  props:{
      title:String
  },
  data() {
    return {
      chart: null,
      china,
      columns: [
        {
          title: "省市区",
          dataIndex: "province"
        },
        {
          title: "pv",
          dataIndex: "pv",
          align: "center"
        },
        {
          title: "uv",
          dataIndex: "uv",
          align: "center"
        }
      ],
      pagination: {
          pageSize:7
      },
      size: "middle",
      loading: false,
      userData:[
      { province: '新疆维吾尔自治区', pv: 86,uv:23 },
      { province: '内蒙古自治区', pv: 106,uv:22 },
      { province: '安徽省', pv: 94,uv:22 },
      { province: '江苏省', pv: 94,uv:22 },
      { province: '北京市', pv: 34,uv:22 },
      { province: '香港特别行政区', pv: 94,uv:22 },
      { province: '海南省', pv: 94,uv:22 },
      { province: '四川省', pv: 94,uv:22 },
      { province: '湖北省', pv: 34,uv:22 },
      { province: '澳门特别行政区', pv: 94,uv:22 },
      { province: '山东省', pv: 94,uv:22 },
      { province: '黑龙江省', pv: 94,uv:22 }
    ],
    }
  },
  created() {
      //console.log(this.title);
  },
  mounted() {
      const chart = new G2.Chart({
      container: 'c1',
      forceFit:true,
      height: 400,
      padding: 0
    });
    chart.tooltip({
      showTitle: false
    });
    //同步度量
    chart.scale({
      longitude: {
        sync: true
      },
      latitude: {
        sync: true
      }
    });
    chart.axis(false);
    chart.legend(false);
    // 绘制中国地图背景
    const ds = new DataSet();
    const chinaMap = ds.createView('back')
      .source(china, {
        type: 'GeoJSON'
      });
    const chinaView = chart.view();
    chinaView.source(chinaMap);
    chinaView.tooltip(false);
    chinaView.polygon().position('longitude*latitude').style({
      fill: '#fff',
      stroke: '#ccc',
      lineWidth: 1
    });

    // 可视化用户数据
    
    const userDv = ds.createView()
      .source(this.userData)
      .transform({
        geoDataView:chinaMap,
        field: 'province',
        type: 'geo.region',
        as: [ 'longitude', 'latitude' ]
      })
    const userView = chart.view();
    userView.source(userDv);
    userView.polygon().tooltip('province*pv*uv').color('pv', '#0050B3-#1890FF-#40A9FF-#69C0FF-#BAE7FF').position('longitude*latitude');
    chart.render();
  },
  methods: {
      changeTimeDimension:function(){}
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
  .title {
    height: 30px;
    color: #314659;
    .box-panel-title-small {
      font-weight: 700;
      font-size: 14px;
    }
    .box-panel-time-dimension {
      margin-left: 20px;
      font-size: 14px;
    }
  }
  .container{
        width:100%;
        display:flex;
        flex-direction: row;
  }
}
</style>