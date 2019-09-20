// import React, { useState, Component} from 'react';
// import {ScrollView, View,Text,StyleSheet, TextInput, Button,FlatList, ActivityIndicator  } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';

// import CustomRow from "./../components/CustomRow";
// import HeaderBuscar from "./../components/HeaderBuscar";

// const token = 'qPBlnz3FdPZX-EgbY6MbyDvVrBRGo_B89Awl';  
    
// const CustomListview = ({ itemList }) => (
//     <View>
//         <FlatList
//         data={itemList}
//         renderItem={({ item }) => 
//         <CustomRow data = {item} />
//                     }
//         keyExtractor={(item, index) => index.toString()}  />     
//     </View>
//         );


// const Principal = () => {
//     const [isLoading, setIsLoading] = useState(false);
//     const [isLoad, setIsLoad] = useState(false);
//     const [dataSource, setDataSource] = useState([]);
//     const [page, setPage] = useState(1);
//     const [countPages, setCountPages] = useState(0);

//     const getDataUser = (a) =>{        
//         const apiUrl = `https://gorest.co.in/public-api/users?page=${a}&_format=json&access-token=${token}`;
//         setIsLoading(true);
//         fetch(apiUrl)
//         .then((response) =>response.json())
//         .then((responseJson) => {            
//             setDataSource(responseJson.result);
//             setIsLoading(false);
//             setIsLoad(true);
//             setPage(responseJson._meta.currentPage);
//             setCountPages(responseJson._meta.pageCount);
//         })
//         .catch((error)=>{
//             alert.error(error);
//         })
//     }

//     return(
//     <ScrollView style={styles.container}>
//         {isLoading && <ActivityIndicator size="large" color="#0000ff" />} 
//         {!isLoading && !isLoad && <Button title="Traer datos" onPress={()=>getDataUser(page)}></Button>}
//         {isLoad && 
//         <View style={styles.containerBody}>
//             <View style={{flex:1, flexDirection:"row", justifyContent:"space-between"}}>            
//                 <Button title="Anterior" onPress={()=> getDataUser(page - 1)}></Button>
//                 <Text style={{fontSize:16, fontWeight:"500",paddingTop:10}}>Página {page} de {countPages} </Text>
//                 <Button title="Siguiente" onPress={()=> getDataUser(page + 1)}></Button>
//             </View>
//         </View>
//         }        
//             <CustomListview itemList={dataSource}/>
        
//     </ScrollView>
//    );
// };

// const buscar = () => {alert('action')};

// export default Principal;

// Principal.navigationOptions = {
//     //title: 'Principal'
//     headerStyle: {height:50},
//     headerTitle: <HeaderBuscar buscar={()=>buscar()} title="Buscar" />
// };

// const styles = StyleSheet.create({
//     container: {
//         flex:1,
//         backgroundColor:"#F9F9F9"
//     },
//     containerTitle:{
//         padding:10,
//         backgroundColor:"#FFF",
//         margin:10
//     },
//     containerBody:{
//         padding:10,
//         backgroundColor:"#FFF",
//         margin:10,
//         borderColor:"#ccc",
//         borderWidth:1,
//         borderRadius:5
//     },
//     title: {
//         fontSize:16,
//         fontWeight:'700',        
//     },
//     subTitle: {
//         fontSize:15,
//         fontStyle:"italic",
//         marginBottom:10
//     },
//     textInput : {
//         padding:10
//     },
//     containerRow: {
//         flex: 1,
//         flexDirection: 'row',
//         padding: 10,
//         marginLeft:10,
//         marginRight:10,
//         marginTop: 5,
//         marginBottom: 5,
//         borderRadius: 5,
//         backgroundColor: '#FFF',
//         elevation: 2,
//         borderStyle:'solid',
//         borderWidth:1,
//         borderColor:'#ccc',
//         shadowColor:'#ccc',
//         shadowOffset: { width: 0, height: -3 },
//         shadowRadius: 3,
//         shadowOpacity: .5,
//     },
//     container_text: {
//         flex: 1,
//         flexDirection: 'column',
//         marginLeft: 12,
//         justifyContent: 'center',
//     },
//     description: {
//         fontSize: 15,
//         fontStyle: 'italic',
//     },
//     photo: {
//         height: 50,
//         width: 50,
//         borderRadius:25
//     },
//     image: {
//         marginTop: 20,
//         marginLeft: 90,
//         height: 200,
//         width: 200
//       },
//       text: {
//         fontSize: 20,
//         marginLeft: 150
//       },
//       containerBody2:{
//         margin:5,
//         padding:10,
//         backgroundColor:"#FFF",
//         borderColor:"#ccc",
//         borderWidth:1,
//         borderRadius:5,
//         alignContent:"stretch"
//     },
// })

