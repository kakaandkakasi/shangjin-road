import { createGlobalStyle } from 'styled-components'

export const theme = {
  colors: {
    bgPrimary: '#ffffff',
    bgSecondary: '#fafafa',
    bgTertiary: '#f5f5f5',
    textPrimary: '#111111',
    textSecondary: '#666666',
    textTertiary: '#999999',
    accent: '#8b5cf6',
    accentHover: '#7c3aed',
    accentLight: '#f5f3ff',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    border: '#e5e5e5',
    borderHover: '#d4d4d4',
  },
  fonts: {
    body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.06)',
    md: '0 4px 12px rgba(0,0,0,0.08)',
    lg: '0 20px 40px rgba(0,0,0,0.15)',
  },
  radius: {
    sm: '4px',
    md: '6px',
    lg: '8px',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    xxl: '32px',
    xxxl: '48px',
  },
}

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: ${props => props.theme.fonts.body};
    color: ${props => props.theme.colors.textPrimary};
    background: ${props => props.theme.colors.bgSecondary};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.3;
  }
  
  a {
    color: inherit;
    text-decoration: none;
  }
  
  button {
    font-family: inherit;
    cursor: pointer;
  }
  
  input, textarea, select {
    font-family: inherit;
  }
`
