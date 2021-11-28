import React, { useEffect , useRef} from 'react';
import {Animated, View, Text, StyleSheet, Image, Alert , TouchableOpacity} from 'react-native';
import Constant from '../components/Constants';
import Header from '../components/Header';
import { Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';

const SavedCard = props=>{

    return(
       <View style={styles.screen}> 
            <View style={styles.mainArea}>

                {/* ======== ADD CARD BUTTON ======== */}
                <TouchableOpacity style={styles.addCard} onPress={()=>{
                    props.navigation.navigate('addCard')
                }}>
                    <View style={styles.addCircle}>
                        <Icon              
                            name='plus'
                            type='material-community'
                            color={Constant.PRIMARY_COLOR}
                            size={30}
                        />
                    </View>
                </TouchableOpacity>

                <Text style={styles.label}>Your Cards</Text>


                {/* ====== RENDER CARD ITEM ====== */}
                <TouchableOpacity style={styles.card} >
                    <LinearGradient
                        // Background Linear Gradient
                        colors={['#30B7C3', '#311F71']}
                        style={styles.background}
                        start= {{ x: 0, y: 1 }}
                        end= {{ x: 1, y: 0 }}
                    />

                    <Image
                        style={styles.logo}
                        source={require('../assets/images/mastercard.png')}
                        resizeMode='contain'
                    />

                    <View style={{flex:1, justifyContent:'center'}}>
                        <Text style={styles.cardNumber}>4218     0808     0894     0291 </Text>
                    </View>

                    <View style={{flexDirection:'row', justifyContent:'space-between', width:'100%',  paddingHorizontal:20}}>
                        <Text style={styles.cardText}>John Doe</Text>
                        <Text style={styles.cardText}>04/23</Text>
                    </View>
                </TouchableOpacity>

            </View>
            <Header onBack={()=>{props.navigation.goBack()}} header={true} title='Saved Card'/>
        </View>
         
    );
}

const styles = StyleSheet.create({
    screen :{
        flex:1,
        backgroundColor:'white'
    },
    mainArea:{
        // justifyContent:'center',
        alignItems:'center',
        flex:1, 
        width:'100%', 
        paddingTop:94
    },
    addCard:{
        width:Constant.DEVICE_WIDTH*0.8,
        height:Constant.DEVICE_WIDTH*0.45,
        backgroundColor: '#EBEBEB',
        borderRadius:15,
        marginVertical:25,
        justifyContent:'center',
        alignItems:'center'
    },
    card:{
        width:Constant.DEVICE_WIDTH*0.8,
        height:Constant.DEVICE_WIDTH*0.45,
        backgroundColor: '#EBEBEB',
        borderRadius:15,
        marginVertical:25,
        justifyContent:'center',
        alignItems:'center',
    },
    addCircle:{
        width:Constant.DEVICE_WIDTH*0.2,
        height:Constant.DEVICE_WIDTH*0.2,
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 100,
        borderColor:Constant.PRIMARY_COLOR,
        borderWidth:2.2,
        borderStyle: 'dashed'
    },
    label :{
        alignSelf:'flex-start',
        paddingHorizontal:20,
        fontSize:16,
        fontWeight:'bold'
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height:'100%',
        borderRadius:15
    },
    logo:{
        height:35,
        width:35,
        alignSelf:'flex-end',
        marginTop:20,
        marginRight:20
    },
    cardNumber:{
        color:'white',
        fontSize:16,
        textAlign:'center'

    },
    cardText:{
        color:'white',
        marginBottom:20,
        fontSize:15,
    }

});

export default SavedCard;