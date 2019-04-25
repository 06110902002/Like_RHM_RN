
import React, {
    Component,
} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Animated,
} from 'react-native';
import PropTypes from 'prop-types';



import DefaultTabBar from "../../uikit/scrollTab/DefaultTabBar";

const screenW = Dimensions.get('window').width;
const screenH = Dimensions.get('window').height;

/**
 * Created by 刘胡来
 * Date on 2019.04.23
 * Copyright 2013 - 2019 QianTuo Inc. All Rights Reserved
 * Desc:
 */
export default class MenuBar extends DefaultTabBar{
    // 构造
    constructor(props) {
        super(props);
        this.state = {
            activityTxtColor:'#4394F1',
            inactiveTxtColor:'gray',
        };
    }

    render() {
        let {containerWidth, tabs, scrollValue}=this.props;
        //给传过来的动画一个插值器
        const left = scrollValue.interpolate({
            inputRange: [0, 1,],
            outputRange: [0, containerWidth / tabs.length,],
        });
        let tabStyle = {
            width: containerWidth / tabs.length,
            position: 'absolute',
            //bottom: 0,
            left:left,
            top:0,
        }
        return (
            <View style={[styles.container, this.props.style]}>

                {/*文本*/}
                {this.props.tabs.map((name, page) => {
                    const isTabActive = this.props.activeTab === page;
                    return this._renderTab(name, page, isTabActive);
                })}

                {/*指示游标*/}
                <Animated.View pointerEvents={'none'} style = {[styles.tabLineStyle, tabStyle]}>

                </Animated.View>

            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        width: screenW,
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
        backgroundColor:'white'
    },
    tabStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabLineStyle: {
        height:40,
        borderWidth:2,
        borderColor:'#4394F1',
        borderRadius:20,
        marginTop:10,

    }
});