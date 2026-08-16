<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import Countdown from './Countdown.vue'
</script>

<template>
  <DefaultTheme.Layout>
    <template #nav-bar-content-after>
      <Countdown class="countdown-desktop" />
    </template>
    <template #nav-screen-content-after>
      <Countdown class="countdown-mobile" />
    </template>
  </DefaultTheme.Layout>
</template>
