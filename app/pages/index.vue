<script setup lang="ts">
useHead({
  title: 'منصة المعلمين – الرئيسية'
})
</script>

<template>
<div dir="rtl" style="width: 100%; min-height: 100vh; box-sizing: border-box; font-family: 'Cairo', system-ui, sans-serif; color: #0F172A; background: #FFFFFF; display: flex; flex-direction: column">

<div style="border-bottom: 1px solid #E2E8F0">
<div style="max-width: 1200px; margin: 0 auto; padding: 0 32px; box-sizing: border-box; min-height: 76px; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px">
<div style="display: flex; align-items: center; gap: 10px; font-weight: 800; font-size: 20px">
<div style="width: 36px; height: 36px; border-radius: 10px; background: #2740E8; display: flex; align-items: center; justify-content: center">
<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 9l9-5 9 5-9 5-9-5zM7 12v4c0 1.5 2.2 3 5 3s5-1.5 5-3v-4"></path></svg>
</div>
<span>[اسم علامتك]</span>
</div>
<div style="display: flex; flex-wrap: wrap; gap: 28px; font-size: 15px; font-weight: 500">
<a href="#how">كيف تعمل</a>
<a href="#features">المميزات</a>
<a href="#pricing">الأسعار</a>
</div>
<div style="display: flex; align-items: center; gap: 20px; font-size: 15px; font-weight: 700">
<NuxtLink to="/login">تسجيل الدخول</NuxtLink>
<NuxtLink to="/register" class="btn" style="background: #2740E8; color: #FFFFFF; font-weight: 800; padding: 12px 20px; border-radius: 12px">أنشئ منصتي</NuxtLink>
</div>
</div>
</div>

<div style="background: #F3F6FF; background-image: radial-gradient(#C5D0F5 1.5px, transparent 1.5px); background-size: 26px 26px; position: relative; overflow: hidden">
<div class="ic a1" style="top: 9%; left: 11%; --r: -8deg; color: #2740E8"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 9l9-5 9 5-9 5-9-5zM7 12v4c0 1.5 2.2 3 5 3s5-1.5 5-3v-4"></path></svg></div>
<div class="ic a2" style="top: 28%; left: 4%; --r: 7deg; color: #E89B00; animation-delay: -2s"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"></rect><path d="M10 9.5v5l4.5-2.5-4.5-2.5z"></path></svg></div>
<div class="ic a3" style="top: 50%; left: 12%; --r: -5deg; color: #2740E8; animation-delay: -4s"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18h6M10 21h4M12 3a6 6 0 00-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0012 3z"></path></svg></div>
<div class="ic a4" style="top: 72%; left: 5%; --r: 9deg; color: #E89B00; animation-delay: -1s"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"></path></svg></div>
<div class="ic a5" style="top: 10%; right: 6%; --r: 8deg; color: #2740E8; animation-delay: -3s"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 6c-2-1.5-5-2-9-2v14c4 0 7 .5 9 2 2-1.5 5-2 9-2V4c-4 0-7 .5-9 2zM12 6v14"></path></svg></div>
<div class="ic a6" style="top: 32%; right: 12%; --r: -7deg; color: #E89B00; animation-delay: -5s"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20l1-4L16.5 4.5a2.1 2.1 0 013 3L8 19l-4 1zM14 7l3 3"></path></svg></div>
<div class="ic a7" style="top: 54%; right: 4%; --r: 6deg; color: #2740E8; animation-delay: -2.5s"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="3" width="14" height="18" rx="2"></rect><path d="M8 7h8M8 12h2M12 12h2M8 16h2M12 16h2"></path></svg></div>
<div class="ic a8" style="top: 74%; right: 11%; --r: -9deg; color: #E89B00; animation-delay: -0.5s"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3z"></path></svg></div>
<div class="sp" style="left: 22%; top: 70%; background: #FFC247"></div>
<div class="sp" style="left: 33%; top: 82%; background: #2740E8; animation-delay: -2s"></div>
<div class="sp" style="left: 46%; top: 88%; background: #FFC247; animation-delay: -4s"></div>
<div class="sp" style="left: 58%; top: 84%; background: #2740E8; animation-delay: -1s"></div>
<div class="sp" style="left: 70%; top: 76%; background: #FFC247; animation-delay: -3s"></div>
<div class="sp" style="left: 84%; top: 62%; background: #2740E8; animation-delay: -5s"></div>
<div class="sp" style="left: 16%; top: 40%; background: #2740E8; animation-delay: -2.5s"></div>
<div class="sp" style="left: 90%; top: 40%; background: #FFC247; animation-delay: -3.5s"></div>
<div style="max-width: 1200px; margin: 0 auto; padding: 104px 32px 112px; box-sizing: border-box; display: flex; justify-content: center; position: relative">
<div style="max-width: 760px; width: 100%; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 24px">

