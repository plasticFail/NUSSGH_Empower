import React from 'react';
import {View} from 'react-native';
import {Circle, G, Svg, Text, Path} from "react-native-svg";

const data = [
    { x: 'Protein', y: 200},
    { x: 'Carbohydrate', y: 270},
    { x: 'Fat', y: 320}
]

const data2 = [
    {
        id: 1,
        percent: 20,
        percentScale: 20,
        color: 'red',
    },
    {
        id: 2,
        percent: 20,
        percentScale: 20,
        color: 'green',
    },
    {
        id: 3,
        percent: 20,
        percentScale: 20,
        color: 'blue',
    },
]

const radius = 70;
const padding = 0;
const strokeWidth = 5;
const remainingStrokeColor = null;
const total = data.reduce((acc, curr) => acc + curr.y, 0);
const cumulativeTotal = data.reduce((acc, curr, index) => {
    acc.push(curr.y + acc[index]);
    return acc;
} , [0]);

const ColourArray = [
    "#60A354","#8F31AA","#F5C444","#7BBFDB", "#77B9D2", "#E67471", "#5F90D5",'#5D5D5D'
]

const maxPercentage = 100;

const generateCoordinates = percent => {
    const a = (percent * 2 * Math.PI) / maxPercentage;
    const x = Math.cos(a);
    const y = Math.sin(a);
    return [x, y];
};

const size = 700;
export function PieChart({style}) {
    const radius = size / 2;
    const viewBox = `-${radius} -${radius} ${size} ${size}`;
    let cumulativePercent = 0;

    return (
        <View style={[style, { width: size, height: size}]}>
            <Svg
                width={size}
                height={size}
                viewBox={viewBox}
                style={{ transform: [{ rotate: '-90deg' }] }}>
                {data2.map(slice => {
                    const largeArcFlag = slice.percent > maxPercentage / 2 ? 1 : 0;
                    const xAxisRotation = 0;
                    const sweepFlag = 1;
                    const scaleValue = slice.percentScale / maxPercentage;
                    const [startX, startY] = generateCoordinates(cumulativePercent);
                    const [endX, endY] = generateCoordinates(
                        (cumulativePercent += slice.percent)
                    );

                    // Building the SVG
                    const m = `M ${startX * radius} ${startY * radius}`;
                    const a = `A ${radius} ${radius} ${xAxisRotation} ${largeArcFlag} ${sweepFlag} ${endX *
                    radius} ${endY * radius}`;
                    const l = 'L 0 0';

                    // Calculate offset here
                    const offset = radius * 0.005;
                    const offsetX = offset * (startX + endX + 1);
                    const offsetY = offset * (startY + endY + 1);

                    return (
                        <G key={slice.id} transform={`translate(${offsetX}, ${offsetY})scale(${scaleValue})`}>
                            <Path d={`${m} ${a} ${l}`} fill={slice.color} />
                        </G>
                    );
                })}
            </Svg>
        </View>
    );
};

export function SimplePieChart() {
    const circumference = Math.round(Math.PI * 2 *radius);
    const center = 2 * radius + padding;
    return (
        <Svg width={radius * 4 + 2 * padding} height={radius * 4 + 2 * padding}>
            <G rotation='-90' origin={`${center}, ${center}`}>
                {
                    data.map((d, index) => (
                        <Circle r={radius} cx={center} cy={center} origin={`${center}, ${center}`} fill='none'
                                stroke={ColourArray[index]} strokeWidth={radius} rotation={Math.round(d.y/ total + cumulativeTotal[index] * 360 / total)}
                                strokeDasharray={`${Math.round(d.y / total * circumference)} ${circumference}`}/>
                    ))
                }
                <Circle r={radius} cx={center}
                        cy={center} fill='white' stroke={remainingStrokeColor || 'none'} strokeWidth={strokeWidth} />

                {
                    /*
                        <Circle r={radius / 2} cx={center}
                        strokeDasharray={`${Math.round(percent * innerCircumference)} ${innerCircumference}`}
                        cy={center} fill='none' stroke={color} strokeWidth={radius} />
                        <Circle r={radius / 2} cx={center} rotation={percent * 360} origin={`${center}, ${center}`}
                        strokeDasharray={`${Math.round(percent * innerCircumference)} ${innerCircumference}`}
                        cy={center} fill='none' stroke='lightblue' strokeWidth={radius} />
                     */
                }
            </G>
        </Svg>
    )
}
