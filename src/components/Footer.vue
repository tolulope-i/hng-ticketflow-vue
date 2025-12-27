<script>
import { Facebook } from 'lucide-vue-next';
import { Twitter } from 'lucide-vue-next';
import { Linkedin } from 'lucide-vue-next';
import { Instagram } from 'lucide-vue-next';

export default {
  name: 'Footer',
  components: {
    Facebook,
    Twitter,
    Linkedin,
    Instagram
  },
}
</script>

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
              <router-link to="https://www.facebook.com/marvelous.ilesanmi.9" target="_blank">
                <Facebook/>
              </router-link>
            </li>
            <li>
              <router-link to="https://x.com/dev__tolu?t=Y-q7l2pvY5032cfCsZp2mA&s=08" target="_blank">
                <Twitter />
              </router-link>
            </li>
            <li>
              <router-link to="https://www.linkedin.com/in/tolulope-ilesanmi?" target="_blank">
                  <Linkedin />

              </router-link>
            </li>
            <li>
              <router-link to="https://www.instagram.com/tolu__nimi?igsh=MXN6M29yeXJhN3Z3Ng==" target="_blank">
                <Instagram />
              </router-link>
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
