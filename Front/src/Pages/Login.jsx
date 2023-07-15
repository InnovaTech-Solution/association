import React from 'react';
import {Box, Container, TextField, Button, InputAdornment} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';

export default function Login() {
    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                position: 'relative',
            }}
        >
            <img
                src={"https://source.unsplash.com/random"}
                alt={"background"}
                style={{
                    filter: 'brightness(50%)',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    width: '100%',
                    maxHeight: '100vh',
                    objectFit: 'cover',
                    position: 'absolute',
                    objectPosition: 'center',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: -1,
                }}
            />
            <Container
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
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
                        alignContent: 'center',
                    }}
                >
                    <h1 style={{marginBottom: '1rem', fontSize: '2rem'}}>
                        Connexion
                    </h1>
                    <Box
                        component="form"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <TextField
                            sx={{
                                width: '55vh',
                                marginBottom: '1rem',
                                justifyContent: 'center',
                            }}
                            label="Nom d'utilisateur"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <AccountCircleIcon/>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            sx={{
                                width: '55vh',
                                marginBottom: '1rem',
                            }}
                            label="Mot de passe"
                            type="password"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <LockIcon/>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Button variant="contained" type={'submit'} sx={{width: '20vh'}}>
                            Connexion
                        </Button>
                        <Button
                            variant="text"
                            sx={{marginTop: '1rem'}}
                            onClick={() => {
                                window.location.href = '/register';
                            }}
                        >
                            Pas encore membre ? Inscrivez-vous ici
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};
