import React from 'react';
import {View, Text} from 'react-native';
import {Circle, G, Svg, Text as SvgText} from "react-native-svg";
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function CircularProgress({percent, fontSize, radius, padding, strokeWidth, color, remainingStrokeColor, centreComponent}) {
    const circumference = Math.round(2 * Math.PI * radius);
    const center = radius + padding;
    return (
        <Svg width={radius * 2 + 2 * padding} height={radius * 2 + 2 * padding}>
            <G rotation='-90' origin={`${center}, ${center}`}>
                <Circle r={radius} cx={center}
                        cy={center} fill='none' stroke={remainingStrokeColor || '#eeeede'} strokeWidth={strokeWidth} />
                <Circle r={radius} cx={center}
                        strokeDasharray={`${circumference}`}
                        strokeDashoffset={`${circumference * (1 - percent) }`}
                        strokeLinecap='round'
                        cy={center} fill='none' stroke={color} strokeWidth={strokeWidth} />
            </G>
            {   centreComponent === undefined ?
                <SvgText fontSize={fontSize} x={`${center}`}
                         y={`${center + fontSize / 3.5}`} fill={color}
                         stroke={color} textAnchor='middle'>{Math.round(percent * 100) + "%"}</SvgText>
                :
                <View style={{transform: [{translateX: radius - centreComponent.width / 2}, {translateY: radius - centreComponent.height / 2}]}}>
                    {centreComponent.component}
                </View>
            }
        </Svg>
    )
}
