<script setup lang="ts">
import { computed, ref } from 'vue'

interface Segment {
  name: string
  value: number
  color: string
}

interface Arc extends Segment {
  percent: number
  d: string
}

const props = withDefaults(
  defineProps<{
    segments: Segment[]
    centerLabel?: string
    centerSub?: string
    base?: number
  }>(),
  {
    centerLabel: '合计',
    centerSub: '',
    base: 0
  }
)

const total = computed(() => props.segments.reduce((sum, s) => sum + s.value, 0))
const base = computed(() => props.base || total.value)
const active = ref<number | null>(null)

/** 分段之间的设计间隙（角度） */
const GAP_DEG = 2

const CX = 21
const CY = 21
const R = 15.915

function polar(r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180
  return [CX + r * Math.cos(rad), CY + r * Math.sin(rad)] as const
}

function arcPath(startDeg: number, endDeg: number, span: number) {
  if (span <= 0) return ''
  const [sx, sy] = polar(R, startDeg)
  const [ex, ey] = polar(R, endDeg)
  const large = span > 180 ? 1 : 0
  return `M ${sx.toFixed(3)} ${sy.toFixed(3)} A ${R} ${R} 0 ${large} 1 ${ex.toFixed(3)} ${ey.toFixed(3)}`
}

const arcs = computed<Arc[]>(() => {
  let acc = 0
  return props.segments.map((seg) => {
    const start = acc
    acc += seg.value
    const startDeg = (start / base.value) * 360 + GAP_DEG
    const endDeg = ((start + seg.value) / base.value) * 360 - GAP_DEG
    return {
      name: seg.name,
      value: seg.value,
      color: seg.color,
      percent: (seg.value / base.value) * 100,
      d: arcPath(startDeg, endDeg, endDeg - startDeg)
    }
  })
})

/** 合格线刻度已移除，仅保留分段与中心文字 */

function fmt(n: number) {
  return n.toFixed(1)
}
</script>

<template>
  <div class="score-donut" :class="{ 'is-idle': active !== null }">
    <div class="donut-wrap">
      <svg
        class="donut"
        viewBox="0 0 42 42"
        role="img"
        :aria-label="`各分组分值占比（基准 ${base} 分）`"
      >
        <circle class="donut-track" :cx="CX" :cy="CY" :r="R" fill="none" />
        <path
          v-for="(arc, i) in arcs"
          :key="arc.name"
          class="donut-seg"
          :class="{ 'is-active': active === i, 'is-small': arc.percent < 5 }"
          :d="arc.d"
          fill="none"
          pathLength="100"
          :style="{
            '--i': i,
            stroke: arc.color
          }"
          @mouseenter="active = i"
          @mouseleave="active = null"
        >
          <title>{{ arc.name }}：{{ arc.value }} 分（{{ fmt(arc.percent) }}%）</title>
        </path>
      </svg>
      <div class="donut-center">
        <strong>{{ active !== null ? `${arcs[active].value} 分` : centerLabel }}</strong>
        <span>{{ active !== null ? `${fmt(arcs[active].percent)}% · 占比` : centerSub }}</span>
      </div>
    </div>

    <ul class="donut-legend">
      <li
        v-for="(arc, i) in arcs"
        :key="arc.name"
        :class="{ 'is-active': active === i }"
        @mouseenter="active = i"
        @mouseleave="active = null"
      >
        <i :style="{ background: arc.color }" aria-hidden="true"></i>
        <span class="legend-copy">
          <span class="legend-name">{{ arc.name }}</span>
          <span class="legend-value"><strong>{{ arc.value }}</strong> 分 <em>{{ fmt(arc.percent) }}%</em></span>
        </span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.score-donut {
  display: grid;
  grid-template-columns: minmax(180px, 0.78fr) minmax(0, 1.22fr);
  align-items: center;
  gap: clamp(24px, 4vw, 48px);
  margin: 28px 0 12px;
  padding: 20px 0;
  border-top: 1px solid var(--vp-c-divider);
  border-bottom: 1px solid var(--vp-c-divider);
}

.donut-wrap {
  position: relative;
  width: min(100%, 220px);
  aspect-ratio: 1;
  margin: 0 auto;
  padding: 0;
}

.donut {
  display: block;
  width: 100%;
  height: 100%;
}

.donut-track {
  stroke: var(--vp-c-divider);
  stroke-width: 5.4;
}

.donut-seg {
  stroke-width: 5.4;
  stroke-linecap: butt;
  cursor: pointer;
  pointer-events: stroke;
  opacity: 0.92;
  stroke-dasharray: 100 0;
  transition: opacity 0.2s ease, filter 0.2s ease;
  animation: donut-draw 0.9s cubic-bezier(0.33, 1, 0.68, 1) both;
  animation-delay: calc(var(--i) * 70ms + 120ms);
}

.donut-seg.is-small {
  stroke-linecap: butt;
}

.score-donut.is-idle .donut-seg {
  opacity: 0.25;
}

.score-donut.is-idle .donut-seg.is-active {
  opacity: 1;
  filter: saturate(1.15);
}

.donut-center {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  pointer-events: none;
}

.donut-center strong {
  color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-mono);
  font-size: 26px;
  line-height: 1.2;
  transition: color 0.2s ease;
}

.score-donut.is-idle .donut-center strong {
  color: var(--vp-c-brand-1);
}

.donut-center span {
  max-width: 130px;
  margin-top: 5px;
  color: var(--vp-c-text-3);
  font-size: 11px;
  line-height: 1.45;
}

.donut-legend {
  display: grid;
  gap: 0;
  min-width: 0;
  margin: 0;
  padding: 0;
  list-style: none;
}

.donut-legend li {
  display: grid;
  grid-template-columns: 11px minmax(0, 1fr);
  align-items: center;
  gap: 10px;
  padding: 8px 0;
  border-bottom: 1px solid color-mix(in srgb, var(--vp-c-divider) 70%, transparent);
  cursor: pointer;
  transition: color 0.15s ease;
}

.donut-legend li:last-child {
  border-bottom-color: transparent;
}

.donut-legend li:hover,
.donut-legend li.is-active {
  color: var(--vp-c-brand-1);
}

.donut-legend li:hover .legend-name,
.donut-legend li.is-active .legend-name {
  color: var(--vp-c-brand-1);
}

.donut-legend i {
  width: 11px;
  height: 11px;
  border-radius: 3px;
}

.legend-copy {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  min-width: 0;
}

.legend-name {
  min-width: 0;
  color: var(--vp-c-text-1);
  font-size: 13px;
  line-height: 1.45;
  font-weight: 600;
}

.legend-value {
  color: var(--vp-c-text-2);
  font-family: var(--vp-font-family-mono);
  font-size: 11px;
  white-space: nowrap;
}

.legend-value strong {
  color: var(--vp-c-text-1);
  font-size: 13px;
}

.legend-value em {
  margin-left: 7px;
  color: var(--vp-c-text-3);
  font-style: normal;
}

@keyframes card-in {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
}

@keyframes donut-draw {
  from {
    stroke-dasharray: 0 100;
  }

  to {
    stroke-dasharray: 100 0;
  }
}

@media (max-width: 640px) {
  .score-donut {
    grid-template-columns: 1fr;
    align-items: stretch;
    gap: 20px;
    padding: 22px 0;
  }

  .donut-wrap {
    width: min(100%, 208px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .score-donut,
  .donut-seg {
    animation: none;
  }
}
</style>
