import React from 'react'
import { InputAdornment,TextField,Grid,IconButton } from '@material-ui/core';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Input = (props) => {
  return (
   <Grid xs={12} sm={props.half? 6:12} >
    <TextField
    style={{paddingTop:'5px',paddingBottom:'5px'}}
    name={props.name}
    label={props.label}
    type={props.type}
    variant = 'outlined'
    onChange={props.handleChange}
    required
    fullWidth
    autoFocus = {props.autoFocus}
    InputProps={props.name==='password'?{
        endAdornment:(
            <InputAdornment position = 'end' >
            <IconButton onClick={props.handleShowPassword} >
             {props.type === 'password'?<Visibility / >:<VisibilityOff/>}
            </IconButton>
            </InputAdornment>
        )}:null}
     />
   </Grid>
  )
}

export default Input;
