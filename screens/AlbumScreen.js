import React, { Component} from 'react';
import {ScrollView, View,Text,StyleSheet, TextInput, Button,FlatList, ActivityIndicator,TouchableOpacity  } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PhotoScreen from "../screens/PhotoScreen";

const token = 'qPBlnz3FdPZX-EgbY6MbyDvVrBRGo_B89Awl';  

export default class Album extends Component {    
    state = {
        isLoading : true,
        dataSourceAlbum:[]
    }
    componentDidMount(){
        return fetch(`https://gorest.co.in/public-api/albums?_format=json&access-token=${token}`)
          .then((response) => response.json())
          .then((responseJson) => {    
            this.setState({
              isLoading: false,
              dataSourceAlbum: responseJson.result,
            }, function(){
                //console.log(responseJson)
            });    
          })
          .catch((error) =>{          
              console.error(error);
          });
      }

    render(){
        const {navigate} = this.props.navigation;
        if(this.state.isLoading){
            return(
                <ScrollView>
                <ActivityIndicator size="large" style={{marginTop:10}}/>
                </ScrollView>
            )
        }
        else {
            return(
            <ScrollView>
               {/* <Button title="llamar a otra página"
                onPress={() => navigate('Photos', {name: 'Jane'})}       /> */}
                 <FlatList
                    data={this.state.dataSourceAlbum}
                    renderItem={({ item }) => 
                    <TouchableOpacity
                        onPress={()=>navigate('Photos', {album: item})}>
                        <View style={styles.rowItem}>
                            <Text>{item.title}</Text>
                            <Ionicons name='ios-arrow-forward' color="#E2E2E2"></Ionicons>
                        </View>
                    </TouchableOpacity>
                        }
                    keyExtractor={(item, index) => index.toString()}  />  

               
            </ScrollView>
            )
        }
        
    }
}

const styles = StyleSheet.create({
      rowItem : {
          flex:1,
          flexDirection:"row",
          justifyContent:"space-between",
          padding:15,
          borderStyle:"solid",
          borderBottomWidth:1,
          borderColor:"#F5F5F5",
          borderRadius:5
      }
  })

  Album.navigationOptions = {
    title: 'Álbumes',
  };

  
