<template>
  <v-card
      class="mx-auto"
      max-width="500"
  >
    <v-row align="center"
           justify="center"
           style="padding: 50px 0px 20px">

      <v-avatar

          :tile="false"
          :size="256"
      >
        <img
            src="https://randomuser.me/api/portraits/men/85.jpg"
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
    </v-card-text>
  </v-card>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        data() {
            return {}
        },
        computed: {
            ...mapGetters('user', {
                user: 'get'
            })
        }
    }
</script>