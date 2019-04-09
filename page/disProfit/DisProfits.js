import React from "react";
import {Button, View, Text, StyleSheet,
    Image,TextInput,ListView,Alert,
    TouchableOpacity} from 'react-native';
import { NativeModules } from 'react-native';
import NativeComponent from './NativeComponent';


var RNCallNative = NativeModules.RNCallNative;
/**
 * Created by 刘胡来
 * Date on 2019.04.07
 * Copyright 2013 - 2019 QianTuo Inc. All Rights Reserved
 * Desc: 利润分配页面
 */
export default class DisProfits extends React.Component{


    render(){
        return(
            <View style = {{flex:1}}>
                <Text style={styles.textStyle}
                      onPress = {()=> this.switchNativePage()}>切换到原生页面</Text>
                <Text style = {styles.textStyle}
                      onPress = {()=> this.callNativeComponent()}>调用原生View</Text>

                <NativeComponent style = {{width:200,height:50,backgroundColor:'#cb9087'}}
                                 imgUrl = {'测试'}
                                 onSingleTap={(e) =>{
                         Alert.alert(e.nativeEvent.showBottom);

                     }}

                />

            </View>
        )

    }
    callNativeComponent(){

    };
    switchNativePage(){
        RNCallNative.switchNative('react parmas');
    };


}

const styles = StyleSheet.create({

    container: {
        flex:1,
        backgroundColor:'#F5F5F5',
        flexDirection:'column',
    },

    textStyle:{
        marginTop:10,
        fontSize:12,
        color:'green',
        width:'100%',
        height:40,
        backgroundColor:'gray',
        textAlignVertical:'center',
        lineHeight:40,
        textAlign:'center',
        alignItems:'center',
        justifyContent:'center'
    },

});