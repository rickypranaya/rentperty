import React, { useEffect , useRef, useState} from 'react';
import {Animated, View, Text, StyleSheet, Image, Alert, ScrollView, TouchableOpacity } from 'react-native';
import Constant from '../../components/Constants';
import Header from '../../components/Header';
import {Icon} from 'react-native-elements';
import { SliderBox } from "react-native-image-slider-box";


const Shortlist = pros=>{

    const [imageLists, setImageLists] = useState(
        [
            require("../../assets/images/preview5.jpg"), 
            require("../../assets/images/preview3.jpg"),
            require("../../assets/images/preview2.jpg"),
            require("../../assets/images/preview4.jpg"),
        ])

    const [propertyLists, setPropertyLists] = useState([
        
        {
            id : "2",
            images : [
                require("../../assets/images/preview3.jpg"),
                require("../../assets/images/preview4.jpg"),
            ],
            title : 'Peace Mansion',
            address:'Wilkie road',
            type:'Room Rental',
            area: '154 sqft / 123 sqm',
            price: '1,500',
        },
        {
            id : "3",
            images : imageLists,
            title : 'Duo Residences',
            address:'1 Fraser Street',
            type:'Room Rental',
            area: '109 sqft / 100 sqm',
            price: '1,800',
        },

    ])

    function PreviewCard(props) {
        return (
            <View style={styles.card} >
                
                    <SliderBox 
                        // disableOnPress={true} 
                        activeOpacity={1}
                        imageLoadingColor='lightgrey'
                        onCurrentImagePressed ={()=>{
                            pros.navigation.navigate({
                                name: 'ShowProp',
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
                        name: 'ShowProp',
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

                        {/* {!shortLists.includes(props.data.id)? */}
                        {/* <TouchableOpacity onPress={()=>{Alert.alert('saved to shortlists')}}>
                            <Icon
                            // reverse
                            name='heart-o'
                            type='font-awesome'
                            color='#676767'
                            size={25}
                            />
                        </TouchableOpacity> 
                         :*/}
                        <TouchableOpacity onPress={()=>{alert(props.index)}}>
                        <Icon
                        // reverse
                        name='heart'
                        type='font-awesome'
                        color='red'
                        size={25}
                        />
                    </TouchableOpacity>
                    {/* }  */}

                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    return(
        <View style={styles.screen}>
            <View style={styles.mainArea}>
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    style={styles.scrollArea}>

                        {propertyLists.map((e, idx)=>{
                            return ( <PreviewCard key={idx} index={idx} data={e}/>)
                        })}

                </ScrollView>
            </View>
        <Header header={true} title='Shortlist'/>
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
    }
});

export default Shortlist;