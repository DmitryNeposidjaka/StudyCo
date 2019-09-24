<template>
  <div>
    <v-card
        style="margin: 20px 0px"
        v-for="article in articles"
        class="mx-auto"
        max-width="400"
    >
      <v-img
          class="white--text"
          height="200px"
          :src="article.thumbnail"
      >
        <v-card-title class="align-end fill-height">{{ article.title }}</v-card-title>
      </v-img>

      <v-card-text>
        <span>{{article.updated_at}}</span><br>
        <div class="text--primary">{{ article.description }}</div>
      </v-card-text>

      <v-card-actions>
        <v-btn
            text
            color="orange"
            @click="$router.push({name: 'articleDetail',  params: { id: article.id }})"
        >
          Read
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        data() {
            return {
                loading: false,
            }
        },
        computed: {
            ...mapGetters('articles', {
                articles: 'all'
            })
        },
        methods: {
            ...mapActions('articles', {
                loadArticles: 'setAll'
            }),
            getData() {
                const vm = this;
                this.loading = true;
                this.axios({
                    method: 'get',
                    url: 'user/articles',
                    /*params: {
                        page: vm.pagination.current_page,
                        per_page: vm.pagination.per_page,
                        filters: vm.filters,
                    }*/
                }).then(function (response) {
                    if (response.status == 200) {
                        vm.loadArticles(response.data);
                        /*vm.pagination.total = response.data.total;
                        vm.pagination.per_page = parseInt(response.data.per_page);
                        vm.pagination.current_page = response.data.current_page;
                        vm.pagination.last_page = response.data.last_page;*/
                    }
                }).then(function () {
                    vm.loading = false;
                })
            },
        },

        mounted() {
            this.getData()
        }
    }
</script>