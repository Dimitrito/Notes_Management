import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { fetchNotes, deleteNote, clearSelectedNote, setSelectedNote } from '../store/notesSlice';
import NoteItem from './NoteItem';
import '../styles/NoteList.scss';

const NoteList = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { notes, loading, error } = useSelector((state) => state.notes);

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (window.confirm(t('confirmDelete'))) {
      await dispatch(deleteNote(id));
      dispatch(clearSelectedNote());
    }
  };

  const handleEdit = (note) => {
    dispatch(setSelectedNote(note));
  };

  if (loading) {
    return <div className="loading">{t('loading')}</div>;
  }

  if (error) {
    return <div className="error">{t('error')}: {error}</div>;
  }

  if (notes.length === 0) {
    return <div className="no-notes">{t('noNotes')}</div>;
  }

  return (
    <div className="note-list">
      <h2>{t('title')}</h2>
      <div className="notes-grid">
        {notes.map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default NoteList;

