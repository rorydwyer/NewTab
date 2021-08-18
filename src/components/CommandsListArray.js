exports.array = [
  {
    title: "Heading 1",
    icon: "heading",
    pBefore: "# ",
    pAfter: "",
    shortcut: ["cmd", "opt", "1"],
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleHeading({ level: 1 })
        .run();
    },
  },
  {
    title: "Heading 2",
    icon: "heading",
    pBefore: "## ",
    pAfter: "",
    shortcut: ["cmd", "opt", "2"],
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleHeading({ level: 2 })
        .run();
    },
  },
  {
    title: "Heading 3",
    icon: "heading",
    pBefore: "### ",
    pAfter: "",
    shortcut: ["cmd", "opt", "3"],
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleHeading({ level: 3 })
        .run();
    },
  },
  {
    title: "Separator",
    icon: "grip-lines",
    pBefore: "--- ",
    pAfter: "",
    shortcut: ["", "", ""],
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setHorizontalRule()
        .run();
    },
  },
  {
    title: "Bold",
    icon: "bold",
    pBefore: "**",
    pAfter: "**",
    shortcut: ["cmd", "", "B"],
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleBold()
        .run();
    },
  },
  {
    title: "Italic",
    icon: "italic",
    pBefore: "*",
    pAfter: "*",
    shortcut: ["cmd", "", "I"],
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleItalic()
        .run();
    },
  },
  {
    title: "Underline",
    icon: "underline",
    pBefore: "~",
    pAfter: "~",
    shortcut: ["cmd", "", "U"],
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleUnderline()
        .run();
    },
  },
  {
    title: "Strike",
    icon: "strikethrough",
    pBefore: "~~",
    pAfter: "~~",
    shortcut: ["cmd", "shift", "X"],
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleStrike()
        .run();
    },
  },
  {
    title: "Highlight",
    icon: "highlighter",
    pBefore: "==",
    pAfter: "==",
    shortcut: ["cmd", "shift", "H"],
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleHighlight({
          color: "",
        })
        .run();
    },
  },
  {
    title: "Code",
    icon: "code",
    pBefore: "`",
    pAfter: "`",
    shortcut: ["cmd", "", "E"],
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleCode()
        .run();
    },
  },
  {
    title: "Codeblock",
    icon: "file-code",
    pBefore: "```",
    pAfter: "",
    shortcut: ["cmd", "opt", "C"],
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleCodeBlock()
        .run();
    },
  },
  {
    title: "Ordered List",
    icon: "list-ol",
    pBefore: "1. ",
    pAfter: "",
    shortcut: ["cmd", "shift", "7"],
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleOrderedList()
        .run();
    },
  },
  {
    title: "List",
    icon: "list-ul",
    pBefore: "* ",
    pAfter: "",
    shortcut: ["cmd", "shift", "8"],
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleBulletList()
        .run();
    },
  },
  {
    title: "To do",
    icon: "check-square",
    pBefore: "[ ] ",
    pAfter: "",
    shortcut: ["cmd", "shift", "9"],
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleTaskList()
        .run();
    },
  },
  {
    title: "BlockQuote",
    icon: "quote-left",
    pBefore: "> ",
    pAfter: "",
    shortcut: ["cmd", "shift", "B"],
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleBlockquote()
        .run();
    },
  },
  {
    title: "Image",
    icon: "image",
    pBefore: "url",
    pAfter: "",
    shortcut: ["", "", ""],
    command: ({ editor, range }) => {
      const url = window.prompt("URL");
      if (url) {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setImage({ src: url })
          .run();
      }
    },
  },
  {
    title: "Link",
    icon: "link",
    pBefore: "url",
    pAfter: "",
    shortcut: ["", "", ""],
    command: ({ editor, range }) => {
      const url = window.prompt("URL");
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    },
  },
];
