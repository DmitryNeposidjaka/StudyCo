<template>
  <v-card
      style="margin: 20px 0px"
      class="mx-auto"
      max-width="800"
  >
    <v-img
        class="white--text"
        height="200px"
        src="https://picsum.photos/400/300?random"
    >
    </v-img>

    <v-card-text>
{{course.title}}
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
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {

        computed: {
            ...mapGetters('courses', {
                course: course => course.get(11)
            })
        },
    }
</script>