<script setup lang="ts">
definePageMeta({
  alias: ['/student', '/student/dashboard', '/dashboard/student']
})

useHead({
  title: 'لوحة الطالب - منصة المعلمين'
})
</script>

<template>
<div class="dsh" dir="rtl" style="--ac: #2740E8; width: 100%; min-height: 100vh; box-sizing: border-box; display: flex; flex-wrap: wrap; font-family: 'Cairo', system-ui, sans-serif; color: #0F172A; background: #F6F8FD">
<input class="sr" type="checkbox" id="sbt" aria-label="طي القائمة الجانبية">
<input class="sr" type="radio" name="view" id="v1" checked="" aria-label="الرئيسية">
<input class="sr" type="radio" name="view" id="v2" aria-label="دوراتي">
<input class="sr" type="radio" name="view" id="v3" aria-label="الواجبات والاختبارات">
<input class="sr" type="radio" name="view" id="v4" aria-label="الشهادات">
<input class="sr" type="radio" name="view" id="v5" aria-label="الرسائل">
<input class="sr" type="radio" name="view" id="v6" aria-label="الإعدادات">

<div class="sb" style="background: #FFFFFF; border-left: 1px solid #E2E8F0; padding: 28px 20px; box-sizing: border-box; display: flex; flex-direction: column; gap: 28px">
<div class="br" style="display: flex; align-items: center; gap: 10px; font-weight: 800; font-size: 20px; padding: 0 8px">
<div style="width: 36px; height: 36px; border-radius: 10px; background: #2740E8; display: flex; align-items: center; justify-content: center; flex: none">
<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 9l9-5 9 5-9 5-9-5zM7 12v4c0 1.5 2.2 3 5 3s5-1.5 5-3v-4"></path></svg>
</div>
<span class="bt">أكاديمية أحمد</span>
</div>
<div style="display: flex; flex-direction: column; gap: 6px; flex: 1">
<label for="v1" class="ni n1"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 11l9-8 9 8M5 10v10h14V10"></path></svg>الرئيسية</label>
<label for="v2" class="ni n2"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 6c-2-1.5-5-2-9-2v14c4 0 7 .5 9 2 2-1.5 5-2 9-2V4c-4 0-7 .5-9 2zM12 6v14"></path></svg>دوراتي</label>
<label for="v3" class="ni n3"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="4" width="14" height="17" rx="2"></rect><path d="M9 4h6v3H9zM9 12h6M9 16h4"></path></svg>الواجبات والاختبارات</label>
<label for="v4" class="ni n4"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="9" r="5"></circle><path d="M8.5 13.5L7 21l5-3 5 3-1.5-7.5"></path></svg>الشهادات</label>
<label for="v5" class="ni n5"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5h16v11H9l-5 4V5z"></path></svg>الرسائل</label>
<label for="v6" class="ni n6"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"></circle><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"></path></svg>الإعدادات</label>
</div>
<div class="pf" style="display: flex; align-items: center; gap: 12px; padding: 14px; border: 1px solid #E2E8F0; border-radius: 14px">
<div style="width: 40px; height: 40px; border-radius: 50%; background: #DDE4FF; color: #2740E8; font-weight: 800; display: flex; align-items: center; justify-content: center; flex: none">س</div>
<div class="bt" style="display: flex; flex-direction: column; line-height: 1.4"><span style="font-size: 15px; font-weight: 800">سارة علي</span><span style="font-size: 13px; color: #475569">طالبة</span></div>
</div>
</div>

<div style="flex: 1 1 760px; min-width: 0; padding: 0; box-sizing: border-box; display: flex; flex-direction: column">

