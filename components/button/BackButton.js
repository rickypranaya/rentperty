import React from 'react';
import {Icon} from 'react-native-elements';
import Constant from '../Constants';
import {StyleSheet, TouchableOpacity } from 'react-native';
const BackButton = props =>{
    return (
        <TouchableOpacity onPress={()=>{props.onPress()}} style={styles.button}>
                <Icon
                // reverse
                name='arrow-back'
                type='material'
                color='black'
                size={30}
                />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button:{
        backgroundColor:'white',
        padding:5,
        borderRadius:50,
        position:'absolute', 
        top:44,
        left:20,
    }
});

export default BackButton;