<h1 class="u" style="margin: 0; font-size: 62px; line-height: 1.3; font-weight: 800; animation-delay: .1s"><span style="display: block">أنشئ منصتك التعليمية لبيع</span><span style="display: block"><span style="display: inline-block; position: relative; height: 1.3em; overflow: hidden; vertical-align: top; padding: 0 22px; color: #2740E8"><span style="position: absolute; left: 0; right: 0; bottom: .12em; height: .3em; border-radius: 8px; background: #FFE29A"></span><span class="rw" style="position: relative"><span>دوراتك</span><span>دروسك</span><span>خبرتك</span><span>كتبك</span><span>دوراتك</span></span></span></span><span style="display: block">في دقائق</span></h1>
<p class="u" style="margin: 0; font-size: 19px; line-height: 1.6; color: #475569; max-width: 620px; animation-delay: .25s">ارفع دوراتك، وحدّد أسعارك، وابدأ البيع لطلابك.</p>
<div id="start" class="u" style="display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 16px; animation-delay: .4s">
<a href="#start" class="pulse btn" style="--ring: #2740E8; min-height: 56px; box-sizing: border-box; display: inline-flex; align-items: center; background: #2740E8; color: #FFFFFF; font-size: 17px; font-weight: 800; padding: 0 32px; border-radius: 12px">أنشئ منصتي</a>
<a href="#video" style="min-height: 56px; box-sizing: border-box; display: inline-flex; align-items: center; background: #FFFFFF; border: 1px solid #CBD5E1; color: #0F172A; font-size: 17px; font-weight: 700; padding: 0 28px; border-radius: 12px">شاهد كيف تعمل</a>
</div>
<div class="u" style="animation-delay: .65s; font-size: 14px; color: #475569">اسمك وعلامتك وطلابك. [شروط التجربة المجانية]</div>
</div>
</div>
</div>

<div id="video" style="background: #0F172A">
<div style="max-width: 1200px; margin: 0 auto; padding: 96px 32px; box-sizing: border-box; display: flex; flex-direction: column; gap: 40px">
<div style="text-align: center; display: flex; flex-direction: column; gap: 12px; align-items: center">
<div style="font-size: 14px; font-weight: 700; color: #FFC247">شاهد الشرح</div>
<h2 style="margin: 0; font-size: 40px; line-height: 1.35; font-weight: 800; color: #FFFFFF; max-width: 640px">تعرّف على المنصة في دقيقتين</h2>
<p style="margin: 0; font-size: 17px; line-height: 1.6; color: #CBD5E1; max-width: 560px">فيديو قصير يشرح كيف تنشئ منصتك وترفع دوراتك وتبدأ البيع.</p>
</div>
<div style="width: 100%; max-width: 960px; margin: 0 auto; aspect-ratio: 16 / 9; box-sizing: border-box; position: relative; display: flex; align-items: center; justify-content: center; background: #1B2559; border: 1px solid #33407F; border-radius: 20px; overflow: hidden">
<div style="position: absolute; top: 20px; right: 20px; background: #2A3678; color: #FFFFFF; font-size: 13px; font-weight: 700; padding: 6px 12px; border-radius: 999px">شرح المنصة</div>
<button aria-label="تشغيل الفيديو" style="width: 96px; height: 96px; border: 3px solid #FFFFFF; border-radius: 50%; background: #2740E8; cursor: pointer; display: flex; align-items: center; justify-content: center; padding: 0"><svg width="38" height="38" viewBox="0 0 24 24" fill="#FFFFFF" aria-hidden="true" style="margin-left: 4px"><path d="M8 5v14l11-7z"></path></svg></button>
<div dir="ltr" style="position: absolute; left: 0; right: 0; bottom: 0; box-sizing: border-box; padding: 16px 24px; background: #121A45; display: flex; align-items: center; gap: 16px; color: #CBD5E1; font-size: 14px">
<svg width="20" height="20" viewBox="0 0 24 24" fill="#FFFFFF" aria-hidden="true"><path d="M8 5v14l11-7z"></path></svg>
<div style="flex: 1; height: 5px; border-radius: 999px; background: #475085; position: relative"><div style="position: absolute; left: 0; top: -4px; width: 13px; height: 13px; border-radius: 50%; background: #FFC247"></div></div>
<span>0:00 / [المدة]</span>
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4zM16 9a4 4 0 010 6"></path></svg>
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"></path></svg>
</div>
</div>
<div style="text-align: center; font-size: 14px; color: #CBD5E1">[رابط فيديو الشرح] استبدل هذا العنصر بفيديو الشرح الخاص بك.</div>
</div>
</div>

