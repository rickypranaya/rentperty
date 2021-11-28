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
import L_Listing from './L_Listing';
import L_ShowProp from './L_ShowProp';
import L_Account from './L_Account';
import L_TenantList from './L_TenantList';
import L_TenantInfo from './L_TenantInfo';
import MainScreen from '../MainScreens';
import L_Edit from './L_Edit';
import L_FindAgent from './L_FindAgent';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function L_Navigator(props) {

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
                <Tab.Screen name="My Listing" component={L_Listing} 
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
                    children={()=><L_Account logOut={()=>{resetStack('mainScreen')}}/>}
                />
            </Tab.Navigator>
        )
    }

  return (
    <NavigationContainer>
       <Stack.Navigator >
        <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }}/>
        <Stack.Screen name="getLocation" component={GetLocation} options={{ headerShown: false }} />
        <Stack.Screen name="l_showProp" component={L_ShowProp} options={{ headerShown: false }} />
        <Stack.Screen name="ShowImages" component={ShowImages} options={{ headerShown: false }} />
        <Stack.Screen name="chatRoom" component={ChatRoom} options={{ headerShown: false }} />
        <Stack.Screen name="l_tenantList" component={L_TenantList} options={{ headerShown: false }} />
        <Stack.Screen name="l_tenantInfo" component={L_TenantInfo} options={{ headerShown: false }} />
        <Stack.Screen name="l_account" component={L_Account} options={{ headerShown: false }} />
        <Stack.Screen name="l_edit" component={L_Edit} options={{ headerShown: false }} />
        <Stack.Screen name="l_findAgent" component={L_FindAgent} options={{ headerShown: false }} />
        <Stack.Screen name="mainScreen" component={MainScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}