import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image,TextInput } from 'react-native';
import {Icon} from 'react-native-elements';
import Constant from './Constants';
import { withNavigation } from 'react-navigation';


const Header = props =>{
    return (
        <View style={{position:'absolute', top:0}}>
            <View style={{backgroundColor:'white', width:Constant.DEVICE_WIDTH, height:44}}>
            </View>

            <View style={[styles.header,{borderBottomWidth: props.header? 1 : 0}]}>
                {props.onBack?
                <TouchableOpacity onPress={()=>{props.onBack()}} style={styles.backButton}>
                    <Icon
                    // reverse
                    name='arrow-back'
                    type='material'
                    color='#3c3c3c'
                    size={30}
                    />
                </TouchableOpacity>
                :null}
                {props.title?
                <Text style={{fontSize:17, fontWeight:'600'}}>
                    {props.title}
                </Text>
                :null}

                {props.logo?
                <Image
                style={styles.logo} 
                source={require("../assets/images/need_blue.png")}
                resizeMode='contain'
                />
                :null}

                {props.icon?
                <TouchableOpacity onPress={()=>{props.onPress()}} style={styles.button}>
                    <Icon
                    // reverse
                    name={props.icon.name}
                    type={props.icon.type}
                    color='#3c3c3c'
                    size={28}
                    />
                </TouchableOpacity>
                :null}

                {props.search?
                <View style={{ flexDirection:'row', width: Constant.DEVICE_WIDTH, justifyContent:'space-between', paddingHorizontal:15}}>
                    <View style={styles.search}>
                        <Icon
                        // reverse
                        name='search-outline'
                        type='ionicon'
                        color={Constant.GREY_PLACEHOLDER}
                        size={20}
                        />
                        <TextInput
                            clearButtonMode='while-editing'
                            placeholder= 'Search'
                            placeholderTextColor={Constant.GREY_PLACEHOLDER}
                            returnKeyType="done"
                            autoCapitalize="none"
                            style={{ flex:1, padding: Platform.OS === 'ios'? 8 : 3}}

                            onChangeText={(val) => {
                            }}

                            onFocus={(onFocus)=>{
                                
                            }}

                            onEndEditing={()=>{
                            }}
                        />
                    </View>

                    <View style={styles.filter}>
                        <Icon
                        // reverse
                        name='filter-variant'
                        type='material-community'
                        color='black'
                        size={20}
                        />
                        <Text> Filters</Text>
                    </View>

                </View>

                :null}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor:'white', 
        //backgroundColor:'green', 
        width:Constant.DEVICE_WIDTH, 
        height:50, 
        alignItems:'center',
        justifyContent:'center', 
        flexDirection:'row',
        // borderBottomWidth:1,
         borderBottomColor:'lightgrey',
    },
    backButton:{
        position:'absolute', 
        left:15,
        // backgroundColor:'yellow',
        padding:5,
    },
    logo:{
        width: Constant.DEVICE_WIDTH*0.2,
       // backgroundColor:'yellow',
        height: 20,
    },
    button:{
        position:'absolute', 
        right:15,
        // backgroundColor:'yellow',
        padding:5,
    },
    search:{
        paddingHorizontal:10,
        marginRight:15,
        backgroundColor: Constant.GREY_BACKGROUND,
        borderRadius:5,
        flexDirection: 'row',
        alignItems:'center',
        flex:1,
        
    },
    filter:{
        borderColor:'black',
        borderWidth:1,
        borderRadius:5,
        flexDirection: 'row',
        alignItems:'center',
        paddingHorizontal: Platform.OS === 'ios'? 10 : 5
        
    }
});

export default withNavigation(Header);