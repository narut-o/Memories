import React from "react";
import { Grow,Container,Grid,Paper,AppBar,TextField,Button } from "@material-ui/core";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import { useState} from "react";
import {getPostsBySearch} from "../../actions/posts";
import { useDispatch } from "react-redux";
import Pagination  from "../Pagination/Pagination";
import {useNavigate,useLocation} from "react-router-dom"
import ChipInput from 'material-ui-chip-input';
import useStyles from "./styles.js";

function useQuery()
{
    return new URLSearchParams(useLocation().search);
}


const Home = ()=>{
    const dispatch = useDispatch();
    const [currId,setCurrId] = useState(null); 
    const query = useQuery();
    const navigate = useNavigate();
    const page = query.get('page')||1;
    const searchQuery = query.get('searchQuery');
    const classes = useStyles();
    const [search,setSearch] = useState('');
    const [tags,setTags] = useState([]);
    const searchPost =()=>{
        if(search.trim()||tags)
        {
           
           dispatch(getPostsBySearch({search:search,tags:tags.join(',')}));
           navigate(`/posts/search?searchQuery=${search||'none'}&tags=${tags.join(',')}`);
        }else{
            navigate('/');
        }
    }

    const handleKeyPress = (event)=>{
       if(event.charCode===13){
           
          searchPost();
       }
    
    }

    const handleAdd =(tag)=>{
        setTags([...tags,tag]);
    }
    const handleDelete=(tagToDelete)=>{
      
      setTags(tags.filter((tag)=>tag!==tagToDelete));  

    }
    
  
   
 
    return (
        <Grow in>
     
        <Container maxWidth='xl' >
             <Grid container sx={{flexDirection:{xs:'column-reverse',sm:'row'}}} justifyContent="space-between"  alignItems = "stretch" spacing={3} className={classes.gridContainer} >
          <Grid item xs = {12} sm={6} md={9} >
             <Posts  setCurrId={setCurrId} />
           </Grid>
          <Grid item xs={12} sm={6} md={3} >
          <AppBar className={classes.appBarSearch} position="static" color="inherit" >
              <TextField 
                  name="search"
                  variant="outlined"
                  label = "Search Memories"
                  fullWidth
                  value={search}
                  onKeyPress={handleKeyPress}
                  onChange = {(event)=>{setSearch(event.target.value)}}
              />
               <ChipInput
              style={{margin:'10px 0'}}
              value={tags}
              onAdd={handleAdd}
              onDelete={handleDelete}
              label="Search Tags"
              variant="outlined"
          />
          <Button className={classes.searchButton} variant="contained" color="primary" onClick={searchPost} >Search</Button>
          </AppBar>
         
          <Form currId={currId} setCurrId={setCurrId} />
          {(!searchQuery&&!tags.length)&&(
               <Paper  elevation={6} className={classes.pagination} >
         <Pagination page={page } />
          </Paper>
          )}
         
         </Grid>
         </Grid>    
     </Container>
    </Grow>
    );
}
export default Home; 