import React  from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Text, View ,StyleSheet, StatusBar} from 'react-native';
import {  Divider, Icon ,Avatar  } from 'react-native-elements';


export default function doctorProfile (props){
    const user = useSelector(state => state.user);
    const doctorData = props.route.params.doctorData;
    const bithDate = new Date(doctorData.birthdate);
    return(
        <View style={{flex: 1}}>
            <View style={{backgroundColor:'#55A8D9'}}>
                <StatusBar backgroundColor='#55A8D9'/>
                <View style={{backgroundColor: "#55A8D9",height:200,}}></View>
            </View>
            <View style={styles.avatar}>
                <Icon name='user-md' size={100}   type='font-awesome' color='black'/>
            </View>
            <View style={styles.body}>
                <Text style={{margin:10}}>First name : {doctorData.firstname}</Text>
                <Divider
                orientation="horizontal"
                />
                <Text style={{margin:10}}>Last name : {doctorData.lastname}</Text>
                <Divider
                orientation="horizontal"
                />
                <Text style={{margin:10}}>Email : {doctorData.email}</Text>
                <Divider
                orientation="horizontal"
                />
                <Text style={{margin:10}}>speciality : {doctorData.speciality}</Text>
                <Divider
                orientation="horizontal"
                />
                <Text style={{margin:10}}>gender : {doctorData.gender}</Text>
                <Divider
                orientation="horizontal"
                />
                <Text style={{margin:10}}>birthdate : {bithDate.toDateString()}</Text>
                
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
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom:10,
        alignSelf:'center',
        position: 'absolute',
        marginTop:130
      },
      body:{
        marginTop:100,
        marginLeft:30,
        marginRight:20,
        borderColor:'#55A8D9',
        borderWidth:2,
        borderRadius:20,
        padding:10

    
  },
});