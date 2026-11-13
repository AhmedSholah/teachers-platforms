<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'

const props = withDefaults(
  defineProps<{
    modelValue?: string
    placeholder?: string
    minHeight?: string
  }>(),
  {
    modelValue: '',
    placeholder: 'اكتب محتوى الدرس بالتفصيل هنا... يمكنك تنسيق النصوص وإضافة العناوين والقوائم والاقتباسات.',
    minHeight: '220px'
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const editor = useEditor({
  content: props.modelValue || '',
  extensions: [
    StarterKit.configure({
      heading: {
        levels: [1, 2, 3]
      }
    }),
    Placeholder.configure({
      placeholder: props.placeholder
    })
  ],
  editorProps: {
    attributes: {
      class: 'prose prose-slate dark:prose-invert max-w-none focus:outline-none min-h-[180px] p-4 text-slate-800 dark:text-slate-100 text-sm leading-relaxed'
    }
  },
  onUpdate: () => {
    if (editor.value) {
      const html = editor.value.getHTML()
      emit('update:modelValue', html)
    }
  }
})

watch(
  () => props.modelValue,
  (val) => {
    if (editor.value && editor.value.getHTML() !== val) {
      editor.value.commands.setContent(val || '', false)
    }
  }
)

onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy()
  }
})
</script>

<template>
  <div class="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900 focus-within:border-primary-500 focus-within:ring-1 focus-within:ring-primary-500 transition-all">
    <!-- Toolbar -->
    <div
      v-if="editor"
      class="flex flex-wrap items-center gap-1 p-2 bg-slate-50 dark:bg-slate-800/70 border-b border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-300"
    >
      <!-- Headings -->
      <button
        type="button"
        :class="[
          'px-2 py-1 rounded text-xs font-bold transition-colors cursor-pointer',
          editor.isActive('heading', { level: 1 })
            ? 'bg-primary-100 text-primary-700 dark:bg-primary-950 dark:text-primary-300'
            : 'hover:bg-slate-200 dark:hover:bg-slate-700'
        ]"
        title="عنوان رئيسي (H1)"
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
      >
        H1
      </button>

      <button
        type="button"
        :class="[
          'px-2 py-1 rounded text-xs font-bold transition-colors cursor-pointer',
          editor.isActive('heading', { level: 2 })
            ? 'bg-primary-100 text-primary-700 dark:bg-primary-950 dark:text-primary-300'
            : 'hover:bg-slate-200 dark:hover:bg-slate-700'
        ]"
        title="عنوان فرعي (H2)"
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
      >
        H2
      </button>

      <button
        type="button"
        :class="[
          'px-2 py-1 rounded text-xs font-bold transition-colors cursor-pointer',
          editor.isActive('heading', { level: 3 })
            ? 'bg-primary-100 text-primary-700 dark:bg-primary-950 dark:text-primary-300'
            : 'hover:bg-slate-200 dark:hover:bg-slate-700'
        ]"
        title="عنوان جانبي (H3)"
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
      >
        H3
      </button>

      <button
        type="button"
        :class="[
          'px-2 py-1 rounded text-xs font-bold transition-colors cursor-pointer',
          editor.isActive('paragraph')
            ? 'bg-primary-100 text-primary-700 dark:bg-primary-950 dark:text-primary-300'
            : 'hover:bg-slate-200 dark:hover:bg-slate-700'
        ]"
        title="فقرة عادية"
        @click="editor.chain().focus().setParagraph().run()"
      >
        نص
      </button>

      <span class="w-px h-4 bg-slate-300 dark:bg-slate-700 mx-1" />

      <!-- Text Styling -->
      <button
        type="button"
        :class="[
          'p-1.5 rounded transition-colors cursor-pointer',
          editor.isActive('bold')
            ? 'bg-primary-100 text-primary-700 dark:bg-primary-950 dark:text-primary-300'
            : 'hover:bg-slate-200 dark:hover:bg-slate-700'
        ]"
        title="عريض (Bold)"
        @click="editor.chain().focus().toggleBold().run()"
      >
        <UIcon name="i-lucide-bold" class="w-4 h-4" />
      </button>

      <button
        type="button"
        :class="[
          'p-1.5 rounded transition-colors cursor-pointer',
          editor.isActive('italic')
            ? 'bg-primary-100 text-primary-700 dark:bg-primary-950 dark:text-primary-300'
            : 'hover:bg-slate-200 dark:hover:bg-slate-700'
        ]"
        title="مائل (Italic)"
        @click="editor.chain().focus().toggleItalic().run()"
      >
        <UIcon name="i-lucide-italic" class="w-4 h-4" />
      </button>

      <button
        type="button"
        :class="[
          'p-1.5 rounded transition-colors cursor-pointer',
          editor.isActive('strike')
            ? 'bg-primary-100 text-primary-700 dark:bg-primary-950 dark:text-primary-300'
            : 'hover:bg-slate-200 dark:hover:bg-slate-700'
        ]"
        title="يتوسطه خط (Strike)"
        @click="editor.chain().focus().toggleStrike().run()"
      >
        <UIcon name="i-lucide-strikethrough" class="w-4 h-4" />
      </button>

      <button
        type="button"
        :class="[
          'p-1.5 rounded transition-colors cursor-pointer',
          editor.isActive('code')
            ? 'bg-primary-100 text-primary-700 dark:bg-primary-950 dark:text-primary-300'
            : 'hover:bg-slate-200 dark:hover:bg-slate-700'
        ]"
        title="كود مضمن"
        @click="editor.chain().focus().toggleCode().run()"
      >
        <UIcon name="i-lucide-code" class="w-4 h-4" />
      </button>

      <span class="w-px h-4 bg-slate-300 dark:bg-slate-700 mx-1" />

      <!-- Lists & Quotes -->
      <button
        type="button"
        :class="[
          'p-1.5 rounded transition-colors cursor-pointer',
          editor.isActive('bulletList')
            ? 'bg-primary-100 text-primary-700 dark:bg-primary-950 dark:text-primary-300'
            : 'hover:bg-slate-200 dark:hover:bg-slate-700'
        ]"
        title="قائمة نقطية"
        @click="editor.chain().focus().toggleBulletList().run()"
      >
        <UIcon name="i-lucide-list" class="w-4 h-4" />
      </button>

      <button
        type="button"
        :class="[
          'p-1.5 rounded transition-colors cursor-pointer',
          editor.isActive('orderedList')
            ? 'bg-primary-100 text-primary-700 dark:bg-primary-950 dark:text-primary-300'
            : 'hover:bg-slate-200 dark:hover:bg-slate-700'
        ]"
        title="قائمة رقمية"
        @click="editor.chain().focus().toggleOrderedList().run()"
      >
        <UIcon name="i-lucide-list-ordered" class="w-4 h-4" />
      </button>

      <button
        type="button"
        :class="[
          'p-1.5 rounded transition-colors cursor-pointer',
          editor.isActive('blockquote')
            ? 'bg-primary-100 text-primary-700 dark:bg-primary-950 dark:text-primary-300'
            : 'hover:bg-slate-200 dark:hover:bg-slate-700'
        ]"
        title="اقتباس"
        @click="editor.chain().focus().toggleBlockquote().run()"
      >
        <UIcon name="i-lucide-quote" class="w-4 h-4" />
      </button>

      <button
        type="button"
        :class="[
          'p-1.5 rounded transition-colors cursor-pointer',
          editor.isActive('codeBlock')
            ? 'bg-primary-100 text-primary-700 dark:bg-primary-950 dark:text-primary-300'
            : 'hover:bg-slate-200 dark:hover:bg-slate-700'
        ]"
        title="كتلة كود برمجية"
        @click="editor.chain().focus().toggleCodeBlock().run()"
      >
        <UIcon name="i-lucide-file-code" class="w-4 h-4" />
      </button>

      <button
        type="button"
        class="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
        title="خط فاصل"
        @click="editor.chain().focus().setHorizontalRule().run()"
      >
        <UIcon name="i-lucide-minus" class="w-4 h-4" />
      </button>

      <span class="w-px h-4 bg-slate-300 dark:bg-slate-700 mx-1" />

      <!-- Undo / Redo -->
      <button
        type="button"
        :disabled="!editor.can().undo()"
        class="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 transition-colors cursor-pointer"
        title="تراجع"
        @click="editor.chain().focus().undo().run()"
      >
        <UIcon name="i-lucide-undo" class="w-4 h-4" />
      </button>

      <button
        type="button"
        :disabled="!editor.can().redo()"
        class="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 transition-colors cursor-pointer"
        title="إعادة"
        @click="editor.chain().focus().redo().run()"
      >
        <UIcon name="i-lucide-redo" class="w-4 h-4" />
      </button>

      <button
        type="button"
        class="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer text-xs font-bold ms-auto"
        title="مسح التنسيق"
        @click="editor.chain().focus().clearNodes().unsetAllMarks().run()"
      >
        <UIcon name="i-lucide-remove-formatting" class="w-4 h-4" />
      </button>
    </div>

    <!-- Content Area -->
    <div :style="{ minHeight: minHeight }">
      <EditorContent :editor="editor" class="tiptap-content" />
    </div>
  </div>
