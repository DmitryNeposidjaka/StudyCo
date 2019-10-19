<template>
  <v-app id="login" class="secondary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <!--<img src="static/logo.png" alt="Vue Material Admin" width="180" height="180">-->
                  <h1 class="flex my-4 primary--text">Vue Admin Template</h1>
                </div>
                <v-form>
                  <v-text-field
                      name="login"
                      label="Login"
                      type="text"
                      v-model="form.username"
                      :error="error"
                      :rules="[rules.required]"/>
                  <v-text-field
                      type='password'
                      name="password"
                      label="Password"
                      id="password"
                      :rules="[rules.required]"
                      v-model="form.password"
                      :error="error"/>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn block color="primary" @click="login" :loading="loading">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
    export default {
        data() {
            return {
                loading: false,
                form: {
                    username: '',
                    password: '',
                },
                error: false,
                rules: {
                    required: value => !!value || 'Required.'
                }
            }
        },
        methods: {
            getFormData(data = {}){
                const formData = new FormData();
                for(var key in data){
                    formData.append(key, data[key]);
                }
                return formData;
            },
            login() {
                const vm = this;
                this.axios({
                    method: 'post',
                    url: 'login',
                    data: this.getFormData(this.form)
                }).then(function (response) {
                    if(response.status == 200){
                        sessionStorage.setItem('_token', response.data.token)
                        vm.axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('_token');
                    }
                }).then(function () {
                    vm.$router.push({name: 'main'})
                })
            }
        }
    }
</script>

<style scoped lang="css">
  #login {
    height: 50%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    z-index: 0;
  }
</style>