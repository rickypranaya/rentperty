import React, { useEffect ,useState} from 'react';
import {View, Animated, FlatList, SafeAreaView, Text, StyleSheet, Image, Alert, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import Constant from '../../components/Constants';
import { Icon } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import Modal from 'react-native-modal';
import * as Location from 'expo-location';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import MainButton from '../../components/button/MainButton';
import DropDownPicker from 'react-native-dropdown-picker';

const A_Edit = props=>{
    // Data needed to create listing //
    const [need, setNeed] = useState('')
    const [description, setDescription] = useState('')

    const [imageData, setImage] = useState([
        {id:'temp', uri :require("../../assets/images/preview1.jpg")},
        {id:'temp', uri :require("../../assets/images/preview2.jpg")},
        {id:'temp', uri :require("../../assets/images/preview3.jpg")},
        {id:'temp', uri :require("../../assets/images/preview4.jpg")},
        {id:'temp', uri :require("../../assets/images/preview5.jpg")},
        {id:'add',uri:'add'}
    ])

    const [fee, setFee] = useState('1,800')
    const [paymentOption, setPaymentOption] = useState('Cash')
    const [location, setLocation] = useState(null)
    const [scheduled, setScheduled] = useState(false)
    const [date, setDate] = useState(new Date())
    const [dateString, setDateString] = useState('Schedule for')
    const [type, setType] = useState('Condo')
    const [roomType, setRoomType] = useState('Common')
    
    // To highlight the active text input //
    const [activeBorder1, setActiveBorder1] = useState(Constant.GREY_BACKGROUND)
    const [activeBorder2, setActiveBorder2] = useState(Constant.GREY_BACKGROUND)
    const [activeBorder3, setActiveBorder3] = useState(Constant.GREY_BACKGROUND)
    const [activeBorder4, setActiveBorder4] = useState(Constant.GREY_BACKGROUND)

    // Set the Modal visibility (Image option, View Images, Datepicker) //
    const [isModalVisible, setModalVisible]= useState(false)
    const [addFurnitureModal, setFurnitureModal]= useState(false)
    const [openPhotoModal, setPhotoModal]= useState(false)
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false)

    // Other variable needed for state //
    const [chosenImage, setChosenImage] = useState('')
    const [keyboardOffset, setKeyboardOffset] = useState(0)
    const [keyboardPadding, setKeyboardPadding] = useState(false)

    // Dropdown Category //
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('room_rentals');
    const [items, setItems] = useState([
      {label: 'Room Rentals', value: 'room_rentals'},
      {label: 'For Sale', value: 'for_sale'},
      {label: 'Unit Rentals', value: 'unit_rentals'}
    ]);

    // Dropdown Lease //
    const [openLease, setOpenLease] = useState(false);
    const [lease, setLease] = useState('flexible');
    const [leaseItems, setLeaseItems] = useState([
      {label: '1 Year', value: '1'},
      {label: '2 Year', value: '2'},
      {label: 'Short Term', value: 'short_term'},
      {label: 'Flexible', value: 'flexible'},
      {label: 'More Than 2 Years', value: '2+'}
    ]);

    // Features //
    const [aircon, setAircon] = useState(true)
    const [cooking, setCooking] = useState(true)
    const [pub, setPub] = useState(true)
    const [waterHeater, setWaterHeater] = useState(true)
    const [wifi, setWifi] = useState(true)
    const [visitor, setVisitor] = useState(false)

    // Furniture //
    const [qtyTemp, setQtyTemp] = useState(1)
    const [furnitureTemp, setFurnitureTemp] = useState('')
    const [furnitureLists, setFurnitureLists] = useState([
        {name: 'Air Conditioning', qty: 1},
        {name: 'Queen Size Bed', qty: 1},
        {name: 'Washing Machine', qty: 1}
    ])

    // receive location from location screen //
    useEffect(() => {
        if (props.route.params?.post) {
            setLocation(props.route.params.post)
        }
    }, [props.route.params?.post]);

    // receive location from location screen //
    useEffect(() => {
        if (props.route.params?.data) {
            console.log(props.route.params)
            setLocation({header: props.route.params.data.address})
            setNeed(props.route.params.data.title)
        }
    }, [props.route.params?.data]);

    // image options //
    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert('Permission to access gallery was denied');
            return;
        } else {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                // allowsEditing: true,
                // aspect: [5, 5],
                quality: 1,
            });
          
            if (!result.cancelled) {
                var randId = Math.random();
                setImage([{id:randId.toString(), uri:result.uri},...imageData]);
            }
        }
    };

    const snapImage = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert('Permission to access camera was denied');
            return;
        } else {
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                //   allowsEditing: true,
                // aspect: [5, 5],
                quality: 1,
            });
                    
            if (!result.cancelled) {
                var randId = Math.random();
                setImage([{id:randId.toString(), uri:result.uri},...imageData]);
            }
        }
    };

    const renderImage = (src) => {
        if (src.item.uri == 'add'){
            return (
                <TouchableOpacity  onPress={()=>{setModalVisible(true)}} >
                    <View style={styles.addPhotos}>
                        <Icon
                        name='add-circle-outline'
                        type='ionicon'
                        color={Constant.GREY_PLACEHOLDER}
                        size={40}
                        />
                    </View>
                </TouchableOpacity>
            )
        } else if (src.item.id == 'temp'){
            return (
                <TouchableOpacity  onPress={()=>{Alert.alert('Under development')}} >
                    <Image
                        style={styles.addPhotos} 
                        source={src.item.uri}
                        resizeMode='cover'
                    />
                </TouchableOpacity>
            )
        } else {
            return(
                <TouchableOpacity 
                    onPress={()=>{
                        setChosenImage(src.item.uri);
                        setPhotoModal(true);
                    }} 
                >
                    <Image
                        style={styles.addPhotos} 
                        source={{uri:src.item.uri}}
                        resizeMode='cover'
                    />
                </TouchableOpacity>
            )
        }  
    };

    const removeImage =()=>{
        setPhotoModal(false);
        var filtered = imageData.filter(function(value, index, arr){ 
            return value.uri != chosenImage;
        });
        setImage(filtered)
    }

    // Location button function
    const chooseLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert('Permission to access location was denied');
            return;
        } else {
            props.navigation.navigate('getLocation');
        }
    }

    // Ui of Type button on different state
    const typeButton = (string)=>{
        let fWeight = 'normal';
        let fColor = Constant.GREY_PLACEHOLDER;
        let backColor = Constant.GREY_BACKGROUND;
        let borderWidth = 1;
        
        if ( type === string){
            fWeight = 'bold';
            fColor = Constant.PRIMARY_COLOR;
            backColor =  Constant.SECONDARY_COLOR;
            borderWidth = 1.5;
        }

        return(
            <TouchableOpacity 
                style={[
                    styles.schedule,
                    {
                        borderWidth: borderWidth,          
                        borderColor: fColor,
                        backgroundColor:backColor,
                    }]}
                onPress={()=>(setType(string))}
            > 
                <Text style={{color: fColor, fontWeight:fWeight}}>
                    {string}
                </Text>
            </TouchableOpacity>
        )
    }

    // Ui of Type button on different state
    const roomButton = (string)=>{
        let fWeight = 'normal';
        let fColor = Constant.GREY_PLACEHOLDER;
        let backColor = Constant.GREY_BACKGROUND;
        let borderWidth = 1;
        
        if ( roomType === string){
            fWeight = 'bold';
            fColor = Constant.PRIMARY_COLOR;
            backColor =  Constant.SECONDARY_COLOR;
            borderWidth = 1.5;
        }

        return(
            <TouchableOpacity 
                style={[
                    styles.schedule,
                    {
                        borderWidth: borderWidth,          
                        borderColor: fColor,
                        backgroundColor:backColor,
                    }]}
                onPress={()=>(setRoomType(string))}
            > 
                <Text style={{color: fColor, fontWeight:fWeight}}>
                    {string}
                </Text>
            </TouchableOpacity>
        )
    }

    //dollar format
    const _renderDollar = (number) =>{
        let n = number
        let balance = n.toString()
        if (balance.length>3 ){
            if(balance.length >6){
                return(balance.slice(0,-6)+','+balance.slice(-6,-3)+','+balance.slice(-3))
            }else {
                return(balance.slice(0,-3)+','+balance.slice(-3))
            }
        } else {
            return(balance)
        } 
    }

    //handling phone input
    const _handlingInput=(number) =>{
        setFee(number.replace(/[^0-9]/g, ''))
      }

    // Ui of scheduled button on different state
    const scheduleButton = (string)=>{
        let action;
        let fWeight = 'normal';
        let fColor = Constant.GREY_PLACEHOLDER;
        let backColor = Constant.GREY_BACKGROUND;
        let borderWidth = 1;

        if (scheduled == false){
            if (string == 'Now'){
                action =()=>{ 
                    setScheduled(false);
                    setDateString('Schedule for'); 
                }
                fWeight = 'bold';
                fColor = Constant.PRIMARY_COLOR;
                backColor =  '#FFEFD8';
                borderWidth = 1.5;
            } else {
                action =()=>{showDatePicker()}
            }
        } else {
            if (string == 'Now'){
                action =()=>{ 
                    setScheduled(false);
                    setDateString('Schedule for'); 
                }
            } else {
                action =()=>{ showDatePicker()}
                fWeight = 'bold';
                fColor = Constant.PRIMARY_COLOR;
                backColor =  '#E3F6FF';
                borderWidth = 1.5;
            }
        }

        return(
            <TouchableOpacity 
                style={[
                    styles.schedule,
                    {
                        borderWidth: borderWidth,          
                        borderColor: fColor,
                        backgroundColor:backColor,
                    }]}
                onPress={action}
            > 
                <Text style={{color: fColor, fontWeight:fWeight}}>
                    {string}
                </Text>
                {string == 'Schedule for'?
                <Icon
                    name='arrow-drop-up'
                    type='material'
                    color={fColor}
                    size={20}
                />
                : null}
            </TouchableOpacity>
        )
    }

    // Datetimepicker functions
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    
    const handleConfirm = (date) => {
        const now = new Date();
    
        if ( date < now ){
            if (Platform.OS === 'ios'){
                Alert.alert('Please enter valid time')
            } else {
                hideDatePicker();
                setTimeout(() => {
                    Alert.alert('Please enter valid time')
                }, 500);
            }
        }
        else {
            var dateString = date.getUTCFullYear() + "-" + (date.getUTCMonth() + 1) + "-" + date.getUTCDate() + " " + date.getHours() + ":" + date.getUTCMinutes()
            hideDatePicker();
            setScheduled(true);
            setDate(date)
            setDateString(convertDate(date))
        }
    };

    // Convert date object to '12 Jun, 08:00 Pm'
    const convertDate = (dateFrom) => {
        var date = new Date(dateFrom)
        var today = new Date()
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
        var monthIndex = date.getMonth();
        var hours = (date.getHours() % 12) || 12;

        if (hours > 9) {
            hours = hours
        }
        else {
            hours = "0" + hours
        }

        var ampm = date.getHours() >=12 ? ' Pm' : ' Am'
        var minutes = date.getMinutes()
        if (minutes > 9) {
            minutes = minutes
        }
        else {
            minutes = "0" + minutes
        }

        var dateString;  
        if (dateFrom.getDate() == today.getDate() && dateFrom.getMonth() == today.getMonth()){
            dateString = 'Today'
        } else {
            dateString= date.getDate() + " " + monthNames[monthIndex]
        }
    
        return dateString + ", " + hours + ":" + minutes + ampm
    }

    const list = () => {
        var images = [...imageData]
        images.splice(-1,1)
        
        var body = {
            need: need,
            description : description,
            image : images.length == 0? null : images,
            payment :{
                fee: fee,
                method: paymentOption
            },
            location : location,
            schedule : scheduled? date: 'now',
        }

        Alert.alert('Under Development')
        console.log(body)
    }

    // features checkbox //
    const featureCheckbox = (feature)=>{
        var action
        var checked
        switch (feature) {
            case 'Air-Conditioning':
                action = ()=>{setAircon(!aircon)}
                checked = aircon
                break;

            case 'Cooking':
                action = ()=>{setCooking(!cooking)}
                checked = cooking
                break;

            case 'PUB Included':
                action = ()=>{setPub(!pub)}
                checked = pub
                break;

            case 'Water Heater':
                action = ()=>{setWaterHeater(!waterHeater)}
                checked = waterHeater
                break;
            
            case 'Wifi / Internet':
                action = ()=>{setWifi(!wifi)}
                checked = wifi
                break;

            case 'Visitor Allowed':
                action = ()=>{setVisitor(!visitor)}
                checked = visitor
                break;    

            default:
                break;
        }

        return (
            <TouchableOpacity style={styles.features} onPress={action}>
                {checked ?
                <Icon              
                    name='checkbox-marked'
                    type='material-community'
                    color={Constant.PRIMARY_COLOR}
                    size={20}
                /> : 
                <Icon              
                    name='checkbox-blank-outline'
                    type='material-community'
                    color='lightgrey'
                    size={20}
                />}
                <Text> {feature}</Text>
            </TouchableOpacity>
        )
    }

    function RenderFurnitures (prop){

        var removeFurniture = ()=>{
            var temp = furnitureLists
            temp.splice(prop.index, 1)
            setFurnitureLists(furnitureLists=> ([...temp]))
        }

        return (
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                <Text style={{marginVertical:10}}>{prop.data.name} </Text>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                

                <Text style={{fontSize:16}}>x {prop.data.qty}   </Text>

                <TouchableOpacity style={{padding:5}} onPress={()=>{removeFurniture()}}>
                <Icon              
                    name='close-circle'
                    type='ionicon'
                    color='grey'
                    size={20}
                />
                </TouchableOpacity>
                </View>
            </View>
        )
    }

    const addFurniture = ()=>{
        if ( furnitureTemp != ''){
            setFurnitureLists([...furnitureLists,{name:furnitureTemp, qty: qtyTemp}])
            setFurnitureTemp('')
            setFurnitureModal(false)
            setQtyTemp(1)
            setActiveBorder4(Constant.GREY_BACKGROUND)
        }
    }
    
    return(
        <SafeAreaView style={styles.screen}>
            <ScrollView style={styles.mainArea} showsVerticalScrollIndicator={false} >
                <KeyboardAvoidingView enabled={keyboardPadding} behavior='position' keyboardVerticalOffset={keyboardOffset}>
                    <View style={{paddingHorizontal: Constant.PADDING_HORIZONTAL}}>
                        <TouchableOpacity style={{ paddingTop:5}} onPress={()=>{props.navigation.goBack()}}>
                            <Icon
                                style={{alignSelf:'flex-start'}}
                                name='x'
                                type='feather'
                                color='#3c3c3c'
                                size={30}
                            />
                        </TouchableOpacity>


                    </View>

                    <FlatList 
                    showsHorizontalScrollIndicator ={false}
                    horizontal={true}
                    contentContainerStyle={{ paddingHorizontal: 15 }}
                    data={imageData}
                    renderItem={(item)=>{
                        return renderImage(item)
                    }}
                    keyExtractor={item => item.id}
                    />   

                    <View style={{paddingHorizontal: Constant.PADDING_HORIZONTAL}}>

                        <Text style={styles.label}>Category</Text>
                        <DropDownPicker
                        placeholder="Select Category"
                        placeholderStyle={{
                            color: Constant.GREY_PLACEHOLDER
                        }}
                        style={{
                        backgroundColor: Constant.GREY_BACKGROUND,
                        marginVertical:7,
                        borderRadius:10,
                        borderColor: "white",
                        marginVertical:10,
                        height:47
                        }}
                        dropDownContainerStyle={{
                            borderColor: Constant.GREY_BACKGROUND,
                            backgroundColor:'white'
                          }}
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        />

                        <Text style={styles.label}>Listing title</Text>
                        <View style={[styles.textField,{borderWidth:1, borderColor: activeBorder1,}]}> 
                            <TextInput
                                clearButtonMode='while-editing'
                                placeholder= 'Name your listing'
                                placeholderTextColor={Constant.GREY_PLACEHOLDER}
                                returnKeyType="done"
                                autoCapitalize="none"
                                style={{flex:1, padding: Platform.OS === 'ios'? 13 : 7}}
                                value ={need}
                                onChangeText={(val) => {
                                    setNeed(val)
                                }}

                                onFocus={(onFocus)=>{
                                    if (onFocus){
                                        setActiveBorder1(Constant.PRIMARY_COLOR)
                                        setKeyboardPadding(false)
                                    } 
                                }}

                                onEndEditing={()=>{
                                    setActiveBorder1(Constant.GREY_BACKGROUND)
                                }}
                            />
                        </View>

                        <Text style={styles.label}>Location</Text>
                        <TouchableOpacity style={styles.textField} onPress={()=>{chooseLocation()}}>
                            <Icon
                                style={{marginLeft:10}}
                                name='location-on'
                                type='material'
                                color={Constant.PRIMARY_COLOR}
                                size={20}
                            />
                            <Text style={{flex:1, padding:13}}>
                                {location? location.header: 'Add Location'}
                            </Text> 
                        </TouchableOpacity>

                        <Text style={styles.labelMain}>Unit Details</Text>

                        <Text style={styles.label}>Price</Text>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <View style={[styles.textField,{borderWidth:1, borderColor: activeBorder3}]}>
                                <Text>   S$ </Text>
                                <TextInput
                                    clearButtonMode='while-editing'
                                    placeholder= ''
                                    placeholderTextColor={Constant.GREY_PLACEHOLDER}
                                    returnKeyType="done"
                                    autoCapitalize="none"
                                    keyboardType= 'numeric'
                                    value={fee}
                                    style={{flex:1, padding: Platform.OS === 'ios'? 13 : 7}}
                                    onChangeText={(val) => {
                                        _handlingInput(val)
                                    }}

                                    onFocus={(onFocus)=>{
                                        setFee('')
                                        if (onFocus){
                                            
                                            setActiveBorder3(Constant.PRIMARY_COLOR)
                                            Platform.OS === 'ios' ? setKeyboardPadding(false) : setKeyboardPadding(false)
                                        } 
                                    }}

                                    onEndEditing={()=>{
                                        setFee(_renderDollar(fee))
                                        setActiveBorder3(Constant.GREY_BACKGROUND)
                                        setKeyboardPadding(false)
                                        Platform.OS === 'ios'? setKeyboardOffset(0) : null
                                    }}
                                />
                            </View>

                        </View>

                        <Text style={styles.label}>Type</Text>
                        <View style={styles.scheduleContainer}>
                            {typeButton('HDB')}
                            {typeButton('Condo')}
                            {typeButton('Landed')}
                        </View>
                        
                        {value == 'room_rentals' && 
                        <View>
                            <Text style={styles.label}>Room</Text>
                            <View style={styles.scheduleContainer}>
                                {roomButton('Master')}
                                {roomButton('Common')}
                                {roomButton('Shared')}
                            </View> 
                        </View>
                        }

                        <Text style={styles.label}>Lease</Text>
                        <DropDownPicker
                        placeholder="Lease Term"
                        placeholderStyle={{
                            color: Constant.GREY_PLACEHOLDER
                        }}
                        style={{
                        backgroundColor: Constant.GREY_BACKGROUND,
                        marginVertical:7,
                        borderRadius:10,
                        borderColor: "white",
                        marginVertical:10,
                        height:47
                        }}
                        dropDownContainerStyle={{
                            borderColor: Constant.GREY_BACKGROUND,
                            backgroundColor:'white'
                          }}
                        open={openLease}
                        value={lease}
                        items={leaseItems}
                        setOpen={setOpenLease}
                        setValue={setLease}
                        setItems={setLeaseItems}
                        />
                        
                        {/* FEATURES */}
                        <Text style={styles.labelMain}>Features</Text>
                        
                        <View style={{flexDirection:'row'}}>
                            <View style={{width: Constant.DEVICE_WIDTH*0.5}}>
                                {featureCheckbox('Air-Conditioning')}
                                {featureCheckbox('Cooking')}
                                {featureCheckbox('PUB Included')}
                            </View>

                            <View>
                                {featureCheckbox('Water Heater')}
                                {featureCheckbox('Wifi / Internet')}
                                {featureCheckbox('Visitor Allowed')}
                            </View>
                        </View>

                        {/* FURNITURES */}
                        <Text style={styles.labelMain}>Furnitures</Text>

                        {furnitureLists.map((e, index)=>{
                            return (
                            <RenderFurnitures data={e} index={index} key={index}/>
                            )
                        })} 

                        <TouchableOpacity style={styles.textField} onPress={()=>{setFurnitureModal(true)}}>
                            <Icon
                                style={{marginLeft:10}}
                                name='add'
                                type='material'
                                color={Constant.PRIMARY_COLOR}
                                size={20}
                            />
                            <Text style={{flex:1, padding:13, color: Constant.PRIMARY_COLOR}}>
                                Add Furniture
                            </Text> 
                        </TouchableOpacity>  

                        {/* Description */}
                        <Text style={styles.labelMain}>Description</Text>
                        <View style={[styles.textField,{borderWidth:1, borderColor: activeBorder2,  alignItems:'flex-start'}]}>
                            <TextInput
                                multiline
                                numberOfLines={4}
                                placeholder= 'Describe more about the property (optional).'
                                placeholderTextColor={Constant.GREY_PLACEHOLDER}
                                autoCapitalize="none"
                                style={{textAlignVertical:'top',width:'100%',minHeight:90, marginVertical:5,padding: Platform.OS === 'ios'? 13 : 7}}
                                
                                onChangeText={(val) => {
                                    setDescription(val)
                                }}

                                onFocus={(onFocus)=>{
                                    if (onFocus){
                                        setActiveBorder2(Constant.PRIMARY_COLOR)
                                        setKeyboardPadding(false)
                                    } 
                                }}

                                onEndEditing={()=>{
                                    setActiveBorder2(Constant.GREY_BACKGROUND)
                                }}
                            />
                        </View>

                    <View style={{height:34}}/>
                    </View> 
                </KeyboardAvoidingView>
            </ScrollView>

            <Animated.View style={styles.bottomAction}>
                <MainButton title='Save' onPress={list}/>
            </Animated.View>  
                 
            <Modal
             isVisible={isModalVisible}
             animationInTiming ={400}
             onBackdropPress={()=>{setModalVisible(false)}}
             onBackButtonPress={()=>{setModalVisible(false)}}
             >
                <View style={styles.cameraModal}>
                    <Text style={{fontSize:15, fontWeight:'bold'}}>Add Photos</Text>                       
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity 
                            style={styles.photoOption} 
                            onPress={()=>{
                                setModalVisible(false);
                                setTimeout(()=>{ snapImage()}, 500);
                            }}
                        >                          
                            <Icon
                                style={{margin:10}}
                                name='camera'
                                type='ionicon'
                                color={Constant.PRIMARY_COLOR}
                                size={25}
                            />
                            <Text style={{fontSize:13, fontWeight:'500'}}>Take Photo</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                            style={styles.photoOption} 
                            onPress={()=>{
                                setModalVisible(false);
                                setTimeout(()=>{ pickImage()}, 800);
                            }}
                        >
                            <Icon
                                style={{margin:10}}
                                name='image'
                                type='ionicon'
                                color={Constant.PRIMARY_COLOR}
                                size={25}
                            />
                            <Text  style={{fontSize:13, fontWeight:'500'}}>Choose Image</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            
            <Modal
            // backdropOpacity={0.9}
            style={{margin:0, flex:1, justifyContent:'flex-end'}}
            isVisible={addFurnitureModal}
            onBackdropPress={()=>{setFurnitureModal(false); setQtyTemp(1); setActiveBorder4(Constant.GREY_BACKGROUND)}}
            onBackButtonPress={()=>{setFurnitureModal(false); setQtyTemp(1); setActiveBorder4(Constant.GREY_BACKGROUND)}}
            >
                <KeyboardAvoidingView behavior= {Platform.OS ==='ios'? 'position': null} >
                <View style={styles.bottomModal}>
                    <Text style={styles.labelMain}> Add Furniture</Text>

                    <Text style={[styles.label, {alignSelf:"flex-start"}]}>Name</Text>
                        <View style={{
                            borderWidth:1, 
                            borderColor: activeBorder4, 
                            flexDirection:'row',
                            backgroundColor: Constant.GREY_BACKGROUND,
                            borderRadius:10,
                            marginVertical:7,
                            }}> 
                            <TextInput
                                clearButtonMode='while-editing'
                                placeholder= '(Air Condition, Bed, Fridge)'
                                placeholderTextColor={Constant.GREY_PLACEHOLDER}
                                returnKeyType="done"
                                autoCapitalize="sentences"
                                style={{flex:1, padding: Platform.OS === 'ios'? 13 : 7}}

                                onChangeText={(val) => {
                                    setFurnitureTemp(val)
                                }}

                                onFocus={(onFocus)=>{
                                    if (onFocus){
                                        setActiveBorder4(Constant.PRIMARY_COLOR)
                                    } 
                                }}
                        

                                onEndEditing={()=>{
                                    setActiveBorder4(Constant.GREY_BACKGROUND)
                                }}
                            />
                        </View>
                    
                    <Text style={[styles.label, {alignSelf:"flex-start"}]}>Quantity</Text>
                    <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center', marginBottom:20}}>
                        <TouchableOpacity onPress={()=>{qtyTemp >1 && setQtyTemp(qtyTemp-1)}}>           
                        <Icon
                            reverse
                            name='minus'
                            type='material-community'
                            color='lightgrey'
                            size={20}
                        />
                        </TouchableOpacity>  
                        <Text style={{fontSize:20, marginHorizontal:10}}> {qtyTemp} </Text>
                        <TouchableOpacity onPress={()=>{ setQtyTemp(qtyTemp+1)}}>
                        <Icon
                            reverse
                            name='plus'
                            type='material-community'
                            color='lightgrey'
                            size={20}
                        />
                        </TouchableOpacity> 
                    </View>
                    <MainButton title='Add' onPress={()=>{ addFurniture()}}/>
                </View> 
                </KeyboardAvoidingView>
            </Modal>
            
            <Modal
            backgroundColor='black'
            // backdropOpacity={0.9}
            style={{margin:0}}
            isVisible={openPhotoModal}
            onBackdropPress={()=>{setPhotoModal(false)}}
            onBackButtonPress={()=>{setPhotoModal(false)}}
            >
                <View style={{  alignSelf:'center',height:Constant.DEVICE_HEIGHT, width:Constant.DEVICE_WIDTH,  justifyContent:'center'}}>
                    <Image
                        style={styles.showPhoto} 
                        source={{uri : chosenImage}}
                        resizeMode='contain'
                    />

                    <TouchableOpacity style={styles.backButton} onPress={()=>{setPhotoModal(false)}}>
                        <Icon              
                        name='cross'
                        type='entypo'
                        color='#3c3c3c'
                        size={20}
                        />
                    </TouchableOpacity>  

                    <TouchableOpacity style={styles.removeButton} onPress={()=>{removeImage()}}>
                        <Icon
                            // reverse
                            name='trash'
                            type='ionicon'
                            color='white'
                            size={20}
                        />
                    </TouchableOpacity>
                </View>
            </Modal>

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="datetime"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                minimumDate={new Date()}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen :{
        flex:1,
        paddingTop: Platform.OS === 'android' ? 30 : 0,
        backgroundColor:'white'
    },
    mainArea:{
        paddingTop:10,
    },
    bigText:{
        color:'#3c3c3c',
        fontSize: 20,
        fontWeight:'bold',
        paddingTop:15,
    },
    textField:{
        flexDirection:'row',
        backgroundColor: Constant.GREY_BACKGROUND,
        borderRadius:10,
        marginVertical:7,
        flex:1,
        alignItems:'center'
    },
    label:{
        fontSize:Constant.SECONDARY_FONT_SIZE, 
       // fontWeight:'500',
        color:'#3c3c3c',
        paddingTop:12,
    },
    labelMain:{
        fontSize:Constant.MAIN_FONT_SIZE, 
       fontWeight:'bold',
        color:'black',
        paddingTop:20,
    },
    addPhotos:{
        height:90,
        width: 90,
        borderRadius:10,
        backgroundColor:Constant.GREY_BACKGROUND,
        justifyContent:'center',
        alignItems:'center',
        marginVertical:10,
        marginHorizontal:5,
        overflow: 'hidden'
    },
    cameraModal:{
        paddingVertical:15, 
        paddingHorizontal:15,
        backgroundColor:'white', 
        alignSelf:'center',
        borderRadius:10,
    },
    photoOption:{
        padding:10,
        backgroundColor:Constant.GREY_BACKGROUND,
        marginTop:30,
        marginBottom:10,
        marginHorizontal:5,
        borderRadius:5,
        width:Constant.DEVICE_WIDTH*0.34,
        alignItems:'center'
    },
    showPhoto:{
        width: Constant.DEVICE_WIDTH,
        flex:1
    },
    scheduleContainer:{
        flexDirection:'row',
        marginTop:10,
        marginBottom:12,
        flex:1,
    },
    schedule:{
        flexDirection:'row',
        paddingHorizontal:20,
        paddingVertical:8,
        borderRadius:50,
        marginRight:10,
        alignItems:'center'
    },
    bottomAction : {
        borderTopWidth:1, 
        borderTopColor:'lightgrey' ,
        paddingVertical:5, 
        width:Constant.DEVICE_WIDTH, 
        alignItems:'center'
    },
    backButton:{
        width:40,
        height:40,
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
    removeButton:{
        width:40,
        height:40,
        justifyContent:'center',
        alignItems:'center',
        elevation: 2,
        backgroundColor:'#EA4949',
        borderRadius:50,
        position:'absolute',
        top:40, 
        right:20, 
        shadowOpacity:0.2, 
        shadowRadius:2, 
        shadowOffset:{width:0, height:1}
    },
    features: {
        flexDirection:'row',
        marginTop: 12,
    },
    bottomModal: {
        justifyContent:'center',
        backgroundColor:'white', 
        width:Constant.DEVICE_WIDTH, 
        borderTopLeftRadius: 15, 
        borderTopRightRadius: 15, 
        paddingBottom:34,
        alignItems:'center',
        paddingHorizontal:20,
        paddingVertical:15
    }
});

export default A_Edit;