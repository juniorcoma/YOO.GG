import { LanguageParamsType } from '@/types';

export function calculateGameCreation(time: number, locale: LanguageParamsType) {
  const nowSeconds = Math.floor(Date.now() / 1000);
  const secondGap = nowSeconds - Math.floor(time / 1000);
  if (secondGap < 60) return `${secondGap}${TIME_LANGUAGE.secondAgo[locale]}}`;
  else if (secondGap < 3600) return `${Math.round(secondGap / 60)}${TIME_LANGUAGE.minAgo[locale]}`;
  else if (secondGap < 86400) return `${Math.round(secondGap / 3600)}${TIME_LANGUAGE.hourAgo[locale]}`;
  else if (secondGap < 2592000) return `${Math.round(secondGap / 86400)}${TIME_LANGUAGE.dayAgo[locale]}`;
  else if (secondGap < 31557600) return `${Math.round(secondGap / 2592000)}${TIME_LANGUAGE.monthAgo[locale]}`;
  else return `${Math.floor(secondGap / 31557600)}${TIME_LANGUAGE.yearAgo[locale]}`;
}

export function calculateGameDuration(time: number, locale: LanguageParamsType) {
  const second = time % 60;
  const minute = (time - second) / 60;
  return `${minute}${TIME_LANGUAGE.min[locale]} ${second}${TIME_LANGUAGE.second[locale]}`;
}

const TIME_LANGUAGE = {
  min: { ko: '분', en: 'm' },
  second: { ko: '초', en: 's' },
  secondAgo: { ko: '초 전', en: 'seconds ago' },
  minAgo: { ko: '분 전', en: 'minutes ago' },
  hourAgo: { ko: '시간 전', en: 'hours ago' },
  dayAgo: { ko: '일 전', en: 'days ago' },
  monthAgo: { ko: '달 전', en: 'months ago' },
  yearAgo: { ko: '년 전', en: 'years ago' },
};
