import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Constant from '../Constants.js';

const SecondaryButton = props =>{
    return (
        <TouchableOpacity style={styles.secondary_button } onPress={() => { props.onPress() }}>
            <Text style = {styles.secondary_button_text}>{props.title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    secondary_button:{
        marginVertical:10,
        borderColor:'white',
        borderWidth:2,
        alignItems:'center',
        width: Constant.DEVICE_WIDTH * 0.6,
        paddingVertical: Platform.OS === 'ios'? 13 : 11,
        borderRadius:50,
    },
    secondary_button_text:{
        color:'white',
        fontWeight:'bold',
        //fontSize:15
    }
});

export default SecondaryButton;