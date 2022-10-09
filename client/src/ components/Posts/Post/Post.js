import React from "react";
import useStyles from "./styles";
import { Card,CardActions,CardContent,Typography,CardMedia,Button} from "@mui/material";
import { ButtonBase } from "@material-ui/core";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from "moment";
import {useDispatch} from "react-redux";
import { deletePost,likePost } from "../../../actions/posts";
import { useNavigate } from "react-router-dom";


const Post = ({post,setCurrId})=>{
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('profile'));
    const Likes = ()=>{
        if(post.likes.length>0)
        {
            return post.likes.find((like)=>like===(user?.result?.googleId || user?.result?._id))?
         (  <> <ThumbUpAltIcon fontSize="small" />{post.likes.length>2? `You and ${post.likes.length-1} others` : `${post.likes.length} Like${post.likes.length>1?`s`:``}`  }</>):
         <> <ThumbUpAltIcon fontSize="small"/> {post.likes.length} {post.likes.length===1?'Like':'Likes'} </>
        }
        return <> <ThumbUpAltIcon fontSize="small" /> Like </>
    }
    const openPost = ()=>{
      navigate(`/posts/post/${post._id}`);
    };
    return(
        
       <Card className={classes.card} raised elevation={6} sx={{borderRadius:'10px'}} >
        <ButtonBase  className={classes.cardAction} onClick={openPost} >
       <CardMedia className={classes.media} image={post.selectedFile}  title={post.title}/>
       
       <div className={classes.overlay}>
       <Typography variant="h6" >{post.name}</Typography>
       <Typography variant="body2" >{moment(post.createdAt).fromNow()}</Typography>
       </div>
       {(user?.result?.googleId===post?.creator|| user?.result?._id===post?.creator)&&(
           <div className={classes.overlay2}>
           <Button style={{color:"white"}} onClick={()=>{setCurrId(post._id)}} size="small" >
           <MoreHorizIcon />
           </Button>
       </div>
       )}
       
       <div className={classes.details}>
      
       <Typography variant="body2"  color="textSecondary">{post.tags.map((tag)=>`#${tag} `)}</Typography>
       </div>
       <Typography className={classes.title} variant="h5"  gutterBottom>{post.title}</Typography>
       <CardContent>
           <Typography  variant="body2"  color="textSecondary" component = "p">{post.message}</Typography>
       </CardContent>
       </ButtonBase>
       <CardActions className={classes.cardActions}>
         <Button size="small" color="primary" disabled={!user?.result} onClick={()=>{dispatch(likePost(post._id))}}>
          <Likes />
         </Button>
         {(user?.result?.googleId===post?.creator|| user?.result?._id===post?.creator)&&(
              <Button size="small" color="primary" onClick={()=>{dispatch(deletePost(post._id))}}>
          <DeleteIcon/>
         Delete
         </Button>
         )}
         
        
       </CardActions>
       

       </Card>
       
    )
}
export default Post;