<div id="how" style="background: #FFFFFF">
<div style="max-width: 1200px; margin: 0 auto; padding: 96px 32px; box-sizing: border-box; display: flex; flex-direction: column; gap: 48px">
<div style="text-align: center; display: flex; flex-direction: column; gap: 12px; align-items: center">
<div style="font-size: 14px; font-weight: 700; color: #2740E8">كيف تعمل المنصة</div>
<h2 style="margin: 0; font-size: 40px; line-height: 1.35; font-weight: 800; max-width: 640px">من التسجيل إلى أول عملية بيع في ثلاث خطوات</h2>
</div>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px">
<div style="border: 1px solid #E2E8F0; border-radius: 18px; padding: 32px; display: flex; flex-direction: column; gap: 14px">
<div style="width: 44px; height: 44px; border-radius: 50%; background: #2740E8; color: #FFFFFF; font-weight: 800; display: flex; align-items: center; justify-content: center">1</div>
<h3 style="margin: 0; font-size: 22px; font-weight: 800">سجّل واختر اسماً</h3>
<p style="margin: 0; font-size: 16px; line-height: 1.6; color: #475569">أنشئ حسابك واختر اسم منصتك، وسنجهّز لك موقعك فوراً.</p>
</div>
<div style="border: 1px solid #E2E8F0; border-radius: 18px; padding: 32px; display: flex; flex-direction: column; gap: 14px">
<div style="width: 44px; height: 44px; border-radius: 50%; background: #2740E8; color: #FFFFFF; font-weight: 800; display: flex; align-items: center; justify-content: center">2</div>
<h3 style="margin: 0; font-size: 22px; font-weight: 800">ارفع دوراتك</h3>
<p style="margin: 0; font-size: 16px; line-height: 1.6; color: #475569">أضف الفيديوهات والملفات والدروس، ونظّمها في دورات، وحدّد سعراً لكل دورة.</p>
</div>
<div style="border: 1px solid #E2E8F0; border-radius: 18px; padding: 32px; display: flex; flex-direction: column; gap: 14px">
<div style="width: 44px; height: 44px; border-radius: 50%; background: #2740E8; color: #FFFFFF; font-weight: 800; display: flex; align-items: center; justify-content: center">3</div>
<h3 style="margin: 0; font-size: 22px; font-weight: 800">بِع لطلابك</h3>
<p style="margin: 0; font-size: 16px; line-height: 1.6; color: #475569">يشترك الطلاب ويدفعون على موقعك، وتتابع المبيعات والمتعلمين من لوحة تحكم واحدة. [شروط تحويل الأرباح]</p>
</div>
</div>
</div>
</div>

