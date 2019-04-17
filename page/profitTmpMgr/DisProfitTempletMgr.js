import React from "react";
import {Button, View, Text, StyleSheet,Dimensions,
    Image,TextInput,ListView,Alert,Animated,Easing,
    TouchableOpacity} from 'react-native';

import SlideButton from '../../uikit/slideButton/SlideButton';

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

/**
 * Created by 刘胡来
 * Date on 2019.04.14
 * Copyright 2013 - 2019 QianTuo Inc. All Rights Reserved
 * Desc: 分润模板管理
 */
export default class DisProfitTempletMgr extends React.Component{

    constructor(){
        super();
        this.state = {
            indexViewMarginLeft:new Animated.Value(20),
            activityTxtColor:'#4394F1',
            inactiveTxtColor:'gray',
            selecIndex:1,
        };

    };

    moveLeftAnim(){
        Animated.timing(this.state.indexViewMarginLeft, {
            toValue: 20,
            duration: 800,
            easing: Easing.linear
        }).start();
    };

    moveRightAnim(){
        Animated.timing(this.state.indexViewMarginLeft, {
            toValue: screenWidth / 2 + 10,
            duration: 800,
            easing: Easing.linear
        }).start();
    };

    componentDidMount() {
        // this.state.indexViewMarginLeft.addListener(({value})=> {
        //    if(value === 20){
        //        // this.setState({
        //        //     selecIndex:1,
        //        // },()=>{
        //        //
        //        // });
        //        this.refs.index1.setNativeProps({
        //            style: {
        //                color: this.state.activityTxtColor,
        //            }
        //        });
        //        this.refs.index2.setNativeProps({
        //            style: {
        //                color: this.state.inactiveTxtColor,
        //            }
        //        });
        //
        //    }else if(value === (screenWidth / 2 + 10)){
        //        this.refs.index2.setNativeProps({
        //            style: {
        //                color: this.state.activityTxtColor,
        //            }
        //        });
        //        this.refs.index1.setNativeProps({
        //            style: {
        //                color: this.state.inactiveTxtColor,
        //            }
        //        });
        //    }
        // });
    }

    componentWillUnMount() {
        this.state.indexViewMarginLeft.removeAllListeners();
    }

    buildSlideButtonView(){
        let buttonParmas = {
            txtArray:['我的分润模板','下级代理分润模板'],
        };
        return (
            <SlideButton
                {...buttonParmas}

                onButtonClick={(index)=>this.onSildeButtonClick(index)}
            />
        );
    };

    onSildeButtonClick(index){
        console.log('98------------onSildeButtonClick:'+index);
    };

    render(){
        return(
            <View style = {{flex:1}}>

                {/*<View style = {{width:'100%',height:60,flexDirection:'row'}}>*/}
                    {/*<Text style = {[styles.slideButtonStyle,{marginLeft:20,marginRight:10,color:this.state.activityTxtColor,}]}*/}
                          {/*ref = "index1"*/}
                          {/*onPress = {() =>this.moveLeftAnim()}>*/}
                            {/*我的分润模板*/}
                    {/*</Text>*/}

                    {/*<Text style = {[styles.slideButtonStyle,{marginLeft:10,marginRight:20,color:this.state.inactiveTxtColor}]}*/}
                          {/*ref = "index2"*/}
                          {/*onPress = {() =>this.moveRightAnim()}>*/}
                        {/*下级代理分润模板*/}
                    {/*</Text>*/}

                {/*</View>*/}

                {/*/!*滚动视图*!/*/}
                {/*<Animated.View style = {{height:50,width:screenWidth / 2 - 30,*/}
                    {/*borderWidth:2,borderColor:'#4394F1',*/}
                    {/*borderRadius:22.5,marginTop:-55,marginLeft:this.state.indexViewMarginLeft}}>*/}

                {/*</Animated.View>*/}
                {this.buildSlideButtonView()}



            </View>
        )

    }
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