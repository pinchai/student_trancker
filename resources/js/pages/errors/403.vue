<template>
    <div>
        <div>
            <b-row class="mt-2">
                <b-col cols="6" xl="6">
                    <h2>{{ $t('no_permission') }}</h2>
                </b-col>
            </b-row>
        </div>
        <b-card class="shadow-lg mt-2 mb-5" style="border-radius: 10px;">
            <span v-if="$i18n.locale == 'en'">You don't have permission to view this page!</span>
            <span v-if="$i18n.locale == 'kh'">អ្នកមិនមានសិទ្ធិដើម្បីមើលទំព័រនេះទេ!</span>
        </b-card>
    </div>
</template>
