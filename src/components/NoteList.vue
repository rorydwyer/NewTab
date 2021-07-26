<template>
  <div class="px-4 pb-4 flex flex-col">
    <div class="notelist flex-grow overflow-y-scroll pr-4">
      <div class="flex mb-4">
        <input
          v-model="search"
          type="text"
          name="search"
          id="searchNotes"
          placeholder="Search..."
          class="flex-grow focus:outline-none bg-transparent border-b text-sm border-gray-300 p-1 mr-1"
        />
        <button v-on:click="createNote()" class="border border-gray-300 rounded w-8 hover:bg-gray-200">+</button>
      </div>
      <div>
        <ul>
          <li
            v-for="note in filteredNotes"
            :key="note.id"
            v-on:click="loadNote(note)"
            v-bind:class="{ activeNote: currentNote.id == note.id }"
            class="bg-gray-50 hover:bg-gray-100 dark:bg-opacity-10 dark:text-white text-sm my-2 p-2 text-gray-600 note-single"
          >
            {{ note.content || "Empty note" }}
          </li>
        </ul>
      </div>
    </div>
    <div v-if="newTabSettings.toggleTimer" class="timer">
      <input
        class="w-full text-7xl text-gray-400 focus:outline-none text-center bg-transparent"
        ref="timer"
        v-model="timer"
        type="text"
        id="timer"
        @keypress="timerInput"
        v-on:click="clearTime"
        v-on:blur="timerBlur"
      />
      <button v-on:click="startTimer" class="w-full py-1 border border-gray-300 rounded hover:bg-gray-200 text-sm text-center">
        <span v-if="timerOn">Stop Timer</span>
        <span v-else>Start Timer</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    currentNote: {
      content: String,
      id: Number,
    },
    notes: Array,
    newTabSettings: Object,
  },
  data() {
    return {
      search: "",
      timer: "25:00",
      timerSet: true,
      timerOn: false,
      timerOver: false,
    };
  },
  computed: {
    filteredNotes() {
      return this.notes.filter((note) => note.content.toLowerCase().includes(this.search.toLowerCase()));
    },
  },
  mounted() {
    this.notes.sort((a, b) => (a.date > b.date ? 1 : b.date > a.date ? -1 : 0));
    // console.log("timer: " + this.newTabSettings.timerDefault);
    // this.timer = this.newTabSettings.timerDefault;
  },
  methods: {
    // Notelist Methods
    createNote: function() {
      this.$emit("createNote");
    },

    loadNote: function(note) {
      this.notes.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
      this.$emit("loadNote", note);
    },

    getTime: function() {
      const d = new Date();
      const date = d.toISOString().split("T")[0];
      const time = d.toTimeString().split(" ")[0];
      return `${date}${time}`;
    },

    // Timer Methods #################################
    clearTime: function() {
      if (this.timerSet) {
        this.timer = "";
        this.timerOn = false;
        this.timerSet = false;
      }
    },

    timerInput: function(e) {
      if ((e.charCode == 8 && e.charCode != 0) || !(e.charCode >= 48 && e.charCode <= 57) || this.timer.length == 2) {
        // if number, backspace or arrows
        e.preventDefault();
      }
    },

    timerBlur: function() {
      if (this.timer == "") {
        this.timer = "25:00";
        this.timerSet = true;
      } else if (!this.timer.includes(":")) {
        this.timer += ":00";
      }
    },

    startTimer: function() {
      if (this.timerOver) {
        this.timer = "25:00";
        this.timerOver = false;
      }

      this.timerOn = !this.timerOn;
      this.timerSet = true;

      if (this.timerOn) {
        //check this.timer for validation
        let minutes = this.timer.split(":")[0];
        let seconds = this.timer.split(":")[1];

        let timer = setInterval(() => {
          if (this.timerOn) {
            if (seconds != 0) {
              seconds--;
              seconds = seconds.toString().padStart(2, "0");
            } else if (minutes != 0) {
              minutes--;
              seconds = "59";
            } else if (seconds == 0 && minutes == 0) {
              // If timer is over
              this.timerDone();
            }
            this.timer = `${minutes}:${seconds}`;
          } else {
            clearInterval(timer);
          }
        }, 1000);
      }
    },

    timerDone: function() {
      let audio = new Audio("/timer.mp3");
      audio.play();

      let alertLength = 0;
      document.querySelector("#timer").classList.toggle("timer-alert");
      let alert = setInterval(() => {
        document.querySelector("#timer").classList.toggle("timer-alert");
        alertLength++;
        if (alertLength >= 5) {
          clearInterval(alert);
        }
      }, 800);

      this.timerOn = false;
      this.timerOver = true;
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

.timer-alert {
  opacity: 0;
}
</style>
