const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 3000;
const OUTPUT_DIR = path.resolve(__dirname, "files");

let files = [];

app.get(""/api/files, function(req, res) {
  console.log("test");
  if (fs.existsSync(OUTPUT_DIR)) {
    let fileObjs = fs.readdirSync(OUTPUT_DIR, { withFileTypes: true });

    fileObjs.forEach(file => { 
      if (file.isFile()) {
        files.push(file.name);
      }
    });
  }
  else {
    fs.mkdirSync(OUTPUT_DIR);
    files = [];
  };

  return res.json(files);
});

app.get("*", function(req, res) {
  console.log("test2");
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// app.post("/api/notes", function(req, res) {
//   const newNote = req.body;
//   // if note doesn't have an id yet (new note vs. updated note), assign id the current date/time
//   if (!newNote.id) {
//     newNote.id = Date.now();
//   };
//   notes.push(newNote);
//   writeNotes();
//   res.json(newNote);
// });

// app.delete("/api/notes/:id", function(req, res) {
//   // Must use '==', not '===', because one is numeric and one is string
//   const noteIndex = notes.findIndex(note => {return (note.id == req.params.id)});
//   let deleted = false;

//   // The ID should always be found, but check, just in case
//   if (noteIndex != -1) {
//     notes.splice(noteIndex, 1);
//     writeNotes();
//     deleted = true;
//   };
//   res.json(deleted);
// });

// Make sure directory exists before writing file
// function writeNotes() {
//   if (!fs.existsSync(OUTPUT_DIR)) {
//     fs.mkdirSync(OUTPUT_DIR);
//   };
//   fs.writeFileSync(outputPath, JSON.stringify(notes, null, 2));
// };

app.listen(PORT, console.log("Server starting on PORT ", PORT));