import React from 'react';
import {View, StyleSheet, Text, Animated} from 'react-native';
//third party lib
import Moment from 'moment';
import {Svg, Rect, Text as SvgText, Path, G} from 'react-native-svg';
import {scaleTime, scaleLinear} from "d3-scale";

const data = [
    {
        x: new Date(2020, 8, 27, 9, 0, 0, 0),
        y: 3.2,
    },
    {
        x: new Date(2020, 8, 27, 11, 0, 0, 0),
        y: 3.4,
    },
    {
        x: new Date(2020, 8, 27, 13, 45, 0, 0),
        y: 6.5,
    },
    {
        x: new Date(2020, 8, 27, 17,10, 0, 0),
        y: 12.4,
    },
    {
        x: new Date(2020, 8, 27, 20, 38, 0, 0),
        y: 8.4,
    }
]

export default function DailyBloodSugarLevelBarChart(props) {
    const [selectedIndex, setSelectedIndex] = React.useState(-1);

    const {width, height} = props;
    // initialise all the graph properties.
    // style options
    const padding = 20;
    const paddingLeft = 20;
    const paddingRight = 20;
    const xAxisGapFromText = 15;
    const yAxisGapFromText = 25;
    const axisMargin = 10;
    const barGap = 20;
    let xAxisTextFontSize = 12;
    const yAxisTextFontSize = 12;
    const stepSize = 2;
    const yAxisStartsFrom = 0;
    // bar label properties
    const barLabelHeight = 20;
    const barLabelWidth = 30;
    const barLabelYOffset = 10;
    // lower and upper bound labels
    const lowerBound = 4.0;
    const upperBound = 11.0;

    // d3 properties
    const minX = new Date(2020, 8, 27, 0, 0, 0, 0);
    const maxX = new Date(2020, 8, 27, 23, 59, 0, 0);
    const maxY = 1.25* Math.max(...data.map(d => d.y));

    // d3 scale properties
    const scaleX = scaleTime().domain([minX, maxX]).range([paddingLeft, width - paddingRight]);
    const scaleY = scaleLinear().domain([yAxisStartsFrom, maxY]).range([height - padding, padding]);
    const scaleHeight = scaleLinear().domain([yAxisStartsFrom, maxY]).range([0, height - 2 * padding]);
    const barWidth = 12.5;

    // event handlers
    const handleSelect = (index) => {
        setSelectedIndex(index);
    }

    return (
        <View style={styles.root}>
            <Text style={styles.titleText}>Blood Sugar Level (mmol/L)</Text>
            <View style={styles.barchartContainer}>
                <Svg width={width} height={height}>
                    {   // x axis labels
                        generateXAxisLabels().map((xVal, index) => (
                            <SvgText x={scaleX(xVal)}
                                  key={xVal.toString()}
                                  fontSize={xAxisTextFontSize}
                                  textAnchor='middle'
                                  y={height - padding + xAxisGapFromText} fill='#8d8d8d'>
                                {Moment(xVal).format("H:mm")}
                            </SvgText>
                        ))
                    }
                    {
                        // healthy bounds (lower and upper).
                        <Path key='healthyRange' stroke='none' fill='#F1F6D7'
                              d={`M 0 ${scaleY(lowerBound)} l ${width - paddingLeft - paddingRight + barWidth + 2 * axisMargin} 0
                              l 0 ${-scaleY(upperBound)} l ${-(width - paddingLeft - paddingRight + barWidth + 2 * axisMargin)} 0 Z`}/>
                    }
                    {
                        // vertical lines for x axis labels
                        generateXAxisLabels().map((xVal, index) => (
                            <Path stroke='#E7EBF0'
                                  d={`M ${scaleX(xVal)} ${height - padding} l 0 ${ - (height - 2 * padding)}`}
                            />
                        ))
                    }
                    {
                        // horizontal lines
                        generateYAxisValues(stepSize, yAxisStartsFrom, maxY).map((v, index) => (
                            <Path stroke='#E7EBF0'
                                  key={v.toString()}
                                  d={`M ${paddingLeft - barWidth / 2 - axisMargin} ${scaleY(v)} l ${width - paddingRight - paddingLeft + barWidth + 2 * axisMargin} 0`} />
                        ))

                    }
                    <Path stroke='#E7EBF0'
                          d={`M ${paddingLeft - barWidth / 2 - axisMargin} ${height - padding} l ${width - paddingRight - paddingLeft + barWidth + 2 * axisMargin} 0`} />
                    {   // bars
                        data.map((d, index) => (
                            <Rect
                                onPress={() => handleSelect(index)}
                                rx={3}
                                ry={3}
                                x={scaleX(d.x) - barWidth / 2}
                                y={scaleY(d.y)}
                                width={barWidth}
                                fill={selectedIndex === index ? '#60a354' : '#B2D04B'} height={scaleHeight(d.y)}
                            />
                        ))
                    }
                    {
                        // bar labels: rectangle, triangle and text
                        data.map((d, index) => (
                            <G>
                                <Path opacity={selectedIndex === index ? 1 : 0}
                                      fill='#444C54'
                                      stroke='#444C54'
                                      d={`M ${scaleX(d.x) - barLabelWidth / 8} 
                                      ${scaleY(d.y) - barLabelYOffset} l ${barLabelWidth / 8} ${barLabelHeight / 4}
                                      l ${barLabelWidth / 8} ${-barLabelHeight / 4} Z
                                      `} // triangle size is 1/4 of the height of the bar label, and 1/8 of bar width.
                                    // Maintain this ratio if adjustments are needed
                                />
                                <Rect
                                    rx={5}
                                    ry={5}
                                    width={barLabelWidth}
                                    height={barLabelHeight}
                                    opacity={selectedIndex === index ? 1 : 0}
                                    fill='#444C54'
                                    y={scaleY(d.y) - barLabelHeight - barLabelYOffset}
                                    x={scaleX(d.x) - barLabelWidth / 2}
                                />
                                <SvgText opacity={selectedIndex === index ? 1 : 0}
                                         fontSize={11}
                                         y={scaleY(d.y) - barLabelHeight + 11/3} textAnchor='middle'
                                         x={scaleX(d.x)} fill='#fff'>
                                    {d.y}
                                </SvgText>
                            </G>
                        ))
                    }
                </Svg>
            </View>
        </View>
    )
}

function generateXAxisLabels() {
    let result = []
    for (let i = 0; i <= 24; i = i + 6) {
        if (i == 24) {
            result.push(new Date(2020, 8, 27, 23, 59, 59, 0));
        } else {
            result.push(new Date(2020, 8, 27, i, 0, 0, 0));
        }
    }
    return result
}

function generateYAxisValues(stepSize, startsFrom, maxY) {
    let res = [];
    for (let i = stepSize; i <= maxY; i = i + stepSize){
        res.push(i);
    }
    return res;
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: '#fff'
    },
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#B1B0B0',
    },
    barchartContainer: {
        paddingBottom: '5%',
    }
});