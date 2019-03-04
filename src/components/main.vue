<template>
<div class="wrapper">
   <div class=main >
      <div class="main-left" >
         <h3>DFairy的网址收藏大全</h3>
         <ul class="sub-list">
            <li v-for="(term,index) in list" :key="index">
               <a :href="'#'+term.id">{{term.title}}</a>
            </li>
         </ul>
      </div>
      <div class="main-right">
         <a :id="item.id" class="main-list" v-for="(item,index) in list" :key="index">
            <h2><span class="title">{{item.title}}</span></h2>
            <ul class="list" >
               <li v-for="(items,id) in item.children" :key="id">
                  <a :href="items.link" target="blank">
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
import {lists} from '../common/js/data';
import BScroll from 'better-scroll'
export default {
   data(){
      return{
         list:lists()
      }
   },
   created(){
       /* eslint-disable */ 
      let wrapper = document.querySelector('.wrapper')
      let scroll = new BScroll(wrapper)
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