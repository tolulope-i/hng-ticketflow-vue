<script>
import { ref, reactive, onMounted } from 'vue'
import { useAuth } from '../composables/useAuth'
import Header from '../components/Header.vue'

export default {
  name: 'Dashboard',
  components: {
    Header,
  },
  setup() {
    const { user } = useAuth()
    const stats = reactive({
      total: 0,
      open: 0,
      inProgress: 0,
      closed: 0,
    })

    const loadStats = () => {
      const tickets = JSON.parse(localStorage.getItem('ticketapp_tickets') || '[]')

      stats.total = tickets.length
      stats.open = tickets.filter((ticket) => ticket.status === 'open').length
      stats.inProgress = tickets.filter((ticket) => ticket.status === 'in_progress').length
      stats.closed = tickets.filter((ticket) => ticket.status === 'closed').length
    }

    onMounted(() => {
      loadStats()
    })

    return {
      user,
      stats,
    }
  },
}
</script>

<template>
  <div>
    <div class="container" style="padding: 2rem 1rem">
      <div>
        <div class="mb-4">
          <h1 class="section-title">Dashboard</h1>
          <p class="section-description" style="margin-bottom: 0">
            Welcome back, {{ user?.name }}! Here's your ticket overview.
          </p>
        </div>

        <div class="stats-grid">
          <div class="stat-card card">
            <div class="stat-number">{{ stats.total }}</div>
            <div class="stat-label">Total Tickets</div>
          </div>

          <div class="stat-card card">
            <div class="stat-number" style="color: var(--success-color)">
              {{ stats.open }}
            </div>
            <div class="stat-label">Open Tickets</div>
          </div>

          <div class="stat-card card">
            <div class="stat-number" style="color: var(--warning-color)">
              {{ stats.inProgress }}
            </div>
            <div class="stat-label">In Progress</div>
          </div>

          <div class="stat-card card">
            <div class="stat-number" style="color: var(--gray-500)">
              {{ stats.closed }}
            </div>
            <div class="stat-label">Closed Tickets</div>
          </div>
        </div>
      </div>

      <div class="quick-actions">
        <div class="card card1">
          <h2 class="mb-3">Quick Actions</h2>
          <div style="display: flex; gap: 1rem; flex-wrap: wrap">
            <router-link to="/tickets" class="btn btn-primary"> Manage Tickets </router-link>
            <router-link to="/tickets" class="btn btn-secondary" @click="showCreateForm = true">
              Create New Ticket
            </router-link>
          </div>
        </div>

        <div class="card mt-4">
          <h2 class="mb-3">Recent Activity</h2>
          <p style="color: var(--gray-500)">
            Your recent tickets and updates will appear here.
            <router-link
              to="/tickets"
              class="nav-link"
              style="display: inline; margin-left: 0.5rem"
            >
              View all tickets
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
