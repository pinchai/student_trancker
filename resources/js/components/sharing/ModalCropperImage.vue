<template>
    <b-modal
        id="modal"
        v-model="modal"
        scrollable
        centered
        no-close-on-backdrop
        no-close-on-esc
        hide-header-close
        :title="modalHeader"
        size="xl"
    >
        <b-row>
            <b-col lg="8" md="8" sm="12">
                <input
                    ref="input"
                    type="file"
                    name="image"
                    accept="image/*"
                    @change="setImage"
                />
                <vue-cropper
                    ref="cropper"
                    :aspect-ratio="aspectRatio"
                    :src="imgSrc"
                    :dragMode="dragMode"
                    :cropBoxMovable="cropBoxMovable"
                    :cropBoxResizable="cropBoxResizable"
                    :background="background"
                    preview=".preview"
                />

                <div class="mt-2" style="text-align: center">
                    <b-button
                        v-if="buttonOptions.selectImage"
                        size="sm"
                        variant="primary"
                        @click.prevent="showFileChooser"
                    >
                        {{ $t("select") }}{{ $t("image") }}
                    </b-button>

                    <b-button
                        v-if="buttonOptions.reset"
                        variant="primary"
                        @click.prevent="reset"
                    >
                        {{ $t("reset") }}
                    </b-button>

                    <div
                        v-if="showSeparator1"
                        class="separator mt-2 mb-2"
                    ></div>

                    <b-button
                        v-if="buttonOptions.zoomIn"
                        size="xs"
                        variant="outline-primary"
                        @click.prevent="zoom(0.2)"
                    >
                        {{ $t("zoom_in") }}
                    </b-button>
                    <b-button
                        v-if="buttonOptions.zoomOut"
                        size="xs"
                        variant="outline-primary"
                        @click.prevent="zoom(-0.2)"
                    >
                        {{ $t("zoom_out") }}
                    </b-button>
                    <b-button
                        v-if="buttonOptions.moveLeft"
                        size="xs"
                        variant="outline-primary"
                        @click.prevent="move(-10, 0)"
                    >
                        {{ $t("move_left") }}
                    </b-button>
                    <b-button
                        v-if="buttonOptions.moveRight"
                        size="xs"
                        variant="outline-primary"
                        @click.prevent="move(10, 0)"
                    >
                        {{ $t("move_right") }}
                    </b-button>
                    <b-button
                        v-if="buttonOptions.moveUp"
                        size="xs"
                        variant="outline-primary"
                        @click.prevent="move(0, -10)"
                    >
                        {{ $t("move_up") }}
                    </b-button>

                    <b-button
                        v-if="buttonOptions.moveDown"
                        size="xs"
                        variant="outline-primary"
                        @click.prevent="move(0, 10)"
                    >
                        {{ $t("move_down") }}
                    </b-button>

                    <div
                        v-if="showSeparator2"
                        class="separator mt-2 mb-2"
                    ></div>

                    <b-button
                        v-if="buttonOptions.rotatePlus90"
                        size="xs"
                        variant="outline-primary"
                        @click.prevent="rotate(90)"
                    >
                        {{ $t("rotate") }} +90deg
                    </b-button>
                    <b-button
                        v-if="buttonOptions.rotateMinus90"
                        size="xs"
                        variant="outline-primary"
                        @click.prevent="rotate(-90)"
                    >
                        {{ $t("rotate") }} -90deg
                    </b-button>
                    <b-button
                        v-if="buttonOptions.flipX"
                        size="xs"
                        ref="flipX"
                        variant="outline-primary"
                        @click.prevent="flipX"
                    >
                        {{ $t("flip") }} X
                    </b-button>
                    <b-button
                        v-if="buttonOptions.flipY"
                        size="xs"
                        ref="flipY"
                        variant="outline-primary"
                        @click.prevent="flipY"
                    >
                        {{ $t("flip") }} Y
                    </b-button>
                </div>
            </b-col>
            <b-col lg="4" md="4" sm="12">
                <div
                    class="preview"
                    :style="{
                        width: `${previewWidth}px`,
                        height: `${previewHeight}px`
                    }"
                ></div>
            </b-col>
        </b-row>

        <template slot="modal-footer">
            <b-button size="xs" variant="outline-secondary" @click="clearForm"
                >{{ $t("cancel") }}
            </b-button>
            <b-button size="xs" variant="primary" @click="save">{{
                modalOk
            }}</b-button>
        </template>
    </b-modal>
