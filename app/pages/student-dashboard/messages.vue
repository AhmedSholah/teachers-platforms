<script setup lang="ts">
useHead({
  title: 'الرسائل - لوحة الطالب'
})

interface Message {
  id: string
  sender: 'me' | 'them'
  text: string
  time: string
}

interface Conversation {
  id: string
  name: string
  role: string
  avatarText: string
  avatarBg: string
  status: string
  online: boolean
  lastMessage: string
  time: string
  unreadCount: number
  messages: Message[]
}

const searchQuery = ref('')
const activeConversationId = ref('ahmed')
const newMessage = ref('')
const showMobileThread = ref(false)
const messagesContainer = ref<HTMLElement | null>(null)

const conversations = ref<Conversation[]>([
  {
    id: 'ahmed',
    name: 'الأستاذ أحمد محمد',
    role: 'معلم الرياضيات',
    avatarText: 'أ',
    avatarBg: 'bg-amber-100 text-amber-900 border-amber-200',
    status: 'متصل الآن',
    online: true,
    lastMessage: 'سأرسل لك مثالاً مبسطاً',
    time: '10:30',
    unreadCount: 0,
    messages: [
      {
        id: '1',
        sender: 'them',
        text: 'أهلاً سارة، هل واجهتِ صعوبة في الدرس 8؟',
        time: '10:15 ص'
      },
      {
        id: '2',
        sender: 'me',
        text: 'أهلاً أستاذ أحمد، لم أفهم خطوة نقل الحدود في المعادلة.',
        time: '10:18 ص'
      },
      {
        id: '3',
        sender: 'them',
        text: 'لا مشكلة، سأرسل لك مثالاً مبسطاً مع شرح بالفيديو.',
        time: '10:25 ص'
      },
      {
        id: '4',
        sender: 'me',
        text: 'شكراً جزيلاً، سأنتظره.',
        time: '10:30 ص'
      }
    ]
  },
  {
    id: 'support',
    name: 'دعم المنصة',
    role: 'فريق الدعم الفني',
    avatarText: 'د',
    avatarBg: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    status: 'غير متصل',
    online: false,
    lastMessage: 'مرحباً بك في المنصة',
    time: 'أمس',
    unreadCount: 0,
    messages: [
      {
        id: 's1',
        sender: 'them',
        text: 'مرحباً بكِ في المنصة! إذا كان لديكِ أي استفسار أو مشكلة في حسابك أو دوراتك، فريق الدعم هنا للمساعدة في أي وقت.',
        time: 'أمس 02:00 م'
      },
      {
        id: 's2',
        sender: 'them',
        text: 'مرحباً بك في المنصة',
        time: 'أمس 02:05 م'
      }
    ]
  },
  {
    id: 'algebra-group',
    name: 'مجموعة أساسيات الجبر',
    role: 'المجموعة الدراسية',
    avatarText: 'م',
    avatarBg: 'bg-blue-100 text-blue-700 border-blue-200',
    status: 'نشط مؤخراً',
    online: false,
    lastMessage: 'جلسة السبت الساعة 8',
    time: 'الخميس',
    unreadCount: 0,
    messages: [
      {
        id: 'g1',
        sender: 'them',
        text: 'تذكير للجميع: سنناقش مسائل الوحدة الثانية في موعدنا القادم.',
        time: 'الخميس 07:45 م'
      },
      {
        id: 'g2',
        sender: 'them',
        text: 'جلسة السبت الساعة 8',
        time: 'الخميس 08:00 م'
      }
    ]
  }
])

const filteredConversations = computed(() => {
  if (!searchQuery.value.trim()) {
    return conversations.value
  }
  const query = searchQuery.value.toLowerCase().trim()
  return conversations.value.filter(
    c => c.name.toLowerCase().includes(query) || c.lastMessage.toLowerCase().includes(query)
  )
})

const activeConversation = computed(() => {
  return conversations.value.find(c => c.id === activeConversationId.value) || conversations.value[0]
})

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

const selectConversation = (id: string) => {
  activeConversationId.value = id
  showMobileThread.value = true
  const conv = conversations.value.find(c => c.id === id)
  if (conv) {
    conv.unreadCount = 0
  }
  scrollToBottom()
}

const sendMessage = () => {
  const text = newMessage.value.trim()
  if (!text || !activeConversation.value) return

  const now = new Date()
  const timeFormatted = now.toLocaleTimeString('ar-EG', {
    hour: '2-digit',
    minute: '2-digit'
  })

  activeConversation.value.messages.push({
    id: String(Date.now()),
    sender: 'me',
    text,
    time: timeFormatted
  })

  activeConversation.value.lastMessage = text
  activeConversation.value.time = 'الآن'
  newMessage.value = ''

  scrollToBottom()
}

