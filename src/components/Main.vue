<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer"
                         :mini-variant.sync="mini"
                         temporary
                         right>
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-title>John Leider</v-list-item-title>

        <v-btn
            icon
            @click.stop="mini = !mini"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
            v-for="item in items"
            :key="item.title"
            :href="item.href"
            link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <!-- -->
    </v-navigation-drawer>

    <v-app-bar app
               :src="navWallpaper">
      <!-- -->

      <v-toolbar-title><span style="color: floralwhite; font-weight: bold">{{$router.currentRoute.meta.title}}</span></v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-btn v-if="!drawer" icon
             @click.stop="drawer = !drawer">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <template v-slot:img="{ props }">
        <v-img
            v-bind="props"
            gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        ></v-img>
      </template>

    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-content>

      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <v-alert
            v-for="alert in $alert.stack"
            border="right"
            :color="alert.color"
            dark
        >
          {{alert.text}}
        </v-alert>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
    export default {
        data () {
            return {
                drawer: true,
                items: [
                    { title: 'Dashboard', icon: 'mdi-home-city', href: this.$router.resolve({name: 'dashboard'}).href},
                    { title: 'My courses', icon: 'mdi-school-outline', href: this.$router.resolve({name: 'courses'}).href},
                    { title: 'Articles', icon: 'mdi-post-outline', href: this.$router.resolve({name: 'articles'}).href},
                    { title: 'News', icon: 'mdi-newspaper-variant-outline', href: this.$router.resolve({name: 'news'}).href},
                    { title: 'Propositions', icon: 'mdi-ticket-percent', href: this.$router.resolve({name: 'propositions'}).href},
                    { title: 'Products', icon: 'mdi-cart-outline', href: this.$router.resolve({name: 'products'}).href},
                    { title: 'Settings', icon: 'mdi-settings-outline', href: this.$router.resolve({name: 'settings'}).href},
                ],
                navWallpaper: '',
                mini: true,
            }
        },
        mounted() {
        //    console.log(this.$router)
        },
        created() {
            this.navWallpaper = '/images/wallpapers/wall-' + Math.floor(Math.random() * 14) + '.jpg'
        }
    }
</script>