<div style="position: sticky; top: 0; z-index: 10; background: #FFFFFF; border-bottom: 1px solid #E2E8F0; display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 10px 40px; box-sizing: border-box">
<div style="display: flex; flex-wrap: wrap; align-items: center; gap: 12px"><label for="sbt" class="tg" title="طي أو فتح القائمة الجانبية" aria-label="طي أو فتح القائمة الجانبية"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h10"></path></svg></label><a href="#" style="display: inline-flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 700; color: #2740E8"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="M20 20l-4-4"></path></svg>تصفّح كل الدورات</a></div>
<div style="display: flex; align-items: center; gap: 14px">
<div class="dd" tabindex="0" role="button" aria-haspopup="true" aria-label="الإشعارات" style="position: relative; width: 40px; height: 40px; border: 1px solid #E2E8F0; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #475569"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 8a6 6 0 0112 0c0 7 3 8 3 8H3s3-1 3-8M10 20a2 2 0 004 0"></path></svg><span style="position: absolute; top: 8px; right: 10px; width: 9px; height: 9px; border-radius: 50%; background: #E5484D; border: 2px solid #FFFFFF"></span>
<div class="dm" style="width: 360px; overflow: hidden">
<div style="display: flex; justify-content: space-between; align-items: center; padding: 14px 16px"><span style="font-size: 16px; font-weight: 800">الإشعارات</span><a href="#" style="font-size: 13px; font-weight: 700; color: #2740E8">تحديد الكل كمقروء</a></div>
<div class="nt"><div style="width: 36px; height: 36px; border-radius: 50%; background: #DDE4FF; color: #2740E8; display: flex; align-items: center; justify-content: center; flex: none"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 6c-2-1.5-5-2-9-2v14c4 0 7 .5 9 2 2-1.5 5-2 9-2V4c-4 0-7 .5-9 2zM12 6v14"></path></svg></div><div style="display: flex; flex-direction: column; gap: 2px"><span style="font-size: 14px; font-weight: 700; line-height: 1.5">أضاف الأستاذ أحمد درساً جديداً في «أساسيات الجبر»</span><span style="font-size: 12px; color: #475569">منذ ساعة</span></div><span style="width: 8px; height: 8px; border-radius: 50%; background: #2740E8; margin-inline-start: auto; margin-top: 6px; flex: none"></span></div>
<div class="nt"><div style="width: 36px; height: 36px; border-radius: 50%; background: #E3F8EC; color: #0B6B3A; display: flex; align-items: center; justify-content: center; flex: none"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10"></path></svg></div><div style="display: flex; flex-direction: column; gap: 2px"><span style="font-size: 14px; font-weight: 700; line-height: 1.5">تم تصحيح واجبك: 18 من 20</span><span style="font-size: 12px; color: #475569">أمس</span></div><span style="width: 8px; height: 8px; border-radius: 50%; background: #2740E8; margin-inline-start: auto; margin-top: 6px; flex: none"></span></div>
<div class="nt"><div style="width: 36px; height: 36px; border-radius: 50%; background: #FFE7B0; color: #8A5A00; display: flex; align-items: center; justify-content: center; flex: none"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"></rect><path d="M10 9.5v5l4.5-2.5-4.5-2.5z"></path></svg></div><div style="display: flex; flex-direction: column; gap: 2px"><span style="font-size: 14px; font-weight: 700; line-height: 1.5">تذكير: جلسة مباشرة يوم السبت الساعة 8 مساءً</span><span style="font-size: 12px; color: #475569">أمس</span></div></div>
<a href="#" style="display: block; text-align: center; padding: 12px; border-top: 1px solid #E2E8F0; font-size: 14px; font-weight: 700; color: #2740E8">عرض كل الإشعارات</a>
</div></div>
<div class="dd" tabindex="0" role="button" aria-haspopup="true" aria-label="قائمة المستخدم" style="display: flex; align-items: center; gap: 10px">
<div style="width: 36px; height: 36px; border-radius: 50%; background: #DDE4FF; color: #2740E8; font-weight: 800; display: flex; align-items: center; justify-content: center; flex: none">س</div>
<div style="display: flex; flex-direction: column; line-height: 1.4"><span style="font-size: 14px; font-weight: 800">سارة علي</span><span style="font-size: 12px; color: #475569">طالبة</span></div>
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#475569" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"></path></svg>
<div class="dm" style="width: 260px; padding: 8px">
<div style="display: flex; align-items: center; gap: 12px; padding: 10px 12px 14px; border-bottom: 1px solid #E2E8F0; margin-bottom: 6px"><div style="width: 40px; height: 40px; border-radius: 50%; background: #DDE4FF; color: #2740E8; font-weight: 800; display: flex; align-items: center; justify-content: center; flex: none">س</div><div style="display: flex; flex-direction: column; line-height: 1.5"><span style="font-size: 15px; font-weight: 800">سارة علي</span><span dir="ltr" style="font-size: 12px; color: #475569; text-align: right">sara@example.com</span></div></div>
<a href="#" class="mi"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#475569" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="4"></circle><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"></path></svg>ملفي الشخصي</a>
<a href="#" class="mi"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#475569" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"></circle><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"></path></svg>إعدادات الحساب</a>
<a href="#" class="mi"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#475569" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="M9.5 9.5a2.5 2.5 0 015 .5c0 1.5-2.5 2-2.5 3.5M12 17h.01"></path></svg>المساعدة والدعم</a>
<div style="height: 1px; background: #E2E8F0; margin: 6px 0"></div>
<NuxtLink to="/login" class="mi" style="color: #C0262D"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 4H5v16h4M16 8l4 4-4 4M20 12H9"></path></svg>تسجيل الخروج</NuxtLink>
</div>
</div>
</div>
</div>

<div class="vw v1">

<div style="display: flex; flex-direction: column; gap: 4px">
<h1 style="margin: 0; font-size: 30px; line-height: 1.4; font-weight: 800">أهلاً بعودتك، سارة</h1>
<span style="font-size: 15px; color: #475569">واصل رحلتك التعليمية من حيث توقفت.</span>
</div>

