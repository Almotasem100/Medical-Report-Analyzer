import { View, Text,StatusBar,StyleSheet} from 'react-native';
import { Icon} from 'react-native-elements';
import React  from 'react';
import { useSelector } from 'react-redux';
import {DrawerActions } from '@react-navigation/native';

export default function Bar ({navigation}){
    const user = useSelector(state => state.user);
    return(
        <View style={{backgroundColor:'#55A8D9'}}>
                <StatusBar backgroundColor='#55A8D9'/>
                <View style={styles.WelcomBar}>
                    <Icon name="menu" size={30} color= 'white' onPress={ () => navigation.dispatch(DrawerActions.toggleDrawer()) }/>
                    <Text style={styles.WelcomBarText}>
                        welcome {user.firstname}
                    </Text>
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
});