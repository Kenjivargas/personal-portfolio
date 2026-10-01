import HomePage from './features/portfolio/pages/HomePage.jsx'
import { useTheme } from './shared/theme/useTheme.js'
import './App.css'

function App() {
  const { theme, toggleTheme } = useTheme()

  return <HomePage theme={theme} onToggleTheme={toggleTheme} />
}

export default App
