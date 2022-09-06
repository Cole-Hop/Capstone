import * as React from 'react'; 
import { StatusBar } from 'expo-status-bar'; //change color for status bar icons
import { StyleSheet, Button, Text, View, Modal, Pressable, ScrollView, TouchableOpacity  } from 'react-native'; //react native tools

function HomeScreen({navigation}) {
    return (
        <View style={{ flex: 1, alignItems: 'center'}}>
            <StatusBar style="light"/> 
            <Text>Home Screen</Text> 
            <ScrollView style={styles.scrollView}>
                <Text style={styles.text}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.
                </Text>
            </ScrollView>
            <View style={styles.row}>
                <View style={styles.buttonCam}>
                    <Button color="#ff5c5c" title="Take Photo" onPress={() => navigation.navigate('Details')} /> 
                </View>
                <View style={styles.buttonCam}>
                    <Button color="#ff5c5c" title="Camera Roll" onPress={() => navigation.navigate('Details')} /> 
                </View>
            </View>
        </View>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    scrollView: {
        marginHorizontal: 5,
        flex: 1,
    },

    text: {
        fontSize: 40,
    },

    
    buttonCam: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 15,
        paddingHorizontal: 10,
        //marginHorizontal: 20,
        //shadowColor: 'rgba(0, 0, 0, 0.1)',
        //shadowOpacity: 0,
        //elevation: 6,
        //shadowRadius: 30 ,
        //shadowOffset : { width: 10, height: 13},
    },

    row: {
        flex: .1,
       backgroundColor: '#127bb8',
        flexDirection: "row",
        flexWrap: "wrap",
    }
})