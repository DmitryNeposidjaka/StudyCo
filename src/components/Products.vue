<template>
  <div>
    <v-card class="flex-column" v-for="product in products">
      <v-container>
        <v-row justify="start">
          <v-col cols="auto">
            <v-img
                height="auto"
                width="100"
                :src="product.thumbnails[0]"
                style="border-radius: 2px"
            ></v-img>
          </v-col>
          <v-col>
            <v-col class="pa-0"><a @click="$router.push({name: 'productDetail',  params: { id: product.id }})">{{product.title}}</a></v-col>
            <v-col class="green--text text--darken-1 pa-0">
              <v-btn icon :color="product.is_user_liked? 'red' : 'grey'" @click="like(product.id)">
                <v-icon>mdi-heart</v-icon>
              </v-btn>
              {{product.price}} ₴
            </v-col>
          </v-col>
        </v-row>
      </v-container>

    </v-card>
  </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        data() {
            return {
                data: [],
                loading: false,
            }
        },
        computed: {
            ...mapGetters('products', {
                products: 'all'
            })
        },
        methods: {
            ...mapActions('products', {
                loadProducts: 'setAll'
            }),
            like(id) {
                const vm = this;
                this.loading = true;
                this.axios({
                    method: 'get',
                    url: 'user/like/product/' + id,
                }).then(function (response) {
                    if (response.status == 200) {
                        vm.data.forEach(function(item, i, array) {
                            if (item.id == id) {
                                item.is_user_liked = response.data.result
                            }
                        })
                    }
                })
            },
            getData() {
                const vm = this;
                this.loading = true;
                this.axios({
                    method: 'get',
                    url: 'user/products',
                    /*params: {
                        page: vm.pagination.current_page,
                        per_page: vm.pagination.per_page,
                        filters: vm.filters,
                    }*/
                }).then(function (response) {
                    if (response.status == 200) {
                        vm.loadProducts(response.data);
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