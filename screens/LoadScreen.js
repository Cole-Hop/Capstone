import React, {useState, useEffect} from 'react'; 
import { StatusBar } from 'expo-status-bar'; //change color for status bar icons
import { Image, StyleSheet, Button, Text, View, Modal, Pressable, ScrollView, TouchableOpacity  } from 'react-native'; //react native tools
import {bundleResourceIO, decodeJpeg} from '@tensorflow/tfjs-react-native'
import * as tf from '@tensorflow/tfjs'
import AnimatedLoader from "react-native-animated-loader";
import { TypeFlags } from 'typescript';
import { AutoFocus } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import { render } from 'react-dom';

const modelJSON = require('../react-model/model.json')
const modelWeights = require('../react-model/group1-shard.bin')


function LoadScreen({navigation}) {

    const [isTfReady, checkTJ] = React.useState(false); //tf
    const [isModelReady, checkMD] = React.useState(false); //model

    /*
    setTimeout(() => {
        checkTJ('true')
    }, 3000)

    setTimeout(() => {
        checkMD('true')
    }, 3000)
    */

    React.useEffect(() => {

        //load tf package
        async()=> {
            await tf.ready().catch((e)=>{
                console.log("[Loading Error] info:", e)})
            checkTJ('true')
        }

        //load model into tf using imported json and weights
        async() => {
            const model = await tf.loadLayersModel(bundleResourceIO(modelJSON, modelWeights)).catch((e)=>{
            console.log("[Loading Error] info:", e)})
            checkMD('true')
            return model
        }
    }, [])

    return (
        <View style={{ flex: 1, alignItems: 'center'}}>
            <StatusBar style="light"/> 
            <View style={styles.container}>
                <Text> TFJS Ready? 
                    {isTfReady ? <Text>Yes</Text> : ''}
                </Text>
                <Text> Model Ready? 
                    {isModelReady ? <Text>Yes</Text> : ''}
                </Text>
                <AnimatedLoader
                    visible={true}
                    overlayColor="rgba(255,255,255,0)"
                    source={require("../assets/loaders/loadplane.json")}
                    animationStyle={styles.lottie}
                    speed={0.5}>
                </AnimatedLoader>       
            </View>
        </View>
       
    );
}


export default LoadScreen;

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
    },

    row: {
        flex: .1,
       backgroundColor: '#127bb8',
        flexDirection: "row",
        flexWrap: "wrap",
    },

    container: {
        //flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        
      
    }
})
