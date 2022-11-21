import {View, Text,StatusBar,StyleSheet,TouchableOpacity,TextInput,ScrollView } from 'react-native';
import {Button,Icon,Tooltip} from 'react-native-elements';
import React,{useState}  from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {DrawerActions } from '@react-navigation/native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { Loading } from './watingComponent';
import {postReports} from '../redux/reports';
import Hyperlink from 'react-native-hyperlink';
function ReportShow (props){

    const report = props.route.params.report;
    const userName = useSelector(state => state.user.firstname)
    console.log("reportShow report",report);
    var tableHead = ['Measure', 'Value','Range','Units'];
    var tableData = [
      ['RBC', 0,'4.7 : 6', '10^6/ul',''],
      ['HGB', 0,'13.5 : 18', 'g/dl',''],
      ['НСТ', 0,'37 : 47', '%',''],
      ['MCV', 0,'78 : 99', 'Um^3',''],
      ['MCH', 0,'27 : 31 ', 'pg',''],
      ['MCHC', 0,'32 : 36', 'g/dl',''],
      ['RDW', 0,'11.5 : 14.5', '%',''],
      ['WBC', 0,'4 : 10.5', '10^3/ul',''],
      ['LYM', 0,'1.2 : 3.2', '%',''],
      ['LYMP', 0,'20 : 45', '10^3/ul',''],
      ['MON', 0,'0.3 : 0.8', '%',''],
      ['MONP', 0,'1 : 8', '10^3/ul',''],
      ['GRA', 0,'1.6 : 7.2', '%',''],
      ['GRAP', 0,'52 : 76', '10^3/ul',''],
      ['PLT', 0,'140 : 440', '10^3/ul',''],
      ['MPV', 0,'7.4 : 10.4', 'Um^3',''],
      ['PCT', 0,'0.1 : 0.5', '%',''],
      ['PDW', 0,'9 : 14', '%','']
    ]
    var reportDate = new Date(report.reportDate);
    const element = (Measurement,index) => (
        <TextInput
        style={{alignSelf:'center'}}
        placeholder={report[Measurement.toString()] == null ? "***":report[Measurement.toString()].toString() }
        keyboardType="numeric"
        editable={false}
      />
      )

    const exclamation = (Measurement,index) => (
            <Icon style={{margin:0}} name="exclamation-circle" type='font-awesome' 
                size={30} color= 'yellow'
                onPress={()=>props.navigation.navigate('Exclamation',{index: index})}
                />
    )
        return(
            <View style={{flex: 1, backgroundColor:'#55A8D9'}}>
                <StatusBar backgroundColor='#55A8D9'/>
                <View style={styles.WelcomBar}>
                    <Icon name="menu" size={30} color= 'white' onPress={ () => props.navigation.dispatch(DrawerActions.toggleDrawer()) }/>
                    <Text style={styles.WelcomBarText}>
                        {report.name} Report
                    </Text>
                </View>                
                <View style={styles.container}>
                    <Table borderStyle={{borderWidth: 2, borderColor: '#ffff'}}>
                    <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
                    </Table>
                    <ScrollView style={{backgroundColor:'#fff'}}>
                        <Table borderStyle={{borderWidth: 1, borderColor: '#ffff'}}>
                            {
                                tableData.map((rowData, index) => (
                                <TableWrapper key={index} style={index%2? styles.row2 : styles.row1}>
                                    {
                                    rowData.map((cellData, cellIndex) => (
                                        cellIndex !=4?
                                        <Cell  key={cellIndex} data={cellIndex === 1 ? element(rowData[0],index) : cellData} textStyle={styles.text}/>
                                        : 
                                        <Cell width={40} key={cellIndex} data={ exclamation(rowData[0],index)} textStyle={styles.text} />

                                    ))
                                    }
                                </TableWrapper>
                                ))
                            }
                        </Table>
                        <View style={styles.commentStyle}>
                            <Text> comment</Text>
                            <Text style={{margin:10}}>{report.comment}</Text>
                            
                        </View>
                        <View style={{flexDirection:'row'}}>
                        <View style={styles.modelInput}>
                                <Text style={{fontWeight:'bold',fontSize:18}}>Name: </Text>
                                <TextInput  
                                    style={{color:'black',fontSize:18}}                         
                                    value={report.name == null ? "***":report.name.toString() }
                                    editable={false}
                                />
                            </View>
                            <View style={styles.modelInput}>
                                <Text style={{fontWeight:'bold',fontSize:18}}>Date: </Text>
                                <TextInput  
                                    style={{color:'black',fontSize:18}}                         
                                    value={report.reportDate == null ? "***":reportDate.toLocaleDateString() }
                                    editable={false}
                                />
                            </View>
                            
                        </View>
                        <View style={{flexDirection:'row',marginBottom:30}}>
                            <View style={styles.modelInput}>
                                <Text style={{fontWeight:'bold',fontSize:18}}>Gender: </Text>
                                <TextInput  
                                    style={{color:'black',fontSize:18}}                         
                                    value={report.gender == null ? "***":report.gender.toString() }
                                    editable={false}
                                />
                            </View>
                            <View style={styles.modelInput}>
                                <Text style={{fontWeight:'bold',fontSize:18}}>Age: </Text>
                                <TextInput  
                                    style={{color:'black',fontSize:18}}                         
                                    value={report.age == null ? "***":report.age.toString() }
                                    editable={false}
                                />
                            </View>
                        </View>
                    </ScrollView>
                </View>
                
            </View>
            
        );
    
    
    
}


const styles = StyleSheet.create({
    Image: {margin:20},
    WelcomBar: {
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
    container: { flex: 1, padding:0, paddingTop: 0, backgroundColor: '#8BC0E0' },
    head: { height: 40, backgroundColor: '#FFFFFF' },
    text: { margin: 6 },
    row1: { flexDirection: 'row', backgroundColor: '#8BC0E0' },
    row2: { flexDirection: 'row', backgroundColor: '#A3CBE3' },
    commentStyle:{flexDirection:'column', backgroundColor: '#A3CBE3'},
    modelInput:{
        flexDirection:'row',
        borderColor:'#55A8D9',
        borderWidth:1,
        fontSize:20,
        paddingLeft:5,
        width:170,
        borderRadius:10,
        marginBottom:10,
        marginRight:20,
    },
    
    
  });

export default ReportShow;