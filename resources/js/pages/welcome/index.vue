<template>
    <div></div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
    computed: {
        ...mapGetters({
            firstModule: "getFirstModule"
        })
    },
    watch: {
        firstModule: {
            handler(val) {
                if (this.$helpers.nullToVoid(val) != "") {
                    this.$router.push({ name: val }).catch(err => {});
                }
            },
            immediate: true
        }
    }
};
</script>
