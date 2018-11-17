<template>
  <div>
    <el-dialog
      v-loading="loading"
      title="旧件订单信息：No.000237"
      fullscreen
      center
      @close="closePartEditDialog"
      :visible="partEditvisible">
      <el-form
        label-position="right"
        label-width="130px"
        size="small"
        :model="partOrderDetail"
        ref="ruleForm">
        <el-row>
          <el-col :span='12'>
            <h2 class="carMessage"><i class="el-icon-tickets"></i><span>车辆信息</span></h2>
            <el-form-item class="input" label="车牌号:" prop="carNumber">
              <el-input type="text" v-model="partOrderDetail.carNumber"></el-input>
            </el-form-item>
            <el-form-item class="input" label="车架号:" prop="carFrameNumber">
              <el-input type="text" v-model="partOrderDetail.carFrameNumber"></el-input>
            </el-form-item>
            <el-form-item class="input" label="车辆型号:" prop="carModelNumber">
              <el-input type="text" v-model="partOrderDetail.carModelNumber"></el-input>
            </el-form-item>
            <el-form-item class="input" label="报案号:" prop="reportNo">
              <el-input type="text" v-model="partOrderDetail.reportNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span='12'>
            <h2 class="carMessage"><i class="el-icon-tickets"></i><span>取车信息</span></h2>
            <el-form-item class="input" label="取车联系人:" prop="takeCarContacts">
              <el-input type="text" v-model="partOrderDetail.takeCarContacts">
                <!-- 少了slot属性,无法向组件内插入东西的 -->
                <el-button slot="append" type="info" plain @click="openConnectPerson">常用联系人</el-button>
              </el-input>
            </el-form-item>
            <el-form-item class="input" label="联系人电话:" prop="takeCarContacts">
              <el-input type="text" v-model="partOrderDetail.takeCarContactNumber"></el-input>
            </el-form-item>
            <!-- 取车时间的数据是什么 -->
            <el-form-item class="input" label="取车时间:" prop="takeCarTime">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                style="width: 100%;"
                editable
                v-model="partOrderDetail.takeCarTime"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item class="input" label="取车地址:" prop="takeCarAddress">
              <el-input type="text" v-model="partOrderDetail.takeCarAddress"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :style="{marginTop: '10px'}">
          <h2 class="carMessage"><i class="el-icon-tickets"></i><span>配件信息</span></h2>
          <el-col :span='22'>
            <el-table
              stripe
              :style="{marginLeft: '50px',marginBottom: '50px'}"
              :data="partOrderDetail.carScrapOrderAutopartsList">
              <el-table-column
                label="配件分类">
                <template slot-scope="scope">
                  <span>{{ scope.row.partsCaregoryName }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="配件名称">
                <template slot-scope="scope">
                  <span>{{ scope.row.partsTypeName }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="零件编号">
                <template slot-scope="scope">
                  <span>{{ scope.row.partsNum }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="备注">
                <template slot-scope="scope">
                  <span>{{ scope.row.remark }}</span>
                </template>
              </el-table-column>
              <el-table-column
                width="500"
                label="配件照片">
                <template slot-scope="scope">
                  <div
                    :style="{display: 'inline-block'}"
                    v-for="item in scope.row.autoPartsPictures"
                    :key="item.id">
                    <img :style="{width: '100px', height: '60px',marginRight: '5px'}" :src="item.url" alt="配件照片">
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="编辑">
                <template slot-scope="scope">
                  <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-edit"
                  plain
                  @click="openEditReplacement(scope.row)"></el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='12'>
            <h2 class="carMessage"><i class="el-icon-tickets"></i><span>派单信息</span></h2>
            <!-- 表单拿到的值是是value的 -->
            <!-- 选中的业务员应保存在一个单独的字段里,是要写的一个字段 -->
            <el-form-item class="input" label="业务员:">
              <el-select
                v-for="item in SalesmanData"
                :key="item.id"
                v-model="partOrderDetail.agentUserid"
                placeholder="请选择业务员:">
                <el-option
                  :label="item.realName"
                  :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="input" label="派单备注">
               <el-input type="textarea" v-model="partOrderDetail.auditRemark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" :style="{marginBottom: '100px'}">
        <el-button type="primary" @click="abnormal">异常订单</el-button>
        <el-button type="primary" @click="temporaryStorage">暂存</el-button>
        <el-button type="primary" @click="orderNormal">派单</el-button>
      </div>
    </el-dialog>
    <!-- 常用联系人的一个弹出层 -->
    <el-dialog
      title="常用联系人"
      :visible="connectPersonVisible"
      :before-close="closeConnectPerson"
      >
      <el-row>
        <el-col>
          <el-table
          :stripe="true"
          :data="connectPersonTableData"
          lebal-width="50px"
          >
            <el-table-column
              label="姓名">
              <template slot-scope="scope">
                <el-radio v-model="radio" label="1">{{ '测试' +  scope.row.orderNo }}</el-radio>
              </template>
            </el-table-column>
            <el-table-column
              label="电话">
              <template slot-scope="scope">
                <span>{{ scope.row.orderNo }}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelConnectPerson">取 消</el-button>
        <el-button type="primary" @click="confirmConnectPerson">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 方案一:级联选择器,使用一个接口
    方案二:放开限制,使用两个接口 -->
    <el-dialog
      :style="{width: '70%'}"
      title="配件信息编辑"
      center
      @close="closeReplacementEditDialog"
      :visible="replacementEditvisible">
      <el-form :model="replacementEditData">
        <el-form-item class="input" label="配件大类:">
          <el-select
            :style="{width: '300px'}"
            v-for="item in bigReplacementClassData"
            :key="item.id"
            v-model="replacementEditData.partsCaregoryName"
            placeholder="请选择配件大类">
            <el-option
              :label="item.partsCategoryName"
              :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="input" label="配件名称:">
          <el-select
            :style="{width: '300px'}"
            v-for="item in bigReplacementNameData"
            :key="item.id"
            v-model="replacementEditData.partsTypeName"
            placeholder="请选择配件名称">
            <el-option
              :label="item.partsCategoryName"
              :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="block">
        <span class="demonstration">默认 click 触发子菜单</span>
        <el-cascader
          :options="options"
          v-model="selectedOptions"
          @change="handleChange">
        </el-cascader>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 处理时间格式
import moment from 'moment'
import { selectSalesman, selectConnectionPerson, selectReplacementClass, selectReplacementName, partOrdertemporaryStorage, normalPartOrder, abnormalPartOrder } from '@/api/order'
export default {
  props: {
    partEditvisible: {
      type: Boolean,
      default: false
    },
    partOrderDetail: {
      type: Object,
      default () {
        return {
          auditRemark: '',
          agentUserid: 0
        }
      }
    }
  },
  data () {
    return {
options: [{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }, {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio 单选框'
            }, {
              value: 'checkbox',
              label: 'Checkbox 多选框'
            }, {
              value: 'input',
              label: 'Input 输入框'
            }, {
              value: 'input-number',
              label: 'InputNumber 计数器'
            }, {
              value: 'select',
              label: 'Select 选择器'
            }, {
              value: 'cascader',
              label: 'Cascader 级联选择器'
            }, {
              value: 'switch',
              label: 'Switch 开关'
            }, {
              value: 'slider',
              label: 'Slider 滑块'
            }, {
              value: 'time-picker',
              label: 'TimePicker 时间选择器'
            }, {
              value: 'date-picker',
              label: 'DatePicker 日期选择器'
            }, {
              value: 'datetime-picker',
              label: 'DateTimePicker 日期时间选择器'
            }, {
              value: 'upload',
              label: 'Upload 上传'
            }, {
              value: 'rate',
              label: 'Rate 评分'
            }, {
              value: 'form',
              label: 'Form 表单'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table 表格'
            }, {
              value: 'tag',
              label: 'Tag 标签'
            }, {
              value: 'progress',
              label: 'Progress 进度条'
            }, {
              value: 'tree',
              label: 'Tree 树形控件'
            }, {
              value: 'pagination',
              label: 'Pagination 分页'
            }, {
              value: 'badge',
              label: 'Badge 标记'
            }]
          }, {
            value: 'notice',
            label: 'Notice',
            children: [{
              value: 'alert',
              label: 'Alert 警告'
            }, {
              value: 'loading',
              label: 'Loading 加载'
            }, {
              value: 'message',
              label: 'Message 消息提示'
            }, {
              value: 'message-box',
              label: 'MessageBox 弹框'
            }, {
              value: 'notification',
              label: 'Notification 通知'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'menu',
              label: 'NavMenu 导航菜单'
            }, {
              value: 'tabs',
              label: 'Tabs 标签页'
            }, {
              value: 'breadcrumb',
              label: 'Breadcrumb 面包屑'
            }, {
              value: 'dropdown',
              label: 'Dropdown 下拉菜单'
            }, {
              value: 'steps',
              label: 'Steps 步骤条'
            }]
          }, {
            value: 'others',
            label: 'Others',
            children: [{
              value: 'dialog',
              label: 'Dialog 对话框'
            }, {
              value: 'tooltip',
              label: 'Tooltip 文字提示'
            }, {
              value: 'popover',
              label: 'Popover 弹出框'
            }, {
              value: 'card',
              label: 'Card 卡片'
            }, {
              value: 'carousel',
              label: 'Carousel 走马灯'
            }, {
              value: 'collapse',
              label: 'Collapse 折叠面板'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '资源',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
        }],
        selectedOptions: [],
        selectedOptions2: [],
      // 数据加载呈现遮罩层
      loading: false,
      // 配件名称信息
      bigReplacementNameData: [],
      // 配件大类信息
      bigReplacementClassData: [],
      // 配件信息详情
      replacementEditData: [],
      // 配件编辑页面开关
      replacementEditvisible: false,
      // 业务员下拉菜单信息
      SalesmanData: [],
      // 常用联系人表格数据
      connectPersonTableData: [],
      // 常用联系人弹出层开关
      connectPersonVisible: false,
      // 配件信息表格数据
      tableReplacementData: [],
      tableData: []
    }
  },
  methods: {
      handleChange(value) {
        console.log(value);
      },
    // 点击x号关闭配件编辑页面
    closeReplacementEditDialog () {
      this.replacementEditvisible = false
    },
    // 配件信息编辑
    async openEditReplacement (data) {
      this.replacementEditvisible = true
      // 在配件编辑界面渲染数据
      this.replacementEditData = data
      console.log('配件信息')
      console.log(data)
      const response1 = await selectReplacementClass()
      this.bigReplacementClassData = response1.data.data
      // 暂且使用第二种方案,因为方案简单,categoryId暂定为1
      let getdata = {
        categoryId: 1
      }
      const response2 = await selectReplacementName(getdata)
      this.bigReplacementNameData = response2.data.data
      console.log('选择配件名称下拉框')
      console.log(this.bigReplacementNameData)
    },
    // 获取常用联系人信息(当页面被创建时,业务员的信息就应该被拿到)
    getConnectionPersonInfo () {

    },
    // 获取业务员信息(当页面被创建时,业务员的信息就应该被拿到)
    async getSalesmanInfo () {
      let data = {
        // 在旧件界面,定死为2
        businessType: 2,
        areaid: this.partOrderDetail.orderAreasId
      }
      const response = await selectSalesman(data)
      this.SalesmanData = response.data.data
    },
    // 点击x号,关闭常用联系人弹出层
    closeConnectPerson () {
      this.connectPersonVisible = false
    },
    confirmConnectPerson () {
      this.connectPersonVisible = false
    },
    cancelConnectPerson () {
      this.connectPersonVisible = false
    },
    // 打开常用联系人弹出层
    openConnectPerson () {
      this.connectPersonVisible = true
    },
    // 暂存功能功能
    async temporaryStorage () {
      let id = this.partOrderDetail.id
      // 处理一下时间格式
      this.partOrderDetail.takeCarTime = moment(this.partOrderDetail.takeCarTime).format('YYYY-MM-DD')
      let data = {
        carNumber: this.partOrderDetail.carNumber,
        carFrameNumber: this.partOrderDetail.carFrameNumber,
        carModelNumber: this.partOrderDetail.carModelNumber,
        reportNo: this.partOrderDetail.reportNo,
        takeCarContacts: this.partOrderDetail.takeCarContacts,
        takeCarContactNumber: this.partOrderDetail.takeCarContactNumber,
        takeCarTime: this.partOrderDetail.takeCarTime,
        takeCarAddress: this.partOrderDetail.takeCarAddress
      }
      // 发请求时添加遮罩层,防止用户多次点击
      this.loading = true
      const response = await partOrdertemporaryStorage(id, data)
      if (response.data.code === 200) {
        this.loading = false
        this.$message({
          message: '订单信息暂存成功',
          type: 'success'
        })
      } else {
        this.loading = false
        this.$message.error('订单信息暂存失败')
      }
      // 清空文本框
      for (let key in this.partOrderDetail) {
        this.partOrderDetail[key] = ''
      }
      this.$emit('temporaryStorage')
    },
    // 正常派单按钮
    async orderNormal () {
      let id = this.partOrderDetail.id
      this.partOrderDetail.takeCarTime = moment(this.partOrderDetail.takeCarTime).format('YYYY-MM-DD')
      let data = {
        auditorderStatus: 2,
        auditRemark: this.partOrderDetail.auditRemark,
        carNumber: this.partOrderDetail.carNumber,
        carFrameNumber: this.partOrderDetail.carFrameNumber,
        carModelNumber: this.partOrderDetail.carModelNumber,
        reportNo: this.partOrderDetail.reportNo,
        takeCarContacts: this.partOrderDetail.takeCarContacts,
        takeCarContactNumber: this.partOrderDetail.takeCarContactNumber,
        takeCarTime: this.partOrderDetail.takeCarTime,
        takeCarAddress: this.partOrderDetail.takeCarAddress
      }
      this.loading = true
      const response = await normalPartOrder(id, data)
      if (response.data.code === 200) {
        this.loading = false
        this.$message({
          message: '派单成功',
          type: 'success'
        })
      } else {
        this.loading = false
        this.$message.error('派单失败')
      }
      // 清空表单
      for (let key in this.partOrderDetail) {
        this.partOrderDetail[key] = ''
      }
      this.$emit('orderNormal')
    },
    // 异常订单按钮,关闭弹出框
    async abnormal () {
      console.log('查看当前表单数据')
      console.log(this.partOrderDetail)
      let id = this.partOrderDetail.id
      let data = {
        auditorderStatus: 8
      }
      this.loading = true
      const response = await abnormalPartOrder(id, data)
      if (response.data.code === 200) {
        this.loading = false
        this.$message({
          message: '异常订单处理成功',
          type: 'success'
        })
      } else {
        this.loading = false
        this.$message.error('异常订单处理失败')
      }
      // 清空表单
      for (let key in this.partOrderDetail) {
        this.partOrderDetail[key] = ''
      }
      this.$emit('abnormal')
    },
    // 叉号关闭弹出框
    closePartEditDialog () {
      // 清空表单
      for (let key in this.partOrderDetail) {
        this.partOrderDetail[key] = ''
      }
      this.$emit('closePartEditDialog')
    }
  },
  created () {
    this.getSalesmanInfo()
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
