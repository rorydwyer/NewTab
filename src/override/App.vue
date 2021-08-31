<template>
  <div id="main" class="main grid grid-cols-12 gap-24 h-screen max-h-screen overflow-hidden dark:text-white relative">
    <div v-if="showSettings" v-on:click="showSettings = !showSettings" class="absolute top-0 left-0 w-screen h-screen z-10"></div>
    <NoteList
      ref="notelist"
      :notes="newTab.notes"
      :settings="newTab.settings"
      @updateNotes="updateNotes($event)"
      @updateSettings="updateSettings($event)"
      @viewTrash="$refs.note.viewTrash($event)"
      class="col-span-3 h-screen pt-8 max-h-screen"
    />
    <Note ref="note" :notes="newTab.notes" :settings="newTab.settings" @updateNotes="updateNotes($event)" class="col-span-6 h-screen pt-8 max-h-screen" />
    <div class="col-span-3 h-screen pt-8 max-h-screen px-4 pb-4 flex flex-col">
      <div class="flex-grow mb-4 max-h-full overflow-y-scroll overflow-x-hidden">
        <Todo :todos="newTab.todos" :settings="newTab.settings" @updateTodos="updateTodos($event)" />
      </div>
      <Quote ref="quote" :settings="newTab.settings" />
      <div class="text-right">
        <font-awesome-icon
          icon="cog"
          id="settingsIcon"
          class="transition text-gray-500 dark:text-gray-300"
          v-on:click="showSettings = !showSettings"
          title="Settings"
        />
      </div>
    </div>

    <transition name="slide" class="transition-all">
      <Settings
        v-show="showSettings"
        ref="settings"
        :settings="newTab.settings"
        :notes="newTab.notes"
        @settings="showSettings = !showSettings"
        @updateSettings="updateSettings($event)"
        class="absolute w-1/4 h-full transition-all z-50 pt-8 max-h-screen right-0"
      />
    </transition>
  </div>
</template>

<script>
import NoteList from "@/components/NoteList.vue";
import Note from "@/components/Note.vue";
import Todo from "@/components/Todo.vue";
import Settings from "@/components/Settings.vue";
import Quote from "@/components/Quote.vue";

import { diff } from "deep-object-diff";
const intNotes = require("@/components/intNotes.js");
import "../assets/tailwind.css";

// Font Awesome
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(faCog);