<div class="card" style="display: flex; flex-wrap: wrap; align-items: center; gap: 24px; padding: 28px">
<div style="width: 132px; height: 132px; border-radius: 20px; background: #DDE4FF; color: #2740E8; display: flex; align-items: center; justify-content: center; flex: none"><svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 6c-2-1.5-5-2-9-2v14c4 0 7 .5 9 2 2-1.5 5-2 9-2V4c-4 0-7 .5-9 2zM12 6v14"></path></svg></div>
<div style="flex: 1 1 320px; display: flex; flex-direction: column; gap: 12px">
<span class="chip" style="background: #EEF1FF; color: #2740E8; align-self: flex-start">تابع التعلّم</span>
<h2 style="margin: 0; font-size: 24px; font-weight: 800">أساسيات الجبر</h2>
<span style="font-size: 15px; color: #475569">الدرس 8 من 12 · حل المعادلات من الدرجة الأولى</span>
<div style="display: flex; align-items: center; gap: 12px"><div class="pg" style="flex: 1"><div style="width: 65%"></div></div><span style="font-size: 14px; font-weight: 700">65%</span></div>
</div>
<a href="#" class="btn" style="min-height: 52px; box-sizing: border-box; display: inline-flex; align-items: center; gap: 8px; background: #2740E8; color: #FFFFFF; padding: 0 28px; border-radius: 12px; font-size: 16px; font-weight: 800"><svg width="18" height="18" viewBox="0 0 24 24" fill="#FFFFFF" aria-hidden="true"><path d="M8 5v14l11-7z"></path></svg>متابعة الدرس</a>
</div>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px">
<div class="card" style="display: flex; flex-direction: column; gap: 6px"><span style="font-size: 14px; color: #475569">الدورات المسجلة</span><span style="font-size: 30px; font-weight: 800">3</span></div>
<div class="card" style="display: flex; flex-direction: column; gap: 6px"><span style="font-size: 14px; color: #475569">الدروس المكتملة</span><span style="font-size: 30px; font-weight: 800">24</span></div>
<div class="card" style="display: flex; flex-direction: column; gap: 6px"><span style="font-size: 14px; color: #475569">ساعات التعلّم</span><span style="font-size: 30px; font-weight: 800">18</span></div>
<div class="card" style="display: flex; flex-direction: column; gap: 6px"><span style="font-size: 14px; color: #475569">الشهادات</span><span style="font-size: 30px; font-weight: 800">1</span></div>
</div>

<div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: flex-start">
<div class="card" style="flex: 2 1 480px; display: flex; flex-direction: column">
<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px"><h2 style="margin: 0; font-size: 20px; font-weight: 800">دوراتي</h2><label for="v2" style="font-size: 15px; font-weight: 700; color: #2740E8; cursor: pointer">عرض الكل</label></div>
<div class="cr" style="border-top: none"><div style="width: 52px; height: 52px; border-radius: 12px; background: #DDE4FF; flex: none"></div><div style="flex: 1 1 200px; display: flex; flex-direction: column; gap: 8px"><div style="display: flex; flex-direction: column; line-height: 1.5"><span style="font-size: 16px; font-weight: 800">أساسيات الجبر</span><span style="font-size: 13px; color: #475569">الأستاذ أحمد محمد</span></div><div style="display: flex; align-items: center; gap: 10px"><div class="pg" style="flex: 1"><div style="width: 65%"></div></div><span style="font-size: 13px; font-weight: 700">65%</span></div></div><a href="#" class="ob">متابعة</a></div>
<div class="cr"><div style="width: 52px; height: 52px; border-radius: 12px; background: #FFE7B0; flex: none"></div><div style="flex: 1 1 200px; display: flex; flex-direction: column; gap: 8px"><div style="display: flex; flex-direction: column; line-height: 1.5"><span style="font-size: 16px; font-weight: 800">دورة مكثفة في الهندسة</span><span style="font-size: 13px; color: #475569">الأستاذ أحمد محمد</span></div><div style="display: flex; align-items: center; gap: 10px"><div class="pg" style="flex: 1"><div style="width: 30%"></div></div><span style="font-size: 13px; font-weight: 700">30%</span></div></div><a href="#" class="ob">متابعة</a></div>
<div class="cr"><div style="width: 52px; height: 52px; border-radius: 12px; background: #E3F8EC; flex: none"></div><div style="flex: 1 1 200px; display: flex; flex-direction: column; gap: 8px"><div style="display: flex; flex-direction: column; line-height: 1.5"><span style="font-size: 16px; font-weight: 800">اللغة الإنجليزية: القواعد</span><span style="font-size: 13px; color: #475569">الأستاذ أحمد محمد</span></div><div style="display: flex; align-items: center; gap: 10px"><div class="pg" style="flex: 1"><div style="width: 100%; background: #0B6B3A"></div></div><span style="font-size: 13px; font-weight: 700">مكتملة</span></div></div><label for="v4" class="ob" style="cursor: pointer">الشهادة</label></div>
</div>

<div class="card" style="flex: 1 1 300px; display: flex; flex-direction: column; gap: 16px">
<h2 style="margin: 0; font-size: 20px; font-weight: 800">المهام القادمة</h2>
<div style="display: flex; align-items: center; gap: 12px"><div style="width: 40px; height: 40px; border-radius: 12px; background: #FFF4D6; color: #8A5A00; display: flex; align-items: center; justify-content: center; flex: none"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="4" width="14" height="17" rx="2"></rect><path d="M9 4h6v3H9zM9 12h6M9 16h4"></path></svg></div><div style="display: flex; flex-direction: column; line-height: 1.5"><span style="font-size: 15px; font-weight: 700">واجب: المعادلات الخطية</span><span style="font-size: 13px; color: #475569">يُسلَّم غداً</span></div></div>
<div style="display: flex; align-items: center; gap: 12px"><div style="width: 40px; height: 40px; border-radius: 12px; background: #DDE4FF; color: #2740E8; display: flex; align-items: center; justify-content: center; flex: none"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10"></path></svg></div><div style="display: flex; flex-direction: column; line-height: 1.5"><span style="font-size: 15px; font-weight: 700">اختبار الهندسة</span><span style="font-size: 13px; color: #475569">الخميس القادم</span></div></div>
<div style="display: flex; align-items: center; gap: 12px"><div style="width: 40px; height: 40px; border-radius: 12px; background: #E3F8EC; color: #0B6B3A; display: flex; align-items: center; justify-content: center; flex: none"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"></rect><path d="M10 9.5v5l4.5-2.5-4.5-2.5z"></path></svg></div><div style="display: flex; flex-direction: column; line-height: 1.5"><span style="font-size: 15px; font-weight: 700">جلسة مباشرة مع الأستاذ أحمد</span><span style="font-size: 13px; color: #475569">السبت · 8 مساءً</span></div></div>
</div>
</div>

