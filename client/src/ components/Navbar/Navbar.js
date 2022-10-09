import React, { useEffect, useState } from "react";
import { AppBar,Avatar,Button,Toolbar,Typography } from "@material-ui/core";
import useStyles from "./styles";
import memoriesLogo from "../../images/memories-Logo.png"
import memoriesText from "../../images/memories-Text.png"
import {Link,useNavigate,useLocation} from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";




const Navbar = ()=>{

    const classes = useStyles();
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const logout = ()=>{
      dispatch({type:'LOGOUT'});
      setUser(null);
       navigate('/');
    }
    useEffect(()=>{
      const token = user?.token;
      if(token)
      {
        const decodedToken = decode(token);
        if(decodedToken.exp * 1000< new Date().getTime())
        {
          logout();

        }
      }
      setUser(JSON.parse(localStorage.getItem('profile')));
      
     
    },[location]);
    return (
     
        <AppBar className={classes.appBar} position="static" color="inherit">
        <Link to="/" className={classes.brandContainer}>
         <img src={memoriesText} alt= "icon" height ="45px" />
         <img className={classes.image} src={memoriesLogo}  alt="icon" height="40"/>
        </Link>
        <Toolbar className={classes.toolbar} >
            
               {user?(
                 
                 
                 <div className={classes.profile} >
                  <Avatar className={classes.purple} alt={'text'} src={user.result.imageUrl} >{user.result.name.charAt(0)}</Avatar>
                  <Typography className={classes.userName} variant="h6" >{user.result.name}</Typography>
                  <Button className={classes.logout} variant="contained" color="secondary" onClick={logout} >Logout</Button>
                 </div>
               ):(
               <Button variant="contained" color="primary" component = {Link} to='/auth' >Sign In</Button>
               )}

        </Toolbar>
      
       
        </AppBar>
    );
}

export default Navbar;