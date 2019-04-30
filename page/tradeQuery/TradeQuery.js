
import React from "react";
import {Button, View, Text, StyleSheet,ScrollView,
    Image,TextInput,ListView,Alert,Animated,ART,
    Easing,StatusBar,NativeModules,
    TouchableOpacity} from 'react-native';
import BaseComponent from "../BaseComponent";
import Wedge from '../../uikit/art/Wedge';
import CircularChart from '../../uikit/art/CircularChart';

const {Surface, Shape, Path} = ART;

/**
 * Created by 刘胡来
 * Date on 2019.04.25
 * Copyright 2013 - 2019 QianTuo Inc. All Rights Reserved
 * Desc: 交易查询
 */
export default class TradeQuery extends BaseComponent{

    constructor(props){
        super(props);

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



    };


    render(){

        return(
            <View style = {{flex:1,backgroundColor:'#F5F5F9'}}>

                {this.setStatusBar('#1373EC')}
                {this.buildTopNavigationBar('交易查询','#1373EC')}
                {this.buildCircleChart()}

                <ScrollView
                    onScroll={this._onScroll}
                    onScrollBeginDrag={this._onScrollBeginDrag}
                    onScrollEndDrag={this._onScrollEndDrag}
                    scrollEventThrottle={16}    //设置16，一帧回调一次这个onScroll方法
                >
                    <Text style={{height: 30, backgroundColor: 'pink'}}>--------1111111---------</Text>
                    <Text style={{height: 100, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 100, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 100, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 100, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 100, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 100, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 100, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 100, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 100, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 100, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 100, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 100, backgroundColor: 'pink'}}>11111111</Text>
                    <Text style={{height: 100, backgroundColor: 'pink'}}>11111111</Text>

                </ScrollView>

            </View>
        )

    }

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


    /**
     * 滑动开始回调事件
     *
     * 注意：当刚刚开始滑动时，event.nativeEvent.contentOffset.y仍然是上次滑动的值，没有变化
     *
     * @param event
     * @private
     */
    _onScrollBeginDrag = (event) => {
        //event.nativeEvent.contentOffset.y表示Y轴滚动的偏移量
        const offsetY = event.nativeEvent.contentOffset.y;
        //记录ScrollView开始滚动的Y轴偏移量
        this.scrollViewStartOffsetY = offsetY;
    };

    /**
     * ScrollView滑动回调事件
     * @param event
     * @private
     */
    _onScroll = (event) => {

        const offsetY = event.nativeEvent.contentOffset.y;
        if (this.scrollViewStartOffsetY > offsetY) {

            console.log('152-------手势往下滑动');

        } else if (this.scrollViewStartOffsetY < offsetY) {

            console.log('159----------手势往上滑动');

        }
    };


    /**
     * 滑动停止回调事件
     * @param event
     * @private
     */
    _onScrollEndDrag = (event) => {
        console.log('168---------_onScrollEndDrag');
        //console.log('Y=' + event.nativeEvent.contentOffset.y);
    };



}

class CircleItem {

    constructor(){
        this.ratio = 0;
        this.color = '#339900';
        this.degress = 0;

    }

}