<template>
  <div id="userLayout" :class="['user-layout-wrapper', isMobile && 'mobile']">
    <!-- Background -->
    <div class="bg-layer" aria-hidden="true">
      <div class="bg-base"></div>
      <div class="bg-orb orb-1"></div>
      <div class="bg-orb orb-2"></div>

      <!-- Dot grid -->
      <div class="bg-dot-grid"></div>

      <!-- Candle chart -->
      <div class="bg-chart">
        <div class="candle-row">
          <span v-for="n in 50" :key="'c'+n" class="candle" :style="getCandleStyle(n)"></span>
        </div>
      </div>

      <!-- Trend area fill -->
      <div class="bg-trend-area"></div>

      <!-- Vignette -->
      <div class="bg-vignette"></div>
    </div>

    <div class="container">
      <div class="user-layout-lang">
        <select-lang class="select-lang-trigger" />
      </div>

      <div class="user-layout-content">
        <div class="top">
          <div class="header">
            <a href="/" class="logo-link">
              <img :src="loginLogo" class="logo" :alt="brandConfig.app_name">
            </a>
          </div>
          <div class="tagline">
            <span class="tagline-accent">AI-Powered</span> Quantitative Trading Platform
          </div>
        </div>

        <div class="main-content">
          <router-view />
        </div>

        <div class="footer">
          <div class="copyright">
            {{ brandConfig.copyright }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { deviceMixin } from '@/store/device-mixin'
import SelectLang from '@/components/SelectLang'
import defaultLogo from '@/assets/logo.png'

export default {
  name: 'UserLayout',
  components: { SelectLang },
  mixins: [deviceMixin],
  data () {
    return { showRisk: false }
  },
  computed: {
    ...mapState({
      brandConfig: state => state.brand.config
    }),
    loginLogo () {
      const remote = this.brandConfig && this.brandConfig.logos && this.brandConfig.logos.light
      return remote || defaultLogo
    }
  },
  methods: {
    getCandleStyle (n) {
      // Deterministic pseudo-random based on n
      const h = 25 + ((n * 37) % 120)
      const isGreen = (n % 3) === 0 || (n % 5) === 0
      const delay = -((n * 0.12) % 4)
      return {
        height: h + 'px',
        color: isGreen ? '#22c55e' : '#ef4444',
        animationDelay: delay + 's'
      }
    }
  },
  mounted () {
    document.body.classList.add('userLayout')
  },
  beforeDestroy () {
    document.body.classList.remove('userLayout')
  }
}
</script>

<style lang="less" scoped>
@bg-deep: #020617;
@accent-blue: #38bdf8;
@accent-green: #22c55e;
@accent-red: #ef4444;
@text-primary: rgba(255, 255, 255, 0.92);
@text-secondary: rgba(255, 255, 255, 0.5);
@text-muted: rgba(255, 255, 255, 0.3);

#userLayout.user-layout-wrapper {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  background: @bg-deep;

  .bg-layer {
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;

    .bg-base {
      position: absolute;
      inset: 0;
      background:
        radial-gradient(ellipse 120% 80% at 50% 0%, rgba(15, 23, 42, 0.95) 0%, transparent 55%),
        radial-gradient(ellipse 80% 100% at 0% 50%, rgba(34, 197, 94, 0.06) 0%, transparent 40%),
        radial-gradient(ellipse 80% 100% at 100% 50%, rgba(56, 189, 248, 0.06) 0%, transparent 40%),
        @bg-deep;
    }

    .bg-orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);

      &.orb-1 {
        width: 600px; height: 400px;
        background: radial-gradient(circle, rgba(@accent-blue, 0.45), transparent 65%);
        top: -5%; left: 55%;
        animation: orbFloat1 20s ease-in-out infinite alternate;
        opacity: 0.6;
      }
      &.orb-2 {
        width: 500px; height: 500px;
        background: radial-gradient(circle, rgba(@accent-green, 0.35), transparent 65%);
        bottom: -15%; left: -10%;
        animation: orbFloat2 18s ease-in-out infinite alternate;
        opacity: 0.5;
      }
    }

    .bg-dot-grid {
      position: absolute;
      inset: 0;
      background-image: radial-gradient(rgba(56, 189, 248, 0.55) 1px, transparent 1px);
      background-size: 32px 32px;
      mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, black 0%, transparent 70%);
      opacity: 0.9;
    }

    .bg-chart {
      position: absolute;
      bottom: 3%;
      left: 2%;
      right: 2%;
      height: 260px;
      pointer-events: none;
      opacity: 0.25;
      overflow: hidden;

      .candle-row {
        display: flex;
        align-items: flex-end;
        justify-content: center;
        gap: 4px;
        height: 100%;

        .candle {
          position: relative;
          width: 4px;
          min-height: 16px;
          background: currentColor;
          border-radius: 2px;
          transform-origin: bottom;
          animation: candlePulse 3.5s ease-in-out infinite;

          &::before {
            content: '';
            position: absolute;
            left: 1.5px;
            top: -8px;
            width: 1px;
            height: 16px;
            background: currentColor;
            opacity: 0.7;
          }
        }
      }
    }

    .bg-trend-area {
      position: absolute;
      bottom: 0;
      left: -10%;
      right: -10%;
      height: 40%;
      background: linear-gradient(90deg,
        transparent 0%,
        rgba(34, 197, 94, 0.04) 15%,
        rgba(34, 197, 94, 0.10) 35%,
        rgba(56, 189, 248, 0.07) 55%,
        rgba(34, 197, 94, 0.06) 75%,
        transparent 100%
      );
      clip-path: polygon(
        0% 100%,
        0% 80%,
        10% 65%,
        20% 55%,
        30% 50%,
        40% 40%,
        50% 35%,
        60% 30%,
        70% 25%,
        80% 20%,
        90% 15%,
        100% 8%,
        100% 100%
      );
      opacity: 0.8;
    }

    .bg-vignette {
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse 70% 70% at 50% 50%, transparent 55%, rgba(2, 6, 23, 0.7) 100%);
    }
  }

  .container {
    position: relative;
    z-index: 1;
    min-height: 100vh;
    display: flex;
    flex-direction: column;

    .user-layout-lang {
      width: 100%;
      height: 52px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 0 28px;

      .select-lang-trigger {
        cursor: pointer;
        padding: 8px 14px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        color: @text-secondary;
        border-radius: 8px;
        transition: all 0.3s;
        border: 1px solid transparent;

        &:hover {
          color: @accent-blue;
          border-color: rgba(@accent-blue, 0.2);
          background: rgba(@accent-blue, 0.05);
        }
      }
    }

    .user-layout-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 16px 20px 28px;
      max-width: 460px;
      margin: 0 auto;
      width: 100%;

      .top {
        text-align: center;
        margin-bottom: 24px;

        .header {
          .logo-link {
            display: inline-block;
            padding: 16px 28px;
            background: linear-gradient(145deg, rgba(56, 189, 248, 0.04), rgba(34, 197, 94, 0.02));
            border: 1px solid rgba(56, 189, 248, 0.1);
            border-radius: 16px;
            backdrop-filter: blur(20px);
            transition: all 0.4s ease;

            &:hover {
              border-color: rgba(56, 189, 248, 0.2);
              box-shadow: 0 0 40px rgba(56, 189, 248, 0.08);
            }

            .logo {
              width: 240px;
              max-width: 55vw;
              height: auto;
              display: block;
            }
          }
        }

        .tagline {
          margin-top: 16px;
          font-size: 13px;
          color: @text-secondary;
          letter-spacing: 1.5px;
          text-transform: uppercase;

          .tagline-accent {
            color: @accent-green;
            font-weight: 500;
          }
        }
      }

      .main-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .footer {
        margin-top: 20px;
        text-align: center;

        .copyright {
          color: @text-muted;
          font-size: 12px;
          letter-spacing: 0.5px;
        }
      }
    }
  }
}

@keyframes orbFloat1 {
  0% { transform: translate3d(0, 0, 0) scale(1); }
  100% { transform: translate3d(-40px, 30px, 0) scale(1.15); }
}

@keyframes orbFloat2 {
  0% { transform: translate3d(0, 0, 0) scale(1); }
  100% { transform: translate3d(30px, -20px, 0) scale(1.1); }
}

@keyframes candlePulse {
  0%, 100% { opacity: 0.5; transform: scaleY(1); }
  50% { opacity: 1; transform: scaleY(1.06); }
}

@media (max-width: 576px) {
  #userLayout.user-layout-wrapper .container .user-layout-content {
    padding: 12px 16px 20px;

    .top .header .logo-link {
      padding: 12px 20px;
      border-radius: 12px;

      .logo { width: 180px; }
    }
    .top .tagline { font-size: 11px; letter-spacing: 1px; }
  }
}
</style>
