<template>
  <div class="app-container">
    <el-button type="primary">新增</el-button>
    <el-button type="primary">编辑</el-button>
    <el-button type="primary">删除</el-button>
    <hr>
    <el-tree
      :data="this.treeData"
      :default-checked-keys="this.checkedData"
      show-checkbox="true"
      check-strictly="true"
    >

    </el-tree>

    

  </div>
</template>

<script>

import {allTreeCategory} from "@/api/category"

export default {
  data(){
    return{
      treeData:[],
      checkedkeys:[],

      
    }
  },
  created(){
    this.fetchData();
  },
  methods:{
    fetchData(){
      const _this=this;
      allTreeCategory().then(res=>{
        
        _this.treeData=res.data.categories;
      })
    }
  }
}
</script>

<style>

</style>