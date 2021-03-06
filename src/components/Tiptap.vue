<template>
  <div class="relative">
    <bubble-menu
      class="bubble-menu flex flex-col bottom-full bg-white dark:bg-gray-700 rounded shadow py-4 px-2"
      :tippy-options="{ duration: 150, placement: 'bottom-start' }"
      :editor="editor"
      v-if="editor && settings.selectMenu"
    >
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
        <span class="opacity-50 pl-2">{{ powerKey }}⇧ X</span>
      </button>
      <button
        @click="
          editor
            .chain()
            .focus()
            .toggleHighlight()
            .run()
        "
        :class="{ 'is-active': editor.isActive('highlight') }"
      >
        <div>
          <font-awesome-icon icon="highlighter" />
          <span class="px-2"> <span class="opacity-50">==</span>Highlight<span class="opacity-50">==</span> </span>
        </div>
        <span class="opacity-50 pl-2">{{ powerKey }}⇧ H</span>
      </button>
      <button @click="setLink" :class="{ 'is-active': editor.isActive('link') }">
        <div>
          <font-awesome-icon icon="link" />
          <span class="px-2"> <span class="opacity-50 text-sm">url </span>Link</span>
        </div>
        <span class="opacity-50 pl-2"></span>
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
            .toggleBulletList()
            .run()
        "
        :class="{ 'is-active': editor.isActive('bulletList') }"
      >
        <div>
          <font-awesome-icon icon="list-ul" />
          <span class="px-2"> <span class="opacity-50">* </span>List</span>
        </div>
        <span class="opacity-50 pl-2">{{ powerKey }}⇧ 8</span>
      </button>

      <button
        @click="
          editor
            .chain()
            .focus()
            .setTextAlign('left')
            .run()
        "
        :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }"
      >
        <div>
          <font-awesome-icon icon="align-left" />
          <span class="px-2"> <span class="opacity-50"></span>Left<span class="opacity-50"></span> </span>
        </div>
        <span class="opacity-50 pl-2">{{ powerKey }}⇧ L</span>
      </button>
      <button
        @click="
          editor
            .chain()
            .focus()
            .setTextAlign('center')
            .run()
        "
        :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }"
      >
        <div>
          <font-awesome-icon icon="align-center" />
          <span class="px-2"> <span class="opacity-50"></span>Center<span class="opacity-50"></span> </span>
        </div>
        <span class="opacity-50 pl-2">{{ powerKey }}⇧ E</span>
      </button>
      <button
        @click="
          editor
            .chain()
            .focus()
            .setTextAlign('right')
            .run()
        "
        :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }"
      >
        <div>
          <font-awesome-icon icon="align-right" />
          <span class="px-2"> <span class="opacity-50"></span>Right<span class="opacity-50"></span> </span>
        </div>
        <span class="opacity-50 pl-2">{{ powerKey }}⇧ R</span>
      </button>
      <button
        @click="
          editor
            .chain()
            .focus()
            .setTextAlign('justify')
            .run()
        "
        :class="{ 'is-active': editor.isActive({ textAlign: 'justify' }) }"
      >
        <div>
          <font-awesome-icon icon="align-justify" />
          <span class="px-2"> <span class="opacity-50"></span>Justify<span class="opacity-50"></span> </span>
        </div>
        <span class="opacity-50 pl-2">{{ powerKey }}⇧ J</span>
      </button>
    </bubble-menu>

    <transition name="fade">
      <div id="toolbar" v-if="toolBar" class="flex flex-col absolute bottom-6 z-50 bg-white dark:bg-gray-700 rounded shadow py-4 px-2">
        <div class="triangle-wrapper w-16 overflow-hidden inline-block absolute -bottom-6 ">
          <div class="triangle h-6 w-6 bg-white dark:bg-gray-700 shadow -rotate-45 transform origin-top-left"></div>
        </div>
        <div class="triangle-wrapper w-16 overflow-hidden inline-block absolute ">
          <div class="triangle h-6 w-6 bg-white dark:bg-gray-700 -rotate-45 transform origin-top-left"></div>
        </div>
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
              <span class="opacity-50">##</span>
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
              <span class="opacity-50">###</span>
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
              .toggleUnderline()
              .run()
          "
          :class="{ 'is-active': editor.isActive('underline') }"
        >
          <div>
            <font-awesome-icon icon="underline" />
            <span class="px-2"> <span class="opacity-50">~</span>Underline<span class="opacity-50">~</span> </span>
          </div>
          <span class="opacity-50 pl-2">{{ powerKey }}U</span>
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
          <span class="opacity-50 pl-2">{{ powerKey }}⇧ X</span>
        </button>
        <button
          @click="
            editor
              .chain()
              .focus()
              .toggleHighlight({
                color: '',
              })
              .run()
          "
          :class="{
            'is-active': editor.isActive('highlight', {
              color: '',
            }),
          }"
        >
          <div>
            <font-awesome-icon icon="highlighter" />
            <span class="px-2"> <span class="opacity-50">==</span>Highlight<span class="opacity-50">==</span> </span>
          </div>
          <span class="opacity-50 pl-2">{{ powerKey }}⇧ H</span>
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
              .toggleBulletList()
              .run()
          "
          :class="{ 'is-active': editor.isActive('bulletList') }"
        >
          <div>
            <font-awesome-icon icon="list-ul" />
            <span class="px-2"> <span class="opacity-50">* </span>List</span>
          </div>
          <span class="opacity-50 pl-2">{{ powerKey }}⇧ 8</span>
        </button>
        <button
          @click="
            editor
              .chain()
              .focus()
              .toggleTaskList()
              .run()
          "
        >
          <div>
            <font-awesome-icon icon="check-square" />
            <span class="px-2"> <span class="opacity-50">[ ] </span>To do</span>
          </div>
          <span class="opacity-50 pl-2">{{ powerKey }}⇧ 9</span>
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
          <span class="opacity-50 pl-2">{{ powerKey }}⇧ B</span>
        </button>

        <hr class="border-b border-gray-500 m-0" />
        <button @click="addImage">
          <div>
            <font-awesome-icon icon="image" />
            <span class="px-2"> <span class="opacity-50 text-sm">url </span>Image</span>
          </div>
          <span class="opacity-50 pl-2"></span>
        </button>
        <button @click="setLink" :class="{ 'is-active': editor.isActive('link') }">
          <div>
            <font-awesome-icon icon="link" />
            <span class="px-2"> <span class="opacity-50 text-sm">url </span>Link</span>
          </div>
          <span class="opacity-50 pl-2"></span>
        </button>
        <button
          @click="
            editor
              .chain()
              .focus()
              .unsetLink()
              .run()
          "
          v-if="editor.isActive('link')"
        >
          <div>
            <font-awesome-icon icon="unlink" />
            <span class="px-2"> <span class="opacity-50 text-sm">url </span>Remove Link</span>
          </div>
          <span class="opacity-50 pl-2"></span>
        </button>
      </div>
    </transition>

    <editor-content :editor="editor" class="dark:text-white transition" />
  </div>
