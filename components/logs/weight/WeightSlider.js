import React from 'react';
import {ScrollView, StyleSheet, Dimensions, InteractionManager, View, Platform, Text as NText, Animated} from 'react-native';
import {Svg, Path, Rect, G, Text} from 'react-native-svg';

const {width, height} = Dimensions.get('window');

const componentHeight = 120;
const weightRange = [45, 95];
const tickWidth = 1;
const bigTickHeight = 40;
const smallTickHeight = 24;
const tickGap = 20;
const tickContainerWidth = tickGap * 2 + tickWidth;

const totalWidth = (weightRange[1] - weightRange[0] + 1) * (tickContainerWidth);
/*
const bigTicksPerWindow = 5; // needs to be odd
const smallTicksBetweenBigTicks = 3;
const mediumTickHeight= 32;

// don't modify
const spacingBetweenBigTicks = Math.round((width - tickWidth * (bigTicksPerWindow - 1) )/ (bigTicksPerWindow - 1));
const spacingBetweenSmallTicks = Math.round((spacingBetweenBigTicks - (smallTicksBetweenBigTicks) * tickWidth)/ (smallTicksBetweenBigTicks + 1));
const totalWidth = (spacingBetweenBigTicks + tickWidth) * (weightRange[1] - weightRange[0]) + tickWidth;
 */

function generateTicks(weightRange) {
    let res = [];
    for (let i = weightRange[0]; i <= weightRange[1]; i = i + 1) {
        res.push(i);
    }
    return res;
}

function generateSmallerTicks(num) {
    let res = [];
    for (let i = 0; i < num; i++) {
        res.push(i);
    }
    return res;
}

export function WeightSlider(props) {
    const [didMount, setDidMount] = React.useState(false);
    const [selectedNum, setSelectedNum] = React.useState(weightRange[0]);
    const scrollViewRef = React.useRef();
    React.useEffect(() => {
        if (!didMount && scrollViewRef.current !== null) {
            // scroll to center
            InteractionManager.runAfterInteractions(() => {
                scrollViewRef.current.scrollTo({x: 0});
                setDidMount(true);
            });
        }
    });

    const _onScroll = (event) => {
        const xPos = event.nativeEvent.contentOffset.x;
        const increment = xPos / (2 * tickGap + tickWidth);
        setSelectedNum(Math.floor((weightRange[0] + increment) * 10) / 10);
    }

    return (
        <View>
            <View style={{position: 'absolute', width}}>
                <Svg width={width} height={60}>
                    <Path stroke='#000' fill='#000'
                          d={`M ${width/2 - 20} 0 l ${20} ${20} l ${20} ${-20} Z`} />
                          <Path stroke='pink' d={`M ${width / 2} 0 l 0 ${50}`} />
                    <Path stroke='pink' d={`M ${width / 2 - tickGap} 0 l 0 ${50}`} />
                    <Path stroke='pink' d={`M ${width / 2 + tickGap} 0 l 0 ${50}`} />
                </Svg>
                <Animated.View style={{width, height:40, alignItems: 'center'}}>
                    <NText style={{color: '#000', fontSize: 20}}>
                        {selectedNum}
                    </NText>
                </Animated.View>
            </View>
            <Animated.ScrollView horizontal={true} ref={scrollViewRef}
                        decelerationRate={0} disableScrollViewPanResponder={true}
                        overScrollMode='never'
                        contentInset={{
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                        }}
                                 onScroll={_onScroll}
                        //snapToAlignment='center'
                        snapToInterval={Platform.OS === 'ios' ? tickContainerWidth : null}
                        //snapToInterval={spacingBetweenSmallTicks + tickWidth}
                        //snapToInterval={tickWidth + spacingBetweenBigTicks}
            >
                <Svg width={totalWidth + width} height={componentHeight}>
                    {
                        generateTicks(weightRange).map((tickValue, index) => {


                            return (
                                <G>
                                    <Rect width={tickWidth}
                                      height={bigTickHeight}
                                          x={(width/2) + index * tickContainerWidth}
                                      //x={(width / 2 - tickWidth / 2)  + index * (spacingBetweenBigTicks + tickWidth)}
                                      y={0} fill='#000' />
                                      <Text x={(width/2) + index * tickContainerWidth} y={bigTickHeight + 12}
                                            stroke='#000' textAnchor='middle'>
                                          {tickValue}
                                      </Text>
                                    {   /*
                                        index !== weightRange[1] - weightRange[0] &&
                                        generateSmallerTicks(smallTicksBetweenBigTicks).map((_, index2) => (
                                            <Rect width={tickWidth}
                                                  height={_ % 2 === 1 ? mediumTickHeight : smallTickHeight}
                                                  y={0}
                                                  fill='#000' x={(width / 2 - tickWidth / 2) + index * (spacingBetweenBigTicks + tickWidth) + (index2 + 1)*(spacingBetweenSmallTicks + tickWidth)} />
                                              )
                                        )
                                        */
                                    }
                                </G>
                            )
                        })
                    }
                    <Rect width={tickWidth}
                          height={bigTickHeight} x={(width / 2) + generateTicks(weightRange).length * tickContainerWidth} y={0} fill='#000'/>
                </Svg>
            </Animated.ScrollView>
        </View>
    )
}