<div class="card" style="display: flex; flex-direction: column; gap: 20px">
<div style="display: flex; justify-content: space-between; align-items: center"><h2 style="margin: 0; font-size: 20px; font-weight: 800">دورات مقترحة لك</h2><a href="#" style="font-size: 15px; font-weight: 700; color: #2740E8">تصفّح كل الدورات</a></div>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px">
<div style="border: 1px solid #E2E8F0; border-radius: 16px; overflow: hidden; display: flex; flex-direction: column"><div style="height: 96px; background: #FFE7B0"></div><div style="padding: 16px; display: flex; flex-direction: column; gap: 6px"><span style="font-size: 16px; font-weight: 800">التفاضل والتكامل</span><span style="font-size: 13px; color: #475569">الأستاذ أحمد محمد</span><div style="display: flex; align-items: center; justify-content: space-between; margin-top: 8px"><span style="font-size: 16px; font-weight: 800">400 ج.م</span><a href="#" class="btn" style="background: #2740E8; color: #FFFFFF; padding: 9px 18px; border-radius: 10px; font-size: 14px; font-weight: 800">سجّل الآن</a></div></div></div>
<div style="border: 1px solid #E2E8F0; border-radius: 16px; overflow: hidden; display: flex; flex-direction: column"><div style="height: 96px; background: #DDE4FF"></div><div style="padding: 16px; display: flex; flex-direction: column; gap: 6px"><span style="font-size: 16px; font-weight: 800">الإحصاء والاحتمالات</span><span style="font-size: 13px; color: #475569">الأستاذ أحمد محمد</span><div style="display: flex; align-items: center; justify-content: space-between; margin-top: 8px"><span style="font-size: 16px; font-weight: 800">350 ج.م</span><a href="#" class="btn" style="background: #2740E8; color: #FFFFFF; padding: 9px 18px; border-radius: 10px; font-size: 14px; font-weight: 800">سجّل الآن</a></div></div></div>
</div>
</div>

