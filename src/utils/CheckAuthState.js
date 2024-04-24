 import { clearUser, setUser } from '../store/userSlice'; 
import { loadTokenFromLocalStorage } from '../utils/LocalStorage';
import { ACCESS_TOKEN_COOKIE } from './Constants';
import {  toast } from 'react-toastify';
import { USER_PROFILE_URL } from './Constants';
 import { axiosHandler, errorHandler } from './Helper';

const simulateCheckAuth = async (dispatch ) => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      console.log("simulating check....")
      const isAuthenticated = await getUserProfile(dispatch );

      if (isAuthenticated) {
        resolve(isAuthenticated);
      } else {
        resolve(null);
      }
    }, 1000);
  });
};

export const checkAuthState = async (
  setChecking,
  setError,
  dispatch,
  
) => {
  try {
    const user = await simulateCheckAuth(dispatch);
    if (user) {
      dispatch(setUser(user));
      setChecking(false);
      setError(false)
    }
  } catch (error) {
    console.error('Error checking auth state:', error);
    setError(true)
    
  }
};


 

const getUserProfile = async(dispatch ) =>{
    const mt  =   loadTokenFromLocalStorage(ACCESS_TOKEN_COOKIE)
    console.log("mt::", mt)
    const userProfile = await axiosHandler({
      method: "GET",
      url: USER_PROFILE_URL,
      token:   loadTokenFromLocalStorage(ACCESS_TOKEN_COOKIE),
    }).catch((e) => {
      console.error(e);
      const err = errorHandler(e, true);
      console.log(err);
      if(err.server_error){
         if (err.message.toLowerCase() === "forbidden" || err.message.toLowerCase()===  "unauthorized"){
          dispatch(clearUser());
          window.location.href = "/login"
         }
      }
      return null;
    });
    if (userProfile) {
      console.log("userProfile::", userProfile);
      return userProfile.data ;
    }
}
