import React, { useEffect , useState} from 'react';
import {Animated, View, Text, StyleSheet, Image, Alert, TextInput, TouchableOpacity , ScrollView} from 'react-native';
import Constant from '../../components/Constants';
import Header from '../../components/Header';
import { NavigationActions, StackActions } from 'react-navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const A_Account = props=>{
    const navigation = useNavigation();
    //========= DATA =============//
    const [full_name , setFullName] = useState('')
    const [email , setEmail] = useState('')
    const [phone_number , setPhoneNumber] = useState('')
    const [user_id, setUserId] = useState('1')
    const [User, setUser] = useState({})

    //============== FUNCTION ===============//
    useEffect( () => {
        fetchUser();    
    }, []);

    //get user data from asyncstorage
    const fetchUser = async()=>{
        try {
            const value = await AsyncStorage.getItem('USER')

            if(value !== null) {
                var data = JSON.parse(value)
                setFullName(data.first_name +' '+data.last_name)
                setEmail(data.email)
                setPhoneNumber(data.phone)
            }
        } catch(e) {
            // error reading value
            console.log(e)
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

    return(
        <View style={styles.screen}>
            <View style={styles.mainArea}>
            <ScrollView style={{width:'100%'}}>

                <View style={styles.profile}>
                    <TouchableOpacity onPress={()=>{props.logOut()}} style={{alignSelf:'flex-end', marginVertical:15}}>
                    <Text style={{color:Constant.PRIMARY_COLOR, fontWeight:'600', marginHorizontal:25}}>Log out</Text>
                    </TouchableOpacity>
                        <Image 
                            style={{height:80, width:80,borderRadius:100, marginVertical:10}} 
                            source={require("../../assets/images/avatar_placeholder.png")}
                            resizeMode='contain'
                        />
                        <View style={{width: Constant.DEVICE_WIDTH*0.9, borderBottomWidth:1, borderBottomColor:'lightgrey', marginBottom:5}}>
                            <Text style={{color: 'grey', marginVertical:8}}>Name</Text>
                            <Text style={{fontSize:16}}>{full_name} </Text>
                        </View>

                        <View style={{width: Constant.DEVICE_WIDTH*0.9, borderBottomWidth:1, borderBottomColor:'lightgrey',  marginBottom:5}}>
                    <Text style={{color: 'grey', marginVertical:8}}>Email Address</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setEmail}
                        value={email}
                        placeholder= 'email'
                        onEndEditing={()=>{
                        //   updateUser()
                        }}
                    />
                    </View>

                    <View style={{width: Constant.DEVICE_WIDTH*0.9, borderBottomWidth:1, borderBottomColor:'lightgrey',  marginBottom:5}}>
                    <Text style={{color: 'grey', marginVertical:8}}>Phone Number</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setPhoneNumber}
                        value={phone_number}
                        placeholder= 'phone number'
                        keyboardType = 'number-pad'
                        onEndEditing={()=>{
                        //   updateUser()
                        }}
                    />
                    </View>
                </View>
                
                    <TouchableOpacity 
                    onPress={()=>{
                        navigation.navigate({
                            name: 'savedCard',
                            params: { 
                                name: "Contact Support",
                                origin : 'support'
                            }
                        })
                    }}
                    style={styles.card}>
                        <Text>Saved Credit Card</Text>
                    </TouchableOpacity>
                    

                    <TouchableOpacity 
                    onPress={()=>{Alert.alert('Under development')}}
                    style={styles.card}>
                        <Text>Billing Payment</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                    onPress={()=>{Alert.alert('Under development')}}
                    style={styles.card}>
                        <Text>Manage Plan</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                    onPress={()=>{
                        navigation.navigate({
                            name: 'chatRoom',
                            params: { 
                                name: "Contact Support",
                                origin : 'support'
                            }
                        })
                    }}
                    style={styles.card}>
                        <Text>Contact Support</Text>
                    </TouchableOpacity>
                </ScrollView>

            </View>

            
        <Header header={true} title='Account'/>
        </View>
    );
}

const styles = StyleSheet.create({
    screen :{
        flex:1,
    },
    mainArea:{
        // justifyContent:'center',
        alignItems:'center',
        flex:1, 
        width:'100%', 
        paddingTop:94
    },
    profile:{
        // justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white',
        width:'100%', 
        borderBottomLeftRadius:15,
        borderBottomRightRadius:15,
        paddingBottom:15,
        elevation: 1,
        shadowOpacity:0.1, 
        shadowRadius:3, 
        shadowOffset:{width:0, height:1},
        marginBottom:5
    },
    card: {
        marginVertical:5, 
        width:'100%', 
        backgroundColor:'white',
        elevation: 1,
        height:60, 
        borderRadius:10,  
        shadowOpacity:0.1, 
        shadowRadius:3, 
        justifyContent:'center', 
        paddingHorizontal: Constant.DEVICE_WIDTH*0.05,
        shadowOffset:{width:0, height:1}
    },
    input: {
        fontSize:16,
        paddingVertical:5
      },
});

export default A_Account;