<div id="features" style="background: #F3F6FF">
<div style="max-width: 1200px; margin: 0 auto; padding: 96px 32px; box-sizing: border-box; display: flex; flex-direction: column; gap: 48px">
<div style="text-align: center; display: flex; flex-direction: column; gap: 12px; align-items: center">
<div style="font-size: 14px; font-weight: 700; color: #2740E8">المميزات</div>
<h2 style="margin: 0; font-size: 40px; line-height: 1.35; font-weight: 800; max-width: 640px">كل ما يحتاجه المعلم لإدارة مدرسته على الإنترنت</h2>
</div>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px">
<div style="background: #FFFFFF; border-radius: 18px; padding: 28px; display: flex; flex-direction: column; gap: 12px">
<div style="width: 44px; height: 44px; border-radius: 10px; background: #E3E8FF; color: #2740E8; display: flex; align-items: center; justify-content: center"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"></path></svg></div>
<h3 style="margin: 0; font-size: 19px; font-weight: 800">موقعك الخاص باسمك</h3>
<p style="margin: 0; font-size: 15px; line-height: 1.6; color: #475569">موقع خاص بكل معلم، جاهز فور التسجيل.</p>
</div>
<div style="background: #FFFFFF; border-radius: 18px; padding: 28px; display: flex; flex-direction: column; gap: 12px">
<div style="width: 44px; height: 44px; border-radius: 10px; background: #E3E8FF; color: #2740E8; display: flex; align-items: center; justify-content: center"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5"></path></svg></div>
<h3 style="margin: 0; font-size: 19px; font-weight: 800">منشئ دورات سهل</h3>
<p style="margin: 0; font-size: 15px; line-height: 1.6; color: #475569">ارفع الدروس ونظّم الأقسام وانشر عندما تكون جاهزاً.</p>
</div>
<div style="background: #FFFFFF; border-radius: 18px; padding: 28px; display: flex; flex-direction: column; gap: 12px">
<div style="width: 44px; height: 44px; border-radius: 10px; background: #E3E8FF; color: #2740E8; display: flex; align-items: center; justify-content: center"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="6" width="18" height="12" rx="2"></rect><path d="M3 10h18"></path></svg></div>
<h3 style="margin: 0; font-size: 19px; font-weight: 800">مدفوعات مدمجة</h3>
<p style="margin: 0; font-size: 15px; line-height: 1.6; color: #475569">حدّد الأسعار ودع الطلاب يشترون الدورات مباشرة من منصتك.</p>
</div>
<div style="background: #FFFFFF; border-radius: 18px; padding: 28px; display: flex; flex-direction: column; gap: 12px">
<div style="width: 44px; height: 44px; border-radius: 10px; background: #E3E8FF; color: #2740E8; display: flex; align-items: center; justify-content: center"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="8" r="3.5"></circle><path d="M2.5 20c0-3.5 3-6 6.5-6s6.5 2.5 6.5 6M16 5a3.5 3.5 0 010 6.5M18 14.5c2 .7 3.5 2.5 3.5 5.5"></path></svg></div>
<h3 style="margin: 0; font-size: 19px; font-weight: 800">إدارة الطلاب</h3>
<p style="margin: 0; font-size: 15px; line-height: 1.6; color: #475569">اعرف من اشترك، وماذا اشترى، ومدى تقدّمه.</p>
</div>
<div style="background: #FFFFFF; border-radius: 18px; padding: 28px; display: flex; flex-direction: column; gap: 12px">
<div style="width: 44px; height: 44px; border-radius: 10px; background: #E3E8FF; color: #2740E8; display: flex; align-items: center; justify-content: center"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h10M18 7h2M4 17h2M10 17h10"></path><circle cx="16" cy="7" r="2"></circle><circle cx="8" cy="17" r="2"></circle></svg></div>
<h3 style="margin: 0; font-size: 19px; font-weight: 800">هويتك البصرية</h3>
<p style="margin: 0; font-size: 15px; line-height: 1.6; color: #475569">أضف شعارك وألوانك ورسالة الترحيب لتبدو المنصة ملكاً لك.</p>
</div>
<div style="background: #FFFFFF; border-radius: 18px; padding: 28px; display: flex; flex-direction: column; gap: 12px">
<div style="width: 44px; height: 44px; border-radius: 10px; background: #E3E8FF; color: #2740E8; display: flex; align-items: center; justify-content: center"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="7" y="3" width="10" height="18" rx="2"></rect><path d="M11 18h2"></path></svg></div>
<h3 style="margin: 0; font-size: 19px; font-weight: 800">تعمل على كل الأجهزة</h3>
<p style="margin: 0; font-size: 15px; line-height: 1.6; color: #475569">يتعلم الطلاب من الهاتف أو الجهاز اللوحي أو الحاسوب بنفس التجربة السلسة.</p>
</div>
</div>
</div>
</div>

