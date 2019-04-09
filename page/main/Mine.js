import React from "react";
import {Button, View, Text, StyleSheet,
    Image,TextInput,ListView,FlatList,Alert,
    TouchableOpacity} from 'react-native';
import { NativeModules } from 'react-native';

var testArray = [];
const feedBack = 11;
const normalQustions = 12;
const modifyPwd = 13;
const versionInfo = 14;
const pushSetting = 15;
const logOut = 16;

var RNCallNative = NativeModules.RNCallNative;

export default class Mine extends React.Component{

    constructor(){
        super();

    };

    initFuncOptArr(){

        testArray.push('意见反馈');
        testArray.push('常见问题');
        testArray.push('修改登录密码');
        testArray.push('版本信息');
        testArray.push('推送设置');
        return testArray;
    };


    render(){
        return(
            <View style = {styles.container}>

                <View style = {styles.topStyle}>
                    <Image style = {{width:50,height:40}}
                           source = {require('../main/img/userlogo.png')}/>

                    <Text style = {{fontSize:14,color:'white',marginTop:10}}>天堂一级机构</Text>
                    <Text style = {{fontSize:14,color:'white',marginTop:5}}>机构号:RHB20190408</Text>
                    <Text style = {{fontSize:14,color:'white',marginTop:5}}>187****7890</Text>

                </View>

                <View style = {{height:50,width:'100%',backgroundColor:'#1373EC',
                    flexDirection:'row',alignItems:'center',}}>
                    <Image style = {{width:30,height:30,marginLeft:10}}
                           source = {require('../main/img/backdeaw.png')}/>

                    <Text style = {{fontSize:12,color:'white',marginLeft:10}}>日结分润提现</Text>

                    <View style = {{flex:1}} />

                    <Text style = {{fontSize:12,color:'white',marginRight:10}}>待提现金额:0.00元</Text>

                    <Image style = {{width:20,height:20,marginRight:10}}
                           source = {require('../main/img/list_version.png')}/>

                </View>

                {/*意见反馈*/}
                <TouchableOpacity style = {{width:'100%',height:40,flexDirection:'column'}} onPress = {()=>this.onClick(feedBack)}>

                    <View style = {{height:40,width:'100%',backgroundColor:'white',
                        flexDirection:'row',alignItems:'center',marginTop:20}}>


                        <Image style = {{width:30,height:30,marginLeft:10}}
                               source = {require('../main/img/list_opinion.png')}/>

                        <Text style = {{fontSize:12,marginLeft:10}}>意见反馈</Text>

                        <View style = {{flex:1}} />
                        <Image style = {{width:20,height:20,marginRight:10}}
                               source = {require('../main/img/list_version.png')}/>

                    </View>

                    <View style={{width:'100%',marginLeft:50,bottom:0,
                        backgroundColor:'gray',height:0.2,}}/>

                </TouchableOpacity>

                {/*常见问题*/}
                <TouchableOpacity style = {{width:'100%',height:40,flexDirection:'column',marginTop:1}}
                                  onPress = {()=>this.onClick(normalQustions)}>

                    <View style = {{height:40,width:'100%',backgroundColor:'white',
                        flexDirection:'row',alignItems:'center',marginTop:20}}>


                        <Image style = {{width:30,height:30,marginLeft:10}}
                               source = {require('../main/img/list_opinion.png')}/>

                        <Text style = {{fontSize:12,marginLeft:10}}>常见问题</Text>

                        <View style = {{flex:1}} />
                        <Image style = {{width:20,height:20,marginRight:10}}
                               source = {require('../main/img/list_version.png')}/>

                    </View>

                    <View style={{width:'100%',marginLeft:50,bottom:0,
                        backgroundColor:'gray',height:0.2,}}/>

                </TouchableOpacity>

                {/*修改登录密码*/}
                <TouchableOpacity style = {{width:'100%',height:40,flexDirection:'column',marginTop:1}}
                                  onPress = {()=>this.onClick(modifyPwd)}>

                    <View style = {{height:40,width:'100%',backgroundColor:'white',
                        flexDirection:'row',alignItems:'center',marginTop:20}}>


                        <Image style = {{width:30,height:30,marginLeft:10}}
                               source = {require('../main/img/list_opinion.png')}/>

                        <Text style = {{fontSize:12,marginLeft:10}}>修改登录密码</Text>

                        <View style = {{flex:1}} />
                        <Image style = {{width:20,height:20,marginRight:10}}
                               source = {require('../main/img/list_version.png')}/>

                    </View>

                    <View style={{width:'100%',marginLeft:50,bottom:0,
                        backgroundColor:'gray',height:0.2,}}/>

                </TouchableOpacity>

                {/*版本信息*/}
                <TouchableOpacity style = {{width:'100%',height:40,flexDirection:'column',marginTop:1}}
                                  onPress = {()=>this.onClick(versionInfo)}>

                    <View style = {{height:40,width:'100%',backgroundColor:'white',
                        flexDirection:'row',alignItems:'center',marginTop:20}}>


                        <Image style = {{width:30,height:30,marginLeft:10}}
                               source = {require('../main/img/list_opinion.png')}/>

                        <Text style = {{fontSize:12,marginLeft:10}}>版本信息</Text>

                        <View style = {{flex:1}} />
                        <Image style = {{width:20,height:20,marginRight:10}}
                               source = {require('../main/img/list_version.png')}/>

                    </View>

                    <View style={{width:'100%',marginLeft:50,bottom:0,
                        backgroundColor:'gray',height:0.2,}}/>

                </TouchableOpacity>

                {/*推送设置*/}
                <TouchableOpacity style = {{width:'100%',height:40,flexDirection:'column',marginTop:1}}
                                  onPress = {()=>this.onClick(pushSetting)}>

                    <View style = {{height:40,width:'100%',backgroundColor:'white',
                        flexDirection:'row',alignItems:'center',marginTop:20}}>


                        <Image style = {{width:30,height:30,marginLeft:10}}
                               source = {require('../main/img/list_opinion.png')}/>

                        <Text style = {{fontSize:12,marginLeft:10}}>推送设置</Text>

                        <View style = {{flex:1}} />
                        <Image style = {{width:20,height:20,marginRight:10}}
                               source = {require('../main/img/list_version.png')}/>

                    </View>

                    <View style={{width:'100%',marginLeft:50,bottom:0,
                        backgroundColor:'gray',height:0.2,}}/>

                </TouchableOpacity>


                <Text style = {{fontSize:12,color:'green',
                    width:'100%',height:40,backgroundColor:'white',marginTop:40,
                    textAlignVertical:'center',lineHeight:40,
                    textAlign:'center',alignItems:'center',justifyContent:'center'}}
                      onPress = {()=> this.onClick(logOut)}>退出登录--调用原生方法</Text>


            </View>
        )

    }

    onClick(Id){
        Alert.alert('跳转页面：'+Id);
        RNCallNative.addEvent('生日聚会', '江苏南通 中天路');
        RNCallNative.RNTransferIOSWithCallBack('生日聚会',(data) => {
            console.log('201-----------:'+data);
            this.setState({notice: data});
        });


        switch (Id){

            case feedBack:

                break;

            case normalQustions:
                break;

            case modifyPwd:
                break;

            case versionInfo:
                break;

            case pushSetting:
                break;
        }
    };


}

const styles = StyleSheet.create({

    container: {
        flex:1,
        backgroundColor:'#F5F5F5',
        flexDirection:'column',
    },

    topStyle:{
        height:280,
        backgroundColor:'#368BEE',
        justifyContent:'center',
        alignItems:'center',
    },

});