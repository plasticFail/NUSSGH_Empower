import {PixelRatio, Dimensions, Platform} from 'react-native';

const {width, height} = Dimensions.get('window');

const scale = width / 320; // based on iphone 5s's scale

const scaleFont = (fontSize) => {
  let newSize = fontSize * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

export {scaleFont};
