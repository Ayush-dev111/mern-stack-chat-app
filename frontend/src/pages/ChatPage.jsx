import React from 'react'
import { useAuthStore } from '../store/useAuthStore'

const ChatPage = () => {
  const {logout} = useAuthStore()
  return (
      <button className='auth-btn text-3xl z-10' onClick={logout}>logout</button>

  )
}

export default ChatPage