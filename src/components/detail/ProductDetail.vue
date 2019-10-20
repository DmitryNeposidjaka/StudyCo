<template>
  <v-card
      elevation="24"
      max-width="444"
      class="mx-auto"
  >
    <v-system-bar lights-out></v-system-bar>
    <v-carousel
        :continuous="false"
        :cycle="cycle"
        :show-arrows="false"
        hide-delimiter-background
        delimiter-icon="mdi-minus"
        height="300"
    >
      <v-carousel-item
          v-for="(slide, i) in product.thumbnails"
          :key="i"
      >
        <v-sheet
            height="100%"
            tile
        >
          <v-img :src="slide"></v-img>

        </v-sheet>
      </v-carousel-item>
    </v-carousel>
    <v-list two-line>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>{{product.title}}</v-list-item-title>
          <v-list-item-subtitle>{{product.price}} ₴</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon :color="product.is_user_liked? 'red' : 'grey'" @click="like(product.id)">
            <v-icon>mdi-heart</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-card-text class="text--primary" v-html="product.description">
      {{product.description}}
    </v-card-text>
  </v-card>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        data () {
            return {
                colors: [
                    'green',
                    'secondary',
                    'yellow darken-4',
                    'red lighten-2',
                    'orange darken-1',
                ],
                cycle: false,
                slides: [
                    'First',
                    'Second',
                    'Third',
                    'Fourth',
                    'Fifth',
                ],
            }
        },
        computed: {
            ...mapGetters('products', {
                getArticleById: 'get'
            }),
            product() {
                return this.getArticleById(this.$router.currentRoute.params.id)
            }
        },
        methods: {
            like(id) {
                const vm = this;
                this.axios({
                    method: 'get',
                    url: 'user/like/product/' + id,
                }).then(function (response) {
                    if (response.status == 200) {
                        vm.product.is_user_liked = response.data.result
                    }
                })
            },
        }
    }
</script>