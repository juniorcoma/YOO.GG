export function calculateGameCreation(time: number) {
  const nowSeconds = Math.floor(Date.now() / 1000);
  const secondGap = nowSeconds - Math.floor(time / 1000);
  if (secondGap < 60) return `${secondGap}초 전`;
  else if (secondGap < 3600) return `${Math.round(secondGap / 60)}분 전`;
  else if (secondGap < 86400) return `${Math.round(secondGap / 3600)}시간 전`;
  else if (secondGap < 2592000) return `${Math.round(secondGap / 86400)}일 전`;
  else if (secondGap < 31557600) return `${Math.round(secondGap / 2592000)}달 전`;
  else return `${Math.floor(secondGap / 31557600)}년 전`;
}

export function calculateGameDuration(time: number) {
  const second = time % 60;
  const minute = (time - second) / 60;
  return `${minute}분 ${second}초`;
}
