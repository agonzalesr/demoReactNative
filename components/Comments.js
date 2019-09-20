import React, { Component} from 'react';
import {View,Text,StyleSheet, Button,FlatList  } from 'react-native';

const token = 'qPBlnz3FdPZX-EgbY6MbyDvVrBRGo_B89Awl';

export default class Comments extends Component{
    constructor(props) {
        super(props);           
        this._onPress = this._onPress.bind(this);   
        this._hide = this._hide.bind(this); 
    }   
    state = {
        dataSourceComents:[],
        showComentns: false
    }
    _hide(){
        this.setState({
            showComentns: false,
            dataSourceComents:[],
       })
    }
    _onPress(){
        const apiUrl3 = `https://gorest.co.in/public-api/comments?_format=json&post_id=${this.props.data.id}&access-token=${token}`;        
        fetch(apiUrl3)
        .then((response) =>response.json())
        .then((responseJson) => {   
            if(responseJson.result.length > 0){  
           this.setState({
                dataSourceComents: responseJson.result ,
                showComentns: true
           },
            function(){
                console.log(this.state.dataSourceComents.length);
                console.log(responseJson.result.length);
           }) }
           else{
               alert('No hay comentarios en este post')
           }
        })
        .catch((error)=>{
            alert.error(error);
        })
    }  

    render(){
        return(
            <View>
                {!this.state.showComentns && <Button title="Ver comentarios" onPress={this._onPress}></Button>}
                {this.state.showComentns && <Button title="Ocultar" onPress={this._hide}></Button> }

                <FlatList
                    data={this.state.dataSourceComents}
                    renderItem={({ item }) => 
                    <View style={styles.containerBody}>
                         <View>
                            <Text style={{fontSize:14, fontWeight:"500"}}>{item.name}</Text>
                            <Text style={{fontSize:14, fontStyle:"italic"}}>{item.email}</Text>
                            <Text style={{fontSize:13, marginTop:5}}>{item.body}</Text>                            
                         </View>
                    </View>                        
                    }
                keyExtractor={(item, index) => index.toString()}  />  
            </View>            
        )}
}

const styles = StyleSheet.create({
      containerBody:{
        margin:5,
        padding:10,
        backgroundColor:"#FFF",
        borderColor:"#ccc",
        borderWidth:1,
        borderRadius:5,
        alignContent:"stretch"
    },
})

