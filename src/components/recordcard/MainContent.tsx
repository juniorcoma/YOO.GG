import { DDRAGON_IMG_URL } from '@/constant/API';
import useTooltip from '@/hook/useTooltip';
import { ParticipantDtoType, PerkStyleDtoType } from '@/types/response';
import {
  ChampionsDataType,
  ItemsDataType,
  RuneDataType,
  RunesDataType,
  SummonerSpellDataType,
} from '@/types/staticData';
import imgSrcVersionLoader from '@/utils/imgSrcVersionLoader';
import Image from 'next/image';
import Link from 'next/link';
import SummonerSpellTooltip from '../tooltipcontent/SummonerSpellTooltip';
import ItemTooltip from '../tooltipcontent/ItemTooltip';
import RuneTooltip from '../tooltipcontent/RuneTooltip';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

interface MainContentProps {
  participant: ParticipantDtoType;
  version: string;
  gameVersion: string;
  data: {
    champions: ChampionsDataType[];
    runesArr: RunesDataType[];
    summonerSpells: SummonerSpellDataType[];
    items: ItemsDataType;
  };
}

export default function MainContent({ participant, version, gameVersion, data }: MainContentProps) {
  const { item0, item1, item2, item3, item4, item5, item6 } = participant;
  const championData = data.champions.find(
    champion => participant.championId === Number(champion.key),
  ) as ChampionsDataType;
  const t = useTranslations('recordCard');
  const { locale } = useParams();
  return (
    <>
      <div className="flex flex-col gap-[0.8rem] flex-1">
        <div className="flex gap-[1.2rem]">
          <div className="flex gap-[0.4rem] h-[5.8rem] items-center">
            <Link
              href={`/${locale}/champions/${championData.id}/info`}
              className="h-[4.8rem] w-[4.8rem] rounded-[50%] overflow-hidden relative block"
            >
              <img
                src={`${imgSrcVersionLoader(version, 'CHAMPION_SQUARE')}${championData.id}.png`}
                alt={`${participant.championName} 이미지`}
              />
            </Link>
            <div className="flex gap-[0.2rem]">
              <SummonerSpellImgRender
                summonerSpells={[participant.summoner1Id, participant.summoner2Id]}
                version={version}
                spellsData={data.summonerSpells}
              />

              <div className="flex flex-col gap-[0.2rem]">
                <SummonerRunesImgRender
                  summonerRunes={participant.perks.styles}
                  gameVersion={gameVersion}
                  runesDataArr={data.runesArr}
                />
              </div>
            </div>
          </div>
          <div className="w-[10.8rem] self-center">
            <div className="text-[1.6rem]">
              <strong>
                <span>{participant.kills}</span> / <span className="text-color-red-600">{participant.deaths}</span> /{' '}
                <span>{participant.assists}</span>
              </strong>
            </div>
            <div className="text-[1.2rem] text-color-gray-500">
              {participant.challenges.kda.toFixed(2)} : 1 {t('kda')}
            </div>
          </div>
        </div>
        <div className="flex gap-[1.6rem]">
          <ItemImgRender
            isWin={participant.win}
            itemsArr={[item0, item1, item2, item3, item4, item5, item6]}
            version={version}
            itemsData={data.items}
          />
        </div>
      </div>
      <div
        className={`pl-[0.8rem] border-l ${
          participant.win ? 'border-color-primary-300' : 'border-color-red-300'
        } flex flex-col text-[1.2rem] gap-[0.2rem]`}
      >
        <div>{t('skillCount')}</div>
        <span>
          Q:{' '}
          <strong className={`inline-block ${participant.win ? 'text-color-primary-600' : 'text-color-red-600'}`}>
            {participant.spell1Casts}
          </strong>{' '}
          <span className="text-color-gray-400">{t('count')}</span>
        </span>
        <span>
          W:{' '}
          <strong className={`inline-block ${participant.win ? 'text-color-primary-600' : 'text-color-red-600'}`}>
            {participant.spell2Casts}
          </strong>{' '}
          <span className="text-color-gray-400">{t('count')}</span>
        </span>
        <span>
          E:{' '}
          <strong className={`inline-block ${participant.win ? 'text-color-primary-600' : 'text-color-red-600'}`}>
            {participant.spell3Casts}
          </strong>{' '}
          <span className="text-color-gray-400">{t('count')}</span>
        </span>
        <span>
          R:{' '}
          <strong className={`inline-block ${participant.win ? 'text-color-primary-600' : 'text-color-red-600'}`}>
            {participant.spell4Casts}
          </strong>{' '}
          <span className="text-color-gray-400">{t('count')}</span>
        </span>
      </div>
    </>
  );
}

