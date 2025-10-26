<script>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { useToast } from '../composables/useToast'
import Header from '../components/Header.vue'

export default {
  name: 'Login',
  components: {
    Header,
  },
  setup() {
    const formData = reactive({
      email: '',
      password: '',
    })
    const errors = reactive({})
    const isLoading = ref(false)

    const { login } = useAuth()
    const { addToast } = useToast()
    const router = useRouter()

    const validateForm = () => {
      const newErrors = {}

      if (!formData.email.trim()) {
        newErrors.email = 'Email is required'
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid'
      }

      if (!formData.password) {
        newErrors.password = 'Password is required'
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters'
      }

      Object.assign(errors, newErrors)
      return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async () => {
      if (!validateForm()) {
        addToast('Please fix the form errors', 'error')
        return
      }

      isLoading.value = true

      try {
        await login(formData.email, formData.password)
        addToast('Login successful!', 'success')
        router.push('/dashboard')
      } catch (error) {
        addToast(error.message || 'Login failed. Please try again.', 'error')
        errors.submit = error.message
      } finally {
        isLoading.value = false
      }
    }

    const handleDemoLogin = () => {
      formData.email = 'demo@ticketflow.com'
      formData.password = 'demo123'
    }

    return {
      formData,
      errors,
      isLoading,
      handleSubmit,
      handleDemoLogin,
    }
  },
}
</script>

<template>
  <div>
    <div class="container" style="padding: 4rem 1rem">
      <div style="max-width: 400px; margin: 0 auto">
        <div class="card">
          <h1 class="section-title text-center mb-3">Welcome Back</h1>
          <p class="text-center mb-4" style="color: var(--gray-600)">
            Sign in to your TicketFlow account
          </p>

          <form @submit.prevent="handleSubmit" novalidate>
            <div class="form-group">
              <label for="email" class="form-label">Email</label>
              <input
                type="email"
                id="email"
                v-model="formData.email"
                :class="['form-input', { error: errors.email }]"
                :aria-describedby="errors.email ? 'email-error' : undefined"
                required
              />
              <div v-if="errors.email" id="email-error" class="form-error" role="alert">
                ⚠️ {{ errors.email }}
              </div>
            </div>

            <div class="form-group">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                id="password"
                v-model="formData.password"
                :class="['form-input', { error: errors.password }]"
                :aria-describedby="errors.password ? 'password-error' : undefined"
                required
              />
              <div v-if="errors.password" id="password-error" class="form-error" role="alert">
                ⚠️ {{ errors.password }}
              </div>
            </div>

            <div v-if="errors.submit" class="form-error mb-3 text-center" role="alert">
              ⚠️ {{ errors.submit }}
            </div>

            <button type="submit" class="btn btn-primary" style="width: 100%" :disabled="isLoading">
              {{ isLoading ? 'Signing In...' : 'Sign In' }}
            </button>
          </form>

          <div class="text-center mt-3">
            <button
              @click="handleDemoLogin"
              class="btn btn-outline btn-sm"
              style="width: 100%"
              type="button"
            >
              Use Demo Account
            </button>
          </div>

          <p class="text-center mt-3">
            Don't have an account?{' '}
            <router-link to="/auth/signup" class="nav-link" style="display: inline">
              Sign up
            </router-link>
          </p>
        </div>

        <div class="card mt-4">
          <h3 class="text-center mb-2">Demo Accounts</h3>
          <div style="font-size: 0.875rem; color: var(--gray-600)">
            <p><strong>Account 1:</strong><br />demo@ticketflow.com / demo123</p>
            <p><strong>Account 2:</strong><br />tolu@gmail.com / tolu123</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
