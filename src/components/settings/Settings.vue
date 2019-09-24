<template>
  <div>
    <v-btn
        text
        color="orange"
        @click="$router.push({name: 'avatar'})"
    >
      Avatar
    </v-btn>
    <router-view></router-view>
  </div>
</template>

<script>
    export default {
        data() {
            return {}
        }
    }
</script>