import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from "react-native";

export default function ImageWithBadge({imageProps, badgeColor, badgeIcon, containerStyle, badgeSize}) {
    const finalContainerStyle = {
        ...styles.container,
        ...containerStyle
    }
    const imageSize = Math.min(finalContainerStyle.width, finalContainerStyle.height) - badgeSize;
    const badgeTranslatedPositionX = imageSize / 2;
    const badgeTranslatedPositionY = - imageSize / 2;
    const finalBadgeStyle = {
        ...styles.badge,
        backgroundColor: badgeColor,
        transform: [{translateX: badgeTranslatedPositionX}, {translateY: badgeTranslatedPositionY}],
        borderRadius: badgeSize / 2
    };
    return (
        <View style={finalContainerStyle}>
            <Image {...imageProps} style={{width: imageSize, height: imageSize}}/>
            <TouchableOpacity style={finalBadgeStyle}>
                {badgeIcon}
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 60,
        height: 60,
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    badge: {
        width: 12.5,
        height: 12.5,
        borderRadius: 6.25,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center'
    }
})