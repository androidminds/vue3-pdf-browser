<template>
  <div class="text-red-500 text-lg">
   {{t('AppTitle')}}
  </div>

</template>

<script setup lang="ts">
import { onBeforeMount  } from 'vue';
import bus from './bus'

import { useI18n } from 'vue-i18n';
const { t, locale } = useI18n()

onBeforeMount(() => {
    // set the application's language
    locale.value = navigator.language

    document.title = t('AppTitle')
})

</script>