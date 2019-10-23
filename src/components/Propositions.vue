<template>
  <div>
    <v-card
        style="margin: 20px 0px"
        v-for="(proposition, key) in propositions"
        class="mx-auto"
        max-width="400"
    >
      <v-img
          v-if="!errorImages[key]"
          class="white--text"
          height="200px"
          :src="proposition.thumbnail"
          :eager="true"
          @error="error(key)"
      >
        <v-card-title class="align-end fill-height">{{ proposition.title }}</v-card-title>
      </v-img>
      <v-skeleton-loader
          v-if="errorImages[key]"
          class="mx-auto"
          max-width="300"
          type="image"
      ></v-skeleton-loader>
      <v-card-text>
        <span>{{proposition.updated_at}}</span><br>
        <div class="text--primary">{{ proposition.description }}</div>
      </v-card-text>

      <v-card-actions>
        <v-btn
            text
            color="orange"
            @click="$router.push({name: 'propositionDetail',  params: { id: proposition.id }})"
        >
          {{$t('common.read')}}
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
                errorImages: [],
                loading: false,
            }
        },
        computed: {
            ...mapGetters('propositions', {
                propositions: 'all'
            })
        },
        methods: {
            ...mapActions('propositions', {
                loadPropositions: 'setAll'
            }),

            error(object) {
                this.errorImages[object] = true
            },

            getData() {
                const vm = this;
                this.loading = true;
                this.axios({
                    method: 'get',
                    url: 'user/advertising',
                    /*params: {
                        page: vm.pagination.current_page,
                        per_page: vm.pagination.per_page,
                        filters: vm.filters,
                    }*/
                }).then(function (response) {
                    if (response.status == 200) {
                        vm.loadPropositions(response.data);
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