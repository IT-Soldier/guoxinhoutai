<template>
<div class="login-wrap">
  <el-form
  :label-position="labelPosition"
  class="login-form"
  :rules="rules"
  ref="ruleForm"
  :model="formData"
  label-width="80px">
  <!-- :label-position绑定的是表单域标签的位置,data处设定labelPosition为top -->
  <!-- :rules设定的是表单验证规则,data处 -->
  <!-- ref="ruleForm",该属性的设定是为了获取form标签,本次用在了handleLogin方法中 -->
  <!-- :model绑定的是表单数据对象,没有这个,el-form-item的数据是不会检测到的 -->
  <!-- label-width表单域标签的宽度 -->
    <h2>用户登录</h2>
    <el-form-item class="login-item" label="用户名" prop="username">
      <!-- prop的作用Form 组件提供了表单验证的功能，只需要通过 rules 属性传入约定的验证规则， -->
      <!-- 并将 Form-Item 的 prop 属性设置为需校验的字段名即可。 -->
      <el-input type="text" v-model="formData.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <!-- @keyup.enter,键盘事件,我们没有办法记住keycode,所以在修饰符上封装了一些常见的按键,是绑定在input标签上才会生效的 -->
      <!-- 将原生事件绑定到组件,想要在一个组件的根元素上直接监听一个原生事件,可以使用 v-on 的 .native 修饰符 -->
      <!-- 因为组件可能做了重构，所以根元素可能不是一个 <input> 元素,实际上为了解决这个问题,Vue 提供了一个 $listeners 属性 -->
      <el-input type="password" v-model="formData.password" @keyup.enter.native="handleLogin"></el-input>
    </el-form-item>
    <el-button class="login-button" type="primary" @click="handleLogin">登录按钮</el-button>
  </el-form>
</div>
</template>

<script>
import { login } from '@/api/order'
import Cookies from 'js-cookie'
export default {
  data () {
    return {
      formData: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 11, message: '长度在 6 到 11 个字符', trigger: 'blur' }
        ]
      },
      labelPosition: 'top'
    }
  },
  methods: {
    async handleLogin () {
      const response = await login({})
      if (response.data.code === 200) {
        Cookies.set('v_v-s-ticket', response.data.data.sessionId)
        this.$router.push('/order')
        this.$message.success('登录成功!')
      } else {
        this.$message.error('登录失败!')
      }
    }
  }
}
</script>

<style>
  .login-wrap {
    position: relative;
    height: 100%;
    background: no-repeat url("../../assets/loginbg.jpg")
  }
  .login-wrap h2 {
    margin: 0;
  }
  .login-form {
    position:absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 400px;
    height: 350px;
    padding: 30px;
    margin: auto;
    background: #eee;
    border-radius: 20px;
  }
  .login-button {
    width: 100%;
    margin-top: 40px;
  }
</style>
