import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, IconButton } from '@mui/material';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import ComputerIcon from '@mui/icons-material/Computer';
import MonitorIcon from '@mui/icons-material/Monitor';
import MouseIcon from '@mui/icons-material/Mouse';
import MenuIcon from '@mui/icons-material/Menu';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { DBContext } from '../../contexts/DBContext';

const SideNavDrawer = () => {

    const { getCategoryProducts } = useContext(DBContext);

    const [mobileOpen, setMobileOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
        setMobileOpen(!mobileOpen);
        }
    };
    
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        {
            text: 'Bildskärmar',
            path: 'bildskarmar',
            icon: <MonitorIcon color='secondary' />
        },
        {
            text: 'Datorer',
            path: 'datorer',
            icon: <ComputerIcon color='secondary' />
        },
        {
            text: 'Datorkomponenter',
            path: 'datorkomponenter',
            icon: <DeveloperBoardIcon color='secondary' />
        },
        {
            text: 'Datortillbehör',
            path: 'datortillbehor',
            icon: <MouseIcon color='secondary' />
        },
        {
            text: 'Telefoner',
            path: 'telefoner',
            icon: <PhoneAndroidIcon color='secondary' />
        },
    ]

    const drawer = (
        <>
        <Typography variant='h5' textAlign={'left'} color={'secondary'} margin={'6%'}>Kategorier</Typography>
            <Divider variant='middle' color='white' />
            <List sx={{ marginTop: '-6px' }}>
                { menuItems.map(item => (
                    <div key={item.text}>
                            <ListItem button sx={{ 
                                bgcolor: location.pathname == `/${item.path}/` ? '#111' : null,
                                color: 'white', width: '90%', margin: '0 auto',  border: '2px solid transparent', 
                                borderLeft: location.pathname == `/${item.path}/` ? '2px solid #226e36' : null, 
                                ':hover': { bgcolor: '#282828', borderLeft: '2px solid #226e36' }}} 
                                onClick={() => navigate(`/${item.path}/`)}
                            >
                                <ListItemIcon >{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItem>
                        <Divider variant='middle' component="li" />
                    </div>
                ))}
                <Divider variant='middle' color='white' />
                <ListItem key={'support'} button sx={{ 
                    bgcolor: location.pathname == '/customerservice/' ? '#111' : null,
                    color: 'white', width: '90%', margin: '0 auto', border: '2px solid transparent',
                    borderLeft: location.pathname == '/customerservice/' ? '2px solid #226e36' : null,
                    ':hover': { bgcolor: '#282828', borderLeft: '2px solid #226e36' }}} 
                    onClick={() => navigate('/customerservice/')}
                >
                    <ListItemIcon><SupportAgentIcon color='secondary'/></ListItemIcon>
                    <ListItemText primary={'Kundtjänst'} />
                </ListItem>
                <Divider variant='middle'  color='white' />
            </List>
        </>
    );

    return(
        <>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ ml: 1, display: { sm: 'none' } }}
            >
                <MenuIcon />
                <Typography variant='h6' textAlign={'left'} color={'secondary'} margin={'6%'}>Kategorier</Typography>
            </IconButton>


            <Drawer
                variant="temporary"
                open={mobileOpen}
                onTransitionEnd={handleDrawerTransitionEnd}
                onClose={handleDrawerClose}
                ModalProps={{
                    keepMounted: true,
                }}
                PaperProps={{
                    sx: {
                        display: { xs: 'block', sm: 'none' },
                        width: '300px',
                        height: '50vh',
                        position: 'inherit',
                        bgcolor: 'primary.main',
                        border: '1px solid #111',
                        borderTop: 'none',
                        marginTop: '168px',
                        marginLeft: '8px'
                    }
                }}
            >
                {drawer}
            </Drawer>

            <Drawer 
                anchor="left"
                variant="permanent"
                PaperProps={{
                    sx: {
                        display: { xs: 'none', sm: 'block' },
                        width: '300px',
                        height: 'calc(100vh - 116px)',
                        position: 'inherit',
                        bgcolor: 'primary.main',
                        border: '1px solid #111',
                        borderTop: 'none'
                    }
                }}
            >
                {drawer}
            </Drawer>
        </>
    )
}

export default SideNavDrawer;