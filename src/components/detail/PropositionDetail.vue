<template>
  <v-card
      style="margin: 20px 0px"
      class="mx-auto"
      max-width="800"
  >

    <v-card-title>
      {{proposition.title}}
    </v-card-title>

    <v-img
        class="white--text"
        height="300px"
        :src="proposition.thumbnail"
    >
    </v-img>

    <v-card-text v-html="proposition.content">
      {{proposition.content}}

      <span>{{proposition.updated_at}}</span><br>
    </v-card-text>

<!--    <v-card-actions>
      <v-btn
          text
          color="orange"
      >
        Read
      </v-btn>
    </v-card-actions>-->
  </v-card>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {

        computed: {
            ...mapGetters('propositions', {
                getpropositionById: 'get'
            }),
            proposition() {
                return this.getpropositionById(this.$router.currentRoute.params.id)
            }
        }
    }
</script>