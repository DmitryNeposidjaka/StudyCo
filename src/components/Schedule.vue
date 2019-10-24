<template>
  <v-row v-if="data">

    <pagination v-on:dayChanged="changeDate"/>
      <v-expansion-panels popout>
        <p style="padding: 50px 0px; color: grey; font-weight: bold" v-if="!selectDataByDay">НА цей день розкладу нема</p>
        <v-expansion-panel
            v-for="(lesson, j) in selectDataByDay"
            :key="j"
        >
          <v-expansion-panel-header>{{lesson.start_time}} - {{lesson.end_time}} {{lesson.type}} {{lesson.subject}}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <p><strong>Вчитель:</strong> {{lesson.teacher}}</p>
            <p><strong>Кiмната:</strong> {{lesson.room}}</p>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
  </v-row>
</template>

<script>
    import Pagination from './Pagination'

    export default {
        name: 'Schedule',
        data: () => ({
            loading: false,
            data: []
        }),
        components: {Pagination},
        computed: {
            selectDataByDay() {
                return this.data[this.selectedDay]
            }
        },
        methods: {
            changeDate(date) {
                this.selectedDay = date.day;
                this.$emit('dayChanged', date)
            },
            getData() {
                const vm = this;
                this.loading = true;
                this.axios({
                    method: 'get',
                    url: 'user/schedule',
                    params: {
                        week: vm.week
                    }
                }).then(function (response) {
                    if (response.status == 200) {
                        vm.data = response.data;
                    }
                }).then(function () {
                    vm.loading = false;
                    vm.changeDate({ day: vm.$moment().weekday(), date: vm.$moment()});
                })
            }
        },
        created() {
            this.week = this.$moment().week() - 33;
            this.selectedDay = this.$moment().weekday();
        },
        mounted() {
            this.getData();
        }
    }
</script>
<style>
  .v-pagination__item{
    min-width: 20px!important;
    padding: 0px;
  }
</style>