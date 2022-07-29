import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import Button from '@mui/material/Button';

const LogoutButton = () => {
    const { logout, isAuthenticated } = useAuth0();
    return (
        isAuthenticated && (
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color='error'
            sx={{ mt: 3, mb: 2 }}
            onClick={() => logout()}
            >
            Sign out
        </Button>
        )
    )
}

export default LogoutButton