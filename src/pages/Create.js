import { Typography,Button,Container, makeStyles, TextField, RadioGroup, FormControlLabel, Radio, FormControl, FormLabel } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';


const useStyle=makeStyles({
  field: {
    marginTop:20,
    marginBottom:20,
    dispaly:'block',

  }
})

export default function Create() {

  const history=useHistory()
  const [name, setName]=useState('');
  const [content, setContent]=useState('');
  const [category, setcategory]=useState('Fun');
  const [t_error,setTerr]=useState(false);
  const [c_error,setCerr]=useState(false);

  const show = (e) => {
    e.preventDefault()
    setTerr(false);
    setCerr(false);
    if(name==''){
      setTerr(true);
    }
    if(content==''){
      setCerr(true);
    }
    if(name && content){
      const note = {name, content , category};
       fetch('http://localhost:8000/notes',{
          method:'POST',
          headers:{"Content-Type": "application/json" },
          body: JSON.stringify(note)
        })
       .then(()=>{
          console.log("adding completed");
          history.push('/');
        })
      }
  }

  const classes=useStyle(); 

  return (
    <div className="create">
       <Container>
        <Typography 
          Align="center"
          variant="h2"
          color="primary"
          component="h2"
          gutterBottom
          >
          Create a new note.
        </Typography>
        
        <form onSubmit={show} autoComplete="off" noValidate> 
        <TextField
          className={classes.field}
          label="name"
          color="primary"
          fullWidth
          required
          error={t_error}
          onChange={
            (e)=>{setName(e.target.value)}
          }
        />
        <br/>
        <TextField
          fullWidth
          required
          label="content"
          color="primary"
          variant="outlined"
          error={c_error}
          multiline
          rows={4}
          onChange={
            (e)=>{setContent(e.target.value)}
          }
        />
        <br/>
        <FormControl className={classes.field} >
          <FormLabel>Category</FormLabel>
          <RadioGroup value={category} onChange={(e)=> setcategory(e.target.value)}
          color="error">
            <FormControlLabel value='Facts' control={<Radio color="primary"/>}  label="Facts" color="primary" color="primary"/>
            <FormControlLabel value='News' control={<Radio color="primary"/>}  label="News" color="primary"/>
            <FormControlLabel value='Fun' control={<Radio color="primary"/>}  label="Fun" color="primary"/>
          </RadioGroup>
        </FormControl>

        <Button
          className={classes.field}
          variant="contained"
          color="primary"
          type="submit" 
          fullWidth
        >
          Publish
        </Button>
        </form>
        
      </Container>
    </div>
  )
}