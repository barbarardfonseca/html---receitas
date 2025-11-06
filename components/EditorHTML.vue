<template>
  <div class="w-full -max-w-3xl mx-auto border rounded-lg shadow-sm bg-white">
    <!-- Toolbar -->
    <div
      v-if="editor"
      class="flex flex-wrap items-center gap-2 border-b bg-gray-50 px-3 py-2"
    >
      <!-- Texto -->
      <button
        v-for="btn in textButtons"
        :key="btn.name"
        :disabled="!btn.canRun"
        :class="[
          'p-2 rounded hover:bg-gray-200 transition',
          editor.isActive(btn.command, btn.options)
            ? 'bg-gray-300 text-gray-800'
            : 'text-gray-500',
        ]"
        :title="btn.label"
        @click="btn.action"
      >
        <component :is="btn.icon" class="w-5 h-5" />
      </button>

      <div class="w-px h-5 bg-gray-300 mx-2"/>

      <!-- Estrutura -->
      <button
        v-for="btn in structureButtons"
        :key="btn.name"
        :class="[
          'p-2 rounded hover:bg-gray-200 transition',
          editor.isActive(btn.command, btn.options)
            ? 'bg-gray-300 text-gray-800'
            : 'text-gray-500',
        ]"
        :title="btn.label"
        @click="btn.action"
      >
        <component :is="btn.icon" class="w-5 h-5" />
      </button>

      <div class="flex-1"/>

      <!-- Ações -->
      <button
        v-for="btn in historyButtons"
        :key="btn.name"
        :disabled="!btn.canRun"
        :class="[
          'p-2 rounded hover:bg-gray-200 transition disabled:opacity-30',
        ]"
        :title="btn.label"
        @click="btn.action"
      >
        <component :is="btn.icon" class="w-5 h-5" />
      </button>
    </div>

    <!-- Editor -->
    <TiptapEditorContent class="p-3 -min-h-[100px] prose max-w-none" :editor="editor" />
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, unref, computed, } from "vue";
import {
  BoldIcon,
  ItalicIcon,
  CodeBracketIcon,
  StrikethroughIcon,
  // Bars3BottomLeftIcon,
  ListBulletIcon,
  NumberedListIcon,
  ChatBubbleBottomCenterTextIcon,
  MinusSmallIcon,
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
} from "@heroicons/vue/24/outline";
import { useEditor, EditorContent as TiptapEditorContent, } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const editor = useEditor({
  content: props.modelValue,
  extensions: [StarterKit],
  onUpdate: ({ editor }) => {
    emit("update:modelValue", editor.getHTML());
  },
});

watch(() => props.modelValue, (value) => {
  const isSame = editor.value?.getHTML() === value;

  if (isSame) return;
  editor.value?.commands.setContent(value, false);
});

// Botões de texto
const textButtons = computed(() => [
  {
    name: "bold",
    label: "Negrito",
    icon: BoldIcon,
    command: "bold",
    canRun: editor.value?.can().chain().focus().toggleBold().run(),
    action: () => editor?.value?.chain().focus().toggleBold().run(),
  },
  {
    name: "italic",
    label: "Itálico",
    icon: ItalicIcon,
    command: "italic",
    canRun: editor.value?.can().chain().focus().toggleItalic().run(),
    action: () => editor?.value?.chain().focus().toggleItalic().run(),
  },
  {
    name: "strike",
    label: "Tachado",
    icon: StrikethroughIcon,
    command: "strike",
    canRun: editor.value?.can().chain().focus().toggleStrike().run(),
    action: () => editor?.value?.chain().focus().toggleStrike().run(),
  },
  {
    name: "code",
    label: "Código",
    icon: CodeBracketIcon,
    command: "code",
    canRun: editor.value?.can().chain().focus().toggleCode().run(),
    action: () => editor?.value?.chain().focus().toggleCode().run(),
  },
]);

// Estrutura
const structureButtons = computed(() => [
  {
    name: "bulletList",
    label: "Lista com marcadores",
    icon: ListBulletIcon,
    command: "bulletList",
    action: () => editor?.value?.chain().focus().toggleBulletList().run(),
  },
  {
    name: "orderedList",
    label: "Lista numerada",
    icon: NumberedListIcon,
    command: "orderedList",
    action: () => editor?.value?.chain().focus().toggleOrderedList().run(),
  },
  {
    name: "blockquote",
    label: "Citação",
    icon: ChatBubbleBottomCenterTextIcon,
    command: "blockquote",
    action: () => editor?.value?.chain().focus().toggleBlockquote().run(),
  },
  {
    name: "horizontalRule",
    label: "Linha horizontal",
    icon: MinusSmallIcon,
    command: "horizontalRule",
    action: () => editor?.value?.chain().focus().setHorizontalRule().run(),
  },
]);

// Histórico
const historyButtons = computed(() => [
  {
    name: "undo",
    label: "Desfazer",
    icon: ArrowUturnLeftIcon,
    canRun: editor.value?.can().chain().focus().undo().run(),
    action: () => editor?.value?.chain().focus().undo().run(),
  },
  {
    name: "redo",
    label: "Refazer",
    icon: ArrowUturnRightIcon,
    canRun: editor.value?.can().chain().focus().redo().run(),
    action: () => editor?.value?.chain().focus().redo().run(),
  },
]);

onBeforeUnmount(() => {
  unref(editor)?.destroy();
});
</script>
