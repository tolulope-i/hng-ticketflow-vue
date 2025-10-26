<script>
import { useAuth } from '../composables/useAuth'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

export default {
  name: 'Header',
  setup() {
    const isMenuOpen = ref(false)
    const { user, logout } = useAuth()
    const router = useRouter()

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value
    }

    const closeMenu = () => {
      isMenuOpen.value = false
    }

    const handleLogout = () => {
      logout()
      router.push('/auth/login')
      closeMenu()
    }

    return {
      user,
      isMenuOpen,
      toggleMenu,
      closeMenu,
      handleLogout
    }
  }
}
</script>

<template>
  <header class="header">
    <div class="container">
      <nav class="nav" role="navigation">
        <router-link to="/" class="logo" aria-label="TicketFlow Home">
          TicketFlow
        </router-link>

        <button
          class="nav-toggle"
          @click="toggleMenu"
          :aria-expanded="isMenuOpen"
          aria-label="Toggle navigation menu"
        >
          <span v-if="isMenuOpen">&#10005; <!-- Close icon --></span>
          <span v-else>&#9776; <!-- Hamburger icon --></span>
        </button>

        <ul :class="['nav-links', { active: isMenuOpen }]">
          <li v-if="user">
            <router-link
              to="/dashboard"
              class="nav-link"
              @click="closeMenu"
            >
              Dashboard
            </router-link>
          </li>
          <li v-if="user">
            <router-link
              to="/tickets"
              class="nav-link"
              @click="closeMenu"
            >
              Tickets
            </router-link>
          </li>
          <li v-if="user">
            <button
              @click="handleLogout"
              class="btn btn-outline btn-sm"
            >
              Logout
            </button>
          </li>
          <li v-if="!user">
            <router-link
              to="/auth/login"
              class="nav-link"
              @click="closeMenu"
            >
              Login
            </router-link>
          </li>
          <li v-if="!user">
            <router-link
              to="/auth/signup"
              class="btn btn-primary btn-sm"
              @click="closeMenu"
            >
              Get Started
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>
