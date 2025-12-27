<script>
import Header from '../components/Header.vue'
import { CircleCheck } from 'lucide-vue-next'
import { Clock } from 'lucide-vue-next'
import { ChartNoAxesCombined } from 'lucide-vue-next'
import { Zap } from 'lucide-vue-next'
import { Sparkles } from 'lucide-vue-next'
import { MonitorSmartphone } from 'lucide-vue-next'



export default {
  name: 'LandingPage',
  components: {
    Header,
    CircleCheck,
    Clock,
    ChartNoAxesCombined,
    Zap,
    Sparkles,
    MonitorSmartphone
  },
}
</script>


<template>
  <div>
    <section class="hero background-wrapper" aria-labelledby="hero-title">

      <div className="decorative-circle circle-1" aria-hidden="true"></div>
      <div className="decorative-circle circle-2" aria-hidden="true"></div>
      <div className="decorative-circle circle-3" aria-hidden="true"></div>

      <div class="gradient-bg"></div>
      <div class="blur-circle circle-top-right"></div>
      <div class="blur-circle circle-bottom-left"></div>

      <div class="container">
        <div class="hero-content">
          <p class="hero-pre-title">Now with AI-powered insights</p>
          <h1 id="hero-title" class="hero-title">Streamline Your <span>Support with TicketFlow</span></h1>
          <p class="hero-description">
            A modern, intuitive ticket management system that helps teams track, prioritize, and
            resolve issues efficiently. Beautiful design meets powerful functionality.
          </p>
          <div class="hero-actions">
            <router-link to="/auth/login" class="btn btn-primary">
              Login to Dashboard
            </router-link>
            <router-link to="/auth/signup" class="btn btn-outline"> Get Started Free </router-link>
          </div>
        </div>
      </div>

      <div class="hero-image">
        <img
          src="/ticket3.png"
          alt="Illustration showing ticket management"
          class="hero-illustration"
        />
      </div>
    </section>

    <section class="how-it-works" aria-labelledby="how-it-works">
      <div class="container">
        <h2 id="how-it-works" class="section-title">How TicketFlow Works</h2>
        <p class="section-description">
          Simplify your support process in three easy steps
        </p>

        <div class="steps-grid">
          <div class="step-card card">
            <div class="step-icon" aria-hidden="true">
              <CircleCheck/>
            </div>
            <h3 class="step-title">Create Tickets</h3>
            <p class="step-description">
              Easily create and submit support tickets through our user-friendly interface.
            </p>
          </div>

          <div class="step-card card">
            <div class="step-icon" aria-hidden="true">
              <Clock />
            </div>
            <h3 class="step-title">Track Progress</h3>
            <p class="step-description">
              Monitor the status of your tickets in real-time with our intuitive dashboard.
            </p>
          </div>
          <div class="step-card card">
            <div class="step-icon" aria-hidden="true">
              <CircleCheck/>
            </div>
            <h3 class="step-title">Resolve Issues</h3>
            <p class="step-description">
              Collaborate with your team to efficiently resolve tickets and improve customer
              satisfaction.
            </p>
          </div>
          <div class="step-card card">
            <div class="step-icon" aria-hidden="true">
              <ChartNoAxesCombined />
            </div>
            <h3 class="step-title">Analyze Data</h3>
            <p class="step-description">
              Leverage AI-powered insights to identify trends and optimize your support process.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="features" aria-labelledby="features-title">
      <div class="container">
        <h2 id="features-title" class="section-title">Why Choose TicketFlow?</h2>
        <p class="section-description">
          Built with modern web technologies for the best user experience
        </p>

        <div class="features-grid">
          <div class="feature-card card">
            <div class="feature-icon" aria-hidden="true">
              <Zap />
            </div>
            <h3 class="feature-title">Lightning Fast</h3>
            <p class="feature-description">
              Built with performance in mind. Experience blazing fast ticket management with instant
              updates and real-time notifications.
            </p>
          </div>

          <div class="feature-card card">
            <div class="feature-icon" aria-hidden="true">
               <Sparkles />
            </div>
            <h3 class="feature-title">Beautiful UI</h3>
            <p class="feature-description">
              Enjoy a clean, modern interface that's both beautiful and functional. Designed with
              accessibility and user experience as top priorities.
            </p>
          </div>

          <div class="feature-card card">
            <div class="feature-icon" aria-hidden="true">
               <MonitorSmartphone />
            </div>
            <h3 class="feature-title">Fully Responsive</h3>
            <p class="feature-description">
              Works perfectly on all devices - from desktop to mobile. Manage your tickets anywhere,
              anytime with our responsive design.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="cta">
      <div class="container">
        <div class="cta-content">
          <h2 class="cta-title">Ready to Get Started?</h2>
          <p class="cta-description">
            Join thousands of teams using TicketFlow to streamline their support process.
          </p>
          <div class="cta-features">
            <ul>
              <li> <span><CircleCheck /></span> Easy Ticket Creation</li>
              <li> <span><CircleCheck /></span> Real-Time Tracking</li>
              <li> <span><CircleCheck /></span> AI-Powered Insights</li>
              <li> <span><CircleCheck /></span> Collaborative Resolution</li>
              <li> <span><CircleCheck /></span> Responsive Design</li>
              <li> <span><CircleCheck /></span> Beautiful Interface</li>
            </ul>
          </div>
          <router-link to="/auth/signup" class="btn btn-primary btn-lg">
            Sign Up for Free
          </router-link>
        </div>
        <div class="cta-image">
          <img
            src="/team-collaboration.jfif"
            alt="Illustration showing team collaboration"
            class="cta-illustration"
          />
        </div>
      </div>
    </section>
  </div>
</template>
