import { useTranslation } from 'react-i18next';
import '../styles/LanguageSwitcher.scss';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="language-switcher">
      <label>{t('language')}: </label>
      <select
        value={i18n.language}
        onChange={(e) => changeLanguage(e.target.value)}
        className="language-select"
      >
        <option value="en">{t('english')}</option>
        <option value="ru">{t('russian')}</option>
        <option value="es">{t('spanish')}</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;


