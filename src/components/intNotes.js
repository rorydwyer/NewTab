export const array = [
  `<h1>Welcome to #NewTab!</h1>
  <img src="https://rory-dwyer.com/wp-content/uploads/2021/08/NewTab-image.png" contenteditable="false" draggable="true" />
  <p>
    #NewTab is a truly minimal, and elegant <strong>markdown</strong> editor with a <em>seamless</em> experience as both a reader and a writer. It removes the
    preview window, syntax symbols of markdown, and all other unnecessary distractions. Instead, #NewTab provides a live preview while you’re writing to help you
    focus on the content itself.
  </p>
  <p><strong>Here are the best parts of #NewTab:</strong></p>
  <ul>
    <li>
      <p>
        <a target="_blank" rel="noopener noreferrer nofollow" href="https://www.markdownguide.org/">Markdown syntax</a> and extra tools, including code blocks,
        lists, images, and more.
      </p>
    </li>
    <li>
      <p>A <em>real</em> live preview. No more switching between preview and editing windows.</p>
    </li>
    <li><p>Notes and to do items sync between tabs.</p></li>
    <li><p>No more manual save, everything is auto-saved in the background.</p></li>
    <li><p>Dark theme and background images for full customization.</p></li>
    <li>
      <p>Command menu <code>/</code> for fast formatting to keep you right at the keyboard.</p>
    </li>
    <li><p>Focus timer, stopwatch and clock for increased productivity.</p></li>
  </ul>
  <p><br /></p>
  <h2>#NewTab has 5 parts 💻</h2>
  <img src="https://rory-dwyer.com/wp-content/uploads/2021/08/NewTab-image-2.png" contenteditable="false" draggable="true" />
  <p>#NewTab has 5 main components where you create and edit notes, add to do items, set your focus timer, and view inspirational quotes.</p>
  <ol>
    <li>
      <p><strong>Editor</strong>: (center) What you’re looking at right now.</p>
    </li>
    <li>
      <p><strong>Note list</strong>: (left sidebar) This is where all your notes live.</p>
    </li>
    <li>
      <p><strong>Clock</strong>: (bottom left) Keep track of time.</p>
    </li>
    <li>
      <p><strong>To do</strong>: (right sidebar) Add your list of tasks you need to accomplish.</p>
    </li>
    <li>
      <p><strong>Quote</strong>: (bottom right) Inspiration throughout your day.</p>
    </li>
  </ol>
  <p><br /></p>
  <h2>#NewTab has style 🖋</h2>
  <p>
    #NewTab has many type styling tools, including: <strong>bold</strong>, <em>italic</em>, <u>underline</u>, <mark>highlight</mark>, <s>strike</s>,
    <code>code</code>, and more. You can find shortcuts for them in the formatting menu (below), or in the <code>/</code> command menu.
  </p>
  <p>You can view all the styles, and examples in the <strong>Tips ‘n Tricks,</strong> and <strong>Formatting Examples</strong> note.</p>
  <p><br /></p>
  <h2>Customizable settings ⚙️</h2>
  <p>
    #NewTab keeps your editor lean and mean. Designed to be a truly minimal experience, it’s also equipped with extensive customization to tailor exactly to your
    needs. Whether #NewTab is a minimal editor, or vibrant and full of color is up to you.
  </p>
  <ul>
    <li>
      <p>Show or hide <strong>individual components</strong>.</p>
    </li>
    <li>
      <p>Create your own theme with <strong>Dark mode</strong> and <strong>Image backgrounds</strong>.</p>
    </li>
    <li><p>Load recent or new, empty notes when opening a #NewTab</p></li>
  </ul>
  `,
  `<h1>Tips ‘n Tricks</h1>
    <hr contenteditable="false" />
    <h2>Editor</h2>
    <p><strong>Markdown</strong></p>
    <p>Markdown shortcuts make it easy to format the text while typing.</p>
    <p>
      To test that, start a new line and type <code>#</code> followed by a space to get a heading. Try <code>#</code>, <code>##</code>, <code>###</code>,
      <code>####</code> for different levels.
    </p>
    <p>
      Format text quickly. Be sure to check out <code>**bold**</code> <strong>bold</strong>, <code>*italic*</code> <em>italic</em>, and <code>~underline~</code>
      <u>underline</u>.
    </p>
    <p>
      Try <code>&gt;</code> for block-quotes, <code>*</code>, <code>-</code> or <code>+</code> for bullet lists, or <code>~~strike~~</code> to <s>strike text</s>,
      or <code>==highlight==</code> to <mark>highlight text</mark>.
    </p>
    <p>Include a code snippet with <code>code</code> , or create a code block by typing <strong>\`\`\` </strong>followed by a space.</p>
    <pre><code>for (let step = 0; step &lt; 5; step++) {
        // Runs 5 times, with values of step 0 through 4.
        console.log('Walking east one step');
      }
      
      // Press Cmd/Ctrl + Enter to leave the code block</code></pre>
    <p>
      Try typing <code>(c)</code> to see how it’s converted to a proper © character. You can also try <code>-&gt;</code>, <code>&gt;&gt;</code>, <code>1/2</code>,
      <code>!=</code>, or <code>--</code>.
    </p>
    <p><br /></p>
    <p><strong>Menus</strong></p>
    <p>There are three formatting menus included in #NewTab.</p>
    <ol>
      <li>
        <p>Your <strong>main</strong> formatting menu the bottom-right of the editor.</p>
      </li>
      <li>
        <p>A <strong>Select</strong> menu. Try selecting <em>this text</em> to have it appear.</p>
      </li>
      <li>
        <p>The <strong>command</strong> menu is activated when you type <code>/</code> .</p>
      </li>
    </ol>
    <p><br /></p>
    <p><strong>Images</strong></p>
    <p>Images are easy to add, but they must already be hosted on the inter-webs. You can <em>reorder</em> images by dragging them.</p>
    <img src="https://source.unsplash.com/8xznAGy4HcY/800x400" contenteditable="false" draggable="true" /><img
      src="https://source.unsplash.com/K9QHL52rE2k/800x400"
      contenteditable="false"
      draggable="true"
    />
    <p><br /></p>
    <p><strong>Paragraph alignment</strong></p>
    <p>By default, text is left aligned.</p>
    <p style="text-align: center">You can center align using the <em>select menu, </em><br /><em>or </em><code>Cmd/Ctrl + Shift + E</code><em>.</em></p>
    <p style="text-align: right">Right align is also an option.</p>
    <p style="text-align: right"><br /></p>
    <p><strong>Note to do items</strong></p>
    <ul data-type="taskList">
      <li data-checked="false">
        <label contenteditable="false"><input type="checkbox"/><span></span></label>
        <div><p>Adding to do items to individual notes is easy</p></div>
      </li>
      <li data-checked="false">
        <label contenteditable="false"><input type="checkbox"/><span></span></label>
        <div>
          <p>Type <code>[ ]</code></p>
        </div>
      </li>
      <li data-checked="false">
        <label contenteditable="false"><input type="checkbox"/><span></span></label>
        <div>
          <p>You can also use the <code>/</code> command menu</p>
        </div>
      </li>
    </ul>
    <hr contenteditable="false" />
    <h2>Note list</h2>
    <p>The left sidebar is where all your notes live. Notes are sorted by <em>most recently edited</em>.</p>
    <ul>
      <li>
        <p><strong>Pin notes</strong> to the top of the list by starring them ⭐️.</p>
      </li>
      <li>
        <p>For a <strong>truly minimal experienc</strong>e, you can hide the note list in settings.</p>
      </li>
      <li>
        <p>Use <code>Cmd/Ctrl + K</code> to focus / pull up the <strong>search bar</strong>.</p>
      </li>
      <li>
        <p><strong>Delete</strong> notes by double clicking the trash button in the bottom-right corner of the note editor.</p>
      </li>
      <li>
        <p>View <strong>trash notes</strong> by going to <em>Settings</em> → <em>Note Editor</em> →<em> View Trash</em>.</p>
      </li>
    </ul>
    <hr contenteditable="false" />
    <h2>To do</h2>
    <p>Add a list of to do items to stay productive and on track during your day.</p>
    <ul>
      <li>
        <p>Press <code>Up Arrow</code> or <code>Down Arrow</code> to <strong>edit a recently added</strong> to do item.</p>
      </li>
      <li>
        <p><strong>Edit</strong> any to do item by double clicking it.</p>
      </li>
      <li>
        <p><strong>Rearrange</strong> your list by dragging to do items.</p>
      </li>
    </ul>
    <hr contenteditable="false" />
    <h2>Clock</h2>
    <p>
      Switch quickly between the <em>clock</em>, <em>stopwatch</em>, and <em>timer</em> by hovering over the clock, and using the hot select menu. When using
      <em>stopwatch</em> and <em>timer</em>, it will also be displayed in the tab title.
    </p>
    <p><strong>Clock</strong>:<strong> </strong>Easily see what time it is. ‘Nuff said.</p>
    <p><strong>Stopwatch</strong>: Start, stop and reset the stopwatch. Easy peasy.</p>
    <p>
      <strong>Timer</strong>:<strong> </strong>Get your
      <a target="_blank" rel="noopener noreferrer nofollow" href="https://lifehacker.com/productivity-101-a-primer-to-the-pomodoro-technique-1598992730"
        >pomodoro technique</a
      >
      on using the focus timer. Change it by clicking the timer, or set a new default countdown in the settings menu.
    </p>
    <p>
      <strong><u>How to use the pomodoro / focus timer method:</u></strong>
    </p>
    <ol>
      <li><p>Create a to do list ordered by importance.</p></li>
      <li><p>Set a timer for 25:00 minutes.</p></li>
      <li><p>Work on tasks for the duration of the timer.</p></li>
      <li><p>Take a 5:00 minute break.</p></li>
      <li><p>After x4 sets, take a 15:00 to 30:00 minute break.</p></li>
    </ol>
    <p><br /></p>
    <hr contenteditable="false" />
    <h2>Theme</h2>
    <p>
      #NewTab is designed to be fully customizable. Whether you want a bare #NewTab with a blank background, or an inspirational #NewTab with daily wallpapers and
      quotes is fully up to you.
    </p>
    <ul>
      <li>
        <p><strong>Light</strong> and <strong>Dark</strong> mode.</p>
      </li>
      <li>
        <p>
          Toggle <strong>background images</strong> in settings, and change the <strong>theme</strong> to whatever your heart desires. Images are royalty free and
          pulled from <a target="_blank" rel="noopener noreferrer nofollow" href="https://unsplash.com/">Unsplash.com</a>.
        </p>
      </li>
      <li>
        <p>You can change the <strong>background image opacity </strong>for the best contrast, or most picture clarity.</p>
      </li>
    </ul>
    <p><br /></p>
    <p><strong>Pro tips</strong></p>
    <p>
      <strong>Light mode</strong> is best with no background image. Embrace the minimalistic approach by hiding the note list, quotes, and other components. Bonus
      points if you load a blank note when opening #NewTab (<em>Settings</em> → <em>Note Editor</em> → <em>Load Blank Note</em>).
    </p>
    <p><strong>Dark mode</strong> is great with background images. Explore different themes and contrasts using the background settings.</p>
    `,
  `<h1>Formatting Examples</h1>
    <hr contenteditable="false" />
    <h2>Headings</h2>
    <p>
      Start a new line and type <code>#</code> followed by a space to get a heading. Try <code>#</code>, <code>##</code>, <code>###</code>, <code>####</code> for
      different levels.
    </p>
    <h1>Heading 1</h1>
    <h2>Heading 2</h2>
    <h3>Heading 3</h3>
    <h4>Heading 4</h4>
    <hr contenteditable="false" />
    <h2>Formatting</h2>
    <p><strong>Bold</strong>: <code>**bold**</code></p>
    <p><em>Italic</em>: <code>*italic*</code></p>
    <p><u>Underline</u>: <code>~underline~</code></p>
    <p><s>Strike</s>: <code>~~strike~~</code></p>
    <p><mark>Highlight </mark>: <code>==highlight==</code></p>
    <p><code>Code:</code> <code>code</code></p>
    <pre><code>Code-block: Start a new line and type \`\`\`.
        Press "Cmd/Ctrl + Enter" to leave Code-block.</code></pre>
    <blockquote>
      <p>Blockquote: <code>&gt; Blockquote</code></p>
    </blockquote>
    <hr contenteditable="false" />
    <h2>Lists</h2>
    <ol>
      <li>
        <p><strong>Ordered list</strong>:<strong> </strong><code>1. ordered list</code></p>
      </li>
      <li><p>Keep going…</p></li>
      <li><p>… and a third.</p></li>
    </ol>
    <p><br /></p>
    <ul>
      <li>
        <p><strong>Unordered list</strong>:<strong> </strong><code>* unordered list</code></p>
      </li>
      <li><p>Keep going…</p></li>
      <li><p>… and a third.</p></li>
    </ul>
    <p><br /></p>
    <ul data-type="taskList">
      <li data-checked="false">
        <label contenteditable="false"><input type="checkbox"/><span></span></label>
        <div>
          <p><strong>To do list</strong>: <code>[ ] to do list</code></p>
        </div>
      </li>
      <li data-checked="false">
        <label contenteditable="false"><input type="checkbox"/><span></span></label>
        <div><p>Keep going…</p></div>
      </li>
      <li data-checked="false">
        <label contenteditable="false"><input type="checkbox"/><span></span></label>
        <div><p>… and a third.</p></div>
      </li>
    </ul>
    <hr contenteditable="false" />
    <h2>Paragraph alignment</h2>
    <p>
      <strong>Left align</strong>:<strong> </strong><code>Cmd/Ctrl + Shift + L</code><strong>.</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Morbi urna urna, auctor ut enim sed, molestie accumsan tellus. Morbi eleifend nisl id volutpat condimentum. Sed lobortis erat dolor, faucibus lacinia lacus
      auctor eget. Phasellus commodo, velit vitae dignissim sagittis, turpis dolor tempor dui, eu cursus ipsum mi at justo. Sed eu auctor tortor. Donec pulvinar
      neque id eros convallis vulputate.
    </p>
    <p style="text-align: center">
      <strong>Center align</strong>:<strong> </strong><code>Cmd/Ctrl + Shift + E</code><strong>.</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Morbi urna urna, auctor ut enim sed, molestie accumsan tellus. Morbi eleifend nisl id volutpat condimentum. Sed lobortis erat dolor, faucibus lacinia lacus
      auctor eget. Phasellus commodo, velit vitae dignissim sagittis, turpis dolor tempor dui, eu cursus ipsum mi at justo. Sed eu auctor tortor. Donec pulvinar
      neque id eros convallis vulputate.
    </p>
    <p style="text-align: right">
      <strong>Right align</strong>:<strong> </strong><code>Cmd/Ctrl + Shift + R</code><strong>.</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Morbi urna urna, auctor ut enim sed, molestie accumsan tellus. Morbi eleifend nisl id volutpat condimentum. Sed lobortis erat dolor, faucibus lacinia lacus
      auctor eget. Phasellus commodo, velit vitae dignissim sagittis, turpis dolor tempor dui, eu cursus ipsum mi at justo. Sed eu auctor tortor. Donec pulvinar
      neque id eros convallis vulputate.
    </p>
    <p style="text-align: justify">
      <strong>Justify</strong>:<strong> </strong><code>Cmd/Ctrl + Shift + J</code><strong>.</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
      urna urna, auctor ut enim sed, molestie accumsan tellus. Morbi eleifend nisl id volutpat condimentum. Sed lobortis erat dolor, faucibus lacinia lacus auctor
      eget. Phasellus commodo, velit vitae dignissim sagittis, turpis dolor tempor dui, eu cursus ipsum mi at justo. Sed eu auctor tortor. Donec pulvinar neque id
      eros convallis vulputate.
    </p>
    <hr contenteditable="false" />
    <h2>Other</h2>
    <p><strong>Image</strong>: Add an image using the <em>main</em> formatting menu or the <code>/</code> command menu. Drag the image to rearrange the order.</p>
    <img src="https://source.unsplash.com/8xznAGy4HcY/800x400" contenteditable="false" draggable="true" />
    <p>
      <strong>Link:</strong> Add a link by <a target="_blank" rel="noopener noreferrer nofollow" href="https://rory-dwyer.com/">selecting some text</a>, then using
      the <em>Link</em> tool in the <em>main</em> formatting menu, <em>select menu</em>, or the <code>/</code> command menu.
    </p>
    <p><strong>Separator</strong>: <code>—-</code> (three dash marks)</p>
    <hr contenteditable="false" />
    <p><br /></p>
    `,
];
