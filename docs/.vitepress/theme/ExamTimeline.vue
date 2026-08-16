<script setup lang="ts">
const points = [
  { date: '2022.11', x: 82, key: false },
  { date: '2023.11', x: 192, key: true },
  { date: '2024.05', x: 302, key: true },
  { date: '2024.11', x: 412, key: false },
  { date: '2025.05', x: 522, key: false },
  { date: '2025.11', x: 632, key: false },
  { date: '2026.05', x: 742, key: false }
]
</script>

<template>
  <figure class="exam-timeline" aria-label="真题时间线">
    <svg class="timeline-svg" viewBox="0 0 800 132" role="img" aria-label="2022 年 11 月至 2026 年 5 月真题时间线">
      <line class="timeline-axis" x1="18" y1="72" x2="770" y2="72" />
      <path class="timeline-arrow" d="M770 72l-8-4v8z" />

      <g v-for="point in points" :key="point.date">
        <text class="timeline-date" :x="point.x" y="28" text-anchor="middle">{{ point.date }}</text>
        <circle :class="point.key ? 'timeline-dot timeline-dot--key' : 'timeline-dot'" :cx="point.x" cy="72" r="5" />
      </g>

      <path class="timeline-transition" d="M192 64v-8h110v8" />
      <rect class="timeline-badge" x="214" y="36" width="66" height="18" rx="9" />
      <text class="timeline-badge-label" x="247" y="49" text-anchor="middle">过渡期</text>

      <text class="timeline-explain" x="192" y="103" text-anchor="middle">第二版大纲</text>
      <text class="timeline-explain" x="192" y="120" text-anchor="middle">机考</text>
      <text class="timeline-explain" x="302" y="103" text-anchor="middle">每年 2 次考试</text>
    </svg>
    <figcaption class="timeline-note">备注：2023 年 11 月和 2024 年 5 月这两次考试的风格接近此前的考试。</figcaption>
  </figure>
</template>

<style scoped>
.exam-timeline { margin: 32px 0 40px; }
.timeline-svg { display: block; width: 100%; height: auto; }
.timeline-axis { stroke: var(--vp-c-border); stroke-width: 2; }
.timeline-arrow { fill: var(--vp-c-text-3); }
.timeline-date { fill: var(--vp-c-text-2); font-family: var(--vp-font-family-mono); font-size: 11px; font-weight: 700; }
.timeline-dot { fill: var(--vp-c-bg); stroke: var(--vp-c-text-3); stroke-width: 2; }
.timeline-dot--key { fill: var(--vp-c-brand-1); stroke: var(--vp-c-bg); stroke-width: 3; }
.timeline-explain { fill: var(--vp-c-text-1); font-size: 11px; font-weight: 700; }
.timeline-transition { fill: none; stroke: var(--vp-c-brand-1); stroke-width: 1.5; }
.timeline-badge { fill: var(--vp-c-brand-soft); }
.timeline-badge-label { fill: var(--vp-c-brand-1); font-size: 10px; font-weight: 700; }
.timeline-note { margin-top: 4px; color: var(--vp-c-text-2); font-size: 12px; line-height: 1.6; }
</style>
