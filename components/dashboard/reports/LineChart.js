import React from 'react';
import {View, StyleSheet, Text, Animated} from 'react-native';
//third party lib
import Moment from 'moment';
import {Svg, Rect, Text as SvgText, Path, G, Circle} from 'react-native-svg';
import {scaleTime, scaleLinear} from "d3-scale";
import {
    formatY,
    generateXAxisLabels,
    generateYAxisValues,
    getYStepSize,
    processData
} from "../../../commonFunctions/reportDataFormatter";
import {DAY_FILTER_KEY} from "../../../screens/main/reports";
import {Colors} from "../../../styles/colors";

// initialise all the graph properties.
// global style options
const padding = 20;
const paddingLeft = 60;
const paddingRight = 40;
const xAxisGapFromText = 15;
const yAxisGapFromText = 18;
const axisMargin = 20;

const axisColour = '#cdcdcd';
const axisLabelColour = '#E1E7ED';
const axisTextLabelColour = '#3c3c43';

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
const pointColor = Colors.nextBtnColor;
const strokeColor = Colors.nextBtnColor;
const strokeWidth = 3;

export default function LineChart(props) {
    const [selectedIndex, setSelectedIndex] = React.useState(-1);
    const {width, height} = props;
    const data = processData(props.filterKey, props.data, props.xExtractor, props.yExtractor, 'average');
    // d3 properties
    const maxY = Math.max(props.defaultMaxY, 1.25* Math.max(...data.map(d => d.y)));
    const xAxisLabels = generateXAxisLabels(props.filterKey);
    const yAxisStartsFrom = Math.min(props.defaultMinY ? props.defaultMinY : 0, Math.round(0.75 * Math.min(...data.map(d => d.y))));
    const minX = xAxisLabels[0];
    const maxX = xAxisLabels[xAxisLabels.length - 1];
    const yAxisLabels = generateYAxisValues(getYStepSize(yAxisStartsFrom, maxY), yAxisStartsFrom, maxY);

    // d3 scale properties
    const scaleX = scaleTime().domain([minX, maxX]).range([paddingLeft, width - paddingRight]);
    const scaleY = scaleLinear().domain([yAxisStartsFrom, maxY]).range([height - padding, padding]);
    const scaleHeight = scaleLinear().domain([yAxisStartsFrom, maxY]).range([0, height - 2 * padding]);

    return (
        <View>
            <Svg width={width} height={height}>
                {   // boundaries
                    props.lowerBound && props.upperBound &&
                    <Path key='healthyRange' stroke='none' fill={props.boundaryFill || '#F1F6D7'}
                          d={`M ${paddingLeft - axisMargin} ${scaleY(props.lowerBound)} l ${width - paddingLeft - paddingRight + 2 * axisMargin} 0
                              l 0 ${-scaleHeight(props.upperBound - props.lowerBound)} l ${-(width - paddingLeft - paddingRight + 2 * axisMargin)} 0 Z`}/>


                }
                {
                    // x-axis labels
                    showXAxis &&
                    xAxisLabels.map((x, index) => (
                        <SvgText fill={axisTextLabelColour} y={height - padding + xAxisGapFromText} x={scaleX(x)} textAnchor='middle'>
                            {Moment(x).format(props.filterKey === DAY_FILTER_KEY ? "H:mm" : "DD/MM")}
                        </SvgText>
                    ))
                }
                {
                    // y axis labels
                    showYAxis &&
                    yAxisLabels.map((y, index) => (
                        <SvgText fill={axisTextLabelColour} x={paddingLeft - axisMargin - yAxisGapFromText}
                                 y={scaleY(y)} textAnchor='middle'>
                            {y}
                        </SvgText>
                    ))
                }
                {

                    showXAxisLines &&
                    xAxisLabels.map((x, index) => (
                        <Path stroke={axisLabelColour} d={`M ${scaleX(x)} ${padding} l 0 ${height - 2 * padding}`}/>
                    ))
                }
                {
                    showYAxisLines &&
                    yAxisLabels.map((y, index) => (
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
                        <Circle cx={scaleX(d.x)} cy={scaleY(d.y)} r={pointRadius} fill={pointColor} onPress={()=>setSelectedIndex(index)} />
                    ))
                }
                {
                    // point labels: rectangle, triangle and text
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
                                width={barLabelWidth + formatY(d.y).length * 2 * 2}
                                height={barLabelHeight}
                                opacity={selectedIndex === index ? 1 : 0}
                                fill='#444C54'
                                y={scaleY(d.y) - barLabelHeight - barLabelYOffset}
                                x={scaleX(d.x) - barLabelWidth / 2 - formatY(d.y).length * 2}
                            />
                            <SvgText opacity={selectedIndex === index ? 1 : 0}
                                     fontSize={barLabelFontSize}
                                     fontWeight='bold'
                                     y={scaleY(d.y) - barLabelHeight + barLabelTextYOffset} textAnchor='middle'
                                     x={scaleX(d.x)} fill='#fff'>
                                {formatY(d.y)}
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
