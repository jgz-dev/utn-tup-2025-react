import Navbar from './Navbar';
import Footer from './Footer';
import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <Box component="main" sx={{ flexGrow: 1 }}>
                <Container maxWidth="md" sx={{ py: 3 }}>
                    <Outlet />
                </Container>
            </Box>
            <Footer />
        </Box>
    );
}