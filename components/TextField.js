import React from 'react';
import { View,StyleSheet, TextInput, TextPropTypes } from 'react-native';
import Constant from './Constants.js';

const TextField = props =>{
    return (
        <View style={styles.textField}> 
            <TextInput
                // onSubmitEditing ={()=>{}}
                secureTextEntry={props.password?true:false}
                clearButtonMode='while-editing'
                placeholder= {props.placeholder}
                placeholderTextColor="#999999"
                returnKeyType="done"
                autoCapitalize="none"
                style={{ padding: Platform.OS === 'ios'? 13 : 7}}
                //maxLength={11}
                onChangeText={(val) => {
                    props.onChanged(val)
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    textField:{
        borderWidth:1,
        borderColor: Constant.GREY_PLACEHOLDER,
        borderRadius:10,
        marginVertical:10,
    },
});

export default TextField;