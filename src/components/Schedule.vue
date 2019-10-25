<template>
  <v-row v-if="data">

    <pagination v-on:dayChanged="changeDate" @weekChanged="weekChanged"/>
    <div class="text-center" style="width: 100%; margin: 40px 0px;" v-if="loading">
      <v-progress-circular
          :size="100"
          color="teal lighten-2"
          indeterminate
      ></v-progress-circular>
    </div>
      <v-expansion-panels popout v-if="!loading">
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
            week: 1,
            selectedDay: 1,
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
            weekChanged(week) {
                this.week = week;
                this.getData()
            },
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
                    vm.changeDate({
                        day: vm.$moment().week() == vm.week + 33? vm.$moment().weekday() : 1,
                        date: vm.$moment()});
                    vm.loading = false;

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