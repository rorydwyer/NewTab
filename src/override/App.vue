<template>
  <div class="main grid grid-cols-12 gap-12 h-screen max-h-screen overflow-hidden dark:bg-gray-800 dark:text-white relative">
    <NoteList :currentNote="currentNote" :notes="notes" @loadNote="loadNote($event)" @createNote="createNote()" class="col-span-3 h-screen pt-8 max-h-screen" />

    <div class="col-span-6 h-screen pt-8 max-h-screen">
      <div class="pb-4 h-full flex flex-col">
        <vue-simplemde class="flex-grow" v-model="currentNote.content" ref="markdownEditor" :configs="configs" />
        <div class="text-right">
          <button class="text-sm underline pr-5" v-on:click="formatNote()">Format</button>
          <button class="text-sm underline hover:text-red-600" v-if="this.notes.length > 1" v-on:click="deleteNote()">Delete</button>
        </div>
      </div>
    </div>

    <Todo @settings="settings = !settings" class="col-span-3 h-screen pt-8 max-h-screen" />
    <Settings @settings="settings = !settings" v-bind:class="getSettings" id="settings" class="absolute w-1/4 h-full transition-all z-50 pt-8 max-h-screen" />
  </div>
</template>

<script>
import NoteList from "@/components/NoteList.vue";
import Todo from "@/components/Todo.vue";
import Settings from "@/components/Settings.vue";
import VueSimplemde from "vue-simplemde";
import "tailwindcss/tailwind.css";

export default {
  name: "app",
  components: {
    NoteList,
    Todo,
    Settings,
    VueSimplemde,
  },
  data() {
    return {
      notes: [],
      nextNoteId: 0,
      currentNote: {
        content: "",
        id: 0,
        date: new Date(),
      },
      configs: {
        status: false,
        spellChecker: false, // disable spell check
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
          "image",
          "code",
        ],
      },
      settings: 0,
    };
  },
  computed: {
    simplemde() {
      return this.$refs.markdownEditor.simplemde;
    },
    getSettings: function() {
      return this.settings ? "right-0" : "-right-1/4";
    },
  },
  mounted() {
    chrome.storage.sync.get("newtabNotes", (res) => {
      if (!res.newtabNotes)
        res.newtabNotes = [
          {
            id: 0,
            date: new Date(),
            content: "# Your First Note!",
          },
        ];
      this.notes = res.newtabNotes;
      this.currentNote = this.notes[0];
      chrome.storage.sync.set(res);
    });

    chrome.storage.sync.get("noteId", (res) => {
      if (!res.noteId) res.noteId = 1;
      this.nextNoteId = res.noteId;
      chrome.storage.sync.set(res);
    });

    this.simplemde.codemirror.on("keyup", () => {
      this.currentNote.date = new Date();
      chrome.storage.sync.get("newtabNotes", (res) => {
        res.newtabNotes = this.notes;
        chrome.storage.sync.set(res);
      });
    });

    document.querySelector(".editor-toolbar").classList.add("hide-toolbar");
  },
  methods: {
    loadNote: function(note) {
      if (!note) {
        alert(note);
        note = this.notes[0];
      }
      this.currentNote = note;
      this.simplemde.value(this.currentNote.content);
      // this.simplemde.codemirror.focus();
    },
    createNote: function() {
      chrome.storage.sync.get("newtabNotes", (res) => {
        res.newtabNotes.unshift({
          id: this.getNoteId(),
          content: "",
          date: new Date(),
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
            this.notes.findIndex((note) => note.id === this.currentNote.id),
            1
          );
          chrome.storage.sync.set(res);

          let nextNote;
          if (this.notes[this.findByAttr(this.notes, "id", this.currentNote.id) + 1]) {
            nextNote = this.notes[this.findByAttr(this.notes, "id", this.currentNote.id) + 1];
          } else {
            nextNote = this.notes[this.findByAttr(this.notes, "id", this.currentNote.id) - 1];
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
.main {
  /* background: linear-gradient(0deg, rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.95)),
    url("https://images.unsplash.com/photo-1527195694714-9b939fac3432?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80");
  background-size: cover; */
}

input {
  caret-color: #ff5c5c;
}

::selection {
  background-color: #ffcdcd;
}

#settings {
  background-color: #ff5c5c;
}

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

.cm-formatting {
  color: #ff5c5c;
}

/* Scroll Bar */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-thumb {
  background: lightgrey;
  border-radius: 6px;
}

/* MDE Styles */
.cm-formatting-quote {
  /* display: none; */
  /* content: "";
  position: relative;
  left: 32px;
  text-align: right;
  border-left: solid 2px #ff5c5c; */
}

/* Dark Mode */

.dark .CodeMirror pre {
  color: white !important;
}
</style>
