<template>
  <el-container>
    <!-- 头部 -->
    <el-header class="header">
      <!-- 标签内,比如图片使用的是绝对路径,根路径为src文件夹 -->
      <el-row>
        <el-col :span="4"><img src="@/assets/logo.png" :style="{marginTop: '20px'}"></el-col>
        <el-col :span="18" class="title" :style="{ textAlign: 'left', fontSize: '36px'}">国信管理后台</el-col>
        <el-col :span="2"><a class="logout" href="javascript:;">退出</a></el-col>
      </el-row>
    </el-header>
    <!-- 菜单栏导航 -->
    <div>
      <!-- 目前只有订单管理,是可以跳转的 -->
      <el-row class="rowMenuButton">
        <el-col :span="2" :offset="1" :style="{paddingLeft: '28px', marginLeft: '15px'}" class="menuButton">
          <el-button :style="{color: buttonState == 'home' ? '#FFF' : '#409EFF', backgroundColor: buttonState == 'home' ? '#409EFF' : '#ecf5ff'}" type="primary" plain @click="pushHome">首页</el-button>
        </el-col>
        <el-col :span="2" class="menuButton">
          <el-button :style="{color: buttonState == 'order' ? '#FFF' : '#409EFF', backgroundColor: buttonState == 'order' ? '#409EFF' : '#ecf5ff'}" type="primary" plain @click="pushOrder">订单管理</el-button>
        </el-col>
        <el-col :span="2" class="menuButton">
          <el-button :style="{color: buttonState == 'car' ? '#FFF' : '#409EFF', backgroundColor: buttonState == 'car' ? '#409EFF' : '#ecf5ff'}" type="primary" plain @click="pushCar">报废汽车</el-button>
        </el-col>
        <el-col :span="2" class="menuButton">
          <el-button :style="{color: buttonState == 'old' ? '#FFF' : '#409EFF', backgroundColor: buttonState == 'old' ? '#409EFF' : '#ecf5ff'}" type="primary" plain @click="pushOld">旧件回收</el-button>
        </el-col>
        <el-col :span="2" class="menuButton">
          <el-button :style="{color: buttonState == 'money' ? '#FFF' : '#409EFF', backgroundColor: buttonState == 'money' ? '#409EFF' : '#ecf5ff'}" type="primary" plain @click="pushMoney">财务管理</el-button>
        </el-col>
        <el-col :span="2" class="menuButton">
          <el-button :style="{color: buttonState == 'system' ? '#FFF' : '#409EFF', backgroundColor: buttonState == 'system' ? '#409EFF' : '#ecf5ff'}" type="primary" plain @click="pushSystem">系统设置</el-button>
        </el-col>
        <el-col :span="2" class="menuButton">
          <el-button type="primary" plain @click="getLogin">点击登录</el-button>
        </el-col>
      </el-row>
    </div>
    <el-container>
      <!-- 主内容区 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { login } from '@/api/order'
import Cookies from 'js-cookie'

export default {
  data () {
    return {
      // 菜单导航按钮的状态,用于高亮显示
      buttonState: ''
    }
  },
  methods: {
    // 菜单导航,对应项应当高亮,且完成跳转
    pushHome () {
      this.buttonState = 'home'
      this.$router.push('/home')
    },
    pushOrder () {
      this.buttonState = 'order'
      this.$router.push('/order')
    },
    pushCar () {
      this.buttonState = 'car'
    },
    pushOld () {
      this.buttonState = 'old'
    },
    pushMoney () {
      this.buttonState = 'money'
    },
    pushSystem () {
      this.buttonState = 'system'
    },
    async getLogin () {
      const response = await login({})
      if (response.data.code === 200) {
        // 设置cookie
        Cookies.set('v_v-s-ticket', response.data.data.sessionId)
        console.log('登录信息')
        console.log(response)
      }
    }
  },
  mounted () {
  }
}
</script>

<style>
 .el-header {
    background-color: #3a83e6;
    color: #333;
    text-align: center;
    height: 100px !important;
    line-height: 100px !important;
    padding: 0;
  }
  .rowMenuButton {
    height: 80px !important;
    line-height: 80px;
    background: #ecf5ff;
  }
  .menuButton button {
    border: none;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    height: 100%;
  }
  .el-container {
    height: 100%;
  }
  .title {
    color: #fff;
    font-size: 24px;
  }
  .logout {
    text-decoration: none;
    color: orange;
  }
  .el-row,.el-col {
    height: 100%;
  }
</style>
