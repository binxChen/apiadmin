<template>
    <Form ref="formInline" :model="formInline" :rules="ruleInline" class="form">
        <Form-item prop="user">
            <Input type="text" v-model="formInline.userName" placeholder="Username">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
        </Form-item>
        <Form-item prop="password">
            <Input type="password" v-model="formInline.passWord" placeholder="Password">
                <Icon type="ios-locked-outline" slot="prepend"></Icon>
            </Input>
        </Form-item>
        <Form-item>
            <Button type="primary" @click="handleSubmit()">登录</Button>
        </Form-item>
    </Form>
</template>
<style>
    .form{
        width: 30%;margin-left: 40%;
        height: 30%;margin-top: 200px;
    }
</style>

<script>
import {login} from '../service/getData.js'
import {setStore,getStore} from '../service/mUtils.js'

    export default {
        data () {
            return {
                formInline: {
                    userName: '',
                    passWord: ''
                },
                ruleInline: {
                    userName: [
                        { required: true, message: '请填写用户名', trigger: 'blur' }
                    ],
                    passWord: [
                        { required: true, message: '请填写密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
                    ]
                }
            }
        },
         mounted () {
             let that = this;
                const userInfo = getStore("bin") || "";
                if (userInfo != "" ) {
                    console.log(userInfo);
                    that.$Message.success("检测到您已登录过，现在为你自动跳转")
                    setTimeout(function() {
                        that.$router.push({ name: 'index'});
                    }, 2000);
                    
                } else {
                    console.log("未登录过");
                    
                }
            },
        methods: {
            async handleSubmit() {
                
                let that = this;
                let param = that.formInline;
                    const res = await login(param);
                    
                    if (res.data.code == 0) {
                       
                        const result2 = {
                            id:res.data.result._id,
                            userName:res.data.result.userName,
                            nickName:res.data.result.nickName,
                            role:res.data.result.role,
                            
                            };
                        
                        that.$Message.success('登陆成功');
                        setStore('bin',result2)
                        setTimeout(function() {
                            
                            that.$router.push({ name: 'index'});
                        }, 2000);
                        
                    }else{
                       this.$Message.error('对方不想说话，并且向你抛出了一个异常');
                    }  
            }
        }
    }
</script>


