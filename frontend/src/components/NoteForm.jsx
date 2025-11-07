import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { createNote, updateNote, clearSelectedNote } from '../store/notesSlice';
import '../styles/NoteForm.scss';

const NoteForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { selectedNote } = useSelector((state) => state.notes);
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setContent(selectedNote.content);
      setIsEditing(true);
    } else {
      resetForm();
    }
  }, [selectedNote]);

  const resetForm = () => {
    setTitle('');
    setContent('');
    setIsEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('Title is required');
      return;
    }

    const noteData = { title: title.trim(), content: content.trim() };

    if (isEditing && selectedNote) {
      await dispatch(updateNote({ id: selectedNote.id, note: noteData }));
    } else {
      await dispatch(createNote(noteData));
    }

    resetForm();
    dispatch(clearSelectedNote());
  };

  const handleCancel = () => {
    resetForm();
    dispatch(clearSelectedNote());
  };

  return (
    <div className="note-form-container">
      <h2>{isEditing ? t('editNote') : t('addNote')}</h2>
      <form onSubmit={handleSubmit} className="note-form">
        <div className="form-group">
          <label htmlFor="title">{t('noteTitle')}</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t('noteTitle')}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">{t('noteContent')}</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={t('noteContent')}
            rows="5"
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {t('save')}
          </button>
          {isEditing && (
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>
              {t('cancel')}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default NoteForm;


