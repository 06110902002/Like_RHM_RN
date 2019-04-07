import React, {Component} from 'react';
import {
    View, Text, ActivityIndicator, Image,
    StyleSheet, TouchableOpacity, Button, Alert, Dimensions
} from 'react-native';


import TitleModel from '../model/TitleModel';
import ModelType from "../model/ModelType";
import PropTypes from 'prop-types';


let screenWidth = Dimensions.get('window').width;

/**
 * 单元格中视图的统一管理器
 */
export default class ItemViewMgr extends Component<Props>{

    static propTypes = {
        onItemClickListener: PropTypes.func,     // 单元格的点击方法

    };


    render() {
        let{itemType,ItemData} = this.props;
        let itemView = null;
        switch (itemType){
            case ModelType.Title:
                itemView =  this.buildTitleView();
                break;

            case ModelType.default:
                itemView = this.buildDefaultView();
                break;

            case ModelType.HomeFuncMenu:
                itemView = this.buildHomeFuncMenuView(ItemData);
                break;

        }
        return itemView;

    };

    buildTitleView(){
        let{ItemData} = this.props;
        return (
            <TouchableOpacity style={styles.container} onPress = {() =>this.onClick(ItemData)}>
                <Text style={styles.item}>{ItemData.titleContent}</Text>
            </TouchableOpacity>
        );
    };

    buildDefaultView(){
        let{ItemData} = this.props;
        return <View style={styles.container}>
            <Text  syle={styles.item}>{'3434'}</Text>
        </View>
    };


    /**
     * 构建首页功能菜单
     * @param  ItemData
     */
    buildHomeFuncMenuView(ItemData){
        let icon = ItemData.menuIcon;//'../../page/main/img/icon_01.png';
        return(
            <View style = {[styles.menuItemStyle,{marginRight:0.5,marginLeft:0.5}]}>

                <TouchableOpacity  style = {{width:50,height:50,
                    alignItems: 'center', justifyContent:'center'}} onPress={() => this.onClick()}>
                    <Image style = {{width:40,height:40}}
                           source = {icon}/>
                </TouchableOpacity>

                <Text style={{fontSize:12,top:10}}>{ItemData.menuTxt}</Text>

            </View>
        );
    };


    /**
     * 按钮点击事件，并通过属性 onItemClickListener 传递出去
     * @param ItemData
     */
    onClick(ItemData){
        this.props.onItemClickListener && this.props.onItemClickListener(ItemData);
    };

}

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        marginTop:5,
        height:50,

    },

    universityStyle:{
        marginTop:5,
        height:70,
        backgroundColor:'#c5ecff',
        flexDirection:'row',
        marginRight: 15,
        marginLeft: 15,
        alignItems: 'center',
    },
    universityTxtStyle:{
        flex:1,
        height:70,
        marginLeft:10,
        flexDirection:'column',
        backgroundColor:'#c0ab67',
        justifyContent: 'center',
    },


    item: {
        backgroundColor: '#c5ecff',
        height: 50,
        marginRight: 15,
        marginLeft: 15,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
        elevation:5,//漂浮的效果
        borderRadius:5,//圆角
    },
    menuItemStyle:{
        height:100,
        width:screenWidth / 3,
        alignItems: 'center',
        flexDirection:'column',
        justifyContent:'center',
        backgroundColor:'white',
    },

});
