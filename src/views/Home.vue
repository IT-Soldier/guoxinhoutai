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
          <el-button type="primary" plain>首页</el-button>
        </el-col>
        <el-col :span="2" class="menuButton">
          <el-button type="primary" plain @click="$router.push('/order')">订单管理</el-button>
        </el-col>
        <el-col :span="2" class="menuButton">
          <el-button type="primary" plain>报废汽车</el-button>
        </el-col>
        <el-col :span="2" class="menuButton">
          <el-button type="primary" plain>旧件回收</el-button>
        </el-col>
        <el-col :span="2" class="menuButton">
          <el-button type="primary" plain>财务管理</el-button>
        </el-col>
        <el-col :span="2" class="menuButton">
          <el-button type="primary" plain>系统设置</el-button>
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
import { login, getTest } from '@/api/order'
import Cookies from 'js-cookie'

export default {
  data () {
    return {

    }
  },
  methods: {
    async getLogin () {
      const response = await login({})
      if (response.data.code === 200) {
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
