<template>
  <div>
    <div v-show="onlyNote" class="pb-4 h-full flex flex-col">
      <vue-simplemde class="flex-grow" ref="markdownEditor" v-model="note.content" :configs="configs" v-bind:class="spellChecker" />
      <div class="flex">
        <div class="text-left flex-grow">
          <font-awesome-icon
            v-if="settings.viewTrash"
            id="restoreIcon"
            icon="trash-restore-alt"
            v-on:click="restore()"
            class="transition text-green-600"
            title="Restore"
          />
        </div>
        <div class="text-right flex-grow">
          <font-awesome-icon icon="paragraph" id="formatIcon" v-on:click="formatNote()" class="transition text-gray-500 dark:text-gray-300" title="Format" />

          <!-- v-if="!settings.viewTrash && notes.collection.length != 1" -->
          <font-awesome-icon icon="trash-alt" id="deleteIcon" v-on:click="deleteNote()" class="transition text-gray-500 dark:text-gray-300" title="Delete" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueSimplemde from "vue-simplemde";

// Font Awesome
import { faParagraph, faTrashAlt, faTrashRestoreAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(faParagraph, faTrashAlt, faTrashRestoreAlt);

export default {
  name: "note",
  components: {
    VueSimplemde,
    FontAwesomeIcon,
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
        if (this.onlyNote) {
          return this.noteCollection[this.currentNoteIndex()];
        } else {
          return {};
        }
      },
    },
    noteCollection: function() {
      return this.settings.viewTrash ? this.notes.trash : this.notes.collection;
    },
    spellChecker() {
      return this.settings.spellChecker ? "" : "disable-spell-error";
    },
    onlyNote: function() {
      return this.noteCollection.length;
    },
  },
  mounted() {
    this.simplemde.codemirror.on("keyup", () => {
      this.autoSave();
    });

    // Styles for toolbar
    document.querySelector(".main").style.opacity = "1";
  },
  methods: {
    loadNote: function() {
      if (this.onlyNote) {
        this.simplemde.value(this.note.content);
        this.simplemde.codemirror.focus();
      }
    },

    restore: function() {
      let nextNote = this.nextNote();

      this.notes.collection.push(this.note);
      this.notes.trash.splice(this.currentNoteIndex(), 1);
      this.notes.currentId = nextNote;
      this.$emit("updateNotes", { notes: this.notes, load: true });
    },

    autoSave: function() {
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }
      this.timeout = setTimeout(() => {
        this.noteCollection[this.currentNoteIndex()].date = new Date().getTime();
        this.$emit("updateNotes", { notes: this.notes, load: false });
      }, 1000);
    },

    deleteNote: function() {
      let nextNote = this.nextNote();
      if (!this.settings.viewTrash) {
        this.notes.trash.push(this.notes.collection[this.currentNoteIndex()]);
      }
      this.noteCollection.splice(this.currentNoteIndex(), 1);
      this.notes.currentId = nextNote;

      this.$emit("updateNotes", { notes: this.notes, load: true });
    },

    nextNote: function() {
      let nextNote;
      if (this.noteCollection.length > 1) {
        if (this.noteCollection[this.currentNoteIndex() + 1]) {
          nextNote = this.noteCollection[this.currentNoteIndex() + 1].id;
        } else {
          nextNote = this.noteCollection[this.currentNoteIndex() - 1].id;
        }
      }
      return nextNote;
    },

    currentNoteIndex: function() {
      let noteIndex = null;
      for (let i = 0; i < this.noteCollection.length; i += 1) {
        if (this.noteCollection[i]["id"] === this.notes.currentId) {
          noteIndex = i;
        }
      }

      if (noteIndex === null) {
        noteIndex = 0;
        this.notes.currentId = this.noteCollection[0].id;
      }

      return noteIndex;
    },

    formatNote: function() {
      document.querySelector(".editor-toolbar").classList.toggle("show-toolbar");
    },
  },
};
</script>

<style>
@import "~simplemde/dist/simplemde.min.css";

#formatIcon,
#deleteIcon,
#restoreIcon {
  opacity: 0.4;
  width: auto;
  height: 18px;
  margin-left: 24px;
}

#formatIcon:hover,
#deleteIcon:hover,
#restoreIcon:hover {
  opacity: 1;
  cursor: pointer;
}

#deleteIcon:hover {
  color: #dc3545;
}

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
  display: none;
}

.editor-toolbar:hover {
  background-color: #fff;
  opacity: 0;
}

.show-toolbar {
  opacity: 1;
  transition: opacity 0.2s;
  display: block;
}

.show-toolbar:hover {
  opacity: 1 !important;
}

/* Dark Mode */

.dark .CodeMirror pre {
  color: white !important;
}

/* Quote */
</style>
