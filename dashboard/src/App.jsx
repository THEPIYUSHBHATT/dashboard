
import {WidgetContextProvider} from './context/WidgetContextProvider'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <WidgetContextProvider>
      <Dashboard />
    </WidgetContextProvider>
  )
}

export default App
