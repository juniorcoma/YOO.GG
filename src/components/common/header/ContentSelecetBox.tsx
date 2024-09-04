import ArrowDown from '@/assets/icons/arrow_down.svg';

export default function ContentSelectBox() {
  return (
    <button className="text-[#fff] h-[4rem] text-[1.4rem] leading-[1.2] inline-flex gap-[0.8rem] bg-[#424254] rounded-[0.8rem] p-[0.8rem] items-center">
      <img src="/images/lol_icon_flat_gold.png" width={24} height={24} alt="lol_icon" />
      리그 오브 레전드
      <ArrowDown />
    </button>
  );
}
