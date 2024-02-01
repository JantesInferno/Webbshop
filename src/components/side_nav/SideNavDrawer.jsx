import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import ComputerIcon from '@mui/icons-material/Computer';
import MonitorIcon from '@mui/icons-material/Monitor';
import MouseIcon from '@mui/icons-material/Mouse';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import './sidenav.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { DBContext } from '../../contexts/DBContext';
import './sidenav.css';
import utf8 from "utf8";

const SideNavDrawer = () => {

    const { getCategoryProducts } = useContext(DBContext);
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        {
            text: 'Bildskärmar',
            icon: <MonitorIcon color='secondary' />
        },
        {
            text: 'Datorer',
            icon: <ComputerIcon color='secondary' />
        },
        {
            text: 'Datorkomponenter',
            icon: <DeveloperBoardIcon color='secondary' />
        },
        {
            text: 'Datortillbehör',
            icon: <MouseIcon color='secondary' />
        },
        {
            text: 'Telefoner',
            icon: <PhoneAndroidIcon color='secondary' />
        },
    ]

    return(
        <>
            <Drawer 
                anchor="left"
                variant="permanent"
                PaperProps={{
                    sx: {
                        width: '300px',
                        height: 'calc(100vh - 116px)',
                        position: 'inherit',
                        bgcolor: 'primary.main',
                        border: '1px solid #111',
                        borderTop: 'none'
                    }
                }}
            >
                <Typography variant='h5' textAlign={'left'} color={'secondary'} margin={'6%'}>Kategorier</Typography>
                <Divider variant='middle' color='white' />
                <List sx={{ marginTop: '-6px' }}>
                    { menuItems.map(item => (
                        <div key={item.text}>
                                <ListItem button className={'active'} sx={{ bgcolor: location.pathname == `/${item.text}/` ? '#111' : null , color: 'white', width: '90%', margin: '0 auto',  border: '2px solid transparent',  ':hover': { bgcolor: '#111', borderLeft: '2px solid #226e36'}}} onClick={() => {
                                    console.log(location.pathname);
                                    console.log(location.pathname == `/${item.text}/`)
                                    getCategoryProducts(item.text);
                                }}>
                                    <ListItemIcon >{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItem>
                            <Divider variant='middle' component="li" />
                        </div>
                    ))}
                    <Divider variant='middle' color='white' />
                    <ListItem key={'support'} button sx={{ color: 'white', width: '90%', margin: '0 auto', border: '2px solid transparent', ':hover': { bgcolor: '#111', borderLeft: '2px solid #226e36'}}} onClick={() => navigate('/customerservice')}>
                        <ListItemIcon><SupportAgentIcon color='secondary'/></ListItemIcon>
                        <ListItemText primary={'Kundtjänst'} />
                    </ListItem>
                    <Divider variant='middle'  color='white' />
                </List>

            </Drawer>
        </>
    )
}

export default SideNavDrawer;