/**
 * @author YASIN
 * @version [React-Native Pactera V01, 2017/9/5]
 * @date 2017/9/5
 * @description index
 */
import React, {
    Component
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
const screenW = Dimensions.get('window').width;
const screenH = Dimensions.get('window').height;
import DefaultTabBar from './DefaultTabBar';
//import TabSegment from './TabSegment';

/**
 * Created by 刘胡来
 * Date on 2019.04.02
 * Copyright 2013 - 2019 QianTuo Inc. All Rights Reserved
 * Desc: 滑动选项卡
 */
export default class ScrollableTab extends Component {
    static propTypes = {}
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            containerWidth: screenW,
            currentPage: 0,//当前页面
            scrollXAnim: new Animated.Value(0),
            scrollValue: new Animated.Value(0),
        };
    }

    render() {
        return (
            <View
                style={styles.container}
                onLayout={this._onLayout}
            >
                {/*渲染主体内容*/}
                {this._renderScrollableContent()}
                {/*渲染tabview*/}
                {this._renderTabView()}

            </View>
        );
    }

    componentDidMount() {
        //设置scroll动画监听
        this.state.scrollXAnim.addListener(({value})=> {
            let offset = value / this.state.containerWidth;
            this.state.scrollValue.setValue(offset);
        });
    }

    componentWillUnMount() {
        //移除动画监听
        this.state.scrollXAnim.removeAllListeners();
        this.state.scrollValue.removeAllListeners();
    }

    /**
     * 渲染tabview
     * @private
     */
    _renderTabView() {
        let tabParams = {
            tabs: this._children().map((child)=>child.props.tabLabel), //也可以直接传数组['页面一', '页面二', '页面三']
            activeTab: this.state.currentPage,
            scrollValue: this.state.scrollValue,
            containerWidth: this.state.containerWidth,
        };
        return (
            <DefaultTabBar
                {...tabParams}
                style={[{width: this.state.containerWidth}]}
                onTabClick={(page)=>this.goToPage(page)}
            />
        );
    }

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
                style={{width: this.state.containerWidth}}
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

    /**
     * 获取子控件数组集合
     * @param children
     * @returns {*}
     * @private
     */
    _children(children = this.props.children) {
        return React.Children.map(children, (child)=>child);
    }

    /**
     * 获取控件宽度
     * @param e
     * @private
     */
    _onLayout = (e)=> {
        let {width}=e.nativeEvent.layout;
        if (this.state.containerWidth !== width) {
            this.setState({
                containerWidth: width,
            });
        }
    }

    /**
     * scrollview开始跟结束滑动回调
     * @param e
     * @private
     */
    _onMomentumScrollBeginAndEnd = (e) => {
        let offsetX = e.nativeEvent.contentOffset.x;
        let page = Math.round(offsetX / this.state.containerWidth);
        if (this.state.currentPage !== page) {
            this.setState({
                currentPage: page,
            });
        }
    }

    /**
     * 滑动到指定位置
     * @param pageNum page下标
     * @param scrollAnimation 是否需要动画
     */
    goToPage(pageNum, scrollAnimation = true) {
        if (this._scrollView && this._scrollView._component && this._scrollView._component.scrollTo) {
            this._scrollView._component.scrollTo({x: pageNum * this.state.containerWidth, scrollAnimation});
            this.setState({
                currentPage: pageNum,
            });
        }
    }
}
const styles = StyleSheet.create({
    container: {
        width: screenW,
        flex: 1,
        //marginTop: 22,
    },
});