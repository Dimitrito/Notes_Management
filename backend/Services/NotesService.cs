using NotesAPI.Models;

namespace NotesAPI.Services;

public class NotesService : INotesService
{
    private readonly List<Note> _notes = new();
    private int _nextId = 1;

    public NotesService()
    {
        // Initialize with some sample data
        _notes.Add(new Note
        {
            Id = _nextId++,
            Title = "Welcome Note",
            Content = "This is your first note. You can edit or delete it.",
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        });
    }

    public IEnumerable<Note> GetAllNotes()
    {
        return _notes.OrderByDescending(n => n.UpdatedAt);
    }

    public Note? GetNoteById(int id)
    {
        return _notes.FirstOrDefault(n => n.Id == id);
    }

    public Note CreateNote(Note note)
    {
        note.Id = _nextId++;
        note.CreatedAt = DateTime.UtcNow;
        note.UpdatedAt = DateTime.UtcNow;
        _notes.Add(note);
        return note;
    }

    public Note? UpdateNote(int id, Note note)
    {
        var existingNote = _notes.FirstOrDefault(n => n.Id == id);
        if (existingNote == null)
        {
            return null;
        }

        existingNote.Title = note.Title;
        existingNote.Content = note.Content;
        existingNote.UpdatedAt = DateTime.UtcNow;
        return existingNote;
    }

    public bool DeleteNote(int id)
    {
        var note = _notes.FirstOrDefault(n => n.Id == id);
        if (note == null)
        {
            return false;
        }

        _notes.Remove(note);
        return true;
    }
}


