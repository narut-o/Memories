import React from "react";
import Post from "./Post/Post.js";
import useStyles from "./styles";
import { useSelector } from "react-redux";
import { Grid,LinearProgress } from "@mui/material";


const Posts = ({setCurrId})=>{
    const classes = useStyles();
    const {posts,isLoading} = useSelector((state)=>state.posts);
    if(!posts.length&&!isLoading)return 'No Posts';
    return(
          isLoading?<LinearProgress/>:(
              <Grid className={classes.container} container alignItems="stretch" spacing={3}>
              {
                  posts.map((post)=>(
                      <Grid item key={post._id} xs={12} sm={6} md = {6} lg = {4}>
                            <Post post={post} setCurrId={setCurrId}/>
                      </Grid>
                  ))
              }

              </Grid>
          )
    )
}
export default Posts;