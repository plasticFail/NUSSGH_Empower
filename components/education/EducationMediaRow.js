import React from 'react';
import {View, Text, Image, StyleSheet, Dimensions, Platform, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import globalStyles from "../../styles/globalStyles";
import {horizontalMargins} from "../../styles/variables";
import {WebView} from "react-native-webview";
import InAppBrowser from 'react-native-inappbrowser-reborn';

const {width, height} = Dimensions.get('window');

const topBottomPadding = 15;
const mediaWidthRatio = 0.47;
const mediaHeightRatio = 0.11;
const mediaWidth = mediaWidthRatio * (width - horizontalMargins);
const mediaHeight = mediaHeightRatio * height;

const playButtonSize = 40;

function EducationMediaRow(props) {
    const {title, videoUrl, organization, pictureUrl, url} = props;

    const openUrl = async (url) => {
        if (url && await InAppBrowser.isAvailable) {
            InAppBrowser.open(url).then(resp => {
                if (resp.type === 'success') {
                    // Opened link successfully
                }
            });
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => videoUrl ? null : openUrl(url)}>
            <View style={{  flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderBottomWidth: 1,
                            borderColor: 'rgba(0, 0, 0, 0.15)',
                            paddingTop: topBottomPadding,
                            paddingBottom: topBottomPadding}}
            >
                <View style={{width: width - horizontalMargins - mediaWidth}}>
                    <Text style={[globalStyles.pageDetails, {marginStart: 0}]}>{title}</Text>
                    <Text style={[globalStyles.pageDetails, {marginStart: 0, fontWeight: 'normal', color: 'rgba(0,0,0,0.6)'}]}>
                        {organization}
                    </Text>
                </View>
                <Image source={{uri: pictureUrl}} style={{width: mediaWidth, height: mediaHeight}}/>
                {   videoUrl &&
                    <TouchableOpacity
                    onPress={() => openUrl(url)}
                    style={{
                        position: 'absolute',
                        backgroundColor: 'rgba(0,0,0, 0.4)',
                        width: playButtonSize,
                        height: playButtonSize,
                        borderRadius: playButtonSize / 2,
                        justifyContent: 'center',
                        alignItems: 'center',
                        transform: [{translateX: width - horizontalMargins - mediaWidth + mediaWidth / 2 - playButtonSize / 2}]
                    }}>
                        <View style={[styles.triangle, {transform: [{rotate: '90deg'}]}]}/>
                    </TouchableOpacity>
                }
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    mediaStyle: {
        width: mediaWidth,
        height: mediaHeight,
        resizeMode: 'cover',
        flex: 1
    },
    triangle: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 8,
        borderRightWidth:  8,
        borderBottomWidth: 8,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'white'
    }
});

export {EducationMediaRow, mediaHeight, mediaWidth};
