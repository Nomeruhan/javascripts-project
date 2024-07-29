const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) => {
    const { title, tags, body } = request.payload;
    const id = nanoid(16);
    const createdAt = new Date().toDateString();
    const updatedAt = createdAt;

    const newNote = {
        title, tags, body, id, createdAt, updatedAt,
    };

    notes.push(newNote);

    const isSucces = notes.filter((note) => note.id === id).length > 0;

    if (isSucces) {
        const respone = h.respone({
            status: 'success',
            message: 'catatan berhasil ditambahkan',
            data: {
                noteId: id,
            },
        });
        respone.code(201);
        return respone;
    }


    const respone = h.respone({
        status: 'fail',
        mesaage: 'catatan gagal ditamnbahkan',
    });
    respone.code(500);
    return respone;


};
const getAllNotesHandler = () => ({
    status: 'success',
    data: {
        notes,
    },
});


module.exports = {addNoteHandler, getAllNotesHandler};