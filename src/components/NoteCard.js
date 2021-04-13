import { Avatar, Card, CardContent, CardHeader, IconButton, makeStyles, Typography } from "@material-ui/core";
import { DeleteOutlined } from "@material-ui/icons";
import {blue,green,yellow} from '@material-ui/core/colors'
const style=makeStyles({
    avatar:{
        backgroundColor:(note)=>{
            if(note.category=='Fun'){
                return yellow[700]
            }
            if(note.category=='News'){
                return green[500]
            }
            return blue[500]
        }
    }
});

const NoteCard = ({ note, removing}) => {
    const classes=style(note);
    return ( 
        <Card>
            <CardHeader
                avatar={
                    <Avatar 
                    className={classes.avatar}
                    >{note.category[0]}</Avatar>
                }
                action={
                    <IconButton onClick={()=>removing(note.id) }>
                        <DeleteOutlined/>
                    </IconButton>
                }
                title={note.name}
                subheader={note.category}
            />
            <CardContent>
                <Typography variant="body1" color="textsecondary">
                    {note.content}
                </Typography>
            </CardContent>
        </Card>
     );
}
 
export default NoteCard;