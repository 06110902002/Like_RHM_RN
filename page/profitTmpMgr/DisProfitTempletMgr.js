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
        this.state = {
            activityTxtColor:'#4394F1',
            inactiveTxtColor:'gray',
            selecIndex:1,
            slideButtonParmas:{
                txtArray:['我的分润模板','下级代理分润模板'],
            },

            isLoading: true,
            noMoreData:false,
            dataArray: this.initMenuData(),
            flatlistHeight:0,
        };

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

        let microHttp = new MicroHttp();
        var param = microHttp.buildPublicRequestBody();
        param.application = 'FRTemplateQuery.Req';
        param.customerId = "63493";
        param.mobileNo = '18751586817';
        param.phone = "18751586817";
        param.branchId = 'RHB89920000'; //需要从别处接口获取到

        RNCallNative.getMd5FromNative(JSON.stringify(param),(newSign) => {
            param.sign = newSign;

            let parmatTmp = 'requestXml=' + JSON.stringify(param);

            microHttp.postRequest(MicroHttp.jsonUrl, parmatTmp)
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

    }

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
    }

    componentWillUnMount() {
    }

    /**
     * 构建滑动菜单栏
     * @returns {*}
     */
    buildSlideButtonView(){
        // let buttonParmas = {
        //     txtArray:['我的分润模板','下级代理分润模板'],
        // };
        return (
            <SlideButton
                {...this.state.slideButtonParmas}
                onButtonClick={(index)=>this.onSildeButtonClick(index)}
            />
        );
    };

    onSildeButtonClick(index){
        console.log('98------------onSildeButtonClick:'+index);
    };

    /**
     * 构建中间滚动列表数据
     * @returns {*}
     */
    buildListView(){
        return(
            <RefreshListView
                style = {{top:10,}}
                ref={(ref) => {this.listView = ref}}
                data={this.state.dataArray}
                renderItem={this._renderItem.bind(this)}
                ListEmptyComponent={this._renderEmptyView}
                onHeaderRefresh={() => { this.pullDownRefresh() }}
                onFooterRefresh={() => { this.loadMore() }}
                ItemSeparatorComponent={this.renderSeparator}
                contentContainerStyle = {{alignItems:'center', justifyContent:'center',}}
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
     */
    pullDownRefresh(){
        this.setState({
            isLoading: true,
        },()=>{

            setTimeout(() => {
                this.listView.endRefreshing(RefreshState.Idle);
                console.log('226-----------:下拉刷新');
            }, 2000)

        });
    }

    _renderItem= (data)=> {
        return (
            <ItemViewMgr
                itemType = {data.item.getItemType()}
                ItemData = {data.item}      //属性传值
                onItemClickListener = {(data) =>this.onClickListener(data)}
            />
        )

    };


    render(){
        return(
            <View style = {{flex:1}}>

                {this.setStatusBar('#1373EC')}

                {this.buildTopNavigationBar('分润模板管理','#1373EC')}

                {this.buildSlideButtonView()}

                {this.buildListView()}

            </View>
        )

    }

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


});