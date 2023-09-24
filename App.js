import "react-native-gesture-handler";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import { Colors } from './constants/styles';
import AuthProvider, { AuthContext } from "./store/auth-context";
import { useContext, useEffect, useState } from "react";
import IconButton from "./components/ui/IconButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from "expo-app-loading";

const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const {logout} = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
        headerRight : ({tintColor})=> <IconButton icon="exit" size={28} color={tintColor} onPress={logout}/>
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
    </Stack.Navigator>
  );
}

function Navigation() {

  const { isAuthenticated }  = useContext(AuthContext);

  return (
    
    <NavigationContainer>
      { !isAuthenticated? <AuthStack /> : <AuthenticatedStack />}
    </NavigationContainer>
  );
}

const Root = ()=>{
  const [isTryingLogin, setIsTryingLogin] = useState(true);
  const authContext = useContext(AuthContext);

  useEffect(()=>{
    const getToken = async()=> {
        try {
            const token  = await AsyncStorage.getItem("token");
            if(token) authContext.authenticate(token);
        }
        catch (e){
            //Ignore
        }
        finally{
          setIsTryingLogin(false);
        }
    }
    getToken();
  },[])

  if(isTryingLogin) return <AppLoading/>;

  return <Navigation/>;
}

export default function App() {

  return (
    <>
    <AuthProvider>
      <StatusBar style="light" />

      <Root/>
    </AuthProvider>
    </>
  );
}