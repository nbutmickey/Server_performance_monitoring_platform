import Mock from 'mockjs'
Mock.setup({
    timeout:'100'
})
Mock.mock('/data/pageTop?dimensionType=0',{
    success:true,
    note:"数据返回成功",
    result:[
        // {
        //   pageURL: "http:www.mickey.cn:8080/home",
        //   pv:34,
        //   uv:21
        // },
        // {
        //   pageURL: "http:www.mickey.cn:8080/home",
        //   pv:34,
        //   uv:21
        // },
        // {
        //   pageURL: "http:www.mickey.cn:8080/home",
        //   pv:34,
        //   uv:21
        // },
        // {
        //   pageURL: "http:www.mickey.cn:8080/home",
        //   pv:34,
        //   uv:21
        // },
        // {
        //   pageURL: "http:www.mickey.cn:8080/home",
        //   pv:34,
        //   uv:21
        // },
        // {
        //   pageURL: "http:www.mickey.cn:8080/home",
        //   pv:34,
        //   uv:21
        // },
        // {
        //   key:7,
        //   pageURL: "http:www.mickey.cn:8080/home",
        //   pv:34,
        //   uv:21
        // },
        // {
        //   pageURL: "http:www.mickey.cn:8080/home",
        //   pv:34,
        //   uv:23
        // },
        ]
})
Mock.mock('/data/pageTop?dimensionType=1',{
  success:true,
  note:"数据返回成功",
  result:[
      {
        pageURL: "http:www.mickey.cn:8080/home",
        pv:34,
        uv:21
      },
      {
        pageURL: "http:www.mickey.cn:8080/home",
        pv:34,
        uv:21
      },
      {
        pageURL: "http:www.mickey.cn:8080/home",
        pv:34,
        uv:21
      },
      {
        pageURL: "http:www.mickey.cn:8080/home",
        pv:34,
        uv:21
      },
      {
        pageURL: "http:www.mickey.cn:8080/home",
        pv:34,
        uv:21
      },
      {
        pageURL: "http:www.mickey.cn:8080/home",
        pv:34,
        uv:21
      },
      {
        key:7,
        pageURL: "http:www.mickey.cn:8080/home",
        pv:34,
        uv:21
      },
      {
        pageURL: "http:www.mickey.cn:8080/aaa",
        pv:34,
        uv:23
      },
      ]
})
Mock.mock("/data/pvDataByDivider?dimensionType=0",{
    success:true,
    note:"数据返回成功",
    result:[
        { time: "2020-02-18T09:06:00.000Z", value: 25 },
        { time: "2020-02-19T09:07:00.000Z", value: 23 },
        { time: "2020-02-19T09:08:00.000Z", value: 20 },
        { time: "2020-02-19T09:23:00.000Z", value: 34 },
        { time: "2020-02-19T09:20:00.000Z", value: 20 },
        { time: "2020-02-19T09:34:00.000Z", value: 29 },
        { time: "2020-02-20T09:12:00.000Z", value: 12 },
        { time: "2020-02-19T09:45:00.000Z", value: 23 },
        { time: "2020-02-19T09:11:00.000Z", value: 11 },
        { time: "2020-02-19T09:09:00.000Z", value: 3 },
        { time: "2020-02-19T09:12:00.000Z", value: 32 },
        { time: "2020-02-19T09:45:00.000Z", value: 23 },
        { time: "2020-02-19T09:56:00.000Z", value: 11 },
        { time: "2020-02-21T09:59:00.000Z", value: 3 }
      ]
})
Mock.mock("/data/pvDataByDivider?dimensionType=4",{
  success:true,
  note:"数据返回成功",
  result:[
      { time: "2020-02-18T09:06:00.000Z", value: 5 },
      { time: "2020-02-19T09:07:00.000Z", value: 23 },
      { time: "2020-02-19T09:08:00.000Z", value: 20 },
      { time: "2020-02-19T09:23:00.000Z", value: 34 },
      { time: "2020-02-19T09:20:00.000Z", value: 20 },
      { time: "2020-02-19T09:06:00.000Z", value: 28 },
      { time: "2020-02-19T09:34:00.000Z", value: 39 },
      { time: "2020-02-20T09:12:00.000Z", value: 12 },
      { time: "2020-02-19T09:45:00.000Z", value: 23 },
      { time: "2020-02-19T09:11:00.000Z", value: 11 },
      { time: "2020-02-19T09:09:00.000Z", value: 3 },
      { time: "2020-02-19T09:12:00.000Z", value: 32 },
      { time: "2020-02-19T09:45:00.000Z", value: 23 },
      { time: "2020-02-19T09:56:00.000Z", value: 11 },
      { time: "2020-02-21T09:59:00.000Z", value: 31 }
    ]
})
Mock.mock("/data/uvDataByDivider?dimensionType=0",{
    success:true,
    note:"数据返回成功",
    result:[
        { time: "2020-02-18T09:06:00.000Z", pv: 115,uv:33 },
        { time: "2020-02-18T09:07:00.000Z", pv: 125,uv:23 },
        { time: "2020-02-18T09:08:00.000Z", pv: 135,uv:23 },
        { time: "2020-02-18T09:09:00.000Z", pv: 115,uv:23 },
        { time: "2020-02-18T09:10:00.000Z", pv: 215,uv:3 },
        { time: "2020-02-18T09:11:00.000Z", pv: 315,uv:13 },
        { time: "2020-02-18T09:12:00.000Z", pv: 15,uv:3 },
        { time: "2020-02-18T09:13:00.000Z", pv: 15,uv:13 },
        { time: "2020-02-18T09:14:00.000Z", pv: 515,uv:63 },
        { time: "2020-02-18T09:15:00.000Z", pv: 15,uv:23 },
        { time: "2020-02-18T09:16:00.000Z", pv: 25,uv:33 },
        { time: "2020-02-18T09:17:00.000Z", pv: 515,uv:123 },
        { time: "2020-02-18T09:18:00.000Z", pv: 115,uv:93 },
        { time: "2020-02-18T09:19:00.000Z", pv: 155,uv:23 },
        { time: "2020-02-18T09:20:00.000Z", pv: 175,uv:43 },
        { time: "2020-02-18T09:21:00.000Z", pv: 185,uv:93 },
      ]
})
Mock.mock("/data/uvDataByDivider?dimensionType=2",{
  success:true,
  note:"数据返回成功",
  result:[
      { time: "2020-02-18T09:06:00.000Z", value: 15 },
      { time: "2020-02-19T09:07:00.000Z", value: 13 },
      { time: "2020-02-19T09:08:00.000Z", value: 10 },
      { time: "2020-02-19T09:23:00.000Z", value: 14 },
      { time: "2020-02-19T09:20:00.000Z", value: 2 },
      { time: "2020-02-19T09:06:00.000Z", value: 18 },
      { time: "2020-02-19T09:34:00.000Z", value: 19 },
      { time: "2020-02-20T09:12:00.000Z", value: 22 },
    ]
})
Mock.mock("/data/uvDataByDivider?dimensionType=1",{
  success:true,
  note:"数据返回成功",
  result:[

    ]
})
Mock.mock('/data/geoDataByDivider?dimensionType=0',{
  success:true,
  note:"数据返回成功",
  result:[
    // { province: '新疆维吾尔自治区', pv: 86,uv:23 },
    // { province: '内蒙古自治区', pv: 106,uv:22 },
    // { province: '安徽省', pv: 94,uv:22 },
    // { province: '江苏省', pv: 94,uv:22 },
    // { province: '北京市', pv: 34,uv:22 },
    // { province: '香港特别行政区', pv: 94,uv:22 },
    // { province: '海南省', pv: 94,uv:22 },
    // { province: '四川省', pv: 94,uv:22 },
    // { province: '湖北省', pv: 34,uv:22 },
    // { province: '澳门特别行政区', pv: 94,uv:22 },
    // { province: '山东省', pv: 94,uv:22 },
    // { province: '黑龙江省', pv: 94,uv:22 }
    ]
})

