import {getStatusBarHeight} from 'react-native-status-bar-height';
import {Dimensions} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

// typical variables
const statusBarHeight = getStatusBarHeight();
const headerTextFontSize = width * 0.09;
const normalTextFontSize = width * 0.05;
const verticalMarginsBetweenComponent = 0.01 * height;
const horizontalMargins = 0.03 * width;
const headerHeight = 0.07 * height;
const boldFontFamily = 'SFProDisplay-Bold';
const regularFontFamily = 'SFProDisplay-Regular';
const backArrowMarginLeft = '2%';

export {
  statusBarHeight,
  headerTextFontSize,
  normalTextFontSize,
  verticalMarginsBetweenComponent,
  horizontalMargins,
  headerHeight,
  boldFontFamily,
  regularFontFamily,
  backArrowMarginLeft,
};
