import { Button, Divider, Drawer, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import './login.css';
import { Link } from 'react-router-dom';
import { NavbarContext } from '../../contexts/NavbarContext';
import { DBContext } from '../../contexts/DBContext';

const Login = () => {

    const {anchorLogin, handleCloseLoginMenu} = useContext(NavbarContext);
    const {signInUser} = useContext(DBContext);
    
    const [email, setEmail] = useState({ value: ''});
    const [password, setPassword] = useState({ value: ''});
    const [isError, setIsError] = useState(false);
    const [authError, setAuthError] = useState('');

    const states = [email, password];

    const validateInput = (e) => {

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
                signInUser(email.value, password.value).then(res => {

                console.log(res);

                if (res == 'Firebase: Error (auth/invalid-email).') {
                    setAuthError('Felaktig emailadress');
                }
                else if (res == 'Firebase: Error (auth/invalid-credential).') {
                    setAuthError('Felaktigt lösenord');
                }
                else {
                    setPassword({ value: ''});
                    setEmail({ value: ''});
                    handleCloseLoginMenu(e);
                }
            });
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
                        width: 400,
                        height: 'auto',
                        top: 108,
                        marginRight: '25px',
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

                                <TextField color='action' label="Email" variant="filled"
                                value={email.value} error={ isError && email.value === "" } helperText={ isError && email.value === "" ? 'Obligatoriskt fält' : ''}
                                onChange={event => setEmail({ value: event.target.value })}
                                sx={{ width: '60%', input: { color: 'secondary.main'}, label: { color: 'secondary.main' } }} />

                                <TextField color="action" label="Lösenord" variant="filled" 
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