<template>
  <div id="main" class="main grid grid-cols-12 gap-12 h-screen max-h-screen overflow-hidden dark:bg-gray-800 dark:text-white relative">
    <NoteList :notes="newTab.notes" :settings="newTab.settings" @updateNotes="updateNotes($event)" class="col-span-3 h-screen pt-8 max-h-screen" />
    <Note ref="note" :notes="newTab.notes" :settings="newTab.settings" @updateNotes="updateNotes($event)" class="col-span-6 h-screen pt-8 max-h-screen" />
    <Todo
      :todos="newTab.todos"
      :settings="newTab.settings"
      @updateTodos="updateTodos($event)"
      @settings="showSettings = !showSettings"
      class="col-span-3 h-screen pt-8 max-h-screen"
    />
    <Settings
      @settings="showSettings = !showSettings"
      @emitSettings="settings = $event"
      v-bind:class="toggleSettings"
      class="absolute w-1/4 h-full transition-all z-50 pt-8 max-h-screen"
    />
  </div>
</template>

<script>
import NoteList from "@/components/NoteList.vue";
import Note from "@/components/Note.vue";
import Todo from "@/components/Todo.vue";
import Settings from "@/components/Settings.vue";
import "tailwindcss/tailwind.css";

export default {
  name: "app",
  components: {
    NoteList,
    Note,
    Todo,
    Settings,
  },
  data() {
    return {
      newTab: {
        notes: {
          // NewTab Notes
          collection: [
            {
              id: 0,
              date: new Date(),
              content: "",
            },
          ],
          currentId: 0,
          newId: 0,
        },
        todos: {
          // NewTab Todos
          collection: [
            {
              id: 0,
              content: "first",
            },
          ],
          newText: "",
          newId: 0,
        },
        settings: {
          // NewTab Settings
          darkMode: false,
          timer: true,
          todo: true,
          bgImage: true,
          timerDefault: "25:00",
          bgImageTheme: "Nature",
          bgImageURL: "",
          bgImageDate: new Date().toDateString(),
        },
      },
      showSettings: 0,
    };
  },
  computed: {
    toggleSettings: function() {
      return this.showSettings ? "right-0" : "-right-1/4";
    },
  },
  mounted() {
    // On load, get notes, todos, and settings from Chrome
    chrome.storage.local.get("newTab", (res) => {
      // If very first load:
      if (!res.newTab) this.init(res);
      this.newTab = res.newTab;
    });
  },
  methods: {
    init: function(res) {
      this.newTab.notes.collection[0].content = "# Your First Note";
      res.newTab = this.newTab;
    },

    updateNotes: function({ notes, load }) {
      chrome.storage.local.get("newTab", (res) => {
        this.newTab.notes = notes;

        // NEEDS WORK to sort notes by latest edited
        this.newTab.notes.collection.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });

        if (load) this.$refs.note.loadNote();

        res.newTab = this.newTab;
        chrome.storage.local.set(res);
      });
    },

    updateTodos: function(todos) {
      chrome.storage.local.get("newTab", (res) => {
        this.newTab.todos = todos;
        res.newTab = this.newTab;
        chrome.storage.local.set(res);
      });
    },
  },
};
</script>

<style>
#main {
  background-size: cover !important;
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

/* Scroll Bar */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-thumb {
  background: lightgrey;
  border-radius: 6px;
}
</style>
