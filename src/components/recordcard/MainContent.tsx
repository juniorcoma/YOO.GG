'use client';

import { DDRAGON_IMG_URL } from '@/constant/API';
import useTooltip from '@/hook/useTooltip';
import { ParticipantDtoType, PerkStyleDtoType } from '@/types/response';
import { ChampionsDataType, SummonerSpellDataType } from '@/types/staticData';
import imgSrcVersionLoader from '@/utils/imgSrcVersionLoader';
import Image from 'next/image';
import Link from 'next/link';
import SummonerSpellTooltip from '../tooltipcontent/SummonerSpellTooltip';
import ItemTooltip from '../tooltipcontent/ItemTooltip';
import RuneTooltip from '../tooltipcontent/RuneTooltip';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import useGetRuneData from '@/hook/query/useGetRuneData';
import { LanguageParamsType } from '@/types';
import useGetItemsData from '@/hook/query/useGetItemsData';
import useGetSummonerSpellData from '@/hook/query/useGetSummonerSpellData';
import useGetChampionsData from '@/hook/query/useGetChampionsData';

interface MainContentProps {
  participant: ParticipantDtoType;
  version: string;
  gameVersion: string;
}

export default function MainContent({ participant, version, gameVersion }: MainContentProps) {
  const { locale }: { locale: LanguageParamsType } = useParams();
  const { item0, item1, item2, item3, item4, item5, item6 } = participant;
  const { data: championsData } = useGetChampionsData(version, locale);
  const championData = championsData.data.find(
    champion => participant.championId === Number(champion.key),
  ) as ChampionsDataType;
  const t = useTranslations('recordCard');

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
                src={`${imgSrcVersionLoader(championsData.version, 'CHAMPION_SQUARE')}${championData.id}.png`}
                alt={`${participant.championName} 이미지`}
              />
            </Link>
            <div className="flex gap-[0.2rem]">
              <SummonerSpellImgRender
                summonerSpells={[participant.summoner1Id, participant.summoner2Id]}
                gameVersion={gameVersion}
                size={22}
              />

              <div className="flex flex-col gap-[0.2rem]">
                <SummonerRunesImgRender size={22} summonerRunes={participant.perks.styles} gameVersion={gameVersion} />
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
            gameVersion={gameVersion}
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

export function SummonerSpellImgRender({
  summonerSpells,
  gameVersion,
  size,
}: {
  summonerSpells: [number, number];
  gameVersion: string;
  size: number;
}) {
  const { locale }: { locale: LanguageParamsType } = useParams();
  const { data: summonerSpellData } = useGetSummonerSpellData(gameVersion, locale);

  const renderImgList = summonerSpells.map(id =>
    summonerSpellData.data.find((spell: any) => id === Number(spell.key)),
  ) as SummonerSpellDataType[];

  const { openTooltip, closeTooltip } = useTooltip();

  return (
    <div className="flex flex-col gap-[0.2rem]">
      {renderImgList.map(spell => (
        <Image
          key={spell.key}
          src={`${imgSrcVersionLoader(summonerSpellData.version, 'SPELL')}${spell.image.full}`}
          width={size}
          height={size}
          alt={`${spell.name} 스펠 이미지`}
          className="rounded-[0.4rem]"
          unoptimized
          onMouseOver={e => {
            openTooltip({ component: SummonerSpellTooltip, props: { data: spell }, target: e.target as HTMLElement });
          }}
          onMouseLeave={closeTooltip}
        />
      ))}
    </div>
  );
}

export function SummonerRunesImgRender({
  summonerRunes,
  gameVersion,
  size,
  inGameSummonerRune,
}: {
  summonerRunes?: PerkStyleDtoType[];
  inGameSummonerRune?: [[number, number], [number]];
  gameVersion: string;
  size: number;
}) {
  const { locale }: { locale: LanguageParamsType } = useParams();
  const { data: runeData } = useGetRuneData(gameVersion, locale);
  const { openTooltip, closeTooltip } = useTooltip();
  let runeImgUrlList;

  if (summonerRunes) {
    runeImgUrlList = summonerRunes.map((rune, index) => {
      const matchRuneStyle = runeData.find((data: any) => data.id === rune.style);
      if (index === 0) {
        const mainRune = matchRuneStyle?.slots[0].runes?.find((data: any) => data.id === rune.selections[0].perk);
        return mainRune;
      }
      return matchRuneStyle;
    });
  }

  if (inGameSummonerRune) {
    runeImgUrlList = inGameSummonerRune.map((rune: any, index) => {
      const matchRuneStyle = runeData.find((data: any) => data.id === rune[0]);
      if (index === 0) {
        const mainRune = matchRuneStyle?.slots[0].runes?.find((data: any) => data.id === rune[1]);
        return mainRune;
      }
      return matchRuneStyle;
    });
  }

  return (
    <>
      {runeImgUrlList?.map((rune, index) => {
        if (!rune) return <span key={index} className="w-[2.2rem] h-[2.2rem]"></span>;

        return (
          <Image
            unoptimized
            key={rune.id}
            src={`${DDRAGON_IMG_URL.RUNE}${rune?.icon}`}
            width={size}
            height={size}
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
  gameVersion,
}: {
  isWin: boolean;
  itemsArr: (number | undefined)[];
  gameVersion: string;
}) {
  const { locale }: { locale: LanguageParamsType } = useParams();
  const { data: itemData } = useGetItemsData(gameVersion, locale);

  const renderItemsArr = itemsArr.map(itemId => {
    if (!itemId) return undefined;
    return itemData.data[itemId];
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
            src={`${imgSrcVersionLoader(itemData.version, 'ITEM')}${item.image.full}`}
            width={22}
            height={22}
            alt={`${item.name}`}
            className="rounded-[0.4rem]"
            onMouseOver={e => {
              openTooltip({ component: ItemTooltip, props: { data: item }, target: e.target as HTMLElement });
            }}
            onMouseLeave={closeTooltip}
            unoptimized
          />
        );
      })}
    </div>
  );
}
