import {FlatList, View, Text,StyleSheet,TouchableOpacity,SafeAreaView,Modal} from 'react-native';
import { Card, Input, Icon ,SocialIcon,Button  } from 'react-native-elements';
import React,{useState}  from 'react';
import * as Animatable from 'react-native-animatable';
import FastImage from 'react-native-fast-image';
import { useSelector,useDispatch } from 'react-redux';
import {photoUpload} from '../redux/images';
function PicDetial (props){
    const { navigate } = props.navigation;
    const pictaken = props.route.params.picTaken;
    const uploadSatus = useSelector((state) => state.image.status)
    const dispatch = useDispatch();
    const [imageuri, setImageuri] = useState('');
  const [modalVisibleStatus, setModalVisibleStatus] = useState(false);
    console.log("we are in picDetail")
    console.log(pictaken)
    //<Animatable.View animation="fadeInRightBig" duration={2000}> </Animatable.View>

    const uploadImages = (pictaken) => {
        dispatch(photoUpload(pictaken));
        navigate('ReportTextOutput')
    }
    const showModalFunction = (visible, imageURL) => {
        setImageuri(imageURL);
        setModalVisibleStatus(visible);
      };

    const renderMenuItem = ({item,index}) => {
        return(
                <View style={styles.imageContainerStyle}>
                <TouchableOpacity
                  key={index.toString()}
                  style={{flex: 1}}
                  onPress={     () => { showModalFunction(true, item.img); }    }   >
                  <FastImage
                    style={styles.imageStyle}
                    source={{
                      uri: item.img,
                    }}
                  />
                </TouchableOpacity>
                </View>
            
            
        );
    }
    
    return(
        <SafeAreaView style={styles.container}>
        {modalVisibleStatus ? (
            <Modal
              transparent={false}
              animationType={'fade'}
              visible={modalVisibleStatus}
              onRequestClose={() => {
                showModalFunction(!modalVisibleStatus, '');
              }}>
              <View style={styles.modelStyle}>
                <FastImage
                  style={styles.fullImageStyle}
                  source={{uri: imageuri}}
                  resizeMode={
                    FastImage.resizeMode.contain
                  }
                />
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={styles.closeButtonStyle}
                  onPress={() => {
                    showModalFunction(!modalVisibleStatus, '');
                  }}>
                </TouchableOpacity>
              </View>
            </Modal>
          ) :
        <View style={styles.container}>
            <View style={styles.flastListStyel}>
                <FlatList
                data={pictaken}
                keyExtractor={item => item.id.toString()}
                renderItem={renderMenuItem}
                numColumns={3}
                />
            </View>
            <View style={styles.buttomContainerStyle}>
            
            <Button 
                icon={
                    <Icon
                    type='font-awesome' name="times"
                    size={30}
                    color="black"
                    />
                }
                title="   Cancel"
                buttonStyle={styles.ButtoncancelStyle}
                loading= {false}
                type="outline"
                containerStyle={{color:'black'}}
                titleStyle={{color:'black'}}
                onPress={   ()=>  navigate('PatientHome')   }

                />
                <Button 
                icon={
                    <Icon
                    type='font-awesome' name="upload"
                    size={30}
                    color="white"
                    />
                }
                title="   Confirm"
                buttonStyle={styles.ButtonUploadStyle}
                loading= {false}
                type="outline"
                containerStyle={{color:'black'}}
                titleStyle={{color:'black'}}
                onPress={   ()=>   {  uploadImages(pictaken)   }}

                />
            </View>
        </View>
        }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  buttomContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    margin: 1,
    position: 'relative',
    alignSelf:'center',
  },
  flastListStyel:{
    flex: 8,
  },
  imageContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    margin: 1,
  },
  imageStyle: {
    height: 120,
    width: '100%',

  },
  modelStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  fullImageStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '98%',
    resizeMode: 'contain',
  },
  closeButtonStyle: {
    width: 25,
    height: 25,
    top: 50,
    right: 20,
    position: 'absolute',
  },
  ButtonUploadStyle:{
    backgroundColor: '#38C829',
    margin:10,
    borderRadius:20,
    width:120,
    borderColor:'black',
    borderEndWidth:1,
    },
    ButtoncancelStyle:{
        backgroundColor: '#EE3413',
        margin:10,
        borderRadius:20,
        width:120,
        borderColor:'black',
        borderEndWidth:1,
      },
    });
export default PicDetial;