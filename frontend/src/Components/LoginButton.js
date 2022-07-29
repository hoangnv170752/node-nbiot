import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '@mui/material/Button';

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();
  return (
    // <button onClick={() => loginWithRedirect()}>
    //     Login
    // </button>
    <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={() => loginWithRedirect()}
        >
        Sign In
    </Button>
  )
}

export default LoginButton