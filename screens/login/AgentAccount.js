import React, {useState} from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import MainButton from '../../components/button/MainButton';
import Constant from '../../components/Constants';
import TextField from '../../components/TextField';
import Header from '../../components/Header';
import DropDownPicker from 'react-native-dropdown-picker';

const AgentAccount = props=>{

    // ========== VARIABLES =========== //
    // DATA //
    const [agency, setAgency] = useState('');
    const [license, setLicense] = useState('');
    const [salesperson, setSalesperson] = useState('');

    // ========== FUNCTIONS ========== //
    // Next button function
    const onNext = ()=>{
        if (agency == ''){
            Alert.alert('Please type in your agency name')
        } else if (license == ''){
            Alert.alert('Please type in your CEA license number')
        } else if (salesperson == ''){
            Alert.alert('Please type in your CEA Salesperson number')
        } else {
            var object = {
                type : props.navigation.getParam('type', '0'),
                first_name : props.navigation.getParam('first_name', '0'),
                last_name : props.navigation.getParam('last_name', '0'),
                email : props.navigation.getParam('email', '0'),
                password : props.navigation.getParam('password', '0'),
                agency : agency,
                license : license,
                salesperson : salesperson
            }

            console.log(object)
            props.navigation.navigate('phone',object);
        }
    }

    return(
        <View style={styles.screen}>
            <KeyboardAvoidingView style={{width:'100%'}} behavior= {Platform.OS==='ios'? "position" : null }>
                <View style={{alignSelf:'flex-start'}}>
                    <Text style={styles.bigText}>Create</Text>
                    <Text style={styles.bigText}>Agent account</Text>
                </View>
                <View style={{marginVertical:40}}>
                    <TextField onChanged = {(val)=>{setAgency(val)}} placeholder="Agency Name"/>
                    <TextField onChanged = {(val)=>{setLicense(val)}} placeholder="CEA License No"/>
                    <TextField onChanged = {(val)=>{setSalesperson(val)}} placeholder="CEA Salesperson No"/>                    
                </View>
            </KeyboardAvoidingView>
           
            <View style={{alignItems:'center', position:'absolute', top: Constant.DEVICE_HEIGHT*0.85}}> 
                <MainButton title='Next'  onPress={()=>{onNext()}}/>

                <View style={{flexDirection:'row', marginTop:20}}>
                    <View style={[styles.progress,{backgroundColor:'grey'}]}></View>
                    <View style={[styles.progress,{backgroundColor: Constant.PRIMARY_COLOR}]}></View>
                    <View style={[styles.progress,{backgroundColor:'grey'}]}></View>
                    <View style={[styles.progress,{backgroundColor:'grey'}]}></View>
                </View>
            </View>

            <Header onBack={()=>{props.navigation.goBack()}}/>
        </View>
    );
}

const styles = StyleSheet.create({
    screen :{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white',
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
    }
});

export default AgentAccount;