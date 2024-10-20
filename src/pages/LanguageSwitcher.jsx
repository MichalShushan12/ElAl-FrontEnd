import React from 'react';
import { useLanguage } from './LanguageContext';

const LanguageSwitcher = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button onClick={toggleLanguage} aria-label="Toggle language">
      {language === 'en' ? 'עברית' : 'English'}
    </button>
  );
};

export default LanguageSwitcher;