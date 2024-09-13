import { ChampionDataType } from '@/types/staticData';
import ContentBox from '../common/ContentBox';
import ChampionSkillBox from '../contentboxinner/ChampionSkillBox';
import ChampionStatTable from '../contentboxinner/ChampionStatTable';
import ChampionSkinControlContainer from '../ChampionSkinControlContainer';
import { useTranslations } from 'next-intl';
import { LanguageParamsType } from '@/types';

interface ChampionInfoContainerProps {
  champDetailData: ChampionDataType;
  latestVersion: string;
  passive: { abilityVideoPath: string };
  spells: { abilityVideoPath: string }[];
  champName: string;
  language: LanguageParamsType;
}

export default function ChampionInfoContainer({
  champDetailData,
  latestVersion,
  passive,
  spells,
  champName,
  language,
}: ChampionInfoContainerProps) {
  const t = useTranslations('championDetail');
  return (
    <>
      <div className="flex-1 flex flex-col gap-[1.6rem]">
        <section>
          <ContentBox
            titleText={`${champDetailData.name} ${t('skillContent')}`}
            SubTitleComponent={<div className="text-[1.2rem] text-color-gray-500">{t('skillContentSub')}</div>}
          >
            <ChampionSkillBox
              skill={[champDetailData.passive, ...champDetailData.spells]}
              communitySkillData={[passive, ...spells]}
              version={latestVersion}
            />
          </ContentBox>
        </section>
        <section>
          <ContentBox
            titleText={`${champDetailData.name}  ${t('champStatContent')}`}
            SubTitleComponent={
              <span className="text-[1.2rem] text-color-primary-500">
                {t('champStatContentSub')} : {champDetailData.partype}
              </span>
            }
          >
            <ChampionStatTable stat={champDetailData.stats} partype={champDetailData.partype} language={language} />
          </ContentBox>
        </section>
        <section>
          <ChampionSkinControlContainer
            titleName={champDetailData.name}
            name={champName}
            skinRenderList={champDetailData.skins}
          />
        </section>
      </div>
      <div className="w-[39.1rem] flex flex-col gap-[1.6rem]">
        <section>
          <ContentBox titleText={t('champStoryContent')}>
            <div className="px-[1.6rem] pt-[1.6rem] pb-[2.4rem] text-[1.6rem]">
              <p>{champDetailData.lore}</p>
            </div>
          </ContentBox>
        </section>
        <section>
          <ContentBox titleText={t('champTipContent')}>
            <div className="px-[1.6rem] pt-[1.6rem] pb-[2.4rem] text-[1.6rem]">
              <p className="text-color-primary-500 mb-[1.2rem]">{t('champTipContentSub1')}</p>
              {champDetailData.allytips.map((tip: string, index: number) => (
                <p key={index} className="text-[1.4rem] mb-[0.8rem]">
                  {tip}
                </p>
              ))}
              <p className="text-color-red-500 mb-[1.2rem]">{t('champTipContentSub2')}</p>
              {champDetailData.enemytips.map((tip: string, index: number) => (
                <p key={index} className="text-[1.4rem] mb-[0.8rem]">
                  {tip}
                </p>
              ))}
            </div>
          </ContentBox>
        </section>
      </div>
    </>
  );
}
