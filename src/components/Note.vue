<template>
  <div>
    <div v-show="this.noteCollection.length" class="pb-4 h-full flex flex-col prose prose-sm max-w-full">
      <tiptap id="editor" ref="editor" v-model="content" :toolBar="toolBar" :settings="settings" @input="autoSave" class="h-full" />
      <div class="flex">
        <div class="icons-left text-left flex-grow relative">
          <div :class="dotSave" class="absolute left-2">
            <transition name="fade">
              <div v-show="autoSaved" class="dot-flashing"></div>
            </transition>
          </div>
          <font-awesome-icon
            v-if="settings.viewTrash"
            id="restoreIcon"
            icon="trash-restore-alt"
            v-on:click="restore()"
            class="transition text-green-500"
            title="Restore"
          />
          <font-awesome-icon
            v-if="!settings.noteList && !settings.viewTrash"
            :icon="['far', 'edit']"
            id="createNote"
            class="transition text-gray-500 dark:text-gray-300"
            v-on:click="createNote()"
            title="Create note"
          />
        </div>
        <div class="text-right flex-grow">
          <span @mouseleave="deleteTip = false" class="tooltip" :class="{ 'delete-tip': deleteTip }">
            <font-awesome-icon
              icon="trash-alt"
              id="deleteIcon"
              @click="clickDelete()"
              class="transition text-gray-500 dark:text-gray-300"
              title="Delete (Double Click)"
            />
            <span class="tooltiptext rounded shadow text-sm text-center w-40 bg-white dark:bg-gray-700 z-10 absolute -top-8 left-1/2 -ml-20">
              <div class="w-8 overflow-hidden inline-block absolute -bottom-3  " style="left: 72px">
                <div class="h-3 w-3 bg-white dark:bg-gray-700 shadow -rotate-45 transform origin-top-left"></div>
              </div>
              Double Click to Delete</span
            >
          </span>

          <font-awesome-icon
            icon="paragraph"
            id="formatIcon"
            v-on:click="toolBar = !toolBar"
            class="transition text-gray-500 dark:text-gray-300"
            title="Format"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tiptap from "./Tiptap.vue";

// Font Awesome
import { faParagraph, faTrashAlt, faTrashRestoreAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(faParagraph, faTrashAlt, faTrashRestoreAlt, faEdit);

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
      timeoutDelete: null,
      toolBar: false,
      deleteTip: false,
      autoSaved: false,
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
    dotSave: function() {
      if (this.settings.noteList) {
        return "bottom-0";
      } else {
        return "-bottom-2";
      }
    },
  },
  methods: {
    focus: function() {
      this.$refs.editor.focus();
    },
    createNote: function() {
      this.notes.newId++;
      this.notes.currentId = this.notes.newId;
      this.notes.collection.unshift({
        id: this.notes.newId,
        content: "",
        date: new Date().getTime(),
        pinned: false,
      });

      this.$emit("updateNotes", this.notes);
    },
    clickDelete: function() {
      if (!this.timeoutId) {
        this.timeoutId = setTimeout(() => {
          this.deleteTip = true;
          this.timeoutId = null;
        }, 500); //tolerance in ms
      } else {
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
        this.deleteNote();
      }
    },
    restore: function() {
      let nextNote = this.nextNote();

      this.notes.collection.push(this.note);
      this.notes.trash.splice(this.currentNoteIndex(), 1);
      this.notes.currentId = nextNote;
      this.$emit("updateNotes", this.notes);
    },

    autoSave: function() {
      this.autoSaved = true;
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }
      this.timeout = setTimeout(() => {
        this.noteCollection[this.currentNoteIndex()].date = new Date().getTime();
        this.$emit("updateNotes", this.notes);
        this.autoSaved = false;
      }, 1000);
    },

    deleteNote: function() {
      this.deleteTip = false;
      let nextNote = this.nextNote();
      if (!this.settings.viewTrash) {
        this.notes.trash.push(this.notes.collection[this.currentNoteIndex()]);
      }
      this.noteCollection.splice(this.currentNoteIndex(), 1);
      this.notes.currentId = nextNote;

      this.$emit("updateNotes", this.notes);
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
#restoreIcon,
#createNote {
  opacity: 0.4;
  width: auto;
  height: 18px;
  margin-left: 24px;
}

#deleteIcon,
#createNote {
  margin-left: 0px;
}

#formatIcon:hover,
#deleteIcon:hover,
#restoreIcon:hover,
#createNote:hover {
  opacity: 1;
  cursor: pointer;
}

#deleteIcon:hover {
  color: #dc3545;
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

/* Tooltip container */
.tooltip {
  position: relative;
  display: inline-block;
}

/* Tooltip text */
.tooltip .tooltiptext {
  visibility: hidden;
}

/* Show the tooltip text when you mouse over the tooltip container */
.delete-tip .tooltiptext {
  visibility: visible;
}

/* Checkbox */

.ProseMirror ul[data-type="taskList"] p {
  width: 100%;
  display: inline-block;
}

/**
 * ==============================================
 * Dot Flashing
 * ==============================================
 */

.dot-flashing,
.dot-flashing::before,
.dot-flashing::after {
  width: 5px;
  height: 5px;
  border-radius: 5px;
  background-color: #6b7280;
  color: #6b7280;
  animation: dotFlashing 1s infinite linear alternate;
  position: absolute;
}

.dark .dot-flashing,
.dark .dot-flashing::before,
.dark .dot-flashing::after {
  background-color: #9099aa;
  color: #9099aa;
  animation: dotFlashingDark 1s infinite linear alternate;
}

.dot-flashing {
  position: relative;
  animation-delay: 0.5s !important;
  bottom: 0;
}

.dot-flashing::before,
.dot-flashing::after {
  content: "";
  display: inline-block;
  bottom: 0;
}

.dot-flashing::before {
  left: -10px;
  animation-delay: 0s !important;
}

.dot-flashing::after {
  left: 10px;
  animation-delay: 1s !important;
}

@keyframes dotFlashing {
  0% {
    background-color: #9099aa;
  }
  50%,
  100% {
    background-color: #ebe6ff;
  }
}

@keyframes dotFlashingDark {
  0% {
    background-color: #9099aa;
  }
  50%,
  100% {
    background-color: #374151;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
