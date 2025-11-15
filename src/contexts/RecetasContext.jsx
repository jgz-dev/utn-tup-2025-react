import React, { createContext, useState, useContext, useEffect, useMemo, useRef, useCallback } from 'react';
import recetasData from '../data/recetas.json';
import { storageUtils } from '../utils/storage';
import { APP_CONFIG } from '../constants/app';

const RecetasContext = createContext();

export const useRecetas = () => {
    return useContext(RecetasContext);
};

export const RecetasProvider = ({ children }) => {
    const [recetas, setRecetas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todas');
    const [selectedDifficulty, setSelectedDifficulty] = useState('Todas');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(APP_CONFIG.PAGINATION.ITEMS_PER_PAGE);
    // Ordenamiento: 'rating_desc' | 'rating_asc' | 'difficulty_desc' | 'difficulty_asc'
    const [sortOption, setSortOption] = useState('rating_desc');
    const [userRatings, setUserRatings] = useState({}); // { recetaId: rating }
    const [ratingStats, setRatingStats] = useState({}); // { recetaId: { totalRating: sum, ratingCount: count, averageRating: avg } }
    const [userSessionRatings, setUserSessionRatings] = useState({}); // { recetaId: true } - Track votó en esta sesión
    const [favorites, setFavorites] = useState([]); // [id1, id2, id3...]

    // ===== OPTIMIZACIÓN: Carga asíncrona de datos para no bloquear el hilo principal =====
    useEffect(() => {
        const loadInitialData = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, APP_CONFIG.PAGINATION.LOADING_DELAY));
                setRecetas(recetasData);

                const storedRatings = storageUtils.getItem(APP_CONFIG.STORAGE_KEYS.USER_RATINGS, {});
                let storedRatingStats = storageUtils.getItem(APP_CONFIG.STORAGE_KEYS.RATING_STATS, {});
                const storedFavorites = storageUtils.getItem(APP_CONFIG.STORAGE_KEYS.FAVORITE_RECIPES, []);

                // Pre-popular stats si faltan, usando baseline de dataset para consistencia en ordenamiento
                if (!storedRatingStats || Object.keys(storedRatingStats).length === 0) {
                    storedRatingStats = recetasData.reduce((acc, r) => {
                        if (typeof r.rating === 'number' && typeof r.votes === 'number') {
                            acc[r.id] = {
                                totalRating: r.rating * r.votes,
                                ratingCount: r.votes,
                                averageRating: r.rating,
                            };
                        }
                        return acc;
                    }, {});
                    storageUtils.setItem(APP_CONFIG.STORAGE_KEYS.RATING_STATS, storedRatingStats);
                }

                setUserRatings(storedRatings);
                setRatingStats(storedRatingStats);
                setFavorites(storedFavorites);
                setLoading(false);
            } catch {
                setLoading(false);
            }
        };
        loadInitialData();
    }, []);

    const pageBeforeFilter = useRef(1);
    const wasFilteringRef = useRef(false);

    useEffect(() => {
        const isFiltering = searchTerm !== '' || selectedCategory !== 'Todas' || selectedDifficulty !== 'Todas';

        // Caso 1: El usuario EMPIEZA a filtrar
        if (isFiltering && !wasFilteringRef.current) {
            pageBeforeFilter.current = currentPage; // Guardamos la página actual
            setCurrentPage(1);
        }

        // Caso 2: El usuario LIMPIA todos los filtros
        if (!isFiltering && wasFilteringRef.current) {
            setCurrentPage(pageBeforeFilter.current);
        }

        // Actualizamos la referencia para la siguiente ejecución
        wasFilteringRef.current = isFiltering;
    }, [searchTerm, selectedCategory, selectedDifficulty, currentPage]);

    // Función para actualizar la calificación de una receta
    // SISTEMA: 1 voto por sesión, bloquea después, permite votar nuevamente tras refrescar
    const updateRecipeRating = useCallback((recipeId, newRating) => {
        // ===== VALIDACIÓN: Rechazar votos inválidos =====
        if (newRating === null || newRating === 0 || !Number.isInteger(newRating) || newRating < 1 || newRating > 5) {
            return false;
        }
        
        // Si ya votó en esta sesión, no permitir votación
        if (userSessionRatings[recipeId]) {
            return false; // No permitir votación
        }

        // ===== ACTUALIZACIÓN ATÓMICA =====
        // Leer el estado ACTUAL desde localStorage (single source of truth)
        const currentStoredStats = storageUtils.getItem(APP_CONFIG.STORAGE_KEYS.RATING_STATS, {});
        let currentStats = currentStoredStats[recipeId];
        if (!currentStats) {
            // Baseline desde dataset si primer voto
            const base = recetasData.find(r => r.id === parseInt(recipeId));
            if (base && typeof base.rating === 'number' && typeof base.votes === 'number') {
                currentStats = {
                    totalRating: base.rating * base.votes,
                    ratingCount: base.votes,
                    averageRating: base.rating,
                };
            } else {
                currentStats = { totalRating: 0, ratingCount: 0, averageRating: 0 };
            }
        }
        
        // Calcular nuevas estadísticas
        const newTotalRating = currentStats.totalRating + newRating;
        const newRatingCount = currentStats.ratingCount + 1;
        const newAverageRating = newTotalRating / newRatingCount;
        
        // Preparar estadísticas actualizadas
        const newStats = {
            totalRating: newTotalRating,
            ratingCount: newRatingCount,
            averageRating: newAverageRating
        };
        
        const updatedStats = {
            ...currentStoredStats,
            [recipeId]: newStats
        };

        // ===== GUARDAR TODO EN localStorage PRIMERO =====
        storageUtils.setItem(APP_CONFIG.STORAGE_KEYS.RATING_STATS, updatedStats);
        
        // ===== LUEGO ACTUALIZAR ESTADO React =====
        // 1. Actualizar ratingStats
        setRatingStats(updatedStats);

        // 2. Guardar voto del usuario
        // No persistimos userRating para UX limpia al refrescar (solo stats globales)

        // 3. Marcar como que ya votó en esta sesión
        setUserSessionRatings(prevSession => ({ ...prevSession, [recipeId]: true }));

        return true; // Votación permitida
    }, [userSessionRatings]);

    // Función para obtener la calificación de una receta (prioriza la del usuario)
    const getRecipeRating = useCallback((recipeId) => {
        return userRatings[recipeId] || 0;
    }, [userRatings]);

    // Función para verificar si el usuario ya votó en esta sesión
    const hasUserVotedThisSession = useCallback((recipeId) => {
        return userSessionRatings[recipeId] || false;
    }, [userSessionRatings]);

    // Función para obtener las estadísticas de rating de una receta
    const getRatingStats = useCallback((recipeId) => {
        const stats = ratingStats[recipeId];
        if (stats) return stats;
        // Fallback a valores iniciales del dataset (para mostrar promedio y votos desde el comienzo)
        const r = recetasData.find(r => r.id === parseInt(recipeId));
        if (r && typeof r.rating === 'number' && typeof r.votes === 'number') {
            return {
                totalRating: r.rating * r.votes,
                ratingCount: r.votes,
                averageRating: r.rating,
            };
        }
        return { totalRating: 0, ratingCount: 0, averageRating: 0 };
    }, [ratingStats]);

    // Función para agregar/remover de favoritos
    const toggleFavorite = useCallback((recipeId) => {
        let isAdded = false;
        setFavorites(prevFavorites => {
            let updatedFavorites;
            if (prevFavorites.includes(recipeId)) {
                updatedFavorites = prevFavorites.filter(id => id !== recipeId);
                isAdded = false;
            } else {
                updatedFavorites = [...prevFavorites, recipeId];
                isAdded = true;
            }
            storageUtils.setItem(APP_CONFIG.STORAGE_KEYS.FAVORITE_RECIPES, updatedFavorites);
            return updatedFavorites;
        });
        return isAdded;
    }, []);

    // Función para verificar si una receta es favorita
    const isFavorite = useCallback((recipeId) => {
        return favorites.includes(recipeId);
    }, [favorites]);

    const categories = useMemo(() => {
        const allCategories = recetasData.map(receta => receta.categoria);
        return ['Todas', ...new Set(allCategories)];
    }, []);

    const difficulties = useMemo(() => {
        const allDifficulties = recetasData.map(receta => receta.dificultad);
        return ['Todas', ...new Set(allDifficulties)];
    }, []);

    // Utilidad: normalizar cadenas (minúsculas y sin acentos)
    const normalize = useCallback((str) => (str || '')
        .toString()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, ''), []);

    // ===== OPTIMIZACIÓN: Filtrado en pasos separados para mejor rendimiento =====
    const filteredRecetas = useMemo(() => {
        let tempRecetas = recetas;

        if (selectedCategory && selectedCategory !== 'Todas') {
            tempRecetas = tempRecetas.filter(receta => receta.categoria === selectedCategory);
        }

        if (selectedDifficulty && selectedDifficulty !== 'Todas') {
            tempRecetas = tempRecetas.filter(receta => receta.dificultad === selectedDifficulty);
        }

        if (searchTerm) {
            const q = normalize(searchTerm).trim();
            if (q) {
                tempRecetas = tempRecetas.filter(receta => {
                    const title = normalize(receta.titulo);
                    const words = title.split(/[^a-z0-9ñü]+/);
                    return words.some(w => w.startsWith(q));
                });
            }
        }

        // Ordenamiento
        const diffOrder = { 'Fácil': 1, 'Media': 2, 'Difícil': 3 };
        const getAvg = (id) => {
            const stats = ratingStats[id];
            if (stats) return stats.averageRating || 0;
            const r = recetasData.find(r => r.id === parseInt(id));
            return r && typeof r.rating === 'number' ? r.rating : 0;
        };
        const sorted = [...tempRecetas].sort((a, b) => {
            switch (sortOption) {
                case 'rating_asc':
                    return getAvg(a.id) - getAvg(b.id);
                case 'rating_desc':
                    return getAvg(b.id) - getAvg(a.id);
                case 'difficulty_asc':
                    return (diffOrder[a.dificultad] || 0) - (diffOrder[b.dificultad] || 0);
                case 'difficulty_desc':
                    return (diffOrder[b.dificultad] || 0) - (diffOrder[a.dificultad] || 0);
                default:
                    return 0;
            }
        });

        return sorted;
    }, [recetas, selectedCategory, selectedDifficulty, searchTerm, sortOption, ratingStats]);

    const totalPages = useMemo(() => {
        const calculatedPages = Math.ceil(filteredRecetas.length / itemsPerPage);
        return calculatedPages > 0 ? calculatedPages : 1;
    }, [filteredRecetas, itemsPerPage]);

    // Indica si realmente debemos mostrar paginación (cuando excede el límite por página)
    const shouldShowPagination = useMemo(() => filteredRecetas.length > itemsPerPage, [filteredRecetas.length, itemsPerPage]);

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
        // Si todas las recetas entran en una sola página, forzar página 1
        if (!shouldShowPagination && currentPage !== 1) {
            setCurrentPage(1);
        }
    }, [currentPage, totalPages, setCurrentPage, shouldShowPagination]);

    const currentItems = useMemo(() => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        return filteredRecetas.slice(indexOfFirstItem, indexOfLastItem);
    }, [filteredRecetas, currentPage, itemsPerPage]);

    const getRecetaById = useCallback((id) => {
        return recetasData.find(receta => receta.id === parseInt(id));
    }, []);

    const value = {
        recetas: currentItems,
        allRecetas: recetas,
        allFilteredRecetas: filteredRecetas,
        loading,
        getRecetaById,
        searchTerm,
        setSearchTerm,
        categories,
        selectedCategory,
        setSelectedCategory,
        difficulties,
        selectedDifficulty,
        setSelectedDifficulty,
        currentPage,
        setCurrentPage,
        itemsPerPage,
        setItemsPerPage,
        sortOption,
        setSortOption,
        totalPages,
    shouldShowPagination,
        updateRecipeRating,
        getRatingStats,
        hasUserVotedThisSession,
        toggleFavorite,
        isFavorite,
    };

    return (
        <RecetasContext.Provider value={value}>
            {children}
        </RecetasContext.Provider>
    );
}