</div>
<div class="vw v2">
<div style="display: flex; flex-direction: column; gap: 4px"><h1 style="margin: 0; font-size: 30px; line-height: 1.4; font-weight: 800">دوراتي</h1><span style="font-size: 15px; color: #475569">كل الدورات التي سجّلت فيها في مكان واحد.</span></div>
<div style="display: flex; flex-wrap: wrap; gap: 10px"><span class="fc on">الكل (3)</span><span class="fc">قيد التعلّم (2)</span><span class="fc">مكتملة (1)</span></div>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px">
<div class="card" style="padding: 0; overflow: hidden; display: flex; flex-direction: column"><div style="height: 110px; background: #DDE4FF; color: #2740E8; display: flex; align-items: center; justify-content: center"><svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 6c-2-1.5-5-2-9-2v14c4 0 7 .5 9 2 2-1.5 5-2 9-2V4c-4 0-7 .5-9 2zM12 6v14"></path></svg></div><div style="padding: 20px; display: flex; flex-direction: column; gap: 12px"><div style="display: flex; flex-direction: column; line-height: 1.5"><span style="font-size: 18px; font-weight: 800">أساسيات الجبر</span><span style="font-size: 13px; color: #475569">الأستاذ أحمد محمد</span></div><div style="display: flex; flex-direction: column; gap: 6px"><div style="display: flex; justify-content: space-between; font-size: 13px; color: #475569"><span>8 من 12 درساً</span><span style="font-weight: 700; color: #0F172A">65%</span></div><div class="pg"><div style="width: 65%"></div></div></div><a href="#" class="btn" style="text-align: center; background: #2740E8; color: #FFFFFF; padding: 12px 20px; border-radius: 12px; font-size: 15px; font-weight: 800">متابعة التعلّم</a></div></div>
<div class="card" style="padding: 0; overflow: hidden; display: flex; flex-direction: column"><div style="height: 110px; background: #FFE7B0; color: #8A5A00; display: flex; align-items: center; justify-content: center"><svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 6c-2-1.5-5-2-9-2v14c4 0 7 .5 9 2 2-1.5 5-2 9-2V4c-4 0-7 .5-9 2zM12 6v14"></path></svg></div><div style="padding: 20px; display: flex; flex-direction: column; gap: 12px"><div style="display: flex; flex-direction: column; line-height: 1.5"><span style="font-size: 18px; font-weight: 800">دورة مكثفة في الهندسة</span><span style="font-size: 13px; color: #475569">الأستاذ أحمد محمد</span></div><div style="display: flex; flex-direction: column; gap: 6px"><div style="display: flex; justify-content: space-between; font-size: 13px; color: #475569"><span>6 من 20 درساً</span><span style="font-weight: 700; color: #0F172A">30%</span></div><div class="pg"><div style="width: 30%"></div></div></div><a href="#" class="btn" style="text-align: center; background: #2740E8; color: #FFFFFF; padding: 12px 20px; border-radius: 12px; font-size: 15px; font-weight: 800">متابعة التعلّم</a></div></div>
<div class="card" style="padding: 0; overflow: hidden; display: flex; flex-direction: column"><div style="height: 110px; background: #E3F8EC; color: #0B6B3A; display: flex; align-items: center; justify-content: center"><svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 6c-2-1.5-5-2-9-2v14c4 0 7 .5 9 2 2-1.5 5-2 9-2V4c-4 0-7 .5-9 2zM12 6v14"></path></svg></div><div style="padding: 20px; display: flex; flex-direction: column; gap: 12px"><div style="display: flex; flex-direction: column; line-height: 1.5"><span style="font-size: 18px; font-weight: 800">اللغة الإنجليزية: القواعد</span><span style="font-size: 13px; color: #475569">الأستاذ أحمد محمد</span></div><div style="display: flex; flex-direction: column; gap: 6px"><div style="display: flex; justify-content: space-between; font-size: 13px; color: #475569"><span>15 من 15 درساً</span><span style="font-weight: 700; color: #0F172A">100%</span></div><div class="pg"><div style="width: 100%; background: #0B6B3A"></div></div></div><label for="v4" class="ob" style="cursor: pointer; width: 100%">عرض الشهادة</label></div></div>
</div>
</div>
<div class="vw v3">
<div style="display: flex; flex-direction: column; gap: 4px"><h1 style="margin: 0; font-size: 30px; line-height: 1.4; font-weight: 800">الواجبات والاختبارات</h1><span style="font-size: 15px; color: #475569">تابع مهامك ومواعيد التسليم ونتائجك.</span></div>
<div style="display: flex; flex-wrap: wrap; gap: 10px"><span class="fc on">الكل (5)</span><span class="fc">قادمة (2)</span><span class="fc">مُسلَّمة (1)</span><span class="fc">مصحَّحة (2)</span></div>
<div class="card" style="display: flex; flex-direction: column; padding-top: 8px; padding-bottom: 8px">
<div class="ar" style="border-top: none"><span class="chip" style="background: #FFF4D6; color: #8A5A00; flex: none">واجب</span><div style="flex: 1 1 220px; display: flex; flex-direction: column; line-height: 1.5"><span style="font-size: 16px; font-weight: 800">المعادلات الخطية</span><span style="font-size: 13px; color: #475569">أساسيات الجبر · يُسلَّم غداً</span></div><span class="chip" style="background: #FFF4D6; color: #8A5A00">قيد التسليم</span><a href="#" class="btn" style="background: #2740E8; color: #FFFFFF; padding: 9px 18px; border-radius: 10px; font-size: 14px; font-weight: 800">ابدأ التسليم</a></div>
<div class="ar"><span class="chip" style="background: #DDE4FF; color: #2740E8; flex: none">اختبار</span><div style="flex: 1 1 220px; display: flex; flex-direction: column; line-height: 1.5"><span style="font-size: 16px; font-weight: 800">اختبار الهندسة</span><span style="font-size: 13px; color: #475569">دورة الهندسة · الخميس القادم</span></div><span class="chip" style="background: #EEF1FF; color: #2740E8">لم يبدأ</span><a href="#" class="ob">عرض التفاصيل</a></div>
<div class="ar"><span class="chip" style="background: #FFF4D6; color: #8A5A00; flex: none">واجب</span><div style="flex: 1 1 220px; display: flex; flex-direction: column; line-height: 1.5"><span style="font-size: 16px; font-weight: 800">مسائل الكسور</span><span style="font-size: 13px; color: #475569">أساسيات الجبر · سُلِّم أمس</span></div><span class="chip" style="background: #EEF1FF; color: #2740E8">بانتظار التصحيح</span><a href="#" class="ob">عرض</a></div>
<div class="ar"><span class="chip" style="background: #FFF4D6; color: #8A5A00; flex: none">واجب</span><div style="flex: 1 1 220px; display: flex; flex-direction: column; line-height: 1.5"><span style="font-size: 16px; font-weight: 800">حل المعادلات</span><span style="font-size: 13px; color: #475569">أساسيات الجبر · مصحَّح</span></div><span class="chip" style="background: #E3F8EC; color: #0B6B3A">18 من 20</span><a href="#" class="ob">عرض الملاحظات</a></div>
<div class="ar"><span class="chip" style="background: #DDE4FF; color: #2740E8; flex: none">اختبار</span><div style="flex: 1 1 220px; display: flex; flex-direction: column; line-height: 1.5"><span style="font-size: 16px; font-weight: 800">اختبار القواعد</span><span style="font-size: 13px; color: #475569">اللغة الإنجليزية · مصحَّح</span></div><span class="chip" style="background: #E3F8EC; color: #0B6B3A">92%</span><a href="#" class="ob">عرض النتيجة</a></div>
</div>
</div>
<div class="vw v4">
<div style="display: flex; flex-direction: column; gap: 4px"><h1 style="margin: 0; font-size: 30px; line-height: 1.4; font-weight: 800">الشهادات</h1><span style="font-size: 15px; color: #475569">الشهادات التي حصلت عليها والتي تعمل على الحصول عليها.</span></div>
<div class="card" style="display: flex; flex-wrap: wrap; align-items: center; gap: 28px">
<div style="flex: 1 1 360px; border: 2px solid #DDE4FF; background: #FAFBFF; border-radius: 18px; padding: 28px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 10px; color: #2740E8"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="9" r="5"></circle><path d="M8.5 13.5L7 21l5-3 5 3-1.5-7.5"></path></svg><span style="font-size: 22px; font-weight: 800; color: #0F172A">شهادة إتمام</span><span style="font-size: 14px; color: #475569">تُمنح إلى</span><span style="font-size: 20px; font-weight: 800; color: #0F172A">سارة علي</span><span style="font-size: 14px; color: #475569">لإتمامها دورة «اللغة الإنجليزية: القواعد»</span><span style="font-size: 13px; color: #475569; margin-top: 8px">الأستاذ أحمد محمد · أكتوبر 2026</span></div>
<div style="flex: 1 1 240px; display: flex; flex-direction: column; gap: 14px">
<span class="chip" style="background: #E3F8EC; color: #0B6B3A; align-self: flex-start">حصلت عليها</span>
<h2 style="margin: 0; font-size: 22px; font-weight: 800">اللغة الإنجليزية: القواعد</h2>
<span style="font-size: 14px; color: #475569">يمكنك تنزيل الشهادة أو مشاركتها على حساباتك.</span>
<div style="display: flex; flex-wrap: wrap; gap: 12px"><a href="#" class="btn" style="background: #2740E8; color: #FFFFFF; padding: 12px 24px; border-radius: 12px; font-size: 15px; font-weight: 800">تنزيل PDF</a><a href="#" class="ob" style="min-height: 46px">مشاركة</a></div>
</div>
</div>
<h2 style="margin: 0; font-size: 20px; font-weight: 800">شهادات قادمة</h2>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px">
<div class="card" style="display: flex; flex-direction: column; gap: 14px"><div style="display: flex; align-items: center; gap: 12px"><div style="width: 48px; height: 48px; border-radius: 12px; background: #F1F5F9; color: #475569; display: flex; align-items: center; justify-content: center; flex: none"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2"></rect><path d="M8 11V8a4 4 0 018 0v3"></path></svg></div><div style="display: flex; flex-direction: column; line-height: 1.5"><span style="font-size: 16px; font-weight: 800">أساسيات الجبر</span><span style="font-size: 13px; color: #475569">أكمل الدورة لتحصل على الشهادة</span></div></div><div style="display: flex; align-items: center; gap: 10px"><div class="pg" style="flex: 1"><div style="width: 65%"></div></div><span style="font-size: 13px; font-weight: 700">65%</span></div></div>
<div class="card" style="display: flex; flex-direction: column; gap: 14px"><div style="display: flex; align-items: center; gap: 12px"><div style="width: 48px; height: 48px; border-radius: 12px; background: #F1F5F9; color: #475569; display: flex; align-items: center; justify-content: center; flex: none"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2"></rect><path d="M8 11V8a4 4 0 018 0v3"></path></svg></div><div style="display: flex; flex-direction: column; line-height: 1.5"><span style="font-size: 16px; font-weight: 800">دورة مكثفة في الهندسة</span><span style="font-size: 13px; color: #475569">أكمل الدورة لتحصل على الشهادة</span></div></div><div style="display: flex; align-items: center; gap: 10px"><div class="pg" style="flex: 1"><div style="width: 30%"></div></div><span style="font-size: 13px; font-weight: 700">30%</span></div></div>
</div>
</div>
<div class="vw v5">
<div style="display: flex; flex-direction: column; gap: 4px"><h1 style="margin: 0; font-size: 30px; line-height: 1.4; font-weight: 800">الرسائل</h1><span style="font-size: 15px; color: #475569">تواصل مع معلميك وفريق الدعم.</span></div>
<div class="card" style="padding: 0; overflow: hidden; display: flex; flex-wrap: wrap; min-height: 540px">
<div style="flex: 0 0 320px; border-left: 1px solid #E2E8F0; display: flex; flex-direction: column">
<div style="padding: 16px; font-size: 16px; font-weight: 800">المحادثات</div>
<div class="cv" style="background: #F3F6FF"><div style="width: 44px; height: 44px; border-radius: 50%; background: #FFC247; color: #0F172A; font-weight: 800; display: flex; align-items: center; justify-content: center; flex: none">أ</div><div style="flex: 1; min-width: 0; display: flex; flex-direction: column; line-height: 1.5"><span style="font-size: 15px; font-weight: 800">الأستاذ أحمد محمد</span><span style="font-size: 13px; color: #475569">سأرسل لك مثالاً مبسطاً</span></div><span style="font-size: 12px; color: #475569; align-self: flex-start">10:30</span></div>
<div class="cv"><div style="width: 44px; height: 44px; border-radius: 50%; background: #E3F8EC; color: #0B6B3A; font-weight: 800; display: flex; align-items: center; justify-content: center; flex: none">د</div><div style="flex: 1; min-width: 0; display: flex; flex-direction: column; line-height: 1.5"><span style="font-size: 15px; font-weight: 800">دعم المنصة</span><span style="font-size: 13px; color: #475569">مرحباً بك في المنصة</span></div><span style="font-size: 12px; color: #475569; align-self: flex-start">أمس</span></div>
<div class="cv"><div style="width: 44px; height: 44px; border-radius: 50%; background: #DDE4FF; color: #2740E8; font-weight: 800; display: flex; align-items: center; justify-content: center; flex: none">م</div><div style="flex: 1; min-width: 0; display: flex; flex-direction: column; line-height: 1.5"><span style="font-size: 15px; font-weight: 800">مجموعة أساسيات الجبر</span><span style="font-size: 13px; color: #475569">جلسة السبت الساعة 8</span></div><span style="font-size: 12px; color: #475569; align-self: flex-start">الخميس</span></div>
</div>
<div style="flex: 1 1 380px; display: flex; flex-direction: column">
<div style="display: flex; align-items: center; gap: 12px; padding: 14px 20px; border-bottom: 1px solid #E2E8F0"><div style="width: 40px; height: 40px; border-radius: 50%; background: #FFC247; font-weight: 800; display: flex; align-items: center; justify-content: center">أ</div><div style="display: flex; flex-direction: column; line-height: 1.4"><span style="font-size: 15px; font-weight: 800">الأستاذ أحمد محمد</span><span style="font-size: 12px; color: #0B6B3A">متصل الآن</span></div></div>
<div style="flex: 1; padding: 20px; display: flex; flex-direction: column; gap: 12px; background: #FCFDFF">
<div class="bub" style="align-self: flex-start; background: #F3F6FF">أهلاً سارة، هل واجهتِ صعوبة في الدرس 8؟</div>
<div class="bub" style="align-self: flex-end; background: #2740E8; color: #FFFFFF">أهلاً أستاذ أحمد، لم أفهم خطوة نقل الحدود في المعادلة.</div>
<div class="bub" style="align-self: flex-start; background: #F3F6FF">لا مشكلة، سأرسل لك مثالاً مبسطاً مع شرح بالفيديو.</div>
<div class="bub" style="align-self: flex-end; background: #2740E8; color: #FFFFFF">شكراً جزيلاً، سأنتظره.</div>
</div>
<div style="display: flex; gap: 12px; padding: 14px 20px; border-top: 1px solid #E2E8F0"><input class="f" type="text" aria-label="اكتب رسالتك" placeholder="اكتب رسالتك هنا"><a href="#" class="btn" style="flex: none; display: inline-flex; align-items: center; background: #2740E8; color: #FFFFFF; padding: 0 24px; border-radius: 12px; font-size: 15px; font-weight: 800">إرسال</a></div>
</div>
</div>
</div>
<div class="vw v6">
<div style="display: flex; flex-direction: column; gap: 4px"><h1 style="margin: 0; font-size: 30px; line-height: 1.4; font-weight: 800">الإعدادات</h1><span style="font-size: 15px; color: #475569">أدِر بياناتك الشخصية وتفضيلات الإشعارات.</span></div>
<div class="card" style="display: flex; flex-direction: column; gap: 22px">
<h2 style="margin: 0; font-size: 20px; font-weight: 800">البيانات الشخصية</h2>
<div style="display: flex; align-items: center; gap: 16px"><div style="width: 72px; height: 72px; border-radius: 50%; background: #DDE4FF; color: #2740E8; font-size: 28px; font-weight: 800; display: flex; align-items: center; justify-content: center">س</div><a href="#" class="ob">تغيير الصورة</a></div>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px">
<div><label class="l" for="sfn">الاسم الأول</label><input class="f" id="sfn" type="text" placeholder="سارة"></div>
<div><label class="l" for="sln">الاسم الأخير</label><input class="f" id="sln" type="text" placeholder="علي"></div>
<div><label class="l" for="sem">البريد الإلكتروني</label><input class="f" id="sem" type="email" placeholder="sara@example.com" dir="ltr" style="text-align: left"></div>
<div><label class="l" for="sph">رقم الهاتف</label><input class="f" id="sph" type="tel" placeholder="+20 100 000 0000" dir="ltr" style="text-align: left"></div>
<div><label class="l" for="spw">كلمة المرور الجديدة</label><input class="f" id="spw" type="password" placeholder="••••••••" dir="ltr" style="text-align: left"></div>
<div><label class="l" for="spw2">تأكيد كلمة المرور</label><input class="f" id="spw2" type="password" placeholder="••••••••" dir="ltr" style="text-align: left"></div>
</div>
</div>
<div class="card" style="display: flex; flex-direction: column; gap: 4px">
<h2 style="margin: 0 0 10px; font-size: 20px; font-weight: 800">الإشعارات</h2>
<label style="display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 14px 0; border-top: 1px solid #E2E8F0; cursor: pointer"><div style="display: flex; flex-direction: column; line-height: 1.5"><span style="font-size: 15px; font-weight: 700">دروس جديدة</span><span style="font-size: 13px; color: #475569">أخبرني عند إضافة دروس جديدة في دوراتي</span></div><input type="checkbox" checked="" style="accent-color: #2740E8; width: 20px; height: 20px; margin: 0; flex: none"></label>
<label style="display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 14px 0; border-top: 1px solid #E2E8F0; cursor: pointer"><div style="display: flex; flex-direction: column; line-height: 1.5"><span style="font-size: 15px; font-weight: 700">مواعيد التسليم</span><span style="font-size: 13px; color: #475569">تذكير قبل موعد الواجبات والاختبارات</span></div><input type="checkbox" checked="" style="accent-color: #2740E8; width: 20px; height: 20px; margin: 0; flex: none"></label>
<label style="display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 14px 0; border-top: 1px solid #E2E8F0; cursor: pointer"><div style="display: flex; flex-direction: column; line-height: 1.5"><span style="font-size: 15px; font-weight: 700">الجلسات المباشرة</span><span style="font-size: 13px; color: #475569">تذكير قبل بدء الجلسات المباشرة</span></div><input type="checkbox" checked="" style="accent-color: #2740E8; width: 20px; height: 20px; margin: 0; flex: none"></label>
<label style="display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 14px 0; border-top: 1px solid #E2E8F0; cursor: pointer"><div style="display: flex; flex-direction: column; line-height: 1.5"><span style="font-size: 15px; font-weight: 700">رسائل البريد الإلكتروني</span><span style="font-size: 13px; color: #475569">استقبال ملخص أسبوعي على بريدي</span></div><input type="checkbox" style="accent-color: #2740E8; width: 20px; height: 20px; margin: 0; flex: none"></label>
</div>
<div style="display: flex; flex-wrap: wrap; gap: 12px"><a href="#" class="btn" style="background: #2740E8; color: #FFFFFF; padding: 13px 28px; border-radius: 12px; font-size: 16px; font-weight: 800">حفظ التغييرات</a><a href="#" class="ob" style="min-height: 48px">إلغاء</a></div>
</div>
</div>
</div>
</template>

