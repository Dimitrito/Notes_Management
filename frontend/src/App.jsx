import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { fetchNotes } from './store/notesSlice';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import LanguageSwitcher from './components/LanguageSwitcher';
import './styles/App.scss';

function App() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>{t('title')}</h1>
        <LanguageSwitcher />
      </header>
      <main className="app-main">
        <NoteForm />
        <NoteList />
      </main>
    </div>
  );
}

export default App;
