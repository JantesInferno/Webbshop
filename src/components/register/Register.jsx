import { Button, TextField } from '@mui/material';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const Register = () => {

    const [name, setName] = useState({ value: ''});
    const [address, setAddress] = useState({ value: ''});
    const [city, setCity] = useState({ value: ''});
    const [username, setUsername] = useState({ value: ''});
    const [email, setEmail] = useState({ value: ''});
    const [password, setPassword] = useState({ value: ''});
    const [isError, setIsError] = useState(false);

    const {createUserAccount} = useContext(AuthContext);

    const states = [name, address, city, email, username, password];

    const navigate = useNavigate();

    const createUser = (e) => {

        setIsError(false);

        let valid = true;
        states.map(state => {
            if (state.value == "" || (state.type === 'password' && state.value.length < 6)) {
                setIsError(true);
                valid = false;
            }
        })

        if (valid) {
            createUserAccount(name.value, address.value, city.value, email.value, username.value, password.value);
            navigate('/');
        }
        else {
            e.preventDefault();
        }

    }

 

    return(
        <>
            <div className='register' style={{ margin: '0 auto'}}>
                <form className='form'>
                <h1>Skapa nytt konto</h1>
                <TextField color="action" label="Namn" variant="filled" 
                value={name.value} error={ isError && name.value === "" } helperText={ isError && name.value === "" ? 'Obligatoriskt fält' : ''} 
                onChange={event => setName({ value: event.target.value })} 
                sx={{ width: '60%', marginBottom: '20px', input: { color: 'secondary.main' }, label: { color: 'secondary.main' } }} 
                />

                <TextField color="action" label="Adress" variant="filled" 
                value={address.value} error={ isError && address.value === "" } helperText={ isError && address.value === "" ? 'Obligatoriskt fält' : ''} 
                onChange={event => setAddress({ value: event.target.value })} 
                sx={{ width: '60%', marginBottom: '20px', input: { color: 'secondary.main' }, label: { color: 'secondary.main' } }} 
                />

                <TextField color="action" label="Ort" variant="filled" 
                value={city.value} error={ isError && city.value === "" } helperText={ isError && city.value === "" ? 'Obligatoriskt fält' : ''} 
                onChange={event => setCity({ value: event.target.value })} 
                sx={{ width: '60%', marginBottom: '20px', input: { color: 'secondary.main' }, label: { color: 'secondary.main' } }} 
                />

                <TextField color="action" label="Email" variant="filled" 
                value={email.value} error={ isError && email.value === "" } helperText={ isError && email.value === "" ? 'Obligatoriskt fält' : ''} 
                onChange={event => setEmail({ value: event.target.value })} 
                sx={{ width: '60%', marginBottom: '20px', input: { color: 'secondary.main' }, label: { color: 'secondary.main' } }} 
                />

                <TextField color="action" label="Användarnamn" variant="filled" 
                value={username.value} error={ isError && username.value === "" } helperText={ isError && username.value === "" ? 'Obligatoriskt fält' : ''} 
                onChange={event => setUsername({ value: event.target.value })} 
                sx={{ width: '60%', marginBottom: '20px', input: { color: 'secondary.main' }, label: { color: 'secondary.main' } }} 
                />

                <TextField color="action" label="Lösenord" variant="filled" 
                value={password.value} error={ isError && password.value.length < 6 } helperText={ isError && password.value.length < 6 ? 'Minst 6 tecken' : ''}
                onChange={event => setPassword({ type: 'password', value: event.target.value })} 
                sx={{ width: '60%', marginBottom: '20px', input: { color: 'secondary.main' }, label: { color: 'secondary.main' } }} 
                />

                <Button type='button' variant='body2' sx={{display: 'block', textTransform: 'none', color: 'secondary.main', bgcolor: '#256899', ':hover': { bgcolor: '#143954' }}}
                onClick={createUser}
                >
                    Skapa konto     
                </Button>
                </form>
            </div>
        </>
    )
}

export default Register;