import React, { useEffect , useState} from 'react';
import {FlatList, View, Text,TextInput, StyleSheet, KeyboardAvoidingView, Image, Alert, TouchableOpacity, Platform } from 'react-native';
import Constant from '../../../components/Constants';
import * as Location from 'expo-location';
import { Icon } from 'react-native-elements';
import MapView, { Marker } from 'react-native-maps';
import Modal from 'react-native-modal';

const GetLocation = props=>{
      const [current, setCurrent] = useState(null);
      const [searchPoint, setSearchPoint] = useState(null)
      const [locLists, setLocLists] = useState(null);
      const [search, setSearch] =useState('');
      const [isModalVisible, setModalVisible] = useState(false)

      useEffect(() => {
          (async () => {
            let locationSuccess = false;
            let locationRaw;
            try{
                let { status } = await Location.requestForegroundPermissionsAsync();
            
                if (status !== 'granted') {
                    Alert.alert('Please enable location on your setting to use this app!');
                    return;
                } 
    
                while( !locationSuccess ) {
                    try {
                            locationRaw = await Location.getCurrentPositionAsync({});
                            locationSuccess = true;       
                        
                    } catch (e) {
                        console.log(e)
                    }
                }
                if (locationSuccess == true){
                    let location = {
                        latitude: locationRaw.coords.latitude,
                        longitude : locationRaw.coords.longitude
                    }
                    setCurrent(location)
                    locationLists(location);
                }
            } catch (e) {
                console.log(e)
            }
            
            
          })();
      }, []);

      const locationLists = async (location1)=>{
        let locationLists =
        [
          location1,
          {
            latitude: location1.latitude +0.0005,
            longitude : location1.longitude
          },
          {
            latitude: location1.latitude ,
            longitude : location1.longitude +0.0005
          },
          {
            latitude: location1.latitude -0.0005,
            longitude : location1.longitude
          },
          {
            latitude: location1.latitude ,
            longitude : location1.longitude -0.0005
          }
        ]

        let locStringLists =[]
        let reverseGeocodeAsync;
        let name;
        let street;
        let postcode;
        let city;
        let obj;

        for (let x of locationLists){
          reverseGeocodeAsync = await Location.reverseGeocodeAsync(x)
          name = reverseGeocodeAsync[0].name
          street = reverseGeocodeAsync[0].street
          postcode = reverseGeocodeAsync[0].postalCode
          city = reverseGeocodeAsync[0].city

          if (name != null && street != null && postcode != null){
            var randId = Math.random();
            obj = { 
              id: randId.toString(),
              header: name +', '+street,
              postcode : postcode+', '+city,
              latitude : x.latitude,
              longitude : x.longitude
            }

            locStringLists=[...locStringLists, obj]
          }
        }

        setLocLists(locStringLists);
      }

      const searchLoc = async ()=>{
        let geocodeAsync = await Location.geocodeAsync(search);
        //console.log(geocodeAsync)
        if (geocodeAsync.length != 0){
          let location = {
            latitude: geocodeAsync[0].latitude,
            longitude : geocodeAsync[0].longitude
          }
  
          setSearchPoint(location);
          locationLists(location);
        } else{
          setModalVisible(true)
        }
      }

      const renderList =  (item)=>{
        return(
          <TouchableOpacity style={styles.listViews} onPress={() => {
            // Pass and merge params back to home screen
            props.navigation.navigate({
              name: 'Create',
              params: { post: item.item },
              merge: true,
            });
          }}>
              <Text style={{fontSize:Constant.SECONDARY_FONT_SIZE}}>{item.item.header}</Text>
              <Text style={{fontSize:Constant.TERTIARY_FONT_SIZE, color: 'grey'}}>{item.item.postcode}</Text>
          </TouchableOpacity>
        )
      }

      const mapRegion =()=>{
        let region;
        if( searchPoint ){
          region = {
            latitude: searchPoint.latitude,
            longitude: searchPoint.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }
        } else{
          region = {
            latitude: current.latitude,
            longitude: current.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }
        }
        return region;
      }

    return(
        <View style={styles.screen}>
            <View style={styles.mainArea}>        
                {current != null?
                <MapView 
                style={styles.map} 
                region={mapRegion()}>
                  
                  <Marker
                        coordinate={current}
                        image={require("../../../assets/images/map_pin.png")}
                       // onPress={()=>{props.navigation.navigate('reserve')}}
                  />
                  {searchPoint?
                  <Marker
                        coordinate={searchPoint}
                        image={require("../../../assets/images/search_pin.png")}
                       // onPress={()=>{props.navigation.navigate('reserve')}}
                  />
                  :null}
                </MapView> 
                : 
                <Image
                    style={styles.map} 
                    source={require("../../../assets/images/map_placeholder.png")}
                    resizeMode='cover'
                />
                }

              < TouchableOpacity style={styles.backButton} onPress={()=>{props.navigation.goBack()}}>
                <Icon              
                name='arrow-back'
                type='material'
                color='#3c3c3c'
                size={20}
                />
              </TouchableOpacity>

              <KeyboardAvoidingView behavior= {Platform.OS==='ios'?'position': null}>
                <View style={styles.searchView}>
                  {current &&
                  <View style={styles.textField}>
                    <Icon
                      // style={{alignSelf:'flex-start'}}
                      name='search'
                      type='material'
                      color='grey'
                      size={25}
                      />

                    
                    <TextInput
                        onSubmitEditing={(val)=>{
                          if(search != ''){
                            searchLoc();
                          }
                        }}
                        clearButtonMode='while-editing'
                        //value={locationString? locationString : null}
                        placeholder= 'Search Postal Code'
                        placeholderTextColor={Constant.GREY_PLACEHOLDER}
                        returnKeyType="search"
                        autoCapitalize="none"
                        style={{flex:1, padding: Platform.OS === 'ios'? 13 : 7}}
                        onChangeText={(val) => {     
                            setSearch(val)
                        }}
                    />
                  </View> } 

                  <FlatList 
                    data={locLists}
                    renderItem={(item)=>{
                        return renderList(item)
                    }}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                  /> 
                </View>  
              </KeyboardAvoidingView>
            </View>

            <Modal
            isVisible={isModalVisible}
            onBackdropPress={()=>{setModalVisible(false)}}
            onBackButtonPress={()=>{setModalVisible(false)}}
            >
              <View style={styles.modal}>
                <Image
                  style={styles.loss_ill} 
                  source={require("../../../assets/images/lost_ill.png")}
                  resizeMode='contain'
                />
                 
                 <Text style={{fontWeight:'bold', fontSize:Constant.MAIN_FONT_SIZE, textAlign:'center'}}> 
                   {'Oops!\nLocation not found'}
                 </Text>
                 <Text style={{ fontSize:Constant.TERTIARY_FONT_SIZE, color:Constant.TERTIARY_GREY_COLOR, textAlign:'center', marginVertical:10}}> 
                   Try searching by valid postal code
                 </Text>
              </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    screen :{
        flex:1,
        backgroundColor:'white'
    },
    mainArea:{
        flex:1, 
        width:'100%', 
    },
    map:{
      backgroundColor:'white',
      width:Constant.DEVICE_WIDTH,
      flex:1,
    },
    textField:{
      paddingHorizontal:15,
      backgroundColor: Constant.GREY_BACKGROUND,
      borderRadius:10,
      marginTop:15,
      marginBottom:5,
      flexDirection:'row',
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
    listViews:{ 
      backgroundColor:'white', 
      borderBottomWidth:1,  
      borderColor:Constant.GREY_PLACEHOLDER,
      paddingBottom:10,
      paddingTop: Platform.OS === 'ios' ? 25: 20,
    },
    loss_ill:{
      width:Constant.DEVICE_WIDTH*0.45,
      height: Constant.DEVICE_WIDTH*0.45,
      margin:5,
    },
    modal:{
      backgroundColor:'white', 
      alignSelf:'center', 
      justifyContent:'center', 
      alignItems:'center', 
      padding:15,
      borderRadius:15,
      width:Constant.DEVICE_WIDTH*0.6
    },
    searchView: {
      backgroundColor:'white',
      paddingHorizontal: Constant.PADDING_HORIZONTAL, 
      paddingBottom: Platform.OS === 'ios'? 20 : 0, 
      maxHeight:Constant.DEVICE_HEIGHT*0.45
    }
});

export default GetLocation;