<template>
  <div class="relative">
    <bubble-menu class="bubble-menu" :tippy-options="{ duration: 100 }" :editor="editor" v-if="editor">
      <button
        @click="
          editor
            .chain()
            .focus()
            .toggleBold()
            .run()
        "
        :class="{ 'is-active': editor.isActive('bold') }"
      >
        Bold
      </button>
      <button
        @click="
          editor
            .chain()
            .focus()
            .toggleItalic()
            .run()
        "
        :class="{ 'is-active': editor.isActive('italic') }"
      >
        Italic
      </button>
      <button
        @click="
          editor
            .chain()
            .focus()
            .toggleStrike()
            .run()
        "
        :class="{ 'is-active': editor.isActive('strike') }"
      >
        Strike
      </button>
    </bubble-menu>

    <floating-menu class="floating-menu" :tippy-options="{ duration: 100 }" :editor="editor" v-if="editor">
      <button
        @click="
          editor
            .chain()
            .focus()
            .toggleHeading({ level: 1 })
            .run()
        "
        :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
      >
        H1
      </button>
      <button
        @click="
          editor
            .chain()
            .focus()
            .toggleHeading({ level: 2 })
            .run()
        "
        :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
      >
        H2
      </button>
      <button
        @click="
          editor
            .chain()
            .focus()
            .toggleBulletList()
            .run()
        "
        :class="{ 'is-active': editor.isActive('bulletList') }"
      >
        Bullet List
      </button>
    </floating-menu>

    <div id="toolbar" v-if="toolBar" class="flex flex-col absolute bottom-6 -right-48 z-50 bg-white rounded shadow py-4 px-2">
      <button
        @click="
          editor
            .chain()
            .focus()
            .toggleHeading({ level: 1 })
            .run()
        "
        :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
      >
        <div>
          <font-awesome-icon icon="heading" />
          <span class="px-2">
            <span class="opacity-50">#</span>
            Heading 1
          </span>
        </div>
        <span class="opacity-50 pl-2">{{ powerKey + optionKey }}1</span>
      </button>
      <button
        @click="
          editor
            .chain()
            .focus()
            .toggleHeading({ level: 2 })
            .run()
        "
        :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
      >
        <div>
          <font-awesome-icon icon="heading" />
          <span class="px-2">
            <span class="opacity-50">#</span>
            Heading 2
          </span>
        </div>
        <span class="opacity-50 pl-2">{{ powerKey + optionKey }}2</span>
      </button>
      <button
        @click="
          editor
            .chain()
            .focus()
            .toggleHeading({ level: 3 })
            .run()
        "
        :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
      >
        <div>
          <font-awesome-icon icon="heading" />
          <span class="px-2">
            <span class="opacity-50">#</span>
            Heading 3
          </span>
        </div>
        <span class="opacity-50 pl-2">{{ powerKey + optionKey }}3</span>
      </button>
      <button
        @click="
          editor
            .chain()
            .focus()
            .setHorizontalRule()
            .run()
        "
      >
        <div>
          <font-awesome-icon icon="grip-lines" />
          <span class="px-2"> <span class="opacity-50">--- </span>Separator</span>
        </div>
        <span></span>
      </button>
      <hr class="border-b border-gray-500" />
      <button
        @click="
          editor
            .chain()
            .focus()
            .toggleBold()
            .run()
        "
        :class="{ 'is-active': editor.isActive('bold') }"
      >
        <div>
          <font-awesome-icon icon="bold" />
          <span class="px-2"> <span class="opacity-50">**</span>Bold<span class="opacity-50">**</span> </span>
        </div>
        <span class="opacity-50 pl-2">{{ powerKey }}B</span>
      </button>
      <button
        @click="
          editor
            .chain()
            .focus()
            .toggleItalic()
            .run()
        "
        :class="{ 'is-active': editor.isActive('italic') }"
      >
        <div>
          <font-awesome-icon icon="italic" />
          <span class="px-2"> <span class="opacity-50">*</span>Italic<span class="opacity-50">*</span> </span>
        </div>
        <span class="opacity-50 pl-2">{{ powerKey }}I</span>
      </button>
      <button
        @click="
          editor
            .chain()
            .focus()
            .toggleStrike()
            .run()
        "
        :class="{ 'is-active': editor.isActive('strike') }"
      >
        <div>
          <font-awesome-icon icon="strikethrough" />
          <span class="px-2"> <span class="opacity-50">~~</span>Strike<span class="opacity-50">~~</span> </span>
        </div>
        <span class="opacity-50 pl-2">{{ powerKey }}⇧X</span>
      </button>
      <button
        @click="
          editor
            .chain()
            .focus()
            .toggleCode()
            .run()
        "
        :class="{ 'is-active': editor.isActive('code') }"
      >
        <div>
          <font-awesome-icon icon="code" />
          <span class="px-2"> <span class="opacity-50">`</span>Code<span class="opacity-50">`</span> </span>
        </div>
        <span class="opacity-50 pl-2">{{ powerKey }}E</span>
      </button>
      <button
        @click="
          editor
            .chain()
            .focus()
            .toggleCodeBlock()
            .run()
        "
        :class="{ 'is-active': editor.isActive('codeBlock') }"
      >
        <div>
          <font-awesome-icon icon="file-code" />
          <span class="px-2"> <span class="opacity-50">```</span>CodeBlock</span>
        </div>
        <span class="opacity-50 pl-2">{{ powerKey + optionKey }}C</span>
      </button>
      <hr class="border-b border-gray-500 m-0" />
      <button
        @click="
          editor
            .chain()
            .focus()
            .toggleBulletList()
            .run()
        "
        :class="{ 'is-active': editor.isActive('bulletList') }"
      >
        <div>
          <font-awesome-icon icon="list-ul" />
          <span class="px-2"> <span class="opacity-50">* </span>List</span>
        </div>
        <span class="opacity-50 pl-2">{{ powerKey }}⇧8</span>
      </button>
      <button
        @click="
          editor
            .chain()
            .focus()
            .toggleOrderedList()
            .run()
        "
        :class="{ 'is-active': editor.isActive('orderedList') }"
      >
        <div>
          <font-awesome-icon icon="list-ol" />
          <span class="px-2"> <span class="opacity-50">1. </span>Ordered List</span>
        </div>
        <span class="opacity-50 pl-2">{{ powerKey }}⇧ 7</span>
      </button>
      <button
        @click="
          editor
            .chain()
            .focus()
            .toggleBlockquote()
            .run()
        "
        :class="{ 'is-active': editor.isActive('blockquote') }"
      >
        <div>
          <font-awesome-icon icon="quote-left" />
          <span class="px-2"> <span class="opacity-50">> </span>BlockQuote</span>
        </div>
        <span class="opacity-50 pl-2">{{ powerKey }}⇧B</span>
      </button>
    </div>

    <editor-content :editor="editor" class="dark:text-white" />
  </div>
</template>

<script>
import { Editor, EditorContent, BubbleMenu, FloatingMenu } from "@tiptap/vue-2";
import StarterKit from "@tiptap/starter-kit";
import Typography from "@tiptap/extension-typography";
import Highlight from "@tiptap/extension-highlight";

// Font Awesome
import {
  faBold,
  faItalic,
  faStrikethrough,
  faCode,
  faHeading,
  faListUl,
  faListOl,
  faFileCode,
  faQuoteLeft,
  faGripLines,
  faUnderline,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(faBold, faItalic, faStrikethrough, faCode, faHeading, faListUl, faListOl, faFileCode, faQuoteLeft, faGripLines, faUnderline);

export default {
  components: {
    EditorContent,
    BubbleMenu,
    FloatingMenu,
    FontAwesomeIcon,
  },
  props: {
    toolBar: Boolean,
    value: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      editor: null,
    };
  },
  computed: {
    powerKey: function() {
      let powerKey;
      if (navigator.appVersion.indexOf("Mac") != -1) {
        powerKey = "⌘";
      } else {
        powerKey = "ctrl";
      }
      return powerKey;
    },
    optionKey: function() {
      let optionKey;
      if (navigator.appVersion.indexOf("Mac") != -1) {
        optionKey = "⌥";
      } else {
        optionKey = "alt";
      }
      return optionKey;
    },
  },
  watch: {
    value(value) {
      // HTML
      const isSame = this.editor.getHTML() === value;
      // JSON
      // const isSame = this.editor.getJSON().toString() === value.toString();
      if (isSame) {
        return;
      }
      this.editor.commands.setContent(this.value, false);
    },
  },
  mounted() {
    this.editor = new Editor({
      extensions: [StarterKit, Typography, Highlight],
      content: this.value,
      onUpdate: () => {
        // HTML
        this.$emit("input", this.editor.getHTML());

        // JSON
        // this.$emit("input", this.editor.getJSON());
      },
    });
  },
  beforeDestroy() {
    this.editor.destroy();
  },
};
</script>

<style>
.ProseMirror,
.ProseMirror-focused {
  outline-color: transparent;
  border-color: none !important;
  height: 88vh;
  max-height: 88vh;
  overflow: scroll;
  caret-color: #ff5c5c;
  overflow-y: scroll;
  overflow-x: hidden;
}

#toolbar button {
  display: flex;
  justify-content: space-between;
  padding: 2px 8px;
  border-radius: 2px;
}

#toolbar .svg-inline--fa {
  width: 2em !important;
  margin-left: -0.5em;
}

#toolbar button:hover {
  background-color: rgba(156, 163, 175, 0.2);
}

#toolbar hr {
  margin: 24px 0 !important;
}

#toolbar button.is-active {
  border-left: 1px solid #ff5c5c;
  border-radius: 0px 2px 2px 0px;
}
</style>
