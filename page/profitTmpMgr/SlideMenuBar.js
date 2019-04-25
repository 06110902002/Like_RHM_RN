
import React, {
    Component,
} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    Animated,
} from 'react-native';

import ScrollableTab from "../../uikit/scrollTab/ScrollableTab";
import MenuBar from './MenuBar'

const screenW = Dimensions.get('window').width;
const screenH = Dimensions.get('window').height;

/**
 * Created by 刘胡来
 * Date on 2019.04.23
 * Copyright 2013 - 2019 QianTuo Inc. All Rights Reserved
 * Desc: 分润模板管理中的滑动菜单栏
 */
export default class SlideMenuBar extends ScrollableTab{

    // 构造
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View
                style={styles.container}
                onLayout={this._onLayout}
            >
                {/*渲染tabview*/}
                {this._renderTabView()}
                {/*渲染主体内容*/}
                {this._renderScrollableContent()}

            </View>
        );
    }

    /**
     * @override
     */
    _renderTabView(){
        let tabParams = {
            tabs: this._children().map((child)=>child.props.tabLabel), //也可以直接传数组['页面一', '页面二', '页面三']
            activeTab: this.state.currentPage,
            scrollValue: this.state.scrollValue,
            containerWidth: this.state.containerWidth,
        };
        return (
            <MenuBar
                {...tabParams}
                style={[{width: this.state.containerWidth}]}
                onTabClick={(page)=>this.goToPage(page)}
            />
        );
    };

    /**
     * 渲染主体内容
     * @private
     */
    _renderScrollableContent() {
        return (
            <Animated.ScrollView
                ref={(ref) => {
                    this._scrollView = ref;
                }}
                style={{width: this.state.containerWidth,marginTop:10}}
                pagingEnabled={true}
                horizontal={true}
                onMomentumScrollBegin={this._onMomentumScrollBeginAndEnd}
                onMomentumScrollEnd={this._onMomentumScrollBeginAndEnd}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={15}
                onScroll={Animated.event([{
                    nativeEvent: {contentOffset: {x: this.state.scrollXAnim}}
                }], {
                    useNativeDriver: true,
                })}
                bounces={false}
                scrollsToTop={false}
            >
                {/*创建scroll Item 视图*/}
                {this.props.children}
            </Animated.ScrollView>
        );
    }



}
const styles = StyleSheet.create({
    container: {
        width: screenW,
        flex: 1,
        //marginTop: 22,
    },
});