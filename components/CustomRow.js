import React, { Component} from 'react';
import {ScrollView, View,Text,StyleSheet, Button,FlatList,
    Image,TouchableOpacity, Modal  } from 'react-native';

import Comments from './Comments';

const token = 'qPBlnz3FdPZX-EgbY6MbyDvVrBRGo_B89Awl';

export default class CustomRow extends Component{
    constructor(props) {
        super(props);    
        this.handleSubmit = this.handleSubmit.bind(this);                
    }    

    state = {
        showDetails: false,
        data : this.props.data,
        dataSourceAlbums: [],
        dataSourceComents: [],
        display:false,
        prevState: {},
        postId:0,
    };
   
    handleSubmit() {         
        const apiUrl = `https://gorest.co.in/public-api/posts?_format=json&user_id=${this.props.data.id}&access-token=${token}`;        
        
        fetch(apiUrl)
        .then((response) =>response.json())
        .then((responseJson) => {  
           this.setState({
            display: true,
            showDetails: true,
            dataSourceAlbums: responseJson.result
           },function(){              
           })
        })
        .catch((error)=>{
            alert.error(error);
        })}        
        
    render(){
        return(
            <TouchableOpacity style={styles.containerRow} 
            onPress={this.handleSubmit}>
            <Image source={{ uri: this.props.data._links.avatar.href }} style={styles.photo} />
            <View style={styles.container_text}>
                <Text style={styles.title}>
                    {this.props.data.first_name}, {this.props.data.last_name}
                </Text>
                <Text style={styles.description}>
                    {this.props.data.email} 
                </Text>
            </View>
           
          { this.state.display && 
         <Modal animationType = "slide" >
            <ScrollView style={styles.containerModal}>
                <View style={styles.containerTitle}>
                    <Text style={styles.title}>Posts de {this.props.data.first_name} </Text>
                </View>

                <FlatList
                    data={this.state.dataSourceAlbums}
                    renderItem={({ item }) => 
                    <View style={styles.containerRow}>
                         <View style={styles.container_text}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.description}>{item.body}</Text>                            
                            <Comments data={item}></Comments>
                         </View>                        
                    </View>                        
                    }
                    keyExtractor={(item, index) => index.toString()}  />    
                 <Button title="Cerrar" onPress={()=>this.setState({display:false}) }></Button>
            </ScrollView>
         </Modal>
          }          
        </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    containerModal: {
        flex: 1,
        backgroundColor: '#F9F9F9',
    },
    containerTitle:{
        padding:10,
        backgroundColor:"#FFF",
        margin:10
    },    
    title: {
        fontSize:16,
        fontWeight:'700',        
    },
    containerRow: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        marginLeft:10,
        marginRight:10,
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 5,
        backgroundColor: '#FFF',
        elevation: 2,
        borderStyle:'solid',
        borderWidth:1,
        borderColor:'#ccc',
        shadowColor:'#ccc',
        shadowOffset: { width: 0, height: -3 },
        shadowRadius: 3,
        shadowOpacity: .5,
    },
    container_text: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 12,
        justifyContent: 'center',
    },
    description: {
        fontSize: 15,
        fontStyle: 'italic',
    },
    photo: {
        height: 50,
        width: 50,
        borderRadius:25
    }
})