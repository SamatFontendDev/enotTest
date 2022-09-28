import React, { useState } from 'react'
import {QueryClient, QueryClientProvider} from 'react-query'
import MyTicker from './components/Ticker'
import TasksList from './components/TasksList'
import ThemeContext from './context'


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

const App = () => {
  const [stringShow, setStringShow] = useState(true)

  return(
    <QueryClientProvider client={queryClient}>
      <ThemeContext.Provider value={{stringShow, setStringShow}}>
        <TasksList/>
        <MyTicker/>
      </ThemeContext.Provider>
    </QueryClientProvider>
  )
}

export default App