import React, {
    Component,
} from 'react';
import {
    View,
    ART,

} from 'react-native';

import Wedge from './Wedge';
import PropTypes from 'prop-types';

const {Surface, Shape, Path} = ART;

/**
 * Created by 刘胡来
 * Date on 2019.04.26
 * Copyright 2013 - 2019 QianTuo Inc. All Rights Reserved
 * Desc:环形统计图
 */
export default class CircularChart extends Component {

    static propTypes = {
        itemArray: PropTypes.array,
        chartWidth: PropTypes.number,
        chartHeight: PropTypes.number,
        outerRadius: PropTypes.number,
        innerRadius: PropTypes.number,
    }

    constructor(props) {
        super(props);

    };


    render() {
        let {chartWidth, chartHeight, outerRadius,innerRadius,itemArray}=this.props;
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>

                <Surface width={chartWidth} height={chartHeight}>


                    {itemArray.map((name, i) => {
                        var stratAngle = 0;
                        var endAngle = 0;
                        if (i === 0) {
                            stratAngle = 0;
                        } else {
                            for (let j = 0; j < i; j++) {
                                stratAngle += itemArray[j].degress;
                            }

                        }
                        for (let j = 0; j <= i; j++) {
                            endAngle += itemArray[j].degress;
                        }

                        return (
                            <Wedge key={i}
                                   outerRadius={outerRadius}
                                   innerRadius={innerRadius}
                                   startAngle={stratAngle}
                                   endAngle={endAngle}
                                   originX={chartWidth / 2 + outerRadius * Math.sin(this.degress2Radians(stratAngle))}
                                   originY={chartHeight / 2 - outerRadius * Math.cos(this.degress2Radians(stratAngle))}
                                   fill={itemArray[i].color}/>
                        );
                    })}


                </Surface>


            </View>
        )
    };

    /**
     * 角度转弧度
     * @param angle
     * @returns {number}
     */
    degress2Radians(angle){

        return angle / 180.0 * 3.1415926;
    };

}