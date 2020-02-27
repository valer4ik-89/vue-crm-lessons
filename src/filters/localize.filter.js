import store from '../store'
import ru from '../locales/ru.json'
import en from '../locales/en.json'

const lang = navigator.language

const locales = {
  ru: ru,
  en: en
}

export default function localizeFilter(key) {
  const locale = store.getters.info.locale || 'ru'
  return locales[locale][key] || `[localize error]: key ${key} not found`
}
