<template>
  <div class="ibi-transfer">
    <div class="transfer-left">
      <div class="transfer-left-head">
        <span>选择部门</span>
        <el-checkbox v-model="checked"  @change="checkedAll">全选</el-checkbox>
      </div>
      <div class="left-context">
        <el-input
          size="small"
          class="search"
          placeholder="请输入"
          v-model="filterText">
<!--          <i slot="suffix" class="el-input__icon el-icon-date"></i>-->
        </el-input>
        <div class="tree">
            <el-tree
                ref="tree"
                node-key="id"
                :props="defaultProps"
                :data="deptList"
                show-checkbox
                :filter-node-method="filterNode"
                @check="itemCheck"
                >
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <span v-if="data.children && data.children.length >0 " class="close-node" >
                  {{node.expanded?'收起':'展开'}}
                </span>
              </span>
            </el-tree>
        </div>
      </div>
    </div>
    <div class="transfer-button">
      <button class="button"  :class="!toRight?'btn-disable':''" :disabled="!toRight" @click="gotoRight">加入右侧 >></button>
      <button  class="button"  :class="!toLeft?'btn-disable':''" :disabled="!toLeft" @click="gotoLeft">&#60; &#60; 加入左侧</button>
    </div>
    <div id="transfer-right" class="transfer-left">
      <div class="transfer-left-head">
        <span>选择部门</span>
        <el-checkbox v-model="checked1" @change="checkedAllLeft">全选</el-checkbox>
      </div>
      <div class="left-context">
        <el-input
          size="small"
          class="search"
          placeholder="请输入"
          v-model="filterText1"
          >
          <!--          <i slot="suffix" class="el-input__icon el-icon-date"></i>-->
        </el-input>
        <div class="tree">
          <el-tree
              ref="tree1"
              node-key="id"
              :props="defaultProps"
              :data="checkedTree"
              show-checkbox
              default-expand-all
              :filter-node-method="filterNodeLeft"
              @check="handleRightTreeCheck"
          >
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <span v-if="data.children && data.children.length >0 " class="close-node" >
                  {{node.expanded?'收起':'展开'}}
                </span>
              </span>
          </el-tree>
        </div>
      </div>
    </div>

  </div>
</template>
<script>

