export const buttonStyles = {
  outlineButton: (theme) => ({
    textTransform: 'none',
    fontWeight: 600,
    borderRadius: '10px',
    borderWidth: 2,
    '&:hover': {
      borderColor: theme.palette.mode === 'dark' ? '#e2e8f0' : '#1a202c',
      backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
    },
  }),
  outlineButtonWithTransform: (theme) => ({
    textTransform: 'none',
    fontWeight: 600,
    borderRadius: '10px',
    transition: 'all .25s',
    borderWidth: 2,
    '&:hover': {
      transform: 'translateY(-3px)',
      boxShadow: theme.palette.mode === 'dark'
        ? '0 8px 24px rgba(0,0,0,0.4)'
        : '0 8px 20px rgba(0,0,0,0.15)',
    },
    '&:active': { transform: 'translateY(0)' },
  }),
}