Mock.mock('/data/geoDataByDivider?dimensionType=1',{
  success:true,
  note:"数据返回成功",
  result:[
    { province: '新疆维吾尔自治区', pv: 187,uv:23 },
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
    ]
})

Mock.mock('/data/geoDataByDivider?dimensionType=2',{
  success:true,
  note:"数据返回成功",
  result:[
    { province: '新疆维吾尔自治区', pv: 187,uv:23 },
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
    ]
})

Mock.mock('/data/bsDataByDivider?dimensionType=0',{
  success:true,
  result:[
    // { type: "Chrome", count: 123 },
    // { type: "FireFox", count: 124 },
    // { type: "Safari", count: 134 },
    // { type: "IE", count: 120 },
    // { type: "Edge", count: 100 }
  ]
})

Mock.mock('/data/bsDataByDivider?dimensionType=2',{
  success:true,
  result:[
    // { type: "Chrome", count: 123 },
    // { type: "FireFox", count: 124 },
    // { type: "Safari", count: 134 },
    // { type: "IE", count: 120 },
    // { type: "Edge", count: 100 }
  ]
})

Mock.mock('/data/bsDataByDivider?dimensionType=1',{
  success:true,
  result:[
    { type: "Chrome", count: 23 },
    { type: "FireFox", count: 24 },
    { type: "Safari", count: 34 },
    { type: "IE", count: 20 },
    { type: "Edge", count: 10}
  ]
})

Mock.mock('/data/osDataByDivider?dimensionType=0',{
  success:true,
  result:[
    { type: "Mac OS", count: 3 },
    { type: "Windows", count: 14 },
    { type: "LINUX", count: 34 },
    { type: "UNIX", count: 2 },
    { type: "Android", count: 12 }
  ]
})

Mock.mock('/data/osDataByDivider?dimensionType=1',{
  success:true,
  result:[
    // { type: "Mac OS", count: 193 },
    // { type: "Windows", count: 14 },
    // { type: "LINUX", count: 34 },
    // { type: "UNIX", count: 2 },
    // { type: "Android", count: 2 }
  ]
})

Mock.mock('/data/screenDataByDivider?dimensionType=0',{
  success:true,
  result:[
    // { type: "1300*728", count: 23 },
    // { type: "1902*1080", count: 14 },
    // { type: "440*780", count: 34 }
  ]
})

Mock.mock('/data/screenDataByDivider?dimensionType=1',{
  success:true,
  result:[
    { type: "1300*728", count: 24 },
    { type: "1902*1080", count: 24 },
    { type: "440*780", count: 34 }
  ]
})

Mock.mock('/data/isPCDataByDivider?dimensionType=0',{
  success:true,
  result:[
    { type: "PC", count: 123 },
    { type: "移动端", count: 514 }
  ]
})

Mock.mock('/data/isPCDataByDivider?dimensionType=1',{
  success:true,
  result:[
    { type: "PC", count: 23 },
    { type: "移动端", count: 14 }
  ]
})

Mock.mock('/data/waterfallLoading?dimensionType=0',{
  success:true,
  result:[
    {
      redirect: 120,
      dns: 343,
      tcp: 3345,
      ssl: 4456,
      ttfb: 321,
      trans: 1234,
      dom: 3123,
      resource: 1211,
      total:14153
    }
  ]
})

Mock.mock('/data/waterfallLoading?dimensionType=1',{
  success:true,
  result:[
    
  ]
})

Mock.mock('/data/intervalTime?dimensionType=0',{
  success:true,
  result:[
    {
      time: "2020-02-10T09:02:00.000Z",
      redirect: 120,
      dns: 343,
      tcp: 3345,
      ssl: 4456,
      ttfb:321,
      trans:234,
      dom:123,
      resource:1211
    },
    {
      time: "2020-02-10T09:08:00.000Z",
      redirect: 120,
      dns: 343,
      tcp: 3345,
      ssl: 4456,
      ttfb:321,
      trans:234,
      dom:123,
      resource:1211
    },
    {
      time: "2020-02-10T09:12:00.000Z",
      redirect: 120,
      dns: 343,
      tcp: 3345,
      ssl: 4456,
      ttfb:321,
      trans:234,
      dom:123,
      resource:1211
    },
    {
      time: "2020-02-10T09:05:00.000Z",
      redirect: 120,
      dns: 343,
      tcp: 3345,
      ssl: 4456,
      ttfb:321,
      trans:234,
      dom:123,
      resource:1211
    },
    {
      time: "2020-02-19T09:06:00.000Z",
      redirect: 120,
      dns: 343,
      tcp: 3345,
      ssl: 4456,
      ttfb:321,
      trans:234,
      dom:123,
      resource:1211
    },
    {
      time: "2020-02-10T09:13:00.000Z",
      redirect: 120,
      dns: 343,
      tcp: 3345,
      ssl: 4456,
      ttfb:321,
      trans:234,
      dom:123,
      resource:1211
    },
    {
      time: "2020-02-10T09:24:00.000Z",
      redirect: 120,
      dns: 343,
      tcp: 3345,
      ssl: 4456,
      ttfb:321,
      trans:234,
      dom:123,
      resource:1211
    },
    {
      time: "2020-02-10T09:34:00.000Z",
      redirect: 120,
      dns: 343,
      tcp: 3345,
      ssl: 4456,
      ttfb:321,
      trans:234,
      dom:123,
      resource:1211
    }
  ]
})
Mock.mock('/data/intervalTime?dimensionType=2',{
  success:true,
  result:[
    
  ]
})

Mock.mock('/data/intervalTime?dimensionType=1',{
  success:true,
  result:[
    {
      time: "2020-02-10T09:02:00.000Z",
      redirect: 120,
      dns: 343,
      tcp: 3345,
      ssl: 4456,
      ttfb:321,
      trans:234,
      dom:123,
      resource:1211
    },
    {
      time: "2020-02-10T09:08:00.000Z",
      redirect: 120,
      dns: 343,
      tcp: 3345,
      ssl: 4456,
      ttfb:321,
      trans:234,
      dom:123,
      resource:1211
    },
    {
      time: "2020-02-10T09:12:00.000Z",
      redirect: 120,
      dns: 343,
      tcp: 3345,
      ssl: 4456,
      ttfb:321,
      trans:234,
      dom:123,
      resource:1211
    },
    {
      time: "2020-02-10T09:05:00.000Z",
      redirect: 120,
      dns: 343,
      tcp: 3345,
      ssl: 4456,
      ttfb:321,
      trans:234,
      dom:123,
      resource:1211
    },
    {
      time: "2020-02-19T09:06:00.000Z",
      redirect: 120,
      dns: 343,
      tcp: 3345,
      ssl: 4456,
      ttfb:321,
      trans:234,
      dom:123,
      resource:1211
    },
    {
      time: "2020-02-10T09:13:00.000Z",
      redirect: 120,
      dns: 343,
      tcp: 3345,
      ssl: 4456,
      ttfb:321,
      trans:234,
      dom:123,
      resource:1211
    },
    {
      time: "2020-02-10T09:24:00.000Z",
      redirect: 120,
      dns: 343,
      tcp: 3345,
      ssl: 4456,
      ttfb:321,
      trans:234,
      dom:123,
      resource:1211
    },
    {
      time: "2020-02-10T09:34:00.000Z",
      redirect: 120,
      dns: 343,
      tcp: 3345,
      ssl: 4456,
      ttfb:321,
      trans:234,
      dom:123,
      resource:1211
    }
  ]
})

