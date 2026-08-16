<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const examDate = new Date('2026-10-24T00:00:00+08:00')
const daysLeft = ref(getDaysLeft())
let timer: ReturnType<typeof setInterval> | undefined

function getDaysLeft() {
  const diff = examDate.getTime() - Date.now()
  return Math.max(0, Math.ceil(diff / 86400000))
}

onMounted(() => {
  timer = setInterval(() => {
    daysLeft.value = getDaysLeft()
  }, 60000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <div
    class="countdown-badge"
    role="status"
    tabindex="0"
    :aria-label="`距考试 ${daysLeft} 天`"
  >
    <strong>距考试 {{ daysLeft }} 天</strong>
    <span class="countdown-tooltip">预计考试 2026.10.24</span>
  </div>
</template>
