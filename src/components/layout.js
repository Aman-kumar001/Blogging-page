import {AppBar, Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles, Toolbar, Typography } from "@material-ui/core";
import { AddCircleOutlined, SubjectOutlined } from "@material-ui/icons";
import { useHistory, useLocation } from "react-router";
import CreateIcon from '@material-ui/icons/Create';
import {format} from 'date-fns';
// styling
const Drawerwidth = 240;
const style=makeStyles({
    page:{
        background:"#f9f9f9",
        width:'100%'
    },
    heading:{
        padding:"20px",
        fontWeight:'bolder'
    },
    drawer:{
        width:Drawerwidth
    },
    paperWidth:{
        width:Drawerwidth
    },
    display:{
        display:`flex`
    },
    active:{
        backgroundColor:"#f4f4f4"
    },
    appbar:{
        width:`calc(100% - ${Drawerwidth}px)`
    },
    toolbar:{
        height:'70px',
        // border:'1px black solid'
    }

})

const Layout = ( {children}) => {
    const classes=style();
    const history=useHistory();
    const location=useLocation();
    const menuItems=[
        {
            text:'My writings',
            icon:<SubjectOutlined color="primary"/>,
            path:'/'
        },
        {
            text:'Create New',
            icon:<AddCircleOutlined color="primary"/>,
            path:'/create'
        }
    ]
    return ( 
        <div className={classes.display}>


            {/* Appbar */}
            <AppBar className={classes.appbar} elevation={0}>
                <Toolbar>
                    <Typography>
                        {format(new Date(),'do MMMM Y')}
                    </Typography>
                </Toolbar>
            </AppBar>


            {/* Drawer */}
            <Drawer 
                variant="permanent"
                className={classes.drawer}
                anchor="left"
                classes={{paper:classes.paperWidth}}
            >
                <div>
                    <Typography variant="h4" className={classes.heading} color='primary'>
                        <CreateIcon/>Blogs
                    </Typography>
                </div>

                {/* list-links */}
                <List>
                    {menuItems.map(e=>(
                        <ListItem key={e.text} button onClick={()=>history.push(e.path)}
                        className={location.pathname==e.path ? classes.active:null}
                        >
                            <ListItemIcon>
                                {e.icon}
                            </ListItemIcon>
                            <ListItemText>{e.text}</ListItemText>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        
            <div className={classes.page}>
            {/* empty for sizing */}
                <div className={classes.toolbar}></div>
                {children}
            </div>
        </div>
     );
}
 
export default Layout;