Mock.mock('/data/keyPer?dimensionType=0',{
  success:true,
  result:[
    // {
    //   time: "2020-02-10T09:00:00.000Z",
    //   fpt: 120,
    //   ready: 343,
    //   tti: 3345,
    //   load: 4456
    // },
    // {
    //   time: "2020-02-11T09:01:00.000Z",
    //   fpt: 123,
    //   ready: 353,
    //   tti: 2345,
    //   load: 3456
    // },
    // {
    //   time: "2020-02-11T09:02:00.000Z",
    //   fpt: 122,
    //   ready: 343,
    //   tti: 1345,
    //   load: 2456
    // },
    // {
    //   time: "2020-02-11T09:03:00.000Z",
    //   fpt: 121,
    //   ready: 143,
    //   tti: 845,
    //   load: 1456
    // },
    // {
    //   time: "2020-02-11T09:04:03.000Z",
    //   fpt: 225,
    //   ready: 243,
    //   tti: 4345,
    //   load: 5456
    // },
    // {
    //   time: "2020-02-11T09:04:02.000Z",
    //   fpt: 325,
    //   ready: 343,
    //   tti: 2345,
    //   load: 2456
    // },
    //  {
    //   time: "2020-02-11T09:04:56.000Z",
    //   fpt: 225,
    //   ready: 243,
    //   tti: 4345,
    //   load: 5456
    // },
    // {
    //   time: "2020-02-11T09:04:34.000Z",
    //   fpt: 325,
    //   ready: 343,
    //   tti: 2345,
    //   load: 2456
    // }
  ]
})
Mock.mock('/data/keyPer?dimensionType=2',{
  success:true,
  result:[
    // {
    //   time: "2020-02-10T09:00:00.000Z",
    //   fpt: 120,
    //   ready: 343,
    //   tti: 3345,
    //   load: 4456
    // },
    // {
    //   time: "2020-02-11T09:01:00.000Z",
    //   fpt: 123,
    //   ready: 353,
    //   tti: 2345,
    //   load: 3456
    // },
    // {
    //   time: "2020-02-11T09:02:00.000Z",
    //   fpt: 122,
    //   ready: 343,
    //   tti: 1345,
    //   load: 2456
    // },
    // {
    //   time: "2020-02-11T09:03:00.000Z",
    //   fpt: 121,
    //   ready: 143,
    //   tti: 845,
    //   load: 1456
    // },
    // {
    //   time: "2020-02-11T09:04:03.000Z",
    //   fpt: 225,
    //   ready: 243,
    //   tti: 4345,
    //   load: 5456
    // },
    // {
    //   time: "2020-02-11T09:04:02.000Z",
    //   fpt: 325,
    //   ready: 343,
    //   tti: 2345,
    //   load: 2456
    // },
    //  {
    //   time: "2020-02-11T09:04:56.000Z",
    //   fpt: 225,
    //   ready: 243,
    //   tti: 4345,
    //   load: 5456
    // },
    // {
    //   time: "2020-02-11T09:04:34.000Z",
    //   fpt: 325,
    //   ready: 343,
    //   tti: 2345,
    //   load: 2456
    // }
  ]
})
Mock.mock('/data/keyPer?dimensionType=3',{
  success:true,
  result:[
    // {
    //   time: "2020-02-10T09:00:00.000Z",
    //   fpt: 120,
    //   ready: 343,
    //   tti: 3345,
    //   load: 4456
    // },
    // {
    //   time: "2020-02-11T09:01:00.000Z",
    //   fpt: 123,
    //   ready: 353,
    //   tti: 2345,
    //   load: 3456
    // },
    // {
    //   time: "2020-02-11T09:02:00.000Z",
    //   fpt: 122,
    //   ready: 343,
    //   tti: 1345,
    //   load: 2456
    // },
    // {
    //   time: "2020-02-11T09:03:00.000Z",
    //   fpt: 121,
    //   ready: 143,
    //   tti: 845,
    //   load: 1456
    // },
    // {
    //   time: "2020-02-11T09:04:03.000Z",
    //   fpt: 225,
    //   ready: 243,
    //   tti: 4345,
    //   load: 5456
    // },
    // {
    //   time: "2020-02-11T09:04:02.000Z",
    //   fpt: 325,
    //   ready: 343,
    //   tti: 2345,
    //   load: 2456
    // },
    //  {
    //   time: "2020-02-11T09:04:56.000Z",
    //   fpt: 225,
    //   ready: 243,
    //   tti: 4345,
    //   load: 5456
    // },
    // {
    //   time: "2020-02-11T09:04:34.000Z",
    //   fpt: 325,
    //   ready: 343,
    //   tti: 2345,
    //   load: 2456
    // }
  ]
})

Mock.mock('/data/keyPer?dimensionType=1',{
  success:true,
  result:[
    {
      time: "2020-02-10T09:00:00.000Z",
      fpt: 120,
      ready: 34223,
      tti: 3345,
      load: 4456
    },
    {
      time: "2020-02-11T09:01:00.000Z",
      fpt: 123,
      ready: 353,
      tti: 2345,
      load: 3456
    },
    {
      time: "2020-02-11T09:02:00.000Z",
      fpt: 122,
      ready: 343,
      tti: 1345,
      load: 2456
    },
    {
      time: "2020-02-11T09:03:00.000Z",
      fpt: 121,
      ready: 143,
      tti: 845,
      load: 1456
    },
    {
      time: "2020-02-11T09:04:03.000Z",
      fpt: 225,
      ready: 243,
      tti: 4345,
      load: 5456
    },
    {
      time: "2020-02-11T09:04:02.000Z",
      fpt: 325,
      ready: 343,
      tti: 2345,
      load: 2456
    },
     {
      time: "2020-02-11T09:04:56.000Z",
      fpt: 225,
      ready: 243,
      tti: 4345,
      load: 5456
    },
    {
      time: "2020-02-11T09:04:34.000Z",
      fpt: 325,
      ready: 343,
      tti: 2345,
      load: 2456
    }
  ]
})

Mock.mock('/data/pageList?dimensionType=0',{
  success:true,
  result:[
    {
      pageURL: "http:www.mickey.cn:8080/user",
      fpt: 234,
      ready: 2222,
      tti: 111,
      load: 890
    },
    {
      pageURL: "http:www.mickey.cn:8080/home",
      fpt: 234,
      ready: 2222,
      tti: 111,
      load: 890
    },
    {
      pageURL: "http:www.mickey.cn:8080/home",
      fpt: 234,
      ready: 2222,
      tti: 111,
      load: 890
    },
    {
      pageURL: "http:www.mickey.cn:8080/home",
      fpt: 234,
      ready: 2222,
      tti: 111,
      load: 890
    },
    {
      pageURL: "http:www.mickey.cn:8080/home",
      fpt: 234,
      ready: 2222,
      tti: 111,
      load: 890
    },
    {
      pageURL: "http:www.mickey.cn:8080/home",
      fpt: 234,
      ready: 2222,
      tti: 111,
      load: 890
    },
    {
      pageURL: "http:www.mickey.cn:8080/home",
      fpt: 234,
      ready: 2222,
      tti: 111,
      load: 890
    },
    {
      pageURL: "http:www.mickey.cn:8080/home",
      fpt: 234,
      ready: 2222,
      tti: 111,
      load: 890
    },
    {
      pageURL: "http:www.mickey.cn:8080/home",
      fpt: 234,
      ready: 2222,
      tti: 111,
      load: 890
    }
  ]
})

