<style scoped>
.layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-breadcrumb {
    padding: 10px 15px 0;
}
.layout-content {
    min-height: 600px;
    margin: 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
}
.layout-content-main {
    padding: 20px 10px;
}
.layout-copy {
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
}
.layout-menu-left {
    background: #464c5b;
    /*min-width: 100px;*/
}
.layout-header {
    height: 60px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
}
.layout-logo-left {
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
    line-height: 30px;
    color: white;
    text-align: center;
    vertical-align: middle;
    overflow: hidden;
}
.layout-ceiling-main a {
    color: #9ba7b5;
}
.layout-hide-text .layout-text {
    display: none;
}
.ivu-col {
    transition: width .2s ease-in-out;
}
</style>

<template>

<div class="layout" :class="{'layout-hide-text': spanLeft < 5}">
    <Row type="flex">
        <i-col :span="spanLeft" class="layout-menu-left">
            <Menu :active-name="setActive" theme="dark" width="auto" @on-select="routeTo">
                <div class="layout-logo-left">
                    <h3>api后台管理</h3></div>
                    <Menu-item   name="index">
                            <Icon type="ios-navigate" :size="iconSize"></Icon>
                            <span class="layout-text" >首页</span>
                        </Menu-item>
                 <Submenu name="1" >
                        <template slot="title">
                            <Icon type="ios-navigate"></Icon>
                            个人项目
                        </template>
                        <Menu-item  v-for="item in personalData" >
                            <Icon type="ios-navigate" :size="iconSize"></Icon>
                            <router-link :to="{ name: 'foo', params: { id:item._id  }}"><span class="layout-text" >{{item.name}}</span></router-link>                            
                        </Menu-item>
                    </Submenu>
                <Submenu name="2" v-for="item in companyData" >
                        <template slot="title">
                            <Icon type="ios-navigate"></Icon>
                            公司项目
                        </template>
                        <Menu-item  >
                            <Icon type="ios-navigate" :size="iconSize"></Icon>
                            <router-link :to="{ name: 'foo', params: { id:item._id  }}"><span class="layout-text" >{{item.name}}</span></router-link>
                        </Menu-item>
                    </Submenu>
                <Submenu name="3" >
                        <template slot="title">
                            <Icon type="ios-navigate"></Icon>
                            公共项目
                        </template>
                        <Menu-item  v-for="item in commontData" >
                            <Icon type="ios-navigate" :size="iconSize"></Icon>
                            <router-link :to="{ name: 'foo', params: { id :'ss'  }}"><span class="layout-text" >{{item.name}}</span></router-link>
                        </Menu-item>
                    </Submenu> 
                
            </Menu>
        </i-col>
        <i-col :span="spanRight">
            <div class="layout-header">
                <i-button type="text" @click.native="toggleClick">
                    <Icon type="navicon" size="32"></Icon>
                </i-button>
            </div>
            <div class="layout-breadcrumb">
                <Breadcrumb>
                    <Breadcrumb-item>首页</Breadcrumb-item>
                    <Breadcrumb-item>{{this.$route.path.replace('/','')}}</Breadcrumb-item>
                </Breadcrumb>
            </div>
            <div class="layout-content">
                <div class="layout-content-main">
                    <transition mode="out-in">
                        <router-view></router-view>
                    </transition>
                </div>
            </div>
            <div class="layout-copy">
                2011-2016 &copy; NSLab
            </div>
        </i-col>
    </Row>
</div>

</template>

<script>
import {getMenu,getUserInfo} from '../service/getData.js'
import {setStore,getStore} from '../service/mUtils.js'

export default {
    name: "slider",
    data() {
            return {
                spanLeft: 5,
                spanRight: 19,
                Data:{},
                personalData:[],
                companyData:[],
                commontData:[],
            }
        },
        computed: {
            iconSize() {
                return this.spanLeft === 5 ? 14 : 24;
            },
            setActive() {
              return this.$route.path.replace('/','');
            }
        },
        created () {
                // 缓存数据
                //初始化数据
                this.initData()
            },
        methods: {
            toggleClick() {
                    if (this.spanLeft === 5) {
                        this.spanLeft = 2;
                        this.spanRight = 16;
                    } else {
                        this.spanLeft = 5;
                        this.spanRight = 14;
                    }
                },
            routeTo(e) {
               
                this.$router.push(e);
            },
            async initData(){
                console.group("初始化数据");
                let that = this;
                const userInfo = await getStore("bin");
                const userInfo2 = JSON.parse(userInfo);
               
                let _id =userInfo2.id;
                
                const user = await getUserInfo(_id);
                
                if (user.data.code == 0) {
                    that.Data = user.data.result;
                    // setStore("userInfo",user.data.result);
                } else {
                    this.$Message.error("获取不到用户数据")
                }
                const res = await getMenu(_id);
                 if (res.data.code == 0) {
                     const data = res.data.result;
                     
                     data.forEach(function(e) {
                         switch (e.type) {
                             case 1:
                                 that.personalData.push(e);
                                 break;
                             case 2:
                                 that.companyData.push(e);
                                 break;
                             default:
                            
                                 break;
                         }
                     }, this);
                     
                 } else {
                     this.$Message.error('获取数据失败')
                 }
                console.groupEnd();
                }
                
            },
        
                
        }

</script>