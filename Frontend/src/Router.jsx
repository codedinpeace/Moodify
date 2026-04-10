import React, { useContext } from 'react'
import { Route, Routes, Navigate} from 'react-router-dom'
import FaceEmotionDetector from './features/faceDetection/FaceEmotionDetector'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import { AuthContext } from './features/auth/context/auth.context'

const Router = () => {  

  const context = useContext(AuthContext)

  const {loggedin } = context


  return (
    <>
        <Routes>
            <Route path='/' element={loggedin ? <FaceEmotionDetector /> : <Navigate to="/login"/>} />
            <Route path='/login' element={loggedin ?  <Navigate to="/"/> : <Login />} />
            <Route path='/register' element={loggedin ?  <Navigate to="/"/> : <Register />} />
        </Routes>
    </>
  )
}

export default Router