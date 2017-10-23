'use strict';

const Note = require('../model/note.js');
const router = require('../lib/router.js');

let sendStatus = (res, status, text) => {
  res.writeHead(status);
  res.write(text);
  res.end();
};

let sendJSON = (res, status, data) => {
  res.writeHead(status, {
    'Content-Type':'application/json',
  });
  res.end(JSON.stringify(data));
};

let notes =  []; //save note to a stack...this could be an array

//router can handle post of api notes...the endpoint is api/notes
router.post('/api/notes', (req, res) => {

  //if no title/content then 400
  if ((req.body.title === '') || (req.body.title === undefined)) {
    sendResponse(res, 400, `{'error: 'invalid request: missing the title'}`);
  } else if ((req.body.content === '') || (req.body.content === undefined)) {
    sendResponse(res, 400, `{'error: 'invalid request: missing the content'}`);
  } else if (req.body.title) {
    //save the note to the stack
    //send 200
    notes.push(new Note(req.body.title, req.body.date, req.body.content));

    sendResponse(res, 200, `{'content':'${notes}'}`);
  }
});

//router can handle delete of api notes
router.delete('/api/notes', (req, res) => {
  if(req.body.id === uuid){
    let currentIndex = notes.indexOf(uuid);
    let updatedNotes = notes.splice(currentIndex, 1);
    sendResponse(res, 200, `{'content':'${updatedNotes}'}`);
  //do I have an id?
  //is it valid?
  //nuke it
  //send 200 if all is well
  }
});

//put  = replace
router.put('/api/notes', (req, res) => {
  return new Promise ( (resolve, reject) => {

    if(req.body.id === uuid) {
      let currentIndex = notes.indexOf(uuid);
      let updatedNotes = notes.splice(currentIndex, 1);
      sendResponse(res, 200, `{'content':'${updatedNotes}'}`);
      resolve(req.body.id);

    } else if ((req.body.id === '') || (req.body.id === undefined)) {

      reject(req.body.id);
    }
  });
  //resolve and reject
  //do I have an id?
  //is it valid?
  //replace it
  //send 200 if all is well
});

router.patch('api/notes', (req, res) => {
  //do I have an id?
  //is it valid?
  //update it
  //send 200 if all is well
});

//get has get one and get all
router.get('/api/notes', (req, res) => {
  //if we have an id
      //try and pull it from the stack
          //send the note with the specific id
      //404 not found or 400 invalid query?
  //else list all notes
  let id = req.url && req.url.query && req.url.query.id;

  if (id) {
    let note = notes.filter((note) => {
      return note.uuid === id;
    });
    if (note) {
      sendJSON(res, 200, note);
    } else {
      sendStatus(res, 400, 'cannot find the note with the provided id');
    }
  } else {
    let allNotes = {notes:notes};
    sendJSON(res, 200, allNotes);
  }
});
