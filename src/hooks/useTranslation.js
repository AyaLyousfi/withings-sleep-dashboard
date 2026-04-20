import { useState, useEffect } from 'react'
import en from '../i18n/en.js'
import fr from '../i18n/fr.js'

const translations = { en, fr }

export function useTranslation() {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'fr')

  useEffect(() => {
    localStorage.setItem('lang', lang)
  }, [lang])

  const t = (key) => {
    const keys = key.split('.')
    let value = translations[lang]
    for (const k of keys) {
      value = value?.[k]
    }
    return value ?? key
  }

  const toggleLang = () => setLang(l => l === 'en' ? 'fr' : 'en')

  return { t, lang, setLang, toggleLang }
}
