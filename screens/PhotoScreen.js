import React, { Component} from 'react';
import {View,Text,ScrollView,ActivityIndicator,FlatList,Image,TouchableOpacity,StyleSheet,Button} from "react-native";
//import { FlatList } from 'react-native-gesture-handler';

const token = 'qPBlnz3FdPZX-EgbY6MbyDvVrBRGo_B89Awl';  

class ItemRow extends Component{    
    render(){
    const {item} =this.props
    return (        
    // <TouchableOpacity
    //     style={styles.itemRow}
    //     onPress={()=>console.log(item.title)}>
    //     <Image source={{uri:item.thumbnail}} style={styles.photo}/>
    // </TouchableOpacity>
    <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
              <Image style={styles.imageThumbnail} source={{ uri: item.thumbnail }} />
            </View>
    )}
}

export default class Photo extends Component{
    state = {
        isLoading : true,
        dataSource:[]
    }
    componentDidMount(){
        const { navigation } = this.props;
        const album = navigation.getParam('album','empty');
        return fetch(`https://gorest.co.in/public-api/photos?_format=json&album_id=${album.id}&access-token=${token}`)
          .then((response) => response.json())
          .then((responseJson) => {    
            this.setState({
              isLoading: false,
              dataSource: responseJson.result,
            }, function(){
                console.log(responseJson)
            });    
          })
          .catch((error) =>{          
              console.error(error);
          });
      }

    render(){
    const { navigation } = this.props;
    const album = navigation.getParam('album','empty');
    if(this.state.isLoading){
        return(
            <ScrollView>
                <ActivityIndicator size="large" style={{marginTop:10}}/>
            </ScrollView>
            )
    }
    else {
        return(
        <View style={styles.mainContainer}>
                <FlatList
                        //contentContainerStyle={{justifyContent: 'center',  flexDirection: 'row', flexWrap: 'wrap',}}
                        numColumns={3}
                        data={this.state.dataSource}
                        renderItem={({ item }) => 
                    //    <ItemRow item={item}></ItemRow>
                    <View style={{ flex: 1, flexDirection: "column", margin: 1 }}>
                         <Image style={styles.imageThumbnail} source={{ uri: item.thumbnail }} />
                    </View>
                            }
                        keyExtractor={(item, index) => index.toString()}  />  
        </View>
        )}
    };
}

Photo.navigationOptions = {
    title: 'Fotos',
  };

const styles = StyleSheet.create({
    itemRow:{
        marginTop:5, 
        marginBottom:5,
        marginLeft:10,
        marginRight:10,
        padding:10, 
        backgroundColor:"#FFF", 
        borderRadius:5,
        shadowColor:'#ccc',
        shadowOffset: { width: 0, height: -3 },
        shadowRadius: 3,
        shadowOpacity: .5,
        flex: 1, flexDirection: 'column', margin: 1
    },
    mainContainer: {
        backgroundColor:"#F7F7F7",
        justifyContent: "center",
        flex: 1,
      },
    photo: {
        height: 100,
        width: 100,
        borderRadius:5
    },
    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
      },
})
