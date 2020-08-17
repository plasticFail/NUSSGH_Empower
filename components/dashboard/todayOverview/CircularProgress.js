import React from 'react';
import {Circle, G, Svg, Text} from "react-native-svg";

export default function CircularProgress({percent, fontSize, radius, padding, strokeWidth, color}) {
    const circumference = Math.round(2 * Math.PI * radius);
    const center = radius + padding;
    return (
        <Svg width={radius * 2 + 2 * padding} height={radius * 2 + 2 * padding}>
            <G rotation='-90' origin={`${center}, ${center}`}>
                <Circle r={radius} cx={center}
                        cy={center} fill='none' stroke='none' strokeWidth={strokeWidth} />
                <Circle r={radius} cx={center}
                        strokeDasharray={`${circumference}`}
                        strokeDashoffset={`${circumference * (1 - percent) }`}
                        cy={center} fill='none' stroke={color} strokeWidth={strokeWidth} />
            </G>
            <Text fontSize={fontSize} x={`${center}`}
                  y={`${center + fontSize / 3.5}`} fill={color}
                  stroke={color} textAnchor='middle'>{percent * 100 + "%"}</Text>
        </Svg>
    )
}