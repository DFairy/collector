<template>
   <div class="main" >
      <div class="main-left" >
         <h3>DFairy的网址收藏大全</h3>
         <ul class="sub-list">
            <li v-for="(term,index) in list" :key="index">
               <a :href="'#'+index">{{term.title}}</a>
            </li>
         </ul>
      </div>
      <div class="main-right" ref="menuWrapper">
         <div>
            <div class="operateButton">
               <el-button type="primary" size="small" @click="dialogVisible = true">添加分类</el-button>
               <el-button type="" size="small" @click="dialogVisibledel = true">删除分类</el-button>
               <el-button type="primary" size="small" @click="dialogVisibleWeb = true">添加网址</el-button>
               <el-button type="" size="small" @click="dialogVisibleDelWeb = true">删除网址</el-button>
            </div>

            <el-dialog
            title="添加分类"
            :visible.sync="dialogVisible"
            width="30%">
               <el-form :model="form">
                  <el-form-item label="分类名称" :label-width="formLabelWidth">
                     <el-input v-model="form.name" autocomplete="off"></el-input>
                  </el-form-item>
               </el-form>
               <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="addTitle">确 定</el-button>
               </span>
            </el-dialog>

            <el-dialog
            title="删除分类"
            :visible.sync="dialogVisibledel"
            width="30%">
               <el-form :model="form1">
                  <el-form-item label="分类名称" filterable :label-width="formLabelWidth">
                     <el-select v-model="form1.title" placeholder="请选择分类名称">
                     <el-option v-for="item in list" 
                        :key="item.title" 
                        :label="item.title" 
                        :value="item.title">
                     </el-option>
                     </el-select>
                  </el-form-item>
               </el-form>
               <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisibledel = false">取 消</el-button>
                  <el-button type="primary" @click="delConfirm">确 定</el-button>
               </span>
            </el-dialog>

            <el-dialog
            title="添加网址"
            :visible.sync="dialogVisibleWeb"
            width="30%">
               <el-form :model="form2">
                  <el-form-item label="分类名称" :label-width="formLabelWidth">                    
                     <el-select v-model="form2.title" filterable placeholder="请选择分类名称">
                     <el-option v-for="item in list" 
                        :key="item.title" 
                        :label="item.title" 
                        :value="item.title">
                     </el-option>
                     </el-select>
                  </el-form-item>
                  <el-form-item label="网址标题" :label-width="formLabelWidth">
                     <el-input v-model="form2.name" autocomplete="off"></el-input>
                  </el-form-item>
                   <el-form-item label="网址链接" :label-width="formLabelWidth">
                     <el-input v-model="form2.link" autocomplete="off"></el-input>
                  </el-form-item>                 
                  <el-form-item label="描述" :label-width="formLabelWidth">
                     <el-input v-model="form2.description" autocomplete="off"></el-input>
                  </el-form-item>
               </el-form>
               <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisibleWeb = false">取 消</el-button>
                  <el-button type="primary" @click="addWeb">确 定</el-button>
               </span>
            </el-dialog>

            <el-dialog
            title="删除网址"
            :visible.sync="dialogVisibleDelWeb"
            width="30%">
               <el-form :model="form3">
                  <el-form-item label="分类名称" :label-width="formLabelWidth">                    
                     <el-select @change='changeValue' v-model="form3.title" filterable placeholder="请选择分类名称">
                     <el-option v-for="item in list" 
                        :key="item.title" 
                        :label="item.title" 
                        :value="item.title">
                     </el-option>
                     </el-select>
                  </el-form-item>
                  <el-form-item label="网址标题" :label-width="formLabelWidth">                    
                     <el-select v-model="form3.name" filterable placeholder="请选择标题">
                     <el-option  v-for="item in listName" 
                        :key="item.title" 
                        :label="item.title" 
                        :value="item.title">
                     </el-option>
                     </el-select>
                  </el-form-item>
                 
               </el-form>
               <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisibleDelWeb = false">取 消</el-button>
                  <el-button type="primary" @click="delWeb">确 定</el-button>
               </span>
            </el-dialog>
         </div>
         <div class="scroll">
            <a :id="index" class="main-list" v-for="(item,index) in list" :key="index">
               <h2><span class="title">{{item.title}}</span></h2>
               <ul class="list" >
                  <li v-for="(items,id) in item.children" :key="id">
                     <a :href="items.link" target="_blank">
                        <div class="list-title">{{items.title}}</div>
                        <div class="list-content">{{items.description}}</div>
                     </a>
                  </li>
               </ul>
            </a>
         </div>        
      </div> 
   </div>
</template>

