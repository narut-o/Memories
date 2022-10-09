import React,{useState,useEffect}from 'react'

import {GoogleLogin} from "react-google-login";
import { Avatar,Button,Paper,Grid,Typography,Container} from '@material-ui/core'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import useStyles from "./styles";
import Input from './Input';
import Icon from './Icon';
import { gapi } from 'gapi-script';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signin,signup } from '../../actions/auth';

const initialState = {firstName:'',lastName:'',email:'',password:'',confirmPassword:''};

const Auth = () => {


    const [showPassword,setShowPassword] = useState(false);
    const [formData,setFormData] = useState(initialState);
    const handleShowPassword = ()=> setShowPassword((prevState)=>!prevState);
    const classes = useStyles();
    const [isSignup,setIsSignUp] = useState(false);
    const clientId = '558353614362-qaroom5jgdb8ala1um87h83s1pvnv0p0.apps.googleusercontent.com';
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const initClient = () => {
              gapi.auth2.init({
              clientId: clientId,
              scope:''
            });
         };
         gapi.load('client:auth2', initClient);
     });
    const handleSubmit = (event)=>{
        event.preventDefault();
        if(isSignup)
        {
            dispatch(signup(formData,navigate));
        }else{
            dispatch(signin(formData,navigate));
        }

    }
    const handleChange = (event)=>{
        setFormData({...formData,[event.target.name]:event.target.value});
    }
    const switchMode = ()=> {
        setIsSignUp((prevState)=>!prevState);
        setShowPassword(false);
       
    }
   const googleSuccess = async (res)=>{
          const result = res?.profileObj;
          const token = res?.tokenId;
          console.log(result);
          try {

            dispatch({type:'AUTH',payload:{result,token}});
            navigate('/');

              
          } catch (error) {
              console.log(error);
          }
   }
   const googleFailure = (error)=>{
       console.log(error);
       console.log("Google Sign In was unsuccessful. Try Again Later ");
   }
    
  return (
    <Container component="main" maxWidth="xs" >
     <Paper className={classes.paper} elevation={3} >
     <Avatar className={classes.avatar} >
     <LockOutlinedIcon/>
     </Avatar>
      <Typography variant='h5' >{isSignup?"Sign Up":"Sign In"}</Typography>
      <form className={classes.form} onSubmit={handleSubmit} >
        <Grid container spacing={2} >
        {
            isSignup && (
                <>  
                    <Input name='firstName' label='First Name'  handleChange = {handleChange} autoFocus half />
                    <Input name='lastName' label='Last Name'  handleChange = {handleChange} half />
                </>
            )
        }
        <Input name="email" label="Email Address"  handleChange={handleChange} type = "email"  />
        <Input name="password" label="Password"  handleChange={handleChange} type={showPassword?'text':'password'} handleShowPassword={handleShowPassword}/>
        {isSignup && <Input name='confirmPassword'  label = "Confirm Password" type = "password"  handleChange = {handleChange} />}
        </Grid>
       
        <Button className={classes.submit} variant="contained" type='submit' fullWidth color='primary' >{isSignup?"Sign Up":"Sign In"}</Button>
        <GoogleLogin
            clientId={clientId}
            render={(renderProps)=>(
                <Button className={classes.googleButton} fullWidth color='primary' onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon/>}  variant="contained" > 
                Google Sign In
                 </Button>
            )}
            cookiePolicy = 'single_host_origin'
            onSuccess = {googleSuccess}
            onFailure = {googleFailure}
           
        />
        <Grid container justifyContent='flex-end' >
       <Grid  >
       <Button onClick={switchMode} >
           {isSignup?"Already have an account? Sign In":"Dont have an account Sign Up"}
       </Button>

       </Grid>
        </Grid>
      </form>
     </Paper>
    </Container>
  )
}

export default Auth;
