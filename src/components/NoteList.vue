<template>
  <div class="px-4 pb-4 flex flex-col">
    <div class="notelist flex-grow overflow-y-scroll">
      <div class="flex mb-4">
        <input
          v-model="search"
          type="text"
          name="search"
          id="searchNotes"
          placeholder="Search notes..."
          class="flex-grow focus:outline-none bg-transparent border-b text-sm border-gray-400 dark:border-gray-500 p-1 mr-1"
        />
        <button
          v-on:click="createNote()"
          class="border border-gray-400 dark:border-gray-500 rounded w-8 hover:bg-gray-400 hover:dark:bg-gray-100 hover:bg-opacity-10 text-gray-600 dark:text-gray-300"
        >
          +
        </button>
      </div>
      <div>
        <ul>
          <li
            v-for="note in filteredNotes"
            :key="note.id"
            v-on:click="loadNote(note)"
            v-bind:class="{ activeNote: notes.currentId == note.id }"
            class="bg-gray-400 hover:bg-opacity-20 bg-opacity-10 dark:text-gray-300 text-sm my-2 p-2 text-gray-600 note-single relative"
          >
            <font-awesome-icon
              icon="star"
              class="absolute top-1 right-1 opacity-0 transition text-gray-300 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-100 w-3 h-3"
              v-bind:class="{ pinned: note.pinned }"
              v-on:click="pinNote(note)"
            />
            {{ note.content || "Empty note" }}
          </li>
        </ul>
      </div>
    </div>
    <div v-if="settings.timerClock">
      <Timer :settings="settings" v-if="settings.timerClock == 'timer'" />
      <Clock v-if="settings.timerClock == 'clock'" />
    </div>
  </div>
</template>

<script>
import Timer from "@/components/Timer.vue";
import Clock from "@/components/Clock.vue";

import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(faStar);

export default {
  components: {
    Timer,
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
  },
};
</script>

<style scoped>
.notelist {
  padding-left: 1px;
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
</style>
