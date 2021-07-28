<template>
  <div id="main" class="main grid grid-cols-12 gap-12 h-screen max-h-screen overflow-hidden dark:text-white relative">
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
      ref="settings"
      :settings="newTab.settings"
      @settings="showSettings = !showSettings"
      @updateSettings="updateSettings($event)"
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
          collection: [],
          newText: "",
          newId: 0,
        },
        settings: {
          darkMode: false,
          timer: true,
          todo: true,
          bgImage: true,
          bgImageTheme: "Nature",
          bgImageURL: "",
          bgImageDate: "",
          timerDefault: "25:00",
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
    chrome.storage.local.get("newTab", (res) => {
      if (!res.newTab) this.init(res); // If very first load
      this.newTab = res.newTab;

      // Load Settings
      // Dark Mode
      if (this.newTab.settings.darkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      // Background Image
      if (this.newTab.settings.bgImage) {
        const root = document.querySelector(":root");
        const today = new Date();

        // If image is set and from current day
        if (this.newTab.settings.bgImageURL.length && this.newTab.settings.bgImageDate == today.toDateString()) {
          root.style.setProperty("--bgImage", `url(${this.newTab.settings.bgImageURL})`);
        } else {
          // Get a new background image
          this.$refs.settings.backgroundImage();
        }
      }

      // chrome.storage.local.set(res);
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

    updateSettings: function(settings) {
      chrome.storage.local.get("newTab", (res) => {
        this.newTab.settings = settings;
        res.newTab = this.newTab;
        chrome.storage.local.set(res);
      });
    },
  },
};
</script>

<style>
:root {
  --bgImage: "";
}

#main {
  background-size: cover !important;
}

.dark > body {
  background-color: rgba(31, 41, 55, 1);
}

#main::before {
  content: "";
  background-image: var(--bgImage);
  background-size: cover;
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  opacity: 0.15;
  z-index: -1;
}

input {
  caret-color: #ff5c5c;
}

::selection {
  background-color: #ffcdcd;
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
