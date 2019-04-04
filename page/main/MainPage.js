import React from 'react';
import {Button, View, Text, StyleSheet,
    Image,TextInput,ListView,ScrollView,Dimensions,
    TouchableOpacity} from 'react-native';
import { Alert } from 'react-native'

import {FlatList} from 'react-native';
let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

export default class MainPage extends React.Component{


    constructor(props) {
        super(props);

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

                    <Text style={styles.topTitleTxtStyle}>瑞花宝-瑞花蜜</Text>

                    <TouchableOpacity  style = {{width:50,height:50,
                        alignItems: 'center', backgroundColor:'#121e67',

                        justifyContent:'center'}} onPress={() => this.showNotifyMsg()}>

                        <Image style = {{width:20,height:20}}
                               source = {require('../../images/flashpay_lingdang.png')}/>

                    </TouchableOpacity>

                </View>

                {/*顶部滑动选项卡*/}
                <View >
                    <ScrollView
                        contentContainerStyle={styles.contentContainer}
                        bounces={false}
                        pagingEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        onMomentumScrollEnd={(e)=>this.onAnimationEnd(e)}
                        //onTouchMove={(e) =>this.onTouchMove(e)}
                        horizontal={true}>
                        {this.buildTradeView()}
                        {this.buildTradeView()}
                        {this.buildTradeView()}

                    </ScrollView>

                    <View ref = 'indexLine' style={{backgroundColor:'#239090',height:10}} />

                </View>







            </View>


        );

    };

    showNotifyMsg(){

    };

    /**
     * 创建交易item视图
     * @param count
     */
    buildTradeView(){

        return (
            <View style = {styles.scrollVerticalLayout}>
                <Text style={styles.topTitleTxtStyle}>今日交易金额</Text>
            </View>
        );

    };

    // 当一帧滚动结束的时候调用
    onAnimationEnd(e){
        // 1.求出水平方向的偏移量
        var offsetX = e.nativeEvent.contentOffset.x;
        // 2.求出当前的页数         floor函数 取整
        var currentPage = Math.floor(offsetX / screenWidth);

        // 3.更新状态机
        this.setState({
            // 当前页
            currentPage: currentPage
        })

        this.refs.accountHistoryListView.setNativeProps({
            style:{
                height:isShowAccountHistory? this.state.dataArray.length * 50:0,
            }
        });

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
        flex:1,
        fontSize:16,
        color:'white',
        textAlign:'center',
        //backgroundColor:'#8b3e67',
        //position:'absolute'
    },

    scrollVerticalLayout:{
        width: screenWidth,
        top:40,
        height:200,
        flexDirection:'column',
        alignItems:'center',    //垂直居中
        justifyContent:'center',
        backgroundColor:'#123e67',
    },


});