<div id="pricing" style="background: #FFFFFF">
<div style="max-width: 1200px; margin: 0 auto; padding: 96px 32px; box-sizing: border-box; display: flex; flex-direction: column; gap: 48px">
<div style="text-align: center; display: flex; flex-direction: column; gap: 12px; align-items: center">
<div style="font-size: 14px; font-weight: 700; color: #2740E8">الأسعار</div>
<h2 style="margin: 0; font-size: 40px; line-height: 1.35; font-weight: 800; max-width: 640px">اختر الخطة التي تناسب منصتك</h2>
<p style="margin: 0; font-size: 17px; line-height: 1.6; color: #475569; max-width: 520px">ابدأ بخطة بسيطة وارتقِ بها كلما كبرت منصتك وزاد عدد طلابك.</p>
</div>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; align-items: stretch">

<div style="border: 1px solid #E2E8F0; border-radius: 18px; padding: 32px; display: flex; flex-direction: column; gap: 20px">
<h3 style="margin: 0; font-size: 22px; font-weight: 800">أساسية</h3>
<div style="font-size: 15px; line-height: 1.6; color: #475569">للمعلمين الذين يبدؤون أول دورة.</div>
<div style="display: flex; align-items: baseline; gap: 8px"><span style="font-size: 40px; font-weight: 800">[السعر]</span><span style="font-size: 15px; color: #475569">/ شهرياً</span></div>
<div style="display: flex; flex-direction: column; gap: 12px; flex: 1">
<div style="display: flex; align-items: center; gap: 10px; font-size: 15px"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex: none; color: #2740E8"><path d="M5 12l5 5 9-10"></path></svg><span>موقع خاص باسمك</span></div>
<div style="display: flex; align-items: center; gap: 10px; font-size: 15px"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex: none; color: #2740E8"><path d="M5 12l5 5 9-10"></path></svg><span>عدد الدورات: [العدد]</span></div>
<div style="display: flex; align-items: center; gap: 10px; font-size: 15px"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex: none; color: #2740E8"><path d="M5 12l5 5 9-10"></path></svg><span>عمولة المبيعات: [النسبة]</span></div>
</div>
<a href="#start" class="btn" style="text-align: center; background: #2740E8; color: #FFFFFF; padding: 14px 20px; border-radius: 12px; font-size: 16px; font-weight: 800">أنشئ منصتي</a>
</div>

<div style="background: #0F172A; color: #FFFFFF; border-radius: 18px; padding: 32px; display: flex; flex-direction: column; gap: 20px">
<div style="display: flex; align-items: center; justify-content: space-between; gap: 12px">
<h3 style="margin: 0; font-size: 22px; font-weight: 800">احترافية</h3>
<span style="background: #FFC247; color: #0F172A; font-size: 13px; font-weight: 700; padding: 6px 12px; border-radius: 999px">الأكثر اختياراً</span>
</div>
<div style="font-size: 15px; line-height: 1.6; color: #CBD5E1">لمن يبيع دورات متعددة وينمّي جمهوره.</div>
<div style="display: flex; align-items: baseline; gap: 8px"><span style="font-size: 40px; font-weight: 800">[السعر]</span><span style="font-size: 15px; color: #CBD5E1">/ شهرياً</span></div>
<div style="display: flex; flex-direction: column; gap: 12px; flex: 1">
<div style="display: flex; align-items: center; gap: 10px; font-size: 15px"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex: none; color: #FFC247"><path d="M5 12l5 5 9-10"></path></svg><span>كل مزايا الخطة الأساسية</span></div>
<div style="display: flex; align-items: center; gap: 10px; font-size: 15px"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex: none; color: #FFC247"><path d="M5 12l5 5 9-10"></path></svg><span>شعارك وألوانك الخاصة</span></div>
<div style="display: flex; align-items: center; gap: 10px; font-size: 15px"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex: none; color: #FFC247"><path d="M5 12l5 5 9-10"></path></svg><span>عمولة المبيعات: [النسبة]</span></div>
</div>
<a href="#start" class="btn" style="text-align: center; background: #2740E8; color: #FFFFFF; padding: 14px 20px; border-radius: 12px; font-size: 16px; font-weight: 800">أنشئ منصتي</a>
</div>

