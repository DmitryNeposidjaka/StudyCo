<template>
  <v-card
      style="margin: 20px 0px"
      class="mx-auto"
      max-width="800"
  >

    <v-card-title>
      <span class="blue-grey--text text--darken-2">{{news.title}}</span>
    </v-card-title>

    <v-card-text v-html="news.content">
      {{news.content}}

      <span>{{news.updated_at}}</span><br>
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
            ...mapGetters('news', {
                getArticleById: 'get'
            }),
            news() {
                return this.getArticleById(this.$router.currentRoute.params.id)
            }
        }
    }
</script>