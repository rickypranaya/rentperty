import React from 'react';
import {Text, View, StyleSheet, Image, Alert} from 'react-native';
import Constant from '../../components/Constants';
import MainButton from '../../components/button/MainButton';
import SecondaryButton from '../../components/button/SecondaryButton';

const Welcome = props=>{

    return(
        <View style={styles.screen}>
            <Image
            style={styles.logo} 
            source={require("../../assets/images/need_white.png")}
            resizeMode='contain'
            />
            <Text style={{color:'white', fontSize:Constant.MAIN_FONT_SIZE}}>everything you need.</Text>
           
            <Image
            style={styles.image} 
            source={require("../../assets/images/welcome_ill.png")}
            resizeMode='contain'
            />

            <MainButton title='Register' welcome={true} onPress={()=>{props.navigation.navigate('createAccount')}}/>
            <SecondaryButton title='Log in' welcome={true} onPress={()=>{props.navigation.navigate('login')}}/>

        </View>
    );
}

const styles = StyleSheet.create({
    screen :{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:Constant.PRIMARY_COLOR
    },
    logo:{
        width: Constant.DEVICE_WIDTH*0.3,
        //backgroundColor:'yellow',
        height:Constant.DEVICE_WIDTH*0.2
    },
    image:{
        width: Constant.DEVICE_WIDTH*0.5,
        //backgroundColor:'yellow',
        height: Constant.DEVICE_HEIGHT*0.4,
    }
});

export default Welcome;