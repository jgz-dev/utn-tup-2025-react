import { useMemo, useState } from 'react';
import { Skeleton, Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import RecetaCard from './RecetaCard';
import { useRecetas } from '../../contexts/RecetasContext';
import RecetaModal from './RecetaModal';

const RecetasList = ({ recetas, paginar = true }) => {
    const { loading, currentPage, itemsPerPage } = useRecetas();
    const [selectedReceta, setSelectedReceta] = useState(null);

    const handleOpenModal = (receta) => {
        setSelectedReceta(receta);
    };
    
    const handleCloseModal = () => {
        setSelectedReceta(null);
    };

    // Lógica de paginación condicional
    const recetasAMostrar = useMemo(() => {
        if (!paginar) return recetas;
        const start = (currentPage - 1) * itemsPerPage;
        const end = currentPage * itemsPerPage;
        return recetas.slice(start, end);
    }, [paginar, recetas, currentPage, itemsPerPage]);

    return (
        <>
            <Grid
                container
                spacing={3}
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        sm: 'repeat(2, 1fr)',
                        md: 'repeat(3, 1fr)',
                    },
                    gap: 3,
                    '& > div': {
                        minWidth: 0, // Importante para que funcione correctamente
                    }
                }}
            >
                {loading ? (
                    Array.from(new Array(6)).map((_, index) => (
                        <Box key={index}>
                            <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 2 }} />
                            <Box sx={{ pt: 0.5 }}>
                                <Skeleton />
                                <Skeleton width="60%" />
                            </Box>
                        </Box>
                    ))
                ) : recetasAMostrar.length > 0 ? (
                    recetasAMostrar.map((receta, index) => (
                        <RecetaCard
                            key={receta.id}
                            receta={receta}
                            onOpenModal={() => handleOpenModal(receta)}
                            index={index}
                        />
                    ))
                ) : (
                    <Box sx={{ textAlign: 'center', py: 8, width: '100%', gridColumn: '1 / -1' }}>
                        <Typography variant="h6">
                            No se encontraron recetas que coincidan con tu búsqueda.
                        </Typography>
                    </Box>
                )}
            </Grid>

            <RecetaModal receta={selectedReceta} open={Boolean(selectedReceta)} onClose={handleCloseModal} />
        </>
    );
};

export default RecetasList;
