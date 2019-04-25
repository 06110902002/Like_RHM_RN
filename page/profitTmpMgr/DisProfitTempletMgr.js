import React from "react";
import {Button, View, Text, StyleSheet,Dimensions,
    Image,TextInput,ListView,Alert,Animated,Easing,StatusBar,NativeModules,
    TouchableOpacity} from 'react-native';

import SlideButton from '../../uikit/slideButton/SlideButton';
import BaseComponent from '../../page/BaseComponent'
import RefreshListView from '../../refresh/RefreshListView';
import RefreshState from  '../../refresh/RefreshState';
import ItemViewMgr from '../../refresh/view/ItemViewMgr';
import MenuItem from "../../refresh/model/HomeMenuItemModel";
import BannarMenuModel from "../../refresh/model/BannarMenuModel";
import MicroHttp from "../../utils/MicroHttp";
import DateUtils from "../../utils/DateUtils";
import SlideMenuBar from'./SlideMenuBar';
import SubAgentDisProfitTmpModel from './model/SubAgentDisProfitTmpModel';
import DisProfitTempItemViewMgr from './view/DisProfitTempItemViewMgr';

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;
var RNCallNative = NativeModules.RNCallNative;
var testArray = [];
/**
 * Created by 刘胡来
 * Date on 2019.04.14
 * Copyright 2013 - 2019 QianTuo Inc. All Rights Reserved
 * Desc: 分润模板管理
 */
export default class DisProfitTempletMgr extends BaseComponent{

    constructor(){
        super();
        this.subAgentArray = [];
        this.subAgentCurPage = 1;   //下级代理分润当前页面
        this.isLastPage = false;    //是否是最后一页
        this.isSubAgentLoading = false;
        this.isMineLoading = false;
        this.state = {
            activityTxtColor:'#4394F1',
            inactiveTxtColor:'gray',
            selecIndex:1,
            slideButtonParmas:{
                txtArray:['我的分润模板','下级代理分润模板'],
            },

            noMoreData:false,
            dataArray: this.initMenuData(),
            subAgentArray:this.subAgentArray,
            flatlistHeight:0,
        };
        this.microHttp = new MicroHttp();
        this.segmentArray = ['我的分润模板','下级代理分润模板'];


    };

    initMenuData(){

        var txtArr = ['分润查询','交易查询','激活终端查询',
            '开设下级机构','分润模模板管理','终端下发',
            '设置终端费率','分润明细','激活返现管理',
        ];

        var iconArr = [require('../../page/main/img/icon_01.png'),
            require('../../page/main/img/icon_02.png'),
            require('../../page/main/img/icon_03.png'),
            require('../../page/main/img/icon_04.png'),
            require('../../page/main/img/icon_05.png'),
            require('../../page/main/img/icon_06.png'),
            require('../../page/main/img/icon_07.png'),
            require('../../page/main/img/icon_08.png'),
            require('../../page/main/img/icon_09.png'),
        ];

        var menuItem1 = new MenuItem();
        menuItem1.menuTxt1 = txtArr[0];
        menuItem1.menuIcon1 = iconArr[0];
        menuItem1.menuTxt2 = txtArr[1];
        menuItem1.menuIcon2 = iconArr[1];
        menuItem1.menuTxt3 = txtArr[2];
        menuItem1.menuIcon3 = iconArr[2];
        testArray.push(menuItem1);

        var menuItem2 = new MenuItem();
        menuItem2.menuTxt1 = txtArr[3];
        menuItem2.menuIcon1 = iconArr[3];
        menuItem2.menuTxt2 = txtArr[4];
        menuItem2.menuIcon2 = iconArr[4];
        menuItem2.menuTxt3 = txtArr[5];
        menuItem2.menuIcon3 = iconArr[5];
        testArray.push(menuItem2);

        var bannar = new BannarMenuModel();
        bannar.bannarUrl = require('../../page/main/img/menu_mid.png');
        testArray.push(bannar);

        var menuItem3 = new MenuItem();
        menuItem3.menuTxt1 = txtArr[6];
        menuItem3.menuIcon1 = iconArr[6];
        menuItem3.menuTxt2 = txtArr[7];
        menuItem3.menuIcon2 = iconArr[7];
        menuItem3.menuTxt3 = txtArr[8];
        menuItem3.menuIcon3 = iconArr[8];
        testArray.push(menuItem3);

        return testArray;


    };

    componentDidMount() {
        this.postFRTemplateQuery();
        this.postFRBelowBranchQuery(this.subAgentCurPage);

    }


    componentWillUnMount() {
    }

