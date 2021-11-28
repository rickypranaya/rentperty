import React, { useEffect , useRef} from 'react';
import {Animated, View, Text, StyleSheet, Image, Alert } from 'react-native';
import Constant from '../../../components/Constants';
import Header from '../../../components/Header';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Tabs from './Tabs';

const Message = props=>{
    return(
        <View style={styles.screen}>
            <View style={{backgroundColor:'white', height:45, width: Constant.DEVICE_WIDTH}}/>
            <Tabs/>
        </View>
    );
}

const styles = StyleSheet.create({
    screen :{
        flex:1,
    },
});

export default Message;