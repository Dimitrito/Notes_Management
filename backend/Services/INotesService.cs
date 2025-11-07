using NotesAPI.Models;

namespace NotesAPI.Services;

public interface INotesService
{
    IEnumerable<Note> GetAllNotes();
    Note? GetNoteById(int id);
    Note CreateNote(Note note);
    Note? UpdateNote(int id, Note note);
    bool DeleteNote(int id);
}


