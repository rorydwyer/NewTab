<template>
  <div id="main" class="main grid grid-cols-12 gap-12 h-screen max-h-screen overflow-hidden dark:bg-gray-800 dark:text-white relative">
    <NoteList
      :notes="newTab.notes"
      :settings="newTab.settings"
      @loadNote="loadNote($event)"
      @createNote="createNote()"
      class="col-span-3 h-screen pt-8 max-h-screen"
    />

    <Note ref="note" :notes="newTab.notes" :settings="newTab.settings" @updateNotes="updateNotes($event)" class="col-span-6 h-screen pt-8 max-h-screen" />

    <Todo :todos="newTab.todos" :settings="newTab.settings" @settings="showSettings = !showSettings" class="col-span-3 h-screen pt-8 max-h-screen" />

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
              content: "# Your First Note!",
            },
          ],
          currentId: 0,
          newId: 0,
        },
        todos: {
          // NewTab Todos
          collection: [],
          newText: "",
          newId: 0,
        },
        settings: {
          // NewTab Settings
          darkMode: false,
          toggleTimer: true,
          timerDefault: "15:00",
          toggleTodo: true,
          bgImage: true,
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
    chrome.storage.sync.get("newTab", (res) => {
      // If very first load:
      if (!res.newTab) res.newTab = this.newTab;
      this.newTab = res.newTab;
    });
  },
  methods: {
    // Run on very first load
    init: function() {},
    // Update Notes
    updateNotes: function(content) {
      console.log(content);
      this.newTab.notes.collection[this.newTab.notes.currentId].content = content;
      this.newTab.notes.collection[this.newTab.notes.currentId].date = new Date();

      chrome.storage.sync.get("newTab", (res) => {
        res.newTab = this.newTab;
        chrome.storage.sync.set(res);
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
