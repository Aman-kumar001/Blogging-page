import React, { useEffect, useState } from 'react'
import { Container, Divider, Grid, Paper } from '@material-ui/core';
import NoteCard from '../components/NoteCard';
import Masonry from 'react-masonry-css'
 
export default function Notes() {

  const [notes,setNotes]=useState([]);

  useEffect(()=>{
    fetch('http://localhost:8000/notes')
    .then(res=>res.json())
    .then(data=>setNotes(data))
  },[])


  const removing = (id)=>{
      fetch('http://localhost:8000/notes/' + id,{
        method:'DELETE',
      })
      const temp=notes.filter((e)=>e.id!==id)
      setNotes(temp);
  }

  const breakpoint={
    default:3,
    1100: 2,
    700: 1
  }

  return (
    <Container>
      <Masonry
      breakpointCols={breakpoint}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column">
            {notes.map((note)=>(
              <div md={6} sm={12} lg={4} key={note.id}>
                <NoteCard note={note} removing={removing}/>
              </div>
            ))}
      </Masonry>
    </Container>
  )
}