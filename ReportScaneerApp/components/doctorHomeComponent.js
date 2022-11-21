import {FlatList, View, Text,StatusBar,StyleSheet,TouchableOpacity,Alert,Animated} from 'react-native';
import { ListItem, Avatar,Icon} from 'react-native-elements';
import React,{useState,useEffect}  from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {DrawerActions } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {getReports,deletReports} from '../redux/reports';

const RenderItems = (props) => {
  const data = props.item.report;
  const index = props.index;
  var date = new Date(props.item.assignDate);
  const showAlert = () =>{
      Alert.alert(
          'Delete Report ?',
          'Are you sure you wish to delete this report ?',
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "OK", onPress: () => {props.deleteReport();console.log("OK Pressed"); } }
          ],
          { cancelable: false }
        );
  }

  const leftSwipe = () => {
      return (
        <>
          <TouchableOpacity activeOpacity={0.6} onPress={showAlert} >
            <View style={styles.deleteBox}>
              <Animated.Text style={{color:'white',}}>
                Delete
              </Animated.Text>
            </View>
          </TouchableOpacity>
      </>
      );
    };

  
  return(
          <Swipeable renderRightActions={leftSwipe} >
              <Animatable.View animation="zoomIn" duration={500}>
                  <TouchableOpacity activeOpacity={0.6} onPress={()=>props.navigation.navigate('ReportShow',{ report: data })} > 
                      <ListItem bottomDivider>
                          <Avatar source={require('./images/LogoSmall.png')} />
                          <ListItem.Content>
                              <ListItem.Title>{data.name}</ListItem.Title>
                              <ListItem.Subtitle>{date.toLocaleDateString()}</ListItem.Subtitle>
                          </ListItem.Content>
                          <ListItem.Chevron />
                      </ListItem>
                  </TouchableOpacity>
              </Animatable.View>
          </Swipeable>
          
      );
  
}

function DoctorHome ({navigation}){

    const user = useSelector(state => state.user)
    const doctorReports = user.reports;
    const dispatch = useDispatch();

    const deleteReport = (id) => {dispatch(deletReports(id))} ;
    useEffect(() => {
      dispatch(getReports(doctorReports));
    }, [dispatch]);

    const patientReports = useSelector(state => state.report.reports)



    const renderReportItem = ({item,index}) => {
      return(
        <RenderItems item={item} index={item.report._id} navigation={navigation} deleteReport={ () => deleteReport(item.report._id)}/>
        );
    }

    return(
        <View style={{flex: 1}}>
          <View style={{backgroundColor:'#55A8D9'}}>
            <StatusBar backgroundColor='#55A8D9'/>
            <View style={styles.WelcomBar}>
                <Icon name="menu" size={30} color= 'white' onPress={ () => navigation.dispatch(DrawerActions.toggleDrawer()) }/>
                <Text style={styles.WelcomBarText}>
                    welcome Doctor {user.firstname}
                </Text>
            </View>
          </View>
            <View style={styles.container}>
                <FlatList
                    data={patientReports}
                    keyExtractor={item => item.report._id.toString()}
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
        flex: 2
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

export default DoctorHome;