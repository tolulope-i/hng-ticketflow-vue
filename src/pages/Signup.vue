<script>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { useToast } from '../composables/useToast'
import Header from '../components/Header.vue'

export default {
  name: 'Signup',
  components: {
    Header,
  },
  setup() {
    const formData = reactive({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    })
    const errors = reactive({})
    const isLoading = ref(false)

    const { signup } = useAuth()
    const { addToast } = useToast()
    const router = useRouter()

    const validateForm = () => {
      const newErrors = {}

      if (!formData.name.trim()) {
        newErrors.name = 'Name is required'
      } else if (formData.name.trim().length < 2) {
        newErrors.name = 'Name must be at least 2 characters'
      }

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

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password'
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match'
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
        await signup(formData.name, formData.email, formData.password)
        addToast('Account created successfully!', 'success')
        router.push('/dashboard')
      } catch (error) {
        addToast(error.message || 'Signup failed. Please try again.', 'error')
        errors.submit = error.message
      } finally {
        isLoading.value = false
      }
    }

    return {
      formData,
      errors,
      isLoading,
      handleSubmit,
    }
  },
}
</script>

<template>
  <div>
    <div class="container" style="padding: 4rem 1rem">
      <div style="max-width: 400px; margin: 0 auto">
        <div class="card">
          <h1 class="section-title text-center mb-3">Create Account</h1>
          <p class="text-center mb-4" style="color: var(--gray-600)">
            Join TicketFlow and streamline your workflow
          </p>

          <form @submit.prevent="handleSubmit" novalidate>
            <div class="form-group">
              <label for="name" class="form-label">Full Name</label>
              <input
                type="text"
                id="name"
                v-model="formData.name"
                :class="['form-input', { error: errors.name }]"
                :aria-describedby="errors.name ? 'name-error' : undefined"
                required
              />
              <div v-if="errors.name" id="name-error" class="form-error" role="alert">
                ⚠️ {{ errors.name }}
              </div>
            </div>

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

            <div class="form-group">
              <label for="confirmPassword" class="form-label">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                v-model="formData.confirmPassword"
                :class="['form-input', { error: errors.confirmPassword }]"
                :aria-describedby="errors.confirmPassword ? 'confirm-password-error' : undefined"
                required
              />
              <div
                v-if="errors.confirmPassword"
                id="confirm-password-error"
                class="form-error"
                role="alert"
              >
                ⚠️ {{ errors.confirmPassword }}
              </div>
            </div>

            <div v-if="errors.submit" class="form-error mb-3 text-center" role="alert">
              ⚠️ {{ errors.submit }}
            </div>

            <button type="submit" class="btn btn-primary" style="width: 100%" :disabled="isLoading">
              {{ isLoading ? 'Creating Account...' : 'Create Account' }}
            </button>
          </form>

          <p class="text-center mt-3">
            Already have an account?{' '}
            <router-link to="/auth/login" class="nav-link" style="display: inline">
              Sign in
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
