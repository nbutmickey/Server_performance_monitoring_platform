import Mock from 'mockjs'
Mock.setup({
    timeout:'100'
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

