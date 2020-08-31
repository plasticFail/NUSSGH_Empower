import React from 'react';
import {View, Dimensions} from 'react-native';
//third party lib
import Moment from 'moment';
import {Svg, Rect, Text, Path, G} from 'react-native-svg';
import {scaleTime, scaleLinear} from "d3-scale";

//test data
const data = [
    {
        x: new Date(2020, 7, 11),
        y: 3340,
        y2: 10,
    },
    {
        x: new Date(2020, 7, 12),
        y: 5321,
        y2: 15,
    },
    {
        x: new Date(2020, 7, 13),
        y: 4213,
        y2: 20,
    },
    {
        x: new Date(2020, 7, 14),
        y: 3383,
        y2: 25,
    },
    {
        x: new Date(2020, 7, 15),
        y: 0,
        y2: 30,
    },
    {
        x: new Date(2020, 7, 16),
        y: 2998,
        y2: 35
    },
    {
        x: new Date(2020, 7, 17),
        y: 2678,
        y2: 7
    }
]

// style options
const padding = 20;
const paddingLeft = 60;
const paddingRight = 40;
const {width} = Dimensions.get('window');
const height = 300;
const xAxisGapFromText = 15;
const yAxisGapFromText = 25;
const axisMargin = 10;
const barGap = 20;
let xAxisTextFontSize = 12;
const yAxisTextFontSize = 12;
const stepSize = 500;
const yAxisStartsFrom = 0;

// Scale axis functions from d3.
const minX = data[0].x;
const maxX = data[data.length - 1].x;
const minY = Math.min(...data.map(d => d.y));
const maxY = Math.max(...data.map(d => d.y));
const dayDifference = Moment(maxX).diff(Moment(minX), 'days') + 1;

const scaleX = scaleTime().domain([minX, maxX]).range([paddingLeft, width - paddingRight]);
const scaleY = scaleLinear().domain([yAxisStartsFrom, maxY]).range([height - padding, padding]);
const scaleHeight = scaleLinear().domain([yAxisStartsFrom, maxY]).range([0, height - 2 * padding]);
const scaledWidth = (width - paddingLeft - paddingRight) / (dayDifference - 1) - barGap;
xAxisTextFontSize  = xAxisTextFontSize / Math.max(dayDifference - 7, 1);

export default function SimpleBarChart(props) {
    const [selectedIndex, setSelectedIndex] = React.useState(-1);

    const handleBarSelect = (index) => () => {
        setSelectedIndex(index);
        props.onPressData(data[index]);
    }

    return (
        <View style={{backgroundColor: '#fff'}}>
            <Svg width={width} height={height}>
                {   // x axis labels
                    data.map((d, index) => (
                        <Text x={scaleX(d.x)}
                              key={d.x.toString()}
                              fontSize={xAxisTextFontSize}
                              textAnchor='middle'
                              y={height - padding + xAxisGapFromText} fill='#8d8d8d'>
                            {Moment(d.x).format("ddd")}
                        </Text>
                    ))
                }
                {
                    // horizontal lines
                    generateYAxisValues(stepSize, yAxisStartsFrom, maxY).map((v, index) => (
                        <Path stroke='#adadad'
                              key={v.toString()}
                              d={`M ${paddingLeft - scaledWidth / 2 - axisMargin} ${scaleY(v)} l ${width - paddingRight - paddingLeft + scaledWidth + 2 * axisMargin} 0`} />
                    ))

                }
                {   // y axis labels
                    generateYAxisValues(stepSize, yAxisStartsFrom, maxY).map((v, index) => (
                        <Text x={paddingLeft - scaledWidth / 2 - yAxisGapFromText}
                              key={v.toString()}
                              y={scaleY(v)} fill='#8d8d8d' fontSize={yAxisTextFontSize}
                              textAnchor='middle'>
                            {v}
                        </Text>
                    ))
                }
                <Path stroke='#adadad'
                      d={`M ${paddingLeft - scaledWidth / 2 - axisMargin} ${height - padding} l ${width - paddingRight - paddingLeft + scaledWidth + 2 * axisMargin} 0`} />
                {
                    data.map((d, index) => (
                        /*
                        <G>
                            <Rect
                                onPress={handleBarSelect(index)}
                                key={d.x.toString()}
                                rx={3}
                                ry={3}
                                x={scaleX(d.x) - scaledWidth / 2}
                                y={scaleY(d.y)}
                                width={scaledWidth / 2 - 2}
                                fill={selectedIndex === index ? '#3caea3' : '#03dac6'} height={scaleHeight(d.y)}
                            />
                            <Rect
                                onPress={handleBarSelect(index)}
                                key={d.x.toString()+ '1'}
                                rx={3}
                                ry={3}
                                x={scaleX(d.x) + 2}
                                y={scaleY(d.y2)}
                                width={scaledWidth / 2 - 2}
                                fill={selectedIndex === index ? '#3caea3' : '#03dac6'} height={scaleHeight(d.y2)}
                            />
                        </G>
                         */

                        <Rect
                            onPress={handleBarSelect(index)}
                            rx={3}
                            ry={3}
                            x={scaleX(d.x) - scaledWidth / 2}
                            y={scaleY(d.y)}
                            width={scaledWidth}
                            fill={selectedIndex === index ? '#3caea3' : '#03dac6'} height={scaleHeight(d.y)}
                        />
                    ))
                }
            </Svg>
        </View>
    )
}

function generateYAxisValues(step, yMin, yMax) {
    let result = []
    for (let i = yMin; i <= yMax; i = i + step) {
        result.push(i);
    }
    return result;
}