Mock.mock('/data/pageList?dimensionType=1',{
  success:true,
  result:[]
})




Mock.mock('/data/interValDataByPage?dimensionType=0&pageURL=http:www.mickey.cn:8080/home',{
  success:true,
  result:[
    {
      time: "2020-02-10T09:02:00.000Z",
      redirect: 33120,
      dns: 343,
      tcp: 3345,
      ssl: 4456,
      ttfb:321,
      trans:234,
      dom:123,
      resource:1211
    },
    {
      time: "2020-02-10T09:08:00.000Z",
      redirect: 120,
      dns: 343,
      tcp: 3345,
      ssl: 4456,
      ttfb:321,
      trans:234,
      dom:123,
      resource:1211
    },
    {
      time: "2020-02-10T09:12:00.000Z",
      redirect: 120,
      dns: 343,
      tcp: 3345,
      ssl: 4456,
      ttfb:321,
      trans:234,
      dom:123,
      resource:1211
    },
    {
      time: "2020-02-10T09:05:00.000Z",
      redirect: 120,
      dns: 343,
      tcp: 3345,
      ssl: 4456,
      ttfb:321,
      trans:234,
      dom:123,
      resource:1211
    },
    {
      time: "2020-02-19T09:06:00.000Z",
      redirect: 120,
      dns: 343,
      tcp: 3345,
      ssl: 4456,
      ttfb:321,
      trans:234,
      dom:123,
      resource:1211
    },
    {
      time: "2020-02-10T09:13:00.000Z",
      redirect: 120,
      dns: 343,
      tcp: 3345,
      ssl: 4456,
      ttfb:321,
      trans:234,
      dom:123,
      resource:1211
    },
    {
      time: "2020-02-10T09:24:00.000Z",
      redirect: 120,
      dns: 343,
      tcp: 3345,
      ssl: 4456,
      ttfb:321,
      trans:234,
      dom:123,
      resource:1211
    },
    {
      time: "2020-02-10T09:34:00.000Z",
      redirect: 120,
      dns: 343,
      tcp: 3345,
      ssl: 4456,
      ttfb:321,
      trans:234,
      dom:123,
      resource:1211
    }
  ]
})


Mock.mock('/data/interValDataByPage?dimensionType=0&pageURL=http:www.mickey.cn:8080/user',{
  success:true,
  result:[
    {
      time: "2020-02-10T09:02:00.000Z",
      redirect: 1200,
      dns: 343,
      tcp: 3345,
      ssl: 4456,
      ttfb:321,
      trans:234,
      dom:123,
      resource:121100
    },
    {
      time: "2020-02-10T09:08:00.000Z",
      redirect: 120,
      dns: 343,
      tcp: 3345,
      ssl: 4456,
      ttfb:321,
      trans:234,
      dom:123,
      resource:1211
    },
    {
      time: "2020-02-10T09:12:00.000Z",
      redirect: 120,
      dns: 343,
      tcp: 3345,
      ssl: 456,
      ttfb:321,
      trans:234,
      dom:123,
      resource:1211
    },
    {
      time: "2020-02-10T09:05:00.000Z",
      redirect: 120,
      dns: 343,
      tcp: 3345,
      ssl: 4456,
      ttfb:321,
      trans:234,
      dom:123,
      resource:1211
    },
    {
      time: "2020-02-19T09:06:00.000Z",
      redirect: 120,
      dns: 343,
      tcp: 3345,
      ssl: 4456,
      ttfb:321,
      trans:234,
      dom:123,
      resource:1211
    },
    {
      time: "2020-02-10T09:13:00.000Z",
      redirect: 120,
      dns: 343,
      tcp: 3345,
      ssl: 4456,
      ttfb:321,
      trans:234,
      dom:123,
      resource:1211
    },
    {
      time: "2020-02-10T09:24:00.000Z",
      redirect: 120,
      dns: 343,
      tcp: 3345,
      ssl: 4456,
      ttfb:321,
      trans:234,
      dom:123,
      resource:121100
    },
    {
      time: "2020-02-10T09:34:00.000Z",
      redirect: 120,
      dns: 343,
      tcp: 3345,
      ssl: 4456,
      ttfb:321,
      trans:234,
      dom:123,
      resource:121100
    }
  ]
})
Mock.mock('/data/interValDataByPage?dimensionType=1&pageURL=http:www.mickey.cn:8080/user',{
  success:true,
  result:[
    {
      time: "2020-02-10T09:02:00.000Z",
      redirect: 1200,
      dns: 343,
      tcp: 3345,
      ssl: 4456,
      ttfb:321,
      trans:234,
      dom:123,
      resource:1211
    },
    {
      time: "2020-02-10T09:08:00.000Z",
      redirect: 120,
      dns: 343,
      tcp: 3345,
      ssl: 4456,
      ttfb:321,
      trans:234,
      dom:123,
      resource:1211
    },
    {
      time: "2020-02-10T09:12:00.000Z",
      redirect: 120,
      dns: 343,
      tcp: 3345,
      ssl: 456,
      ttfb:321,
      trans:234,
      dom:123,
      resource:1211
    },
    {
      time: "2020-02-10T09:05:00.000Z",
      redirect: 120,
      dns: 343,
      tcp: 3345,
      ssl: 4456,
      ttfb:321,
      trans:234,
      dom:123,
      resource:1211
    },
    {
      time: "2020-02-19T09:06:00.000Z",
      redirect: 120,
      dns: 343,
      tcp: 3345,
      ssl: 4456,
      ttfb:321,
      trans:234,
      dom:123,
      resource:1211
    },
    {
      time: "2020-02-10T09:13:00.000Z",
      redirect: 120,
      dns: 343,
      tcp: 3345,
      ssl: 4456,
      ttfb:321,
      trans:234,
      dom:123,
      resource:1211
    },
    {
      time: "2020-02-10T09:24:00.000Z",
      redirect: 120,
      dns: 343,
      tcp: 3345,
      ssl: 4456,
      ttfb:321,
      trans:234,
      dom:123,
      resource:121100
    },
    {
      time: "2020-02-10T09:34:00.000Z",
      redirect: 120,
      dns: 343,
      tcp: 3345,
      ssl: 4456,
      ttfb:321,
      trans:234,
      dom:123,
      resource:121100
    }
  ]
})

