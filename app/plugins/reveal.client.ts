export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal', {
    mounted(el: HTMLElement, binding) {
      const { delay = 0, y = 18 } = (binding.value ?? {}) as { delay?: number, y?: number }

      // Hidden state is applied from JS, so content stays visible without JS.
      el.classList.add('reveal')
      if (delay > 0) el.style.setProperty('--reveal-delay', `${delay}ms`)
      if (y !== 18) el.style.setProperty('--reveal-y', `${y}px`)

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              el.classList.add('is-in')
              observer.disconnect()
            }
          }
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
      )

      observer.observe(el)

      // Keep a reference so we can clean up on unmount.
      ;(el as HTMLElement & { _revealObserver?: IntersectionObserver })._revealObserver = observer
    },
    unmounted(el: HTMLElement & { _revealObserver?: IntersectionObserver }) {
      el._revealObserver?.disconnect()
      delete el._revealObserver
    }
  })
})
