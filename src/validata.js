// main.js文件内容太多，表单验证单独写这个文件，引入到main.js即可
// 引入vue(因为需要vue.use安装插件)
import Vue from 'vue'
// 引入VeeValidate插件
import VeeValidate from 'vee-validate';
import zh_CN from 'vee-validate/dist/locale/zh_CN'
// vuea安装插件
Vue.use(VeeValidate)

// 提示信息
VeeValidate.Validator.localize('zh_CN', {
        messages: {
            ...zh_CN.messages,
            is: (field) => `${field}必须与密码相同` //修改内置规则的message,让确认密码和密码相同
        },
        attributes: { //给校验的field属性名映射中文名称
            phone: '手机号',
            code: '验证码',
            password: '密码',
            password1: '确认密码',
            isCheck: '协议',
            agree: '同意协议'
        }
    })
    // 自定义校验规则
VeeValidate.Validator.extend('tongyi', {
    validate: (value) => {
        return value;
    },
    getMessage: (field) => field + "必须同意",
});