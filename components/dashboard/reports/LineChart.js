import React from 'react';
import {View, StyleSheet, Text, Animated} from 'react-native';
//third party lib
import Moment from 'moment';
import {Svg, Rect, Text as SvgText, Path, G, Circle} from 'react-native-svg';
import {scaleTime, scaleLinear} from "d3-scale";

const data = [
    {
        x: new Date(2020, 8, 27, 9, 0, 0, 0),
        y: 3.2,
    },
    {
        x: new Date(2020, 8, 27, 11, 0, 0, 0),
        y: 3,
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

// initialise all the graph properties.
// global style options
const padding = 20;
const paddingLeft = 40;
const paddingRight = 25;
const xAxisGapFromText = 15;
const yAxisGapFromText = 12;
const axisMargin = 5;
let xAxisTextFontSize = 12;
const yAxisTextFontSize = 12;
const stepSize = 2;
const yAxisStartsFrom = 0;

const axisColour = '#cdcdcd';
const axisLabelColour = '#8d8d8d';

const showXAxis = true;
const showXAxisLines = false;
const showYAxis = true;
const showYAxisLines = true;

// bar label properties
const barLabelHeight = 25;
const barLabelWidth = 35;
const barLabelYOffset = 10;
const barLabelFontSize = 14;
const barLabelTextYOffset = barLabelFontSize/2;

const pointRadius = 5;
const strokeColor = 'slateblue';
const strokeWidth = 1.5;

export default function LineChart(props) {
    const [selectedIndex, setSelectedIndex] = React.useState(-1);
    const {width, height} = props;

    const minX = new Date(2020, 8, 27, 0, 0, 0, 0);
    const maxX = new Date(2020, 8, 27, 23, 59, 0, 0);
    const maxY = 1.25* Math.max(...data.map(d => d.y));

    const scaleX = scaleTime().domain([minX, maxX]).range([paddingLeft, width - paddingRight]);
    const scaleY = scaleLinear().domain([yAxisStartsFrom, maxY]).range([height - padding, padding]);

    return (
        <View>
            <Svg width={width} height={height}>
                {
                    // x-axis labels
                    showXAxis &&
                    generateXAxisLabels().map((x, index) => (
                        <SvgText fill={axisLabelColour} y={height - padding + xAxisGapFromText} x={scaleX(x)} textAnchor='middle'>
                            {Moment(x).format('H:mm')}
                        </SvgText>
                    ))
                }
                {
                    // y axis labels
                    showYAxis &&
                    generateYAxisValues(stepSize, yAxisStartsFrom, maxY).map((y, index) => (
                        <SvgText fill={axisLabelColour} x={paddingLeft - axisMargin - yAxisGapFromText}
                                 y={scaleY(y)} textAnchor='middle'>
                            {y}
                        </SvgText>
                    ))
                }
                {
                    showXAxisLines &&
                    generateXAxisLabels().map((x, index) => (
                        <Path stroke={axisLabelColour} d={`M ${scaleX(x)} ${padding} l 0 ${height - 2 * padding}`}/>
                    ))
                }
                {
                    showYAxisLines &&
                    generateYAxisValues(stepSize, yAxisStartsFrom, maxY).map((y, index) => (
                       <Path stroke={axisLabelColour} d={`M ${paddingLeft - axisMargin} ${scaleY(y)} l ${width - paddingLeft - paddingRight + 2 * axisMargin} 0`} />
                    ))
                }
                {
                    // one more for x axis.
                    showXAxis &&
                    <Path stroke={axisLabelColour} d={`M ${paddingLeft - axisMargin} ${scaleY(yAxisStartsFrom)} l ${width - paddingLeft - paddingRight + 2 * axisMargin} 0`} />
                }
                {
                    // plot lines
                    <LinePlot data={data} scaleX={scaleX} scaleY={scaleY} lineColor={strokeColor} lineWidth={strokeWidth} />
                }
                {
                    // plot points
                    data.map((d, index) => (
                        <Circle cx={scaleX(d.x)} cy={scaleY(d.y)} r={pointRadius} fill='#000' onPress={()=>setSelectedIndex(index)} />
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
                                     fontSize={barLabelFontSize}
                                     fontWeight='bold'
                                     y={scaleY(d.y) - barLabelHeight + barLabelTextYOffset} textAnchor='middle'
                                     x={scaleX(d.x)} fill='#fff'>
                                {d.y}
                            </SvgText>
                        </G>
                    ))
                }
            </Svg>
        </View>
    )
}

function LinePlot({data, scaleX, scaleY, lineColor, lineWidth}) {
    if (data.length <= 1) {
        return null;
    } else {
        let currentDataPoint = data[0];
        let result = [];
        for (let i = 1; i < data.length; i++) {
            const currX = scaleX(currentDataPoint.x);
            const currY = scaleY(currentDataPoint.y);
            const nextPoint = data[i];
            const nextX = scaleX(nextPoint.x);
            const nextY = scaleY(nextPoint.y);

            const dy = nextY - currY;
            const dx = nextX - currX;
            // draw a line from the current data point to the next data point.
            const p = <Path stroke={lineColor} strokeWidth={lineWidth || 1}
                            d={`M ${currX} ${currY} l ${dx} ${dy}`}
            />;
            result.push(p);
            currentDataPoint = nextPoint;
        }
        return result;
    }
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
    for (let i = startsFrom; i <= maxY; i = i + stepSize){
        res.push(i);
    }
    return res;
}
//edit flag
