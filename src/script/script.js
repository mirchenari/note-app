const addBtn = document.querySelector(".add-note");
const popUp1 = document.querySelector("#pop-up-1");
const popUp1Layout = document.querySelector("#pop-up-1 > .pop-up-layout");
const popUp1Back = document.querySelector("#pop-up-1 > .pop-up-back");

const titleInput = document.querySelector("#title-input");
const noteInput = document.querySelector("#note-input");
const submit = document.querySelector(".add-button");
const noteContainer = document.querySelector(".note-container");

const title = document.querySelector("#title");
const note = document.querySelector("#note");

const controlDiv = document.querySelector(".note-control");
const delBtn = document.querySelector(".delete");
const editBtn = document.querySelector(".edit");

let addBool = true;
let notesArray = [];
let noteSelect;

function inputEmpty(){
    titleInput.value = "";
    noteInput.value = "";
}

// get saved
if (localStorage.getItem("notes")){
    notesArray = JSON.parse(localStorage.getItem("notes"));
    addNote();
}

// show popUp
addBtn.addEventListener("click", () => showEditAdd());
popUp1Back.addEventListener("click", () => {
    showEditAdd("c");
    if (addBool == false) {
        addBool = true;
        inputEmpty();
    }
});

function showEditAdd(input = "s"){
    if (input == "s"){
        popUp1.classList.remove("hidden");
        setTimeout(() => popUp1Layout.classList.add("active"), 100);
    } else {
        popUp1Layout.classList.remove("active");
        setTimeout(() => popUp1.classList.add("hidden"), 300);
    }
}

// add note
class noteAbj {
    constructor(title, note){
        this.title = title;
        this.note = note;
        this.date = new Date().toLocaleString();
    }
}

submit.addEventListener("click", () => {
    if (titleInput.value.trim() == "" || noteInput.value.trim() == "") {
        alert("لطفا مقادیر خواسته شده را وارد کنید.");
    } else if (addBool) {
        // for add
        showEditAdd("c");

        let newNote = new noteAbj(titleInput.value.trim(), noteInput.value.trim());
        notesArray.push(newNote);
        addNote();
    } else {
        // for edit
        showEditAdd("c");
        addBool = true;

        let newTitle = titleInput.value.trim();
        let newNote = noteInput.value.trim();

        notesArray[noteSelect].title = newTitle;
        notesArray[noteSelect].note = newNote;

        title.innerHTML = notesArray[noteSelect].title;
        note.innerHTML = notesArray[noteSelect].note;

        inputEmpty();
        addNote();
    }
})

function addNote() {
    noteContainer.innerHTML = "";
    showControl("c");

    notesArray.forEach((item, index) => {
        let newDiv = document.createElement("article");

        if (index == noteSelect){
            newDiv.classList.add("active");
            showControl();
        }

        newDiv.innerHTML = `<div class="note-title">${item.title}</div>
        <div class="note-description">${item.note.substring(0,65)}...</div>
        <div class="note-date">${item.date}</div>`
        noteContainer.appendChild(newDiv);
    })
    noteAction();

    // save
    localStorage.setItem("notes", JSON.stringify(notesArray));
}

// note action
function noteAction(){
    const noteDiv = document.querySelectorAll(".note-container > article");

    noteDiv.forEach((item, index) => {
        item.addEventListener("click", () => {
            noteDiv.forEach(i => i.classList.remove("active"));
            item.classList.add("active");
            showControl();

            noteSelect = index;
            title.innerHTML = notesArray[noteSelect].title;
            note.innerHTML = notesArray[noteSelect].note;
        })
    })
}

// note control
function showControl(input = "s"){
    if (input == "s") {
        controlDiv.classList.remove("hidden");
    } else {
        controlDiv.classList.add("hidden");
    }
}

// note delete
delBtn.addEventListener("click", () => {
    notesArray.splice(noteSelect, 1);
    title.innerHTML = "";
    note.innerHTML = "";
    noteSelect = undefined;
    addNote();
})

// note edit
editBtn.addEventListener("click", () => {
    addBool = false;
    titleInput.value = notesArray[noteSelect].title;
    noteInput.value = notesArray[noteSelect].note;
    showEditAdd();
})

// show side on mobile
const menuBtn = document.querySelector(".mobile-side");
const side = document.querySelector(".side");
const bodyBack = document.querySelector(".body-back");

const showCloseSide = () => {
    side.classList.toggle("active");
    bodyBack.classList.toggle("hidden");
}

menuBtn.addEventListener("click", showCloseSide);
bodyBack.addEventListener("click", showCloseSide);