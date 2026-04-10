import React, { useEffect } from 'react'
import Router from './Router'
import { useAuth } from './features/auth/hooks/useAuth'

const App = () => {

  const {handleCheck} = useAuth()

  useEffect(()=>{ 
    handleCheck()
  }, [])

  return (
    <div>
      <Router />
    </div>
  )
}

export default App