import React, { useState, Component} from 'react';
import {ScrollView, View,Text,StyleSheet, TextInput, Button,FlatList, ActivityIndicator  } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import CustomRow from "./../components/CustomRow";
import HeaderBuscar from "./../components/HeaderBuscar";

const token = 'qPBlnz3FdPZX-EgbY6MbyDvVrBRGo_B89Awl';  
    
const CustomListview = ({ itemList }) => (
    <View>
        <FlatList
        data={itemList}
        renderItem={({ item }) => 
        <CustomRow data = {item} />
                    }
        keyExtractor={(item, index) => index.toString()}  />     
    </View>
        );


export default class Principal extends Component {
    constructor(props) {
        super(props);   
        //this.buscarUsuario = this.buscarUsuario.bind(this);        
    }    

    state = {
        isLoading:false,
        isLoad: false,
        dataSource: [],
        dataSource2: [],
        page: 1,
        countPages: 0,
    }

    static navigationOptions = ({navigation }) =>
    {
        return {
        headerStyle: {height:50},
        headerTitle: 
        <HeaderBuscar   buscar={navigation.getParam('filtrarUsuario')} 
                        clear={navigation.getParam('clearText')} 
                        placeholder='Buscar usuario'
                        title="Buscar" />
        }
    };

    _filtrarUsuario = (text) => {
        const newData = this.state.dataSource.filter(function(item) {
            //applying filter for the inserted text in search bar
            const itemData = item.first_name ? item.first_name : '';
            const textData = text;
            return itemData.indexOf(textData) > -1;
          });
       
          this.setState({
            //setting the filtered newData on datasource
            //After setting the data it will automatically re-render the view
            dataSource: newData
          });
        
    };
    _clearText = () => {
        this.setState({dataSource: this.state.dataSource2})
    }

    getDataUser = (a) =>{        
        this.setState({isLoading:true});
        const apiUrl = `https://gorest.co.in/public-api/users?page=${a}&_format=json&access-token=${token}`;        
        fetch(apiUrl)
        .then((response) =>response.json())
        .then((responseJson) => {  
            this.setState({
                dataSource: responseJson.result,
                dataSource2: responseJson.result,
                isLoading: false,
                isLoad:true,
                page: responseJson._meta.currentPage,
                countPages: responseJson._meta.pageCount
            }, function(){
                //callback
            })
        })
        .catch((error)=>{
            alert.error(error);
        })
    }

    componentDidMount() {
        this.props.navigation.setParams({ 
            filtrarUsuario: this._filtrarUsuario, 
            clearText: this._clearText 
        });
      }

    render(){
        return(
            <ScrollView style={styles.container}>
                {this.state.isLoading && <ActivityIndicator size="large" color="#0000ff" />} 
                {!this.state.isLoading && !this.state.isLoad && <Button title="Traer datos" onPress={()=>this.getDataUser(this.state.page)}></Button>}
                {this.state.isLoad && 
                <View style={styles.containerBody}>
                    <View style={{flex:1, flexDirection:"row", justifyContent:"space-between"}}>            
                        <Button title="Anterior" onPress={()=> this.getDataUser(this.state.page - 1)}></Button>
                        <Text style={{fontSize:16, fontWeight:"500",paddingTop:10}}>Página {this.state.page} de {this.state.countPages} </Text>
                        <Button title="Siguiente" onPress={()=> this.getDataUser(this.state.page + 1)}></Button>
                    </View>
                </View>
                }        
                    <CustomListview itemList={this.state.dataSource}/>
                
            </ScrollView>
        )}
}




// Principal.navigationOptions = {
//     //title: 'Principal'
//     headerStyle: {height:50},
//     headerTitle: <HeaderBuscar buscar={()=>buscar()} title="Buscar" />
// };

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"#F9F9F9"
    },
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
    },
    image: {
        marginTop: 20,
        marginLeft: 90,
        height: 200,
        width: 200
      },
      text: {
        fontSize: 20,
        marginLeft: 150
      },
      containerBody2:{
        margin:5,
        padding:10,
        backgroundColor:"#FFF",
        borderColor:"#ccc",
        borderWidth:1,
        borderRadius:5,
        alignContent:"stretch"
    },
})