export const getLocal = (key, fallback) => {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback } catch { return fallback }
}
export const setLocal = (key, val) => { try { localStorage.setItem(key, JSON.stringify(val)) } catch {} }
export const getSession = (key, fallback) => {
  try { const v = sessionStorage.getItem(key); return v ? JSON.parse(v) : fallback } catch { return fallback }
}
export const setSession = (key, val) => { try { sessionStorage.setItem(key, JSON.stringify(val)) } catch {} }

// Compat: API esperada por RecetasContext
export const storageUtils = {
  getItem: (key, fallback = {}) => getLocal(key, fallback),
  setItem: (key, val) => setLocal(key, val),
  removeItem: (key) => { try { localStorage.removeItem(key) } catch {} },
}
