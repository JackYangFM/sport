<style lang="less" >

</style>

<template>
 <div class="baseTable" style="margin-top: 8px">
   <Table :loading="loading"
          v-bind="$props"
          :row-class-name="rowClassName"
          :data="props_data?props_data:[]"
          :size="size"
          ref="basetable"
          @on-selection-change="selectionChange"
          :method="method"
          ></Table>
          <!-- :data="props_data" -->
          <!-- :data="props_data?props_data:[]" -->
   <div style="padding:15px;overflow: hidden;background: #fff">
     <div style="float: right;">
       <Page
             :total="props_total"
             :current="props_pageNo"
             :show-total="showTotal"
             :show-sizer="showSize"
             :show-elevator="showElevator"
             :page-size-opts="pageSizeOpt"
             @on-change="changedNo"
             @on-page-size-change="changedSize"></Page>
     </div>
     <!--show-sizer-->
     <!--:page-size-opts="pageSizeOpt"-->
   </div>
 </div>
</template>

<script>
    import { queryApi,queryApiGet } from "@/service/api"
    export default {
        props:{
          num:{
            default: ''
          },
          stripe:{
            type: Boolean,
            default: true
          },
          border:{
            type: Boolean,
            default: true
          },
          init: {
            type: Boolean,
            default: true
          },
          height: {
            type: [Number, String],
            // default: 520
          },
          mock:{
            type: Boolean,
            default: false
          },
          url: {
            type: String
          },
          size:{
            type: String,
            default: 'small'
          },
          showTotal:{
            type: Boolean,
            default: false
          },
          showSize:{
            type: Boolean,
            default: false
          },
          showElevator:{
            type: Boolean,
            default: false
          },
          pageNow: {
            type: Number,
            default: 1
          },
          pageSize: {
            type: Number,
            default: 10,
          },
          columns: {
            type: Array,
            default() {
              return [];
            }
          },
          pageSizeOpt:{
            type: Array,
            default() {
              return [10,20,30];
            }
          },
          data: {
            type: Array,
            default() {
              return [];
            }
          },
          sidePagination: {
            type: String,
            default: 'server'
          },
          queryParam: {
            type: Function
          },
          /*routerParam: {
            type: Array,
            default: []
          },*/
          baseParam:{
            type:Object,
            default() {
              return {};
            }
          },
          method:{
            type:String,
            default:'POST'
          }
        },
        data() {
          return {
            loading:true,
            props_clientPageSize:this.page_size,
            props_clientData:[],
            props_data:this.data,
            props_total:0,
            props_pageNo:this.page_now,
            props_query:{
              page_now: this.page_now,
              page_size: this.page_size,
            }
          }
        },
        created() {
          /*const param1 = sessionStorage[this.routerParam[0]]
          const param2 = sessionStorage[this.routerParam[1]]
          const param3 = sessionStorage[this.routerParam[2]]
          const paramAll = {
            [this.routerParam[0]]:param1,
            [this.routerParam[1]]:param2,
            [this.routerParam[2]]:param3,
          }
          console.log(12,param1,param2,param3,paramAll)*/
          if(this.sidePagination === 'server'){
            // this.init == true
            this.init && this.query();
           /* if (!param1&&!param2) {
              this.query();
            } else {
              this.query(paramAll)
              // sessionStorage.clear(this.routerParam)
            }*/
          }
        },
        methods: {
          emitEvent(res){
            if(res){
              this.loading=true
            }else{
              this.loading=false
            }
          },
          query(arg){
            let param = _.assign(this.props_query,arg || this.baseParam);
            this.queryParam && _.assign(param,this.queryParam(param));
            if(this.$props.method=='POST'){
              queryApi(this.url,param,this.mock).then((res) => {
                this.loading = false;
                this.props_data = res.rows || res.make_an_appointment;
                this.props_pageNo = res.page_now;
                this.props_total = res.records_total;
                // this.$emit('len',(res.rows.length);
                this.$emit('pages',res.page_now)
              });
            }
            else if(this.$props.method=='GET'){
              queryApiGet(this.url,this.mock).then((res) => {
                this.loading = false;
                this.props_data = res.rows||res.make_an_appointment;
                if(res.rows||res.make_an_appointment){
                  // this.$emit('len',res.rows.length);

                }
              });
            }

          },
          create(arg){
            this.loading = false;
            this.props_total = arg.data.length;
            this.props_clientData = arg.data;
            this.conversion();
          },
          changedNo(page){
            this.$emit('changedNo',true);
            if(this.sidePagination === 'server'){
              this.query({
                page_now:page
              });

            }else{
              this.conversion(page);
            }
          },
          changedSize(size){
            if(this.sidePagination === 'server'){
              this.query({
                page_now:1,
                page_size:size
              });
            }else{
              this.conversion(1,size);
            }
          },
          selectionChange(data){
            this.$emit('selectionChange',data);
          },
          conversion(page_now = this.page_now,page_size = this.props_clientPageSize){
            this.props_clientPageSize = page_size;
            const index = (page_now - 1) * page_size;
            const last = page_now * page_size;
            this.props_data = this.props_clientData.slice(index,last);
          },
          rowClassName (row, index) {
            if (index===this.num){
              return 'demo-table-info-row';
            }
            return '';
          },

        }
    }
</script>

