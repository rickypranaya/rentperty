import React, { useEffect , useRef} from 'react';
import {Animated, View, Text, StyleSheet, Image, Alert , TouchableOpacity} from 'react-native';
import Constant from '../../components/Constants';
import Header from '../../components/Header';
import Login from '../login/Login';
import { Icon } from 'react-native-elements';

const Account = props=>{
    // useEffect(()=>{
    //     props.navigation.navigate('login')
 
    //  },[]);
    return(
       <View style={styles.screen}> 
            <Login general={true} signUp ={()=>(props.navigation.navigate('create'))}/>
            <TouchableOpacity style={styles.backButton} onPress={()=>{props.navigation.goBack()}}>
                <Icon              
                name='cross'
                type='entypo'
                color='#3c3c3c'
                size={20}
                />
              </TouchableOpacity> 
        </View>
         
    );
}

const styles = StyleSheet.create({
    screen :{
        flex:1,
        backgroundColor:'white'
    },
    backButton:{
        width:35,
        height:35,
        justifyContent:'center',
        alignItems:'center',
        elevation: 2,
        backgroundColor:'white',
        borderRadius:50,
        position:'absolute',
        top:40, 
        left:20, 
        shadowOpacity:0.2, 
        shadowRadius:2, 
        shadowOffset:{width:0, height:1}
      },
});

export default Account;