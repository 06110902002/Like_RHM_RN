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
import ScrollableTab from './ScrollableTab';


export default class ScrollTabDemo extends Component {
    render() {
        return (
            <View style={styles.container}>
                <ScrollableTab>
                    {['页面一', '页面二', '页面三'].map((item, index)=> {
                        return (
                            <Text
                                tabLabel={item}
                                key={item + index}
                                style={{
                                    width: screenW,
                                    flex: 1,
                                }}
                            >
                                {item+"文本内容"}
                            </Text>
                        );
                    })}
                </ScrollableTab>
                {/*<App/>*/}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: screenW,
        flex: 1,
        marginTop: 22,
    },
});