function SummonerSpellImgRender({
  summonerSpells,
  version,
  spellsData,
}: {
  summonerSpells: [number, number];
  version: string;
  spellsData: SummonerSpellDataType[];
}) {
  const renderImgList = summonerSpells.map(id =>
    spellsData.find((spell: any) => id === Number(spell.key)),
  ) as SummonerSpellDataType[];

  const { openTooltip, closeTooltip } = useTooltip();

  return (
    <div className="flex flex-col gap-[0.2rem]">
      {renderImgList.map(spell => (
        <img
          key={spell.key}
          src={`${imgSrcVersionLoader(version, 'SPELL')}${spell.image.full}`}
          width={22}
          height={22}
          alt={`${spell.name} 스펠 이미지`}
          className="rounded-[0.4rem]"
          onMouseOver={e => {
            openTooltip({ component: SummonerSpellTooltip, props: { data: spell }, target: e.target as HTMLElement });
          }}
          onMouseLeave={closeTooltip}
        />
      ))}
    </div>
  );
}

function SummonerRunesImgRender({
  summonerRunes,
  gameVersion,
  runesDataArr,
}: {
  summonerRunes: PerkStyleDtoType[];
  gameVersion: string;
  runesDataArr: RunesDataType[];
}) {
  const version = `${gameVersion.split('.').slice(0, 2).join('.')}.1`;

  const { [version]: runeData } = runesDataArr.find(data => data[version]) as RunesDataType;

  const runeImgUrlList = summonerRunes.map((rune, index) => {
    const matchRuneStyle = runeData.find(data => data.id === rune.style) as RuneDataType;
    if (index === 0) {
      const mainRune = matchRuneStyle.slots[0].runes?.find((data: any) => data.id === rune.selections[0].perk);
      return mainRune;
    }
    return matchRuneStyle;
  });
  const { openTooltip, closeTooltip } = useTooltip();
  return (
    <>
      {runeImgUrlList.map((rune, index) => {
        if (!rune) return <span key={index} className="w-[2.2rem] h-[2.2rem]"></span>;

        return (
          <img
            key={rune.id}
            src={`${DDRAGON_IMG_URL.RUNE}${rune?.icon}`}
            width={22}
            height={22}
            alt={`룬 이미지`}
            className={`${!index ? 'rounded-[50%] bg-color-gray-600' : ''}`}
            onMouseOver={e => {
              openTooltip({ component: RuneTooltip, props: { data: rune }, target: e.target as HTMLElement });
            }}
            onMouseLeave={closeTooltip}
          />
        );
      })}
    </>
  );
}

function ItemImgRender({
  isWin,
  itemsArr,
  version,
  itemsData,
}: {
  isWin: boolean;
  itemsArr: (number | undefined)[];
  version: string;
  itemsData: ItemsDataType;
}) {
  const renderItemsArr = itemsArr.map(itemId => {
    if (!itemId) return undefined;
    return itemsData[itemId];
  });
  const { openTooltip, closeTooltip } = useTooltip();
  return (
    <div className="flex gap-[0.2rem]">
      {renderItemsArr.map((item, index) => {
        if (!item)
          return (
            <span
              key={index}
              className={`${
                isWin ? 'bg-color-primary-200' : 'bg-color-red-200'
              } w-[2.2rem] h-[2.2rem] rounded-[0.4rem]`}
            ></span>
          );
        return (
          <Image
            key={`${item.name}+${index}`}
            src={`${imgSrcVersionLoader(version, 'ITEM')}${item.image.full}`}
            width={22}
            height={22}
            unoptimized
            alt={`${item.name}`}
            className="rounded-[0.4rem]"
            onMouseOver={e => {
              openTooltip({ component: ItemTooltip, props: { data: item }, target: e.target as HTMLElement });
            }}
            onMouseLeave={closeTooltip}
          />
        );
      })}
    </div>
  );
}
