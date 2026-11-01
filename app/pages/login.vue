<script setup lang="ts">
const router = useRouter()
const email = ref('')
const password = ref('')
const rememberMe = ref(false)

useHead({
  title: 'تسجيل الدخول - منصة المعلمين'
})

function handleLogin() {
  // Direct to teacher dashboard
  router.push('/teacher-dashboard')
}
</script>

<template>
  <form @submit.prevent="handleLogin">
<div dir="rtl" style="--ac: #2740E8; width: 100%; min-height: 100vh; box-sizing: border-box; display: flex; flex-wrap: wrap; font-family: 'Cairo', system-ui, sans-serif; color: #0F172A; background: #FFFFFF">

<div style="flex: 1 1 420px; background: #2740E8; color: #FFFFFF; position: relative; overflow: hidden; padding: 56px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between; gap: 32px">
<div style="position: absolute; inset: 0; background-image: radial-gradient(rgba(255,255,255,.22) 1.5px, transparent 1.5px); background-size: 26px 26px"></div>
<div style="position: absolute; width: 320px; height: 320px; border-radius: 50%; background: #FFFFFF; opacity: .08; left: -90px; bottom: -80px"></div>
<div style="position: absolute; width: 180px; height: 180px; border-radius: 50%; background: #FFC247; opacity: .9; right: -50px; bottom: 120px"></div>
<div class="bi" style="top: 6%; left: 12%; --r: -8deg"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 9l9-5 9 5-9 5-9-5zM7 12v4c0 1.5 2.2 3 5 3s5-1.5 5-3v-4"></path></svg></div>
<div class="bi b2" style="top: 34%; left: 2%; --r: 8deg"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 6c-2-1.5-5-2-9-2v14c4 0 7 .5 9 2 2-1.5 5-2 9-2V4c-4 0-7 .5-9 2zM12 6v14"></path></svg></div>
<div class="bi b3" style="top: 80%; right: 6%; --r: 10deg; animation-delay: -4s"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3z"></path></svg></div>

<div style="position: relative; display: flex; align-items: center; gap: 10px; font-weight: 800; font-size: 20px">
<div style="width: 36px; height: 36px; border-radius: 10px; background: #FFFFFF; color: #2740E8; display: flex; align-items: center; justify-content: center">
<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 9l9-5 9 5-9 5-9-5zM7 12v4c0 1.5 2.2 3 5 3s5-1.5 5-3v-4"></path></svg>
</div>
<NuxtLink to="/" style="color: inherit; text-decoration: none;">[اسم علامتك]</NuxtLink>
</div>

<div style="position: relative; display: flex; flex-direction: column; gap: 16px">
<h1 style="margin: 0; font-size: 42px; line-height: 1.35; font-weight: 800">أهلاً بعودتك</h1>
<p style="margin: 0; font-size: 18px; line-height: 1.7; color: #DDE4FF; max-width: 420px">سجّل دخولك لتتابع دوراتك وطلابك ومبيعاتك من مكان واحد.</p>
</div>



<div style="position: relative; height: 24px"></div>
</div>

<div style="flex: 1.3 1 520px; display: flex; align-items: center; justify-content: center; padding: 56px 32px; box-sizing: border-box">
<div role="form" aria-label="تسجيل الدخول" style="width: 100%; max-width: 460px; display: flex; flex-direction: column; gap: 22px">
<div style="display: flex; flex-direction: column; gap: 8px">
<h2 style="margin: 0; font-size: 34px; line-height: 1.35; font-weight: 800">تسجيل الدخول</h2>
<p style="margin: 0; font-size: 16px; color: #475569">أدخل بياناتك للوصول إلى حسابك.</p>
</div>

<div><label class="l" for="id">البريد الإلكتروني أو رقم الهاتف</label><input class="f" id="id" type="text" dir="ltr" placeholder="name@example.com" autocomplete="username" style="text-align: left"></div>

<div>
<label class="l" for="pw">كلمة المرور</label>
<div style="position: relative"><input class="f" id="pw" type="password" dir="ltr" placeholder="••••••••" autocomplete="current-password" style="text-align: left; padding-right: 48px"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#475569" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="position: absolute; right: 14px; top: 15px"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"></path><circle cx="12" cy="12" r="3"></circle></svg></div>
</div>

<div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px; font-size: 15px">
<label style="display: flex; align-items: center; gap: 10px; cursor: pointer"><input type="checkbox" style="accent-color: #2740E8; width: 18px; height: 18px; margin: 0"><span>تذكّرني</span></label>
<a href="#" style="color: #2740E8; font-weight: 700">نسيت كلمة المرور؟</a>
</div>

<button class="sub" style="width: 100%; height: 56px; border: none; border-radius: 12px; background: #2740E8; color: #FFFFFF; font-family: inherit; font-size: 17px; font-weight: 800; cursor: pointer">تسجيل الدخول</button>

<div style="text-align: center; font-size: 15px; color: #475569">ليس لديك حساب؟ <NuxtLink to="/register" style="color: #2740E8; font-weight: 700">أنشئ منصتك الآن</NuxtLink></div>
</div>
</div>

</div>
  </form>
</template>

<style scoped>

body{margin:0}
a{color:#0F172A;text-decoration:none}
.l{display:block;font-size:15px;font-weight:700;margin-bottom:8px}
.f{width:100%;height:52px;box-sizing:border-box;border:1px solid #CBD5E1;border-radius:12px;padding:0 16px;font-family:inherit;font-size:16px;color:#0F172A;background:#FFFFFF}
.f::placeholder{color:#64748B}
.f:focus{outline:3px solid #DDE4FF;border-color:var(--ac)}
.sub:hover{opacity:.92}
.bi{position:absolute;width:56px;height:56px;border-radius:16px;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.35);color:#FFFFFF;display:flex;align-items:center;justify-content:center;animation:fl 6s ease-in-out infinite}
@keyframes fl{0%,100%{transform:translateY(0) rotate(var(--r))}50%{transform:translateY(-12px) rotate(var(--r))}}
.b2{animation:sw 4s ease-in-out infinite}
@keyframes sw{0%,100%{transform:rotate(calc(var(--r) - 12deg))}50%{transform:rotate(calc(var(--r) + 12deg))}}
.b3 svg{animation:sp 10s linear infinite}
@keyframes sp{to{transform:rotate(360deg)}}
.cardf{animation:cf 7s ease-in-out infinite}
@keyframes cf{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
@media (prefers-reduced-motion:reduce){.bi,.bi svg,.cardf{animation:none}.bi{transform:rotate(var(--r))}}

</style>
