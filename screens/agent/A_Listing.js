import React, { useEffect , useRef, useState} from 'react';
import {Animated, View, Text, StyleSheet, Image, Alert, ScrollView, TouchableOpacity } from 'react-native';
import Constant from '../../components/Constants';
import Header from '../../components/Header';
import {Icon} from 'react-native-elements';
import { SliderBox } from "react-native-image-slider-box";
import { StatusBar } from 'expo-status-bar';
import Modal from 'react-native-modal';

const A_Listing = pros=>{
    const[isModalVisible, setModalVisible] = useState(false)
    
    useEffect( () => {
        console.log('im called')
        setModalVisible(true)
    }, []);

    const [imageLists, setImageLists] = useState(
        [
            require("../../assets/images/preview1.jpg"), 
            require("../../assets/images/preview2.jpg"),
            require("../../assets/images/preview3.jpg"),
            require("../../assets/images/preview4.jpg"),
        ])

    const [propertyLists, setPropertyLists] = useState([
        {
            id : "1",
            images : imageLists,
            title : 'agent Residences',
            address:'1 Fraser Street',
            type:'Room Rental',
            area: '109 sqft / 100 sqm',
            price: '1,800',
        },
        {
            id : "2",
            images : [
                require("../../assets/images/preview3.jpg"),
                require("../../assets/images/preview4.jpg"),
            ],
            title : 'Peace Mansion',
            address:'1 Sophia Rd, Singapore 228149',
            type:'Room Rental',
            area: '154 sqft / 123 sqm',
            price: '1,500',
        }

    ])

    // const [shortLists, setShortLists] = useState(['2'])

    function PreviewCard(props) {
        return (
            <View style={styles.card} >
                
                    <SliderBox 
                        // disableOnPress={true} 
                        activeOpacity={1}
                        imageLoadingColor='lightgrey'
                        onCurrentImagePressed ={()=>{
                            pros.navigation.navigate({
                                name: 'a_showProp',
                                params: { data: props.data }
                              })
                            }
                        }
                        images={props.data.images} 
                        ImageComponentStyle={styles.preview} 
                        parentWidth={Constant.DEVICE_WIDTH-10} 
                        dotColor={Constant.PRIMARY_COLOR}
                    />
                
                <TouchableOpacity onPress={()=>{
                    pros.navigation.navigate({
                        name: 'a_showProp',
                        params: { data: props.data }
                      })
                    }}>
                    
                    <View style={{flexDirection:'row', justifyContent:'space-between', padding:10}}>
                        <View style={styles.info}>    
                            <Text style={styles.text1}>{props.data.title}</Text>
                            <Text style={styles.text2}>{props.data.address}</Text>

                            <View style={{flexDirection:'row', alignItems:'center', marginVertical:5}}>
                                <Text style={styles.text3}>{props.data.type}</Text>
                                <View style={styles.dot}/>
                                <Text style={styles.text3}>{props.data.area}</Text>
                            </View>

                            <Text style={styles.text4}>S$ {props.data.price}</Text>
                        </View>

                    </View>
                </TouchableOpacity>

                <Modal
                backdropOpacity={0.5}
                style={styles.planModal}
                isVisible={isModalVisible}
                //  animationType='fade'
                onBackdropPress={()=>{setModalVisible(false)}}
                onBackButtonPress={()=>{setModalVisible(false)}}
                >
                    <Text style={styles.bigText}>Choose Your Plan</Text>
                    <Text style={styles.smallText}>Choose a plan that is best for you</Text>

                    <TouchableOpacity 
                    style={[styles.container,{backgroundColor:'#C7F3F1'}]} 
                    onPress={()=>{setModalVisible(false)}}>

                        <View style={{flex:1, paddingHorizontal:10, justifyContent:'center'}}>
                            <Text numberOfLines={1} style={{fontSize: 15, fontWeight:'bold', paddingVertical:3}}>Free Plan</Text>
                            <Text numberOfLines={1} style={{fontSize: 13, paddingBottom:3}}>Start and explore with our free plan</Text>
                        </View>
                        <Text style={{fontSize: 15, fontWeight:'bold'}}>$0</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                    style={styles.container} 
                    onPress={()=>{setModalVisible(false)}}>

                        <View style={{flex:1, paddingHorizontal:10, justifyContent:'center'}}>
                            <Text numberOfLines={1} style={{fontSize: 15, fontWeight:'bold', paddingVertical:3}}>Basic Plan</Text>
                            <Text numberOfLines={1} style={{fontSize: 13}}>Being featured and get more exposure</Text>
                        </View>
                        <Text style={{fontSize: 15, fontWeight:'bold'}}>$10/mo</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                    style={styles.container} 
                    onPress={()=>{setModalVisible(false)}}>

                        <View style={{flex:1, paddingHorizontal:10, justifyContent:'center'}}>
                            <Text numberOfLines={1} style={{fontSize: 15, fontWeight:'bold', paddingVertical:3}}>Premium Plan</Text>
                            <Text numberOfLines={1} style={{fontSize: 13}}>Basic Plan with recommendation</Text>
                        </View>
                        <Text style={{fontSize: 15, fontWeight:'bold'}}>$50/mo</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>{setModalVisible(false)}} style={{ marginTop:30, height:50, justifyContent:'center'}}>
                        <Text style={{alignSelf:'center', color: Constant.PRIMARY_COLOR, fontWeight:'bold'}}>Continue with free plan</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.backButton} onPress={()=>{setModalVisible(false)}}>
                        <Icon              
                        name='cross'
                        type='entypo'
                        color='#3c3c3c'
                        size={20}
                        />
                    </TouchableOpacity>  

                </Modal>

            </View>
        )
    }

    return(
        <View style={styles.screen}>
            {/* <StatusBar style="auto" /> */}
            <View style={styles.mainArea}>
                <ScrollView 
                showsVerticalScrollIndicator={false}
                style={styles.scrollArea}>

                    {propertyLists.map((e, idx)=>{
                        return ( <PreviewCard key={idx} index={idx} data={e}/>)
                    })}

                </ScrollView>
            </View>
        <Header header={true} search={true}/>
        </View>
    );
}

