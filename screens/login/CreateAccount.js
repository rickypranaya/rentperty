import React, {useState} from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import MainButton from '../../components/button/MainButton';
import Constant from '../../components/Constants';
import TextField from '../../components/TextField';
import Header from '../../components/Header';
import DropDownPicker from 'react-native-dropdown-picker';

const CreateAccount = props=>{

    // ========== VARIABLES =========== //
    // DATA //
    const [firstName, setFirst] = useState('');
    const [lastName, setLast] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState(null);

    // DROPDOWN MENU //
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
      {label: 'Tenant', value: 'tenant'},
      {label: 'Agent', value: 'agent'},
      {label: 'Landlord', value: 'landlord'},
      {label: 'Vendor', value: 'Vendor'}
    ]);

    // ========== FUNCTIONS ========== //
    // Next button function
    const onNext = ()=>{
        if (type == null){
            Alert.alert('Please choose type of account')
        } else if (firstName == ''){
            Alert.alert('Please fill in first name')
        } else if (lastName == ''){
            Alert.alert('Please fill in last name')
        } else if (email == ''){
            Alert.alert('Please fill in Email')
        } else if (password.length <= 5){
            Alert.alert('Password must be minimum 6 characters')
        } else {
            var object = {
                type: type,
                first_name : firstName,
                last_name : lastName,
                email : email,
                password : password
            }

            console.log(object)
            if (type == "landlord"){
                props.navigation.navigate('phone',object);
            } else if ( type == "agent"){
                props.navigation.navigate('agentAccount',object);
            } else if (type == "tenant"){
                Alert.alert('Tenant role is under development')
            } else {
                Alert.alert('Vendor role is under development')
            }
        }
    }

    return(
        <View style={styles.screen}>
            <KeyboardAvoidingView style={{width:'100%'}} behavior= {Platform.OS==='ios'? "position" : null }>
                <View style={{alignSelf:'flex-start'}}>
                    <Text style={styles.bigText}>Create</Text>
                    <Text style={styles.bigText}>your account</Text>
                </View>
                <View style={{marginVertical:40}}>
                    <DropDownPicker
                        placeholder="I'm a ..."
                        placeholderStyle={{
                            color: "#999"
                        }}
                        style={{
                        backgroundColor: "white",
                        borderRadius:10,
                        borderColor: Constant.GREY_PLACEHOLDER,
                        marginVertical:10,
                        height:47
                        }}
                        dropDownContainerStyle={{
                            borderColor: Constant.GREY_PLACEHOLDER
                          }}
                        open={open}
                        value={type}
                        items={items}
                        setOpen={setOpen}
                        setValue={setType}
                        setItems={setItems}
                    />
                    <TextField onChanged = {(val)=>{setFirst(val)}} placeholder="First name"/>
                    <TextField onChanged = {(val)=>{setLast(val)}} placeholder="Last name"/>
                    <TextField onChanged = {(val)=>{setEmail(val)}} placeholder="Email"/>
                    <TextField onChanged = {(val)=>{setPassword(val)}} placeholder="Password" password="true"/>
                    
                </View>
            </KeyboardAvoidingView>
           
            <View style={{alignItems:'center', position:'absolute', top: Constant.DEVICE_HEIGHT*0.85}}> 
                <MainButton title='Next'  onPress={()=>{onNext()}}/>

                <View style={{flexDirection:'row', marginTop:20}}>
                    <View style={[styles.progress,{backgroundColor: Constant.PRIMARY_COLOR}]}></View>
                    {type !== 'landlord' && <View style={[styles.progress,{backgroundColor:'grey'}]}></View> }
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

export default CreateAccount;