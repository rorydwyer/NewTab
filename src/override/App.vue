<template>
  <div class="main grid grid-cols-10 gap-4 h-screen max-h-screen overflow-hidden">
    <NoteList :currentNote="currentNote" :notes="notes" @loadNote="loadNote($event)" @createNote="createNote()" class="col-span-2 h-screen pt-8 max-h-screen" />

    <div class="col-span-6 h-screen pt-8 max-h-screen">
      <div class="pb-4 h-full flex flex-col">
        <vue-simplemde class="flex-grow" v-model="currentNote.content" ref="markdownEditor" :configs="configs" />
        <div class="flex">
          <div class="flex-grow">
            <button class="text-sm underline" v-on:click="formatNote()">Format</button>
          </div>
          <div>
            <button class="text-sm underline hover:text-red-600" v-if="this.notes.length > 1" v-on:click="deleteNote()">Delete</button>
          </div>
        </div>
      </div>
    </div>

    <Todo class="col-span-2 h-screen pt-8 max-h-screen" />
  </div>
</template>

<script>
// import HelloWorld from '@/components/HelloWorld.vue'
import NoteList from "@/components/NoteList.vue";
import Todo from "@/components/Todo.vue";
import "tailwindcss/tailwind.css";
import VueSimplemde from "vue-simplemde";

export default {
  name: "app",
  components: {
    NoteList,
    Todo,
    VueSimplemde,
  },
  data() {
    return {
      notes: [],
      nextNoteId: 3,
      currentNote: {
        content: "",
        id: null,
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
    };
  },
  computed: {
    simplemde() {
      return this.$refs.markdownEditor.simplemde;
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

    this.simplemde.codemirror.on("change", () => {
      chrome.storage.sync.get("newtabNotes", (res) => {
        res.newtabNotes = this.notes;
        chrome.storage.sync.set(res);
      });
    });

    document.querySelector(".editor-toolbar").classList.add("hide-toolbar");
  },
  methods: {
    loadNote: function(note) {
      this.currentNote = note;
      this.simplemde.value(this.currentNote.content);
    },
    createNote: function() {
      chrome.storage.sync.get("newtabNotes", (res) => {
        res.newtabNotes.unshift({
          id: this.nextNoteId++,
          content: "New note",
          date: new Date(),
        });
        chrome.storage.sync.set(res);
        this.notes = res.newtabNotes;
        this.loadNote(this.notes[0]);
      });
    },
    deleteNote: function() {
      chrome.storage.sync.get("newtabNotes", (res) => {
        if (this.notes.length > 1) {
          res.newtabNotes.splice(
            this.notes.findIndex((note) => note.id === this.currentNote.id),
            1
          );
          chrome.storage.sync.set(res);
          this.notes = res.newtabNotes;
          this.loadNote(this.notes[0]);
        }
      });
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
  background: linear-gradient(0deg, rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.95)),
    url("https://images.unsplash.com/photo-1527195694714-9b939fac3432?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80");
  background-size: cover;
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
  /* overflow: scr; */
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
  color: #dd4c50;
}

/* Scroll Bar */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-thumb {
  background: lightgrey;
  border-radius: 6px;
}
</style>
