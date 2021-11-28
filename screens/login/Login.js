import React, {useState} from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, Alert, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import MainButton from '../../components/button/MainButton';
import Constant from '../../components/Constants';
import TextField from '../../components/TextField';
import Header from '../../components/Header';
import { NavigationActions, StackActions } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { Base64 } from 'js-base64';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';

const Login = props=>{
    const [userName, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)

    const onSubmit = ()=>{
        if (userName == ''){
            Alert.alert('Please fill in email or phone number')
        } else if (password.length <= 5){
            Alert.alert('Please fill in your password')
        } else {
            login()
        }
    }

    const resetStack = (screen) => {
        props
          .navigation
          .dispatch(StackActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({
                routeName: screen,
              }),
            ],
          }))
    }

    const login = async ()=>{
        setLoading(true)
        const URL = Constant.BASE_URL+"/login";

        try{
            const response = await fetch(URL, {
                method: "POST",
                body: JSON.stringify({
                    username :userName,
                    password : Base64.encode(password),
                   }),
                headers:{
                    'Accept': 'application/json',
                    "Content-Type" : "application/json"
                }
            });

            if(response.status !=200){
                setLoading(false)
                throw new Error("something is wrong!");

            } else{
                const responseData = await response.json();
                if (responseData.status != 200){
                 setLoading(false)
                    Alert.alert('Your Account or password is incorrect.')
                } else {

                    console.log('login success')
                    
                    var type = responseData.data.type
                    await AsyncStorage.setItem('USER_ID', JSON.stringify(responseData.data.id))
                    await AsyncStorage.setItem('USER', JSON.stringify(responseData.data))
                    await AsyncStorage.setItem('TYPE', JSON.stringify(type))

                    setLoading(false)
                    
                    if (type== "landlord"){
                        resetStack("l_navigator")
                    } else if (type== "agent"){
                        resetStack("a_navigator")
                    }
                }
                //setResponse(responseData.data);
               // Alert.alert(JSON.stringify(responseData.data));
                
            }
        }catch(error){
            setLoading(false)
            console.log(error.message);
        }
    }
    

    return(
        <View style={styles.screen}>
            <Image
            style={styles.logo} 
            source={require("../../assets/images/rentperty-logo.png")}
            resizeMode='contain'
            />
            <KeyboardAvoidingView style={{width:'100%'}} behavior={Platform.OS === 'ios' ? "position" : null}>
                <View style={{marginVertical:40}}>
                    <TextField onChanged = {(val)=>{setUser(val)}} placeholder="Phone number or email"/>
                    <TextField onChanged = {(val)=>{setPassword(val)}} placeholder="Password" password="true"/>
                </View>
            </KeyboardAvoidingView>

            <MainButton title='Log in'  onPress={()=>{onSubmit()}}/>

            <TouchableOpacity style={{flexDirection:'row', paddingVertical:5}} onPress={()=>{ props.navigation.navigate('createAccount') }}>
                <Text style={styles.signAsk}>Don't have an account? </Text>
                <Text style={styles.signup}> Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.backButton} onPress={()=>{props.navigation.goBack()}}>
                <Icon              
                name='cross'
                type='entypo'
                color='#3c3c3c'
                size={20}
                />
              </TouchableOpacity> 

            <Modal
                backdropOpacity={0.6}
                backdropColor='white'
                isVisible={loading}
                animationType='fade'
                onBackdropPress={()=>{}}
                onBackButtonPress={()=>{}}
                transparent={true}
            >
                <View style={{justifyContent:'center', alignItems:'center'}}>
                    <ActivityIndicator size="small" color={Constant.PRIMARY_COLOR}/>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    screen :{
        flex:1,
        alignItems:'center',
        //paddingTop:197,
        justifyContent:'center',
        // backgroundColor:'#121212',
        paddingHorizontal:Constant.DEVICE_WIDTH*0.15,
        
    },
    bigText:{
        fontSize:27,
        fontWeight:'bold',
    },
    signAsk:{
        color: Constant.TERTIARY_GREY_COLOR3,
        fontSize: Constant.TERTIARY_FONT_SIZE
    },
    signup:{
        color: Constant.PRIMARY_COLOR,
        fontSize: Constant.TERTIARY_FONT_SIZE
    },
    logo:{
        width: Constant.DEVICE_WIDTH*0.5,
        height:Constant.DEVICE_WIDTH*0.3
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

export default Login;