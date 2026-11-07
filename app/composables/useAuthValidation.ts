import { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const generalPhoneRegex = /^(\+?\d{8,15}|0?1[0125]\d{8}|0?5\d{8})$/
const egyptPhoneRegex = /^0?1[0125]\d{8}$/
const saudiPhoneRegex = /^0?5\d{8}$/
const subdomainRegex = /^[a-zA-Z0-9]+$/

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'يرجى إدخال البريد الإلكتروني أو رقم الهاتف')
    .refine(
      (val) => emailRegex.test(val) || generalPhoneRegex.test(val.replace(/\s+/g, '')),
      'يرجى إدخال بريد إلكتروني أو رقم هاتف صحيح'
    ),
  password: z
    .string()
    .min(1, 'يرجى إدخال كلمة المرور')
    .min(8, 'كلمة المرور يجب أن تتكون من 8 أحرف على الأقل'),
  rememberMe: z.boolean().optional()
})

const registerStep1Base = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, 'الاسم الأول مطلوب')
    .min(2, 'الاسم الأول يجب أن يتكون من حرفين على الأقل'),
  lastName: z
    .string()
    .trim()
    .min(1, 'الاسم الأخير مطلوب')
    .min(2, 'الاسم الأخير يجب أن يتكون من حرفين على الأقل'),
  email: z
    .string()
    .trim()
    .min(1, 'البريد الإلكتروني مطلوب')
    .email('يرجى إدخال بريد إلكتروني صحيح'),
  countryCode: z.enum(['+20', '+966']),
  phone: z.string().trim().optional().default(''),
  gender: z.enum(['male', 'female']),
  password: z
    .string()
    .min(1, 'كلمة المرور مطلوبة')
    .min(8, 'كلمة المرور يجب أن تتكون من 8 أحرف على الأقل'),
  confirmPassword: z
    .string()
    .min(1, 'تأكيد كلمة المرور مطلوب')
})

function refineStep1(
  data: z.infer<typeof registerStep1Base>,
  ctx: z.RefinementCtx
) {
  const cleanPhone = (data.phone ?? '').replace(/\s+/g, '')
  if (cleanPhone.length > 0) {
    if (data.countryCode === '+20' && !egyptPhoneRegex.test(cleanPhone)) {
      ctx.addIssue({
        code: 'custom',
        path: ['phone'],
        message: 'يرجى إدخال رقم هاتف مصري صحيح (مثال: 1012345678)'
      })
    } else if (data.countryCode === '+966' && !saudiPhoneRegex.test(cleanPhone)) {
      ctx.addIssue({
        code: 'custom',
        path: ['phone'],
        message: 'يرجى إدخال رقم هاتف سعودي صحيح (مثال: 501234567)'
      })
    }
  }

  if (data.confirmPassword && data.password !== data.confirmPassword) {
    ctx.addIssue({
      code: 'custom',
      path: ['confirmPassword'],
      message: 'كلمتا المرور غير متطابقتين'
    })
  }
}

export const registerStep1Schema = registerStep1Base.superRefine(refineStep1)

export const registerSchema = registerStep1Base
  .extend({
    subdomain: z
      .string()
      .trim()
      .min(1, 'اسم المنصة مطلوب')
      .min(3, 'اسم المنصة يجب أن يتكون من 3 أحرف على الأقل')
      .max(30, 'اسم المنصة يجب ألا يتجاوز 30 حرفاً')
      .regex(subdomainRegex, 'استخدم أحرفاً إنجليزية وأرقاماً فقط بدون مسافات أو رموز'),
    agreeTerms: z
      .boolean()
      .refine((val) => val === true, 'يجب الموافقة على الشروط وسياسة الخصوصية للمتابعة')
  })
  .superRefine(refineStep1)

export type LoginSchema = z.output<typeof loginSchema>
export type RegisterStep1Schema = z.output<typeof registerStep1Schema>
export type RegisterSchema = z.output<typeof registerSchema>
export type LoginSubmitEvent = FormSubmitEvent<LoginSchema>
export type RegisterSubmitEvent = FormSubmitEvent<RegisterSchema>
