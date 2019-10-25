<template>
  <v-card
      style="margin: 20px 0px"
      class="mx-auto"
      max-width="800"
  >
    <!--    <v-img
            class="white&#45;&#45;text"
            height="200px"
            src="https://picsum.photos/400/300?random"
        >
        </v-img>-->
    <v-card-title>
      {{course.displayname}}
    </v-card-title>

    <div class="text-center">
      <v-btn small @click="$vuetify.goTo('#course-files')">
        <v-icon>mdi-file-document</v-icon>
        {{$t('nav.course_to_file')}}
      </v-btn>
    </div>

    <v-card-text v-html="course.summary">
      {{course.summary}}
    </v-card-text>
    <v-expansion-panels>
      <v-expansion-panel
          id="course-files"
          v-for="file in course.files"
          :key="file.id"
      >
        <v-expansion-panel-header>{{file.name}}</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-list>
            <v-subheader>Files</v-subheader>
            <v-list-item-group color="primary">
              <v-list-item
                  v-for="(fileData, i) in file.contentfiles"
                  :key="i"
                  v-on:click="onClick(fileData.fileurl)"
              >
                <v-list-item-icon>
                  <v-icon>mdi-file-download-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title
                      v-text="fileData.filename"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script>
    import {mapGetters} from 'vuex'
    import goTo from 'vuetify/es5/services/goto'

    export default {
        computed: {
            ...mapGetters('courses', {
                getCourseById: 'get'
            }),
            course() {
                return this.getCourseById(this.$router.currentRoute.params.id)
            }
        },
        methods: {
            onClick(fileurl) {
                this.axios({
                    url: fileurl + '?token=' + sessionStorage.getItem('_token'),
                    method: 'GET',
                    responseType: 'blob',
                }).then((response) => {
                    var fileURL = window.URL.createObjectURL(new Blob([response.data]));
                    var fileLink = document.createElement('a');
                    fileLink.href = fileURL;
                    fileLink.setAttribute('download', decodeURI(fileurl.split('/').pop()));
                    document.body.appendChild(fileLink);

                    fileLink.click();
                  });
            }
        }
    }
</script>