onMounted(() => {
  scrollToBottom()
})
</script>

<template>
  <div class="flex flex-col gap-6 w-full">
    <!-- Header -->
    <div class="flex flex-col gap-1.5">
      <h1 class="m-0 text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
        الرسائل
      </h1>
      <span class="text-sm sm:text-base text-slate-500">
        تواصل مع معلميك وفريق الدعم.
      </span>
    </div>

    <!-- Main Chat Card -->
    <UCard
      class="rounded-2xl border border-slate-200 shadow-sm bg-white overflow-hidden"
      :ui="{ body: 'p-0 sm:p-0' }"
    >
      <div class="flex flex-col md:flex-row h-[620px] min-h-[540px]">
        <!-- Conversations Sidebar List -->
        <aside
          class="w-full md:w-80 lg:w-96 border-b md:border-b-0 md:border-e border-slate-200 flex flex-col shrink-0 bg-white"
          :class="{ 'hidden md:flex': showMobileThread, 'flex': !showMobileThread }"
        >
          <!-- Search Header -->
          <div class="p-4 border-b border-slate-100 flex flex-col gap-3">
            <div class="flex items-center justify-between">
              <h2 class="m-0 text-base font-extrabold text-slate-900">
                المحادثات
              </h2>
              <UBadge color="primary" variant="subtle" size="sm" class="font-bold">
                {{ filteredConversations.length }}
              </UBadge>
            </div>
            <UInput
              v-model="searchQuery"
              icon="i-lucide-search"
              placeholder="بحث في المحادثات..."
              size="sm"
              class="w-full"
            />
          </div>

          <!-- Conversations Scrollable Area -->
          <div class="flex-1 overflow-y-auto divide-y divide-slate-100 p-2 space-y-1">
            <UButton
              v-for="conv in filteredConversations"
              :key="conv.id"
              variant="ghost"
              color="neutral"
              class="w-full justify-start p-3 rounded-xl transition-all text-start"
              :class="[
                activeConversationId === conv.id
                  ? 'bg-blue-50/80 hover:bg-blue-50 text-blue-900 shadow-xs'
                  : 'hover:bg-slate-50 text-slate-700'
              ]"
              @click="selectConversation(conv.id)"
            >
              <div class="flex items-center gap-3 w-full">
                <!-- Avatar with status indicator -->
                <div class="relative shrink-0">
                  <UAvatar
                    :text="conv.avatarText"
                    size="md"
                    class="font-extrabold shrink-0 border border-slate-200/60"
                    :class="conv.avatarBg"
                  />
                  <span
                    v-if="conv.online"
                    class="absolute bottom-0 end-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white"
                  />
                </div>

                <!-- Info -->
                <div class="flex-1 min-w-0 flex flex-col gap-0.5">
                  <div class="flex items-center justify-between gap-2">
                    <span
                      class="text-sm font-bold truncate"
                      :class="activeConversationId === conv.id ? 'text-blue-950 font-extrabold' : 'text-slate-900'"
                    >
                      {{ conv.name }}
                    </span>
                    <span class="text-xs text-slate-400 shrink-0 font-medium">
                      {{ conv.time }}
                    </span>
                  </div>
                  <div class="flex items-center justify-between gap-2">
                    <span class="text-xs text-slate-500 truncate">
                      {{ conv.lastMessage }}
                    </span>
                    <UBadge
                      v-if="conv.unreadCount > 0"
                      color="primary"
                      variant="solid"
                      size="xs"
                      class="rounded-full px-1.5"
                    >
                      {{ conv.unreadCount }}
                    </UBadge>
                  </div>
                </div>
              </div>
            </UButton>

            <div
              v-if="filteredConversations.length === 0"
              class="p-6 text-center text-sm text-slate-400"
            >
              لا توجد محادثات تطابق بحثك
            </div>
          </div>
        </aside>

        <!-- Active Conversation Chat Thread -->
        <section
          v-if="activeConversation"
          class="flex-1 flex flex-col min-w-0 bg-slate-50/30"
          :class="{ 'flex': showMobileThread, 'hidden md:flex': !showMobileThread }"
        >
          <!-- Chat Header -->
          <div class="px-4 py-3.5 border-b border-slate-200 bg-white flex items-center justify-between gap-3 shrink-0">
            <div class="flex items-center gap-3 min-w-0">
              <!-- Mobile Back Button -->
              <UButton
                class="md:hidden shrink-0"
                variant="ghost"
                color="neutral"
                size="sm"
                icon="i-lucide-arrow-right"
                aria-label="الرجوع إلى المحادثات"
                @click="showMobileThread = false"
              />

              <div class="relative shrink-0">
                <UAvatar
                  :text="activeConversation.avatarText"
                  size="md"
                  class="font-extrabold shrink-0 border border-slate-200/60"
                  :class="activeConversation.avatarBg"
                />
                <span
                  v-if="activeConversation.online"
                  class="absolute bottom-0 end-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white"
                />
              </div>

              <div class="flex flex-col min-w-0">
                <span class="text-sm sm:text-base font-extrabold text-slate-900 truncate">
                  {{ activeConversation.name }}
                </span>
                <div class="flex items-center gap-2">
                  <UBadge
                    v-if="activeConversation.online"
                    color="success"
                    variant="subtle"
                    size="xs"
                    class="font-semibold"
                  >
                    متصل الآن
                  </UBadge>
                  <span
                    v-else
                    class="text-xs text-slate-400 font-medium"
                  >
                    {{ activeConversation.status }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Header Actions -->
            <div class="flex items-center gap-1 shrink-0">
              <UButton
                variant="ghost"
                color="neutral"
                icon="i-lucide-phone"
                size="sm"
                aria-label="اتصال صوتي"
              />
              <UButton
                variant="ghost"
                color="neutral"
                icon="i-lucide-video"
                size="sm"
                aria-label="مكالمة فيديو"
              />
              <UButton
                variant="ghost"
                color="neutral"
                icon="i-lucide-more-vertical"
                size="sm"
                aria-label="المزيد من الخيارات"
              />
            </div>
          </div>

          <!-- Message Thread Messages Area -->
          <div
            ref="messagesContainer"
            class="flex-1 p-4 sm:p-6 overflow-y-auto flex flex-col gap-3.5 bg-slate-50/60"
          >
            <!-- Conversation Date Divider -->
            <div class="flex items-center justify-center my-1">
              <span class="text-xs text-slate-400 bg-white/80 border border-slate-200/80 px-3 py-1 rounded-full shadow-2xs font-medium">
                اليوم
              </span>
            </div>

            <!-- Message Bubbles -->
            <div
              v-for="msg in activeConversation.messages"
              :key="msg.id"
              class="flex flex-col max-w-[82%] sm:max-w-[70%]"
              :class="msg.sender === 'me' ? 'self-end items-end' : 'self-start items-start'"
            >
              <div
                class="px-4 py-2.5 text-sm sm:text-[15px] leading-relaxed break-words shadow-2xs"
                :class="[
                  msg.sender === 'me'
                    ? 'bg-blue-600 text-white rounded-2xl rounded-ee-xs'
                    : 'bg-white text-slate-800 border border-slate-200/70 rounded-2xl rounded-es-xs'
                ]"
              >
                {{ msg.text }}
              </div>
              <div
                class="flex items-center gap-1 mt-1 px-1 text-xs"
                :class="msg.sender === 'me' ? 'text-slate-400 justify-end' : 'text-slate-400 justify-start'"
              >
                <span>{{ msg.time }}</span>
                <UIcon
                  v-if="msg.sender === 'me'"
                  name="i-lucide-check-check"
                  class="w-3.5 h-3.5 text-blue-600"
                />
              </div>
            </div>
          </div>

          <!-- Message Input Bar -->
          <div class="p-3 sm:p-4 bg-white border-t border-slate-200 flex items-center gap-2 sm:gap-3 shrink-0">
            <UButton
              variant="ghost"
              color="neutral"
              icon="i-lucide-paperclip"
              size="lg"
              class="shrink-0"
              aria-label="إرفاق ملف"
            />
            <UInput
              v-model="newMessage"
              type="text"
              aria-label="اكتب رسالتك"
              placeholder="اكتب رسالتك هنا..."
              size="lg"
              class="flex-1"
              @keydown.enter.prevent="sendMessage"
            />
            <UButton
              color="primary"
              size="lg"
              icon="i-lucide-send"
              class="font-extrabold px-4 sm:px-6 shrink-0 cursor-pointer"
              :disabled="!newMessage.trim()"
              @click="sendMessage"
            >
              إرسال
            </UButton>
          </div>
        </section>
      </div>
    </UCard>
  </div>
</template>
