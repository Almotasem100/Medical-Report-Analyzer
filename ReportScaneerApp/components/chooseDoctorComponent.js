import {FlatList, View, Text,StatusBar,StyleSheet,TouchableOpacity,Alert,Animated} from 'react-native';
import { ListItem, Avatar,Icon} from 'react-native-elements';
import React,{useState,useEffect}  from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {DrawerActions } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {fetchDoctors,assignDoctor} from '../redux/doctor';

const RenderItems = (props) => {
    const item = props.item;
    const index = props.index;
    const showAlert = () =>{
        Alert.alert(
            'Send the report to Doctor: ' + item.firstname +'',
            'Are you sure you want to send this report ?',
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => {props.reportAssign()}   }
            ],
            { cancelable: false }
          );
    }

    const leftSwipe = () => {
        return (
          <>
            <TouchableOpacity activeOpacity={0.6} onPress={() => props.navigation.navigate('doctorProfile',{ doctorData: item })} >
            <View style={styles.shareBox}>
              <Animated.Text style={{color:'white',}}>
                profile
              </Animated.Text>
            </View>
          </TouchableOpacity>
        </>
        );
      };



    return(
            <Swipeable renderRightActions={leftSwipe} >
                <Animatable.View animation="zoomIn" duration={500}>
                    <TouchableOpacity activeOpacity={0.6} onPress={showAlert} > 
                        <ListItem bottomDivider>
                        <Avatar
                            rounded
                            icon={{name: 'user-md', type: 'font-awesome',color:'black',size:35}}
                            />
                            <ListItem.Content>
                                <ListItem.Title> {"Doctor: " + item.firstname +  " " + item.lastname }</ListItem.Title>
                                <ListItem.Subtitle>{item.speciality}</ListItem.Subtitle>
                            </ListItem.Content>
                            <ListItem.Chevron />
                        </ListItem>
                    </TouchableOpacity>
                </Animatable.View>
            </Swipeable>
            
        );
    
}
function ChooseDoctor (props){

    const reportId = props.route.params.reportId;
    const dispatch = useDispatch();
    

    useEffect(() => {
        dispatch(fetchDoctors());
    }, [dispatch]);


    const doctors = useSelector(state => state.doctor.doctorsData);
    const user = useSelector(state => state.user);
    
    const reportAssign = (doctorId) => {
        var date = new Date();
        const dataSend ={
            doctorId:doctorId,
            PatientId:user.id,
            reportId:reportId,
            patientName:user.firstname,
            gender:user.gender,
            email:user.email,
            date:date
        }
        
        dispatch(assignDoctor(dataSend))    } ;
    const renderReportItem = ({item,index}) => {
        
        return(
        <RenderItems item={item} index={item._id} reportAssign={()=>reportAssign(item._id)} navigation={props.navigation} />
        );
    }
    return(
        <View style={{flex: 1}}>
            <View style={{backgroundColor:'#55A8D9'}}>
                <StatusBar backgroundColor='#55A8D9'/>
                <View style={styles.WelcomBar}>
                    <Icon name="menu" size={30} color= 'white' onPress={ () => navigation.dispatch(DrawerActions.toggleDrawer()) }/>
                    <Text style={styles.WelcomBarText}>
                        Doctors
                    </Text>
                </View>
            </View>
            <View style={{flex:2}}>
                <FlatList
                    data={doctors}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={renderReportItem}
                />
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
    textIcon:{             
                
        position: 'absolute',                                          
        bottom: 50,                                                    
        right: 80,
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
        flex: 0,
        // backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        paddingHorizontal: 10,
        alignSelf: 'center',
        margin: 20,
        },
    deleteBox: {
            backgroundColor: 'red',
            justifyContent: 'center',
            alignItems: 'center',
            width: 70,
            borderRadius:20,
            flex:1
          },
    shareBox: {
            backgroundColor: 'green',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius:20,
            width: 70,
            flex:1
          }

  });

export default ChooseDoctor;