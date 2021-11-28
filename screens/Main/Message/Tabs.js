import React, { useEffect , useRef} from 'react';
import {Animated, View, Text, StyleSheet, Image, Alert } from 'react-native';
import Constant from '../../../components/Constants';
import Header from '../../../components/Header';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Chat from './Chat';
import Notification from './Notification';

const Tab = createMaterialTopTabNavigator();
const Tabs = props=>{
    return(
        <Tab.Navigator
        //swipeEnabled= {false}
        tabBarOptions={{
            activeTintColor: Constant.PRIMARY_COLOR,
            inactiveTintColor: '#676767',
            indicatorStyle:{backgroundColor: Constant.PRIMARY_COLOR},
            labelStyle: { textTransform: 'none', fontSize:15 }
            // showLabel: false
        }}>
            <Tab.Screen name="Chats" component={Chat} />
            <Tab.Screen name="Notifications" component={Notification} />
        </Tab.Navigator>  
    );
}

const styles = StyleSheet.create({

});

export default Tabs;