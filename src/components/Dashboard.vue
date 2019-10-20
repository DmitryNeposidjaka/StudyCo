<template>
  <div style="margin: 50px 0px">
    <v-row
           justify="center">
      <v-col md="12">
        <v-card>
          <canvas id="myChart" width="100%" height="100"></canvas>
          <!--<v-sheet
              class="v-sheet&#45;&#45;offset mx-auto"
              color="cyan"
              elevation="12"
              max-width="calc(100% - 32px)"
          >
            <v-sparkline
                :labels="labels"
                :value="value"
                color="white"
                line-width="2"
                padding="16"
            ></v-sparkline>
          </v-sheet>

          <v-card-text class="pt-0">
            <div class="title font-weight-light mb-2">User Registrations</div>
            <div class="subheading font-weight-light grey&#45;&#45;text">Last Campaign Performance</div>
            <v-divider class="my-2"></v-divider>
            <v-icon
                class="mr-2"
                small
            >
              mdi-clock
            </v-icon>
            <span class="caption grey&#45;&#45;text font-weight-light">last registration 26 minutes ago</span>
          </v-card-text>-->
        </v-card>
      </v-col>
    </v-row>
    <v-row
           justify="center">
      <v-col md="12">

        <v-card>
          <v-card-title>{{$t('dashboard.schedule')}}{{ date.format('DD.MM')}}</v-card-title>
          <schedule v-on:dayChanged="setDate"/>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
    import Schedule from './Schedule'
    import 'chart.js'

    export default {

        data() {
            return {
                date: this.$moment(),
                table: '',
                marks: [],
                labels: [
                    '12am',
                    '3am',
                    '6am',
                    '9am',
                    '12pm',
                    '3pm',
                    '6pm',
                    '9pm',
                ],
                value: [
                    200,
                    675,
                    410,
                    390,
                    310,
                    460,
                    250,
                    240,
                ],
            }
        },
        components: {Schedule},
        methods: {
            setDate(date) {
                this.date = date
            },
            getData() {
                const vm = this;
                this.loading = true;
                this.axios({
                    method: 'get',
                    url: 'user/marks'
                }).then(function (response) {
                    if (response.status == 200) {
                        vm.marks = response.data;
                    }
                }).then(function () {
                    vm.setChart()
                })
            },
            setChart() {
                let avgObject = {
                    items: 0,
                    sum: 0,
                    average() {
                        return this.items && this.sum ? Math.round(this.sum / this.items) : 0;
                    }
                };

                let project = {}, marks = {}, visited = {};
                Object.assign(project, avgObject) ;
                Object.assign(marks, avgObject) ;
                Object.assign(visited, avgObject) ;
                this.marks.forEach(function(item, i, array) {
                    if(item.pctMark != "0") {
                        project.items += 1;
                        project.sum += parseInt(item.pctMark);
                    }
                    if(item.maxMark != "0") {
                        marks.items += 1;
                        marks.sum += Math.round(parseInt(item.mark) * 100 / parseInt(item.maxMark))
                    }
                    visited.items += 1;
                    visited.sum += parseInt(item.pctAttendance);
                });

                var ctx = document.getElementById('myChart');
                var myBarChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ['проект', 'оценки', 'посещение'],
                        datasets: [{
                        //    label: '# of Votes',
                            data: [project.average(), marks.average(), visited.average()],
                            backgroundColor: [
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 99, 132, 0.2)',
                            ],
                            borderColor: [
                                'rgba(255, 206, 86, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 99, 132, 1)',
                            ],
                            borderWidth: 1,
                        }]
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    min: 0,
                                    max: 100,
                                    callback: function(value) {
                                        return value + "%"
                                    }
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: this.$t('dashboard.percentage')
                                }
                            }]
                        }
                    }
                });
            }
        },
        mounted() {
            this.getData();
        }
    }
</script>

<style>
  .v-sheet--offset {
    top: -24px;
    position: relative;
  }
</style>