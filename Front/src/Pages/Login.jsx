import React from 'react';
import { Box, Container, TextField, Button, InputAdornment } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';

export default function Login() {
    return (
        <Box
            sx={{
                height: '100vh',
                backgroundImage: 'url(https://source.unsplash.com/random)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box
                    sx={{
                        height: '60vh',
                        width: '60vh',
                        backgroundColor: 'white',
                        borderRadius: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <h1 style={{ marginBottom: '1rem' }}>Connexion</h1>
                    <form>
                        <TextField
                            sx={{
                                width: '55vh',
                                marginLeft: '1rem',
                                marginBottom: '1rem',
                                justifyContent: 'center',
                            }}
                            label="Nom d'utilisateur"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <AccountCircleIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            sx={{
                                width: '55vh',
                                marginLeft: '1rem',
                                marginBottom: '1rem',
                            }}
                            label="Mot de passe"
                            type="password"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <LockIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Button variant="contained" sx={{ width: '20vh'}}>
                            Connexion
                        </Button>
                    </form>
                </Box>
            </Container>
        </Box>
    );
};
