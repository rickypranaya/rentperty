import React, { useEffect , useRef} from 'react';
import {Animated, View, Text, StyleSheet, Image, Alert } from 'react-native';
import Constant from '../../../components/Constants';
import Header from '../../../components/Header';


const Notification = props=>{

    return(
        <View style={styles.screen}>
            <View style={styles.mainArea}>
                <Image
                        style={{width:Constant.DEVICE_WIDTH*0.7, height:200}}
                        source={require("../../../assets/images/notification.jpg")}
                        resizeMode='contain'
                    />
                <Text style={styles.bigText}> You're all caught up</Text>
                <Text style={styles.smallText}>Notifications from us will apear here.</Text>
            </View>
 
        </View>
    );
}

const styles = StyleSheet.create({
    screen :{
        flex:1,
    },
    mainArea:{
        justifyContent:'center',
        alignItems:'center',
       backgroundColor:'white',
        flex:1, 
        width:'100%', 
        paddingTop:94,
        paddingBottom: 70
    },
    bigText:{
        fontWeight:'bold',
        fontSize:20,
        marginVertical:10,
    },
    smallText:{
        maxWidth: Constant.DEVICE_WIDTH*0.7,
        textAlign:'center',
        color:'grey'
    }
});

export default Notification;