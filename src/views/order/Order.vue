<template>
  <el-card
  class="box-card"
  shadow="hover">
  <my-breadcrumb :style="{marginLeft: '20px'}" level1="订单管理"></my-breadcrumb>
    <!-- 搜索框部分 -->
    <div style="margin-top: 15px;">
      <!-- clearable使得输入框可以被清除 -->
      <el-input
      @change="searchChange(query)"
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
    <el-row :style="{marginBottom: '10px' }">
      <el-button
        type="primary"
        plain
        :style="{color: orderState == 1 ? '#FFF' : '#409EFF', backgroundColor: orderState == 1 ? '#409EFF' : '#ecf5ff'}"
        @click="unprocessed">未处理</el-button>
      <el-button
        :style="{marginLeft: '-5px',color: orderState == 2 ? '#FFF' : '#409EFF', backgroundColor: orderState == 2 ? '#409EFF' : '#ecf5ff'}"
        type="primary"
        plain
        @click="processed">已处理</el-button>
      <el-button
        :style="{marginLeft: '-5px',color: orderState == 3 ? '#FFF' : '#409EFF', backgroundColor: orderState == 3 ? '#409EFF' : '#ecf5ff'}"
        type="primary"
        plain
        @click="allOrderList">全部</el-button>
    </el-row>
    <!-- 表格主体 -->
    <el-table
      border
      :stripe="true"
      :data="tableData"
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
          <span>{{ scope.row.orderType == 1 ? '整车' : '旧件' }}</span>
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
    <!-- 整车的编辑页面 -->
    <all-edit-order
    @allQuitDialog="allQuitDialog"
    @allHandelEdit="allHandelEdit"
    @closeAllEditDialog="closeAllEditDialog"
    :allEditvisible="allEditvisible">
    </all-edit-order>
    <!-- 旧件的编辑页面 -->
    <part-edit-order
    v-if="partEditvisible"
    :partOrderDetail="partOrderDetail"
    @abnormal="abnormal"
    @orderNormal="orderNormal"
    @temporaryStorage="temporaryStorage"
    @closePartEditDialog="closePartEditDialog"
    :partEditvisible="partEditvisible">
    </part-edit-order>
    <!-- 分页导航 -->
    <!-- layout控制是分页功能是否完整 -->
    <!-- 其余的功能就是英语字面的翻译 -->
    <el-pagination
      class="fenye"
      background
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination>
  </el-card>
</template>