<div style="border: 1px solid #E2E8F0; border-radius: 18px; padding: 32px; display: flex; flex-direction: column; gap: 20px">
<h3 style="margin: 0; font-size: 22px; font-weight: 800">أكاديمية</h3>
<div style="font-size: 15px; line-height: 1.6; color: #475569">للمؤسسات التعليمية وفرق التدريس.</div>
<div style="display: flex; align-items: baseline; gap: 8px"><span style="font-size: 40px; font-weight: 800">[السعر]</span><span style="font-size: 15px; color: #475569">/ شهرياً</span></div>
<div style="display: flex; flex-direction: column; gap: 12px; flex: 1">
<div style="display: flex; align-items: center; gap: 10px; font-size: 15px"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex: none; color: #2740E8"><path d="M5 12l5 5 9-10"></path></svg><span>كل مزايا الخطة الاحترافية</span></div>
<div style="display: flex; align-items: center; gap: 10px; font-size: 15px"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex: none; color: #2740E8"><path d="M5 12l5 5 9-10"></path></svg><span>عدة معلمين على منصة واحدة</span></div>
<div style="display: flex; align-items: center; gap: 10px; font-size: 15px"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex: none; color: #2740E8"><path d="M5 12l5 5 9-10"></path></svg><span>دعم ذو أولوية</span></div>
</div>
<a href="#start" class="btn" style="text-align: center; background: #2740E8; color: #FFFFFF; padding: 14px 20px; border-radius: 12px; font-size: 16px; font-weight: 800">أنشئ منصتي</a>
</div>

</div>
</div>
</div>

<div id="faq" style="background: #F3F6FF">
<div style="max-width: 860px; margin: 0 auto; padding: 96px 32px; box-sizing: border-box; display: flex; flex-direction: column; gap: 40px">
<div style="text-align: center; display: flex; flex-direction: column; gap: 12px; align-items: center">
<div style="font-size: 14px; font-weight: 700; color: #2740E8">الأسئلة الشائعة</div>
<h2 style="margin: 0; font-size: 40px; line-height: 1.35; font-weight: 800; max-width: 640px">أسئلة يطرحها المعلمون قبل البدء</h2>
</div>
<div style="display: flex; flex-direction: column; gap: 14px">

<details class="fq" open="" style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 14px">
<summary style="display: flex; align-items: center; justify-content: space-between; gap: 16px; min-height: 44px; padding: 20px 26px; font-size: 18px; font-weight: 800"><span>كيف أنشئ منصتي؟</span><svg class="chev" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true" style="color: #2740E8"><path d="M12 5v14M5 12h14"></path></svg></summary>
<div style="padding: 0 26px 24px; font-size: 16px; line-height: 1.8; color: #475569">سجّل حسابك واختر اسم منصتك، وستكون منصتك جاهزة لتبدأ برفع دوراتك فوراً.</div>
</details>

<details class="fq" style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 14px">
<summary style="display: flex; align-items: center; justify-content: space-between; gap: 16px; min-height: 44px; padding: 20px 26px; font-size: 18px; font-weight: 800"><span>هل أحتاج إلى خبرة تقنية؟</span><svg class="chev" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true" style="color: #2740E8"><path d="M12 5v14M5 12h14"></path></svg></summary>
<div style="padding: 0 26px 24px; font-size: 16px; line-height: 1.8; color: #475569">لا. كل شيء يتم من لوحة تحكم بسيطة: ارفع الفيديوهات والملفات ونظّمها في دورات دون كتابة أي كود.</div>
</details>

<details class="fq" style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 14px">
<summary style="display: flex; align-items: center; justify-content: space-between; gap: 16px; min-height: 44px; padding: 20px 26px; font-size: 18px; font-weight: 800"><span>ما أنواع المحتوى التي يمكنني رفعها؟</span><svg class="chev" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true" style="color: #2740E8"><path d="M12 5v14M5 12h14"></path></svg></summary>
<div style="padding: 0 26px 24px; font-size: 16px; line-height: 1.8; color: #475569">يمكنك رفع الفيديوهات والملفات والدروس وتنظيمها في دورات. [الصيغ والأحجام المدعومة]</div>
</details>

