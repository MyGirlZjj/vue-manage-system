<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i>药品信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="addYPXX">新增</el-button>
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="addBatch">批量新增</el-button>
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
                <!-- <el-select v-model="select_cate" placeholder="筛选省份" class="handle-select mr10">
                    <el-option key="1" label="广东省" value="广东省"></el-option>
                    <el-option key="2" label="湖南省" value="湖南省"></el-option>
                </el-select> -->
                <el-input v-model="select_word" placeholder="搜索编码信息" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div>
            <el-table stripe :data="data" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="35" align="center"></el-table-column>
                <!-- <el-table-column prop="id" label="id" v-show="false" width="150"></el-table-column> -->
                <el-table-column prop="bianma" label="编码" sortable width="120"></el-table-column>
                <el-table-column prop="pinming" label="品名" width="120"></el-table-column>
                <el-table-column prop="guige" label="规格" width="80"></el-table-column>
                <el-table-column prop="pihao" label="批号" width="120"></el-table-column>
                <!-- <el-table-column prop="pihao" label="批号" :formatter="formatter" width="120"></el-table-column> -->
                <el-table-column prop="youxiaoqi" label="有效期" width="80"></el-table-column>
                <el-table-column prop="danwei" label="单位" width="50"></el-table-column>
                <el-table-column prop="danjia" label="单价" width="80"></el-table-column>
                <el-table-column prop="shengchanchangjia" label="生产厂家" width="120"></el-table-column>
                <el-table-column prop="pizhunwenhao" label="批准文号" width="120"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="addYpxxToCret(scope.$index, scope.row)">添加</el-button>
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
                </el-pagination>
            </div>
        </div>

        <!-- 上传excel弹出框 -->
        <el-dialog :visible.sync="uploadVisible" width="30%">
            <el-upload
                class="upload-demo"
                drag
                action="String"
                accept=".xlsx, .xls"
                :http-request="uploadFile"
                :on-change="handleChange"
                :auto-upload="false"
                >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            <span slot="footer" class="dialog-footer">
                <el-button @click="uploadVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitUpload">确 定</el-button>
            </span>
        </el-dialog>


        <!-- 编辑弹出框 -->
        <el-dialog title="编辑药品信息" :visible.sync="editVisible" width="40%">
            <el-form ref="form" :model="form" label-width="80px">
                <!-- <el-form-item label="日期">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                </el-form-item> -->
                <!-- <el-form-item label="id"><el-input v-model="form.id"></el-input></el-form-item> -->
                <el-form-item label="编码"><el-input v-model="form.bianma"></el-input></el-form-item>
                <el-form-item label="品名"><el-input v-model="form.pinming"></el-input></el-form-item>
                <el-form-item label="规格"><el-input v-model="form.guige"></el-input></el-form-item>
                <el-form-item label="批号"><el-input v-model="form.pihao"></el-input></el-form-item>
                <!-- <el-form-item label="有效期"><el-input v-model="form.youxiaoqi"></el-input></el-form-item> -->
                <el-form-item label="有效期">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.youxiaoqi" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <!-- <el-form-item label="单位"><el-input v-model="form.danwei"></el-input></el-form-item> -->
                <el-form-item label="单位">
                    <el-select v-model="form.danwei">
                        <el-option value="盒">盒</el-option>
                        <el-option value="袋">袋</el-option>
                        <el-option value="支">支</el-option>
                        <el-option value="瓶">瓶</el-option>
                        <el-option value="桶">桶</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="单价"><el-input v-model="form.danjia"></el-input></el-form-item>
                <el-form-item label="生产厂家"><el-input v-model="form.shengchanchangjia"></el-input></el-form-item>
                <el-form-item label="批准文号"><el-input v-model="form.pizhunwenhao"></el-input></el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteYpxx">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import { getUrl } from '../../api/ypxx'
    import { mapGetters,mapActions,mapState } from 'vuex'
    export default {
        name: 'yaopinxinxi',
        data() {
            return {
                url: './vuetable.json',
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                delAllData: [],
                delYpxxMc:[],
                fileList: [],
                formData: "",
                uploadVisible: false,
                editVisible: false,
                delVisible: false,
                form: {
                    id:'',
                    bianma: '',
                    pinming: '',
                    guige: '',
                    pihao: '',
                    youxiaoqi: '',
                    danwei: '',
                    danjia: '',
                    shengchanchangjia: '',
                    pizhunwenhao: ''
                },
                idx: -1,
                id: -1
            }
        },
        created() {
            this.getData();
        },
        computed: {
            ...mapGetters({
                cartNum: 'cart/cartNum',
                hasGoods: 'cart/hasGoods'
            }),
            data() {
                return this.tableData.filter((d) => {
                   return d
                })
            }
        },
        methods: {
            //组件构建方法
            ...mapActions({
                'createGoodsToCart': 'cart/create_goods_to_cart',
                'addGoodsFromCart': 'cart/add_goods_from_cart'
            }),
            addYpxxToCret(index,row){
                 //判断这件商品是否在购物车内
                let hasGoods = this.hasGoods(row)
                if (hasGoods) {
                    //有，该商品的数量+1
                    this.addGoodsFromCart(row)
                }else {
                    //没有，购物车创建该商品
                    row.num = 1
                    this.createGoodsToCart(row)
                }

                // let target = this.$refs.thumb
                // this.$emit('addCart', target)
            },
            delFile() {
                this.fileList = [];
            },
            uploadFile(file) {
                this.formData.append("file", file.file);
            },
            handleChange(file, fileList) {
                this.fileList = fileList;
            },
            getUploadUrl(){
                return getUrl().uploadExcel
            },
            submitUpload() {
                console.log(this.fileList)
                let formData = new FormData();
                formData.append("file", this.fileList[0].raw);
                let config ={
                        headers: {
                        "Content-Type": "multipart/form-data;charset=utf-8"
                    }
                }

                this.$axios.post(
                    getUrl().uploadExcel,
                    formData,
                    config                    
                )
                .then(res => {
                    console.log(res)
                    if (res.status == 200) {
                        // alert("导入成功!");
                        this.$message.success('批量上传成功');
                    } else {
                        // alert(res.data.message + "," + res.data.data);
                        this.$message.error('批量上传成功失败，请重试！');
                    }
                    this.getData();
                    this.uploadVisible = false
                })
                .catch(err => {
                    this.$message.error('服务器出现异常，请联系管理员！');
                    this.uploadVisible = false
                    console.log(err);
                });
            },
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            // 获取 easy-mock 的模拟数据
            getData() {
                // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
                // if (process.env.NODE_ENV === 'development') {
                //     this.url = '/ms/table/list';
                // };
                const url = getUrl().queryYpxx
                this.$axios.post(url, {
                    page: this.cur_page
                }).then((res) => {
                    this.tableData = res.data;
                })
            },
            search() {
                 //查询
                const queryUrl = getUrl().queryYpxxByBianMa
                this.$axios.post(queryUrl, {
                    formData: this.select_word
                }).then((res) => {
                    console.log(res)
                    if(res.status == 200){
                        // this.$message.success(`搜索药品编码【${this.select_word}】成功`);
                        this.tableData = res.data;
                    }else{
                        this.$message.error(`搜索药品编码【${this.select_word}】失败`);
                    }
                })
                
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                this.idx = index;
                this.id = row.id;
                this.form = {
                    id: row.id,
                    bianma: row.bianma,
                    pinming: row.pinming,
                    guige: row.guige,
                    pihao: row.pihao,
                    youxiaoqi: row.youxiaoqi,
                    danwei: row.danwei,
                    danjia: row.danjia,
                    shengchanchangjia: row.shengchanchangjia,
                    pizhunwenhao: row.pizhunwenhao
                }
                this.editVisible = true;
            },
            addYPXX(){
                this.form ={
                    id:'',
                    bianma: '',
                    pinming: '',
                    guige: '',
                    pihao: '',
                    youxiaoqi: '',
                    danwei: '',
                    danjia: '',
                    shengchanchangjia: '',
                    pizhunwenhao: ''
                }
                this.editVisible = true;
            },
            addBatch(){
                // this.$message.success(`批量新增成功`);
                this.uploadVisible = true
            },
            handleDelete(index, row) {
                this.idx = index;
                this.id = row.id;
                this.delYpxxMc.push(row.pinming)
                this.delAllData.push(row)
                this.delVisible = true;
            },
            delAll() {
                let select = this.multipleSelection
                let length = select.length
                if(select.length >0){
                    for(let i = 0;i < length;i++){
                        let row = select[i]
                        this.delAllData.push(row)
                        this.delYpxxMc.push(row.pinming)
                    }
                    
                    this.delVisible = true 
                }else{
                    this.$message.error(`请选择要删除的信息`);
                }
                
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 保存编辑
            saveEdit() {
                this.editVisible = false;
                // TODO  调用后台接口 (保存或修改)
                this.url = getUrl().addOrUpadteYpxx
                this.$axios.post(this.url,{
                    formData: this.form
                }).then((res) => {
                    const editData = res.data
                    if(res.status == 200){
                        if(this.idx >= 0){
                            this.$message.success(`修改药品【${editData.pinming}】成功`);
                        }else{
                            this.$message.success(`新增药品【${editData.pinming}】成功`);
                        }
                    }else{
                        if(this.idx >= 0){
                            this.$message.error(`修改药品【${editData.pinming}】失败`);
                        }else{
                            this.$message.error(`新增药品【${editData.pinming}】失败`);
                        }
                    }
                   this.getData();
                })
            },
            // 确定删除
            deleteYpxx(){
                this.delVisible = false;
                const delUrl = getUrl().deleteYpxx
                console.log(this.delAllData)
                this.$axios.post(delUrl, {
                    formData: this.delAllData
                }).then((res) => {
                    if(res.status == 200){
                        this.$message.success(`删除药品【${this.delYpxxMc.join('、')}】成功`);
                    }else{
                        this.$message.error(`删除药品【${this.delYpxxMc.join('、')}】失败`);
                    }
                    this.delAllData = []
                    this.delYpxxMc = []
                    this.getData();
                })
            }
        }
    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .table{
        width: 100%;
        font-size: 14px;
    }
    .red{
        color: #ff0000;
    }
    .mr10{
        margin-right: 10px;
    }
</style>