Mock.mock('/data/allApiURL?dimensionType=0',{
  success:true,
  result:[
    {apiURL:'http://fsdfsdf/fsdfsdfsdf',request:34,duration:2131},
    {apiURL:'http://fsdfsdf/fsdfsdfsdf',request:34,duration:2131},
    {apiURL:'http://fsdfsdf/fsdfsdfsdf',request:34,duration:2131},
    {apiURL:'http://fsdfsdf/fsdfsdfsdf',request:34,duration:2131},
    {apiURL:'http://fsdfsdf/fsdfsdfsdf',request:34,duration:2131},
    {apiURL:'http://fsdfsdf/fsdfsdfsdf',request:34,duration:2131},
    {apiURL:'http://fsdfsdf/fsdfsdfsdf',request:34,duration:2131},
    {apiURL:'http://fsdfsdf/fsdfsdfsdf',request:34,duration:2131},
    {apiURL:'http://fsdfsdf/fsdfsdfsdf',request:34,duration:2131},
    {apiURL:'http://fsdfsdf/fsdfsdfsdf',request:34,duration:2131},
    {apiURL:'http://fsdfsdf/fsdfsdfsdf',request:34,duration:2131},
  ]
})
Mock.mock('/data/failApiURL?dimensionType=0',{
  success:true,
  result:[
    {apiURL:'http://fsdfsdf/fsdfsdfsdf',fail:34,duration:2131},
    {apiURL:'http://fsdfsdf/fsdfsdfsdf',fail:34,duration:2131},
    {apiURL:'http://fsdfsdf/fsdfsdfsdf',fail:34,duration:2131},
    {apiURL:'http://fsdfsdf/fsdfsdfsdf',fail:34,duration:2131},
    {apiURL:'http://fsdfsdf/fsdfsdfsdf',fail:34,duration:2131},
    {apiURL:'http://fsdfsdf/fsdfsdfsdf',fail:34,duration:2131},
    {apiURL:'http://fsdfsdf/fsdfsdfsdf',fail:34,duration:2131},
    {apiURL:'http://fsdfsdf/fsdfsdfsdf',fail:34,duration:2131},
    {apiURL:'http://fsdfsdf/fsdfsdfsdf',fail:34,duration:2131},
  ]
})

Mock.mock('/data/reqSuccess?dimensionType=0',{
  success:true,
  result:[
    {time:'2020-02-18T09:06:00.000Z',success:123,fail:130,successDuration:134,failDuration:99,request:124},
    {time:'2020-02-18T09:07:00.000Z',success:175,fail:230,successDuration:234,failDuration:199,request:183},
    {time:'2020-02-18T09:08:00.000Z',success:143,fail:130,successDuration:434,failDuration:69,request:152},
    {time:'2020-02-18T09:09:00.000Z',success:155,fail:330,successDuration:234,failDuration:899,request:163},
    {time:'2020-02-18T09:10:00.000Z',success:163,fail:430,successDuration:434,failDuration:999,request:172},
    {time:'2020-02-18T09:11:00.000Z',success:175,fail:530,successDuration:234,failDuration:899,request:183},
    {time:'2020-02-18T09:12:00.000Z',success:123,fail:630,successDuration:734,failDuration:899,request:126},
    {time:'2020-02-18T09:13:00.000Z',success:145,fail:730,successDuration:1234,failDuration:399,request:223},
    {time:'2020-02-18T09:14:00.000Z',success:423,fail:830,successDuration:1234,failDuration:899,request:512},
    {time:'2020-02-18T09:15:00.000Z',success:625,fail:930,successDuration:1234,failDuration:199,request:723},
    {time:'2020-02-18T09:16:00.000Z',success:623,fail:1030,successDuration:1234,failDuration:899,request:712},
    {time:'2020-02-18T09:17:00.000Z',success:725,fail:930,successDuration:1234,failDuration:299,request:823},
    {time:'2020-02-18T09:18:00.000Z',success:223,fail:230,successDuration:1234,failDuration:899,request:312},
    {time:'2020-02-18T09:19:00.000Z',success:825,fail:330,successDuration:1254,failDuration:899,request:923},
    {time:'2020-02-18T09:20:00.000Z',success:423,fail:430,successDuration:1234,failDuration:899,request:512},
    {time:'2020-02-18T09:21:00.000Z',success:925,fail:230,successDuration:134,failDuration:199,request:1023},
    {time:'2020-02-18T09:22:00.000Z',success:623,fail:130,successDuration:1234,failDuration:299,request:712},
    {time:'2020-02-18T09:23:00.000Z',success:725,fail:530,successDuration:234,failDuration:99,request:823},
    {time:'2020-02-18T09:24:00.000Z',success:223,fail:730,successDuration:1234,failDuration:399,request:312},
    {time:'2020-02-18T09:25:00.000Z',success:825,fail:830,successDuration:234,failDuration:299,request:923},
    {time:'2020-02-18T09:26:00.000Z',success:423,fail:430,successDuration:1234,failDuration:499,request:512},
    {time:'2020-02-18T09:27:00.000Z',success:925,fail:230,successDuration:1234,failDuration:599,request:1023},
    {time:'2020-02-18T09:28:00.000Z',success:223,fail:630,successDuration:234,failDuration:699,request:312},
    {time:'2020-02-18T09:29:00.000Z',success:825,fail:530,successDuration:434,failDuration:199,request:923},
    {time:'2020-02-18T09:30:00.000Z',success:423,fail:730,successDuration:1234,failDuration:799,request:512},
    {time:'2020-02-18T09:31:00.000Z',success:925,fail:830,successDuration:1234,failDuration:199,request:1023},
    {time:'2020-02-18T09:32:00.000Z',success:623,fail:330,successDuration:1234,failDuration:899,request:712},
    {time:'2020-02-18T09:33:00.000Z',success:725,fail:330,successDuration:634,failDuration:299,request:823},
    {time:'2020-02-18T09:34:00.000Z',success:223,fail:530,successDuration:1234,failDuration:499,request:312},
    {time:'2020-02-18T09:35:00.000Z',success:825,fail:430,successDuration:1234,failDuration:599,request:923},
    {time:'2020-02-18T09:36:00.000Z',success:423,fail:130,successDuration:734,failDuration:299,request:512},
    {time:'2020-02-18T09:37:00.000Z',success:925,fail:230,successDuration:1234,failDuration:699,request:1023},
    {time:'2020-02-18T09:39:00.000Z',success:825,fail:330,successDuration:1234,failDuration:799,request:923},
    {time:'2020-02-18T09:40:00.000Z',success:423,fail:430,successDuration:834,failDuration:899,request:512},
    {time:'2020-02-18T09:41:00.000Z',success:925,fail:430,successDuration:1234,failDuration:899,request:1023},
    {time:'2020-02-18T09:42:00.000Z',success:623,fail:130,successDuration:1234,failDuration:499,request:712},
    {time:'2020-02-18T09:43:00.000Z',success:725,fail:630,successDuration:1234,failDuration:899,request:823},
    {time:'2020-02-18T09:44:00.000Z',success:223,fail:530,successDuration:934,failDuration:599,request:312},
    {time:'2020-02-18T09:45:00.000Z',success:825,fail:730,successDuration:1234,failDuration:899,request:923},
    {time:'2020-02-18T09:46:00.000Z',success:423,fail:830,successDuration:134,failDuration:699,request:512},
    {time:'2020-02-18T09:47:00.000Z',success:925,fail:930,successDuration:1234,failDuration:899,request:1023},
]
})
Mock.mock('/data/reqSuccess?dimensionType=1',{
  success:true,
  result:[]
})
Mock.mock('/data/reqFailDuration?dimensionType=0',{
  success:true,
  result:[
    {time:'2020-02-18T09:06:00.000Z',success:123,fail:130,successDuration:134,failDuration:99,request:124},
    {time:'2020-02-18T09:07:00.000Z',success:175,fail:230,successDuration:234,failDuration:199,request:183},
    {time:'2020-02-18T09:08:00.000Z',success:143,fail:130,successDuration:434,failDuration:69,request:152},
    {time:'2020-02-18T09:09:00.000Z',success:155,fail:330,successDuration:234,failDuration:899,request:163},
    {time:'2020-02-18T09:10:00.000Z',success:163,fail:430,successDuration:434,failDuration:999,request:172},
    {time:'2020-02-18T09:11:00.000Z',success:175,fail:530,successDuration:234,failDuration:899,request:183},
    {time:'2020-02-18T09:12:00.000Z',success:123,fail:630,successDuration:734,failDuration:899,request:126},
    {time:'2020-02-18T09:13:00.000Z',success:145,fail:730,successDuration:1234,failDuration:399,request:223},
    {time:'2020-02-18T09:14:00.000Z',success:423,fail:830,successDuration:1234,failDuration:899,request:512},
    {time:'2020-02-18T09:15:00.000Z',success:625,fail:930,successDuration:1234,failDuration:199,request:723},
    {time:'2020-02-18T09:16:00.000Z',success:623,fail:1030,successDuration:1234,failDuration:899,request:712},
    {time:'2020-02-18T09:17:00.000Z',success:725,fail:930,successDuration:1234,failDuration:299,request:823},
    {time:'2020-02-18T09:18:00.000Z',success:223,fail:230,successDuration:1234,failDuration:899,request:312},
    {time:'2020-02-18T09:19:00.000Z',success:825,fail:330,successDuration:1254,failDuration:899,request:923},
    {time:'2020-02-18T09:20:00.000Z',success:423,fail:430,successDuration:1234,failDuration:899,request:512},
    {time:'2020-02-18T09:21:00.000Z',success:925,fail:230,successDuration:134,failDuration:199,request:1023},
    {time:'2020-02-18T09:22:00.000Z',success:623,fail:130,successDuration:1234,failDuration:299,request:712},
    {time:'2020-02-18T09:23:00.000Z',success:725,fail:530,successDuration:234,failDuration:99,request:823},
    {time:'2020-02-18T09:24:00.000Z',success:223,fail:730,successDuration:1234,failDuration:399,request:312},
    {time:'2020-02-18T09:25:00.000Z',success:825,fail:830,successDuration:234,failDuration:299,request:923},
    {time:'2020-02-18T09:26:00.000Z',success:423,fail:430,successDuration:1234,failDuration:499,request:512},
    {time:'2020-02-18T09:27:00.000Z',success:925,fail:230,successDuration:1234,failDuration:599,request:1023},
    {time:'2020-02-18T09:28:00.000Z',success:223,fail:630,successDuration:234,failDuration:699,request:312},
    {time:'2020-02-18T09:29:00.000Z',success:825,fail:530,successDuration:434,failDuration:199,request:923},
    {time:'2020-02-18T09:30:00.000Z',success:423,fail:730,successDuration:1234,failDuration:799,request:512},
    {time:'2020-02-18T09:31:00.000Z',success:925,fail:830,successDuration:1234,failDuration:199,request:1023},
    {time:'2020-02-18T09:32:00.000Z',success:623,fail:330,successDuration:1234,failDuration:899,request:712},
    {time:'2020-02-18T09:33:00.000Z',success:725,fail:330,successDuration:634,failDuration:299,request:823},
    {time:'2020-02-18T09:34:00.000Z',success:223,fail:530,successDuration:1234,failDuration:499,request:312},
    {time:'2020-02-18T09:35:00.000Z',success:825,fail:430,successDuration:1234,failDuration:599,request:923},
    {time:'2020-02-18T09:36:00.000Z',success:423,fail:130,successDuration:734,failDuration:299,request:512},
    {time:'2020-02-18T09:37:00.000Z',success:925,fail:230,successDuration:1234,failDuration:699,request:1023},
    {time:'2020-02-18T09:39:00.000Z',success:825,fail:330,successDuration:1234,failDuration:799,request:923},
    {time:'2020-02-18T09:40:00.000Z',success:423,fail:430,successDuration:834,failDuration:899,request:512},
    {time:'2020-02-18T09:41:00.000Z',success:925,fail:430,successDuration:1234,failDuration:899,request:1023},
    {time:'2020-02-18T09:42:00.000Z',success:623,fail:130,successDuration:1234,failDuration:499,request:712},
    {time:'2020-02-18T09:43:00.000Z',success:725,fail:630,successDuration:1234,failDuration:899,request:823},
    {time:'2020-02-18T09:44:00.000Z',success:223,fail:530,successDuration:934,failDuration:599,request:312},
    {time:'2020-02-18T09:45:00.000Z',success:825,fail:730,successDuration:1234,failDuration:899,request:923},
    {time:'2020-02-18T09:46:00.000Z',success:423,fail:830,successDuration:134,failDuration:699,request:512},
    {time:'2020-02-18T09:47:00.000Z',success:925,fail:930,successDuration:1234,failDuration:899,request:1023},
]
})

