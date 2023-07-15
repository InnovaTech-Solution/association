import React, {useState} from 'react';
import {Box, Container, TextField, Button, InputAdornment} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function Login() {
    const [showRegistration, setShowRegistration] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const toggleRegistration = () => {
        setShowRegistration(!showRegistration);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

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
                    <h1 style={{marginBottom: '5rem', fontSize: '2rem'}}>
                        {showRegistration ? 'Inscription' : 'Connexion'}
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
                        {showRegistration && (
                            <TextField
                                sx={{
                                    width: '55vh',
                                    marginBottom: '1rem',
                                    justifyContent: 'center',
                                }}
                                label="Nom d'association"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <AccountCircleIcon/>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        )}
                        <TextField
                            sx={{
                                width: '55vh',
                                marginBottom: '1rem',
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
                            type={showPassword ? 'text' : 'password'}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {showPassword ? (
                                            <VisibilityIcon
                                                onClick={togglePasswordVisibility}
                                            />
                                        ) : (
                                            <VisibilityOffIcon
                                                onClick={togglePasswordVisibility}
                                            />
                                        )}
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Button variant="contained" type="submit" sx={{width: '20vh'}}>
                            {showRegistration ? 'S\'enregistrer' : 'Se connecter'}
                        </Button>
                        <Button
                            variant="text"
                            sx={{marginTop: '1rem'}}
                            onClick={toggleRegistration}
                        >
                            {showRegistration
                                ? 'Retour à la connexion'
                                : 'Pas encore membre ? Inscrivez-vous ici'}
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}