export default {
  name: "app",
  components: {
    NoteList,
    Note,
    // Tiptap,
    Todo,
    Settings,
    Quote,
    FontAwesomeIcon,
  },
  data() {
    return {
      showSettings: false,
      timeout: 0,
      focus: false,
      newTab: {
        notes: {
          collection: [],
          trash: [],
          currentId: 0,
          newId: 2,
        },
        todos: {
          collection: [],
          newText: "",
          newId: 0,
        },
        settings: {
          darkMode: true,
          timerClock: "",
          todo: true,
          bgImage: false,
          quote: true,
          loadBlankNote: false,
          viewTrash: false,
          selectMenu: true,
          noteList: true,
          today: "",
          bgImageTheme: "Gradient",
          bgImageURL: "",
          bgImageOpacity: 20,
          timerDefault: ["0", "0", "5", "2", "0", "0"], //Default: 25:00
        },
      },
    };
  },
  computed: {
    currentNoteIndex: function() {
      let noteIndex;
      for (let i = 0; i < this.newTab.notes.collection.length; i += 1) {
        if (this.newTab.notes.collection[i]["id"] === this.newTab.notes.currentId) {
          noteIndex = i;
        }
      }
      return noteIndex;
    },
  },
  mounted() {
    let today = new Date();
    chrome.storage.local.get("newTab", (res) => {
      if (!res.newTab) this.init(res); // If very first load
      this.newTab = res.newTab;

      // Load Settings
      //View Trash
      this.newTab.settings.viewTrash = false;

      // Dark Mode
      if (this.newTab.settings.darkMode) {
        this.$nextTick(() => {
          document.documentElement.classList.add("dark");
        });
      } else {
        this.$nextTick(() => {
          document.documentElement.classList.remove("dark");
        });
      }

      // Background Image
      if (this.newTab.settings.bgImage) {
        const root = document.querySelector(":root");
        root.style.setProperty("--bgOpacity", `0.${this.newTab.settings.bgImageOpacity}`);

        // If image is set and from current day
        if (this.newTab.settings.bgImageURL.length && this.newTab.settings.today == today.toDateString()) {
          root.style.setProperty("--bgImage", `url(${this.newTab.settings.bgImageURL})`);
        } else {
          // Get a new background image
          this.$nextTick(() => {
            this.$refs.settings.backgroundImage();
            this.newTab.settings.today = new Date().toDateString();
          });
        }
      }

      // Load Blank Note
      if (this.newTab.settings.loadBlankNote && this.newTab.notes.collection[this.currentNoteIndex].content !== "") {
        this.$nextTick(() => {
          let blankNote = false;
          for (let i = 0; i < this.newTab.notes.collection.length; i += 1) {
            if (this.newTab.notes.collection[i]["content"] == "") {
              blankNote = true;
              this.$refs.notelist.loadNote(this.newTab.notes.collection[i]);
              break;
            }
          }
          if (!blankNote) this.$refs.notelist.createNote();
        });
      }

      this.updateNotes(this.newTab.notes);
    });

    this.timeout = setInterval(() => {
      this.checkForUpdate();
    }, 1000);
  },
  methods: {
    init: function(res) {
      this.newTab.notes.collection.unshift({
        id: 0,
        date: "3",
        content: intNotes.array[0],
        pinned: true,
      });
      this.newTab.notes.collection.push({
        id: 1,
        date: "2",
        content: intNotes.array[1],
        pinned: true,
      });
      this.newTab.notes.collection.push({
        id: 2,
        date: "1",
        content: intNotes.array[2],
        pinned: false,
      });

      this.newTab.settings.timerClock = "clock";
      this.$refs.note.focus();
      res.newTab = this.newTab;
    },

    checkForUpdate: function() {
      chrome.storage.local.get("newTab", (res) => {
        if (Object.keys(diff(this.newTab.notes, res.newTab.notes)).length && document.hidden) {
          this.newTab.notes = res.newTab.notes;
        }

        if (Object.keys(diff(this.newTab.todos, res.newTab.todos)).length && document.hidden) {
          this.newTab.todos = res.newTab.todos;
        }
        chrome.storage.local.set(res);
      });
    },

    updateNotes: function(notes) {
      notes.collection
        .sort((a, b) => {
          return b.date - a.date;
        })
        .sort((a, b) => {
          return b.pinned - a.pinned;
        });

      chrome.storage.local.get("newTab", (res) => {
        this.newTab.notes = notes;
        res.newTab = this.newTab;
        this.$refs.note.focus();
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
  --bgOpacity: 0.15;
  --tw-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

#main {
  background-size: cover !important;
}

.dark > body {
  background-color: rgba(31, 41, 55, 1);
  /* background-color: rgb(13, 17, 23); */
}

.dark span {
  color: white;
}

::-webkit-input-placeholder,
::placeholder {
  color: rgba(75, 85, 99, 0.7) !important;
}

.dark ::-webkit-input-placeholder,
.dark ::placeholder {
  color: rgba(209, 213, 219, 0.7) !important;
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
  opacity: var(--bgOpacity);
  z-index: -1;
}

input {
  caret-color: #ff5c5c;
}

::selection {
  background-color: #ffcdcd;
}

.slide-enter,
.slide-leave-to {
  right: -25%;
}

/* Scroll Bar */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-thumb {
  background: lightgrey;
  border-radius: 6px;
}

.flip-list-move {
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

#settingsIcon {
  width: auto;
  height: 18px;
  opacity: 0.4;
}

#settingsIcon:hover {
  opacity: 1;
  cursor: pointer;
}
</style>
