class Note {
  constructor(title, content, date, owner, color, isPinned = false, id) {
    this.title = title;
    this.content = content;
    this.date = date;
    this.owner = owner;
    this.color = color;
    this.isPinned = isPinned;
    this.id = id;
  }
}

const note = new Note("hsdhh", "ndd", 1121221, "me", "#fff",false,1);
const note1 = new Note("hsdh", "ndd", 1121221, "me", "#fff",true,2);
const note2 = new Note("hsd", "ndd", 1121221, "me", "#fff",false,3);
const note3 = new Note("hhh", "ndd", 1121221, "me", "#fff",false,4);

const NOTES = [note,note1,note2,note3]
const pinnedNotes = [note1,note2]
const n = pinnedNotes.find(note=>note.id === 4)
const pN = pinnedNotes.slice()
if(n){
  const index = pinnedNotes.findIndex(note=>note.id === 4)
  pN.splice(index,1)
}else{
    const item = NOTES.find(note=>note.id === 4)
    pN.push(item)
}
console.log(pN);

//const n = pinnedNotes.filter(note=>note.id !== 2)
//console.log(index);
// if(n !== -1){
//   //n.isPinned = false
//   //console.log(n);
// }
export default Note;
