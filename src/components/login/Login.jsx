import { Button, Divider, Drawer, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import './login.css';
import { Link } from 'react-router-dom';
import { NavbarContext } from '../../contexts/NavbarContext';
import { DBContext } from '../../contexts/DBContext';
import { AuthContext } from '../../contexts/AuthContext';

const Login = () => {

    const {anchorLogin, handleCloseLoginMenu} = useContext(NavbarContext);
    const {signInUser} = useContext(AuthContext);
    
    const [username, setUsername] = useState({ value: ''});
    const [password, setPassword] = useState({ value: ''});
    const [isError, setIsError] = useState(false);
    const [authError, setAuthError] = useState('');

    const states = [username, password];

    const validateInput = async (e) => {

        setAuthError('');

        setIsError(false);

        let valid = true;
        states.map(state => {
            if (state.value == "" || (state.type === 'password' && state.value.length < 6)) {
                setIsError(true);
                valid = false;
            }
        })

        if (valid) {
                const res = await signInUser(username.value, password.value);

                if (res == 401) {
                    setAuthError('Felaktigt användarnamn/lösenord');
                }
                else if (res == 400) {
                    setAuthError('Fyll i alla fält');
                }
                else if (res == 200) {
                    setPassword({ value: ''});
                    setUsername({ value: ''});
                    handleCloseLoginMenu(e);
                }
                else {
                    setAuthError('Det uppstod ett oväntat fel. Försök att logga in senare');
                }
        }
        e.preventDefault();

    }

    return(
        <>
            <Drawer 
                anchor='right'
                className="menuAppbar"
                keepMounted
                open={Boolean(anchorLogin)}
                onClose={handleCloseLoginMenu}
                PaperProps={{
                    sx: {
                        width: window.matchMedia("(min-width: 900px)").matches ? 400 : 'calc(100vw - 16px)',
                        height: 'auto',
                        top: 108,
                        marginRight: window.matchMedia("(min-width: 900px)").matches ? '25px' : '8px',
                        bgcolor: 'primary.main'
                    }
                }}
                >
                        <form className='form'>
                            <div className='login'>
                                <h1>Logga in</h1>
                                {authError != '' ? (
                                <h4 style={{color: '#ad443d', margin: '0', padding: '0'}}>{authError}</h4>
                                ) : null }

                                <TextField color='action' label="Username" type="text" variant="filled"
                                value={username.value} error={ isError && username.value === "" } helperText={ isError && username.value === "" ? 'Obligatoriskt fält' : ''}
                                onChange={event => setUsername({ value: event.target.value })}
                                sx={{ width: '60%', input: { color: 'secondary.main'}, label: { color: 'secondary.main' } }} />

                                <TextField color="action" label="Lösenord" type="password" variant="filled" 
                                value={password.value} error={ isError && password.value.length < 6 } helperText={ isError && password.value.length < 6 ? 'Minst 6 tecken' : ''}
                                onChange={event => setPassword({ type: 'password', value: event.target.value })} 
                                sx={{ width: '60%', input: { color: 'secondary.main' }, label: { color: 'secondary.main' } }} />

                                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around', width: '60%'}}>
                                    <Typography variant='body2' textAlign="left" sx={{ color: 'secondary.main' }}>Ny användare?</Typography>
                                    <Link to='/register' >
                                        <Button type="submit" variant='body2' sx={{textTransform: 'none', color: 'secondary.main', bgcolor: '#256899', ':hover': { bgcolor: '#143954' }}} onClick={handleCloseLoginMenu}>
                                            Skapa konto     
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                            
                            <Button type='button' sx={{bottom: 0, width: '100%', position: 'absolute', color: 'secondary.main', bgcolor: 'action.main', ':hover': { bgcolor: '#123d1e' }}} onClick={validateInput} >
                                Logga in
                            </Button>
                        </form>
                
            </Drawer>
        </>
    )
}

export default Login;