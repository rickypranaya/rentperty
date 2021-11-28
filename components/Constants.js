import {
    Dimensions
} from 'react-native';

class Constant {
    static DEVICE_WIDTH = Dimensions.get('window').width;
    static DEVICE_HEIGHT = Dimensions.get('window').height;
    static PRIMARY_COLOR = '#81d486';
    static SECONDARY_COLOR = '#F0FFFE';
    static GREY_BACKGROUND = '#F0F0F0';
    static GREY_PLACEHOLDER = "#ADADAD";
    static MAIN_FONT_SIZE = 17;
    static SECONDARY_FONT_SIZE = 15;
    static TERTIARY_FONT_SIZE = 13;
    static TERTIARY_GREY_COLOR = '#999999';
    static PADDING_HORIZONTAL = 20; 

   static BASE_URL = 'https://rentperty.herokuapp.com/api';
//    static BASE_URL = 'http://127.0.0.1:5000/api';



}

export default Constant;
