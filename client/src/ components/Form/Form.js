import React,{useState,useEffect} from "react";
import useStyles from "./styles";
import FileBase from "react-file-base64";
import { TextField,Typography,Button,Paper } from "@mui/material";
import { useDispatch ,useSelector} from "react-redux";
import { createPost,updatePost } from "../../actions/posts.js";



const Form = ({currId ,setCurrId})=>{

    const classes = useStyles();
    const dispatch = useDispatch();
    const [postData,setPostData] = useState({title:"",message:"",tags:"",selectedFile:""});
    const post = useSelector((state)=>currId?state.posts.find((post)=>post._id===currId):null);
    const user = JSON.parse(localStorage.getItem('profile'));
    useEffect(()=>{
       if(post)setPostData(post);
    },[post])
    const handleSubmit = (event)=>{
        event.preventDefault();
        if(currId)
        {
            dispatch(updatePost(currId,{...postData,name:user?.result?.name}));
           
        }else
        {
             dispatch(createPost({...postData,name:user?.result?.name}));
            
        }
        clear();
    }
    const clear = ()=>{
           setCurrId(null);
           setPostData({title:"",message:"",tags:"",selectedFile:""});
    }
    if(!user?.result?.name)
    {
        return(
            <Paper className={classes.paper} >
            <Typography variant="h6" align="center" >
             Please Sign In to create memories
            </Typography>
            </Paper>
        )
    }
    return(
     
           <Paper className={classes.paper} elevation={6} >
       <form className={`${classes.root} ${classes.form}`} autoComplete="off" noValidate onSubmit={handleSubmit}>
           <Typography variant="h6">{currId?"Editing":"Creating"} a Memory</Typography>
           <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(event)=>setPostData({...postData,title:event.target.value})} />
           <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(event)=>setPostData({...postData,message:event.target.value})} />
           <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(event)=>setPostData({...postData,tags:event.target.value.split(',')})} />
          <div className={classes.fileInput}><FileBase type = "file"multiple = {false}onDone = {({base64})=>setPostData({...postData,selectedFile:base64})} /></div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth onClick={handleSubmit} >Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth sx={{marginTop:'10px'}} >Clear</Button>
      

       </form>

       </Paper>
     
    )
}
export default Form;