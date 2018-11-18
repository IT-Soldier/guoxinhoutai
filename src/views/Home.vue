<template>
  <el-container>
    <!-- 头部 -->
    <el-header class="header">
      <!-- 标签内,比如图片使用的是绝对路径,根路径为src文件夹 -->
      <el-row>
        <el-col :span="4"><img src="@/assets/logo.png" :style="{marginTop: '20px'}"></el-col>
        <el-col :span="18" class="title" :style="{ textAlign: 'left', fontSize: '36px'}">国信管理后台</el-col>
        <el-col :span="2"><a class="logout" href="javascript:;" @click.prevent="logout">退出</a></el-col>
      </el-row>
    </el-header>
    <!-- 菜单栏导航 -->
    <el-row :style="{backgroundColor: '#ecf5ff', height: '60px'}">
      <el-col :offset=1>
        <el-menu
          :default-active="activeIndex"
          active-text-color="#409eff"
          text-color="#888"
          background-color="#ecf5ff"
          router
          mode="horizontal">
          <el-menu-item :index="path.home">首页</el-menu-item>
          <el-menu-item :index="path.order">订单管理</el-menu-item>
          <el-menu-item :index="path.car">报废汽车</el-menu-item>
          <el-menu-item :index="path.old">旧件回收</el-menu-item>
          <el-menu-item :index="path.money">财务管理</el-menu-item>
          <el-menu-item :index="path.system">系统设置</el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
    <el-container>
      <!-- 主内容区 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  data () {
    return {
      // 菜单导航所需路径
      path: {
        home: '/home',
        order: '/order',
        car: '/car',
        old: '/old',
        money: '/money',
        system: '/system'
      },
      activeIndex: '/home'
    }
  },
  methods: {
    // 退出登录事件
    logout () {
      // 提示用户确认其已经触发的动作，并询问是否进行此操作时会用到此对话框。
      this.$confirm('是否确认退出登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 需要清空cookie
        Cookies.remove('v_v-s-ticket')
        // 跳转到登录页,并提醒登录
        this.$router.push('/login')
        this.dialogVisible = false
        this.$message.success('您已经成功退出!')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出登录'
        })
      })
    },
    heightLight () {
      // 每次f5刷新都会触发,为了菜单栏高亮,截取字符串
      let hash = window.location.hash
      console.log(hash)
      hash = hash.slice(hash.indexOf('/') + 1)
      if (hash.indexOf('/') != -1) {
        hash = hash.substr(0, hash.indexOf('/'))
      }
      this.activeIndex = '/' + hash
    }
  },
  created () {
    this.heightLight()
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
</style>
