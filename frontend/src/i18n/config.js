import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      title: 'Notes Manager',
      addNote: 'Add Note',
      editNote: 'Edit Note',
      deleteNote: 'Delete',
      save: 'Save',
      cancel: 'Cancel',
      noteTitle: 'Title',
      noteContent: 'Content',
      noNotes: 'No notes yet. Create your first note!',
      loading: 'Loading...',
      error: 'Error occurred',
      language: 'Language',
      english: 'English',
      russian: 'Russian',
      spanish: 'Spanish',
      createNote: 'Create Note',
      updateNote: 'Update Note',
      confirmDelete: 'Are you sure you want to delete this note?',
      yes: 'Yes',
      no: 'No',
    },
  },
  ru: {
    translation: {
      title: 'Менеджер заметок',
      addNote: 'Добавить заметку',
      editNote: 'Редактировать заметку',
      deleteNote: 'Удалить',
      save: 'Сохранить',
      cancel: 'Отмена',
      noteTitle: 'Заголовок',
      noteContent: 'Содержание',
      noNotes: 'Пока нет заметок. Создайте первую заметку!',
      loading: 'Загрузка...',
      error: 'Произошла ошибка',
      language: 'Язык',
      english: 'Английский',
      russian: 'Русский',
      spanish: 'Испанский',
      createNote: 'Создать заметку',
      updateNote: 'Обновить заметку',
      confirmDelete: 'Вы уверены, что хотите удалить эту заметку?',
      yes: 'Да',
      no: 'Нет',
    },
  },
  es: {
    translation: {
      title: 'Gestor de Notas',
      addNote: 'Añadir Nota',
      editNote: 'Editar Nota',
      deleteNote: 'Eliminar',
      save: 'Guardar',
      cancel: 'Cancelar',
      noteTitle: 'Título',
      noteContent: 'Contenido',
      noNotes: 'Aún no hay notas. ¡Crea tu primera nota!',
      loading: 'Cargando...',
      error: 'Ocurrió un error',
      language: 'Idioma',
      english: 'Inglés',
      russian: 'Ruso',
      spanish: 'Español',
      createNote: 'Crear Nota',
      updateNote: 'Actualizar Nota',
      confirmDelete: '¿Estás seguro de que quieres eliminar esta nota?',
      yes: 'Sí',
      no: 'No',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;


