import axios from "axios";


const API_KEY = "AIzaSyDTC3MKoWP8W4PpDaHVwKGt3VcKZ-d82oA";


export const authenticate = async(mode, email, password) => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

    const response =  await axios.post(url, { email : email, password : password, returnSecureToken : true});
    const token = response.data.idToken;
    return token;
}

export const createUser = async(email, password)=> {
    console.log("Calling Signup Api");
    return authenticate("signUp", email, password);
}

export const login = async(email, password)=> {
    console.log("Logging In ..");
    return authenticate("signInWithPassword", email, password);
}