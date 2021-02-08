import {  AlertMe } from "../components";
const Auth = {

    getJWTToken: function(){
      return  localStorage.getItem("jwt");
    },
    setLogin: (user)=>{      
      localStorage.setItem("jwt",user.authInfo.token);
      localStorage.setItem("userInfo",JSON.stringify({access: true, userName: user.authInfo.userName}));
    },
    
    checkIfUserIsLoggedIn: ()=>{
      var user = localStorage.getItem("userInfo");
      if(user){
        user = JSON.parse(user);
        return user;        
      }

      return false;
    },

    logout: ()=>{
      localStorage.removeItem("jwt");
      localStorage.removeItem("userInfo");
    }
}
const Util = {

  showErrors: (errors) => {
    return (
      <AlertMe variant="danger">
        {errors.map((value, index) => {
          return (<p key={value}>{value}</p>);
        })}
      </AlertMe>
    )

  },

}

export {
Auth,
Util

}
