
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
    ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
const screenW = Dimensions.get('window').width;
const screenH = Dimensions.get('window').height;

/**
 * Created by 刘胡来
 * DateUtils on 2019/4/4
 * Copyright 2013 - 2019 QianTuo Inc. All Rights Reserved
 * Desc: 滑动选项卡
 */
export default class TabSegment extends Component {
    static propTypes = {
        tabs: PropTypes.array,
        activeTab: PropTypes.number,//当前选中的tab
        style: PropTypes.array,
        onTabClick: PropTypes.func,
        containerWidth: PropTypes.number,
    }
    // 构造
    constructor(props) {
        super(props);
        this.state = {};
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
            bottom: 0,
            left:left,
        }
        return (
            <View style={[styles.container, this.props.style]}>

                <ScrollView style = {{width:screenW,backgroundColor:'#b79805'}} horizontal={true}>
                    {/*文本*/}
                    {this.props.tabs.map((name, page) => {
                        const isTabActive = this.props.activeTab === page;
                        return this._renderTab(name, page, isTabActive);
                    })}
                </ScrollView>


                {/*指示线*/}
                <Animated.View
                    style={[styles.tabLineStyle, tabStyle]}
                />
            </View>
        );
    }

    /**
     * 渲染tab
     * @param name 名字
     * @param page 下标 map函数的index
     * @param isTabActive 是否是选中的tab
     * @private
     */
    _renderTab(name, page, isTabActive) {
        let tabTextStyle = null;
        //如果被选中的style
        if (isTabActive) {
            tabTextStyle = {
                color: 'green'
            };
        } else {
            tabTextStyle = {
                color: 'red'
            };
        }
        let self = this;
        return (
            <TouchableOpacity
                key={name + page}
                style={[styles.tabStyle]}
                onPress={()=>this.props.onTabClick(page)}
            >
                <Text style={[tabTextStyle]}>{name}</Text>
            </TouchableOpacity>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        width: screenW,
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
    },
    tabStyle: {
        width:screenW / 3,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabLineStyle: {
        height: 2,
        backgroundColor: 'navy',
    }
});