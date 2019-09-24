<template>
  <v-card
      style="margin: 20px 0px"
      class="mx-auto"
      max-width="800"
  >

    <v-card-title>
      {{article.title}}
    </v-card-title>

    <v-img
        class="white--text"
        height="300px"
        :src="article.thumbnail"
    >
    </v-img>

    <v-card-text v-html="article.content">
      {{article.content}}

      <span>{{article.updated_at}}</span><br>
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
            ...mapGetters('articles', {
                getArticleById: 'get'
            }),
            article() {
                return this.getArticleById(this.$router.currentRoute.params.id)
            }
        }
    }
</script>