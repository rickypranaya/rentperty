import React, { useEffect , useRef} from 'react';
import {FlatList, View, Text, StyleSheet, Image, Alert } from 'react-native';
import Constant from '../../components/Constants';
import Header from '../../components/Header';
import MockData from './MockData.json';

const History = props=>{
    const mockData = MockData;

    const renderItem =(item)=>{
        //console.log(item)
        return(
            <View style={styles.container}>
                <View style={styles.containerImage}>
                        <Image
                    style={{width:35, height:35}} 
                    source={require("../../assets/images/general.png")}
                    resizeMode='contain'
                    />
                </View>
                <View style={{flex:1, height:'100%',paddingHorizontal:10}}>
                    <Text numberOfLines={2} style={{fontSize: 15, fontWeight:'bold', paddingVertical:3}}>{item.item.need}</Text>
                    <Text style={{fontSize: 13}}>On 10 May, 05.00 Pm</Text>
                </View>
                <View style={{height:'100%'}}>
                    <Text style={{fontSize: 13,paddingVertical:3, color: Constant.TERTIARY_GREY_COLOR}}> General</Text>
                </View>

            </View>
        )
    }

    return(
        <View style={styles.screen}>
            <View style={styles.mainArea}>
            <FlatList 
            data={mockData}
            renderItem={(item)=>{
                return renderItem(item)
            }}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            /> 
            </View>
        <Header
         header={true} 
         title='History'
         onBack={()=>{props.navigation.goBack()}}
         />
        </View>
    );
}

const styles = StyleSheet.create({
    screen :{
        flex:1,
    },
    mainArea:{
        //justifyContent:'center',
        //alignItems:'center',
      //  backgroundColor:'yellow',
        flex:1, 
        width:'100%', 
        paddingTop:95,
        paddingHorizontal:5
    },
    container:{
        width:'100%',
        backgroundColor:'white',
        borderRadius:5,
        marginVertical:1,
        elevation:1,
        shadowOpacity:0.1, 
        shadowRadius:2, 
        shadowOffset:{width:0, height:1},
        flexDirection:'row',
        paddingHorizontal: 15,
        paddingVertical:10,
        alignItems:'center'
    },
    containerImage:{
        //backgroundColor:'yellow',
        paddingVertical:5,
    }
});

export default History;