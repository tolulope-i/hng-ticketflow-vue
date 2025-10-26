<script>
import { ref, reactive, onMounted } from 'vue'
import { useAuth } from '../composables/useAuth'
import { useToast } from '../composables/useToast'
import Header from '../components/Header.vue'

export default {
  name: 'TicketManagement',
  components: {
    Header,
  },
  setup() {
    const { user } = useAuth()
    const { addToast } = useToast()

    const tickets = ref([])
    const showForm = ref(false)
    const editingTicket = ref(null)

    const formData = reactive({
      title: '',
      description: '',
      status: 'open',
      priority: 'medium',
    })

    const errors = reactive({})

    const loadTickets = () => {
      const savedTickets = JSON.parse(localStorage.getItem('ticketapp_tickets') || '[]')
      tickets.value = savedTickets
    }

    const saveTickets = (updatedTickets) => {
      localStorage.setItem('ticketapp_tickets', JSON.stringify(updatedTickets))
      tickets.value = updatedTickets
    }

    const validateForm = () => {
      const newErrors = {}

      if (!formData.title.trim()) {
        newErrors.title = 'Title is required'
      }

      if (!formData.status) {
        newErrors.status = 'Status is required'
      } else if (!['open', 'in_progress', 'closed'].includes(formData.status)) {
        newErrors.status = 'Status must be open, in_progress, or closed'
      }

      Object.assign(errors, newErrors)
      return Object.keys(newErrors).length === 0
    }

    const resetForm = () => {
      Object.assign(formData, {
        title: '',
        description: '',
        status: 'open',
        priority: 'medium',
      })
      Object.keys(errors).forEach((key) => delete errors[key])
      editingTicket.value = null
      showForm.value = false
    }

    const handleSubmit = () => {
      if (!validateForm()) {
        addToast('Please fix the errors in the form', 'error')
        return
      }

      const updatedTickets = [...tickets.value]

      if (editingTicket.value) {
        // Update existing ticket
        const index = updatedTickets.findIndex((t) => t.id === editingTicket.value.id)
        if (index !== -1) {
          updatedTickets[index] = {
            ...updatedTickets[index],
            ...formData,
            updatedAt: new Date().toISOString(),
          }
        }
        addToast('Ticket updated successfully!', 'success')
      } else {
        // Create new ticket
        const newTicket = {
          id: Date.now(),
          ...formData,
          createdBy: user.value?.email,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        updatedTickets.push(newTicket)
        addToast('Ticket created successfully!', 'success')
      }

      saveTickets(updatedTickets)
      resetForm()
    }

    const handleEdit = (ticket) => {
      Object.assign(formData, {
        title: ticket.title,
        description: ticket.description || '',
        status: ticket.status,
        priority: ticket.priority || 'medium',
      })
      editingTicket.value = ticket
      showForm.value = true
    }

    const handleDelete = (ticketId) => {
      if (window.confirm('Are you sure you want to delete this ticket?')) {
        const updatedTickets = tickets.value.filter((ticket) => ticket.id !== ticketId)
        saveTickets(updatedTickets)
        addToast('Ticket deleted successfully!', 'success')
      }
    }

    const getStatusLabel = (status) => {
      const statusLabels = {
        open: 'Open',
        in_progress: 'In Progress',
        closed: 'Closed',
      }
      return statusLabels[status] || 'Open'
    }

    onMounted(() => {
      loadTickets()
    })

    return {
      tickets,
      showForm,
      editingTicket,
      formData,
      errors,
      resetForm,
      handleSubmit,
      handleEdit,
      handleDelete,
      getStatusLabel,
    }
  },
}
</script>

<template>
  <div>
    <div class="container" style="padding: 2rem 1rem">
      <div
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        "
        className="ticket-hero"
      >
        <div>
          <h1 class="section-title">Ticket Management</h1>
          <p class="section-description" style="margin-bottom: 0">
            Create, view, edit, and manage your support tickets
          </p>
        </div>

        <button @click="showForm = true" class="btn btn-primary">Create New Ticket</button>
      </div>

      <div v-if="showForm" class="card mb-4">
        <h2 class="mb-3">
          {{ editingTicket ? 'Edit Ticket' : 'Create New Ticket' }}
        </h2>

        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="title" class="form-label">Title *</label>
            <input
              type="text"
              id="title"
              v-model="formData.title"
              :class="['form-input', { error: errors.title }]"
              :aria-describedby="errors.title ? 'title-error' : undefined"
              required
            />
            <div v-if="errors.title" id="title-error" class="form-error" role="alert">
              ⚠️ {{ errors.title }}
            </div>
          </div>

          <div class="form-group">
            <label for="description" class="form-label">Description</label>
            <textarea
              id="description"
              v-model="formData.description"
              class="form-textarea"
              rows="4"
            ></textarea>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem">
            <div class="form-group">
              <label for="status" class="form-label">Status *</label>
              <select
                id="status"
                v-model="formData.status"
                :class="['form-select', { error: errors.status }]"
                :aria-describedby="errors.status ? 'status-error' : undefined"
                required
              >
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="closed">Closed</option>
              </select>
              <div v-if="errors.status" id="status-error" class="form-error" role="alert">
                ⚠️ {{ errors.status }}
              </div>
            </div>

            <div class="form-group">
              <label for="priority" class="form-label">Priority</label>
              <select id="priority" v-model="formData.priority" class="form-select">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>

          <div style="display: flex; gap: 1rem; justify-content: flex-end">
            <button type="button" @click="resetForm" class="btn btn-outline">Cancel</button>
            <button type="submit" class="btn btn-primary">
              {{ editingTicket ? 'Update Ticket' : 'Create Ticket' }}
            </button>
          </div>
        </form>
      </div>

      <div class="ticket-grid">
        <div
          v-if="tickets.length === 0"
          class="card text-center"
          style="grid-column: 1 / -1; padding: 4rem 2rem"
        >
          <h3 class="mb-2">No tickets yet</h3>
          <p class="mb-3" style="color: var(--gray-600)">
            Create your first ticket to get started with TicketFlow
          </p>
          <button @click="showForm = true" class="btn btn-primary">Create Your First Ticket</button>
        </div>

        <div v-else v-for="ticket in tickets" :key="ticket.id" class="ticket-card card">
          <div class="ticket-header">
            <h3 class="ticket-title">{{ ticket.title }}</h3>
            <div class="ticket-actions">
              <button
                @click="handleEdit(ticket)"
                class="btn btn-outline btn-sm"
                :aria-label="`Edit ticket: ${ticket.title}`"
              >
                Edit
              </button>
              <button
                @click="handleDelete(ticket.id)"
                class="btn btn-danger btn-sm"
                :aria-label="`Delete ticket: ${ticket.title}`"
              >
                Delete
              </button>
            </div>
          </div>

          <p v-if="ticket.description" class="ticket-description">{{ ticket.description }}</p>

          <div class="ticket-meta">
            <div>
              <span :class="['status-badge', `status-${ticket.status}`]">
                {{ getStatusLabel(ticket.status) }}
              </span>
            </div>
            <div class="ticket-priority">Priority: {{ ticket.priority }}</div>
          </div>

          <div style="font-size: 0.75rem; color: var(--gray-500); margin-top: 0.5rem">
            Created: {{ new Date(ticket.createdAt).toLocaleDateString() }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