<script>
// import {lists} from '../common/js/data';
// import BScroll from 'better-scroll'
export default {
   data(){
      return{
         host:'http://106.13.94.82:3000',
         list:{},
         listName:[],
         dialogVisible:false,
         dialogVisibledel:false,
         dialogVisibleWeb:false,
         dialogVisibleDelWeb:false,
         form:{
            name:''
         },
         form1:{
            title:''
         },
         form2:{
            name:'',
            link:'',
            description:'',
            title:''
         },
         form3:{
            title:'',
            name:''
         },
         formLabelWidth: '80px',
         // form3List:[]        
      }
   },
   created(){
      this.initData()
      console.log(process.env.BASE_URL)
   },
   methods:{
       tip(type,msg){
            this.$message({
               message: msg,
               type: type
            });
         },
      initData(){
         // axios.post(`/zhang`).then((res)=>{
         //    console.log(res) 
         //    /* jshint ignore:start */ 
         //    // res.data.status=='0'?this.list=res.data.result:this.tip('error','网络加载失败，请刷新网络')
         // })
         this.$api.list.listDetail().then((res)=>{
             res.data.status=='0'?this.list=res.data.result:this.tip('error','网络加载失败，请刷新网络')
         })
      },
      changeValue(val){
         console.log(val)
         let value=this.list.filter(item=>{           
            if(item.title==val)
            return item
         })
         this.listName=value[0].children
      },
      addTitle(){
        this.$api.list.addTitle({titleItem:this.form.name}).then((res)=>{
           res.data.status=='0'?this.tip('success','添加成功'):this.tip('error','添加失败')
           this.initData()
         })
         this.dialogVisible=false
      },
      delConfirm(){
         this.$api.list.delItem({titleItem:this.form1.title}).then((res)=>{
            res.data.status=='0'?this.tip('success','删除成功'):this.tip('error','删除失败')
            this.initData()
         })
         this.dialogVisibledel=false
      },
      addWeb(){
         this.$api.list.addWeb({
            titleItem:this.form2.title,
            link:this.form2.link,
            name:this.form2.name,
            description:this.form2.description}).then((res)=>{
               res.data.status=='0'?this.tip('success','添加成功'):this.tip('error','添加失败')
               this.initData()
         })
         this.dialogVisibleWeb=false
      },
      delWeb(){
         this.$api.list.addWeb({
            titleItem:this.form3.title,
            name:this.form3.name}).then((res)=>{
               res.data.status=='0'?this.tip('success','删除成功'):this.tip('error','删除失败')
               this.initData()
         })
         this.dialogVisibleDelWeb=false
      }
   }
}
</script>

<style lang='less' scoped>
.main{
   width: 100%;
   height: 100%;
   overflow: hidden;
   display: flex;
   justify-content: flex-start;
   background: url('../common/img/bg.jpg') no-repeat;
   background-position: center center;
   background-size: cover;
   background-attachment: fixed;
   // -webkit-overflow-scrolling: touch;
   .main-left{
      flex: 0 0 200px;
      flex-direction:column;
      width: 200px;
      margin-right: 20px;
      color: #fff;
      overflow-y: auto;
      h3{
         width: 100%;
         height: 60px;
         line-height: 60px;
         font-size: 15px;
         text-align: center;
         font-weight: bold;
         background: #E4393C
      }
      .sub-list{
         width: 100%;
         li{
            width: 100%;
            height: 40px;
            padding-left:30px; 
            // text-align: center;
            line-height: 40px;
            color: #fff;
            background: #29292b;
            font-size: 14px;
            border-bottom: 1px solid rgba(255,255,255,0.1);
            a{
               width: 100%;
               height: 100%;
               color: #fff;
               display: inline-block;
               &:hover{
                  color: #ffd101
               }
            }
         }
      }
   }
   .main-right{
      width: 100%;
      height: 100%;
      padding: 20px;
      flex: 1;
      overflow-y: auto;
      transition: all 1s ease-in;
      .operateButton{
         margin: 10px;
         text-align: right;
      }
      .main-list{
         width: 100%;
         height: 100%;
         // display: inline-block;
         // margin-bottom: 8px;
         h2{
            font-size: 14px;
            width: 100%;
            position: relative;
            &::before{
               content:'';
               position: absolute;
               right: 0;
               top: 50%;
               width: 100%;
               height: 1px;
               border-top: 1px dashed #ddd;
            }
            .title{
               z-index: 1;
               display: inline-block;
               position: relative;
               left: -10px;
               background: #E4393C;
               color: #fff;
               height: 28px;
               font-weight: bold;
               line-height: 28px;
               padding: 0 15px 0 20px;
               &::after{
                  content:'';
                  display: block;
                  position: absolute;
                  top: 28px;
                  left: 0;
                  border-right: 10px solid #9a0e1c;
                  border-bottom: 10px dashed transparent;
               }
            }
         }
         .list{
            padding: 10px 0 0 0;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: flex-start;
            // align-items: center;
            li{
               width: 150px;
               // min-width: 200px;
               height: 50px;
               border-radius: 5px;
               padding: 5px;
               margin-bottom: 10px;
               margin-right: 10px;
               box-shadow: 3px 3px 0 rgba(0,0,0,0.08);
               border: 1px solid #f5f5f5;
               transition: all .2s ease-in;
               background: #f5f5f5;
               &:hover{
                  transform: translateY(-5px);
                  
               }
               .list-title{               
                  margin-bottom: 5px;
                  font-weight: bold;
                  color: #3273dc;
                  font-size: 14px;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
               }
               .list-content{
                  font-size: 12px;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
               }
            }
         }
      }
   }  
}
@media only screen and (max-width: 700px) {
   .main .main-left { 
      display: none; 
   }
}
</style>