Mock.mock('/data/reqFailDuration?dimensionType=1',{
  success:true,
  result:[
    {time:'2020-02-18T09:06:00.000Z',success:123,fail:130,successDuration:134,failDuration:99,request:124},
    {time:'2020-02-18T09:07:00.000Z',success:175,fail:230,successDuration:234,failDuration:199,request:183},
    {time:'2020-02-18T09:08:00.000Z',success:143,fail:130,successDuration:434,failDuration:69,request:152},
    {time:'2020-02-18T09:09:00.000Z',success:155,fail:330,successDuration:234,failDuration:899,request:163},
    {time:'2020-02-18T09:10:00.000Z',success:163,fail:430,successDuration:434,failDuration:999,request:172},
    {time:'2020-02-18T09:11:00.000Z',success:175,fail:530,successDuration:234,failDuration:899,request:183},
    {time:'2020-02-18T09:12:00.000Z',success:123,fail:630,successDuration:734,failDuration:899,request:126},
    {time:'2020-02-18T09:13:00.000Z',success:145,fail:730,successDuration:1234,failDuration:399,request:223},
    {time:'2020-02-18T09:14:00.000Z',success:423,fail:830,successDuration:1234,failDuration:899,request:512},
    {time:'2020-02-18T09:15:00.000Z',success:625,fail:930,successDuration:1234,failDuration:199,request:723},
    {time:'2020-02-18T09:16:00.000Z',success:623,fail:1030,successDuration:1234,failDuration:899,request:712},
    {time:'2020-02-18T09:17:00.000Z',success:725,fail:930,successDuration:1234,failDuration:299,request:823},
    {time:'2020-02-18T09:18:00.000Z',success:223,fail:230,successDuration:1234,failDuration:899,request:312},
    {time:'2020-02-18T09:19:00.000Z',success:825,fail:330,successDuration:1254,failDuration:899,request:923},
    {time:'2020-02-18T09:20:00.000Z',success:423,fail:430,successDuration:1234,failDuration:899,request:512},
    {time:'2020-02-18T09:21:00.000Z',success:925,fail:230,successDuration:134,failDuration:199,request:1023},
    {time:'2020-02-18T09:22:00.000Z',success:623,fail:130,successDuration:1234,failDuration:299,request:712},
    {time:'2020-02-18T09:23:00.000Z',success:725,fail:530,successDuration:234,failDuration:99,request:823},
    {time:'2020-02-18T09:24:00.000Z',success:223,fail:730,successDuration:1234,failDuration:399,request:312},
    {time:'2020-02-18T09:25:00.000Z',success:825,fail:830,successDuration:234,failDuration:299,request:923},
    {time:'2020-02-18T09:26:00.000Z',success:423,fail:430,successDuration:1234,failDuration:499,request:512},
    {time:'2020-02-18T09:27:00.000Z',success:925,fail:230,successDuration:1234,failDuration:599,request:1023},
    {time:'2020-02-18T09:28:00.000Z',success:223,fail:630,successDuration:234,failDuration:699,request:312},
    {time:'2020-02-18T09:29:00.000Z',success:825,fail:530,successDuration:434,failDuration:199,request:923},
    {time:'2020-02-18T09:30:00.000Z',success:423,fail:730,successDuration:1234,failDuration:799,request:512},
    {time:'2020-02-18T09:31:00.000Z',success:925,fail:830,successDuration:1234,failDuration:199,request:1023},
    {time:'2020-02-18T09:32:00.000Z',success:623,fail:330,successDuration:1234,failDuration:899,request:712},
    {time:'2020-02-18T09:33:00.000Z',success:725,fail:330,successDuration:634,failDuration:299,request:823},
    {time:'2020-02-18T09:34:00.000Z',success:223,fail:530,successDuration:1234,failDuration:499,request:312},
    {time:'2020-02-18T09:35:00.000Z',success:825,fail:430,successDuration:1234,failDuration:599,request:923},
    {time:'2020-02-18T09:36:00.000Z',success:423,fail:130,successDuration:734,failDuration:299,request:512},
    {time:'2020-02-18T09:37:00.000Z',success:925,fail:230,successDuration:1234,failDuration:699,request:1023},
    {time:'2020-02-18T09:39:00.000Z',success:825,fail:330,successDuration:1234,failDuration:799,request:923},
    {time:'2020-02-18T09:40:00.000Z',success:423,fail:430,successDuration:834,failDuration:899,request:512},
    {time:'2020-02-18T09:41:00.000Z',success:925,fail:430,successDuration:1234,failDuration:899,request:1023},
    {time:'2020-02-18T09:42:00.000Z',success:623,fail:130,successDuration:1234,failDuration:499,request:712},
    {time:'2020-02-18T09:43:00.000Z',success:725,fail:630,successDuration:1234,failDuration:899,request:823},
    {time:'2020-02-18T09:44:00.000Z',success:223,fail:530,successDuration:934,failDuration:599,request:312},
    {time:'2020-02-18T09:45:00.000Z',success:825,fail:730,successDuration:1234,failDuration:899,request:923},
    {time:'2020-02-18T09:46:00.000Z',success:423,fail:830,successDuration:134,failDuration:699,request:512},
    {time:'2020-02-18T09:47:00.000Z',success:925,fail:930,successDuration:1234,failDuration:899,request:1023},
  ]
})

