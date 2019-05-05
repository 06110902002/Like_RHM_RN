
import React from "react";
import {
    Button, View, Text, StyleSheet, ImageBackground,
    Image, TextInput, ListView, Alert, Animated, ART,
    Easing, StatusBar, NativeModules, ActivityIndicator, AsyncStorage,
    TouchableOpacity, Platform
} from 'react-native';
import BaseComponent from "../BaseComponent";
import Wedge from '../../uikit/art/Wedge';
import CircularChart from '../../uikit/art/CircularChart';
import {PullView} from 'react-native-pull'
import DateUtils from "../../utils/DateUtils";
import SlideButton from '../../uikit/slideButton/SlideButton';


const {Surface, Shape, Path} = ART;
var self = null;


/**
 * Created by 刘胡来
 * Date on 2019.04.25
 * Copyright 2013 - 2019 QianTuo Inc. All Rights Reserved
 * Desc: 交易查询
 */
export default class TradeQuery extends BaseComponent{

    constructor(props){
        super(props);
        self = this;
        this.getDataFromLocalStorage('lastUpdate');
        this.testArray = [];
        this.colors = ["yellow",'gray','green'];
        this.total = 0;
        // for(let i = 1; i <= 3; i ++){
        //     var item = new CircleItem();
        //     item.ratio = i * 100;
        //     this.total += i * 100;
        //     item.color = this.colors[i];
        //     this.testArray.push(item);
        // }
        //
        //
        // for(let i = 0; i < this.testArray.length; i ++){
        //     var item = this.testArray[i];
        //     let ratio = item.ratio;
        //     item.ratio = ratio / this.total;
        //     item.degress = item.ratio * 360.0;
        //
        // }

        var item1 = new CircleItem();
        item1.ratio = 100;
        item1.degress = 100.0 / 600.0 * 360.0;
        item1.color = 'purple';
        this.testArray.push(item1);

        var item2 = new CircleItem();
        item2.ratio = 200;
        item2.degress = 200.0 / 600.0 * 360.0;
        item2.color = 'green';
        this.testArray.push(item2);

        var item3 = new CircleItem();
        item3.ratio = 200;
        item3.degress = 200.0 / 600.0 * 360.0;
        item3.color = 'gray';
        this.testArray.push(item3);

        var item4 = new CircleItem();
        item4.ratio = 100;
        item4.degress = 100.0 / 600.0 * 360.0;
        item4.color = 'white';
        this.testArray.push(item4);

        this.state = {
            refreshing: false,
            lastUpdate:'',
        };
        this.onPullRelease = this.onPullRelease.bind(this);
        this.topIndicatorRender = this.topIndicatorRender.bind(this);
    };

    getDataFromLocalStorage(key){
        AsyncStorage.getItem(key,this._handleResult);
    }

    _handleResult(error,result){
        if(error!=null){
            return;
        }
        if(result === null){
            return;
        }
        if(!self) return;
        self.setState({
            lastUpdate:result,
        });
    }


    componentWillUnmount(){
        self = null;
    }




    onPullRelease(resolve) {
        setTimeout(() => {
            resolve();
            let date = DateUtils.getFormatDateAndTimes()[0];
            let time = DateUtils.getFormatDateAndTimes()[1];
            AsyncStorage.setItem('lastUpdate',date + " "+time).then(()=>{//使用Promise机制

                self.setState({
                    lastUpdate:date + " "+time,
                });

            }).catch((error)=>{//操作失败调用
                console.log('error:'+error.message);
            });
        }, 5000);
    }


