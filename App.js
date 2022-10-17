import * as React from 'react'; 
import { StatusBar } from 'expo-status-bar'; //change color for status bar icons
import { StyleSheet, Button, Text, View, Modal } from 'react-native'; //react native tools
import { NavigationContainer } from '@react-navigation/native'; //core utilities to create nav structure
import { createNativeStackNavigator } from '@react-navigation/native-stack'; //object for use of screen and navigator
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; //for the tab navigation
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import Camera from './screens/Camera';
import Model from './screens/Model';

function ModalScreen({ navigation }) {
  return (

    <View style={{ flex: 10, alignItems: 'center', justifyContent: 'center' }}>
      <Modal>
      <Text style={{ fontSize: 30 }}>This is a modal!</Text>
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
      </Modal>
    </View>

  );
}

const Stack = createNativeStackNavigator(); //allow Stack to use Navigator and Screen components

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Group>
          <Stack.Screen name="Home" component={HomeScreen} 
            options={{ title: 'ScanPox', 
            headerStyle: {backgroundColor: '#127bb8'}, //header background color
            headerTintColor: '#fff', //header text color
            headerTitleAlign: 'center', 
            headerTitleStyle: {
              fontWeight: 'italic',}, 
            }}/> 
          <Stack.Screen name="Details" component={DetailsScreen}
            options={{ title: 'Details', 
            headerStyle: {backgroundColor: '#2fa13c'}, //header background color
            headerTintColor: '#fff', //header text color
            headerTitleAlign: 'center', 
            headerTitleStyle: {
              fontWeight: 'italic',}, 
            }}/>  
        </Stack.Group>

        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen name="MyModal" component={ModalScreen} 
          options={{headerShown: false,
            margin: 20,
            backgroundColor: "white",
            borderRadius: 20,
            padding: 35,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5
          }}/>
        </Stack.Group>

      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

export default App;