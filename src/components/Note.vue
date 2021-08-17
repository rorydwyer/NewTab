<template>
  <div>
    <div v-show="this.noteCollection.length" class="pb-4 h-full flex flex-col prose">
      <tiptap id="editor" v-model="content" :toolBar="toolBar" @input="autoSave" class="h-full" />
      <div class="flex">
        <div class="text-left flex-grow">
          <font-awesome-icon
            v-if="settings.viewTrash"
            id="restoreIcon"
            icon="trash-restore-alt"
            v-on:click="restore()"
            class="transition text-green-500"
            title="Restore"
          />
        </div>
        <div class="text-right flex-grow">
          <font-awesome-icon
            icon="paragraph"
            id="formatIcon"
            v-on:click="toolBar = !toolBar"
            class="transition text-gray-500 dark:text-gray-300"
            title="Format"
          />
          <font-awesome-icon icon="trash-alt" id="deleteIcon" v-on:click="deleteNote()" class="transition text-gray-500 dark:text-gray-300" title="Delete" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tiptap from "./Tiptap.vue";

// Font Awesome
import { faParagraph, faTrashAlt, faTrashRestoreAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(faParagraph, faTrashAlt, faTrashRestoreAlt);

export default {
  name: "note",
  components: {
    Tiptap,
    FontAwesomeIcon,
  },
  props: {
    notes: Object,
    settings: Object,
  },
  data() {
    return {
      timeout: null,
      toolBar: false,
    };
  },
  computed: {
    content: {
      get: function() {
        if (this.noteCollection.length) {
          return this.noteCollection[this.currentNoteIndex()].content;
        } else {
          return "";
        }
      },
      set: function(value) {
        this.noteCollection[this.currentNoteIndex()].content = value;
      },
    },
    note: {
      get: function() {
        if (this.noteCollection.length) {
          return this.noteCollection[this.currentNoteIndex()];
        } else {
          return {};
        }
      },
    },
    noteCollection: function() {
      return this.settings.viewTrash ? this.notes.trash : this.notes.collection;
    },
  },
  mounted() {
    // this.simplemde.codemirror.on("keyup", () => {
    //   this.autoSave();
    // });
  },
  methods: {
    loadNote: function() {
      if (this.noteCollection.length) {
        // this.simplemde.value(this.note.content);
        // this.simplemde.codemirror.focus();
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

.CodeMirror-cursor {
  border-color: #ff5c5c;
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
</style>
