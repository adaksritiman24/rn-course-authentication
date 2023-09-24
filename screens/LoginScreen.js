import { useContext, useState } from 'react';
import { login } from '../components/ui/auth';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { Alert } from 'react-native';
import { AuthContext } from '../store/auth-context';
import AuthContent from '../components/Auth/AuthContent';

function LoginScreen() {

  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authContext = useContext(AuthContext);

  const loginHandler = async({email, password})=> {
    try {
      setIsAuthenticating(true);
      const token = await login(email, password);
      authContext.authenticate(token);
      
    }catch( error ) {
      Alert.alert(
        "Authentication Failed!",
        "Could not log you in. Please check your credentials or try again later!"
      )
    }
    finally{
      setIsAuthenticating(false);
    }
  }

  if(isAuthenticating) 
    return <LoadingOverlay message="Logging In..."/>

  
  return <AuthContent isLogin onAuthenticate={loginHandler}/>;
}

export default LoginScreen;