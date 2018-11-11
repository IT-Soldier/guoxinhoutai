<template>
  <div>
    <el-dialog
      fullscreen
      @close="closeAllEditDialog"
      :visible="allEditvisible">
      <h1 style="text-align:center; font-size:30px">整车订单信息：No.000237</h1>
      <el-form
      label-position="right"
      label-width="130px"
      size="small"
      :model="formData"
      ref="ruleForm">
        <el-row>
          <el-col :span='12'>
            <h2 class="carMessage"><i class="el-icon-tickets"></i><span>车辆信息</span></h2>
            <el-form-item label="车牌号" prop="username">
              <el-input class="input" type="text" v-model="formData.username"></el-input>
            </el-form-item>
            <el-form-item class="input" label="车架号" prop="username">
              <el-input type="text" v-model="formData.username"></el-input>
            </el-form-item>
            <el-form-item class="input" label="车辆型号" prop="username">
              <el-input type="text" v-model="formData.username"></el-input>
            </el-form-item>
            <el-form-item label="能否行驶" prop="username">
              <el-radio v-model="radioRun" label="1">可以行驶</el-radio>
              <el-radio v-model="radioRun" label="2">不可以行驶</el-radio>
              <el-radio v-model="radioRun" label="3">严重事故</el-radio>
            </el-form-item>
            <el-form-item label="车辆归属" prop="username">
              <el-radio v-model="radioAttr" label="1">个人</el-radio>
              <el-radio v-model="radioAttr" label="2">公户</el-radio>
            </el-form-item>
            <el-form-item class="input" label="车辆与手续照片">
              <el-input type="text" v-model="formData.mobile"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span='12'>
            <h2 class="carMessage"><i class="el-icon-tickets"></i><span>取车信息</span></h2>
            <el-form-item class="input" label="取车联系人" prop="username">
              <el-input type="text" v-model="formData.username"></el-input>
            </el-form-item>
            <el-form-item class="input" label="联系人电话">
              <el-input type="text" v-model="formData.mobile"></el-input>
            </el-form-item>
            <el-form-item class="input" label="取车时间">
              <el-date-picker type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
            </el-form-item>
            <el-form-item class="input" label="取车地址" prop="username">
              <el-input type="text" v-model="formData.username"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='12'>
            <h2 class="carMessage"><i class="el-icon-tickets"></i><span>残值发放信息</span></h2>
            <el-form-item class="input" label="收款人姓名" prop="username">
              <el-input type="text" v-model="formData.username"></el-input>
            </el-form-item>
            <el-form-item class="input" label="银行账户" prop="username">
              <el-input type="text" v-model="formData.username"></el-input>
            </el-form-item>
            <el-form-item class="input" label="开户行" prop="username">
              <el-input type="text" v-model="formData.username"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span='12'>
            <h2 class="carMessage"><i class="el-icon-tickets"></i><span>手续邮寄信息</span></h2>
            <el-form-item class="input" label="收件人姓名" prop="username">
              <el-input type="text" v-model="formData.username"></el-input>
            </el-form-item>
            <el-form-item class="input" label="收件人电话">
              <el-input type="text" v-model="formData.mobile"></el-input>
            </el-form-item>
            <el-form-item class="input" label="邮寄地址">
              <el-input type="text" v-model="formData.mobile"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='12'>
            <h2 class="carMessage"><i class="el-icon-tickets"></i><span>派单信息</span></h2>
            <el-form-item class="input" label="业务员" prop="username">
              <el-input type="text" v-model="formData.username"></el-input>
            </el-form-item>
            <el-form-item class="input" label="邮箱">
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
        <el-button @click="allQuitDialog">取 消</el-button>
        <el-button type="primary" @click="allHandelEdit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    allEditvisible: {
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
    allHandelEdit () {
      // 清空文本框
      for (let key in this.formData) {
        this.formData[key] = ''
      }
      this.$emit('allHandelEdit')
    },
    // 取消按钮,关闭弹出框
    allQuitDialog () {
      // 清空表单
      for (let key in this.formData) {
        this.formData[key] = ''
      }
      this.$emit('allQuitDialog')
    },
    // 叉号关闭弹出框
    closeAllEditDialog () {
      // 清空表单
      for (let key in this.formData) {
        this.formData[key] = ''
      }
      this.$emit('closeAllEditDialog')
    },
    // 打开编辑弹出框,并将数据渲染到页面上去
    openEditDialogForm (row) {
      // row中已经有了表单所需的信息,不需要再次发请求拿数据
      this.allEditvisible = true
      this.formData.username = row.username
      this.formData.mobile = row.mobile
      this.formData.email = row.email
      this.formData.id = row.id
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