</template>
<script>
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
export default {
    components: {
        VueCropper
    },
    props: {
        modalShow: {
            type: Boolean,
            default: false
        },
        targetFile: {
            type: Event,
            default: () => {
                return {};
            }
        },
        aspectRatio: {
            type: Number,
            default: 1 / 1
        },
        previewWidth: {
            type: Number,
            default: 209
        },
        previewHeight: {
            type: Number,
            default: 209
        },
        dragMode: {
            type: String,
            default: "move"
        },
        cropBoxMovable: {
            type: Boolean,
            default: true
        },
        cropBoxResizable: {
            type: Boolean,
            default: true
        },
        background: {
            type: Boolean,
            default: true
        },
        buttonOptions: {
            type: Object,
            default: () => {
                return {};
            }
        }
    },
    data() {
        return {
            imgSrc: "/default_background.jpg",
            cropImg: "",
            data: null,
            modal: false,
            showSeparator1: false,
            showSeparator2: false
        };
    },
    computed: {
        modalHeader() {
            return `${this.$t("crop")} ${this.$t("image")}`;
        },
        modalOk() {
            return this.$t("crop");
        }
    },
    watch: {
        modalShow: {
            handler(val) {
                this.modal = val;
            },
            immediate: true
        },
        targetFile: {
            handler(val) {
                this.setImage(val);
            },
            immediate: true
        },
        buttonOptions: {
            handler(val) {
                val.selectImage = val.selectImage ?? false;
                val.reset = val.reset ?? false;
                val.zoomIn = val.zoomIn ?? false;
                val.zoomOut = val.zoomOut ?? false;
                val.moveLeft = val.moveLeft ?? false;
                val.moveRight = val.moveRight ?? false;
                val.moveUp = val.moveUp ?? false;
                val.moveDown = val.moveDown ?? false;
                val.rotatePlus90 = val.rotatePlus90 ?? false;
                val.rotateMinus90 = val.rotateMinus90 ?? false;
                val.flipX = val.flipX ?? false;
                val.flipY = val.flipY ?? false;
                this.showSeparator();
            },
            immediate: true
        }
    },
    methods: {
        cropImage() {
            this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
        },
        flipX() {
            const dom = this.$refs.flipX;
            let scale = dom.getAttribute("data-scale");
            scale = scale ? -scale : -1;
            this.$refs.cropper.scaleX(scale);
            dom.setAttribute("data-scale", scale);
        },
        flipY() {
            const dom = this.$refs.flipY;
            let scale = dom.getAttribute("data-scale");
            scale = scale ? -scale : -1;
            this.$refs.cropper.scaleY(scale);
            dom.setAttribute("data-scale", scale);
        },
        getCropBoxData() {
            this.data = JSON.stringify(
                this.$refs.cropper.getCropBoxData(),
                null,
                4
            );
        },
        getData() {
            this.data = JSON.stringify(this.$refs.cropper.getData(), null, 4);
        },
        move(offsetX, offsetY) {
            this.$refs.cropper.move(offsetX, offsetY);
        },
        reset() {
            this.$refs.cropper.reset();
        },
        rotate(deg) {
            this.$refs.cropper.rotate(deg);
        },
        setCropBoxData() {
            if (!this.data) return;

            this.$refs.cropper.setCropBoxData(JSON.parse(this.data));
        },
        setData() {
            if (!this.data) return;

            this.$refs.cropper.setData(JSON.parse(this.data));
        },
        setImage(e) {
            const file = e.target.files[0];

            if (file.type.indexOf("image/") === -1) {
                alert("Please select an image file");
                return;
            }

            if (typeof FileReader === "function") {
                const reader = new FileReader();

                reader.onload = event => {
                    this.imgSrc = event.target.result;
                    // rebuild cropperjs with the updated source
                    this.$refs.cropper.replace(event.target.result);
                };

                reader.readAsDataURL(file);
            } else {
                alert("Sorry, FileReader API not supported");
            }
        },
        showFileChooser() {
            this.$refs.input.click();
        },
        zoom(percent) {
            this.$refs.cropper.relativeZoom(percent);
        },
        save() {
            this.modal = false;
          // let data = this.$refs.cropper.getCroppedCanvas().toBlob((blob)=>{
          //   // console.log(blob)
          //   const formData = new FormData();
          //   return formData.append('croppedImage', blob/*, 'example.png' */);
          // })
          //
          // for (const [key, value] of data) {
          //   console.log(key,value)
          // }
            let binary = this.$refs.cropper.getCroppedCanvas().toDataURL();
            this.$emit("save", binary);
            this.$refs.cropper.destroy();
        },
        clearForm() {
            this.modal = false;
            this.$emit("closeModal", null);
            this.$refs.cropper.destroy();
        },
        showSeparator() {
            let options = this.buttonOptions;
            if (options.selectImage || options.reset) {
                this.showSeparator1 = true;
            }
            if (
                options.zoomIn ||
                options.zoomOut ||
                options.moveLeft ||
                options.moveRight ||
                options.moveUp ||
                options.moveDown
            ) {
                this.showSeparator2 = true;
            }
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input[type="file"] {
    display: none;
}

.preview {
    overflow: hidden;
    border: 1px solid red;
}
</style>
