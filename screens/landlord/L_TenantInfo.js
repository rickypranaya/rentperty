import React, { useEffect , useState} from 'react';
import {FlatList, View, Text, StyleSheet, Image, Alert, TextInput, TouchableOpacity } from 'react-native';
import Constant from '../../components/Constants';
import Header from '../../components/Header';
import { NavigationActions, StackActions } from 'react-navigation';

const L_TenantInfo = props=>{
    const [full_name , setFullName] = useState('Cindy Tan')
    const [email , setEmail] = useState('Example@gmail.com')
    const [phone_number , setPhoneNumber] = useState('999923828')
    const [user_id, setUserId] = useState('1')
    const [User, setUser] = useState({})
    const [data, setData] = useState([
        {
            id:1, 
            name : 'Rental Payment',
            date:'07/05/2021 01:12 pm',
            amount: '1,800'
        },
        {
            id:2, 
            name : 'Services - Air conditioning',
            date:'19/04/2021 05:30 pm',
            amount: '30'
        },
        {
            id:3, 
            name : 'Deposit Payment',
            date:'07/04/2021 01:12 pm',
            amount: '1,800'
        },
        {
            id:4, 
            name : 'Rental Payment',
            date:'07/05/2021 01:12 pm',
            amount: '1,800'
        },
        {
            id:5, 
            name : 'Services - Air conditioning',
            date:'19/04/2021 05:30 pm',
            amount: '30'
        },
        {
            id:6, 
            name : 'Deposit Payment',
            date:'07/04/2021 01:12 pm',
            amount: '1,800'
        }
    ])

    useEffect(() => {
        if (props.route.params?.full_name) {
            setFullName(props.route.params.full_name)
        }
        
    }, [props.route.params]);

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

    const renderHistory = (item)=>{
        return(
            <View style={{flexDirection:'row', paddingHorizontal:10, paddingVertical:10}}>
                <View style={{flex:1, paddingHorizontal:10, justifyContent:'center'}}>
                    <Text numberOfLines={1} style={{fontSize: 15, fontWeight:'bold', paddingVertical:3}}>{item.item.name}</Text>
                    <Text numberOfLines={1} style={{fontSize: 13, paddingBottom:3}}>{item.item.date}</Text>
                </View>
                <View style={{ justifyContent:'center'}}>
                    <Text style={{fontSize: 16, color: 'black'}}>S$ {item.item.amount}</Text>
                </View>
            </View>
        )
    }

    return(
        <View style={styles.screen}>
            <View style={styles.mainArea}>
                <View style={styles.profile}>
                    
                    <Image 
                        style={{height:80, width:80,borderRadius:100, marginVertical:25}} 
                        source={require("../../assets/images/avatar_placeholder.png")}
                        resizeMode='contain'
                    />
                       
                    <Text style={{fontWeight:'bold', fontSize:18, paddingBottom:10}}>{full_name}</Text>
                    <Text>{phone_number} | {email}</Text>
                    <TouchableOpacity style={styles.button} onPress={()=>{
                        props.navigation.navigate({
                            name: 'chatRoom',
                            params: { 
                                name: full_name,
                                user_id: 123,
                            }
                          })
                    }}>
                        <Text style={styles.buttonText}>Message</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.history}>
                    <Text style={{paddingBottom:15, paddingHorizontal:20}}>Payment History</Text>
                    <View style={styles.line}/>

                    <FlatList 
                    data={data}
                    renderItem={(item)=>{
                        return renderHistory(item)
                    }}
                    keyExtractor={item => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    /> 
                </View>

            </View>
            <Header header={true} title='Tenants' onBack={()=>{props.navigation.goBack()}}/>
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
    history:{
        // justifyContent:'center',
        flex:1,
        // alignItems:'center',
        backgroundColor:'white',
        width:'100%', 
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
        paddingVertical:15,
        // paddingHorizontal:20

    },
    button:{
        borderColor: Constant.PRIMARY_COLOR,
        borderWidth:1,
        paddingHorizontal:30,
        paddingVertical:5,
        borderRadius:5,
        marginVertical:15
    },
    buttonText:{
        color: Constant.PRIMARY_COLOR
    },
    line:{
        width:Constant.DEVICE_WIDTH,
        borderBottomColor:'lightgrey',
        borderBottomWidth:0.5,
    },
});

export default L_TenantInfo;