    topIndicatorRender(pulling, pullok, pullrelease) {
        const hide = {position: 'absolute', left: 10000};
        const show = {position: 'relative', left: 0};
        setTimeout(() => {
            if (pulling) {
                this.txtPulling && this.txtPulling.setNativeProps({style: show});
                this.txtPullok && this.txtPullok.setNativeProps({style: hide});
                this.txtPullrelease && this.txtPullrelease.setNativeProps({style: hide});
            } else if (pullok) {
                this.txtPulling && this.txtPulling.setNativeProps({style: hide});
                this.txtPullok && this.txtPullok.setNativeProps({style: show});
                this.txtPullrelease && this.txtPullrelease.setNativeProps({style: hide});
            } else if (pullrelease) {
                this.txtPulling && this.txtPulling.setNativeProps({style: hide});
                this.txtPullok && this.txtPullok.setNativeProps({style: hide});
                this.txtPullrelease && this.txtPullrelease.setNativeProps({style: show});
            }

        }, 1);
        return (
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 60}}>
                <ActivityIndicator size="small" color="gray" />
                <Text ref={(c) => {this.txtPulling = c;}}>下拉刷新</Text>
                <Text ref={(c) => {this.txtPullok = c;}}>松开刷新</Text>
                <Text ref={(c) => {this.txtPullrelease = c;}}>{'上次刷新:'+this.state.lastUpdate+'\n刷新中'}</Text>
            </View>
        );
    }

    render(){

        return(
            <View style={styles.match_parent}>
                {this.setStatusBar('#1373EC')}
                {this.buildTopNavigationBar('交易查询','#1373EC')}
                {/*{this.buildCircleChart()}*/}


                <PullView style={{width: this.screenWidth,flexDirection:'column',backgroundColor:'white'}}
                          onPullRelease={this.onPullRelease}
                          topIndicatorRender={this.topIndicatorRender}
                          topIndicatorHeight={60}>
                    {this.buildMonthNavBar()}

                    <Text style = {styles.tradeTxtStyle}>0.00</Text>

                    {/*月交易总额*/}
                    <TouchableOpacity style = {styles.tradeSumStyle}>
                        <Text>月交易总额</Text>
                        <Image style={{width: 10, height: 20,resizeMode:'contain'}}
                               source={require('../../images/right_arrow.png')}/>

                    </TouchableOpacity>

                    <View style = {{width:'100%',height:0.5,backgroundColor:'gray'}}/>

                    <View style = {{width:'100%',height:60,flexDirection:'row'}}>

                        <TouchableOpacity style = {[styles.tradeSumStyle,{flex:1,flexDirection:'column',}]}>

                            <Text style = {{fontSize:20,color:'black'}}>0.00</Text>

                            <View style = {{flexDirection:'row',alignItems:'center',
                                justifyContent:'center',}}>
                                <Text style = {{fontSize:14,color:'gray'}}>自营</Text>
                                <Image style={{width: 10, height: 20,resizeMode:'contain'}}
                                       source={require('../../images/right_arrow.png')}/>
                            </View>


                        </TouchableOpacity>
                        <View style = {{width:0.5,height:60,backgroundColor:'gray'}}/>

                        <TouchableOpacity style = {[styles.tradeSumStyle,{flex:1,flexDirection:'column',}]}>
                            <Text style = {{fontSize:20,color:'black'}}>0.00</Text>

                            <View style = {{flexDirection:'row',alignItems:'center',
                                justifyContent:'center',}}>
                                <Text style = {{fontSize:14,color:'gray'}}>下级代理</Text>
                                <Image style={{width: 10, height: 20,resizeMode:'contain'}}
                                       source={require('../../images/right_arrow.png')}/>
                            </View>

                        </TouchableOpacity>

                    </View>

                    <Text style = {{fontSize:14,color:'gray',width:'100%',paddingLeft:10,
                        backgroundColor:'#F5F5F9',
                        ...Platform.select({
                            ios:{
                                lineHeight:40,
                            },
                            android:{
                            }
                        }),
                        height:40,}}>月交易总额同期对比</Text>


                    <View style = {{height:200,width:'100%',flexDirection:'column'}}>
                        <Text style = {{fontSize:18,color:'#1373EC',marginLeft:40,marginTop:20}}>0.00</Text>
                        <ImageBackground style={{width: 40, height: 20, justifyContent: 'center',
                            alignItems: 'center',marginLeft:30,marginTop:5,
                            resizeMode:'contain'}}
                               source={require('../../images/window_blue.png')}>
                            <Text style = {{fontSize:12,color:'white'}}>0.00</Text>
                        </ImageBackground>

                        <ImageBackground style={{width: 50, height: 20,marginTop:5,
                            justifyContent: 'center',backgroundColor:'#1373EC',
                            alignItems: 'center',marginLeft:25,borderRadius:20,
                            }}
                                         >
                            <Text style = {{fontSize:12,color:'white'}}>本月</Text>
                        </ImageBackground>

                        <ImageBackground style={{width: 50, height: 20,marginTop:5,
                            justifyContent: 'center',backgroundColor:'#FDBB4B',
                            alignItems: 'center',marginLeft:25,borderRadius:20,
                        }}
                        >
                            <Text style = {{fontSize:12,color:'white'}}>4月</Text>
                        </ImageBackground>

                        <ImageBackground style={{width: 40, height: 20, justifyContent: 'center',
                            alignItems: 'center',marginLeft:30,marginTop:5,
                            resizeMode:'contain'}}
                                         source={require('../../images/window_yellow.png')}>
                            <Text style = {{fontSize:12,color:'white'}}>0.00</Text>
                        </ImageBackground>
                        <Text style = {{fontSize:18,color:'#FDBB4B',marginLeft:40,marginTop:5}}>0.00</Text>

                    </View>


                    <Text style = {{fontSize:14,color:'gray',width:'100%',paddingLeft:10,
                        backgroundColor:'#F5F5F9',
                        ...Platform.select({
                            ios:{
                                lineHeight:40,
                            },
                            android:{
                            }
                        }),
                        height:40,}}>各业务交易占比</Text>


                    {this.buildCircleChart()}

                </PullView>




            </View>
        )

    }

    buildMonthNavBar(){
        let curMonth = DateUtils.getCurMonth();
        let buttonPramas = {
            txtArray:['3月','4月','本月'],

        };
        return (
            <SlideButton
                {...buttonPramas}
                onButtonClick = {(index)=>{this.onSlideButtonClickListener(index)}}
            />
        );
    };

    onSlideButtonClickListener(index){
        console.log('196---------:'+index);
    };

    buildCircleChart(){
        let tabParams = {
            itemArray:this.testArray,
            chartWidth: this.screenWidth,
            chartHeight: 300,
            outerRadius: 100,
            innerRadius: 80,
        };
        return (
            <CircularChart
                {...tabParams}
            />
        );

    };



}

class CircleItem {

    constructor(){
        this.ratio = 0;
        this.color = '#339900';
        this.degress = 0;

    }

}

const styles = StyleSheet.create({
    match_parent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',

    },
    tradeTxtStyle: {
        width:'100%',height:60,
        fontSize:20,
        textAlign:'center',
        alignItems:'center',
        justifyContent:'center',
        textAlignVertical:'center',
        //backgroundColor:'#56cb90',
        ...Platform.select({
            ios:{
                lineHeight:60,
            },
            android:{
            }
        }),
    },
    tradeSumStyle: {
        flexDirection:'row',
        height:60,
        //backgroundColor:'#b0cb78',
        alignItems: 'center',
        justifyContent: 'center',
    },
});