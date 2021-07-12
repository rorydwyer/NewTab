<template>
<div class="main grid grid-cols-10 gap-4 h-screen max-h-screen overflow-hidden">
    
    <NoteList :currentNote="currentNote" :allNotes="placeholderNotes" @loadNote="loadNote($event)" @createNote="createNote()" class="col-span-2 h-screen pt-8 max-h-screen"/> 
    
    <div class="col-span-6 h-screen pt-8 max-h-screen">
        <div class="pb-4 h-full flex flex-col">
        <vue-simplemde  class="flex-grow" v-model="currentNote.content"  ref="markdownEditor" :configs="configs" />
        <div class="flex">
            <div class="flex-grow">
                <button class="text-sm underline" v-on:click="formatNote()">Format</button>
            </div>
            <div>
                <button class="text-sm underline hover:text-red-600" v-on:click="deleteNote()" >Delete</button>
            </div>
        </div>
      </div>
    </div>

    <Todo class="col-span-2 h-screen pt-8 max-h-screen"/>

  </div>

</template>

<script>

// import HelloWorld from '@/components/HelloWorld.vue'
import NoteList from '@/components/NoteList.vue'
import Todo from '@/components/Todo.vue'
import "tailwindcss/tailwind.css"
import VueSimplemde from 'vue-simplemde'


export default {
  name: 'app',
  components: {
    NoteList, Todo, VueSimplemde
  },
  data() {
      return {
          currentNote: {
            content: '',
            id: null,
            date: new Date(),
          },
          configs: {
              status: false,
              spellChecker: false, // disable spell check
              toolbar: ['heading-1', 'heading-2', 'heading-3', 'horizontal-rule', '|',  'bold', 'italic', 'strikethrough', '|', 'unordered-list', 'ordered-list', 'quote', 'link', 'image', 'code'],
          },
          placeholderNotes: [
                                {
                                    "id": 0,
                                    "date": "Fri Jul 09 2021 09:26:06 GMT-0700 (Pacific Daylight Time)",
                                    "content": "# First Note!"
                                },
                                {
                                    "id": 1,
                                    "date": "Fri Jul 09 2021 09:26:21 GMT-0700 (Pacific Daylight Time)",
                                    "content": "Hello World"
                                },
                                {
                                    "id": 2,
                                    "date": "Fri Jul 09 2021 09:26:37 GMT-0700 (Pacific Daylight Time)",
                                    "content": "Foo bar"
                                }
          ],
          nextNoteId: 3,
      };
    },
    computed: {
        simplemde() {
            return this.$refs.markdownEditor.simplemde;
        },
    },
    mounted() {
        //this.currentNote = JSON.parse(localStorage.getItem('myNote')) || { content: '# NextTab', id: 1, }; //Loads current note
        this.currentNote = this.placeholderNotes[0];
        document.querySelector('.editor-toolbar').classList.add('hide-toolbar');

        this.simplemde.codemirror.on('change', () => {
            // localStorage.setItem('myNote', JSON.stringify(this.currentNote)); // Saves content on input
            //console.log(this.currentNote);
        });
    },
    methods: {
      loadNote: function(note) {
        this.currentNote = note;
        this.simplemde.value(this.currentNote.content);
      },

      createNote: function() {
        this.placeholderNotes.unshift({
                  id: this.nextNoteId++,
                  content: 'New note',
                  date: new Date(),
                });
        this.loadNote(this.placeholderNotes[0]);
      },

      formatNote: function() {
        document.querySelector('.editor-toolbar').classList.toggle('hide-toolbar');
      },

      deleteNote: function() {
        if (this.placeholderNotes.length > 1) {
          this.placeholderNotes.splice(this.placeholderNotes.findIndex(note => note.id === this.currentNote.id), 1);
          this.loadNote(this.placeholderNotes[0]);
        } else {
          alert("You can't delete your only note.")
        }
      },
    }
};
</script>

<style>
    @import '~simplemde/dist/simplemde.min.css';
    .main {
      background: linear-gradient(0deg, rgba(255, 255, 255, 0.85), rgba(255, 255, 255, .95)), url('/background.jpg');
      background-size: cover;
    }

    .CodeMirror, .editor-toolbar {
        border: none !important;
        background: transparent;
    }

    .CodeMirror {
        height: 88vh;
        max-height: 88vh;
        padding-top: 0;
        font-size: 1rem;
        /* overflow: scr; */
    }

    .vue-simplemde {
      position: relative;
    }

    .editor-toolbar {
      z-index: 999;
      position: absolute;
      bottom: 0.8rem;
      width: 100%;
      text-align: center;
      border-radius: 3px;
      box-shadow: 0px 2px 5px rgba(0, 0, 0, .5);
      opacity: 1;
      background-color: #fff;
      display: block;
    }

    .editor-toolbar:hover {
      background-color: #fff;
      opacity: 1;
    }

    .hide-toolbar {
      opacity: 0;
      transition: opacity .2s;
      display: none;
    }

    .hide-toolbar:hover {
      opacity: 0 !important;
    }

    .cm-formatting {
      color: #dd4c50;
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