<script setup></script>

<template>
  <footer class="footer" role="contentinfo">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section socials quick-links">
          <ul>
            <li><router-link to="/">Home</router-link><br /></li>
            <li><router-link to="/auth/login">Login</router-link><br /></li>
            <li><router-link to="/auth/signup">Sign Up</router-link></li>
          </ul>
        </div>
        <div className="footer-section socials">
          <ul>
            <li>
              <router-link to="https://www.facebook.com/marvelous.ilesanmi.9">Facebook</router-link>
            </li>
            <li>
              <router-link to="https://x.com/dev__tolu?t=Y-q7l2pvY5032cfCsZp2mA&s=08">X</router-link>
            </li>
            <li>
              <router-link to="https://www.linkedin.com/in/tolulope-ilesanmi?">LinkedIn</router-link>
            </li>
            <li>
              <router-link to="https://www.instagram.com/tolu__nimi?igsh=MXN6M29yeXJhN3Z3Ng==">Instagram</router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2025 TicketFlow. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>
