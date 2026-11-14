<script setup lang="ts">
useHead({
  title: 'إعدادات الإشعارات - الإعدادات'
})

const toast = useToast()

const state = reactive({
  newStudents: true,
  newSales: true,
  newReviews: true,
  weeklyDigest: false
})

const sections = [{
  title: 'التنبيهات الفورية',
  description: 'اختر الأحداث التي تود تلقي تنبيهات فورية بشأنها داخل المنصة.',
  fields: [
    {
      name: 'newStudents' as const,
      label: 'طلاب جدد',
      description: 'أخبرني فور انضمام طالب جديد إلى إحدى دوراتي.'
    },
    {
      name: 'newSales' as const,
      label: 'مبيعات جديدة',
      description: 'إشعار فوري عند كل عملية شراء دورة ناجحة.'
    },
    {
      name: 'newReviews' as const,
      label: 'تقييمات جديدة',
      description: 'إشعار عند إضافة تقييم أو مراجعة على دوراتي.'
    }
  ]
}, {
  title: 'التقارير والملخصات',
  description: 'ملخصات دورية عبر البريد الإلكتروني لمتابعة أداء منصتك.',
  fields: [
    {
      name: 'weeklyDigest' as const,
      label: 'ملخص أسبوعي بالبريد الإلكتروني',
      description: 'استقبال ملخص بأداء الدورات والأرباح كل أسبوع.'
    }
  ]
}]

function onChange() {
  toast.add({
    title: 'تم تحديث التفضيلات',
    description: 'تم حفظ إعدادات الإشعارات بنجاح.',
    color: 'success'
  })
}
</script>

<template>
  <div v-for="(section, index) in sections" :key="index">
    <UPageCard
      :title="section.title"
      :description="section.description"
      variant="naked"
      class="mb-4"
    />

    <UPageCard variant="subtle" :ui="{ container: 'divide-y divide-default' }">
      <UFormField
        v-for="field in section.fields"
        :key="field.name"
        :name="field.name"
        :label="field.label"
        :description="field.description"
        class="flex items-center justify-between not-last:pb-4 gap-2"
      >
        <USwitch
          v-model="state[field.name]"
          @update:model-value="onChange"
        />
      </UFormField>
    </UPageCard>
  </div>
</template>
