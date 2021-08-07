<template>
  <div id="main" class="main grid grid-cols-12 gap-12 h-screen max-h-screen overflow-hidden dark:text-white relative">
    <div v-if="showSettings" v-on:click="showSettings = !showSettings" class="absolute top-0 left-0 w-screen h-screen z-10"></div>
    <NoteList
      :notes="newTab.notes"
      :settings="newTab.settings"
      @updateNotes="updateNotes($event)"
      @updateSettings="updateSettings($event)"
      class="col-span-3 h-screen pt-8 max-h-screen"
    />
    <Note ref="note" :notes="newTab.notes" :settings="newTab.settings" @updateNotes="updateNotes($event)" class="col-span-6 h-screen pt-8 max-h-screen" />
    <div class="col-span-3 h-screen pt-8 max-h-screen px-4 pb-4 flex flex-col">
      <div class="flex-grow">
        <Todo :todos="newTab.todos" :settings="newTab.settings" @updateTodos="updateTodos($event)" />
      </div>
      <Quote ref="quote" :settings="newTab.settings" @updateSettings="updateSettings($event)" />
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
import Quote from "@/components/Quote.vue";
import "tailwindcss/tailwind.css";

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
    Todo,
    Settings,
    Quote,
    FontAwesomeIcon,
  },
  data() {
    return {
      showSettings: false,
      newTab: {
        notes: {
          collection: [
            {
              id: 0,
              date: new Date().getTime(),
              content: "",
              pinned: false,
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
          darkMode: true,
          timerClock: "",
          todo: true,
          quote: true,
          bgImage: true,
          spellChecker: false,
          today: "",
          bgImageTheme: "Nature",
          bgImageURL: "",
          bgImageOpacity: 30,
          quoteContent: "",
          quoteAuthor: "",
          quoteDate: "",
          timerDefault: "25:00",
        },
      },
    };
  },
  computed: {
    toggleSettings: function() {
      return this.showSettings ? "right-0" : "-right-1/4";
    },
  },
  mounted() {
    const today = new Date();
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
        root.style.setProperty("--bgOpacity", `0.${this.newTab.settings.bgImageOpacity}`);

        // If image is set and from current day
        if (this.newTab.settings.bgImageURL.length && this.newTab.settings.today == today.toDateString()) {
          root.style.setProperty("--bgImage", `url(${this.newTab.settings.bgImageURL})`);
        } else {
          // Get a new background image
          this.$refs.settings.backgroundImage();
        }
      }

      // Quote
      if (this.newTab.settings.quote && (!this.newTab.settings.quoteContent.length || this.newTab.settings.today != today.toDateString())) {
        this.$refs.quote.getQuote();
      }

      // chrome.storage.local.set(res);
    });
  },
  methods: {
    init: function(res) {
      this.newTab.notes.collection[0].content = `# First Note
Go ahead, play around with the editor! Be sure to check out **bold**, *italic*  and ~~strikethrough~~ styling. You can type using Markdown syntax, by toggling the Format tool bar below, or using shortcuts like \`cmd-b\` or \`ctrl-b\`.

## Lists
Unordered lists can be started using the tool bar or by typing \`* \`, \`- \`, or \`+ \`. Ordered lists can be started by typing \`1. \`.

#### Unordered
* Lists are a piece of cake
* They even auto continue as you type
* A double enter will end them

#### Ordered
1. Numbered lists...
2. ...work too!`;
      res.newTab = this.newTab;
    },

    updateNotes: function({ notes, load }) {
      notes.collection
        .sort((a, b) => {
          return b.date - a.date;
        })
        .sort((a, b) => {
          return b.pinned - a.pinned;
        });

      chrome.storage.local.get("newTab", (res) => {
        this.newTab.notes = notes;
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
  --bgOpacity: 0.15;
  --tw-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
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
  opacity: var(--bgOpacity);
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