    /**
     * 我的分润模板数据查询
     */
    postFRTemplateQuery(){
        //let microHttp = new MicroHttp();
        var param = this.microHttp.buildPublicRequestBody();
        param.application = 'FRTemplateQuery.Req';
        param.branchId = 'RHB89920000'; //需要从别处接口获取到
        param.customerId = "63493";
        param.mobileNo = '18751586817';
        param.phone = "18751586817";


        RNCallNative.getMd5FromNative(JSON.stringify(param),(newSign) => {
            param.sign = newSign;

            let parmatTmp = 'requestXml=' + JSON.stringify(param);

            this.microHttp.postRequest(MicroHttp.jsonUrl, parmatTmp)
                .then((response) => {
                    if(response.respCode === '0000'){

                    }else{
                        Alert.alert(response.respDesc);
                    }

                    console.log('123----------:' + JSON.stringify(response));
                    this.parseFRTemplateQuery(response);

                }).catch((error) => {
                Alert.alert(error);
            })
        });
    };

    parseFRTemplateQuery(jsonData){
        if(!jsonData) return;
        let data = jsonData.data;
        let resultBean = data.resultBean;
        let list = resultBean.list;
        if(!list || JSON.stringify(list).length <= 2){
            this.setState({
                dataArray:null,
            });
        }else{

        }
        this.isMineLoading = false;
        this.MyDisProfitTempleteListView.endRefreshing(RefreshState.Idle);
    }

    /**
     * 下级分润查询
     */
    postFRBelowBranchQuery(pageIndex){
        var param = this.microHttp.buildPublicRequestBody();
        param.application = 'FRBelowBranchQuery.Req';
        param.branchId = 'RHB89920000'; //需要从别处接口获取到
        param.searchType = '0';
        param.currPage = pageIndex;   //分页数据


        param.customerId = "63493";
        param.mobileNo = '18751586817';
        param.phone = "18751586817";

        RNCallNative.getMd5FromNative(JSON.stringify(param),(newSign) => {
            param.sign = newSign;

            let parmatTmp = 'requestXml=' + JSON.stringify(param);

            this.microHttp.postRequest(MicroHttp.jsonUrl, parmatTmp)
                .then((response) => {
                    if(response.respCode === '0000'){

                    }else{
                        Alert.alert(response.respDesc);
                    }

                    console.log('186----------:' + JSON.stringify(response));
                    this.parseFRBelowBranchQuery(response);

                }).catch((error) => {
                Alert.alert(error);
            })
        });
    };

    /**
     * 解析下级分润数据
     */
    parseFRBelowBranchQuery(jsonData){
        if(!jsonData) return;
        let data = jsonData.data;
        let resultBean = data.resultBean;
        let isLast = resultBean.isLast;
        this.isLastPage = isLast === '1';
        let list = resultBean.list;
        console.log('203-----------:',JSON.stringify(list));

        for(let i = 0; i < list.length; i ++){
            var subModel = new SubAgentDisProfitTmpModel();
            let tmp = list[i];
            subModel.activateNum = tmp.activateNum;
            subModel.branchId = tmp.branchId;
            subModel.branchName = tmp.branchName;
            subModel.cashReturnRule = tmp.cashReturnRule;
            subModel.frAmount = tmp.frAmount;
            subModel.isdown = tmp.isdown;
            subModel.payAmount = tmp.payAmount;
            subModel.superCashReturnRule = tmp.superCashReturnRule;
            subModel.newSuperCashReturnRule = tmp.newSuperCashReturnRule;
            subModel.newCashReturnRule = tmp.newCashReturnRule;
            subModel.status = tmp.status;
            this.subAgentArray.push(subModel);
        }


        if(!list || JSON.stringify(list).length <= 2){
            this.setState({
                subAgentArray:null,
            });
        }
        else{
            this.setState({
                subAgentArray:this.subAgentArray,
            });
        }
        this.isSubAgentLoading = false;
        console.log('247-----------:');
        this.SubAgentDisprofitListView.endRefreshing(RefreshState.Idle);

    };

    /**
     * 构建滑动菜单栏
     * @returns {*}
     */
    buildSlideButtonView(){
        return(
            <View style = {{flex:1,backgroudColor:'#098900'}}>
                <SlideMenuBar >
                    {this.segmentArray.map((item, index)=> {
                        return this.buidlScrollItemView(item,index);
                    })}
                </SlideMenuBar>

            </View>
        );

    };

    /**
     * 构建scrolView item视图
     * @param TopMenuTitleModel
     * @param index 循环遍历的时候唯一key
     */
    buidlScrollItemView(item,index){
        if(item){
            return (
                <View style = {styles.scrollVerticalLayout} key={item + index} tabLabel={item}>
                    {this.buildListView(index)}
                </View>
            );
        }
        return null;
    };


    buildListView(index){
        return index === 0 ? this.buildMyDisProfitTempleteListView() : this.buildSubAgentDisprofitListView();
    };

