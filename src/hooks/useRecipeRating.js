import { useCallback, useMemo, useState } from 'react';
import { useRecetas } from '../contexts/RecetasContext';

// Hook para encapsular lógica de rating por receta
export default function useRecipeRating(recipeId) {
  const {
    updateRecipeRating,
    getRatingStats,
    hasUserVotedThisSession
  } = useRecetas();

  // UI limpia al refrescar: no precargar la calificación del usuario;
  // se reinicia a 0 en cada nueva sesión de página.
  const [userRating, setUserRating] = useState(0);

  const ratingStats = useMemo(() => {
    if (!recipeId) return { totalRating: 0, ratingCount: 0, averageRating: 0 };
    return getRatingStats ? getRatingStats(recipeId) : { totalRating: 0, ratingCount: 0, averageRating: 0 };
  }, [recipeId, getRatingStats]);

  const isVotedThisSession = useMemo(() => {
    if (!recipeId) return false;
    return hasUserVotedThisSession ? hasUserVotedThisSession(recipeId) : false;
  }, [recipeId, hasUserVotedThisSession]);

  const handleRatingChange = useCallback((_, newValue) => {
    if (!recipeId) return;
    if (!newValue) return;
    const ok = updateRecipeRating(recipeId, newValue);
    if (ok) setUserRating(newValue);
  }, [recipeId, updateRecipeRating]);

  return { userRating, ratingStats, isVotedThisSession, handleRatingChange };
};

export { useRecipeRating };
