/* eslint-disable */
export default [{
    name: '项目管理',
    id: 'basic',
    sub: [{
        name: '所有项目',
        componentName: 'ProjectList'
    }],
    child: [{
        name: '公告',
        componentName: 'ProjectAnnouncement'
    },
    {
        name: '时间轴',
        componentName: 'ProjectTimeline'
    },
    {
        name: '子项目',
        componentName: 'ProjectSub'
    },
    {
        name: '上传文件',
        componentName: 'ProjectUpload'
    }]
    },{
    name: '反馈',
    id:'feedback',
    sub:[{
        name: '备用',
        componentName: '404'
    }]
}]