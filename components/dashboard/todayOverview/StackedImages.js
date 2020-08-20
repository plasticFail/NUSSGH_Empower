import React from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';

const ColourArray = [
    "#60A354","#8F31AA","#F5C444","#7BBFDB", "#77B9D2", "#E67471", "#5F90D5",'#5D5D5D'
]

export default function StackedImages({images, imageRadius, gap, direction, imageType}) {
    return (
        <View style={[styles.root, {flexDirection: direction, height: imageRadius * 2}]}>
            {
                images.map((img, index) => (
                    <Image source={imageType === 'uri' ? {uri: img} : img}
                           key={index}
                           style={{width: imageRadius * 2,
                               height: imageRadius * 2,
                               borderRadius: imageRadius,
                               borderWidth: 2,
                               borderColor: ColourArray[index % (ColourArray.length - 1)],
                               backgroundColor: '#fff',
                               transform: [{translateX: index * gap}],
                               position: 'absolute'}}
                    />

                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    }
})