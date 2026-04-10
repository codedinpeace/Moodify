import React, { useEffect } from 'react'
import Router from './Router'
import { useAuth } from './features/auth/hooks/useAuth'

const App = () => {

  const {handleCheck} = useAuth()

  useEffect(()=>{
    (async ()=>{
      await handleCheck()
    })();
  },[])

  return (
    <div>
      <Router />
    </div>
  )
}

export default App