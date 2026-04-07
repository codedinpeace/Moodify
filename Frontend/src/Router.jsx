import React from 'react'
import { Route, Routes } from 'react-router-dom'
import FaceEmotionDetector from './features/faceDetection/FaceEmotionDetector'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'

const Router = () => {
  return (
    <>
        <Routes>
            <Route path='/' element={<FaceEmotionDetector />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
        </Routes>
    </>
  )
}

export default Router