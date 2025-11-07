using Microsoft.AspNetCore.Mvc;
using NotesAPI.Models;
using NotesAPI.Services;

namespace NotesAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class NotesController : ControllerBase
{
    private readonly INotesService _notesService;

    public NotesController(INotesService notesService)
    {
        _notesService = notesService;
    }

    [HttpGet]
    public ActionResult<IEnumerable<Note>> GetNotes()
    {
        var notes = _notesService.GetAllNotes();
        return Ok(notes);
    }

    [HttpGet("{id}")]
    public ActionResult<Note> GetNote(int id)
    {
        var note = _notesService.GetNoteById(id);
        if (note == null)
        {
            return NotFound();
        }
        return Ok(note);
    }

    [HttpPost]
    public ActionResult<Note> CreateNote([FromBody] Note note)
    {
        if (string.IsNullOrWhiteSpace(note.Title))
        {
            return BadRequest("Title is required");
        }

        var createdNote = _notesService.CreateNote(note);
        return CreatedAtAction(nameof(GetNote), new { id = createdNote.Id }, createdNote);
    }

    [HttpPut("{id}")]
    public ActionResult<Note> UpdateNote(int id, [FromBody] Note note)
    {
        if (string.IsNullOrWhiteSpace(note.Title))
        {
            return BadRequest("Title is required");
        }

        var updatedNote = _notesService.UpdateNote(id, note);
        if (updatedNote == null)
        {
            return NotFound();
        }
        return Ok(updatedNote);
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteNote(int id)
    {
        var deleted = _notesService.DeleteNote(id);
        if (!deleted)
        {
            return NotFound();
        }
        return NoContent();
    }
}

