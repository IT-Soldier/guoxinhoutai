<template>
  <div>
    <el-dialog
      title="旧件订单信息：No.000237"
      fullscreen
      center
      @close="closePartEditDialog"
      :visible="partEditvisible">
      <el-form
      label-position="right"
      label-width="130px"
      size="small"
      :model="formData"
      ref="ruleForm">
        <el-row>
          <el-col :span='12'>
            <h2 class="carMessage"><i class="el-icon-tickets"></i><span>车辆信息</span></h2>
            <el-form-item label="车牌号:" prop="username">
              <el-input class="input" type="text" v-model="formData.username"></el-input>
            </el-form-item>
            <el-form-item class="input" label="车架号:" prop="username">
              <el-input type="text" v-model="formData.username"></el-input>
            </el-form-item>
            <el-form-item class="input" label="车辆型号:" prop="username">
              <el-input type="text" v-model="formData.username"></el-input>
            </el-form-item>
            <el-form-item class="input" label="报案号:" prop="username">
              <el-input type="text" v-model="formData.username"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span='12'>
            <h2 class="carMessage"><i class="el-icon-tickets"></i><span>取车信息</span></h2>
            <el-form-item class="input" label="取车联系人:" prop="username">
              <el-input type="text" v-model="formData.username">
                <!-- 少了slot属性,无法向组件内插入东西的 -->
                <el-button slot="append" type="info" plain @click="handelQuery">常用联系人</el-button>
              </el-input>
            </el-form-item>
            <el-form-item class="input" label="联系人电话:">
              <el-input type="text" v-model="formData.mobile"></el-input>
            </el-form-item>
            <el-form-item class="input" label="取车时间:">
              <el-date-picker type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
            </el-form-item>
            <el-form-item class="input" label="取车地址:" prop="username">
              <el-input type="text" v-model="formData.username"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <h2 class="carMessage"><i class="el-icon-tickets"></i><span>配件信息</span></h2>
          <el-col :span='22'>
            <el-table
              :style="{marginLeft: '50px',marginBottom: '50px'}"
              :stripe="true"
              :data="tableReplacementData"
            >
              <el-table-column
                label="配件分类">
                <!-- 通过 Scoped slot 可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据 -->
                <template slot-scope="scope">
                  <span>{{ scope.row.orderNo }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="配件名称">
                <!-- 通过 Scoped slot 可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据 -->
                <template slot-scope="scope">
                  <span>{{ scope.row.orderNo }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="零件编号">
                <!-- 通过 Scoped slot 可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据 -->
                <template slot-scope="scope">
                  <span>{{ scope.row.orderNo }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="备注">
                <!-- 通过 Scoped slot 可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据 -->
                <template slot-scope="scope">
                  <span>{{ scope.row.orderNo }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="配件照片">
                <!-- 通过 Scoped slot 可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据 -->
                <template slot-scope="scope">
                  <span>{{ scope.row.orderNo }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="编辑">
                <!-- 通过 Scoped slot 可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据 -->
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
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='12'>
            <h2 class="carMessage"><i class="el-icon-tickets"></i><span>派单信息</span></h2>
            <el-form-item class="input" label="业务员">
              <el-select v-model="formData.username" placeholder="请选择业务员">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="input" label="派单备注">
               <el-input type="textarea" v-model="formData.username"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="partQuitDialog">异常订单</el-button>
        <el-button type="primary" @click="partHandelEdit">暂存</el-button>
        <el-button type="primary" @click="partHandelEdit">派单</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    partEditvisible: {
      type: Boolean,
      default: false
    },
    formData: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      // 配件信息表格数据
      tableReplacementData: [],
      // 车辆归属单选按钮
      radioAttr: 1,
      // 能否行驶单选按钮
      radioRun: 1,
      tableData: [],
      query: '',
      pagenum: 1,
      pagesize: 4,
      total: 0,
      options: [],
      currentRoleId: -1
    }
  },
  methods: {
    // 编辑功能
    partHandelEdit () {
      // 清空文本框
      for (let key in this.formData) {
        this.formData[key] = ''
      }
      this.$emit('partHandelEdit')
    },
    // 取消按钮,关闭弹出框
    partQuitDialog () {
      // 清空表单
      for (let key in this.formData) {
        this.formData[key] = ''
      }
      this.$emit('partQuitDialog')
    },
    // 叉号关闭弹出框
    closePartEditDialog () {
      // 清空表单
      for (let key in this.formData) {
        this.formData[key] = ''
      }
      this.$emit('closePartEditDialog')
    }
  }
}
</script>

<style>
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
