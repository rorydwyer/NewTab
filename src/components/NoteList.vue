<template>
  <div class="px-4 pb-4 flex flex-col">
    <div class="notelist flex-grow overflow-y-scroll">
      <div class="flex mb-4">
        <div class="flex-grow relative">
          <input
            v-model="search"
            type="text"
            name="search"
            id="searchNotes"
            placeholder="Search notes..."
            class="w-full focus:outline-none bg-transparent border-b text-sm border-gray-400 dark:border-gray-500 p-1 mr-1"
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
        <ul>
          <transition-group name="flip-list" tag="ul">
            <li
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
              {{ note.content || "Empty note" }}
            </li>
          </transition-group>
        </ul>
      </div>
    </div>
    <div id="clockTimer" class="relative" v-if="settings.timerClock">
      <div id="clockIconMenu" class="absolute -bottom-2 left-full w-0 pl-4">
        <font-awesome-icon
          :icon="['far', 'clock']"
          title="Clock"
          class="clockIcon transition-all opacity-0 w-0 text-gray-500 dark:text-gray-300"
          v-bind:class="{ activeClockTimer: settings.timerClock == 'clock' }"
          v-on:click="updateClockTimer('clock')"
        />
        <font-awesome-icon
          :icon="['fas', 'stopwatch']"
          title="Stopwatch"
          class="clockIcon transition-all opacity-0 w-0 text-gray-500 dark:text-gray-300"
          v-bind:class="{ activeClockTimer: settings.timerClock == 'stopwatch' }"
          v-on:click="updateClockTimer('stopwatch')"
        />
        <font-awesome-icon
          :icon="['fas', 'hourglass-start']"
          title="Timer"
          class="clockIcon transition-all opacity-0 w-0 text-gray-500 dark:text-gray-300"
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
import { faStar, faStopwatch, faHourglassStart } from "@fortawesome/free-solid-svg-icons";
import { faEdit, faClock } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(faStar, faEdit, faClock, faStopwatch, faHourglassStart);

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
  },
  methods: {
    createNote: function() {
      this.notes.newId++;
      this.notes.currentId = this.notes.newId;
      this.notes.collection.unshift({
        id: this.notes.newId,
        content: "",
        date: new Date().getTime(),
        pinned: false,
      });

      this.$emit("updateNotes", { notes: this.notes, load: true });
    },

    loadNote: function(note) {
      this.notes.currentId = note.id;
      this.$emit("updateNotes", { notes: this.notes, load: true });
    },
    pinNote: function(note) {
      note.pinned = !note.pinned;
      this.$emit("updateNotes", { notes: this.notes, load: true });
    },

    updateClockTimer: function(selection) {
      this.settings.timerClock = selection;
      this.$emit("updateSettings", this.settings);
    },
  },
};
</script>

<style scoped>
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
