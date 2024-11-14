import Image from 'next/image';
import InGameHeader from './InGameHeader';
import { LanguageParamsType } from '@/types';
import InGameInfoTable from './InGameInfoTable';

interface InGameContainerProps {
  inGameData: {
    ingame: boolean;
    data?: any;
  };
  locale: LanguageParamsType;
}

export default function InGameContainer({ inGameData, locale }: InGameContainerProps) {
  if (!inGameData.ingame) {
    return (
      <div className="flex flex-col gap-[1.6rem] text-[2.4rem] items-center">
        <div className="w-[12.8rem] aspect-square relative">
          <Image src={'/images/em_bee_sad.png'} fill alt="벌꿀 이미지" />
        </div>
        <p></p>
      </div>
    );
  }
  const groupParticipants = groupedData(inGameData.data.participants);

  return (
    <div className="w-full pb-[3.2rem]">
      <InGameHeader inGameData={inGameData.data} locale={locale} />
      {groupParticipants.map((list: any, index) => (
        <InGameInfoTable
          key={index}
          participantList={list}
          locale={locale}
          queueId={inGameData.data.gameQueueConfigId}
          bannedChampionList={inGameData.data.bannedChampions}
        />
      ))}
    </div>
  );
}

function groupedData(dataArr: any[]) {
  const groupData = dataArr.reduce((acc, current) => {
    const { teamId } = current;

    if (!acc[teamId]) {
      acc[teamId] = [];
    }

    acc[teamId].push(current);

    return acc;
  }, {});

  return Object.values(groupData);
}
