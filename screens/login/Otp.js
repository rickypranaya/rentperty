import React, {useState, useRef, useEffect} from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import MainButton from '../../components/button/MainButton';
import Constant from '../../components/Constants';
import Header from '../../components/Header';
import { NavigationActions, StackActions } from 'react-navigation';
import { Base64 } from 'js-base64';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';

const Otp = props=>{

    // ========== VARIABLES =========== //
    // OTP //
    const [OTP, setOtp] = useState('1234');
    const [phoneString, setPhoneString] = useState('');

    const [code1, setCode1] = useState();
    const [code2, setCode2] = useState();
    const [code3, setCode3] = useState();
    const [code4, setCode4] = useState();

    const first = useRef(null);
    const second = useRef(null);
    const third = useRef(null);
    const fourth = useRef(null);
    
    const [loading, setLoading] = useState(false)
    const [resend, setResend] = useState(false)

    // ========== FUNCTIONS ========== //
    useEffect( () => {
        var calling_code = props.navigation.getParam('calling_code', '0')
        var phone = props.navigation.getParam('phone', '0')
        var ps = calling_code+phone
        setPhoneString(ps)
        getOtp(ps)
    }, []);
    
    // generate and send otp function
    const getOtp =async (val)=>{
        var data;
        if (val == '00'){
            var calling_code = await props.navigation.getParam('calling_code', '+65')
            var phone = await props.navigation.getParam('phone', '0')
            var ps = calling_code+phone
            data = ps
        } else {
            data = val
        }
        
        const URL = Constant.BASE_URL+"/send_otp";
        try{
            const response = await fetch(URL, {
                method: "POST",
                body: JSON.stringify({
                    phone : data
                   }),
                headers:{
                    'Accept': 'application/json',
                    "Content-Type" : "application/json"
                }
            });
            if(response.status !=200){
                Alert.alert(JSON.stringify(response))
            } else{
                const responseData = await response.json();
                setOtp(JSON.stringify(responseData))
            }
        }catch(error){
            Alert.alert(error.message);
        }

    }

    // adding user to database
    const addUser = async ()=>{
        setLoading(true)
        //current date time
        var current_datetime = require('moment')().format('YYYY-MM-DD HH:mm:ss');

        var URL;
        var obj;
        if (props.navigation.getParam('type', '0') == 'agent'){

            URL = Constant.BASE_URL+"/agent_add";
            obj = {
                type : props.navigation.getParam('type', '0'),
                first_name : props.navigation.getParam('first_name', '0'),
                last_name : props.navigation.getParam('last_name', '0'),
                email : props.navigation.getParam('email', '0'),
                phone : props.navigation.getParam('phone', '0'),
                calling_code : props.navigation.getParam('calling_code', '0'),
                password : Base64.encode(props.navigation.getParam('password', '0')),
                agency : props.navigation.getParam('agency', '0'),
                license : props.navigation.getParam('license', '0'),
                salesperson : props.navigation.getParam('salesperson', '0'),
                created_at : current_datetime
            }
        } else {

            URL = Constant.BASE_URL+"/users_add";
            obj = {
                type : props.navigation.getParam('type', '0'),
                first_name : props.navigation.getParam('first_name', '0'),
                last_name : props.navigation.getParam('last_name', '0'),
                email : props.navigation.getParam('email', '0'),
                phone : props.navigation.getParam('phone', '0'),
                calling_code : props.navigation.getParam('calling_code', '0'),
                password : Base64.encode(props.navigation.getParam('password', '0')),
                created_at : current_datetime
            }
        }
        
        console.log(obj)

        try{
            const response = await fetch(URL, {
                method: "POST",
                body: JSON.stringify(obj),
                headers:{
                    'Accept': 'application/json',
                    "Content-Type" : "application/json"
                }
            });
            if(response.status !=200){
                setLoading(false)
                // throw new Error(JSON.stringify(response));
                console.log(JSON.stringify(response))
            } else{
                const responseData = await response.json();
                console.log(responseData.data)
                // Alert.alert(JSON.stringify(responseData.data));
                await AsyncStorage.setItem('USER_ID', JSON.stringify(responseData.data.insertId))
                await AsyncStorage.setItem('USER', JSON.stringify(obj))
                await AsyncStorage.setItem('TYPE', JSON.stringify(obj.type))
                
                setLoading(false)
                if (obj.type == "landlord"){
                    resetStack('l_navigator');
                } else if (obj.type == "agent"){
                    resetStack('a_navigator');
                }
                
            }
        }catch(error){
            setLoading(false)
            Alert.alert(error.message);
        }
    }

    // Onclick singup button
    const signUp = ()=>{
        let typeOTP = code1+code2+code3+code4;
        if (typeOTP != OTP){
            Alert.alert('You have entered wrong OTP\nPlease try again')
        } else {
           addUser();
            // resetStack('l_navigator');
        }
    }

    //reset current stacks
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


    return(
        <View style={styles.screen}>
            <Header onBack={()=>{props.navigation.goBack()}}/>
            <KeyboardAvoidingView style={{width:'100%', position:'absolute', top: Constant.DEVICE_HEIGHT*0.2}} behavior={Platform.OS === 'ios' ? "padding" : null}>
                <View style={{alignSelf:'flex-start'}}>
                    <Text style={styles.bigText}>OTP</Text>
                    <Text style={styles.bigText}>verification</Text>
                    <Text style={styles.smallText}>Enter the verification code we just sent to your number</Text>

                </View>
                <View style={{marginVertical:40}}>
                    <View style={{
                        width:'100%',                            
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        alignSelf: 'center',
                        marginVertical: 5,
                    }}>
                        <TextInput
                            ref={first}
                            keyboardType='number-pad'
                            style={styles.inputContainer}
                            returnKeyType="done"
                            maxLength={1}
                            onChangeText={(val) => {
                                setCode1(val); 
                                val.length === 1 ? second.current.focus() : null
                            }} />

                        <TextInput
                            ref={second}
                            keyboardType='number-pad'
                            style={styles.inputContainer}
                            maxLength={1}
                            returnKeyType="done"

                            onChangeText={(val) => {
                                setCode2(val); 
                                val.length === 1 ? third.current.focus() :first.current.focus() 
                            }} />

                        <TextInput
                            ref={third}
                            keyboardType='number-pad'
                            returnKeyType="done"
                            style={styles.inputContainer}
                            maxLength={1}
                            onChangeText={(val) => {
                                setCode3(val); 
                                val.length === 1 ? fourth.current.focus() :second.current.focus() 
                            }} />

                        <TextInput
                            ref={fourth}
                            keyboardType='number-pad'
                            returnKeyType="done"
                            style={styles.inputContainer}
                            maxLength={1}
                            onChangeText={(val) => {
                                setCode4(val); 
                                val.length === 1 ? null:third.current.focus()  
                            }} />
                    </View>
                </View>
                <TouchableOpacity onPress={()=>{getOtp(phoneString); setResend(true)}}>
                    <Text style={{alignSelf:'flex-end', color: !resend? Constant.PRIMARY_COLOR : 'lightgrey'}}>Resend OTP</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
           
            <View style={{alignItems:'center', position:'absolute', top: Constant.DEVICE_HEIGHT*0.85}}> 
                <MainButton title='Sign up' onPress={()=>{signUp()}}/>

                <View style={{flexDirection:'row', marginTop:20}}>
                    <View style={[styles.progress,{backgroundColor:'grey' }]}></View>
                    <View style={[styles.progress,{backgroundColor:'grey'}]}></View>
                    { props.navigation.getParam('type', '0') !== 'landlord' && <View style={[styles.progress,{backgroundColor:'grey'}]}></View> }
                    <View style={[styles.progress,{backgroundColor:Constant.PRIMARY_COLOR}]}></View>
                </View>
            </View>
            
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
        justifyContent:'center',
        paddingHorizontal:Constant.DEVICE_WIDTH*0.15,
    },
    bigText:{
        fontSize:27,
        fontWeight:'bold',
    },
    progress:{
        marginHorizontal:3,
        width:8, 
        height:8, 
        borderRadius:50
    },
    underlineStyleBase: {
        fontWeight:"bold",
        fontSize:16,
        color:"black",
        borderRadius:10,
        backgroundColor: "white",
        width: 50,
        height: 50,
        borderWidth: 1,
        borderBottomWidth: 1,
    },
    inputContainer: {
        backgroundColor: 'white',
        borderWidth:1,
        borderColor:Constant.GREY_PLACEHOLDER,
        width: 45,
        height: 50,
        marginHorizontal: 10,
        color: 'black',
        alignSelf: 'flex-start',
        textAlign: 'center',
        fontSize: 14,
        borderRadius: 10,
    },
    smallText:{
        color: Constant.TERTIARY_GREY_COLOR,
        marginVertical:5, 
        fontSize:Constant.TERTIARY_FONT_SIZE
    }


    
});

export default Otp;