</template>

<script>
import { Editor, EditorContent, BubbleMenu, VueRenderer } from "@tiptap/vue-2";
import { markInputRule } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Typography from "@tiptap/extension-typography";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import tippy from "tippy.js";
import Commands from "./commands";
import CommandsList from "./CommandsList";
const commandsListArray = require("./CommandsListArray.js");

import Underline from "@tiptap/extension-underline";
const CustomUnderline = Underline.extend({
  addInputRules() {
    return [markInputRule(/(?:^|\s)((?:~)((?:[^~]+))(?:~))$/gm, this.type)];
  },
});

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
  faImage,
  faCheckSquare,
  faLink,
  faUnlink,
  faHighlighter,
  faAlignLeft,
  faAlignCenter,
  faAlignRight,
  faAlignJustify,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(
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
  faImage,
  faCheckSquare,
  faLink,
  faUnlink,
  faHighlighter,
  faAlignLeft,
  faAlignCenter,
  faAlignRight,
  faAlignJustify
);

export default {
  components: {
    EditorContent,
    BubbleMenu,
    FontAwesomeIcon,
  },
  props: {
    settings: Object,
    toolBar: Boolean,
    currentId: Number,
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
  mounted() {
    this.createEditor();
  },
  computed: {
    powerKey: function() {
      let powerKey;
      if (navigator.appVersion.indexOf("Mac") != -1) {
        powerKey = "⌘ ";
      } else {
        powerKey = "Ctrl ";
      }
      return powerKey;
    },
    optionKey: function() {
      let optionKey;
      if (navigator.appVersion.indexOf("Mac") != -1) {
        optionKey = "⌥ ";
      } else {
        optionKey = "Alt ";
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
    // This resets the editor history. Might need to refactor if start to notice performance issues.
    currentId: function() {
      this.editor.destroy();
      this.createEditor();
    },
  },

  methods: {
    createEditor() {
      this.editor = new Editor({
        extensions: [
          StarterKit,
          Typography,
          Highlight,
          Image,
          TaskList,
          TaskItem,
          Link,
          CustomUnderline,
          TextAlign.configure({
            types: ["heading", "paragraph"],
          }),
          Commands.configure({
            suggestion: {
              items: (query) => {
                return commandsListArray.array.filter((item) => item.title.toLowerCase().startsWith(query.toLowerCase()));
              },
              render: () => {
                let component;
                let popup;
                return {
                  addImage() {
                    const url = window.prompt("URL");

                    if (url) {
                      this.editor
                        .chain()
                        .focus()
                        .setImage({ src: url })
                        .run();
                    }
                  },
                  onStart: (props) => {
                    component = new VueRenderer(CommandsList, {
                      parent: this,
                      propsData: props,
                    });
                    popup = tippy("body", {
                      getReferenceClientRect: props.clientRect,
                      appendTo: () => document.body,
                      content: component.element,
                      showOnCreate: true,
                      interactive: true,
                      trigger: "manual",
                      placement: "bottom-start",
                    });
                  },
                  onUpdate(props) {
                    component.updateProps(props);
                    popup[0].setProps({
                      getReferenceClientRect: props.clientRect,
                    });
                  },
                  onKeyDown(props) {
                    if (props.event.key === "Escape") {
                      popup[0].hide();
                      return true;
                    }
                    return component.ref?.onKeyDown(props);
                  },
                  onExit() {
                    popup[0].destroy();
                    component.destroy();
                  },
                };
              },
            },
          }),
        ],
        content: this.value,
        onUpdate: () => {
          // HTML
          this.$emit("input", this.editor.getHTML());

          // JSON
          // this.$emit("input", this.editor.getJSON());
        },
      });
    },
    focus: function() {
      this.editor.chain().focus();
    },
    addImage() {
      const url = window.prompt("URL");

      if (url) {
        this.editor
          .chain()
          .focus()
          .setImage({ src: url })
          .run();
      }
    },
    setLink() {
      const url = window.prompt("URL");
      this.editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    },
  },
  beforeDestroy() {
    this.editor.destroy();
  },
};
</script>

<style lang="scss">
::-webkit-scrollbar {
  width: 4px !important;
}

// ::-webkit-scrollbar-thumb {
//   background: rgb(107, 114, 128) !important;
//   opacity: 0.5;
// }

.ProseMirror,
.ProseMirror-focused {
  outline-color: transparent;
  height: 88vh;
  max-height: 88vh;
  overflow: scroll;
  caret-color: #ff5c5c;
  overflow-y: scroll;
  overflow-x: hidden;
  padding-right: 8px;

  * {
    text-decoration-color: #ff5c5c !important;
  }

  ul > li::before {
    background-color: #ff5c5c !important;
  }

  ol > li::before,
  a {
    color: #ff5c5c !important;
  }

  blockquote,
  hr {
    border-color: #ff5c5c !important;
  }
  p > code {
    background-color: rgba(97, 97, 97, 0.1);
    color: #616161 !important;
    font-weight: normal !important;
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
  }

  ul[data-type="taskList"] {
    list-style: none !important;
    padding: 0 !important;

    p {
      margin: 0 !important;
    }

    li {
      display: flex !important;
      align-items: center !important;

      > label {
        flex: 0 0 auto !important;
        margin-right: 0.5rem !important;
      }
    }

    li::before {
      display: none;
    }
  }
}

.dark .ProseMirror {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  strong,
  blockquote {
    color: white !important;
  }

  p > code {
    background-color: #666e78;
    color: white !important;
  }

  pre {
    background-color: #f5f6f7;
    color: #242d3a !important;
  }
}

.ProseMirror:focus {
  outline: none;
}

.triangle-wrapper {
  left: 10px !important;
}

.triangle-wrapper:nth-child(2) {
  bottom: -23px;
}

.triangle {
  border-radius: 0 0 0 0.125rem /* 2px */;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

#toolbar {
  width: 240px;
  right: -205px;
}

#toolbar,
.bubble-menu,
.commands-menu {
  button {
    display: flex;
    justify-content: space-between;
    padding: 2px 8px;
    border-radius: 2px;
  }

  .svg-inline--fa {
    width: 2em !important;
    margin-left: -0.5em;
  }

  button:hover {
    background-color: rgba(156, 163, 175, 0.2);
  }

  hr {
    margin: 8px 0 !important;
  }

  button.is-active {
    border-left: 1px solid #ff5c5c;
    border-radius: 0px 2px 2px 0px;
  }
}

.dark #toolbar,
.dark .bubble-menu,
.dark .commands-menu {
  .svg-inline--fa {
    color: white;
  }
}
</style>
