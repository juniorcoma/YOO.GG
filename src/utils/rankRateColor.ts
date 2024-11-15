export default function rankRateColor(rate: number) {
  if (rate >= 70) {
    return '#FF8200';
  } else if (rate >= 60) {
    return '#0093FF';
  } else if (rate >= 50) {
    return '#00BBA3';
  } else {
    return '#7B7A8E';
  }
}