export default {
  name: 'vue-tree-transfer',
  data () {
    return {
      dictArry: [],
      enableChecked: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      deptList: [],
      filterText: '',
      filterText1: '',
      openclose: false,
      checked: false,
      checked1: false,
      alreadyChecked: [], // 被选中的节点数组
      preCheckedTree: [], // 被选中的树
      checkedTree: [],
      toRight: false, // 移入右侧
      toLeft: false, // 移入左侧
      checkedNode: [], // 选中节点左侧
      rightCheckedNodes: [] // 右侧树选中的节点
    }
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    },
    filterText1 (val) {
      this.$refs.tree1.filter(val)
    },
    checkedNode: {
      handler (newArray, oldArray) {
        this.toRight = newArray.length > 0
      },
      deep: true // 深度监听数组内部元素的变化
    },
    rightCheckedNodes: {
      handler (newVal) {
        this.toLeft = newVal.length > 0 // 当选中节点数大于 0 时,toLeft 为 true
      },
      deep: true
    }
  },
  mounted () {
    this.deptList = [{
      id: '1fat',
      label: '一部',
      children: [
        {
          id: 13,
          label: '一部一处',
          name: '一部一处',
          parentId: 1
        },
        {
          id: 15,
          label: '一部三处',
          name: '一部三处',
          parentId: 1
        },
        {
          id: 16,
          label: '一部四处',
          name: '一部四处',
          parentId: 1
        },
        {
          id: 17,
          label: '一部七处',
          name: '一部七处',
          parentId: 1
        },
        {
          id: 18,
          label: '一部八处',
          name: '一部八处',
          parentId: 1
        },
        {
          id: 184,
          label: '一部五处',
          name: '一部五处',
          parentId: 1
        },
        {
          id: 187,
          label: '一部一处一',
          name: '一部一处一',
          parentId: 1
        },
        {
          id: 195,
          label: '一部五处一',
          name: '一部五处一',
          parentId: 1
        },
        {
          id: 215,
          label: '一部五处三',
          name: '一部五处三',
          parentId: 1
        },
        {
          id: 226,
          label: '一部五处四',
          name: '一部五处四',
          parentId: 1
        },
        {
          id: 251,
          label: '一部六处',
          name: '一部六处',
          parentId: 1
        }
      ],
      name: '一部',
      open: false
    }]
  },
  methods: {
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    filterNodeLeft (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    checkedAll () {
      if (this.checked) {
        // 全选
        this.$refs.tree.setCheckedNodes(this.deptList)
        this.checkedNode = this.$refs.tree.getCheckedNodes()
      } else {
        // 取消选中
        this.$refs.tree.setCheckedKeys([])
      }
    },
    checkedAllLeft () {
      if (this.checked1) {
        // 全选
        this.$refs.tree1.setCheckedNodes(this.checkedTree)
        this.rightCheckedNodes = this.$refs.tree1.getCheckedNodes()
      } else {
        // 取消选中
        this.$refs.tree1.setCheckedKeys([])
      }
    },
    itemCheck (value, node, indeterminate) {
      this.checkedNode = node.checkedNodes // 包含父节点,子节点
    },
    handleRightTreeCheck (value, node) {
      this.rightCheckedNodes = node.checkedNodes
    },
    deepCopy (obj) {
      if (typeof obj !== 'object' || obj === null) {
        return obj // 如果不是对象或者是null，直接返回
      }

      const copy = Array.isArray(obj) ? [] : {} // 判断是否为数组

      for (const key in obj) {
        // eslint-disable-next-line no-prototype-builtins
        if (obj.hasOwnProperty(key)) {
          copy[key] = this.deepCopy(obj[key]) // 递归拷贝
        }
      }

      return copy
    },
    gotoRight () {
      this.checked = false
      const newNode = this.deepCopy(this.deptList)
      this.checkedNode.forEach(item => {
        if (item.children && item.children.length > 0) {
          // 则该item为父节点
          // 若为父节点,则先看待接受数组有没有该节点
          const targetIndex = this.checkedTree.findIndex(i => i.id === item.id)
          if (targetIndex > -1) {
            // 若存在
            this.checkedTree[targetIndex].children.push(...item.children)
          } else {
            this.checkedTree.push(item)
          }
          // 在 this.deptList 中删除该父节点
          this.deptList = this.deptList.filter(deptItem => deptItem.id !== item.id)
        } else {
          const fatherNodeId = item.parentId + 'fat'
          const targetIndex = this.checkedTree.findIndex(i => i.id === fatherNodeId)
          // 先确定checkedTree是否存在该节点的父节点
          if (targetIndex > -1) {
            // 若存在
            if (!this.checkedTree[targetIndex].children.find(child => child.id === item.id)) {
              this.checkedTree[targetIndex].children.push(item)
            }
          } else {
            const fatherNode = newNode.find(item => item.id === fatherNodeId)
            if (fatherNode) {
              fatherNode.children = []
              // 借一个空壳父节点
              fatherNode.children.push(item)
              this.checkedTree.push(fatherNode)
            }
          }
          // 在 this.deptList 中的相应父节点的 children 中删除该子节点
          this.deptList.forEach(deptItem => {
            if (deptItem.children) {
              deptItem.children = deptItem.children.filter(child => child.id !== item.id)
            }
          })
        }
        this.updateParentCheckedState(item.parentId)
        this.checkedNode = []
      })
    },
    updateParentCheckedState (parentId) {
      const parentNode = this.deptList.find(node => node.id === parentId + 'fat')
      if (parentNode) {
        const checkedChildren = parentNode.children.filter(child => this.checkedNode.find(c => c.id === child.id))
        if (checkedChildren.length === 0) {
          // 没有选中的子节点,将父节点设为未选中状态
          this.$refs.tree.setChecked(parentNode, false)
        } else if (checkedChildren.length === parentNode.children.length) {
          // 所有子节点都被选中,将父节点设为完全选中状态
          this.$refs.tree.setChecked(parentNode, true)
        } else {
          // 部分子节点被选中,将父节点设为半选中状态
          this.$refs.tree.setCheckedKeys([...this.$refs.tree.getCheckedKeys(), parentNode.id])
        }
      }
    },
    gotoLeft () {
      this.checked1 = false
      const newNode = this.deepCopy(this.checkedTree)
      this.rightCheckedNodes.forEach(item => {
        let targetIndex = this.deptList.findIndex(i => i.id === item.id)
        if (item.children && item.children.length > 0) {
          // 则该item为父节点
          if (targetIndex > -1) {
            // 若存在
            this.deptList[targetIndex].children.push(...item.children)
          } else {
            // 检查是否有重复的父节点
            if (!this.deptList.find(node => node.id === item.id)) {
              this.deptList.push(item)
            }
          }
        } else {
          const fatherNodeId = item.parentId + 'fat'
          targetIndex = this.deptList.findIndex(i => i.id === fatherNodeId)
          // 先确定deptList是否存在该节点的父节点
          if (targetIndex > -1) {
            // 若存在
            if (!this.deptList[targetIndex].children.find(child => child.id === item.id)) {
              this.deptList[targetIndex].children.push(item)
            }
          } else {
            const fatherNode = newNode.find(item => item.id === fatherNodeId)
            if (fatherNode) {
              fatherNode.children = []
              // 借一个空壳父节点
              fatherNode.children.push(item)
              this.deptList.push(fatherNode)
            }
          }
        }
        // 在 this.checkedTree 中的相应父节点的 children 中删除该子节点
        this.checkedTree.forEach(checkedItem => {
          if (checkedItem.children) {
            checkedItem.children = checkedItem.children.filter(child => child.id !== item.id)
          }
        })
        // 在 this.checkedTree 中删除该父节点
        this.checkedTree = this.checkedTree.filter(checkedItem => checkedItem.id !== item.id)
        this.updateParentCheckedState(item.parentId)
      })
      this.rightCheckedNodes = []
    }
  }
}

