<template>
  <div class="architect-home">
    <section class="hero-lab">
      <div class="hero-diagram" aria-label="系统架构拓扑示意图">
        <svg viewBox="0 0 560 430" role="img" aria-hidden="true">
          <g class="diagram-grid">
            <path d="M40 70H520M40 140H520M40 210H520M40 280H520M40 350H520" />
            <path d="M90 30V390M190 30V390M290 30V390M390 30V390M490 30V390" />
          </g>
          <g class="diagram-connections">
            <path d="M150 112L270 112L270 205L374 205" />
            <path d="M150 112L150 268L228 268" />
            <path d="M374 205L374 300L452 300" />
            <path d="M270 205L270 348L350 348" />
            <path d="M228 268L350 348" />
            <path d="M452 300L500 220" />
          </g>
          <g class="diagram-nodes">
            <rect x="92" y="74" width="116" height="76" rx="5" />
            <rect x="218" y="166" width="104" height="78" rx="5" />
            <rect x="336" y="164" width="116" height="82" rx="5" />
            <rect x="184" y="246" width="88" height="58" rx="5" />
            <rect x="324" y="316" width="108" height="64" rx="5" />
            <circle cx="500" cy="220" r="25" />
            <circle cx="150" cy="112" r="5" class="node-dot" />
            <circle cx="374" cy="205" r="5" class="node-dot accent-dot" />
            <circle cx="228" cy="268" r="5" class="node-dot" />
            <circle cx="452" cy="300" r="5" class="node-dot accent-dot" />
          </g>
          <g class="diagram-details">
            <path d="M112 94h76M112 108h58M112 122h88" />
            <path d="M238 187h64M238 201h48M238 215h72" />
            <path d="M356 185h76M356 199h58M356 213h68" />
            <path d="M204 266h48M204 280h36" />
            <path d="M344 338h68M344 352h52" />
            <ellipse cx="500" cy="214" rx="14" ry="5" />
            <path d="M486 214v18c0 3 6 6 14 6s14-3 14-6v-18" />
          </g>
        </svg>
      </div>
      <div class="hero-inner">
        <p class="eyebrow hero-enter hero-enter-1">软考</p>
        <h1 class="hero-enter hero-enter-2">系统架构师<br />备考</h1>
        <p class="hero-copy hero-enter hero-enter-3">
          把知识、真题与复盘交给一套可迭代的学习系统。
        </p>
        <div class="hero-actions hero-enter hero-enter-4">
          <a class="primary-action" href="./start/intro">开始 <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </section>

  </div>
</template>
