import Mock from 'mockjs'
Mock.setup({
    timeout:'100'
})
Mock.mock('/data/pageTop?dimensionType=0',{
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
          pageURL: "http:www.mickey.cn:8080/home",
          pv:34,
          uv:23
        },
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
        { time: "2020-02-18T09:06:00.000Z", value: 15 },
        { time: "2020-02-19T09:07:00.000Z", value: 13 },
        { time: "2020-02-19T09:08:00.000Z", value: 10 },
        { time: "2020-02-19T09:23:00.000Z", value: 14 },
        { time: "2020-02-19T09:20:00.000Z", value: 2 },
        { time: "2020-02-19T09:06:00.000Z", value: 18 },
        { time: "2020-02-19T09:34:00.000Z", value: 19 },
        { time: "2020-02-20T09:12:00.000Z", value: 22 },
        { time: "2020-02-19T09:45:00.000Z", value: 13 },
        { time: "2020-02-19T09:11:00.000Z", value: 11 },
        { time: "2020-02-19T09:09:00.000Z", value: 31 },
        { time: "2020-02-19T09:12:00.000Z", value: 32 },
        { time: "2020-02-19T09:45:00.000Z", value: 23 },
        { time: "2020-02-19T09:56:00.000Z", value: 11 },
        { time: "2020-02-21T09:59:00.000Z", value: 3 }
      ]
})
Mock.mock("/data/uvDataByDivider?dimensionType=1",{
  success:true,
  note:"数据返回成功",
  result:[
      { time: "2020-02-18T09:06:00.000Z", value: 25 },
      { time: "2020-02-19T09:07:00.000Z", value: 13 },
      { time: "2020-02-19T09:08:00.000Z", value: 10 },
      { time: "2020-02-19T09:23:00.000Z", value: 14 },
      { time: "2020-02-19T09:20:00.000Z", value: 2 },
      { time: "2020-02-19T09:06:00.000Z", value: 18 },
      { time: "2020-02-19T09:34:00.000Z", value: 19 },
      { time: "2020-02-20T09:12:00.000Z", value: 2 },
      { time: "2020-02-19T09:45:00.000Z", value: 13 },
      { time: "2020-02-19T09:11:00.000Z", value: 11 },
      { time: "2020-02-19T09:09:00.000Z", value: 31 },
      { time: "2020-02-19T09:12:00.000Z", value: 32 },
      { time: "2020-02-19T09:45:00.000Z", value: 23 },
      { time: "2020-02-19T09:56:00.000Z", value: 11 },
      { time: "2020-02-21T09:59:00.000Z", value: 33 }
    ]
})
Mock.mock('/data/geoDataByDivider?dimensionType=0',{
  success:true,
  note:"数据返回成功",
  result:[
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

Mock.mock('/data/bsDataByDivider?dimensionType=0',{
  success:true,
  result:[
    { type: "Chrome", count: 123 },
    { type: "FireFox", count: 124 },
    { type: "Safari", count: 134 },
    { type: "IE", count: 120 },
    { type: "Edge", count: 100 }
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
    { type: "Mac OS", count: 193 },
    { type: "Windows", count: 14 },
    { type: "LINUX", count: 34 },
    { type: "UNIX", count: 2 },
    { type: "Android", count: 2 }
  ]
})

Mock.mock('/data/screenDataByDivider?dimensionType=0',{
  success:true,
  result:[
    { type: "1300*728", count: 23 },
    { type: "1902*1080", count: 14 },
    { type: "440*780", count: 34 }
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
    {
      redirect: 120,
      dns: 343,
      tcp: 3345,
      ssl: 4456,
      ttfb: 321,
      trans: 1234,
      dom: 3123,
      resource: 1111,
      total:14053
    }
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
    {
      time: "2020-02-10T09:00:00.000Z",
      fpt: 120,
      ready: 343,
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