Mock.mock('/data/reqSuccessDuration?dimensionType=0',{
  success:true,
  result:[
    {time:'2020-02-18T09:06:00.000Z',success:123,fail:130,successDuration:134,failDuration:99,request:124},
    {time:'2020-02-18T09:07:00.000Z',success:175,fail:230,successDuration:234,failDuration:199,request:183},
    {time:'2020-02-18T09:08:00.000Z',success:143,fail:130,successDuration:434,failDuration:69,request:152},
    {time:'2020-02-18T09:09:00.000Z',success:155,fail:330,successDuration:234,failDuration:899,request:163},
    {time:'2020-02-18T09:10:00.000Z',success:163,fail:430,successDuration:434,failDuration:999,request:172},
    {time:'2020-02-18T09:11:00.000Z',success:175,fail:530,successDuration:234,failDuration:899,request:183},
    {time:'2020-02-18T09:12:00.000Z',success:123,fail:630,successDuration:734,failDuration:899,request:126},
    {time:'2020-02-18T09:13:00.000Z',success:145,fail:730,successDuration:1234,failDuration:399,request:223},
    {time:'2020-02-18T09:14:00.000Z',success:423,fail:830,successDuration:1234,failDuration:899,request:512},
    {time:'2020-02-18T09:15:00.000Z',success:625,fail:930,successDuration:1234,failDuration:199,request:723},
    {time:'2020-02-18T09:16:00.000Z',success:623,fail:1030,successDuration:1234,failDuration:899,request:712},
    {time:'2020-02-18T09:17:00.000Z',success:725,fail:930,successDuration:1234,failDuration:299,request:823},
    {time:'2020-02-18T09:18:00.000Z',success:223,fail:230,successDuration:1234,failDuration:899,request:312},
    {time:'2020-02-18T09:19:00.000Z',success:825,fail:330,successDuration:1254,failDuration:899,request:923},
    {time:'2020-02-18T09:20:00.000Z',success:423,fail:430,successDuration:1234,failDuration:899,request:512},
    {time:'2020-02-18T09:21:00.000Z',success:925,fail:230,successDuration:134,failDuration:199,request:1023},
    {time:'2020-02-18T09:22:00.000Z',success:623,fail:130,successDuration:1234,failDuration:299,request:712},
    {time:'2020-02-18T09:23:00.000Z',success:725,fail:530,successDuration:234,failDuration:99,request:823},
    {time:'2020-02-18T09:24:00.000Z',success:223,fail:730,successDuration:1234,failDuration:399,request:312},
    {time:'2020-02-18T09:25:00.000Z',success:825,fail:830,successDuration:234,failDuration:299,request:923},
    {time:'2020-02-18T09:26:00.000Z',success:423,fail:430,successDuration:1234,failDuration:499,request:512},
    {time:'2020-02-18T09:27:00.000Z',success:925,fail:230,successDuration:1234,failDuration:599,request:1023},
    {time:'2020-02-18T09:28:00.000Z',success:223,fail:630,successDuration:234,failDuration:699,request:312},
    {time:'2020-02-18T09:29:00.000Z',success:825,fail:530,successDuration:434,failDuration:199,request:923},
    {time:'2020-02-18T09:30:00.000Z',success:423,fail:730,successDuration:1234,failDuration:799,request:512},
    {time:'2020-02-18T09:31:00.000Z',success:925,fail:830,successDuration:1234,failDuration:199,request:1023},
    {time:'2020-02-18T09:32:00.000Z',success:623,fail:330,successDuration:1234,failDuration:899,request:712},
    {time:'2020-02-18T09:33:00.000Z',success:725,fail:330,successDuration:634,failDuration:299,request:823},
    {time:'2020-02-18T09:34:00.000Z',success:223,fail:530,successDuration:1234,failDuration:499,request:312},
    {time:'2020-02-18T09:35:00.000Z',success:825,fail:430,successDuration:1234,failDuration:599,request:923},
    {time:'2020-02-18T09:36:00.000Z',success:423,fail:130,successDuration:734,failDuration:299,request:512},
    {time:'2020-02-18T09:37:00.000Z',success:925,fail:230,successDuration:1234,failDuration:699,request:1023},
    {time:'2020-02-18T09:39:00.000Z',success:825,fail:330,successDuration:1234,failDuration:799,request:923},
    {time:'2020-02-18T09:40:00.000Z',success:423,fail:430,successDuration:834,failDuration:899,request:512},
    {time:'2020-02-18T09:41:00.000Z',success:925,fail:430,successDuration:1234,failDuration:899,request:1023},
    {time:'2020-02-18T09:42:00.000Z',success:623,fail:130,successDuration:1234,failDuration:499,request:712},
    {time:'2020-02-18T09:43:00.000Z',success:725,fail:630,successDuration:1234,failDuration:899,request:823},
    {time:'2020-02-18T09:44:00.000Z',success:223,fail:530,successDuration:934,failDuration:599,request:312},
    {time:'2020-02-18T09:45:00.000Z',success:825,fail:730,successDuration:1234,failDuration:899,request:923},
    {time:'2020-02-18T09:46:00.000Z',success:423,fail:830,successDuration:134,failDuration:699,request:512},
    {time:'2020-02-18T09:47:00.000Z',success:925,fail:930,successDuration:1234,failDuration:899,request:1023},
]
})
Mock.mock('/data/reqSuccessDuration?dimensionType=2',{
  success:true,
  result:[
    {time:'2020-02-18T09:06:00.000Z',success:123,fail:130,successDuration:1134,failDuration:99,request:124},
    {time:'2020-02-18T09:07:00.000Z',success:175,fail:230,successDuration:234,failDuration:199,request:183},
    {time:'2020-02-18T09:08:00.000Z',success:143,fail:130,successDuration:434,failDuration:69,request:152},
    {time:'2020-02-18T09:09:00.000Z',success:155,fail:330,successDuration:234,failDuration:899,request:163},
    {time:'2020-02-18T09:10:00.000Z',success:163,fail:430,successDuration:434,failDuration:999,request:172},
    {time:'2020-02-18T09:11:00.000Z',success:175,fail:530,successDuration:234,failDuration:899,request:183},
    {time:'2020-02-18T09:12:00.000Z',success:123,fail:630,successDuration:734,failDuration:899,request:126},
    {time:'2020-02-18T09:13:00.000Z',success:145,fail:730,successDuration:1234,failDuration:399,request:223},
    {time:'2020-02-18T09:14:00.000Z',success:423,fail:830,successDuration:1234,failDuration:899,request:512},
    {time:'2020-02-18T09:15:00.000Z',success:625,fail:930,successDuration:1234,failDuration:199,request:723},
    {time:'2020-02-18T09:16:00.000Z',success:623,fail:1030,successDuration:1234,failDuration:899,request:712},
    {time:'2020-02-18T09:17:00.000Z',success:725,fail:930,successDuration:1234,failDuration:299,request:823},
    {time:'2020-02-18T09:18:00.000Z',success:223,fail:230,successDuration:1234,failDuration:899,request:312},
    {time:'2020-02-18T09:19:00.000Z',success:825,fail:330,successDuration:1254,failDuration:899,request:923},
    {time:'2020-02-18T09:20:00.000Z',success:423,fail:430,successDuration:1234,failDuration:899,request:512},
    {time:'2020-02-18T09:21:00.000Z',success:925,fail:230,successDuration:134,failDuration:199,request:1023},
    {time:'2020-02-18T09:22:00.000Z',success:623,fail:130,successDuration:1234,failDuration:299,request:712},
    {time:'2020-02-18T09:23:00.000Z',success:725,fail:530,successDuration:234,failDuration:99,request:823},
    {time:'2020-02-18T09:24:00.000Z',success:223,fail:730,successDuration:1234,failDuration:399,request:312},
    {time:'2020-02-18T09:25:00.000Z',success:825,fail:830,successDuration:234,failDuration:299,request:923},
    {time:'2020-02-18T09:26:00.000Z',success:423,fail:430,successDuration:1234,failDuration:499,request:512},
    {time:'2020-02-18T09:27:00.000Z',success:925,fail:230,successDuration:1234,failDuration:599,request:1023},
    {time:'2020-02-18T09:28:00.000Z',success:223,fail:630,successDuration:234,failDuration:699,request:312},
    {time:'2020-02-18T09:29:00.000Z',success:825,fail:530,successDuration:434,failDuration:199,request:923},
    {time:'2020-02-18T09:30:00.000Z',success:423,fail:730,successDuration:1234,failDuration:799,request:512},
    {time:'2020-02-18T09:31:00.000Z',success:925,fail:830,successDuration:1234,failDuration:199,request:1023},
    {time:'2020-02-18T09:32:00.000Z',success:623,fail:330,successDuration:1234,failDuration:899,request:712},
    {time:'2020-02-18T09:33:00.000Z',success:725,fail:330,successDuration:634,failDuration:299,request:823},
    {time:'2020-02-18T09:34:00.000Z',success:223,fail:530,successDuration:1234,failDuration:499,request:312},
    {time:'2020-02-18T09:35:00.000Z',success:825,fail:430,successDuration:1234,failDuration:599,request:923},
    {time:'2020-02-18T09:36:00.000Z',success:423,fail:130,successDuration:734,failDuration:299,request:512},
    {time:'2020-02-18T09:37:00.000Z',success:925,fail:230,successDuration:1234,failDuration:699,request:1023},
    {time:'2020-02-18T09:39:00.000Z',success:825,fail:330,successDuration:1234,failDuration:799,request:923},
    {time:'2020-02-18T09:40:00.000Z',success:423,fail:430,successDuration:834,failDuration:899,request:512},
    {time:'2020-02-18T09:41:00.000Z',success:925,fail:430,successDuration:1234,failDuration:899,request:1023},
    {time:'2020-02-18T09:42:00.000Z',success:623,fail:130,successDuration:1234,failDuration:499,request:712},
    {time:'2020-02-18T09:43:00.000Z',success:725,fail:630,successDuration:1234,failDuration:899,request:823},
    {time:'2020-02-18T09:44:00.000Z',success:223,fail:530,successDuration:934,failDuration:599,request:312},
    {time:'2020-02-18T09:45:00.000Z',success:825,fail:730,successDuration:1234,failDuration:899,request:923},
    {time:'2020-02-18T09:46:00.000Z',success:423,fail:830,successDuration:134,failDuration:699,request:512},
    {time:'2020-02-18T09:47:00.000Z',success:925,fail:930,successDuration:1234,failDuration:899,request:1023},
]
})
Mock.mock('/data/reqSuccessDuration?dimensionType=1',{
  success:true,
  result:[]
})
Mock.mock('/data/resTypeInfo',{
  success:true,
  result:{
    fileSize:{
       title:"各类型资源文件大小",
       content:[
        {type:'CSS',value:51},
        {type:'XHR',value:41},
        {type:'JS',value:31},
        {type:'IMG',value:12},
        {type:'Other',value:21},
    ]
    },
    resDuration:{
      title:"各类型资源平均耗时",
       content:[
        {type:'css',value:51},
        {type:'xhr',value:41},
        {type:'js',value:31},
        {type:'img',value:12},
        {type:'other',value:21},
    ]
    },
    resNum:{
      title:"各类型资源请求数目",
       content:[
        {type:'css',value:51},
        {type:'xhr',value:41},
        {type:'js',value:31},
        {type:'img',value:12},
        {type:'other',value:21},
    ]
    }
  }
})


Mock.mock('/data/todayGeneral',{
    success:true,
    note:'数据返回成功',
    result:[
        { title: "pv", today: 1244, yesterday: 223},
        { title: "uv", today: 9244, yesterday: 92443},
        { title: "load", today: 244, yesterday: 223},
        { title: "api", today: 244, yesterday: 244}
    ]
})

Mock.mock('/data/per',{
    success:true,
    note:'数据返回成功',
    result:[
        { title: "fpt", today: 224},
        { title: "ready", today: 244},
        { title: "tti", today: 244},
        { title: "load", today: 1244}
    ]
})

Mock.mock('/data/api',{
    success:true,
    note:'数据返回成功',
    result:[
        { title: "apiTotal", today: 244, yesterday: 223},
        { title: "apiSuccess", today: 244, yesterday: 2443},
        { title: "apiFailed", today: 244, yesterday: 223},
        { title: "apiDuration", today: 244, yesterday: 244}
    ]
})
