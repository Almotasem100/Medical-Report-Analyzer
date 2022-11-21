import {FlatList, View, Text,StatusBar,StyleSheet,TouchableOpacity,Image,Modal,Button} from 'react-native';
import { ListItem, Avatar,Icon} from 'react-native-elements';
import React,{useState,useRef}  from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {DrawerActions } from '@react-navigation/native';
import {photoUpload,photoDownload} from '../redux/images'
import LottieView from "lottie-react-native"
import { RNCamera } from 'react-native-camera';

function Camera ({navigation}){
    const [image, setimage] = useState('')
    const [cameraView, setcameraView ] = useState(false);
    const [showModal, setShowModal] = useState(false);
    var userId = useSelector(state => state.user.id)
    const imageCrop = useRef(null);
    var cameraRef = useRef(null);
    var spinnerAnimation = useRef(null);
    const dispatch = useDispatch()
    const picTaken = []
    const takePicture = async () => {
        if (cameraRef) {
            waittingAnimation();
          const options = {orientation:"portrait" , quality: 0.5, base64: false };
          const data = await cameraRef.takePictureAsync(options);
          console.log(data);
          picTaken.push({img:data.uri,id: userId + '_' +picTaken.length});
          succeededAnimation();
          console.log(picTaken);
          setTimeout(function(){
            hideAnimation();
       }, 2000);
        }
      };

    const waittingAnimation = () => {
        if (spinnerAnimation) {
            spinnerAnimation.current.play(1,250);
        }
    }
    const succeededAnimation = () => {
        spinnerAnimation.current.play(250,400);
    }
    const faildAnimation = () => {
        spinnerAnimation.current.play(690,900)
    }
    const hideAnimation = ()=> {
        spinnerAnimation.current.play(416,417);
    }
    const toggleModal = () =>{
        setShowModal(!showModal);
    }
    return (   
        <View style={styles.container}> 
            <RNCamera
            ref={ref => cameraRef = ref }
            style={styles.preview}
            //flashMode={RNCamera.Constants.FlashMode.on}
            ratio='16:9'
            type={RNCamera.Constants.Type.back}
            androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
            }}
            />
            <View 
            style={{position:'absolute',
                flex: 0,
                borderRadius: 5,
                padding: 50,
                paddingHorizontal: 30,
                marginTop:250,
                alignSelf: 'center',
                alignItems:'center',
                margin: 20, }}
                >
                <LottieView
                    source={require('../shared/spinner.json')}
                    loop={false}
                    autoPlay={false}
                    ref={spinnerAnimation}
                    onAnimationFinish= { ()=> {}} 
                    />
        </View>
        <Modal transparent={true}
            visible = {showModal}
            onDismiss = {() => toggleModal() }
            onRequestClose = {() => toggleModal() }>
                    <Button 
                        onPress = {() =>{toggleModal();}}
                        color="#512DA8"
                        title="Close" 
                        />
                
            </Modal>


            <View style={{ flex: 0, flexDirection: 'row', justifyContent:'center'}}>
            <TouchableOpacity onPress={() => takePicture()} style={styles.capture}>
                <Icon name="camera" size={40} color= 'white' type='font-awesome'/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('PicDetial',{picTaken:picTaken})} style={styles.captureDone}>
                <Icon name="check-circle" size={40} color= 'white' type='font-awesome'/>
            </TouchableOpacity>
            </View>
        </View>
        );  
}


const styles = StyleSheet.create({
    Image: {margin:20},
    WelcomBar: {
        // alignItems: 'center' ,
        flexDirection: 'row',
        backgroundColor:'#55A8D9' ,
        marginTop:20,
        marginLeft:10,
        marginBottom:10
        },
    WelcomBarText: {
        fontSize:20,
        color:'white',
        marginLeft:20,
        fontWeight:'bold',
        
    },
    cameraIcon:{             
                
        position: 'absolute',                                          
        bottom: 50,                                                    
        right: 30,
    },
    preview: {
        flex: 1,
        width: "100%",
        height:'100%',
        resizeMode: "cover",
      },
    Button:{
        marginTop:10,
        borderRadius:20,
        width:120,
        borderColor:'white',
        borderEndWidth:1,
        },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
        },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        },
    capture: {
        flex: 1,
        borderRadius: 5,
        padding: 10,
        paddingHorizontal: 10,
        justifyContent: 'center',
        margin: 20,
        marginLeft:120,
        },
        captureDone: {
            flex: 0,
            borderRadius: 5,
            padding: 10,
            paddingRight:20,
            paddingHorizontal: 10,
            justifyContent: 'center',
            margin: 20,
            },

  });

export default Camera;