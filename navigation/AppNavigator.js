import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: MainTabNavigator,
  })
);

// import React from 'react';
// import {Button} from 'react-native';
// import {createAppContainer} from 'react-navigation';
// import {createStackNavigator} from 'react-navigation-stack';


// import Album from "./../screens/AlbumScreen";

// class HomeScreen extends React.Component {
//   static navigationOptions = {
//     title: 'Welcome',
//   };
//   render() {
//     const {navigate} = this.props.navigation;
//     return (
//       <Button
//         title="llamar a otra página"
//         onPress={() => navigate('Album', {name: 'Jane'})}
//       />
//     );
//   }
// }


// const AppNavigator = createStackNavigator({
//   Home: { screen: HomeScreen },
//   Album: {screen:Album},
// });

// const App = createAppContainer(AppNavigator);

// export default App;