import React, { useEffect , useRef} from 'react';
import {Animated, View, Text, StyleSheet, Image, Alert } from 'react-native';
import Constant from '../components/Constants';

const Splash = props=>{
    useEffect(()=>{
       setTimeout(()=>{ props.navigation.replace('welcome')}, 2000);
      // setTimeout(()=>{ Alert.alert('hello')}, 1000);
       fadeIn()

    },[]);

    const fadeAnim = useRef(new Animated.Value(0)).current;
    //const moveAnim = useRef(new Animated.Value(0)).current;


    const fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      };

    return(
        <View style={styles.screen}>
            <Animated.Image 
                style={[styles.image,{opacity:fadeAnim}]} 
                source={require("../assets/images/need_white.png")}
                resizeMode='contain'
            /> 
        </View>
    );
}

const styles = StyleSheet.create({
    screen :{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: Constant.PRIMARY_COLOR
    },
    image:{
        width: Constant.DEVICE_WIDTH*0.4 ,
    }
});

export default Splash;