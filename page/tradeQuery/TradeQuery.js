
import React from "react";
import {Button, View, Text, StyleSheet,Dimensions,
    Image,TextInput,ListView,Alert,Animated,ART,
    Easing,StatusBar,NativeModules,
    TouchableOpacity} from 'react-native';
import BaseComponent from "../BaseComponent";
import Wedge from '../../uikit/art/Wedge';

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
        item3.ratio = 300;
        item3.degress = 300.0 / 600.0 * 360.0;
        item3.color = 'gray';
        this.testArray.push(item3);



    };


    render(){

        return(
            <View style = {{flex:1,backgroundColor:'#F5F5F9'}}>

                {this.setStatusBar('#1373EC')}
                {this.buildTopNavigationBar('交易查询','#1373EC')}

                <Surface width={300} height={300} style={{backgroundColor: 'yellow', marginTop: 10}}>
                    <Wedge
                        outerRadius={100}
                        innerRadius={90}
                        startAngle={0}
                        endAngle={45}
                        originX={150 + 100 * Math.cos(this.degress2Radians(90))}
                        originY={150 - 100 * Math.sin(this.degress2Radians(90))}
                        fill="purple" />

                    {/*/!*<Wedge*!/*/}
                        {/*/!*outerRadius={100}*!/*/}
                        {/*/!*innerRadius={90}*!/*/}
                        {/*/!*startAngle={180}*!/*/}
                        {/*/!*endAngle={360}*!/*/}
                        {/*/!*originX={150}*!/*/}
                        {/*/!*originY={250}       //左半边圆*!/*/}
                        {/*/!*fill="purple" />*!/*/}

                    <Wedge
                        outerRadius={100}
                        innerRadius={90}
                        startAngle={45}
                        endAngle={135}
                        originX={150 +  100 * Math.sin(this.degress2Radians(45))}
                        originY={150 - 100 * Math.cos(this.degress2Radians(45))}
                        fill="green" />

                    <Wedge
                        outerRadius={100}
                        innerRadius={90}
                        startAngle={135}
                        endAngle={270}
                        originX={150 +  100 * Math.sin(this.degress2Radians(135))}
                        originY={150 - 100 * Math.cos(this.degress2Radians(135))}
                        fill="gray" />



                    {/*{ this.testArray.map((name, i) => {*/}
                        {/*let posx = i === 0? 90 : this.testArray[i].degress;*/}
                        {/*return (*/}
                            {/*<Wedge key={i}*/}
                                {/*outerRadius={100}*/}
                                {/*innerRadius={90}*/}
                                {/*startAngle={i === 0 ?  90: this.testArray[i - 1].degress}*/}
                                {/*endAngle={ i === 0 ? name.degress : this.testArray[i - 1].degress + this.testArray[i].degress}*/}
                                {/*originX={150 + 100 * Math.cos(this.degress2Radians(posx))}*/}
                                {/*originY={150 - 100 * Math.sin(this.degress2Radians(posx))}*/}
                                {/*fill={this.testArray[i].color} />*/}
                        {/*);*/}
                    {/*})}*/}



                </Surface>



            </View>
        )

    }

    buildCircleMap(dataArray){

        // for(let i = 0; i < dataArray.length; i ++){
        //     return (
        //         <Wedge
        //             outerRadius={100}
        //             innerRadius={90}
        //             startAngle={i === 0 ?  0: dataArray[i - 1].degress}
        //             endAngle={dataArray[i].degress}
        //             originX={150 +  100 * Math.cos(this.degress2Radians( i === 0? 90 : dataArray[i].degress))}
        //             originY={150 - 100 * Math.sin(this.degress2Radians(i === 0? 90 :dataArray[i].degress))}
        //             fill={dataArray[i].color} />
        //     );
        // }

        { dataArray.map((name, i) => {
            return (
                <Wedge
                    outerRadius={100}
                    innerRadius={90}
                    startAngle={i === 0 ?  0: dataArray[i - 1].degress}
                    endAngle={name.degress}
                    originX={150 + 100 * Math.cos(this.degress2Radians( i === 0? 90 : dataArray[i].degress))}
                    originY={150 - 100 * Math.sin(this.degress2Radians(i === 0? 90 :dataArray[i].degress))}
                    fill={dataArray[i].color} />
            );
        })}

    };

    /**
     * 角度转弧度
     * @param angle
     * @returns {number}
     */
    degress2Radians(angle){

        return angle / 180.0 * 3.1415926;
    };

    /**
     * 值转角度
     * @param value
     * @returns {number}
     */
    value2Degress(value){

        return value / 360.0;
    };




}

class CircleItem {

    constructor(){
        this.ratio = 0;
        this.color = '#339900';
        this.degress = 0;

    }

}