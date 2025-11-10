import Taro from '@tarojs/taro'
import { create } from 'zustand'

export interface UserLogin {
  id: number
  refreshToken: string
  accessToken: string
}

export interface UserProfile {
  id: number
  username: string
  email: string
  avatarUrl?: string
}

export interface User {
  profile: UserProfile
  tokens: UserLogin
}

interface UserState {
  user: User | null
  isLoggedIn: boolean
  setUser: (user: User) => void
  clearUser: () => void
  logout: () => void
}

const taroStorage = {
  getItem: (name: string) => {
    try {
      return Taro.getStorageSync(name)
    } catch {
      return null
    }
  },
  setItem: (name: string, value: string) => {
    try {
      Taro.setStorageSync(name, value)
    } catch {
      console.error('Storage set failed')
    }
  },
  removeItem: (name: string) => {
    try {
      Taro.removeStorageSync(name)
    } catch {
      console.error('Storage remove failed')
    }
  },
}

export const useUserStore = create<UserState>(set => ({
  user: null,
  isLoggedIn: false,
  setUser: (user: User) => {
    set({ user, isLoggedIn: true })
    taroStorage.setItem('app-user-info', JSON.stringify(user))
  },
  clearUser: () => {
    set({ user: null, isLoggedIn: false })
    taroStorage.removeItem('app-user-info')
  },
  logout: () => {
    set({ user: null, isLoggedIn: false })
    taroStorage.removeItem('app-user-info')
  },
}))

export const getAccessToken = (): string | null => {
  const user = useUserStore.getState().user
  return user ? user.tokens.accessToken : null
}
