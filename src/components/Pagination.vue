<template>
  <ul class="pagination">
    <li @click="previous">
      <v-icon>mdi-chevron-left</v-icon>
    </li>
    <li v-for="(item) in timeline"
        @click="changeDate(item)"
        :class="selectedDay == item.day? 'active' : ''"
    >{{item.date.format('dd')}}
    </li>
    <li @click="next">
      <v-icon>mdi-chevron-right</v-icon>
    </li>
  </ul>
</template>

<script>
    export default {
        name: 'Pagination',
        data: () => ({
            selectedDay: 1,
            week: 1,
            timeline: []
        }),
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
                this.selectedDay = 1;
                this.changeDate({
                    day: 1,
                    date: this.$moment().week(this.week + 33).weekday(1)
                })
            },
            changeDate(item) {
                this.selectedDay = item.day;
                this.$emit('dayChanged', item)
            },
            next() {
                this.week += 1;
                this.createTimeLine();
                this.$emit('weekChanged', this.week)
            },
            previous() {
                this.week -= 1;
                this.createTimeLine();
                this.$emit('weekChanged', this.week)
            },
        },
        created() {
            this.week = this.$moment().week() - 33;
            this.createTimeLine();
            this.selectedDay = this.$moment().weekday();
        },
    }
</script>

<style>
  .pagination {
    padding: 10px;
    font-size: 14px;
  }
  .pagination li {
    color: darkslategrey;
    float: left;
    padding: 5px 5px;
    margin: 0px 3px;
    border: 1px solid #e0e0e0;
    border-radius: 2px;
    text-decoration: none;
    transition: background-color .3s;
    display: block;
    list-style-type: none;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  }

  .pagination li.active {
    background-color: #ddd;
    color: white;
  }

  .pagination li:hover:not(.active) {
    background-color: #ddd;
  }
</style>