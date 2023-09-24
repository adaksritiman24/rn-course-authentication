import { useContext, useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import { createUser } from '../components/ui/auth';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { Alert } from 'react-native';
import { AuthContext } from '../store/auth-context';

function SignupScreen() {

  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authContext = useContext(AuthContext);

  const signupHandler = async({email, password})=> {
    try {
      setIsAuthenticating(true);
      const token = await createUser(email, password);
      authContext.authenticate(token);
      
    }
    catch(error) {
      Alert.alert(
        "User Creation Failed!",
        "Please check your credentials and try again."
      )
    }
    finally {
      setIsAuthenticating(false);
    }
  }

  if(isAuthenticating) 
    return <LoadingOverlay message="Creating User..."/>

  return <AuthContent onAuthenticate={signupHandler}/>;
}

export default SignupScreen;