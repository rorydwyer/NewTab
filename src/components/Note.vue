<template>
  <div class="pb-4 h-full flex flex-col">
    <vue-simplemde class="flex-grow" ref="markdownEditor" v-model="note.content" :configs="configs" v-bind:class="spellChecker" />
    <div class="text-right">
      <button class="text-sm underline pr-5" v-on:click="formatNote()">Format</button>
      <button class="text-sm underline hover:text-red-600" v-if="this.notes.collection.length > 1" v-on:click="deleteNote()">Delete</button>
    </div>
  </div>
</template>

<script>
import VueSimplemde from "vue-simplemde";

export default {
  name: "note",
  components: {
    VueSimplemde,
  },
  props: {
    notes: Object,
    settings: Object,
  },
  data() {
    return {
      timeout: null,
      configs: {
        status: false,
        spellChecker: true,
        // toolbar: [
        //   {
        //     name: "heading1",
        //     action: VueSimplemde.toggleHeading1,
        //     className: "fa fa-header fa-header-x fa-header-1",
        //     title: "#Heading 1",
        //   },
        // ],
        toolbar: [
          "heading-1",
          "heading-2",
          "heading-3",
          // "horizontal-rule",
          "|",
          "bold",
          "italic",
          "strikethrough",
          "|",
          "unordered-list",
          "ordered-list",
          "quote",
          "link",
          "code",
        ],
      },
    };
  },
  computed: {
    simplemde() {
      return this.$refs.markdownEditor.simplemde;
    },
    note: {
      get: function() {
        return this.notes.collection[this.currentNoteIndex()];
      },
    },
    spellChecker() {
      return this.settings.spellChecker ? "" : "disable-spell-error";
    },
  },
  mounted() {
    this.simplemde.codemirror.on("keyup", () => {
      this.autoSave();
    });

    // Styles for toolbar
    document.querySelector(".editor-toolbar").classList.add("hide-toolbar");
    document.querySelector(".main").style.opacity = "1";
  },
  methods: {
    loadNote: function() {
      this.simplemde.value(this.note.content);
      this.simplemde.codemirror.focus();
    },

    autoSave: function() {
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }
      this.timeout = setTimeout(() => {
        this.notes.collection[this.currentNoteIndex()].date = new Date().getTime();
        this.$emit("updateNotes", { notes: this.notes, load: false });
      }, 1500);
    },

    deleteNote: function() {
      if (this.notes.collection.length > 1) {
        let nextNote;

        if (this.notes.collection[this.currentNoteIndex() + 1]) {
          nextNote = this.notes.collection[this.currentNoteIndex() + 1].id;
        } else {
          nextNote = this.notes.collection[this.currentNoteIndex() - 1].id;
        }

        this.notes.collection.splice(this.currentNoteIndex(), 1);
        this.notes.currentId = nextNote;

        this.$emit("updateNotes", { notes: this.notes, load: true });
      }
    },

    currentNoteIndex: function() {
      let noteIndex;
      for (let i = 0; i < this.notes.collection.length; i += 1) {
        if (this.notes.collection[i]["id"] === this.notes.currentId) {
          noteIndex = i;
        }
      }
      return noteIndex;
    },

    formatNote: function() {
      document.querySelector(".editor-toolbar").classList.toggle("hide-toolbar");
    },
  },
};
</script>

<style>
@import "~simplemde/dist/simplemde.min.css";

.disable-spell-error .cm-spell-error {
  background: none !important;
}

/* MDE Styles */
.CodeMirror,
.editor-toolbar {
  border: none !important;
  background: transparent;
}

.CodeMirror {
  height: 88vh;
  max-height: 88vh;
  padding-top: 0;
  font-size: 1rem;
  caret-color: #ff5c5c imo !important;
  /* overflow: scr; */
}

.CodeMirror-cursor {
  border-color: #ff5c5c;
}

.vue-simplemde {
  position: relative;
}

.cm-formatting {
  color: #ff5c5c;
}

.editor-toolbar {
  z-index: 999;
  position: absolute;
  bottom: 0.8rem;
  width: 100%;
  text-align: center;
  border-radius: 3px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.5);
  opacity: 1;
  background-color: #fff;
  display: block;
}

.editor-toolbar:hover {
  background-color: #fff;
  opacity: 1;
}

.hide-toolbar {
  opacity: 0;
  transition: opacity 0.2s;
  display: none;
}

.hide-toolbar:hover {
  opacity: 0 !important;
}

/* Dark Mode */

.dark .CodeMirror pre {
  color: white !important;
}

/* Quote */
</style>
