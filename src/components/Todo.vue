<template>
  <div class="px-4 pb-4">
    <input
      v-on:keyup.enter="addNewTodo"
      v-model="newTodoText"
      type="text"
      id="newTodo"
      placeholder="Create new to do item..."
      class="w-full focus:outline-none bg-transparent text-sm border rounded border-gray-300 p-1 mb-1"
    />
    <draggable v-model="todos" @end="onEnd()">
      <div v-for="(todo, index) in todos" :key="todo.id">
        <input type="checkbox" v-on:click="removeTodo(index)" />
        <span class="text-sm">{{ todo.todo }}</span>
      </div>
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
      todos: [],
      nextTodoId: 3,
      newTodoText: "",
    };
  },

  mounted() {
    chrome.storage.sync.get("newtabToDos", (res) => {
      if (!res.newtabToDos) res.newtabToDos = [];
      chrome.storage.sync.set(res);
      this.todos = res.newtabToDos;
    });
  },
  methods: {
    addNewTodo: function() {
      chrome.storage.sync.get("newtabToDos", (res) => {
        res.newtabToDos.unshift({
          id: this.nextTodoId++,
          todo: this.newTodoText,
          done: false,
        });
        chrome.storage.sync.set(res);
        this.todos = res.newtabToDos;
        this.newTodoText = "";
      });
    },
    onEnd: function() {
      chrome.storage.sync.get("newtabTodos", (res) => {
        res.newtabToDos = this.todos;
        chrome.storage.sync.set(res);
      });
    },
    removeTodo: function(index) {
      chrome.storage.sync.get("newtabToDos", (res) => {
        res.newtabToDos.splice(index, 1);
        chrome.storage.sync.set(res);
        this.todos = res.newtabToDos;
      });
    },
  },
};
// { id: 0, todo: 'To do item one', done: false },
//                 { id: 1, todo: 'To do item two', done: false },
//                 { id: 2, todo: 'To do item three', done: true }
</script>

<style scoped>
.sortable-drag {
  background-color: #fff;
}
</style>