<details class="fq" style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 14px">
<summary style="display: flex; align-items: center; justify-content: space-between; gap: 16px; min-height: 44px; padding: 20px 26px; font-size: 18px; font-weight: 800"><span>كيف أستلم أرباح مبيعاتي؟</span><svg class="chev" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true" style="color: #2740E8"><path d="M12 5v14M5 12h14"></path></svg></summary>
<div style="padding: 0 26px 24px; font-size: 16px; line-height: 1.8; color: #475569">يدفع الطلاب مباشرة على منصتك، وتتابع مبيعاتك من لوحة التحكم. [طرق وشروط تحويل الأرباح]</div>
</details>

<details class="fq" style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 14px">
<summary style="display: flex; align-items: center; justify-content: space-between; gap: 16px; min-height: 44px; padding: 20px 26px; font-size: 18px; font-weight: 800"><span>هل يمكنني تخصيص شكل منصتي؟</span><svg class="chev" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true" style="color: #2740E8"><path d="M12 5v14M5 12h14"></path></svg></summary>
<div style="padding: 0 26px 24px; font-size: 16px; line-height: 1.8; color: #475569">نعم، أضف شعارك وألوانك ورسالة الترحيب لتبدو المنصة ملكاً لك.</div>
</details>

<details class="fq" style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 14px">
<summary style="display: flex; align-items: center; justify-content: space-between; gap: 16px; min-height: 44px; padding: 20px 26px; font-size: 18px; font-weight: 800"><span>هل يمكنني تجربة المنصة قبل الاشتراك؟</span><svg class="chev" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true" style="color: #2740E8"><path d="M12 5v14M5 12h14"></path></svg></summary>
<div style="padding: 0 26px 24px; font-size: 16px; line-height: 1.8; color: #475569">[تفاصيل التجربة المجانية]. يمكنك الاطلاع على الخطط والأسعار في قسم الأسعار.</div>
</details>

</div>
</div>
</div>

<div style="background: #0F172A">
<div style="max-width: 1200px; margin: 0 auto; padding: 88px 32px; box-sizing: border-box; display: flex; flex-direction: column; align-items: center; gap: 20px; text-align: center">
<h2 style="margin: 0; font-size: 40px; line-height: 1.35; font-weight: 800; color: #FFFFFF; max-width: 640px">جاهز لتبدأ؟</h2>
<p style="margin: 0; font-size: 18px; line-height: 1.6; color: #CBD5E1; max-width: 520px">أنشئ منصتك في دقائق، وابدأ رحلتك مع طلابك.</p>
<NuxtLink to="/register" class="btn" style="background: #2740E8; color: #FFFFFF; font-size: 17px; font-weight: 800; padding: 16px 32px; border-radius: 12px">أنشئ منصتي</NuxtLink>
</div>
</div>

<div style="background: #FFFFFF; border-top: 1px solid #E2E8F0">
<div style="max-width: 1200px; margin: 0 auto; padding: 32px; box-sizing: border-box; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px; font-size: 14px; color: #475569">
<div style="font-weight: 800; color: #0F172A">[اسم علامتك]</div>
<div style="display: flex; flex-wrap: wrap; gap: 24px"><a href="#start">من نحن</a><a href="#start">الدعم</a><a href="#start">الشروط</a><a href="#start">الخصوصية</a></div>
<div>© [السنة] [اسم علامتك]</div>
</div>
</div>

</div>
</template>

<style scoped>

