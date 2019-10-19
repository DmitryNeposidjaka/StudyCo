<template>
  <ul class="pagination">
    <li><v-icon>mdi-chevron-left</v-icon></li>
    <li v-for="(item) in length"
    >{{item}}</li>
    <li><v-icon>mdi-chevron-right</v-icon></li>
  </ul>
</template>

<script>
    export default {
        name: 'Pagination',
        props: ['length'],
        data: () => ({

        }),
    }
</script>

<style>
  .pagination li {
    color: darkslategrey;
    float: left;
    padding: 5px 5px;
    margin: 0px 3px;
    border: 1px solid gray;
    text-decoration: none;
    transition: background-color .3s;
    display: block;
    list-style-type: none;
  }

  .pagination li.active {
    background-color: dodgerblue;
    color: white;
  }

  .pagination li:hover:not(.active) {background-color: #ddd;}
</style>