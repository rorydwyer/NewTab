<template>
  <div v-if="settings.todo" class="flex flex-col max-h-full h-full prose prose-sm">
    <div class="w-full relative mb-2">
      <input
        v-on:keyup.enter="addTodo"
        v-on:keyup.down="editRecent"
        v-on:keyup.up="editRecent"
        v-model="todos.newText"
        ref="todoInput"
        type="text"
        id="newTodo"
        placeholder="Create new to do item..."
        class="w-full focus:outline-none bg-transparent text-sm border-b  border-gray-400 dark:border-gray-500 p-1"
      />
      <span class="focus-border absolute left-0 bottom-0 w-0 bg-gray-800 dark:bg-gray-200 transition"></span>
    </div>
    <draggable v-model="todos.collection" @end="moveTodo()" class="flex-grow h-full draggable overflow-y-auto overflow-x-hidden">
      <transition-group name="flip-list" class="h-full">
        <div v-for="(todo, index) in todos.collection" :key="todo.id" class="todo-item my-2 flex relative">
          <input v-if="!todo.edit" class="checkbox relative" type="checkbox" v-on:click="deleteTodo(index)" />
          <span v-if="!todo.edit" class="todoContent ml-3 text-sm flex-grow" @dblclick="edit(todo)">{{ todo.content }}</span>
          <input
            v-bind:id="'todo-' + todo.id"
            v-else
            class="todoContent w-full focus:outline-none bg-transparent text-sm border rounded pl-1 border-gray-400 dark:border-gray-500"
            type="text"
            v-model="todo.content"
            @keyup.enter="saveEdit(todo)"
            @blur="saveEdit(todo)"
          />
        </div>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  components: {
    draggable,
  },
  data() {
    return {
      recentTodo: false,
    };
  },
  props: {
    todos: Object,
    settings: Object,
  },
  methods: {
    edit: function(todo) {
      todo.edit = true;
      let ref = "todo-" + todo.id;

      this.$nextTick(() => {
        document.getElementById(ref).focus();
      });
    },

    saveEdit: function(todo) {
      todo.edit = false;
      this.$emit("updateTodos", this.todos);
    },

    editRecent: function() {
      let note = this.todos.collection[0];
      if (this.recentTodo) {
        let input = document.getElementById("newTodo");
        input.value = note.content;
        input.dispatchEvent(new Event("input"));
        this.deleteTodo(0);
      }
      this.recentTodo = false;
    },

    addTodo: function() {
      if (this.todos.newText.length > 0) {
        this.todos.newId++;
        this.todos.collection.unshift({
          id: this.todos.newId,
          content: this.todos.newText,
          edit: false,
        });

        this.todos.newText = "";
        this.recentTodo = true;
        this.$emit("updateTodos", this.todos);
      }
    },

    deleteTodo: function(index) {
      this.todos.collection.splice(index, 1);
      this.recentTodo = false;
      this.$emit("updateTodos", this.todos);
    },

    moveTodo: function() {
      this.recentTodo = false;
      this.$emit("updateTodos", this.todos);
    },
  },
};
</script>

<style scoped>
.todo-item > span {
  cursor: move; /* fallback if grab cursor is unsupported */
  cursor: grab;
  cursor: -moz-grab;
  cursor: -webkit-grab;
}

.checkbox {
  bottom: -2px;
}

.todo-item > input {
  cursor: pointer;
}

.sortable-chosen {
  background-color: #ddd;
  opacity: 0.5;
  padding: 2px;
  margin-bottom: -4px !important;
  color: black !important;
  border-radius: 2px;
}

.sortable-chosen:hover {
  cursor: grabbing !important;
  cursor: -moz-grabbing;
  cursor: -webkit-grabbing;
}

.draggable:active,
.todo-item:active {
  cursor: grabbing !important;
  cursor: -moz-grabbing;
  cursor: -webkit-grabbing;
}

.focus-border {
  height: 1px;
  transition: all cubic-bezier(0.4, 0, 0.2, 1) 150ms;
}

#newTodo:focus ~ .focus-border {
  width: 100%;
  transition: all cubic-bezier(0.4, 0, 0.2, 1) 150ms;
}

.todoContent:first-letter {
  text-transform: uppercase;
}
</style>