body{margin:0}
a{color:#0F172A;text-decoration:none}a:hover{color:#2740E8}
.ic{position:absolute;width:64px;height:64px;border-radius:18px;background:#FFFFFF;border:1px solid #DDE4FF;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:scale .2s;animation:fl 6s ease-in-out infinite}
.ic:hover{scale:1.2}
@keyframes fl{0%,100%{transform:translateY(0) rotate(var(--r))}50%{transform:translateY(-14px) rotate(var(--r))}}
@media (max-width:900px){.ic{display:none}}
.u{animation:up .7s ease-out both}
@keyframes up{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
.rw{display:flex;flex-direction:column;animation:rw 10s cubic-bezier(.7,0,.2,1) infinite}
.rw span{display:block;height:1.3em;white-space:nowrap}
@keyframes rw{0%,20%{transform:translateY(0)}25%,45%{transform:translateY(-1.3em)}50%,70%{transform:translateY(-2.6em)}75%,95%{transform:translateY(-3.9em)}100%{transform:translateY(-5.2em)}}
.rnw{display:block;height:1.5em;overflow:hidden}
.rn{display:flex;flex-direction:column;animation:rn 7.5s cubic-bezier(.7,0,.2,1) infinite}
.rn span{display:block;height:1.5em;line-height:1.5em}
@keyframes rn{0%,28%{transform:translateY(0)}33%,61%{transform:translateY(-1.5em)}66%,94%{transform:translateY(-3em)}100%{transform:translateY(-4.5em)}}
.pulse{animation:pr 2s ease-out infinite}
@keyframes pr{0%{box-shadow:0 0 0 0 color-mix(in srgb,var(--ring) 45%,transparent)}70%,100%{box-shadow:0 0 0 16px color-mix(in srgb,var(--ring) 0%,transparent)}}
.dot{width:8px;height:8px;border-radius:50%;background:#0F172A;animation:bl 1.6s ease-in-out infinite}
@keyframes bl{50%{opacity:.25}}
.btn:hover{color:#FFFFFF;opacity:.92}
.fq summary{list-style:none;cursor:pointer}
.fq summary::-webkit-details-marker{display:none}
.fq .chev{transition:transform .2s;flex:none}
.fq[open] .chev{transform:rotate(45deg)}
.a1{animation:toss 5s ease-in-out infinite}
@keyframes toss{0%,100%{transform:translateY(0) rotate(var(--r))}40%{transform:translateY(-24px) rotate(calc(var(--r) + 28deg))}60%{transform:translateY(-24px) rotate(calc(var(--r) - 16deg))}}
.a2{animation:pls 2.4s ease-in-out infinite}
@keyframes pls{0%,100%{transform:rotate(var(--r)) scale(1);box-shadow:0 0 0 0 rgba(232,155,0,.45)}50%{transform:rotate(var(--r)) scale(1.1);box-shadow:0 0 0 14px rgba(232,155,0,0)}}
.a3{animation:glow 3s ease-in-out infinite}
@keyframes glow{0%,100%{transform:rotate(var(--r));box-shadow:0 0 0 0 rgba(255,194,71,0)}50%{transform:rotate(var(--r));box-shadow:0 0 28px 6px rgba(255,194,71,.7);background:#FFF8E1}}
.a5{animation:swing 4s ease-in-out infinite}
@keyframes swing{0%,100%{transform:rotate(calc(var(--r) - 12deg))}50%{transform:rotate(calc(var(--r) + 12deg))}}
.a6{animation:wr 3.5s ease-in-out infinite}
@keyframes wr{0%,100%{transform:translate(0,0) rotate(var(--r))}25%{transform:translate(-14px,6px) rotate(calc(var(--r) - 12deg))}50%{transform:translate(0,12px) rotate(calc(var(--r) + 6deg))}75%{transform:translate(14px,4px) rotate(calc(var(--r) - 8deg))}}
.a7{animation:bob 3.2s ease-in-out infinite}
@keyframes bob{0%,100%{transform:translateY(0) rotate(var(--r)) scale(1)}50%{transform:translateY(-12px) rotate(calc(var(--r) * -1)) scale(1.1)}}
.a4 svg,.a8 svg{animation:spin 10s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
.sp{position:absolute;width:10px;height:10px;border-radius:50%;opacity:0;animation:rise 6s ease-in infinite}
@keyframes rise{0%{transform:translateY(0) scale(.6);opacity:0}20%{opacity:.9}100%{transform:translateY(-150px) scale(1.2);opacity:0}}
@media (prefers-reduced-motion:reduce){.ic,.ic svg,.sp,.u,.rw,.rn,.pulse,.dot{animation:none}.ic{transform:rotate(var(--r))}.sp{opacity:.5}}

</style>
