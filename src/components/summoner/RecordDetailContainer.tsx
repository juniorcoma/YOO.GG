import { DDRAGON_IMG_URL } from '@/constant/API';
import { PerksDtoType } from '@/types/response';

import Image from 'next/image';

interface RecordDetailContainerProps {
  isOpen: boolean;
  gameVersion: string;
  perks: PerksDtoType;
  runesDataArr: any;
}

export default function RecordDetailContainer({
  isOpen,
  gameVersion,
  perks,
  runesDataArr,
}: RecordDetailContainerProps) {
  const version = `${gameVersion.split('.').slice(0, 2).join('.')}.1`;
  const { [version]: runeData } = runesDataArr.find((data: any) => data[version]);

  const { primaryStyle, subStyle } = checkingRune(runeData, perks);

  return (
    <div className={`${isOpen ? '' : 'hidden'} bg-color-gray-00 min-h-[20rem] rounded-[0.8rem] overflow-hidden`}>
      <div className="px-[1.6rem] py-[1.2rem] bg-color-gray-100 text-[1.4rem] font-bold text-color-gray-500">
        룬 정보
      </div>
      <div className="p-[1.6rem] flex gap-[2.4rem] justify-around">
        <div className="flex gap-[2.4rem] items-center">
          <div className="flex flex-col items-center gap-[0.8rem]">
            <span className="text-[1.2rem] text-color-gray-500">메인 룬</span>
            <div className="rounded-[50%] bg-color-gray-200 p-[0.4rem]">
              <img src={`${DDRAGON_IMG_URL.RUNE}${primaryStyle.icon}`} width={32} height={32} alt={primaryStyle.name} />
            </div>
            <span className="text-[1.4rem] font-bold">{primaryStyle.name}</span>
          </div>
          <div className="flex flex-col gap-[0.8rem]">
            {primaryStyle.slots.map((style: any, styleIndex: number) => (
              <div key={styleIndex} className="flex gap-[1.6rem]">
                {style.map((rune: any, index: number) => (
                  <div
                    key={index}
                    className={`${styleIndex === 0 ? 'rounded-[50%] bg-color-gray-200' : ''} ${
                      rune.check && styleIndex === 0 ? 'bg-color-primary-300' : ''
                    }`}
                  >
                    <img
                      src={`${DDRAGON_IMG_URL.RUNE}${rune.icon}`}
                      width={32}
                      height={32}
                      alt={rune.name}
                      className={`${rune.check ? '' : 'grayscale'}`}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-[2.4rem] items-center">
          <div className="flex flex-col items-center gap-[0.8rem]">
            <span className="text-[1.2rem] text-color-gray-500">서브 룬</span>
            <div className="rounded-[50%] bg-color-gray-200 p-[0.4rem]">
              <img src={`${DDRAGON_IMG_URL.RUNE}${subStyle.icon}`} width={32} height={32} alt={primaryStyle.name} />
            </div>
            <span className="text-[1.4rem] font-bold">{subStyle.name}</span>
          </div>
          <div className="flex flex-col gap-[0.8rem]">
            {subStyle.slots.map((style: any, styleIndex: number) => (
              <div key={styleIndex} className="flex gap-[1.6rem]">
                {style.map((rune: any, index: number) => (
                  <div key={index}>
                    <img
                      src={`${DDRAGON_IMG_URL.RUNE}${rune.icon}`}
                      width={32}
                      height={32}
                      alt={rune.name}
                      className={`${rune.check ? '' : 'grayscale opacity-65'}`}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function checkingRune(runeData: any, perks: PerksDtoType) {
  const primaryStyle = runeData.find((rune: any) => rune.id === perks.styles[0].style);
  const subStyle = runeData.find((rune: any) => rune.id === perks.styles[1].style);
  const subStyleSlost = subStyle.slots.slice(1);
  const newPrimarySlotsArr = [];
  const newSubStyleSlotsArr = [];
  for (let i = 0; i < perks.styles[0].selections.length; i++) {
    if (!primaryStyle.slots[i].runes) {
      newPrimarySlotsArr.push([]);
      continue;
    }
    const slot = primaryStyle.slots[i].runes.map((runeStyle: any) => {
      if (runeStyle.id === perks.styles[0].selections[i].perk) {
        return { ...runeStyle, check: true };
      } else {
        return { ...runeStyle, check: false };
      }
    });
    newPrimarySlotsArr.push(slot);
  }

  for (let i = 0; i < subStyleSlost.length; i++) {
    for (let j = 0; j < perks.styles[1]?.selections.length; j++) {
      const isContain = !!subStyleSlost[i].runes.find((rune: any) => rune.id === perks.styles[1].selections[j].perk);
      if (isContain) {
        const slot = subStyleSlost[i].runes.map((rune: any) => {
          if (rune.id === perks.styles[1].selections[j].perk) {
            return { ...rune, check: true };
          } else {
            return { ...rune, check: false };
          }
        });
        newSubStyleSlotsArr.push(slot);
        break;
      } else {
        if (j === 0) continue;
        const slot = subStyleSlost[i].runes.map((rune: any) => {
          return { ...rune, check: false };
        });
        newSubStyleSlotsArr.push(slot);
        break;
      }
    }
  }

  const checkPrimaryStyle = { ...primaryStyle, slots: newPrimarySlotsArr };
  const checkSubyStyle = { ...subStyle, slots: newSubStyleSlotsArr };
  return {
    primaryStyle: checkPrimaryStyle,
    subStyle: checkSubyStyle,
  };
}
