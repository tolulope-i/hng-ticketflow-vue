import { ref, computed } from 'vue'

const user = ref(null)
const loading = ref(true)

export function useAuth() {
  const initializeDemoUsers = () => {
    const users = JSON.parse(localStorage.getItem('ticketapp_users') || '[]')
    if (users.length === 0) {
      const demoUsers = [
        {
          id: 1,
          name: 'Demo User',
          email: 'demo@ticketflow.com',
          password: 'demo123',
        },
        {
          id: 2,
          name: 'Dev Tolu',
          email: 'tolu@gmail.com',
          password: 'tolu123',
        },
      ]
      localStorage.setItem('ticketapp_users', JSON.stringify(demoUsers))
    }
  }

  const loadUser = () => {
    const session = localStorage.getItem('ticketapp_session')
    const users = JSON.parse(localStorage.getItem('ticketapp_users') || '[]')

    if (session) {
      try {
        const userData = JSON.parse(session)
        const userExists = users.find((u) => u.email === userData.email)
        if (userExists) {
          user.value = userData
        } else {
          localStorage.removeItem('ticketapp_session')
        }
      } catch (error) {
        localStorage.removeItem('ticketapp_session')
      }
    }
    loading.value = false
  }

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        initializeDemoUsers()
        const users = JSON.parse(localStorage.getItem('ticketapp_users') || '[]')
        const foundUser = users.find((u) => u.email === email && u.password === password)

        if (foundUser) {
          const userData = {
            id: foundUser.id,
            email: foundUser.email,
            name: foundUser.name,
          }
          user.value = userData
          localStorage.setItem('ticketapp_session', JSON.stringify(userData))
          resolve(userData)
        } else {
          reject(new Error('Invalid email or password'))
        }
      }, 1000)
    })
  }

  const signup = (name, email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        initializeDemoUsers()
        const users = JSON.parse(localStorage.getItem('ticketapp_users') || '[]')

        const existingUser = users.find((u) => u.email === email)
        if (existingUser) {
          reject(new Error('User with this email already exists'))
          return
        }

        if (!name || !email || !password) {
          reject(new Error('Please fill all fields'))
          return
        }

        if (password.length < 6) {
          reject(new Error('Password must be at least 6 characters'))
          return
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
          reject(new Error('Please enter a valid email address'))
          return
        }
        const newUser = {
          id: Date.now(),
          name,
          email,
          password,
          createdAt: new Date().toISOString(),
        }

        const updatedUsers = [...users, newUser]
        localStorage.setItem('ticketapp_users', JSON.stringify(updatedUsers))
        const userData = {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
        }
        user.value = userData
        localStorage.setItem('ticketapp_session', JSON.stringify(userData))
        resolve(userData)
      }, 1000)
    })
  }
  const logout = () => {
    user.value = null
    localStorage.removeItem('ticketapp_session')
  }

  // Load user on initialization
  if (loading.value) {
    loadUser()
  }

  return {
    user: computed(() => user.value),
    loading: computed(() => loading.value),
    login,
    signup,
    logout,
  }
}
