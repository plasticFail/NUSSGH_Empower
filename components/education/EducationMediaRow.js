import React from 'react';
import {View, Text, Image, StyleSheet, Dimensions, Platform, TouchableOpacity} from 'react-native';
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

function EducationMediaRow(props) {
    const {title, mediaDisplayUri, organization, uriType, uri} = props;

    const openUrl = async (url) => {
        if (uri && await InAppBrowser.isAvailable) {
            InAppBrowser.open(url).then(resp => {
                if (resp.type === 'success') {
                    // Opened link successfully
                }
            });
        }
    }

    return (
        <TouchableOpacity onPress={() => openUrl(uri)}>
            <View style={{flexDirection: 'row',
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
                {
                    uriType === 'image' ?
                        <Image source={{uri: mediaDisplayUri}} style={styles.mediaStyle} /> :
                    uriType === 'html' ?
                        <View style={styles.mediaStyle}>
                       <WebView source={{
                           html: `<!DOCTYPE html>
                                  <html>
                                    <head>
                                        <style>
                                            iframe {
                                              height: 380px;
                                              width: 676px;
                                              resize: both;
                                              overflow: auto;
                                            }
                                        </style>
                                    </head>
                                    <body>
                                      <div id="baseDiv">${mediaDisplayUri}</div>
                                    </body>
                                  </html>`,
                       }}
                                allowsFullscreenVideo
                                scrollEnabled={false}
                                useWebKit
                                injectedJavaScript={`
                                     const iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
                                     if (!iOS) {
                                       const meta = document.createElement('meta');
                                       let initialScale = 1;
                                       if(screen.width <= 800) {
                                        initialScale = ((screen.width / window.innerWidth) + 0.1).toFixed(2);
                                       }
                                       const content = 'width=device-width, initial-scale=' + initialScale ;
                                       meta.setAttribute('name', 'viewport');
                                       meta.setAttribute('content', content);
                                       document.getElementsByTagName('head')[0].appendChild(meta);
                                     }
                                   `}
                                //allowsInlineMediaPlayback
                                mediaPlaybackRequiresUserAction
                                javaScriptEnabled
                                scalesPageToFit={Platform.OS === 'ios'}
                       />
                        </View>:
                    null
                }
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    mediaStyle: {
        width: mediaWidth,
        height: mediaHeight,
        resizeMode: 'cover',
        flex: 1
    }
});

export {EducationMediaRow, mediaHeight, mediaWidth};
