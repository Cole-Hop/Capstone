import React, {useState, useEffect, setState} from 'react'; 
import { StatusBar } from 'expo-status-bar'; //change color for status bar icons
import { Image, StyleSheet, Button, Text, View, Modal, Pressable, ScrollView, TouchableOpacity } from 'react-native'; //react native tools
import { render } from 'react-dom';
import * as ImagePicker from 'expo-image-picker';
import {Camera, CameraType, WhiteBalance } from 'expo-camera';

import AnimatedLoader from "react-native-animated-loader";
import {bundleResourceIO, decodeJpeg} from '@tensorflow/tfjs-react-native'
import * as tf from '@tensorflow/tfjs'
import { reduceEachLeadingCommentRange } from 'typescript';

const modelJSON = require("./react-model/model.json")
const modelWeights = require('./react-model/group1-shard.bin')

export default function App() 
{
  const [isTfReady, checkTJ] = useState(false); //tf
  const [load, setLoad] = useState(true);
  const [isModelReady, checkMD] = React.useState(false); //model
  const [image, setImage] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  setTimeout(() => {
    setLoad(false)
  }, 3000)

  useEffect(() => {
    async () => {
      Permissions.askAsync(Permissions.CAMERA).then(status => {hasCameraPermission = status.status == "granted" ? true : false;}).catch((err)=>{console.log(err);});
    }
  }, []);

  const loadModel = async()=>{
    const model = await tf.loadLayersModel(bundleResourceIO(modelJSON, modelWeights)).catch((e)=>{
      console.log("[LOADING ERROR] info:",e)
    })
    return model
  }

  const getPredictions = async (image)=>{
    await tf.ready()
    const model = await loadModel()
    const tensor_image = await transformImageToTensor(image)
    const predictions = await makePredictions(1, model, tensor_image)
    return predictions    
  }

  const transformImageToTensor = async (uri)=>{
    const img64 = await FileSystem.readAsStringAsync(uri, {encoding:FileSystem.EncodingType.Base64})
    const imgBuffer =  tf.util.encodeString(img64, 'base64').buffer
    const raw = new Uint8Array(imgBuffer)
    let imgTensor = decodeJpeg(raw)
    const scalar = tf.scalar(255)
    imgTensor = tf.image.resizeNearestNeighbor(imgTensor, [300, 300])
    const tensorScaled = imgTensor.div(scalar)
    const img = tf.reshape(tensorScaled, [1,300,300,3])
    return img
  }

  const makePredictions = async ( batch, model, imagesTensor )=>{
    const predictionsdata= model.predict(imagesTensor)
    let pred = predictionsdata.split(batch)
    return pred
  }

  const takePicture = async () => {
    if(camera){
      const data = await camera.takePictureAsync(null)
      setImage(data.uri)
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

    return(
        <View style={{ flex: 1, alignItems: 'center'}}>
            <StatusBar style="light"/> 
            <Text style={styles.header}></Text>
            <Text style={styles.title}>PoxScan</Text>
            <AnimatedLoader
              visible={load}
              overlayColor="rgba(255,255,255,0)"
              source={require("./assets/loaders/loadplane.json")}
              animationStyle={styles.lottie}
              speed={0.5}>
            </AnimatedLoader> 
            <Text> TFJS Ready? 
              {isTfReady ? <Text>Yes</Text> : ''}
            </Text>
            <View style={styles.cameraContainer}>
              <Camera 
              ref={ref => setCamera(ref)}
              style={styles.fixedRatio} 
              type={type}
              ratio={'1:1'} />
            </View>
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
                    <Button color="#ff5c5c" title="Take Photo" onPress={pickImage} /> 
                    {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} /> && getPredictions(image)}
                </View>
                <View style={styles.buttonCam}>
                    <Button color="#ff5c5c" title="Camera Roll" onPress={takePicture} /> 
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
  scrollView: {
      marginHorizontal: 5,
      flex: 1,
      backgroundColor: "#e8edfc",
  },

  text: {
      fontSize: 25,
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
  },

  header: {
    flexWrap: "wrap",
    backgroundColor: '#127bb8',
    justifyContent: 'flex-end',
    flex: .13,
    justifyContent: 'flex-end',
    paddingHorizontal: 250,
  },

  title: {
    
    justifyContent: 'flex-end',
    marginTop: -60,
    fontSize: 40,
    color: "#ffffff",
    marginBottom: 20
  },


})

