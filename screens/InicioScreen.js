import React, { useState} from 'react';
import { ScrollView,View,Text,TextInput,StyleSheet,Button } from 'react-native';

export default function Inicio(){
    const [nombre, setNombre] = useState('');
    const saludame = function(){
       alert(`Mucho gusto ${nombre}`);
    }

    return (
        <ScrollView style={{backgroundColor:"#F9F9F9"}}>
            {/* <View style={styles.containerTitle}>
            <Text style={styles.title}>Bienvenido!</Text>
        </View> */}
        <View style={styles.containerBody}>
            <Text style={styles.subTitle}>Nombre:</Text>
            <TextInput style={styles.textInput}
                placeholder="Ingresa tu nombre completo"
                onChangeText={(text)=>setNombre(text)}
                value={nombre}>                    
            </TextInput>
           
        </View>
        <View style={styles.containerBody}>
            <Text style={styles.subTitle}>
               Bienvenido: {nombre}
            </Text>
            <Button title="¡Saludame!" onPress={saludame}></Button>
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    containerTitle:{
        padding:10,
        backgroundColor:"#FFF",
        margin:10
    },
    containerBody:{
        padding:10,
        backgroundColor:"#FFF",
        margin:10,
        borderColor:"#ccc",
        borderWidth:1,
        borderRadius:5
    },
    title: {
        fontSize:16,
        fontWeight:'700',        
    },
    subTitle: {
        fontSize:15,
        fontStyle:"italic",
        marginBottom:10
    },
    textInput : {
        padding:10
    }
})


Inicio.navigationOptions = {
    title: 'Bienvenido',
  };