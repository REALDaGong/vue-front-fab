/* eslint-disable */
export default [{
    name: '项目管理',
    id: 'basic',
    sub: [{
        name: '所有项目',
        componentName: 'ProjectList'
    }],
    child: [{
        name: '子项目',
        componentName: 'ProjectSub'
    },
    {
        name: '项目成员',
        componentName: 'ProjectMember'
    }]
    },{
    name: '反馈',
    id:'feedback',
    sub:[{
        name: '备用',
        componentName: '404'
    }]
}]