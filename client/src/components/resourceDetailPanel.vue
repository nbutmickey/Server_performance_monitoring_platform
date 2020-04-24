<template>
  <div class="res-detail">
    <div class="title">资源加载详情</div>
    <div class="query">
      <div class="item">
        <span>按资源URL查询</span>
        <span style="display:inline-block;width:295px;">
            <a-input v-model="searchStr" placeholder="请输入要查询的资源URL" @change="()=>{this.showError=false}"/>
            <p v-if="showError" style="color:red;margin:0">输入值不能为空</p>
        </span>
        <span style="margin-left:10px">
            <a-button type="primary" icon="search" @click="searchResByURL">搜索</a-button>
        </span>
      </div>
      <div class="item">
        <span>按类型查询</span>
        <span>
            <a-radio-group @change="typeChange"  defaultValue="0" buttonStyle="solid" class="custom-radio"> 
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
            <a-radio-group @change="timeChange"  defaultValue="0" buttonStyle="solid" class="custom-radio">
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
                :loading="isLoading"
                :columns="columns"
                :rowKey="(record,index) => index "
                :dataSource="resDetailData"
                :pagination="pagination"
            >
        <div :title="record.url" :style="{maxWidth: '350px',whiteSpace: 'nowrap',textOverflow: 'ellipsis',overflow: 'hidden', wordWrap: 'break-word', wordBreak: 'break-all' }" slot="preCondition" slot-scope="text, record">{{record.url}}</div>   
        </a-table>
    </div>
  </div>
</template>

<script>
const columns=[
    {
      title: '资源URL',
      dataIndex: 'url',
      scopedSlots: { customRender: 'preCondition' }
    },
    {
      title: '访问时间',
      dataIndex: 'visitTime',
      align:'center'
    },
    {
      title: '资源类型',
      dataIndex: 'initiatorType',
      align:'center'
    },
    {
      title: '资源大小',
      dataIndex: 'fileSize',
      align:'center',
      customRender:(text)=>`${text} KB`
    },
    {
      title: '访问耗时',
      dataIndex: 'duration',
      align:'center',
      customRender:(text)=>`${text} ms`
    },
]
export default {
  data() {
    return {
        searchStr:'',
        showError:false,
        resDetailData:[],
        isLoading:false,
        columns,
        pagination:{
            pageSize:8,
            hideOnSinglePage:true,
            size:"small",
            showTotal:(total)=>`总计 ${total} 条数据`
        },
        queryParams:{
          type:0,
          timeDimension:0
        }
    };
  },
  created() {
    this.getResourceDetail();
  },
  async mounted() {},
  methods: {
      timeChange:function(e){
        this.queryParams.timeDimension=parseInt(e.target.value);
        this.getResourceDetail();
      },
      typeChange:function(e){
         this.queryParams.type=parseInt(e.target.value);
         this.getResourceDetail();
      },
      getResourceDetail:async function(){
        this.isLoading=true;
         let {success , result}=await this.$get('info/getResDetailByCondition',this.queryParams);
         if(success){
           this.resDetailData=result;
           this.isLoading=false;
         } 
      },
      searchResByURL:async function(){
        if(this.searchStr!==''){
          let {success,result}=await this.$get('info/getResByURL',{url:this.searchStr});
          if(success){
            this.resDetailData=result;
            this.isLoading=false;
          }
        }else{
          this.showError=true;
        }
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
      height: 550px;
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