import React, { useState , useRef, useEffect} from 'react';
import {Keyboard, Animated, ImageBackground, SafeAreaView, View, Text, StyleSheet, TextInput,TouchableOpacity,Alert, FlatList, KeyboardAvoidingView, Platform, Image } from 'react-native';
import Constant from '../../../components/Constants';
import Header from '../../../components/Header';
import MockMessage from "./MockMessages.json";
import { moderateScale, verticalScale } from 'react-native-size-matters';
import {Icon} from 'react-native-elements';
import TextField from '../../../components/TextField';
import Modal from 'react-native-modal';
import * as ImagePicker from 'expo-image-picker';

const ChatRoom = props=>{
    // user id placeholder
    const user_id = 0
    var current_datetime = require('moment')().format('HH:mm');

    const name = props.route.params.name
    const [messageData, setMessageData] = useState([])
    const [message, setMessage] = useState('')
    const [openAttach, setOpenAttach] = useState(false)
    const [previewImage, setPreview] = useState(false)
    const [previewImageUri, setPreviewUri] = useState('')

    const inputEl2 = useRef(null);

    const [keyboardOffset, setKeyboardOffset] = useState(0);
    const onKeyboardShow = event => setKeyboardOffset(event.endCoordinates.height);
    const onKeyboardHide = () => setKeyboardOffset(0);
    const keyboardDidShowListener = useRef();
    const keyboardDidHideListener = useRef();

    const [imageData, setImage] = useState(null)

    const [origin, setOrigin] = useState('')


    useEffect(() => {
        keyboardDidShowListener.current = Keyboard.addListener('keyboardWillShow', onKeyboardShow);
        keyboardDidHideListener.current = Keyboard.addListener('keyboardWillHide', onKeyboardHide);

        return () => {
            keyboardDidShowListener.current.remove();
            keyboardDidHideListener.current.remove();
        };
    }, []);

    useEffect(() => {
        if (props.route.params?.origin) {
            console.log(props.route.params.origin)
            setOrigin(props.route.params.origin)

            if (props.route.params.origin == 'messageTab'){
                setMessageData(MockMessage.reverse())
            } else if (props.route.params.origin == 'enquire'){

                var randId = Math.random();
                setMessageData([{
                    "id" : randId.toString(),
                    "data" : props.route.params.data,
                    "type" : "preview",
                    "uri" : require("../../../assets/images/preview1.jpg"),
                    "created_at" : current_datetime,
                    "status" : "0",
                    "user" :{
                        "id": "0",
                        "first_name" : "Steviani",
                        "last_name" : "Angeline Tandika Septiani",
                        "profile_image" : null
                    }}
                    ,...messageData])
            } else if (props.route.params.origin == 'support'){

                setMessageData([{
                    "id" : 'qwsqw',
                    "type" : "text",
                    "message" : 'Hi, how can we help you?',
                    "created_at" : current_datetime,
                    "status" : "0",
                    "user" :{
                        "id": "-1",
                        "first_name" : "Steviani",
                        "last_name" : "Angeline Tandika Septiani",
                        "profile_image" : null
                    }}
                    ,...messageData])
            }
        }
        
    }, [props.route.params]);

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
                setImage(result.uri);
                console.log(result)
                setMessageData([{
                    "id" : randId.toString(),
                    "type" : "image",
                    "uri" : result.uri,
                    "created_at" : current_datetime,
                    "status" : "0",
                    "user" :{
                        "id": "0",
                        "first_name" : "Steviani",
                        "last_name" : "Angeline Tandika Septiani",
                        "profile_image" : null
                    }}
                    ,...messageData])
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
                // setImage([{id:randId.toString(), uri:result.uri},...imageData]);
                setImage(result.uri);
                setMessageData([{
                    "id" : randId.toString(),
                    "type" : "image",
                    "uri" : result.uri,
                    "created_at" : current_datetime,
                    "status" : "0",
                    "user" :{
                        "id": "0",
                        "first_name" : "Steviani",
                        "last_name" : "Angeline Tandika Septiani",
                        "profile_image" : null
                    }}
                    ,...messageData])
            }
        }
    };

    const renderItem=(item)=>{
        // console.log(item)

        // var months = ['January','February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'Decemeber'];
        // var dateString = item.time;
        // var today = new Date();
        // var date = new Date((item.time).substring(0,10));
        // date.setHours(0);
        // var diff = parseInt((today- date) / (1000 * 60 * 60 * 24), 10);
        var color = null;
        var align = null;
        var textColor = null;
        var self = item.user.id == user_id;
        var messageTime = null;
  
         if (!self){
          color = 'white';
          align = 'flex-start';
          textColor = 'black';  
        } else{
          color = Constant.PRIMARY_COLOR;
          align = 'flex-end';
          textColor = 'white';
        }

        var content;
        switch (item.type) {
            case 'text':
                content = <Text style={{fontSize:15, fontWeight:'400', color:textColor}}>{item.message}</Text>         
                break;
            
            case 'image':
                content =   <TouchableOpacity onPress={()=>{setPreview(true); setPreviewUri(item.uri)}}> 
                                <Image
                                    style={styles.imageData} 
                                    source={{uri:item.uri}}
                                    resizeMode='cover'
                                /> 
                            </TouchableOpacity>         
                break;

            case 'preview':
                content =   <TouchableOpacity onPress={()=>{
                                props.navigation.navigate({
                                    name: 'ShowProp',
                                    params: { data: item.data }
                                })
                            }}> 
                                <Image
                                    style={{minWidth:Constant.DEVICE_WIDTH*0.3, maxWidth:'100%', height:Constant.DEVICE_WIDTH*0.3, borderRadius:10, marginBottom:5}} 
                                    source={item.uri}
                                    resizeMode='cover'
                                /> 
                                <Text style={{fontSize:16, fontWeight:'bold', color:textColor, paddingHorizontal:5}}>{item.data.title} </Text>
                                <Text style={{fontSize:15, fontWeight:'400', color:textColor, paddingHorizontal:5}}>{item.data.address}</Text>
                                <Text style={{fontSize:15, fontWeight:'400', color:textColor, padding:5, marginTop:5}}>Hi, I'm interested in this property!</Text>

                            </TouchableOpacity>         
                break;
        
            default:
                break;
        }
  
        // if (diff == 0){
        //   messageTime = 'Today';
        // } else if (diff == 1){
        //   messageTime = 'Yesterday';
        // } else{
        //   messageTime = months[date.getMonth()] +' '+date.getDate();
        // }
  
        return(
          <View>
          {/* {this.state.chatDate.includes(dateString)? */}
          {/* <View style={{backgroundColor:'lightgrey', padding:8,borderRadius:20,alignSelf:'center', marginBottom:15}}>
            <Text style={{fontSize:13, color:'grey'}}>Today</Text>
          </View>  */}
          {/* : null} */}
  
          <View style={{alignSelf: align, alignItems:align, maxWidth:Constant.DEVICE_WIDTH*0.7,marginVertical:verticalScale(3),marginHorizontal:moderateScale(20)}}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
            {/* {this.state.errorMessages.includes(item.id) ?
            <Icon
              containerStyle={{marginHorizontal:10}}
              //reverse
              //raised
              name='error'
              type='material'
              color='red'
              size={25}
            /> : null} */}
            <View style={{backgroundColor:color, paddingHorizontal: item.type == 'text' ? 10 : 5, paddingVertical: item.type == 'text' ? 10 : 5,borderRadius:15, borderBottomRightRadius:self?0:15, borderTopLeftRadius: self? 15:0}}>
               {content}
            </View>
            </View>
              <View style={{flexDirection:'row',marginTop:5, marginHorizontal:5,alignItems:'center'}}>
                {self ?
                <Icon
                  containerStyle={{marginHorizontal:5}}
                  //reverse
                  //raised
                  name='done-all'
                  type='material'
                // color='#0076FE'
                color={item.status == '0'? 'grey': '#1CBBFF' }
                  size={18}
                />
                  : null} 
                {/* <Text style={{fontSize:13, color:'grey'}}>{ (item.time).substring(11,16)}</Text> */}
                <Text style={{fontSize:13, color:'grey'}}>{item.created_at}</Text>
              </View>
          </View>
          </View>
          );
      }

      const sendMessage=()=>{
       // this.textInput.clear();
       inputEl2.current.clear();
        // setTimeout(() => { inputEl2.clear()}, 100);
  
        var dataTemp = messageData;
        var now = new Date();
        var hours = now.getHours().toString().length ==1?  '0'+now.getHours().toString():now.getHours();
        var minutes = now.getMinutes().toString().length ==1?  '0'+now.getMinutes().toString():now.getMinutes();
  
        var formatTime = '01234567890'+hours +':'+ minutes;
        var randId = Math.random();
        // dataTemp.unshift({
        //   'id': randId.toString(),
        //   'message': message,
        //   'time': formatTime,
        //   'sender_id': 1,
        //   'status' : '0'
  
        // });
    //  alert(JSON.stringify(this.emojiUnicode(this.state.message)))
  
        // NetInfo.fetch().then(state => {
        //     if (state.isConnected) {
        //     //  this.addChat();
        //     //  this.sendNotif();
              
         setMessageData([{
            "id" : randId.toString(),
            "type" : "text",
            "message" : message,
            "created_at" : current_datetime,
            "status" : "0",
            "user" :{
                "id": "0",
                "first_name" : "Steviani",
                "last_name" : "Angeline Tandika Septiani",
                "profile_image" : null
            }}
            ,...messageData])

              
            // } else {
            //     var errList = this.state.errorMessages;
            //     errList.unshift(randId);
            //     //alert(constant.NOINTERNET)
            //     this.setState({
            //       data: dataTemp,
            //       errorMessages:errList
            //     })
            // }
        // });
      }

    return(
        <SafeAreaView style={styles.screen}>
            
            <ImageBackground source={require("../../../assets/images/chat_background.png")} resizeMode='cover' style={[styles.mainArea,{paddingBottom: keyboardOffset==0 && Platform.OS=='ios'? 0: keyboardOffset-34}]}>     
                {/* <Image
                    style={{width:Constant.DEVICE_WIDTH,height:Constant.DEVICE_HEIGHT, position:'absolute'}}
                    source={require("../../../assets/images/chat_background.png")}
                    resizeMode='cover'
                /> */}
                <FlatList
                    
                    style={styles.chatLists}
                    data={messageData}
                    renderItem={({ item }) => renderItem(item)}
                    inverted={-1}
                    keyExtractor={item => item.id.toString()}
                />

                <View style={styles.BottomContainer}>
                    <View style={styles.textInputContainer}> 
                    <View style={styles.iconContainer}>
                        <Modal
                        animationIn={'slideInLeft'}
                        animationOut={'slideOutLeft'}
                        style={{margin:0}}
                        backdropOpacity={0}
                        isVisible={openAttach}
                        onBackdropPress={()=>{setOpenAttach(false)}}
                        onBackButtonPress={()=>{setOpenAttach(false)}}
                        >
                            <View style={{position:'absolute',bottom: Platform.OS === 'ios'? 100: 65, left:5 }}>
                                <TouchableOpacity 
                                onPress={()=>{setOpenAttach(false); setTimeout(()=>{ snapImage()}, 500) }}
                                style={styles.sendButton1}>
                                    <Icon
                                    reverse
                                    // raised
                                    name='camera'
                                    type='ionicon'
                                    color=  {Constant.PRIMARY_COLOR}
                                    size={20}
                                    />
                                </TouchableOpacity>
                                <View style={{height:20}}/>
                                <TouchableOpacity 
                                onPress={()=>{setOpenAttach(false); setTimeout(()=>{ pickImage()}, 500) }}
                                style={styles.sendButton1}>
                                    <Icon
                                    reverse
                                    // raised
                                    name='image'
                                    type='ionicon'
                                    color={Constant.PRIMARY_COLOR}
                                    size={20}
                                    />
                                </TouchableOpacity>
                            </View>
                        </Modal>
                        
                        
                        <TouchableOpacity 
                        onPress={()=>{setOpenAttach(!openAttach)}}
                        style={styles.sendButton1}>
                            <Icon
                            // reverse
                            // raised
                            name='plus'
                            type='material-community'
                            color= 'grey'
                            size={28}
                            />
                        </TouchableOpacity>
                        </View>
                        <TextInput
                            ref={inputEl2}
                            multiline={true}
                            placeholder="Write your message..."
                            style={styles.textInputStyle}
                            onChangeText={text => setMessage(text)}
                            // onFocus={(onFocus)=>{
                            //     if (onFocus){
                            //         setMultiline(true)
                            //     } 
                            // }}

                            // onEndEditing={()=>{
                            //     setMultiline(false)
                            // }}
                        />

                        <View style={styles.iconContainer}>
                            <TouchableOpacity 
                            onPress={()=>{message == ''?null: sendMessage()}}
                            style={styles.sendButton2}>
                                <Icon
                                //reverse
                                //raised
                                name='send'
                                type='font-awesome'
                                color='white'
                                size={15}
                                />
                            </TouchableOpacity>
                        </View>
                    </View> 
                </View>
                
            </ImageBackground>
           
            <Modal
            // backgroundColor="#2d2d2d"
            style={{margin:0}}
            coverScreen={true}
            backdropOpacity={1}
            isVisible={previewImage}
            onBackdropPress={()=>{setPreview(false)}}
            onBackButtonPress={()=>{setPreview(false)}}
            >
                <Image
                    style={styles.preview} 
                    source={{uri:previewImageUri}}
                    resizeMode='contain'
                />
                <TouchableOpacity style={styles.backButton} onPress={()=>{setPreview(false)}}>
                <Icon              
                name='cross'
                type='entypo'
                color='#3c3c3c'
                size={20}
                />
              </TouchableOpacity>  
            </Modal>

            <Header header={true} onBack={()=>{props.navigation.goBack()}} title={name}/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen :{
        flex:1,
        backgroundColor:'white'
    },
    mainArea:{
        alignItems:'center',
        backgroundColor:'#f0f0f0',
        flex:1, 
        width:'100%', 
        marginTop: Platform.OS==='ios'? 47:94,
    },
    chatLists: {
        width: Constant.DEVICE_WIDTH, 
    },
    BottomContainer : {
        alignItems:'center', 
        justifyContent:'center',
        width:Constant.DEVICE_WIDTH,  
        backgroundColor:'white', 
    },
    textInputContainer : {
        paddingVertical:10,
        flexDirection:'row',
        paddingHorizontal: Constant.PADDING_HORIZONTAL,
        justifyContent:'space-between',

    },
    textInputStyle : { 
        paddingTop: Platform.OS =='ios'?verticalScale(7):0,
        fontSize:15,
       // backgroundColor:'yellow',
        flex:1,
        maxHeight:120,
    },
    sendButton1: {
        alignItems:'flex-start',
        height:37,
        width:37, 
        justifyContent:'center',
        marginRight:5,
    },
    sendButton2: {
        backgroundColor: Constant.PRIMARY_COLOR, 
        height:37,
        width:37, 
        borderRadius:12, 
        justifyContent:'center',
        marginLeft:5,
    },
    iconContainer : { 
        justifyContent:'flex-end',
    },
    imageData:{
        width:Constant.DEVICE_WIDTH*0.5,
        height:Constant.DEVICE_WIDTH*0.5,
        borderRadius:10
    },
    preview:{
        width: '100%',
        height:'100%',
        padding:0,
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
});

export default ChatRoom;