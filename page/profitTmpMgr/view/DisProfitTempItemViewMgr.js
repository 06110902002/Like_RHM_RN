import React, {Component} from 'react';
import {Button, View, Text, StyleSheet,Dimensions,
    Image,TextInput,ListView,Alert,Animated,Easing,StatusBar,NativeModules,
    TouchableOpacity} from 'react-native';

import ItemViewMgr from "../../../refresh/view/ItemViewMgr";
import ModelType from "../../../refresh/model/ModelType";
import SubAgentDisProfitTmpModel from "../model/SubAgentDisProfitTmpModel";

/**
 * Created by 刘胡来
 * Date on 2019.04.23
 * Copyright 2013 - 2019 QianTuo Inc. All Rights Reserved
 * Desc:分润模板列表视图管理器
 */
export default class DisProfitTempItemViewMgr extends ItemViewMgr{

    render(){
        let{itemType,ItemData} = this.props;
        let itemView = null;
        switch (itemType) {

            case ModelType.BellowBranchDisProfitTmp:
                itemView = this.buildItemView(ItemData);
                break;

            default:
                itemView = super.render();
                break;

        }
        return itemView;


    }

    buildItemView(data){
        return(
            <View style = {styles.ItemContainer}>
                <Text style = {{marginLeft:10}}>{data.branchName}</Text>
                <View style = {{flex:1}}/>
                <Text style = {{marginRight:20,color:'#4394F1'}}>{data.status === '1' ? "去设置":''}</Text>
                <Image style = {{width:10,height:20,resizeMode:'contain',marginRight:10}}
                       source = {require('../../../images/right_arrow.png')}/>

                <View pointerEvents={'none'} style = {styles.bottomLine}>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    ItemContainer: {
        height:40,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'white'
    },
    bottomLine: {
        height: 0.5,
        width:'100%',
        backgroundColor: 'gray',
        position: 'absolute',
        bottom: 0,

    }


});