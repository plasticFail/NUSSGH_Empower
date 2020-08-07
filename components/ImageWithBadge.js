import React from 'react';
import {StyleSheet, TouchableOpacity, Image} from "react-native";

export default function ImageWithBadge({imageProps, badgeColor, badgeIcon, containerStyle, badgeSize, onPressImage}) {
    const finalContainerStyle = {
        ...styles.container,
        ...containerStyle
    }
    const imageSize = Math.min(finalContainerStyle.width, finalContainerStyle.height);
    const badgeTranslatedPositionX = imageSize / 2;
    const badgeTranslatedPositionY = - imageSize / 2;
    const finalBadgeStyle = {
        ...styles.badge,
        backgroundColor: badgeColor,
        width: badgeSize,
        height: badgeSize,
        transform: [{translateX: badgeTranslatedPositionX}, {translateY: badgeTranslatedPositionY}],
        borderRadius: badgeSize / 2
    };
    return (
        <TouchableOpacity style={finalContainerStyle} onPress={onPressImage}>
            <Image {...imageProps} style={{width: imageSize, height: imageSize}}/>
            <TouchableOpacity style={finalBadgeStyle}>
                {badgeIcon}
            </TouchableOpacity>
        </TouchableOpacity>
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
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center'
    }
})