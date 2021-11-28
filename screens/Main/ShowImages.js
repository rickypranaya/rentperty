import React, { useEffect, useState } from 'react';
import {Animated, View, Text, StyleSheet, Image, Alert,FlatList, TouchableOpacity, ScrollView } from 'react-native';
import Constant from '../../components/Constants';
import Header from '../../components/Header';
import { Icon } from 'react-native-elements';
import { SliderBox } from "react-native-image-slider-box";

const ShowImages = props=>{
    const [data, setData] = useState()
    const [activeImage, setActiveImage] = useState(0)
    const [ref, setRef] = useState();

    useEffect(()=>{
        if (props.route.params?.data) {
            setData(props.route.params.data)
            setActiveImage(props.route.params.index)
        }
     },[data]);
    
    function RenderImagePreview (p) {
        var idx = activeImage
        var opac = idx == p.index? 1 : 0.5
        var size = idx == p.index?  Constant.DEVICE_WIDTH*0.17: Constant.DEVICE_WIDTH*0.15
        return (
            <TouchableOpacity style={{justifyContent:'center'}} onPress={()=>{setActiveImage(p.index); ref.scrollTo({ x: Constant.DEVICE_WIDTH * p.index, y: 0, animated: true })}}>
                <Image
                    style={[styles.preview,{opacity:opac, width:size, height:size}]}
                    source={p.data}
                    resizeMode='cover'
                />
                
            </TouchableOpacity> 
        )
    }
    
    return(
        <View style={styles.screen}>
            {data &&
            <View style={styles.mainArea}>
                <View style={{backgroundColor:'#2d2d2d'}}>

                    {/* <Image
                        style={{width:Constant.DEVICE_WIDTH, backgroundColor:'#2d2d2d'}}
                        source={data[activeImage]}
                        resizeMode='contain'
                    />   */}
                    <SliderBox 
                            imageLoadingColor={Constant.PRIMARY_COLOR}
                            currentImageEmitter = {index=>{setActiveImage(index); ref.scrollTo({ x: Constant.DEVICE_WIDTH * index, y: 0, animated: true });}}
                            firstItem = {activeImage}
                            disableOnPress={true} 
                            activeOpacity={1}
                            resizeMode='contain'
                            images={data} 
                            dotStyle={{width:0, height:0}}
                            sliderBoxHeight={500}
                            ImageComponentStyle={{width:Constant.DEVICE_WIDTH, backgroundColor:'#2d2d2d'}} 
                            parentWidth={Constant.DEVICE_WIDTH} 
                            dotColor={Constant.PRIMARY_COLOR}
                        />
                </View>
                
                <ScrollView 
                    ref={(ref) => {
                        setRef(ref);
                    }}
                    horizontal={true}
                    style={styles.bottomScrollView}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{paddingHorizontal:15}}
                >
                    {data.map((e,index)=>{
                        return (
                            <RenderImagePreview key={index} data={e} index={index}/>
                        )
                    })
                }
                    
                </ScrollView> 
 
            </View>
            }
            
            <TouchableOpacity style={styles.backButton} onPress={()=>{props.navigation.goBack()}}>
                <Icon              
                name='cross'
                type='entypo'
                color='#3c3c3c'
                size={20}
                />
              </TouchableOpacity>  
        </View>
    );
}

const styles = StyleSheet.create({
    screen :{
        flex:1,
    },
    mainArea:{
        flex:1,
        justifyContent:"center",
        alignItems:'center',
        backgroundColor:'#2d2d2d',
        width:'100%', 
        height:'100%',
        paddingTop:94,
        paddingBottom:Constant.DEVICE_WIDTH*0.25
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
    preview:{
        borderRadius:10,
        alignSelf:'center',
        marginHorizontal:5,
        overflow: 'hidden',
    },
    bottomScrollView:{
        backgroundColor:'#3a3a3a',
        width:Constant.DEVICE_WIDTH,
        height:  Platform.OS=='ios'? Constant.DEVICE_WIDTH*0.22 + 34 : Constant.DEVICE_WIDTH*0.22,
        paddingBottom: Platform.OS=='ios'? 34: 0, 
        position:'absolute',
        bottom:0,
    }
});

export default ShowImages;