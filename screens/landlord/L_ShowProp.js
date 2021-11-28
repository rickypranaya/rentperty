import React, { useEffect , useState} from 'react';
import { Animated, View, Text, StyleSheet, Image, Alert, TouchableOpacity, ScrollView } from 'react-native';
import Constant from '../../components/Constants';
import { SliderBox } from "react-native-image-slider-box";
import { StatusBar } from 'expo-status-bar';
import { Icon } from 'react-native-elements';
import MapView, { Marker } from 'react-native-maps';
import { Platform } from 'react-native';

const L_ShowProp = props=>{
    const [data, setData] = useState({})
    const [imageLists, setImageLists] = useState(
        [
            require("../../assets/images/preview1.jpg"), 
            require("../../assets/images/preview2.jpg"),
            require("../../assets/images/preview3.jpg"),
            require("../../assets/images/preview4.jpg"),
            require("../../assets/images/preview5.jpg"),
            require("../../assets/images/preview6.jpg"),
        ])

    const [isSelected, setSelection] = useState(false);
    const [furnitureLists, setFurnitureLists] = useState([
        {name: 'Air-Conditioning', quantity : 1},
        {name: 'Washing Machine', quantity : 1},
        {name: 'Queen Size Bed', quantity : 1},
    ])

    const [location, setLocation] = useState({
        latitude:1.3373106364044813,
        longitude:103.78181926527036
    });
    const [isModalVisible, setModalVisible]= useState(false)


    useEffect(()=>{
        if (props.route.params?.data) {
            setData(props.route.params.data)
        }
     },[]);
    
    function RenderFurniture(props){
        return (<Text style={styles.furnitures}>{props.data.quantity} x {props.data.name}</Text>)
    }

    return(
        <View style={styles.screen}>
            {/* <StatusBar style="dark" /> */}
            <View style={styles.mainArea}>
                <ScrollView 
                showsVerticalScrollIndicator={false}
                style={styles.scrollArea}>

                    <View style={{height:Constant.DEVICE_HEIGHT*0.4}}>
                        <SliderBox 
                            onCurrentImagePressed={(index)=>{props.navigation.navigate({
                                name: 'ShowImages',
                                params: { data: imageLists, index : index }
                              })}}
                            // disableOnPress={true} 
                            activeOpacity={1}
                            images={imageLists} 
                            ImageComponentStyle={styles.preview} 
                            parentWidth={Constant.DEVICE_WIDTH} 
                            dotColor={Constant.PRIMARY_COLOR}
                        />
                    </View>   

                    <View style={styles.boxView}>    
                        <Text style={styles.text4}>S$ {data.price}</Text>
                        <View style={{flexDirection:'row', alignItems:'center', marginVertical:5}}>
                            <Text style={styles.text3}>{data.type}</Text>
                            <View style={styles.dot}/>
                            <Text style={styles.text3}>{data.area}</Text>
                        </View>
                        <Text style={styles.text1}>{data.title}</Text>
                        <Text style={styles.text2}>{data.address}</Text>
                    </View>

                    <View style={styles.line}/>

                    {/* UNIT DETAILS */}
                    <View style={styles.boxView}>    
                        <Text style={styles.text5}>Unit Details</Text>

                        <Text style={styles.text2}>Lease</Text>
                        <Text style={styles.text6}>Flexible</Text>

                        <Text style={styles.text2}>Furnishing</Text>
                        <Text style={styles.text6}>Full</Text>

                        <Text style={styles.text2}>Type</Text>
                        <Text style={styles.text6}>Condo</Text>

                        <Text style={styles.text2}>Room</Text>
                        <Text style={styles.text6}>Common Room</Text>

                        <Text style={styles.text2}>Gender</Text>
                        <Text style={styles.text6}>Females Only</Text>
                    </View>

                    {/* FEATURES */}
                    <View style={styles.boxView}>    
                        <Text style={styles.text5}>Features</Text>
                        
                        <View style={{flexDirection:'row'}}>
                            <View style={{width: Constant.DEVICE_WIDTH*0.5}}>
                                <View style={styles.features}>
                                    <Icon              
                                        name='checkbox-marked'
                                        type='material-community'
                                        color={Constant.PRIMARY_COLOR}
                                        size={20}
                                    />
                                    <Text>Air-Conditioning</Text>
                                </View>
                                <View style={styles.features}>
                                    <Icon              
                                        name='checkbox-marked'
                                        type='material-community'
                                        color={Constant.PRIMARY_COLOR}
                                        size={20}
                                    />
                                    <Text>Cooking</Text>
                                </View>
                                <View style={styles.features}>
                                    <Icon              
                                        name='checkbox-marked'
                                        type='material-community'
                                        color={Constant.PRIMARY_COLOR}
                                        size={20}
                                    />
                                    <Text>PUB Included</Text>
                                </View>
                            </View>

                            <View>
                                <View style={styles.features}>
                                    <Icon              
                                        name='checkbox-marked'
                                        type='material-community'
                                        color={Constant.PRIMARY_COLOR}
                                        size={20}
                                    />
                                    <Text>Water Heater</Text>
                                </View>
                                <View style={styles.features}>
                                    <Icon              
                                        name='checkbox-marked'
                                        type='material-community'
                                        color={Constant.PRIMARY_COLOR}
                                        size={20}
                                    />
                                    <Text>Wifi / Internet</Text>
                                </View>
                                <View style={styles.features}>
                                    <Icon              
                                        name='checkbox-blank-outline'
                                        type='material-community'
                                        color='lightgrey'
                                        size={20}
                                    />
                                    <Text>Visitor Allowed</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* FURNITURE */}
                    <View style={styles.boxView}>    
                        <Text style={styles.text5}>Furnitures</Text>
                        <View style={{flexWrap:'wrap', flexDirection:'row', justifyContent:'space-between'}}>
                            {furnitureLists.map((data, index)=>{
                                return (<RenderFurniture key={index} data={data}/>)
                            })}
                        </View>       
                    </View>

                    <View style={styles.line}/>
                    
                    {/* LOCATION */}
                    <View style={styles.boxView}>    
                        <Text style={styles.text5}>Location</Text>
                    </View>

                    <MapView 
                    style={styles.map} 
                    region={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                    }}>
                        
                        <Marker
                                coordinate={location}
                                image={require("../../assets/images/search_pin.png")}
                            // onPress={()=>{props.navigation.navigate('reserve')}}
                        />
                
                    </MapView> 

                    <View style={styles.boxView}>
                        <Text style={styles.text2}>Address</Text>
                        <Text style={styles.text6}>{data.address}</Text>

                        <Text style={styles.text2}>Postal Code</Text>
                        <Text style={styles.text6}>588162</Text>
                    </View>

                </ScrollView>
            </View>
            <TouchableOpacity style={styles.backButton} onPress={()=>{props.navigation.goBack()}}>
                <Icon              
                name='arrow-back'
                type='material'
                color='#3c3c3c'
                size={20}
                />
              </TouchableOpacity>  

            <Animated.View style={styles.bottomAction}>
                <TouchableOpacity style={styles.secondary_button } onPress={() => {
                    props.navigation.navigate({
                        name: 'l_edit',
                        params: { data: data }
                      })
                 }}>
                    <Icon              
                    name='edit'
                    type='feather'
                    color='#3c3c3c'
                    size={20}
                    />
                    <Text style = {styles.secondary_button_text}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.main_button } onPress={() => { 
                    props.navigation.navigate({
                        name: 'l_tenantList',
                        params: { data: data.id }
                      })}}>
                    <Text style = {styles.main_button_text}>View Tenants</Text>
                </TouchableOpacity>
                {/* <MainButton title='Enquire Now' onPress={()=>{}}/> */}
            </Animated.View>  
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
        backgroundColor:'white',
        flex:1, 
        width:'100%', 
        // paddingTop:44
    },
    preview:{
        width: '100%',
        backgroundColor:'white',
        height:Constant.DEVICE_HEIGHT*0.4,
        // borderRadius:7 
        // marginVertical:7,
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
        fontSize: 20,
        fontWeight:'bold'
    },
    text5:{
        fontSize: 18,
        fontWeight:'bold',
        marginBottom:5
    },
    text6:{
        fontSize: 15,
        marginBottom:10
    },
    dot: {
        marginHorizontal:10,
        width:5,
        height:5, 
        backgroundColor:'lightgrey', 
        borderRadius:50
    },
    boxView:{
        paddingHorizontal:15,
        paddingVertical:10,
    },
    line:{
        width:Constant.DEVICE_WIDTH,
        borderBottomColor:'lightgrey',
        borderBottomWidth:0.4,
    },
    features: {
        flexDirection:'row',
        marginVertical: 3,
    },
    furnitures:{
        width:Constant.DEVICE_WIDTH*0.4,
        marginVertical:3,
    },
    map:{
        backgroundColor:'white',
        width:Constant.DEVICE_WIDTH,
        height:Constant.DEVICE_HEIGHT*0.3,
    },
    bottomAction : {
        flexDirection:'row',
        borderTopWidth:1, 
        borderTopColor:'lightgrey' ,
        backgroundColor:'white',
        paddingBottom: Platform.OS=='ios'? 34: 0, 
        width:Constant.DEVICE_WIDTH, 
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:15,
    },
    secondary_button:{
        marginVertical:10,
        borderColor:'#676767',
        borderWidth:1.5,
        alignItems:'center',
        flex:1,
        paddingVertical: Platform.OS === 'ios'? 12 : 10,
        borderRadius:50,
        flexDirection:'row',
        justifyContent:'center'
    },
    secondary_button_text:{
        color:'#676767',
        fontWeight:'bold',
        paddingHorizontal:10,
        //fontSize:15
    },
    main_button:{
        marginVertical:10,
        backgroundColor: Constant.PRIMARY_COLOR,
        alignItems:'center',
        width: Constant.DEVICE_WIDTH * 0.55,
        paddingVertical: Platform.OS === 'ios'? 13 : 11,
        borderRadius:50,
        marginLeft: 20
    },
    main_button_text:{
        color:'white',
        fontWeight:'bold',
        //fontSize:15
    }
});

export default L_ShowProp;