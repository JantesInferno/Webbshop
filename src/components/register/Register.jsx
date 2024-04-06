import { Button, TextField } from '@mui/material';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const Register = () => {

    const [firstName, setFirstName] = useState({ value: ''});
    const [lastName, setLastName] = useState({ value: ''});
    const [email, setEmail] = useState({ value: ''});
    const [password, setPassword] = useState({ value: ''});
    const [isError, setIsError] = useState(false);

    const {createUserAccount} = useContext(AuthContext);

    const states = [firstName, lastName, email, password];

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
            createUserAccount(email.value, password.value, firstName.value, lastName.value);
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
                <TextField color="action" label="Förnamn" variant="filled" 
                value={firstName.value} error={ isError && firstName.value === "" } helperText={ isError && firstName.value === "" ? 'Obligatoriskt fält' : ''} 
                onChange={event => setFirstName({ value: event.target.value })} 
                sx={{ width: '60%', marginBottom: '20px', input: { color: 'secondary.main' }, label: { color: 'secondary.main' } }} 
                />

                <TextField color="action" label="Efternamn" variant="filled" 
                value={lastName.value} error={ isError && lastName.value === "" } helperText={ isError && lastName.value === "" ? 'Obligatoriskt fält' : ''} 
                onChange={event => setLastName({ value: event.target.value })} 
                sx={{ width: '60%', marginBottom: '20px', input: { color: 'secondary.main' }, label: { color: 'secondary.main' } }} 
                />

                <TextField color="action" label="Email" variant="filled" 
                value={email.value} error={ isError && email.value === "" } helperText={ isError && email.value === "" ? 'Obligatoriskt fält' : ''} 
                onChange={event => setEmail({ value: event.target.value })} 
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