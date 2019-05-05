import React from 'react';
import {
    Button, View, Text, StyleSheet,
    Image, TextInput, ListView, ScrollView, Dimensions, StatusBar,
    TouchableOpacity, AsyncStorage,
} from 'react-native';
import {Alert} from 'react-native'

/**
 * Created by 刘胡来
 * DateUtils on 2019.04.05
 * Copyright 2013 - 2019 QianTuo Inc. All Rights Reserved
 * Desc: 页面组件基类
 */
export default class BaseComponent extends React.Component {

    constructor(props){
        super(props);
        this.screenWidth = Dimensions.get('window').width;
        this.screenHeight = Dimensions.get('window').height;

    };


    render() {
        return this.initView();
    };


    /**
     * 子类需要重载本函数
     * @returns {null}
     */
    initView() {
        return null;
    };

    /**
     * 修改状态栏属性
     * @returns {*}
     */
    setStatusBar(bgColor) {
        return (
            <StatusBar
                animated={true}
                hidden={false}
                backgroundColor={bgColor} //状态栏的背景色,只对android平台生效
                translucent={true}
                barStyle='light-content'
            />)
    };

    buildTopNavigationBar(title,bgColor){
        return(
            <View style = {{height:80, backgroundColor:bgColor,flexDirection:'column',width:'100%'}}>

                <View style = {[styles.topNavStyle,{backgroudColor:bgColor}]}>

                    <TouchableOpacity style = {styles.leftButtonStyle} onPress = {()=>this.back()}>
                        <Image style = {{width:20,height:20,marginLeft:10,}}
                               source = {require('../page/main/img/back_white.png')}/>
                        <Text style={{color:'white',fontSize:14}}>返回</Text>


                    </TouchableOpacity>

                    <Text style={{color:'white',fontSize:16,textAlign:'center'}}>{title}</Text>

                    <TouchableOpacity  style = {styles.rightButtonStyle} onPress = {()=>this.rightButtonClick()}>

                        <Image style = {{width:20,height:20}}
                               source = {require('../page/main/img/search_white.png')}/>

                    </TouchableOpacity>

                </View>

            </View>
        )
    };

    /**
     * 返回按钮点击逻辑，子类可以重载
     */
    back(){
        const { navigation } = this.props;
        if (navigation) {
            navigation.pop();
        }

    };

    /**
     * 右边按钮点击逻辑，子类可以重载
     */
    rightButtonClick(){

    };



}

const styles = StyleSheet.create({

    topNavStyle: {
        height:50,
        marginTop:30,
        width:'100%',
        flexDirection:'row',
        //backgroundColor:'#12ee67',
        alignItems:'center',    //垂直居中
        justifyContent:'space-between',
        //backgroundColor:'#1373EC'
    },
    leftButtonStyle:{
        width:80,
        height:50,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start',
        //backgroundColor:'#b78900',

    },
    rightButtonStyle:{
        width:80,height:50,
        alignItems: 'flex-end',
        justifyContent:'center',
        //backgroundColor:'#12ee67',
        paddingRight:10,
    },


});