<script>
      // import { RouterLink, RouterView } from 'vue-router'
      import { RouterView } from 'vue-router'
      import Toast from './components/Toast.vue'
      import Header from './components/Header.vue';
      import Footer from './components/Footer.vue';
      import './assets/main.css'


      export default {
        name: 'App',
        components: {
          Toast,
          Header,
          Footer
        }
      }
    </script>

    <template>
      <div id="app">
        <Toast />
        <!-- <router-view /> -->
        <Header />
        <RouterView />
        <Footer />
      </div>

    </template>

    <style scoped>

    </style>
