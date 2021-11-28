import React, { useEffect , useState} from 'react';
import {FlatList, View, Text, StyleSheet, TouchableOpacity,Image, Alert } from 'react-native';
import Constant from '../../components/Constants';
import Header from '../../components/Header';
const L_TenantList = props=>{
    const [data, setData] = useState([
        {
            id : "1",
            phone : 88889999,
            first_name : "Ricky",
            last_name : "Pranaya",
            profile_image : null
        },
        {
            id : "2",
            phone : 88886666,
            first_name : "Simon",
            last_name : "Goh",
            profile_image : null
        },
        {
            id : "3",
            phone : 99923828,
            first_name : "Cindy",
            last_name : "Tan",
            profile_image : null
        },
    ])

    // useEffect(()=>{
    //     props.navigation.navigate('login')
 
    //  },[]);

    const renderItem =(item)=>{
        const first_name = item.item.first_name 
        const last_name = item.item.last_name ? item.item.last_name.split(" ")[0] : ''
        const full_name = first_name + " " + last_name
       
        return(
            <TouchableOpacity 
            style={styles.container} 
            onPress={()=>{
                props.navigation.navigate({
                    name: 'l_tenantInfo',
                    params: { full_name: item.item.first_name + " "+ item.item.last_name}
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
                            {item.item.first_name.charAt(0)}
                        </Text>
                    </View>
                </View>
                <View style={{flex:1, paddingHorizontal:10, justifyContent:'center'}}>
                    <Text numberOfLines={1} style={{fontSize: 15, fontWeight:'bold', paddingVertical:3}}>{full_name}</Text>
                    <Text numberOfLines={1} style={{fontSize: 13, paddingBottom:3}}>{item.item.phone}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return(
        <View style={styles.screen}>
            <View style={styles.mainArea}>
                <FlatList 
                data={data}
                renderItem={(item)=>{
                    return renderItem(item)
                }}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                /> 
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
        justifyContent:'center',
        alignItems:'center',
    //    backgroundColor:'yellow',
        flex:1, 
        width:'100%', 
        paddingTop:94
    },
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

export default L_TenantList;