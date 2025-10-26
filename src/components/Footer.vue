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
              <router-link to="">Facebook</router-link>
            </li>
            <li>
              <router-link to="">Twitter</router-link>
            </li>
            <li>
              <router-link to="">LinkedIn</router-link>
            </li>
            <li>
              <router-link to="">Instagram</router-link>
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