<template>
  <div class="pb-4 h-full flex flex-col">
    <vue-simplemde class="flex-grow" ref="markdownEditor" v-model="notes.collection[notes.currentId].content" :configs="configs" />
    <div class="text-right">
      <button class="text-sm underline pr-5" v-on:click="formatNote()">Format</button>
      <button class="text-sm underline hover:text-red-600" v-if="this.notes.length > 1" v-on:click="deleteNote()">Delete</button>
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
  },
  data() {
    return {
      note: {
        content: "",
        date: "",
        id: 0,
      },
      configs: {
        status: false,
        spellChecker: false,
        toolbar: [
          "heading-1",
          "heading-2",
          "heading-3",
          "horizontal-rule",
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
  },
  mounted() {
    this.simplemde.codemirror.on("keyup", () => {
      this.$emit("updateNotes", this.simplemde.value());
    });

    // Styles
    document.querySelector(".editor-toolbar").classList.add("hide-toolbar");
    document.querySelector(".main").style.opacity = "1";
  },
  unmounted() {
    console.log("UnMounted: " + this.notes.collection[0].content);
    this.note = this.notes.collection[this.notes.currentId]; // Load current note
    this.simplemde.value(this.note.content);
  },
  methods: {
    loadNote: function() {
      // this.note = this.notes.collection[0];
      // this.simplemde.value(this.currentNote);
    },

    createNote: function() {
      chrome.storage.sync.get("newtabNotes", (res) => {
        res.newtabNotes.unshift({
          id: this.getNoteId(),
          content: "",
          // date: new Date(),
        });
        chrome.storage.sync.set(res);
        this.notes = res.newtabNotes;
        this.loadNote(this.notes[0]);
        this.simplemde.codemirror.focus();
      });
    },
    getNoteId: function() {
      chrome.storage.sync.get("noteId", (res) => {
        this.nextNoteId++;
        res.noteId = this.nextNoteId;
        chrome.storage.sync.set(res);
      });
      return this.nextNoteId;
    },
    deleteNote: function() {
      chrome.storage.sync.get("newtabNotes", (res) => {
        if (this.notes.length > 1) {
          res.newtabNotes.splice(
            this.notes.findIndex((note) => note.id === this.notes.current.id),
            1
          );
          chrome.storage.sync.set(res);

          let nextNote;
          if (this.notes[this.findByAttr(this.notes, "id", this.notes.current.id) + 1]) {
            nextNote = this.notes[this.findByAttr(this.notes, "id", this.notes.current.id) + 1];
          } else {
            nextNote = this.notes[this.findByAttr(this.notes, "id", this.notes.current.id) - 1];
          }
          this.loadNote(nextNote);
          this.notes = res.newtabNotes;
        }
      });
    },
    findByAttr: function(array, attr, value) {
      for (var i = 0; i < array.length; i += 1) {
        if (array[i][attr] === value) {
          return i;
        }
      }
      return -1;
    },
    formatNote: function() {
      document.querySelector(".editor-toolbar").classList.toggle("hide-toolbar");
    },
  },
};
</script>

<style>
@import "~simplemde/dist/simplemde.min.css";

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
</style>
