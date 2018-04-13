//manages the get all the notes calls 
function loadNotes(callback) {

    console.log("loadNotes");

    var dataAux;

    $.ajax({
        method: "GET",
        url: "http://127.0.0.1:8080/notes/"
    }).done(function (notes) {
        dataAux = notes;
        callback(notes);
    })

    callback([]);

}
// manages the add new notes button
function addNote(note, callback) {
    console.log("addNote")
    $.ajax({
        method: "POST",
        url: 'http://localhost:8080/notes/',
        data: JSON.stringify(note),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }


    }).done(function (note) {
        console.log("note created" + JSON.stringify(note));
        callback(note);
    })

}
// appends the notes to the html document
function showNote(note) {


    console.log("Show notes");
    if (note.date !== null) {
        $('#notes').append(
            '<div class="note" id="note-' + note.id + '">' +
            '<p id="description">' + note.description + '</p>' +
            '<p id="date">' + note.date + '</p>' +
            ' </div>')
    } else {
        $('#notes').append(
            '<div class="note" id="note-' + note.id + '">' +
            '<p id="description">' + note.description + '</p>' +
            '<p > No Date Available </p>' +
            ' </div>')
    }
}

//manages the edition of the notes
function editNote(note) {
    console.log("Edit Note");
    $.ajax({
        method: "PUT",
        url: 'http://localhost:8080/notes/' + note.id,
        data: JSON.stringify(note),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    })

}

//manages the removal of the notes
function deleteNote(id) {
    console.log("deleteNote");
    $.ajax({
        method: "DELETE",
        url: 'http://localhost:8080/notes/' + id,


    }).done(function () {
        console.log("note deleted");

    })
}


$(document).ready(function () {
    var addDialog = document.getElementsByClassName("addDialog");

    loadNotes(function (notes) {
        console.log("Callback");
        if (notes.length > 0) {
            document.getElementById("emptyNotes").remove();
        }
        for (var i = 0; i < notes.length; i++) {
            showNote(notes[i]);
        }
    })

    var dialogAdd = document.getElementById('addDialog');

    var dialogEdit = document.getElementById('editDialog');

    var btn = document.getElementById("addNote");

    var closeBtn = document.getElementById("close");

    var save = document.getElementById("save");

    var edit = document.getElementById("edit");

    var delet = document.getElementById("delete");


    $(document).on('click', '.note', function () {

        console.log("clicked note");
        dialogEdit.style.display = "block";
        var inputElem = $("#descriptionInputEdit");
        var inputDate = $("#date");
        
        inputElem.val($(this).children('#description').text())
        
        console.log($(this).children('#date').text());
        
        inputDate.val($(this).children('#date').text());
        var id = $(this).attr('id').split('-')[1];

        edit.onclick = function () {

            var descriptionField = inputElem.val();
            console.log(descriptionField);
            var date = inputDate.val();

            var descriptionInfo = descriptionField;

            console.log(id);
            console.log(descriptionInfo);
            console.log(date);

            inputElem.val("");

            var note = {
                id: id,
                description: descriptionInfo,
                date: date,
            }

            editNote(note);
            if (date != "") {
                $('#note-' + id).html('<p id="description">' + descriptionInfo + '</p>' + '<p id="date">' + date + '</p>');
                dialogEdit.style.display = "none";
            } else {
                $('#note-' + id).html('<p id="description">' + descriptionInfo + '</p>' + '<p  > No date Available</p>');
                dialogEdit.style.display = "none";
            }
        }
        delet.onclick = function (note) {
            deleteNote(id);
            $('#note-' + id).remove();

            console.log($('#notes > div').length);
            if ($('#notes > div').length < 1) {
                $('#notes').append('<h3 id="emptyNotes">No Current Notes</h3>')
            }

            dialogEdit.style.display = "none";
        }

        $('#closeEdit').click(function () {
            dialogEdit.style.display = "none";
        })


    })

    btn.onclick = function () {
        dialogAdd.style.display = "block";
    }


    closeBtn.onclick = function () {

        dialogAdd.style.display = "none";

    }

    save.onclick = function () {

        var descriptionField = $("#descriptionInput");
        var date = $("#dateInput").val();


        if ($('#emptyNotes').length) {
            document.getElementById("emptyNotes").remove();
        }

        var descriptionInfo = descriptionField.val();
        descriptionField.val('');

        var note = {
            description: descriptionInfo,
            date: date,
        }
        addNote(note, function (createdNote) {
            showNote(createdNote);
        })

        dialogAdd.style.display = "none";
    }


    window.onclick = function (event) {
        if (event.target == dialogAdd) {
            dialogAdd.style.display = "none";
        }
        if (event.target == dialogEdit) {
            dialogEdit.style.display = "none";
        }
    }

})