<style scoped>

body{margin:0}
a{color:#0F172A;text-decoration:none}
.ni{display:flex;align-items:center;gap:12px;padding:12px 16px;border-radius:12px;font-size:15px;font-weight:700;color:#475569}
.ni:hover{background:#F3F6FF}
.ni.on{background:#EEF1FF;color:var(--ac)}
.ni svg{flex:none}
.card{background:#FFFFFF;border:1px solid #E2E8F0;border-radius:18px;padding:24px;box-sizing:border-box}
.btn:hover{opacity:.92}
.sr{position:absolute;opacity:0;width:1px;height:1px}
.sb{flex:0 0 270px;transition:flex-basis .2s}
.tg{display:flex;align-items:center;justify-content:center;width:40px;height:40px;border:1px solid #E2E8F0;border-radius:12px;color:#475569;cursor:pointer;flex:none}
.tg:hover{background:#F3F6FF}
.dsh:has(#sbt:checked) .sb{flex-basis:84px;padding-left:14px;padding-right:14px}
.dsh:has(#sbt:checked) .ni{font-size:0;justify-content:center;padding:12px 0}
.dsh:has(#sbt:checked) .bt{display:none}
.dsh:has(#sbt:checked) .br{justify-content:center;padding:0}
.dsh:has(#sbt:checked) .pf{justify-content:center;padding:10px 0;border-color:transparent}
.dd{position:relative;cursor:pointer;outline:none}
.dd:focus-visible{outline:3px solid #DDE4FF;border-radius:12px}
.dm{display:none;position:absolute;top:calc(100% + 10px);left:0;background:#FFFFFF;color:#0F172A;border:1px solid #E2E8F0;border-radius:16px;box-shadow:0 12px 32px rgba(15,23,42,.12);z-index:30;cursor:default;text-align:right}
.dd:focus-within .dm{display:block}
.mi{display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:10px;font-size:14px;font-weight:700;color:#0F172A;cursor:pointer}
.mi:hover{background:#F3F6FF}
.mi svg{flex:none}
.nt{display:flex;gap:12px;padding:12px 16px;border-top:1px solid #E2E8F0}
.nt:hover{background:#F8FAFF}
.chip{display:inline-block;padding:4px 12px;border-radius:999px;font-size:13px;font-weight:700}
.pg{height:8px;border-radius:999px;background:#E2E8F0;overflow:hidden}
.pg>div{height:100%;border-radius:999px;background:var(--ac)}
.cr{display:flex;flex-wrap:wrap;align-items:center;gap:16px;padding:16px 0;border-top:1px solid #E2E8F0}
.ob{display:inline-flex;align-items:center;justify-content:center;min-height:40px;padding:0 18px;box-sizing:border-box;border:1px solid #CBD5E1;border-radius:10px;font-size:14px;font-weight:700}
.ob:hover{background:#F3F6FF}
.ni{cursor:pointer}
.vw{display:none;padding:36px 40px;box-sizing:border-box;flex-direction:column;gap:24px}
.dsh:has(#v1:checked) .v1,.dsh:has(#v2:checked) .v2,.dsh:has(#v3:checked) .v3,.dsh:has(#v4:checked) .v4,.dsh:has(#v5:checked) .v5,.dsh:has(#v6:checked) .v6{display:flex}
.dsh:has(#v1:checked) .n1,.dsh:has(#v2:checked) .n2,.dsh:has(#v3:checked) .n3,.dsh:has(#v4:checked) .n4,.dsh:has(#v5:checked) .n5,.dsh:has(#v6:checked) .n6{background:#EEF1FF;color:var(--ac)}
.l{display:block;font-size:15px;font-weight:700;margin-bottom:8px}
.f{width:100%;height:48px;box-sizing:border-box;border:1px solid #CBD5E1;border-radius:12px;padding:0 16px;font-family:inherit;font-size:15px;color:#0F172A;background:#FFFFFF}
.f:focus{outline:3px solid #DDE4FF;border-color:var(--ac)}
.ar{display:flex;flex-wrap:wrap;align-items:center;gap:16px;padding:16px 0;border-top:1px solid #E2E8F0}
.fc{display:inline-block;padding:8px 18px;border-radius:999px;font-size:14px;font-weight:700;background:#FFFFFF;border:1px solid #CBD5E1;cursor:pointer}
.fc.on{background:var(--ac);border-color:var(--ac);color:#FFFFFF}
.bub{max-width:78%;padding:12px 16px;border-radius:16px;font-size:14px;line-height:1.7}
.cv{display:flex;align-items:center;gap:12px;padding:14px 16px;border-top:1px solid #E2E8F0;cursor:pointer}
.cv:hover{background:#F8FAFF}

</style>
