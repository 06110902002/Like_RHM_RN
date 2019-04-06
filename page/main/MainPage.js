import React from 'react';
import {Button, View, Text, StyleSheet,
    Image,TextInput,ListView,ScrollView,Dimensions,
    TouchableOpacity} from 'react-native';
import { Alert } from 'react-native'
import ScrollableTab from '../../uikit/scrollTab/ScrollableTab';

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

export default class MainPage extends React.Component{


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
        }
    }

    render(){

        return(
            <View style = {styles.container}>

                {/*顶部标题栏*/}
                <View style = {styles.topTitleStyle}>

                    <View style = {{width:50}}/>

                    <Text style={{color:'white',fontSize:16}}>瑞花宝-瑞花蜜</Text>

                    <TouchableOpacity  style = {{width:50,height:50,
                        alignItems: 'center', backgroundColor:'#121e67',

                        justifyContent:'center'}} onPress={() => this.showNotifyMsg()}>

                        <Image style = {{width:20,height:20}}
                               source = {require('../../images/flashpay_lingdang.png')}/>

                    </TouchableOpacity>

                </View>

                {/*顶部滑动选项卡*/}
                <View style = {{top:40,height:200,backgroundColor:'#1980cb'}}>
                    <ScrollableTab >
                        {this.segmentArray.map((item, index)=> {
                            return this.buidlScrollItemView(this.topMenuTitleModelList[index],index);
                        })}
                    </ScrollableTab>

                </View>

            </View>


        );

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
        backgroundColor:'#ddee67',
    },
    topTitleStyle:{
        top:40,
        height:50,
        flexDirection:'row',
        backgroundColor:'#12ee67',
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
        backgroundColor:'#123e67',
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
    }


});