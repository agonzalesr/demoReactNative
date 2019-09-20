import React, {Component} from 'react';
import { View,StyleSheet, TextInput, Button  } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default class HeaderBuscar extends Component {
    constructor(props) {
        super(props);    
    }
    state = {
        texto: '',
        tieneTexto:false,
    }

    clear(){
        this.setState({texto:'',tieneTexto:false});
        this.props.clear();
    }

    changeText(text){
        this.setState({
            texto:text, 
            tieneTexto: text!==''}, 
            function(){
                if(text===''){
                    this.clear();
                }
                else(
                    this.props.buscar(text)
                )
            })
    }
    
    render() {
      return(
        <View style={styles.container}>
        <View style={styles.container2}>
            <Ionicons name="ios-search" size={20} color="#ccc" ></Ionicons>
            <View style={styles.container3}>
                <TextInput style={styles.text} 
                placeholder={this.props.placeholder} onChangeText={(text)=>this.changeText(text)}
                value={this.state.texto} />
            </View>
            {this.state.tieneTexto && <Ionicons name="ios-close-circle" size={20} color="#ccc" 
            onPress={()=> this.clear()} />}
        </View>        
        <Button title={this.props.title} onPress={()=>this.props.buscar(this.state.texto)}></Button>
    </View>
      )}
  }

  const styles = StyleSheet.create({
      container: {
        flexDirection:"row", alignContent:"stretch", justifyContent:"space-between", flex:1
      },
      container2: {
          flex:1, flexDirection:"row", backgroundColor:"#F1F1F1", borderRadius:20, paddingTop:8, marginLeft:10, paddingLeft:10, paddingRight:10, marginRight:0
        },
        container3: {
            flex:1, flexDirection:"column"
        },
        text :{
            marginLeft:10, fontSize:16,borderWidth:0, height:25
        },
  })