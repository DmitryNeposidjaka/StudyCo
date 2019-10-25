<template>
  <div>
    <v-alert
        v-for="alert in $alert.stack"
        border="right"
        :color="alert.color"
        dark
    >
      {{alert.text}}
    </v-alert>
    <v-card
        class="mx-auto"
        max-width="500"
    >
      <v-row align="center"
             justify="center"
      >

        <v-avatar

            :tile="false"
            :size="256"
        >
          <img
              :src="user.thumbnail_img"
              alt="avatar"
          >
        </v-avatar>
      </v-row>
      <p style="position: relative">
        <v-btn
            absolute
            dark
            fab small
            top
            right
            color="warning"
            @click="$router.push({name: 'avatar'})"
        >
          <v-icon>mdi-account-edit-outline</v-icon>
        </v-btn>
      </p>
      <v-card-title class="justify-md-center">{{user.fullname}}</v-card-title>
      <v-card-text>
        <p class="text-left">Telephone: <span class="font-weight-bold">{{user.telephone}}</span></p>
        <p class="text-left">Email: <span class="font-weight-bold">{{user.email}}</span></p>
        <v-select :items="languages" :label="$t('common.language')" :value="user.lang" @change="changeLang" ></v-select>
      </v-card-text>
      <v-card-actions>
        <v-btn :raised="true" small color="grey lighten-2" @click="logout"><v-icon>mdi-location-exit</v-icon>{{$t('profile.logout')}}</v-btn>
      </v-card-actions>
    </v-card>
  </div>

</template>

<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        data() {
            return {
                languages: [
                    {
                        text: this.$t('common.languages.ukrainian'),
                        value: 'ua'
                    },
                    {
                        text: this.$t('common.languages.english'),
                        value: 'en'
                    }
                ]
            }
        },
        computed: {
            ...mapGetters('user', {
                user: 'get'
            }),
        },
        methods: {

            ...mapActions('user', {
                setProperty: 'setProperty'
            }),

            changeLang(data) {
                let vm = this;
                this.setProperty({
                    key: 'lang',
                    value: data
                }).then(function () {
                    vm.$i18n.locale = data
                })
            },
            logout() {
                this.axios.get('/logout')
                    .then(function(response) {
                        this.$router.push({name: 'login'})
                    })
            }
        }
    }
</script>