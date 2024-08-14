<template>
  <b-modal
    id="modal"
    v-model="modal"
    centered
    no-close-on-backdrop
    no-close-on-esc
    hide-header-close
    size="xl"
    content-class="custom-modal"
  >
    <template slot="modal-header">
      <h3><i class="fa fa-list-alt"></i> {{ $t('reference_file') }}</h3>
    </template>
    <div class="d-block">
      <b-row>
        <!-- drop zone -->
        <b-col cols="12">
          <vue-dropzone
            ref="myVueDropzone"
            id="dropzone"
            :options="dropzoneOptions"
            @vdropzone-sending="sendingEvent"
            @vdropzone-success="dropZoneSuccess"
          ></vue-dropzone>
        </b-col>
        <!-- preview -->
        <b-col cols="12">
          <b-table-simple>
            <b-thead>
              <b-tr>
                <b-th>#</b-th>
                <b-th>File</b-th>
                <b-th>Upload Date</b-th>
                <b-th>Upload By</b-th>
                <b-th>Action</b-th>
              </b-tr>
            </b-thead>
            <b-thead>
              <b-tr v-for="(item, index) in reference_file" :key="index">
                <b-td>{{ index + 1 }}</b-td>
                <b-td>
                  <a
                    v-if="getExtension(item.name) == 'xlsx' || getExtension(item.name) == 'xdoc' || getExtension(item.name) == 'pdf'"
                    target="_blank"
                    :href="server_url +'/transaction_reference_file/' + item.name"
                  >
                    <i style="font-size: 50px" class="fas fa-folder"></i>
                  </a>

                  <a
                    v-else
                    target="_blank"
                    :href="server_url +'/transaction_reference_file/' + item.name"
                  >
                    <img
                      style="width: 50px; height: 50px"
                      class="img-thumbnail rounded"
                      :src="'/transaction_reference_file/' + item.name">
                  </a>
                </b-td>
                <b-td>{{ item.created_at | dateTimeFormat }}</b-td>
                <b-td>{{ item.created_by }}</b-td>
                <b-td>
                  <b-button
                    v-if="checkAuthorize($store.state.permission.delete)"
                    class="btn btn-danger"
                    @click="removeFile(item.name)"
                  >
                    <i class="fas fa-trash"></i>
                  </b-button>
                </b-td>
              </b-tr>
            </b-thead>
          </b-table-simple>
        </b-col>
      </b-row>
    </div>
    <template slot="modal-footer">
      <b-button variant="outline-danger" @click="clearForm" class="float-right">
        <i class="fas fa-times-circle mr-1"></i>
        {{ $t('close') }}
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import {mapGetters} from 'vuex';
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

export default {
  moduleKey: 'warehouse_transfer',
  props: {
    formItem: {
      type: Object,
      default: () => {
        return {}
      },
    },
    modalType: {
      type: Number,
      default: 0,
    },
  },
  data: function () {
    return {
      modal: true,
      dropzoneOptions: {
        url: '/transaction_reference_file/store',
        headers: {
          "X-CSRF-TOKEN": document.head.querySelector("[name=csrf-token]").content
        },
        thumbnailWidth: 200,
        // addRemoveLinks: true,
        acceptedFiles: 'image/*,application/pdf, .psd, .xlsx, .xls, .docx, .HEIC',
        maxFilesize: 5,
      },
      reference_file: [],
      server_url: null,
    }
  },
  components: {
    vueDropzone: vue2Dropzone
  },
  watch: {
    modalType: {
      handler(val) {
        if (val == 1) {
          this.modal = true;
          this.url = '/transaction_reference_file/store';
        } else if (val == 2) {
          this.modal = true;
          this.url = '/transaction_reference_file/store';
        }
      },
      immediate: true,
    },
  },
  computed: {
    ...mapGetters({}),
    modalOk() {
      return this.modalType == 1 ? this.$t('save')
        : (this.modalType == 2 ? this.$t('update')
          : `${this.$t('wait')}...`)
    },
  },
  created() {
    this.fetchRecord();
  },
  methods: {
    fetchRecord() {
      let vm = this;
      this.showOverlay = !this.showOverlay;
      let input = {
        transaction_id: vm.formItem.id,
      };

      axios.post('/transaction_reference_file/get', input).then(function (response) {
        vm.server_url = response.data.server_url;
        vm.showOverlay = !vm.showOverlay;
        vm.reference_file = response.data.data;
      }).catch(function (error) {
        console.log(error)
      });
    },
    // dropZoneRemoveFile(file, error, xhr) {
    //     let image_name = JSON.parse(file.xhr.response).image_name
    //     this.$fire({
    //         title: 'Are you sure?',
    //         text: "You won't be able to revert this!",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Yes, delete it!',
    //         allowOutsideClick: false,
    //         allowEscapeKey: false
    //     }).then((result) => {
    //         if (result.value) {
    //             let vm = this;
    //             let input = {
    //                 name: image_name,
    //                 transaction_id: vm.formItem.id,
    //             }
    //             axios.post('/transaction_reference_file/delete', input).then(function (response) {
    //                 vm.$notify({
    //                     group: 'message',
    //                     type: 'success',
    //                     title: vm.$t('reference'),
    //                     text: vm.$t('done')
    //                 });
    //
    //                 vm.fetchRecord();
    //
    //             });
    //         }
    //     });
    // },
    removeFile(image_name) {
      this.$fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        allowOutsideClick: false,
        allowEscapeKey: false
      }).then((result) => {
        if (result.value) {
          let vm = this;
          let input = {
            name: image_name,
            transaction_id: vm.formItem.id,
          }
          axios.post('/transaction_reference_file/delete', input).then(function (response) {
            vm.$notify({
              group: 'message',
              type: 'success',
              title: vm.$t('reference'),
              text: vm.$t('done')
            });

            vm.fetchRecord();

          });
        }
      });
    },
    sendingEvent(file, xhr, formData) {
      formData.append('transaction_id', this.formItem.id);
    },
    dropZoneSuccess(file, response) {
      this.fetchRecord()
    },
    getExtension(filename) {
      let r = /.+\.(.+)$/.exec(filename);
      return r ? r[1] : null;
    },
    clearForm() {
      this.form = {}

      this.$nextTick(() => {
        this.$validator.reset();
      });

      this.$emit('closeModal', this.listItems);
      this.modal = false
      this.listItems = {}
    },

  }
}
</script>

<style scoped>
/deep/ .custom-modal {
  border-radius: 15px;
}
</style>
