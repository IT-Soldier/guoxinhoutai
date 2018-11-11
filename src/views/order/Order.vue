<template>
  <el-card
  class="box-card"
  shadow="hover">
  <my-breadcrumb :style="{marginLeft: '20px'}" level1="订单管理"></my-breadcrumb>
    <!-- 搜索框部分 -->
    <div style="margin-top: 15px;">
      <!-- clearable使得输入框可以被清除 -->
      <el-input
      class="search"
        clearable
        placeholder="订单编号/车牌号/车架号/描述/联系人/联系电话"
        v-model="query">
        <!-- slot="append"使得搜索按钮存在 -->
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="handelQuery"></el-button>
      </el-input>
    </div>
    <!-- 表格主体 -->
    <!-- 当el-table元素中注入data对象数组后，
    在el-table-column中用prop属性来对应对象中的键名即可填入数据，
    用label属性来定义表格的列名。
    可以使用width属性来定义列宽。 -->
    <!-- :data="tableData"绑定data中的数据 -->
    <!-- border加边框 -->
    <!-- lebal-width设置所有列的宽度 -->
    <el-table
      border
      :stripe="true"
      :data="tableData"
      lebal-width="50px"
      style="width: 100%;">
      <el-table-column
        label="订单编号">
        <!-- 通过 Scoped slot 可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据 -->
        <template slot-scope="scope">
          <span>{{ scope.row.orderNo }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="订单时间">
        <template slot-scope="scope">
          <!-- 时间格式处理详情参见main.js -->
          <span>{{ scope.row.orderTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="订单类型">
        <template slot-scope="scope">
          <span>{{ scope.row.orderType === 1 ? '整车' : '旧件' }}</span>
        </template>
      </el-table-column>
      <el-table-column
      label="报案号">
        <template slot-scope="scope">
          <span>{{ scope.row.reportNo }}</span>
        </template>
      </el-table-column>
      <el-table-column
      label="车牌号">
        <template slot-scope="scope">
          <span>{{ scope.row.carNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column
      label="车架号">
        <template slot-scope="scope">
          <span>{{ scope.row.carFrameNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column
      label="描述">
        <template slot-scope="scope">
          <span>{{ scope.row.carModelNumberName }}</span>
        </template>
      </el-table-column>
      <el-table-column
      label="配件数量">
        <template slot-scope="scope">
          <span>{{ scope.row.totalPartsCount }}</span>
        </template>
      </el-table-column>
      <el-table-column
      label="委托方">
        <template slot-scope="scope">
          <span>{{ scope.row.custormName }}</span>
        </template>
      </el-table-column>
      <el-table-column
      label="联系人">
        <template slot-scope="scope">
          <span>{{ scope.row.takeCarContacts }}</span>
        </template>
      </el-table-column>
      <el-table-column
      label="联系方式">
        <template slot-scope="scope">
          <span>{{ scope.row.takeCarContactNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column
      label="操作"
      width="70"
      >
        <template slot-scope="scope">
          <el-button
          size="mini"
          type="primary"
          icon="el-icon-edit"
          plain
          @click="openEditDialogForm(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑用户弹出框 -->
    <!-- close是Dialog 关闭的回调函数 -->
      <!-- 整车的编辑页面 -->
    <all-edit-order
    @allQuitDialog="allQuitDialog"
    @allHandelEdit="allHandelEdit"
    @closeAllEditDialog="closeAllEditDialog"
    :allEditvisible="allEditvisible">
    </all-edit-order>
    <!-- 旧件的编辑页面 -->
    <part-edit-order
    @partQuitDialog="partQuitDialog"
    @partHandelEdit="partHandelEdit"
    @closePartEditDialog="closePartEditDialog"
    :partEditvisible="partEditvisible">
    </part-edit-order>
    <!-- 分页导航 -->
    <!-- layout控制是分页功能是否完整 -->
    <!-- 其余的功能就是英语字面的翻译 -->
    <el-pagination
      class="fenye"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 3, 4, 5]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </el-card>
</template>

<script>
import MyBreadcrumb from '@/components/MyBreadcrumb'
import AllEditOrder from '@/views/order/components/AllEditOrder'
import PartEditOrder from '@/views/order/components/PartEditOrder'
import { getOrderList } from '@/api/order'
export default {
  components: {
    MyBreadcrumb,
    AllEditOrder,
    PartEditOrder
  },
  data () {
    return {
      // 要传递给旧件编辑页面的表单数据
      partFormData: {},
      // 要传递给整车编辑页面的表单数据
      allFormData: {},
      tableData: [],
      query: '',
      pagenum: 1,
      pagesize: 4,
      total: 0,
      // 旧件编辑页面开关变量
      partEditvisible: false,
      // 整车编辑页面开关变量
      allEditvisible: false,
      options: [],
      currentRoleId: -1
    }
  },
  methods: {
    // 编辑旧件界面点击X号
    closePartEditDialog () {
      this.partEditvisible = false
    },
    // 编辑旧件界面点击取消
    partQuitDialog () {
      this.partEditvisible = false
    },
    // 编辑旧件界面点击确定
    partHandelEdit () {
      this.partEditvisible = false
    },
    // 编辑整车界面点击X号
    closeAllEditDialog () {
      this.allEditvisible = false
    },
    // 编辑整车界面点击取消
    allQuitDialog () {
      this.allEditvisible = false
    },
    // 编辑整车界面点击确定
    allHandelEdit () {
      this.allEditvisible = false
    },
    // 加载订单列表信息
    async loadData () {
      // 获取表格数据并填充
      const response = await getOrderList({})
      if (response.data.code === 200) {
        console.log(response.data.data.rows)
        this.tableData = response.data.data.rows
        this.total = response.data.total
      } else {
        console.log('列表获取失败')
      }
    },
    // 查询功能,查询的是username
    handelQuery () {
      this.$http
        .get(`users?pagenum=${this.pagenum}&pagesize=${this.pagesize}&query=${this.query}`)
        .then(response => {
          const {msg, status} = response.data.meta
          if (status === 200) {
            console.log(response.data)
            this.total = response.data.data.total
            this.pagenum = response.data.data.pagenum
            this.tableData = response.data.data.users
          } else {
            this.$message.error(msg)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 打开编辑弹出框,并将数据渲染到页面上去
    openEditDialogForm (row) {
      // row中已经有了表单所需的信息,不需要再次发请求拿数据
      console.log(Number(row.orderType))
      console.log(row)
      if (Number(row.orderType) === 1) {
        this.allEditvisible = true
      } else if (Number(row.orderType) === 2) {
        this.partEditvisible = true
      }
    },
    // pagesize变化时触发事件
    handleSizeChange (val) {
      // 当不在第一页时,点击当前显示页数,回车时,应跳转到第一页
      if (this.pagenum !== 1) {
        this.pagenum = 1
      }
      // 此处的val对应的是page-sizes中的值
      // console.log(`每页 ${val} 条`);
      this.pagesize = val - 0
      this.loadData()
    },
    // pagenum变化时触发的事件
    handleCurrentChange (val) {
      // 此处的val对应的是current-page的值
      // console.log(`当前页: ${val}`);
      // val是字符串,pagenum需要的是数字
      this.pagenum = val - 0
      this.loadData()
    },
    // 修改用户状态功能
    async stateChange (row) {
      const response = await this.$http.put(`users/${row.id}/state/${row.mg_state}`)
      this.$message.success('用户状态修改成功!')
    }
  },
  // beforeCreate() {
  //   // 此处最愚蠢的是最早可以使用数据和方法的时候是created的时候
  // }
  mounted () {
    this.loadData()
  }
}
</script>

<style>
.box-card {
  height: 100%;
  /* card高度不够,默认是hidden */
  overflow: auto;
}
.search {
  width: 400px;
  margin: 10px 0;
}
.el-main {
  text-align: left;
  overflow: hidden;
}
.fenye {
  margin-top: 10px;
  margin-left: 10px;
}
.el-pagination__jump {
  margin-top: -10px;
}
/* 订单信息页面 */
.carMessage {
  padding-bottom: 10px;
  margin: 0 30px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
}
/* 编辑信息页，输入框过长 */
.input {
  width: 90%;
}
</style>
