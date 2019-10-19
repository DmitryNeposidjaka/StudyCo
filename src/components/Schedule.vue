<template>
  <v-row v-if="data">
    <v-pagination
        v-on:next="next"
        v-on:previous="previous"
        v-on:input="changeDate"
        :length="7"
        :total-visible="7"
        v-model="selectedDay"

    ></v-pagination>
    <!--<pagination :length="7"/>-->
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
            selectedDay: 1,
            timeline: [],
            week: 1,
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
            createTimeLine() {
                let timeline = [];
                for(var i = 1; i <= 7; i++) {
                    let item = {
                        day: i,
                        date: this.$moment().week(this.week + 33).weekday(i)
                    };
                    timeline.push(item)
                }
                this.timeline = timeline;
            },
            changeDate(number) {
                this.$emit('dayChanged', this.timeline[--number].date)
            },
            next() {
              this.week++
            },
            previous() {
              this.week++
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
                    vm.createTimeLine();
                    vm.changeDate(1);
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