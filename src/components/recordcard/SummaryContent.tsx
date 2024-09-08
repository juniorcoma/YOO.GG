import { QUEUEID_KR_TYPE } from '@/constant';
import { calculateGameCreation, calculateGameDuration } from '@/utils/calculateRecordTime';

export default function SummaryContent({
  isWin,
  queueId,
  timeInfo: timeInfo,
}: {
  isWin: boolean;
  queueId: number;
  timeInfo: { gameCreation: number; gameDuration: number };
}) {
  return (
    <div className="flex w-[10.8rem] flex-col gap-[0.8rem] text-[1.2rem] text-color-gray-500">
      <div>
        <div className={`mb-[0.4rem] ${isWin ? 'text-color-primary-600' : 'text-color-red-600'} text-[1.4rem]`}>
          {QUEUEID_KR_TYPE[queueId]}
        </div>
        <div>{calculateGameCreation(timeInfo.gameCreation)}</div>
      </div>
      <div className={`h-[0.1rem] ${isWin ? 'bg-color-primary-200' : 'bg-color-red-200'} w-[60%]`} />
      <div>
        <div className="mb-[0.4rem]">{isWin ? '승리' : '패배'}</div>
        <div>{calculateGameDuration(timeInfo.gameDuration)}</div>
      </div>
    </div>
  );
}
