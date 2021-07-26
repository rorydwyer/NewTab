<template>
  <div id="main" class="main grid grid-cols-12 gap-12 h-screen max-h-screen overflow-hidden dark:bg-gray-800 dark:text-white relative">
    <NoteList :notes="notes" :settings="settings" @loadNote="loadNote($event)" @createNote="createNote()" class="col-span-3 h-screen pt-8 max-h-screen" />

    <Note :notes="notes" :settings="settings" class="col-span-6 h-screen pt-8 max-h-screen" />

    <Todo :todos="todos" :settings="settings" @settings="showSettings = !showSettings" class="col-span-3 h-screen pt-8 max-h-screen" />

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
      notes: {
        collection: [
          {
            id: 0,
            date: new Date(),
            content: "# Your First Note!",
          },
        ], // All Notes
        current: {
          content: "",
          id: 0,
          date: new Date(),
        },
        nextId: 0, // Next Note ID
      },
      todos: {
        collection: [], // All To do items
        newText: "", // Text binded to new to do input
        nextId: 0, // Next To do ID
      },
      settings: {},
      showSettings: 0,
    };
  },
  computed: {
    toggleSettings: function() {
      return this.showSettings ? "right-0" : "-right-1/4";
    },
  },
  mounted() {},
  methods: {},
};
</script>

<style>
#main {
  /* background: linear-gradient(0deg, rgba(31, 41, 55, 0.9), rgba(31, 41, 55, 0.9)), url("https://source.unsplash.com/daily?nature"); */
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
