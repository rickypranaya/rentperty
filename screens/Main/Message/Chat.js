import React, { useState , useRef} from 'react';
import {FlatList, View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import Constant from '../../../components/Constants';
import MockMessage from './MockMessages.json';

const Chat = props=>{
    const [messages, setMessages] = useState(MockMessage)

    const renderItem =(item)=>{
        const first_name = item.item.user.first_name 
        const last_name = item.item.user.last_name ? item.item.user.last_name.split(" ")[0] : ''
        const full_name = first_name + " " + last_name
       
        return(
            <TouchableOpacity 
            style={styles.container} 
            onPress={()=>{
                props.navigation.navigate({
                    name: 'chatRoom',
                    params: { 
                        name: full_name,
                        user_id: item.item.user.id,
                        origin: 'messageTab' 
                    }
                  })
            }}>
                <View style={styles.containerImage}>
                        {/* <Image
                    style={{width:50, height:50, borderRadius:50,}} 
                    source={require("../../../assets/images/general.png")}
                    resizeMode='cover'
                    /> */}
                    <View style={styles.profileImage}>
                        <Text style={{ fontSize:25, fontWeight:'bold', color:Constant.GREY_PLACEHOLDER}}>
                            {item.item.user.first_name.charAt(0)}
                        </Text>
                    </View>
                </View>
                <View style={{flex:1, paddingHorizontal:10, justifyContent:'center'}}>
                    <Text numberOfLines={1} style={{fontSize: 15, fontWeight:'bold', paddingVertical:3}}>{full_name}</Text>
                    <Text numberOfLines={1} style={{fontSize: 13, paddingBottom:3}}>{item.item.message}</Text>
                </View>
                <View style={{height:'100%'}}>
                    <Text style={{fontSize: 13,paddingVertical:3, color: Constant.TERTIARY_GREY_COLOR}}>{item.item.created_at}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return(
        <View style={styles.screen}>
             <FlatList 
            data={messages}
            renderItem={(item)=>{
                return renderItem(item)
            }}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            /> 
        </View>
    );
}

const styles = StyleSheet.create({
    screen :{
        flex:1,
    },
    // mainArea:{
    //     justifyContent:'center',
    //     alignItems:'center',
    //    // backgroundColor:'yellow',
    //     flex:1, 
    //     width:'100%', 
    //     paddingTop:94
    // },
    container:{
        width:Constant.DEVICE_WIDTH-4,
        backgroundColor:'white',
        borderRadius:5,
        marginVertical:1,
        marginHorizontal:2,
        // elevation:1,
        // shadowOpacity:0.1, 
        // shadowRadius:2, 
        // shadowOffset:{width:0, height:1},
        flexDirection:'row',
        paddingHorizontal: 15,
        paddingVertical:7,
        alignItems:'center',
        // backgroundColor:'yellow',
        //justifyContent:'center'
    },
    containerImage:{
       // backgroundColor:'yellow',
        paddingVertical:5,
       //borderRadius:50, 
    },
    profileImage: {
        width:50, 
        height:50, 
        backgroundColor: Constant.GREY_BACKGROUND , 
        borderRadius:50, 
        justifyContent:'center', 
        alignItems:'center'
    }
});

export default Chat;