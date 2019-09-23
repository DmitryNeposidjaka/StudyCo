<template>
  <div>
    <v-row align="center"
           justify="center">
    <v-progress-circular
        v-if="loading"
        :size="100"
        color="teal lighten-2"
        indeterminate
    ></v-progress-circular>
    </v-row>
    <v-card
        style="margin: 20px 0px"
        v-for="course in courses"
        class="mx-auto"
        max-width="400"
    >
      <v-img
          class="white--text"
          height="200px"
          src="https://picsum.photos/400/300?random"
      >
      </v-img>

      <v-card-text>
        <span>{{course.shortname}}</span><br>
        <div class="text--primary">{{ course.displayname }}</div>
      </v-card-text>

      <v-card-actions>
        <v-btn
            text
            color="orange"
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
                data: [],
                loading: false,
            }
        },
        computed: {
            ...mapGetters('courses', {
                courses: 'all'
            })
        },
        methods: {
            ...mapActions('courses', [
              'setAll'
            ]),
            getData() {
                const vm = this;
                this.loading = true;
                this.axios({
                    method: 'get',
                    url: 'user/courses',
                    /*params: {
                        page: vm.pagination.current_page,
                        per_page: vm.pagination.per_page,
                        filters: vm.filters,
                    }*/
                }).then(function (response) {
                    if (response.status == 200) {
                        vm.setAll(response.data);
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
            console.log(this)
            this.setAll([1,2,3]);
            this.getData()
        }
    }
</script>