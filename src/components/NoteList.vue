<template>
  <div class="px-4 pb-4 flex flex-col prose prose-sm">
    <div v-show="spotlight" class="absolute w-screen h-screen top-0 left-0">
      <div v-on:click="spotlight = false" class="absolute w-screen h-screen top-0 left-0 z-20"></div>
      <div id="spotlight" class="absolute left-1/2 top-1/4 transform -translate-x-1/2 p-4 rounded-lg bg-white shadow-lg z-40">
        <div class="flex justify-center">
          <font-awesome-icon icon="search" class="searchIcon mr-4" />
          <input v-model="search" ref="spotlightSearch" type="text" placeholder="Search Notes..." class="flex-grow w-full p-2 text-lg focus:outline-none" />
        </div>
        <div v-show="search.length > 0" id="spotlight-items" class="prose m-4 px-2 py-4 max-h-96 overflow-y-scroll border-t border-gray-100">
          <button
            class="searchItem block w-full h-24 relative text-left p-4 mb-4 overflow-y-hidden rounded shadow bg-gray-50"
            v-for="(note, index) in filteredNotes"
            :key="index"
            :class="{ 'spotlight-active': index === selectedIndex }"
            v-on:click="
              loadNote(note);
              search = '';
              spotlight = false;
            "
            @mouseenter="selectedIndex = index"
          >
            <font-awesome-icon
              icon="star"
              title="Favorite note"
              class="absolute top-1 right-1 opacity-0 transition text-gray-300 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-100 w-3 h-3"
              v-bind:class="{ pinned: note.pinned }"
              v-on:click="pinNote(note)"
            />
            {{ removeHTML(note.content) }}
          </button>
        </div>
      </div>
    </div>
    <div v-if="!settings.viewTrash" class="notelist flex-grow overflow-y-scroll">
      <div class="flex mb-4">
        <div class="flex-grow relative">
          <input
            v-model="search"
            type="text"
            name="search"
            id="searchNotes"
            placeholder="Search notes..."
            class="w-full focus:outline-none bg-transparent border-b text-sm border-gray-400 dark:border-gray-500 dark:text-white p-1 mr-1 placeholder-gray-800::placeholder"
          />
          <span class="focus-border absolute left-0 bottom-0 w-0 bg-gray-800 dark:bg-gray-200 transition"></span>
        </div>
        <font-awesome-icon
          :icon="['far', 'edit']"
          id="createNote"
          class="transition text-gray-500 dark:text-gray-300"
          v-on:click="createNote()"
          title="Create note"
        />
      </div>
      <div>
        <transition-group name="flip-list">
          <div
            v-for="note in filteredNotes"
            :key="note.id"
            v-on:click="loadNote(note)"
            v-bind:class="{ activeNote: notes.currentId == note.id }"
            class="bg-gray-400 hover:bg-opacity-20 bg-opacity-10 dark:text-gray-300 text-sm my-2 p-2 text-gray-600 note-single relative transition"
          >
            <font-awesome-icon
              icon="star"
              title="Favorite note"
              class="absolute top-1 right-1 opacity-0 transition text-gray-300 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-100 w-3 h-3"
              v-bind:class="{ pinned: note.pinned }"
              v-on:click="pinNote(note)"
            />
            {{ removeHTML(note.content) }}
          </div>
        </transition-group>
      </div>
    </div>
    <!-- Trash List -->
    <div v-else class="notelist flex-grow overflow-y-scroll">
      <div class="mb-4">
        <h3 class="text-xl text-center m-0 dark:text-white" style="margin: 0px">Trash</h3>
      </div>
      <div>
        <transition-group name="flip-list">
          <div
            v-for="note in notes.trash"
            :key="note.id"
            v-on:click="loadNote(note)"
            v-bind:class="{ activeNote: notes.currentId == note.id }"
            class="bg-gray-400 hover:bg-opacity-20 bg-opacity-10 dark:text-gray-300 text-sm my-2 p-2 text-gray-600 note-single relative transition"
          >
            {{ removeHTML(note.content) }}
          </div>
        </transition-group>
      </div>
    </div>

    <div id="clockTimer" class="relative" v-if="settings.timerClock">
      <div id="clockIconMenu" class="absolute -bottom-2 left-full w-0 pl-4">
        <font-awesome-icon
          :icon="['far', 'clock']"
          title="Clock"
          class="clockIcon transition-all opacity-0 text-gray-500 dark:text-gray-300"
          v-bind:class="{ activeClockTimer: settings.timerClock == 'clock' }"
          v-on:click="updateClockTimer('clock')"
        />
        <font-awesome-icon
          :icon="['fas', 'stopwatch']"
          title="Stopwatch"
          class="clockIcon transition-all opacity-0 text-gray-500 dark:text-gray-300"
          v-bind:class="{ activeClockTimer: settings.timerClock == 'stopwatch' }"
          v-on:click="updateClockTimer('stopwatch')"
        />
        <font-awesome-icon
          :icon="['fas', 'hourglass-start']"
          title="Timer"
          class="clockIcon transition-all opacity-0 text-gray-500 dark:text-gray-300"
          v-bind:class="{ activeClockTimer: settings.timerClock == 'timer' }"
          v-on:click="updateClockTimer('timer')"
        />
      </div>
      <Clock v-if="settings.timerClock == 'clock'" />
      <Stopwatch v-if="settings.timerClock == 'stopwatch'" />
      <Timer :settings="settings" v-if="settings.timerClock == 'timer'" />
    </div>
  </div>
