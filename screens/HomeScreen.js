import React, {useState, useEffect} from 'react'; 
import { StatusBar } from 'expo-status-bar'; //change color for status bar icons
import { Image, StyleSheet, Button, Text, View, Modal, Pressable, ScrollView, TouchableOpacity  } from 'react-native'; //react native tools
import * as ImagePicker from 'expo-image-picker';
import {Camera, CameraType } from 'expo-camera';

function HomeScreen({navigation}) {

  const [image, setImage] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  useEffect(() => {
      (async () => {
        Permissions.askAsync(Permissions.CAMERA)
          .then(status => {
            hasCameraPermission = status.status == "granted" ? true : false;
          }).catch((err)=>{
              console.log(err);
          });
  })();
    }, []);

  const takePicture = async () => {
    if(camera){
        const data = await camera.takePictureAsync(null)
        setImage(data.uri);
    }
  }
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
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

    return (
        <View style={{ flex: 1, alignItems: 'center'}}>
            <StatusBar style="light"/> 
            <Text>Home Screen</Text>
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
                    {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                </View>
                <View style={styles.buttonCam}>
                    <Button color="#ff5c5c" title="Camera Roll" onPress={takePicture} /> 
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
