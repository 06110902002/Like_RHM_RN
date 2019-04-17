import React from 'react';
import {Button, View, Text, StyleSheet,
    Image,TextInput,ListView,ScrollView,Dimensions,StatusBar,FlatList,
    TouchableOpacity} from 'react-native';
import { Alert } from 'react-native'
import ScrollableTab from '../../uikit/scrollTab/ScrollableTab';
import RefreshListView from '../../refresh/RefreshListView';
import MenuItem from '../../refresh/model/HomeMenuItemModel';
import RefreshState from  '../../refresh/RefreshState';
import ItemViewMgr from '../../refresh/view/ItemViewMgr';
import BannarMenuModel from '../../refresh/model/BannarMenuModel';
import ModelType from '../../refresh/model/ModelType';

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;
var testArray = [];

/**
 * Created by 刘胡来
 * Date on 2019.04.07
 * Copyright 2013 - 2019 QianTuo Inc. All Rights Reserved
 * Desc: 首页经营数据页面
 */
export default class BusinessData extends React.Component{


    constructor(props) {
        super(props);
        this.topMenuTitleModelList = [];
        var tradeItem = new TopMenuTitleModel();
        tradeItem.firstTxt = '今日交易金额';
        tradeItem.secTxt = '0.00元';
        tradeItem.thirdTxt = '0.00元';
        tradeItem.fourTxt = '昨日交易金额';

        var fr = new TopMenuTitleModel();
        fr.firstTxt = '今日分润';
        fr.secTxt = '0.00元';
        fr.thirdTxt = '0.00元';
        fr.fourTxt = '昨日分润';

        var jihuo = new TopMenuTitleModel();
        jihuo.firstTxt = '今日激活终端';
        jihuo.secTxt = '0.00元';
        jihuo.thirdTxt = '0.00元';
        jihuo.fourTxt = '昨日激活终端';

        var cashBackItem = new TopMenuTitleModel();
        cashBackItem.firstTxt = '今日激活返现';
        cashBackItem.secTxt = '0.00元';
        cashBackItem.thirdTxt = '0.00元';
        cashBackItem.fourTxt = '昨日激活返现';
        this.topMenuTitleModelList.push(tradeItem);
        this.topMenuTitleModelList.push(fr);
        this.topMenuTitleModelList.push(jihuo);
        this.topMenuTitleModelList.push(cashBackItem);



        this.segmentArray = ['交易金额','分润','激活终端数','激活返现'];
        /**
         * 通过状态去传递属性
         *
         * */
        this.state = {

            //首页菜单项-属性
            isLoading: true,
            noMoreData:false,
            dataArray: this.initMenuData(),
        }
    }

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

    render(){

        return(
            <View style = {styles.container}>
                {this.setStatusBar()}

                {/*顶部标题栏*/}
                <View style = {styles.topTitleStyle}>

                    <View style = {{width:50}}/>

                    <Text style={{color:'white',fontSize:16}}>瑞花宝-瑞花蜜</Text>

                    <TouchableOpacity  style = {{width:50,height:50,
                        alignItems: 'center',

                        justifyContent:'center'}} onPress={() => this.showNotifyMsg()}>

                        <Image style = {{width:20,height:20}}
                               source = {require('../../images/flashpay_lingdang.png')}/>

                    </TouchableOpacity>

                </View>

                {/*顶部滑动选项卡*/}
                <View style = {{top:40,height:200}}>
                    <ScrollableTab >
                        {this.segmentArray.map((item, index)=> {
                            return this.buidlScrollItemView(this.topMenuTitleModelList[index],index);
                        })}
                    </ScrollableTab>

                </View>

                {this.buildFunctMenuList()}
            </View>


        );

    };

    /**
     * 修改状态栏属性
     * @returns {*}
     */
    setStatusBar(){
        return (
            <StatusBar
                animated={true}
                hidden={false}
                //backgroundColor={this.state.MainColor} //状态栏的背景色
                translucent={true}
                barStyle='light-content'
            />);
    };

    showNotifyMsg(){

    };

    /**
     * 构建scrolView item视图
     * @param TopMenuTitleModel
     * @param index 循环遍历的时候唯一key
     */
    buidlScrollItemView(topMenuTitleModel,index){
        if(topMenuTitleModel){
            return (
                <View style = {styles.scrollVerticalLayout} key={topMenuTitleModel.firstTxt + index} tabLabel={topMenuTitleModel.firstTxt}>
                    <Text style={[styles.topTitleTxtStyle,{fontSize:12}]} >{topMenuTitleModel.firstTxt}</Text>
                    <Text style={[styles.topTitleTxtStyle,{fontSize:16}]} >{topMenuTitleModel.secTxt}</Text>
                    <Text style={[styles.topTitleTxtStyle,{fontSize:14}]} >{topMenuTitleModel.thirdTxt}</Text>
                    <Text style={[styles.topTitleTxtStyle,{fontSize:12}]} >{topMenuTitleModel.fourTxt}</Text>
                </View>
            );
        }
        return null;
    };

    /**
     * 构建菜单滚动列表
     * @returns {*}
     */
    buildFunctMenuList(){

        return(
            <View style = {{flex:1,backgroundColor:'#F5F5F9',top:40}}>

                <RefreshListView
                    style = {{top:10}}
                    ref={(ref) => {this.listView = ref}}
                    data={this.state.dataArray}
                    renderItem={this._renderItem.bind(this)}
                    ListEmptyComponent={this._renderEmptyView}
                    onHeaderRefresh={() => { this.pullDownRefresh() }}
                    onFooterRefresh={() => { this.loadMore() }}
                    ItemSeparatorComponent={this.renderSeparator}
                />


            </View>
        );
    };

    _renderEmptyView = (item) => {
        return <View/>
    };

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

    onClickListener(data){
        switch (data){

            case '分润查询':
                this.props.navigation.navigate('DisProfits');
                break;

            case '分润模模板管理':
                this.props.navigation.navigate('DisProfitTempletMgr');
                break;

            default:
                Alert.alert(data);
                break;
        }

    };

    /**
     * 滚动列表
     * @returns {*}
     */
    renderSeparator = () => {
        return (
            <View
                style={{ height: 0.5, width: "100%", backgroundColor: "#CED0CE",}}
            />
        );
    };



    loadMore(){
        setTimeout(() => {
            this.listView.endRefreshing(RefreshState.Idle)
        }, 20);
    };


}

class TopMenuTitleModel {

    constructor(){

        this.firstTxt = '';
        this.secTxt = '';
        this.thirdTxt = '';
        this.fourTxt = '';
    }

}

const styles = StyleSheet.create({

    container: {
        flex:1,
        backgroundColor:'#1373EC',
    },
    topTitleStyle:{
        top:40,
        height:50,
        flexDirection:'row',
        //backgroundColor:'#12ee67',
        alignItems:'center',    //垂直居中
        justifyContent:'space-between',


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
        height:200,
        flexDirection:'column',
        alignItems:'center',    //垂直居中
        justifyContent:'center',
        //backgroundColor:'#123e67',
    },




    newTextStyle:{
        fontSize:30,
    },
    ViewForTextStyle:{
        height:100,
        width:200,
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor:'gray',
        margin:5
    },

});