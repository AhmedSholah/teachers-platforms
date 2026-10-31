// Comprehensive list of reserved system names that cannot be used as teacher subdomains
export const RESERVED_SUBDOMAINS = new Set([
  'www',
  'admin',
  'administrator',
  'api',
  'app',
  'auth',
  'billing',
  'cdn',
  'dashboard',
  'dev',
  'docs',
  'help',
  'login',
  'mail',
  'preview',
  'register',
  'root',
  'signup',
  'staging',
  'static',
  'status',
  'support',
  'test'
])

// Strict subdomain regex: 1-63 chars, lowercase alphanumeric and hyphens, no leading/trailing hyphens
const SUBDOMAIN_REGEX = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/

export const useSubdomain = () => {
  const url = useRequestURL()
  const route = useRoute()

  return computed<string | null>(() => {
    let candidate: string | null = null

    // 1. In development ONLY: allow testing via ?subdomain=name or ?tenant=name
    // Tree-shaken out of production builds by Vite/Rollup
    if (import.meta.dev) {
      const querySub = route.query?.subdomain || route.query?.tenant
      if (typeof querySub === 'string' && querySub.trim()) {
        candidate = querySub.trim().toLowerCase()
      }
    }

    if (!candidate) {
      const host = url.hostname.toLowerCase()

      // 2. Ignore pure IP addresses (IPv4 & IPv6 loopback)
      if (/^(\d{1,3}\.){3}\d{1,3}$/.test(host) || host === '::1') {
        return null
      }

      // 3. Localhost development (e.g. "ahmed.localhost")
      if (host.endsWith('localhost')) {
        const parts = host.split('.')
        if (parts.length > 1 && parts[0] !== 'localhost') {
          candidate = parts[0]
        }
      }
      // 4. Wildcard / Production domains (e.g. "ahmed.platform.com" or "ahmed.lvh.me")
      else {
        const parts = host.split('.')
        // Standard SaaS setup: sub.domain.tld (>= 3 parts)
        if (parts.length >= 3) {
          candidate = parts[0]
        }
      }
    }

    // 5. SECURITY VALIDATION:
    if (!candidate) return null

    // Ensure candidate is strictly alphanumeric + hyphens (prevents XSS, path traversal, injection)
    if (!SUBDOMAIN_REGEX.test(candidate)) {
      return null
    }

    // Ensure candidate is not a reserved system keyword
    if (RESERVED_SUBDOMAINS.has(candidate)) {
      return null
    }

    return candidate
  })
}
