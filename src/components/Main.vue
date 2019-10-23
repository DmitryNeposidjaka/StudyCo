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

        <v-list-item-title>{{user.fullname}}</v-list-item-title>

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

      <v-toolbar-title><span style="color: floralwhite; font-weight: bold">{{$t('nav.' + $router.currentRoute.meta.title)}}</span></v-toolbar-title>
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
    <div class="text-center">
      <v-bottom-sheet>
        <template v-slot:activator="{ on }">
          <v-btn
              v-on="on"
          >
            <v-icon>mdi-menu-up-outline</v-icon>
          </v-btn>
        </template>
        <v-sheet class="text-center">
          <v-row
              height="100px"
              justify="center"
          >
          <v-btn
              class=" justify-center"
              @click="$router.go(-1)"
          >
            {{$t('common.previous')}} <v-icon right dark>mdi-page-previous-outline</v-icon>
          </v-btn>
          </v-row>
        </v-sheet>
      </v-bottom-sheet>
    </div>
  </v-app>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        data () {
            return {
                drawer: true,
                items: [
                    { title: this.$t('nav.dashboard'), icon: 'mdi-home-city', href: this.$router.resolve({name: 'dashboard'}).href},
                    { title: this.$t('nav.courses'), icon: 'mdi-school-outline', href: this.$router.resolve({name: 'courses'}).href},
                    { title: this.$t('nav.articles'), icon: 'mdi-post-outline', href: this.$router.resolve({name: 'articles'}).href},
                    { title: this.$t('nav.news'), icon: 'mdi-newspaper-variant-outline', href: this.$router.resolve({name: 'news'}).href},
                    { title: this.$t('nav.propositions'), icon: 'mdi-ticket-percent', href: this.$router.resolve({name: 'propositions'}).href},
                    { title: this.$t('nav.products'), icon: 'mdi-cart-outline', href: this.$router.resolve({name: 'products'}).href},
                    { title: this.$t('nav.settings'), icon: 'mdi-settings-outline', href: this.$router.resolve({name: 'settings'}).href},
                ],
                navWallpaper: '',
                mini: true,
            }
        },
        computed: {
            ...mapGetters('user', {
                user: 'get'
            }),
        },
        methods: {
            ...mapActions('user',{
                setUser: 'set'
            }),
            loadUser() {
                let vm = this;
                this.axios
                    .get('user/me')
                    .then(function (response) {
                        vm.setUser(response.data)
                    })
                    .then(function() {
                        vm.$i18n.locale = vm.user.lang
                    })
            }
        },
        mounted() {
            this.loadUser();
        },
        created() {
            this.navWallpaper = '/images/wallpapers/wall-' + Math.floor(Math.random() * 14) + '.jpg'
        }
    }
</script>