<template>
  <div class="res-detail">
    <div class="title">资源加载详情</div>
    <div class="query">
      <div class="item">
        <span>按资源URL查询</span>
        <span style="display:inline-block;width:295px;">
            <a-input v-model="searchStr" placeholder="请输入要查询的资源URL" />
        </span>
        <span style="margin-left:10px">
            <a-button type="primary" icon="search" @click="searchRes">搜索</a-button>
        </span>
      </div>
      <div class="item">
        <span>按类型查询</span>
        <span>
            <a-radio-group @change="searchByResType"  defaultValue="0" buttonStyle="solid" class="custom-radio"> 
                <a-radio-button value="0">全部</a-radio-button>
                <a-radio-button value="1">JS</a-radio-button>
                <a-radio-button value="2">XHR</a-radio-button>
                <a-radio-button value="3">CSS</a-radio-button>
                <a-radio-button value="4">IMG</a-radio-button>
                <a-radio-button value="5">Other</a-radio-button>
            </a-radio-group>
        </span>
      </div>
      <div class="item">
        <span>按时间查询</span>
        <span>
            <a-radio-group @change="searchResByTimeDimension"  defaultValue="0" buttonStyle="solid" class="custom-radio">
                <a-radio-button value="0">30分钟</a-radio-button>
                <a-radio-button value="1">60分钟</a-radio-button>
                <a-radio-button value="2">12小时</a-radio-button>
                <a-radio-button value="3">24小时</a-radio-button>
                <a-radio-button value="4">最近3天</a-radio-button>
                <a-radio-button value="5">最近7天</a-radio-button>
            </a-radio-group>
        </span>
      </div>
    </div>
    <div class="content">
        <a-table
                :columns="columns"
                :rowKey="record => record.url"
                :dataSource="data"
                :pagination="pagination"
            >
        </a-table>
    </div>
  </div>
</template>

<script>
const columns=[
    {
      title: '资源URL',
      dataIndex: 'url',
    },
    {
      title: '访问时间',
      dataIndex: 'visitTime',
    },
    {
      title: '资源类型',
      dataIndex: 'initiatorType',
    },
    {
      title: '资源大小',
      dataIndex: 'size',
      customRender:(text)=>`${text} KB`
    },
    {
      title: '访问耗时',
      dataIndex: 'duration',
      customRender:(text)=>`${text} ms`
    },
]
export default {
  data() {
    return {
        searchStr:'',
        columns,
        data:[
            {url:"http://192.168.31.88:8080/app.js",visitTime:"",initiatorType:"css",size:34,duration:1234},
            {url:"http://192.168.31.88:8080/acp.js",visitTime:"",initiatorType:"css",size:34,duration:1234},
            {url:"http://192.168.31.88:8080/abp.js",visitTime:"",initiatorType:"css",size:34,duration:1234},
            {url:"http://192.168.31.88:8080/adp.js",visitTime:"",initiatorType:"css",size:34,duration:1234},
            {url:"http://192.168.31.88:8080/agp.js",visitTime:"",initiatorType:"css",size:34,duration:1234},
            {url:"http://192.168.31.88:8080/afp.js",visitTime:"",initiatorType:"css",size:34,duration:1234},
            {url:"http://192.168.31.88:8080/ahp.js",visitTime:"",initiatorType:"css",size:34,duration:1234},
            {url:"http://192.168.31.88:8080/aip.js",visitTime:"",initiatorType:"css",size:34,duration:1234},
            {url:"http://192.168.31.88:8080/ajp.js",visitTime:"",initiatorType:"css",size:34,duration:1234},
            {url:"http://192.168.31.88:8080/akp.js",visitTime:"",initiatorType:"css",size:34,duration:1234},
            {url:"http://192.168.31.88:8080/alp.js",visitTime:"",initiatorType:"css",size:34,duration:1234},
            {url:"http://192.168.31.88:8080/amp.js",visitTime:"",initiatorType:"css",size:34,duration:1234},
            {url:"http://192.168.31.88:8080/anp.js",visitTime:"",initiatorType:"css",size:34,duration:1234},
            {url:"http://192.168.31.88:8080/aop.js",visitTime:"",initiatorType:"css",size:34,duration:1234},
            {url:"http://192.168.31.88:8080/aqp.js",visitTime:"",initiatorType:"css",size:34,duration:1234},
            {url:"http://192.168.31.88:8080/arp.js",visitTime:"",initiatorType:"css",size:34,duration:1234},
            {url:"http://192.168.31.88:8080/asp.js",visitTime:"",initiatorType:"css",size:34,duration:1234},
            {url:"http://192.168.31.88:8080/atp.js",visitTime:"",initiatorType:"css",size:34,duration:1234},
        ],
        pagination:{
            pageSize:8,
            hideOnSinglePage:true,
            size:"small",
            showTotal:(total)=>`总计 ${total} 条数据`
        }
    };
  },
  created() {},
  async mounted() {},
  methods: {
      searchByResType:async function(e){
         let {success,result} = await this.axios.post({
             url:'/data/resDetail',
             data:{
                 url:'',
                 type:e.target.value,
                 dimension:''
             }
         })
      },
      searchResByTimeDimension:async function(e){
          let {success,result} = await this.axios.post({
             url:'/data/resDetail',
             data:{
                 url:'',
                 type:'',
                 dimension:e.target.value
             }
         })
      },
      searchResByURL:async function(){
        let {success,result} = await this.axios.post({
             url:'/data/resDetail',
             data:{
                 url:this.searchStr,
                 type:'',
                 dimension:''
             }
         })
      }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.res-detail {
  background: #fff;
  box-shadow: 0 0 4px rgba(82, 94, 102, 0.15);
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 4px;
  .title {
    font-size: 14px;
    font-weight: 700;
  }
  .content{
      height: 550px
  }
  .query {
    width: 100%;
    .item {
      display: flex;
      flex-direction: row;
      padding: 10px 0;
      span:first-of-type{
          width: 100px;
          margin-right: 10px;
      }
      .custom-radio{
          .ant-radio-button-wrapper{
              margin: 0 5px 0 0;
          }
          .ant-radio-button-wrapper:first-child{
              border-radius: 0;
          }
          .ant-radio-button-wrapper:last-child{
              border-radius: 0;
          }
      }
      .components-input-demo-size .ant-input {
        width: 400px;
        margin: 0 8px 8px 0;
      }
    }
  }
}
</style>