const styles = StyleSheet.create({
    screen :{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    mainArea:{
       backgroundColor:'white',
        flex:1, 
        width:'100%', 
        paddingTop:94,
    },
    text1:{
        fontSize: 18,
    },
    text2:{
        color: Constant.TERTIARY_GREY_COLOR,
        fontSize: Constant.TERTIARY_FONT_SIZE,
    },
    text3:{
        fontSize: 14,
    },
    text4:{
        fontSize: 18,
        fontWeight:'bold'
    },
    scrollArea:{
       // paddingHorizontal:25,
        // paddingVertical:10
    },
    info:{
        backgroundColor:'white',
        maxWidth:'80%'
    },
    preview:{
        width: '100%',
        backgroundColor:'white',
        height:Constant.DEVICE_WIDTH*0.6,
        borderRadius:7 
        // marginVertical:7,
    },
    card :{
        backgroundColor:'white',
        margin:5,
        borderRadius:7,
        shadowOpacity:0.15, 
        shadowRadius:3, 
        shadowOffset:{width:0, height:2},
        elevation:1.5,  
    },
    dot: {
        marginHorizontal:10,
        width:5,
        height:5, 
        backgroundColor:'lightgrey', 
        borderRadius:50
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
    bigText:{
        fontSize:27,
        fontWeight:'bold',
        paddingLeft:20
    },
    smallText:{
        color: Constant.TERTIARY_GREY_COLOR,
        marginTop:5, 
        marginBottom:25,
        fontSize:13,
        paddingLeft:20

    },
    container:{
        width:Constant.DEVICE_WIDTH-10,
        backgroundColor:'white',
        borderRadius:5,
        marginVertical:1,
        marginHorizontal:2,
        flexDirection:'row',
        paddingHorizontal: 15,
        paddingVertical:7,
        alignItems:'center',
        backgroundColor:'#F4F4F4',
        marginVertical:5,
        marginHorizontal:5
        //justifyContent:'center'
    },
    planModal:{
        margin:0, 
        backgroundColor:'white', 
        justifyContent:'flex-start', 
        paddingTop:100, 
        marginTop:100, 
        borderTopLeftRadius:20, 
        borderTopRightRadius:20
    }
});

export default A_Listing;