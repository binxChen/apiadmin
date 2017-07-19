import Index from '../src/views/index.vue'
import Slide from '../src/components/slider.vue'
const routers = [
    {
        path: '/index',
        name: 'index',
        redirect: '/index/about',
        meta: {
            title: '后台首页'
            },
        component: (resolve) => require(['./views/index.vue'], resolve),
        children: [
                {
                    path: 'foo/:id',
                    name:'foo',
                    component: resolve => require(['./views/foo.vue'], resolve)
                },{
                    path: 'about',
                    component: resolve => require(['./views/about.vue'], resolve)
                    
                }
            ],
    },{
        path: '/foo',
    meta: {
        title: ''
        },
    component: (resolve) => require(['./views/foo.vue'], resolve),
    },{
    path: '/',
    meta: {
        title: ''
        },
    component: (resolve) => require(['./views/login.vue'], resolve)
    },
];
export default routers;