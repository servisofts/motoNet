import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import AccountBox from '@material-ui/icons/AccountBox';
import Home from '@material-ui/icons/Home';
import RoomIcon from '@material-ui/icons/Room';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import logoMotoInicio from '../../img/MotoNetBR.svg';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));



const NaviDrawer = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const getButton = (data) => {
        return (
            <ListItem button key={data.name} selected={props.title == data.name} onClick={() => {
                if (props.title == data.name) { return };
                props.history.push("/" + data.path);
            }}>
                <ListItemIcon>
                    {data.icon}
                </ListItemIcon>
                <ListItemText primary={data.name} />
            </ListItem>
        )
    }
    const getnotify = () => {
        /*if (props.state.notificacionReducer.cantidad === 0) {
            return <div />
        }
        return (<div style={{
            position: "absolute",
            right: 10,
            top: 0,
            width: 20,
            height: 20,
            borderRadius: 100,
            background: "#ff000044",
            color: "#600",
            textAlign: "center"
        }}>
            {props.state.notificacionReducer.cantidad}
        </div>)*/
    }


    const getButtonNotifi = (data) => {

        return (
            <ListItem button key={data.name} selected={props.title == data.name} onClick={() => {
                if (props.title == data.name) { return };
                props.history.push("/" + data.path);
            }}>
                <ListItemIcon>

                    {getnotify()}
                    {data.icon}
                </ListItemIcon>
                <ListItemText primary={data.name} />
            </ListItem>
        )
    }
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={[clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                }), "secondary"]}
            >
                <Toolbar>
                    <Grid xs={2}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, {
                                [classes.hide]: open,
                            })}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Grid>
                    <Grid xs={9}>
                        <Typography variant="h6" noWrap>
                            {props.title || ""}
                        </Typography>
                    </Grid>
                    <Grid xs={1}>
                        <img src={logoMotoInicio} style={{ maxHeight: 50 }} alt={"logo"} />
                    </Grid>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {getButtonNotifi({ name: "Notificaciones", path: "Notificaciones", icon: <NotificationsIcon /> })}
                    {getButton({ name: "Inicio", path: "Inicio", icon: <Home /> })}
                    {getButton({ name: "Usuarios nuevos", path: "ListaUsuario", icon: <AccountBox /> })}
                    {getButton({ name: "Mapa", path: "MapaPage", icon: <RoomIcon/>})}
                    <div onClick={
                        () => {
                            sessionStorage.removeItem("usuarioLog");
                            window.location.href = "/";
                        }
                    }>Salir</div>
                </List>

            </Drawer>
            <main className={classes.content}>
                <div style={{ height: 50 }}></div>
                {props.page()}
            </main>
        </div>
    );
}
const initStates = (state) => {
    return { state }
};

export default connect(initStates)(NaviDrawer);