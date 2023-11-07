<template>
    <li class="nav-item dropdown language-dropdown">
        <a
            href="javascript:void(0);"
            class="nav-link dropdown-toggle text-white"
            id="language-dropdown"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
        >
            <label class="text-white">{{ $i18n.locale | uppercase }}</label>
            <img
                :src="'/assets/img/languages_logo/' + languageLogo"
                class="flag-width"
                alt="flag"
            />
        </a>
        <div
            class="dropdown-menu position-absolute"
            aria-labelledby="language-dropdown"
        >
            <a
                v-for="(lang, index) in langs"
                :key="index"
                class="dropdown-item d-flex"
                href="javascript:void(0);"
                @click="changeLang(lang)"
            >
                <img
                    :src="'/assets/img/languages_logo/' + lang.logo"
                    class="flag-width"
                    alt="flag"
                />
                <span class="align-self-center">{{ lang.text }}</span>
            </a>
        </div>
    </li>
</template>

<script>
export default {
    name: "SelectLocale",
    data() {
        return {
            // langs: ['en', 'kh'],
            langs: [
                { value: "en", text: "English", logo: "en.png" },
                { value: "kh", text: "ខ្មែរ", logo: "kh.png" }
                // {value: 'th', text: 'ประเทศไทย', logo: 'th.png'},
            ]
        };
    },
    computed: {
        languageLogo() {
            let img = this.langs.find(obj => obj.value == this.$i18n.locale);
            return img.logo;
        }
    },
    methods: {
        changeLang(evt) {
            this.$i18n.locale = evt.value;
            this.$validator.localize(evt.value);

            window.document.title = this.$t(this.$route.meta.title);

            localStorage.lang = evt.value;
        }
    }
};
</script>