    /**
     * 构建我的分润模板
     */
    buildMyDisProfitTempleteListView(){
        return(
            <RefreshListView
                style = {{top:10,width:'100%'}}
                ref={(ref) => {this.MyDisProfitTempleteListView = ref}}
                data={this.state.dataArray}
                renderItem={this._renderItem.bind(this)}
                ListEmptyComponent={this._renderEmptyView}
                onHeaderRefresh={() => { this.pullDownRefresh(0) }}
                onFooterRefresh={() => { this.loadMore(0) }}
                ItemSeparatorComponent={this.renderSeparator}
                //contentContainerStyle = {{alignItems:'center', justifyContent:'center',}}
                onLayout={e => {
                    let height = e.nativeEvent.layout.height;
                    if (this.state.flatlistHeight < height) {
                        this.setState({ flatlistHeight: height })
                    }
                }}
            />
        );
    };


    /**
     * 构建中间滚动列表数据
     * @returns {*}
     */
    buildSubAgentDisprofitListView(){
        return(
            <RefreshListView
                style = {{top:10,width:'100%'}}
                ref={(ref) => {this.SubAgentDisprofitListView = ref}}
                data={this.state.subAgentArray}
                renderItem={this._renderItem.bind(this)}
                ListEmptyComponent={this._renderEmptyView}
                onHeaderRefresh={() => { this.pullDownRefresh(1) }}
                onFooterRefresh={() => { this.loadMore(1) }}
                ItemSeparatorComponent={this.renderSeparator}
                // contentContainerStyle = {{alignItems:'center', justifyContent:'center',}}
                // onLayout={e => {
                //     let height = e.nativeEvent.layout.height;
                //     if (this.state.flatlistHeight < height) {
                //         this.setState({ flatlistHeight: height })
                //     }
                // }}
            />
        );
    };

    /**
     * 当列表数据为空时的视图
     * @param item
     * @returns {*}
     * @private
     */
    _renderEmptyView = (item) => {
        return <View style = {{flex:1,height:this.state.flatlistHeight,alignItems:'center', justifyContent:'center',}}>
            <Image style = {{width:256,height:332,resizeMode:'contain'}}
                   source = {require('../../images/noData.png')}/>
        </View>
    };

    /**
     * 下拉刷新的回调
     * @param type 0 ： 下拉刷新我的分润模板数据
     *        type 1:   下拉刷新下级代理分润模板数据
     */
    pullDownRefresh(type){
        if(type === 1){
            this.subAgentArray = [];
            // this.setState({
            //     subAgentArray:null,
            // });
            this.subAgentCurPage = 1;
            if(this.isSubAgentLoading) return;
            this.isSubAgentLoading = true;
            this.postFRBelowBranchQuery(this.subAgentCurPage);

        }else{
            this.setState({
                dataArray:null,
            });
            if(this.isMineLoading) return;
            this.isMineLoading = true;
            this.postFRTemplateQuery();
        }

    };

    /**
     * 上拉加载更多的回调
     * @param type 0 ： 上拉加载我的分润模板数据
     *        type 1:   上拉加载下级代理分润模板数据
     */
    loadMore(type){

    };

    _renderItem= (data)=> {
        return (
            <DisProfitTempItemViewMgr
                itemType = {data.item.getItemType()}
                ItemData = {data.item}      //属性传值
                onItemClickListener = {(data) =>this.onClickListener(data)}
            />
        )

    };


    render(){
        return(
            <View style = {{flex:1,backgroundColor:'#F5F5F9'}}>

                {this.setStatusBar('#1373EC')}

                {this.buildTopNavigationBar('分润模板管理','#1373EC')}

                {this.buildSlideButtonView()}
                {/*{this.testItemView()}*/}


            </View>
        )

    }

    testItemView(){
        return(
            <View style = {{height:40,flexDirection:'row',justifyContent:'space-between',alignItems:'center',}}>
                <Text style = {{marginLeft:10}}>二级</Text>
                <View style = {{flex:1}}/>
                <Text style = {{marginRight:20}}>二级</Text>
                <Image style = {{width:10,height:20,resizeMode:'contain',marginRight:10}}
                       source = {require('../../images/right_arrow.png')}/>
            </View>
        );
    };


    /**
     * @override 父类 导航条右边按钮的点击
     */
    rightButtonClick(){

    };
}

const styles = StyleSheet.create({

    container: {
        flex:1,
        backgroundColor:'#F5F5F5',
        flexDirection:'column',
    },

    slideButtonStyle:{
        flex:1,
        height:60,
        textAlignVertical:'center',
        lineHeight:60,
        textAlign:'center',
        alignItems:'center',
    },



    topTitleTxtStyle:{
        //flex:1,
        color:'white',
        //textAlign:'center',
        height:40,
        //backgroundColor:'#8b3e67',
        //alignItems:'center',    //垂直居中
        alignItems:'center',
        justifyContent: 'center',
        //position:'absolute'
    },

    scrollVerticalLayout:{
        width: screenWidth,
        //top:40,
        //height:200,
        flexDirection:'column',
        alignItems:'center',    //垂直居中
        justifyContent:'center',
       // backgroundColor:'#123e67',
    },


});