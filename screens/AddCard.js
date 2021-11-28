import React, { useEffect, useState } from 'react';
import { ActivityIndicator,View, Text, StyleSheet, Image , TextInput, Alert} from 'react-native';
import Header from '../components/Header';
import { NavigationActions, StackActions } from 'react-navigation';
import Constant from '../components/Constants';
import {Icon} from 'react-native-elements';
import MainButton from '../components/button/MainButton';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddCard = props=>{
  const [user_id, setUserId] = useState()
  const [name, setName] = useState('')
  const [card, setCard] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvc, setCVC] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect( () => {
    fetchUser()
  },[]);


  const fetchUser = async()=>{
    try {
        const userid = await AsyncStorage.getItem('USER_ID')
        if(userid !== null) {
          setUserId(userid)
        }
      } catch(e) {
        console.log(e)
      }
  }

  const _handlingCardNumber=(number) =>{

    setCard(number.replace(/[^0-9]/g, '').replace(/(\d{4})/g, '$1 ').trim())
  }

  const resetStack = (screen) => {
    props
      .navigation
      .dispatch(StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: screen,
          }),
        ],
      }))
   }

  const _handlingCardExpiry = (text) =>{
    var typed = text.replace(/[^0-9/]/g, '')
    if (typed.indexOf('.') >= 0 || typed.length > 5) {
        // Since the keyboard will have a decimal and we don't want
        // to let the user use decimals, just exit if they add a decimal
        // Also, we only want 'MM/YY' so if they try to add more than
        // 5 characters, we want to exit as well
        return;
    }

    if (typed.length === 2 && expiry.length === 1) {
        // This is where the user has typed 2 numbers so far
        // We can manually add a slash onto the end
        // We check to make sure the current value was only 1 character
        // long so that if they are backspacing, we don't add on the slash again
        typed += '/'
        
    }

    // Update the state, which in turns updates the value in the text field
    setExpiry(typed)

    }

    return(
        <View style={styles.screen}>
        <View style={styles.mainArea}>
            <Header title='Add Card' onBack={()=>{props.navigation.goBack()}}/>
            <View style={styles.screen}>
            
              <View style={{width: Constant.DEVICE_WIDTH*0.9, borderBottomWidth:1, borderBottomColor:'lightgrey',  marginBottom:5, marginTop:20}}>
                <Text style={{color: 'grey', marginVertical:8}}>Cardholder's Name</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setName}
  
                />
              </View>

              <View style={{width: Constant.DEVICE_WIDTH*0.9, borderBottomWidth:1, borderBottomColor:'lightgrey',  marginBottom:5}}>
                <Text style={{color: 'grey', marginVertical:8}}>Card Number</Text>
                <View style={{flexDirection:'row'}}>
                <TextInput
                  value={card}
                  keyboardType='number-pad'
                  style={[styles.input, {flex:1}]}
                  onChangeText={(val)=>{_handlingCardNumber(val)}}
                  maxLength={19}
                  onEndEditing={()=>{}}
                />
                <Icon
                  // reverse
                  name='card'
                  type='ionicon'
                  color= {Constant.PRIMARY_COLOR}
                  size={30}
                    /> 
                </View>
              </View>

              <View style={{flexDirection:'row',  width:Constant.DEVICE_WIDTH*0.9,  justifyContent:'space-between'}}> 
                <View style={{width: Constant.DEVICE_WIDTH*0.4, borderBottomWidth:1, borderBottomColor:'lightgrey',  marginBottom:5}}>
                  <Text style={{color: 'grey', marginVertical:8}}>Expiry Date</Text>
                  <TextInput
                  value={expiry}
                  keyboardType='number-pad'
                    style={styles.input}
                    onChangeText={(val)=>{_handlingCardExpiry(val)}}
                    placeholder='MM/YY'
                    maxLength={5}
                  />
                </View>  

                <View style={{width: Constant.DEVICE_WIDTH*0.4, borderBottomWidth:1, borderBottomColor:'lightgrey',  marginBottom:5}}>
                  <Text style={{color: 'grey', marginVertical:8}}>Security Code</Text>
                  <TextInput
                    secureTextEntry={true}
                    returnKeyType="done"
                    keyboardType='number-pad'
                    style={styles.input}
                    onChangeText={setCVC}
                    placeholder='CVC'
                    maxLength={4}
                    
                  />
                </View> 
              </View>

              <View style={{alignItems:'center', marginTop:50}}>
              <MainButton  title={'Add card'} onPress={()=>{Alert.alert('Under Development')}}/>
              </View>

            </View>
            <Modal
             isVisible={loading}
             animationType='fade'
             onBackdropPress={()=>{}}
             onBackButtonPress={()=>{}}
             >
               <View style={{justifyContent:'center', alignItems:'center'}}>
               <ActivityIndicator size="small" color="white"/>
               <Text style={{color:'white', marginVertical:10}}>Processing Payment...</Text>
               </View>
             </Modal>

        </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen :{
        flex:1,
        alignItems:'center',
        backgroundColor:'white'
       // justifyContent:'center',
    },
    mainArea:{
        // justifyContent:'center',
        alignItems:'center',
        flex:1, 
        width:'100%', 
        paddingTop:94
    },
    input: {
      // backgroundColor:'yellow',
      fontSize:16,
      paddingVertical:5
    },
});

export default AddCard;