</template>

<style>
.tiptap-content .ProseMirror {
  outline: none;
  min-height: 180px;
  direction: rtl;
  text-align: right;
}

.tiptap-content .ProseMirror p.is-editor-empty:first-child::before {
  color: #94a3b8;
  content: attr(data-placeholder);
  float: right;
  height: 0;
  pointer-events: none;
}

.tiptap-content .ProseMirror h1 {
  font-size: 1.5rem;
  font-weight: 800;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

.tiptap-content .ProseMirror h2 {
  font-size: 1.25rem;
  font-weight: 700;
  margin-top: 0.75rem;
  margin-bottom: 0.5rem;
}

.tiptap-content .ProseMirror h3 {
  font-size: 1.1rem;
  font-weight: 700;
  margin-top: 0.5rem;
  margin-bottom: 0.25rem;
}

.tiptap-content .ProseMirror ul {
  list-style-type: disc;
  padding-right: 1.5rem;
  margin: 0.5rem 0;
}

.tiptap-content .ProseMirror ol {
  list-style-type: decimal;
  padding-right: 1.5rem;
  margin: 0.5rem 0;
}

.tiptap-content .ProseMirror blockquote {
  border-right: 4px solid #3b82f6;
  padding-right: 1rem;
  margin: 0.75rem 0;
  font-style: italic;
  color: #64748b;
}

.tiptap-content .ProseMirror pre {
  background: #0f172a;
  color: #f8fafc;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-family: monospace;
  direction: ltr;
  text-align: left;
  margin: 0.75rem 0;
}

.tiptap-content .ProseMirror code {
  background: #f1f5f9;
  color: #0f172a;
  padding: 0.15rem 0.35rem;
  border-radius: 0.25rem;
  font-size: 0.875em;
  font-family: monospace;
}

.dark .tiptap-content .ProseMirror code {
  background: #1e293b;
  color: #f1f5f9;
}
</style>
