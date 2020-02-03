<template>
  <el-table 
  :data="this.tableData"
  border stripe size="small">
      <el-table-column label="角色" prop="name" >
          
      </el-table-column>
      <el-table-column label="角色中文名" prop="nameZh" >
          
      </el-table-column>
      <el-table-column label="备注" prop="remark" >
          
      </el-table-column>
  </el-table>
</template>

<script>
export default {
    name:"UniversalTable",
    props:{
      tableData:null
    },
}
</script>

<style>

</style>