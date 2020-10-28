import React,{Component}from 'react';
import {
    View,
    Text,
    TextInput,
    Modal,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView,
    FlatList} from 'react-native';
import {Card, ListItem, Icon} from 'react-native-elements';
//import SantaAnimation from '../components/SantaClaus.js';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader'



export default class MyDonationScreen extends Component{
    constructor(){
        super();
        this.state = {
            userId : firebase.auth().currentUser.email,
            allDonations : [],
        }
    }
    static navigationOptions = { header: null };
    getAllDonations(){
        db.collection('all_donations').where("donor_id","==",this.state.userId).get()
        .then((snapshot)=>{
            var allDonations = snapshot.docChanges.map((document) => {
                document.data()
            })
            this.setState({
                allDonations : allDonations
            })
        })
    }
    keyExtractor = (item, index) => index.toString()
    renderItem = ( {item, i} ) =>{
      return (
        <ListItem
          key={i}
          title={item.book_name}
          subtitle={"Requested By : " + item.requested_by +"\nStatus : " + item.request_status}
          titleStyle={{ color: 'black', fontWeight: 'bold' }}
          leftElement={
            <Icon name="book" type="font-awesome" color ='#696969'/>}
          rightElement={
              <TouchableOpacity style={styles.button}
              >
                <Text style={{color:'#ffff'}}>Send Book</Text>
              </TouchableOpacity>
            }
          bottomDivider
        />
      )
    }
    render(){
        return(
            <View style={{flex:1}}>
                <MyHeader title="My Donations" navigation ={this.props.navigation}/>
                <View style={{flex:1}}>
                  {
                    this.state.allDonations.length === 0
                    ?(
                      <View style={styles.subtitle}>
                        <Text style={{ fontSize: 20}}>List Of All Book Donations</Text>
                      </View>
                    )
                    :(
                      <FlatList
                        keyExtractor={this.keyExtractor}
                        data={this.state.allDonations}
                        renderItem={this.renderItem}
                      />
                    )
                  }
                </View>
              </View>
        )
    }
}
const styles = StyleSheet.create({ 
    button:{ 
        width:100, 
        height:30, 
        justifyContent:'center', 
        alignItems:'center', 
        backgroundColor:"#ff5722", 
        shadowColor: "#000", 
        shadowOffset: { 
            width: 0, 
            height: 8 }, 
            elevation : 16 
    }, 
    subtitle :{ 
        flex:1, 
        fontSize: 20, 
        justifyContent:'center', 
        alignItems:'center' 
    } 
})