import {Dimensions, Platform} from 'react-native';

export const ScreenWidth = Dimensions.get('window').width;
export const ScreenHeight = Dimensions.get('window').height;
export const api_key = '01e5cb4aacbcc88ba3662f9b33d4d1f8';
export const IsIos = Platform.OS == 'ios';
