import { useTranslation } from 'react-i18next';
import '../styles/NoteItem.scss';

const NoteItem = ({ note, onEdit, onDelete }) => {
  const { t } = useTranslation();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="note-item">
      <div className="note-header">
        <h3 className="note-title">{note.title}</h3>
        <div className="note-actions">
          <button className="btn btn-edit" onClick={() => onEdit(note)}>
            {t('editNote')}
          </button>
          <button className="btn btn-delete" onClick={() => onDelete(note.id)}>
            {t('deleteNote')}
          </button>
        </div>
      </div>
      <div className="note-content">{note.content}</div>
      <div className="note-footer">
        <span className="note-date">
          {formatDate(note.updatedAt)}
        </span>
      </div>
    </div>
  );
};

export default NoteItem;


