import * as React from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationActions, StackActions } from 'react-navigation';

import {Icon} from 'react-native-elements';
import Message from '../Main/Message/Message';
import Constant from '../../components/Constants';
import ListProperty from '../Main/Create/ListProperty';
import GetLocation from '../Main/Create/GetLocation';
import ChatRoom from '../Main/Message/ChatRoom';
import ShowImages from '../Main/ShowImages';
import A_Listing from './A_Listing';
import A_ShowProp from './A_ShowProp';
import A_Account from './A_Account';
import A_TenantList from './A_TenantList';
import A_TenantInfo from './A_TenantInfo';
import MainScreen from '../MainScreens';
import A_Edit from './A_Edit';
import SavedCard from '../SavedCard';
import AddCard from '../AddCard';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function A_Navigator(props) {

    const Tabs =()=>{

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

        return(
            <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                let type;
                let iconSize;

                if (route.name === 'My Listing') {
                    if (iconName = focused){
                        iconName = 'home'
                        type = 'material'
                        iconSize = 27
                    } else {
                        iconName = 'home'
                        type = 'simple-line-icon'
                        iconSize =20
                    }
                } else if (route.name === 'Shortlist') {
                    if (iconName = focused){
                        iconName = 'heart'
                        type = 'font-awesome'
                        iconSize = 23
                    } else {
                        iconName = 'heart-o'
                        type = 'font-awesome'
                        iconSize =23
                    }
                } else  if (route.name === 'Create') {
                    if (iconName = focused){
                        iconName = 'add-circle-sharp'
                        type = 'ionicon'
                        iconSize = 27
                    } else {
                        iconName = 'add-circle-outline'
                        type = 'ionicon'
                        iconSize =27
                    }
                } else if (route.name === 'Message') {
                    if (iconName = focused){
                        iconName = 'chatbox'
                        type = 'ionicon'
                        iconSize = 25
                    } else {
                        iconName = 'chatbox-outline'
                        type = 'ionicon'
                        iconSize = 25
                    }
                } else  {
                    if (iconName = focused){
                        iconName = 'person-circle'
                        type = 'ionicon'
                        iconSize = 27
                    } else {
                        iconName = 'person-circle-outline'
                        type = 'ionicon'
                        iconSize =27
                    }
                }

                // You can return any component that you like here!
                return <Icon
                // reverse
                name={iconName}
                type={type}
                color={color}
                size={iconSize}
                />;
                },
            })}
            tabBarOptions={{
                activeTintColor: Constant.PRIMARY_COLOR,
                inactiveTintColor: '#676767',
                // showLabel: false
            }}
            >
                <Tab.Screen name="My Listing" component={A_Listing} 
                // options={{
                //     tabBarVisible:false,
                //     unmountOnBlur :true,
                // }}
                />
                <Tab.Screen name="Create" component={ListProperty} 
                options={{
                    tabBarVisible:false,
                    unmountOnBlur :true,
                }}
                
                />
                
                <Tab.Screen name="Message" component={Message} />
                <Tab.Screen name="Account"
                    children={()=><A_Account logOut={()=>{resetStack('mainScreen')}}/>}
                />
            </Tab.Navigator>
        )
    }

  return (
    <NavigationContainer>
       <Stack.Navigator >
        <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }}/>
        <Stack.Screen name="getLocation" component={GetLocation} options={{ headerShown: false }} />
        <Stack.Screen name="a_showProp" component={A_ShowProp} options={{ headerShown: false }} />
        <Stack.Screen name="ShowImages" component={ShowImages} options={{ headerShown: false }} />
        <Stack.Screen name="chatRoom" component={ChatRoom} options={{ headerShown: false }} />
        <Stack.Screen name="a_tenantList" component={A_TenantList} options={{ headerShown: false }} />
        <Stack.Screen name="a_tenantInfo" component={A_TenantInfo} options={{ headerShown: false }} />
        <Stack.Screen name="a_account" component={A_Account} options={{ headerShown: false }} />
        <Stack.Screen name="a_edit" component={A_Edit} options={{ headerShown: false }} />
        <Stack.Screen name="mainScreen" component={MainScreen} options={{ headerShown: false }} />
        <Stack.Screen name="savedCard" component={SavedCard} options={{ headerShown: false }} />
        <Stack.Screen name="addCard" component={AddCard} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}