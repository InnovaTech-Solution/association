import React, {useState} from 'react';
import {
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Select,
    MenuItem,
    InputLabel
} from '@mui/material';

export default function Home() {
    const [showPopup, setShowPopup] = useState(false);
    const [bugLocation, setBugLocation] = useState('');
    const [details, setDetails] = useState('');
    const [deviceUsed, setDeviceUsed] = useState('');

    const openPopup = () => {
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logique d'envoi du formulaire ou autre action souhaitée
        closePopup();
    };

    const handleDeviceChange = (e) => {
        setDeviceUsed(e.target.value);
    };

    return (
        <div>
            <Dialog open={showPopup} onClose={closePopup}>
                <DialogTitle>Bug à signaler</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <TextField
                            label="Où le bug a été trouvé"
                            value={bugLocation}
                            onChange={(e) => setBugLocation(e.target.value)}
                            required
                            fullWidth
                            sx={{marginBottom: '1rem'}}
                        />

                        <TextField
                            label="Détails"
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            required
                            fullWidth
                            sx={{marginBottom: '1rem'}}
                        />

                        <InputLabel id="device-label">Appareil utilisé</InputLabel>
                        <Select
                            labelId="device-label"
                            value={deviceUsed}
                            onChange={handleDeviceChange}
                            required
                            fullWidth
                            sx={{marginBottom: '1rem'}}
                        >
                            <MenuItem value="ordinateur">Ordinateur</MenuItem>
                            <MenuItem value="telephone">Téléphone</MenuItem>
                            <MenuItem value="tablette">Tablette</MenuItem>
                        </Select>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={closePopup}>Annuler</Button>
                        <Button type="submit">Envoyer</Button>
                    </DialogActions>
                </form>
            </Dialog>

            <Button
                variant="contained"
                onClick={openPopup}
                sx={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                }}
            >
                Bug à signaler
            </Button>
        </div>
    );
}
