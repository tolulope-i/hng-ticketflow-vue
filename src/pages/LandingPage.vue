<script>
import Header from '../components/Header.vue'

export default {
  name: 'LandingPage',
  components: {
    Header,
  },
}
</script>

<template>
  <div>
    <section class="hero" aria-labelledby="hero-title">
      <div className="ocean-enhanced" aria-hidden="true">
        <div className="enhanced-wave front"></div>
        <div className="enhanced-wave middle"></div>
        <div className="enhanced-wave back"></div>
      </div>

      <div className="ocean-blue-waves" aria-hidden="true">
        <div className="blue-wave blue-wave-1"></div>
        <div className="blue-wave blue-wave-2"></div>
        <div className="blue-wave blue-wave-3"></div>
      </div>

      <div className="decorative-circle circle-1" aria-hidden="true"></div>
      <div className="decorative-circle circle-2" aria-hidden="true"></div>
      <div className="decorative-circle circle-3" aria-hidden="true"></div>

      <div class="container">
        <div class="hero-content">
          <h1 id="hero-title" class="hero-title">Streamline Your Support with TicketFlow</h1>
          <p class="hero-description">
            A modern, intuitive ticket management system that helps teams track, prioritize, and
            resolve issues efficiently. Beautiful design meets powerful functionality.
          </p>
          <div class="hero-actions">
            <router-link to="/auth/login" class="btn btn-secondary">
              Login to Dashboard
            </router-link>
            <router-link to="/auth/signup" class="btn btn-outline"> Get Started Free </router-link>
          </div>
        </div>
      </div>

      <div class="wave-background" aria-hidden="true"></div>
    </section>

    <section class="features" aria-labelledby="features-title">
      <div class="container">
        <h2 id="features-title" class="section-title">Why Choose TicketFlow?</h2>
        <p class="section-description">
          Built with modern web technologies for the best user experience
        </p>

        <div class="features-grid">
          <div class="feature-card card">
            <div class="feature-icon" aria-hidden="true">⚡</div>
            <h3 class="feature-title">Lightning Fast</h3>
            <p class="feature-description">
              Built with performance in mind. Experience blazing fast ticket management with instant
              updates and real-time notifications.
            </p>
          </div>

          <div class="feature-card card">
            <div class="feature-icon" aria-hidden="true">🎨</div>
            <h3 class="feature-title">Beautiful UI</h3>
            <p class="feature-description">
              Enjoy a clean, modern interface that's both beautiful and functional. Designed with
              accessibility and user experience as top priorities.
            </p>
          </div>

          <div class="feature-card card">
            <div class="feature-icon" aria-hidden="true">📱</div>
            <h3 class="feature-title">Fully Responsive</h3>
            <p class="feature-description">
              Works perfectly on all devices - from desktop to mobile. Manage your tickets anywhere,
              anytime with our responsive design.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
