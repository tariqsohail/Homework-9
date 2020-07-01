
const fs = require("fs");
const notes = require("../db/db.json");
const { v4: uuidv4 } = require("uuid");


module.exports = app => {
    app.get("/api/notes", (req, res) => {
        const notesArr = [];
        for (let key in notes) {
            notesArr.push(notes[key]);
        }
        console.log(notesArr);
        res.json(notesArr);
    });

    app.post("/api/notes", (req, res) => {
        let tempId = uuidv4();
        newNote = {
            "title": req.body.title,
            "text": req.body.text,
            "id": tempId
        }

        notes[tempId] = newNote;

        console.log(notes);
        fs.writeFile("./db/db.json", JSON.stringify(notes), err => {
            console.log(err)
        });

        res.json(newNote);
    });

    app.delete("/api/notes/:id", (req, res) => {
        const noteID = req.params.id;
        console.log(noteID);

        delete notes[noteID];
        console.log(notes);

        fs.writeFile("./db/db.json", JSON.stringify(notes), err => {
            console.log(err)
        });

        const response = {
            status: 200,
            success: "Successfully updated!"
        }

        res.end(JSON.stringify(response));
    })
};
