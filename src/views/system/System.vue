<template>
<el-container class="systemContainer">
  <el-aside>
    <el-menu router>
      <!-- <el-menu-item :index="path.role"> -->
      <el-menu-item :index="path.role">
        <i class="el-icon-setting"></i>
        <span slot="title">角色管理</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-setting"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-setting"></i>
        <span slot="title">客户管理</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">区域管理</span>
      </el-menu-item>
      <el-menu-item index="5">
        <i class="el-icon-setting"></i>
        <span slot="title">预警管理</span>
      </el-menu-item>
      <el-menu-item index="6">
        <i class="el-icon-setting"></i>
        <span slot="title">配件数据管理</span>
      </el-menu-item>
      <el-menu-item index="7">
        <i class="el-icon-setting"></i>
        <span slot="title">整车残值评估管理</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
  <el-main :style="{marginLeft: '15px'}">
    <router-view></router-view>
  </el-main>
</el-container>

</template>

<script>
export default {
  data () {
    return {
      path: {
        role: '/system/role'
      }
    }
  }
}
</script>
<style scope>
.systemContainer.el-menu-item {
  border-radius: 10px;
}
 .systemContainer {
  margin: 10px 0 0 10px;
}
.el-main {
  height: 100%;
  border-radius: 5px;
  padding: 0;
  text-align: left;
  overflow: hidden;
}
.el-aside {
  width: 200px !important;
  border-radius: 10px;
}
.systemContainer.el-menu {
  border-radius: 10px;
}
.el-pagination__jump {
  margin-top: -10px;
}
.el-container {
  height: 100%;
}
.el-card__body {
  height: 100%;
}
</style>
