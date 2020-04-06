<template>
  <div class="app-container">
    <el-table
      :data="this.currentPageData"
      border
      stripe
      size="small"
      @selection-change="this.selectRow"
    >
      <el-table-column label="状态" prop="isDep"></el-table-column>
      <el-table-column label="折旧期间" prop="depMonth"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="edit_click(scope.row)"
            >计提折旧</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="this.handleSizeChange"
      @current-change="this.handleCurrentChange"
      :current-page="this.currentPage"
      :page-sizes="[15, 30, 50, 100]"
      :page-size="this.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="this.tableData.length"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
    };
  },

  created() {
    this.fetchData();
  },
  computed: {
    currentPageData: function () {
      return this.tableData.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    },
  },
  methods: {
    fetchData() {
      const _this = this;
      getAllMenus().then((res) => {
        _this.tableData = res.data.menus;
      });
    },
    selectRow(selection, row) {
      const _this = this;
      this.selectList = [];
      selection.forEach((item) => {
        _this.selectList.push(item.id);
      });
    },

    handleSizeChange(val) {
      this.pageSize = val;
      console.log(val);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(val);
    },
  }
}
</script>

<style></style>