<script>
import MyBreadcrumb from '@/components/MyBreadcrumb'
import AllEditOrder from '@/views/order/components/AllEditOrder'
import PartEditOrder from '@/views/order/components/PartEditOrder'
import { getOrderList, getHistoryOrderList, getAllOrderList, getOrderDetail } from '@/api/order'
export default {
  components: {
    MyBreadcrumb,
    AllEditOrder,
    PartEditOrder
  },
  data () {
    return {
      // 判定当前所要查询的订单状态,默认1为未处理,2为已处理,3为全部
      orderState: 1,
      // 要传递给旧件编辑页面的表单数据
      partOrderDetail: {},
      // 要传递给整车编辑页面的表单数据
      newOrderdetail: {},
      tableData: [],
      query: '',
      pagenum: 1,
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
    // 从订单编辑页面出来,需要重新发请求刷新数据,
    // 编辑的按钮较多,封装一个发请求的函数
    async getDataAgain () {
      let data = {
        page: this.pagenum,
        rows: 10
      }
      let response = {}
      if (this.orderState === 1) {
        data.orderStatus = 1
        response = await getOrderList(data)
      } else if (this.orderState === 2) {
        response = await getHistoryOrderList(data)
      } else if (this.orderState === 3) {
        response = await getAllOrderList(data)
      }
      this.tableData = response.data.data.rows
      this.total = response.data.data.total
    },
    // 编辑旧件界面点击X号
    closePartEditDialog () {
      this.partEditvisible = false
    },
    // 编辑旧件界面点击派单
    orderNormal () {
      this.partEditvisible = false
      this.getDataAgain()
    },
    // 编辑旧件界面点击异常订单
    abnormal () {
      this.partEditvisible = false
      this.getDataAgain()
    },
    // 编辑旧件界面点击暂存按钮
    temporaryStorage () {
      this.partEditvisible = false
      this.getDataAgain()
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
    // 全部订单
    async allOrderList () {
      // 解决问题:未处理页码为4,跳到全部还为4
      this.pagenum = 1
      this.orderState = 3
      let data = {
        page: 1,
        rows: 10
      }
      const response = await getAllOrderList(data)
      if (response.data.code === 200) {
        this.tableData = response.data.data.rows
        this.total = response.data.data.total
      } else {
        this.$message.error('全部订单列表获取失败')
      }
    },
    // 已处理订单
    async processed () {
      this.pagenum = 1
      this.orderState = 2
      let data = {
        page: 1,
        rows: 10
      }
      const response = await getHistoryOrderList(data)
      if (response.data.code === 200) {
        this.tableData = response.data.data.rows
        this.total = response.data.data.total
      } else {
        this.$message.error('已处理订单列表获取失败')
      }
    },
    // 未处理订单
    async unprocessed () {
      this.pagenum = 1
      this.orderState = 1
      let data = {
        page: 1,
        rows: 10,
        orderStatus: 1
      }
      const response = await getOrderList(data)
      if (response.data.code === 200) {
        this.tableData = response.data.data.rows
        this.total = response.data.data.total
      } else {
        this.$message.error('未处理订单列表获取失败')
      }
    },
    // 加载订单列表信息
    async loadData () {
      let data = {
        page: 1,
        rows: 10,
        orderStatus: 1
      }
      // 获取表格数据并填充
      const response = await getOrderList(data)
      if (response.data.code === 200) {
        this.tableData = response.data.data.rows
        this.total = response.data.data.total
      } else {
        this.$message.error('未处理订单列表获取失败')
      }
    },
    // 查询功能,查询的是框内的东西
    async handelQuery () {
      this.pagenum = 1
      let data = {
        page: this.pagenum,
        rows: 10,
        keyWord: this.query
      }
      if (this.orderState === 1) {
        data.orderStatus = 1
        const response = await getOrderList(data)
        if (response.data.code === 200) {
          console.log(response.data.data.rows)
          this.tableData = response.data.data.rows
          this.total = response.data.data.total
        } else {
          console.log('未处理订单列表搜索失败')
        }
      } else if (this.orderState === 2) {
        const response = await getHistoryOrderList(data)
        if (response.data.code === 200) {
          console.log(response.data.data.rows)
          this.tableData = response.data.data.rows
          this.total = response.data.data.total
        } else {
          console.log('已处理订单列表搜索失败')
        }
      } else if (this.orderState === 3) {
        const response = await getAllOrderList(data)
        if (response.data.code === 200) {
          console.log(response.data.data.rows)
          this.tableData = response.data.data.rows
          this.total = response.data.data.total
        } else {
          console.log('全部订单列表搜索失败')
        }
      }
    },
    // 当搜索内容发生变化的时候触发事件
    // 输入框失去焦点,点击清空x号都会触发,输入内容后,回车触发
    async searchChange (value) {
      // 搜索时,页码也要归1,万一我不是在页码1的情况下搜索的呢
      this.pagenum = 1
      let data = {
        page: this.pagenum,
        rows: 10,
        keyWord: value
      }
      if (this.orderState === 1) {
        data.orderStatus = 1
        const response = await getOrderList(data)
        if (response.data.code === 200) {
          console.log(response.data.data.rows)
          this.tableData = response.data.data.rows
          this.total = response.data.data.total
        } else {
          console.log('未处理订单列表搜索失败')
        }
      } else if (this.orderState === 2) {
        const response = await getHistoryOrderList(data)
        if (response.data.code === 200) {
          console.log(response.data.data.rows)
          this.tableData = response.data.data.rows
          this.total = response.data.data.total
        } else {
          console.log('已处理订单列表搜索失败')
        }
      } else if (this.orderState === 3) {
        const response = await getAllOrderList(data)
        if (response.data.code === 200) {
          console.log(response.data.data.rows)
          this.tableData = response.data.data.rows
          this.total = response.data.data.total
        } else {
          console.log('全部订单列表搜索失败')
        }
      }
    },
    // 打开编辑弹出框,并将数据渲染到页面上去
    async openEditDialogForm (row) {
      // row中已经有了表单所需的信息,不需要再次发请求拿数据
      console.log('要弹开哪个界面')
      // 需要先拿数据,再打开编辑页面传值
      const response = await getOrderDetail(row.id)
      this.partOrderDetail = response.data.data
      console.log(this.partOrderDetail)
      if (Number(row.orderType) === 1) {
        this.allEditvisible = true
      } else if (Number(row.orderType) === 2) {
        this.partEditvisible = true
      } else {

      }
    },
    // pagenum变化时触发的事件(包括点击页码,上翻,下翻)
    handleCurrentChange (val) {
      // 此处的val对应的是current-page的值
      // console.log(`当前页: ${val}`);
      // val是字符串,pagenum需要的是数字
      console.log('观察哪个事件被触发')
      console.log(val)
      this.pagenum = val - 0
      this.getDataAgain()
    }
  },
  mounted () {
    this.loadData()
  }
}
</script>

<style scope>
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