</template>

<script>
import Timer from "@/components/Timer.vue";
import Stopwatch from "@/components/Stopwatch.vue";
import Clock from "@/components/Clock.vue";

// Font Awesome
import { faStar, faStopwatch, faHourglassStart, faSearch } from "@fortawesome/free-solid-svg-icons";
import { faEdit, faClock } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(faStar, faEdit, faClock, faStopwatch, faHourglassStart, faSearch);

export default {
  components: {
    Timer,
    Stopwatch,
    Clock,
    FontAwesomeIcon,
  },
  props: {
    notes: Object,
    settings: Object,
  },
  data() {
    return {
      search: "",
      spotlight: false,
      selectedIndex: 0,
    };
  },
  computed: {
    // Filtered notes from search bar
    filteredNotes() {
      return this.notes.collection.filter((note) => note.content.toLowerCase().includes(this.search.toLowerCase()));
    },
    dateString() {
      return new Date().getTime();
    },
  },
  mounted() {
    // Sort notes by date
    this.notes.collection.sort((a, b) => (a.date > b.date ? 1 : b.date > a.date ? -1 : 0));
    window.addEventListener("keydown", this.searchListener);
  },
  methods: {
    searchListener: function(e) {
      // Opening / Closing searchlight
      if (e.metaKey && e.key === "k") {
        this.spotlight = !this.spotlight;

        if (this.spotlight) {
          this.$nextTick(() => {
            this.$refs.spotlightSearch.focus();
          });
        }
      }

      if (this.spotlight) {
        // Down arrow
        if (e.key === "ArrowDown") {
          this.selectedIndex = (this.selectedIndex + 1) % this.filteredNotes.length;
          this.$nextTick(() => {
            let selected = document.querySelector(".spotlight-active");
            selected.scrollIntoView({ behavior: "auto", block: "end", inline: "nearest" });
          });
          return true;
        }

        // Up arrow
        if (e.key === "ArrowUp") {
          this.selectedIndex = (this.selectedIndex + this.filteredNotes.length - 1) % this.filteredNotes.length;
          e.preventDefault();

          this.$nextTick(() => {
            let selected = document.querySelector(".spotlight-active");
            selected.scrollIntoView({ behavior: "auto", block: "end", inline: "nearest" });
          });
          return true;
        }

        // Enter
        if (e.key === "Enter") {
          let note = this.filteredNotes[this.selectedIndex];
          this.loadNote(note);
          this.spotlight = false;
          this.search = "";
          return true;
        }

        // Esc
        if (e.key === "Escape") {
          this.spotlight = false;
          this.search = "";
          return true;
        }
      }
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

    loadNote: function(note) {
      this.notes.currentId = note.id;
      this.$emit("updateNotes", this.notes);
    },

    pinNote: function(note) {
      note.pinned = !note.pinned;
      this.$emit("updateNotes", this.notes);
    },

    updateClockTimer: function(selection) {
      this.settings.timerClock = selection;
      this.$emit("updateSettings", this.settings);
    },
    removeHTML(note) {
      let content = note.replace(/(<([^>]+)>)/gi, " ");
      if (content.split(" ").join("") !== "") {
        return content;
      } else {
        return "Blank note";
      }
    },
  },
};
</script>

<style scoped>
#spotlight {
  width: 700px;
}

.searchItem {
  height: 80px !important;
}

.searchIcon {
  width: 24px !important;
  height: auto !important;
  color: #ff5c5c;
}

.spotlight-active {
  background-color: #ff5c5c;
  color: white;
}

.notelist {
  padding-left: 1px;
}

.focus-border {
  height: 1px;
  transition: all cubic-bezier(0.4, 0, 0.2, 1) 150ms;
}

#searchNotes:focus ~ .focus-border {
  width: 100%;
  transition: all cubic-bezier(0.4, 0, 0.2, 1) 150ms;
}

.note-single {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 3.2rem;
}

.activeNote {
  border-left: 1px #ff5c5c solid;
  margin-left: -1px;
}

.note-single:hover {
  cursor: pointer;
}

.note-single:hover svg {
  opacity: 1;
}

.timer-alert {
  opacity: 0;
}

.pinned {
  color: #ff5c5c !important;
  opacity: 0.5;
}

#createNote {
  position: relative;
  width: auto !important;
  height: 18px !important;
  bottom: -10px;
  padding-left: 8px;
}

#createNote:hover {
  color: #ff5c5c !important;
  opacity: 1;
  cursor: pointer;
}

.clockIcon {
  height: 18px;
  width: auto;
  margin: 6px;
  display: none;
}

#clockTimer:hover .clockIcon {
  opacity: 0.4;
}

#clockTimer:hover #clockIconMenu {
  z-index: 50;
  /* margin-left: 16px; */
  width: 200px;
}

#clockIconMenu:hover .clockIcon {
  display: inline;
}

.clockIcon:hover {
  opacity: 1 !important;
  cursor: pointer;
}

.activeClockTimer {
  display: inline;
}
#clockIconMenu:hover .activeClockTimer {
  color: #ff5c5c;
}
</style>