</script>

<style scoped lang="scss">
.ibi-transfer{
  box-sizing: border-box;
  padding: 10px;
  height: 600px;
  width: 100%;

  //background-color: #42b983;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .transfer-left{
    width: 40%;
    height: 100%;
    border: 1px solid #EFEFEF;
    background-color: #ffffff;
    .transfer-left-head{
      height: 32px;
      width: 100%;
      background-color: #EFEFEF;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      color: #6C6C6C;
      padding: 0 5px;
    }
    .left-context{
      height: calc(100% - 32px);
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;

      .search{
        width: 90%;
        margin-top: 10px;

      }
      .table{
        width: 90%;
        padding-bottom: 15px;
        margin-top: 20px;
        .pagination{
          width: 100%;
        }
      }
      .tree{
        margin-top: 20px;
        margin-left: 20px;
        overflow-y: auto;
        width: calc(100% - 20px );
        .custom-tree-node{
          display: flex;
          justify-content: space-between;
          width: 190px;
        }
        .close-node{
          color: rgba(31,99,253,1);
          font-size: 14px;
          //margin-left: 50px;
        }
      }
    }
  }
  .transfer-button{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-left: 15px;
    margin-right: 15px;

    .button{
      cursor: pointer;
      //width: 80px;
      height: 30px;
      background-color:#EFEFEF;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #101010;
      font-size: 14px;
      padding: 4px 2px;
      border-radius: 4px;
      border: none;
      &:hover{
        background-color: #306CF6;
        color: #FFFFFF;
      }
      &:nth-child(1){
        margin-bottom: 20px;
      }

    }
    .btn-disable{
      background-color:#EFEFEF;
      color: #d5d4d4;
      cursor: no-drop;
      &:hover{

        background-color:#EFEFEF;
        color: #d5d4d4;
      }
    }

  }
}

</style>
