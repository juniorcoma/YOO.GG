export default function calculateRankRate(win: number, lose: number) {
  const totalGame = win + lose;

  return Math.floor((win / totalGame) * 100);
}
