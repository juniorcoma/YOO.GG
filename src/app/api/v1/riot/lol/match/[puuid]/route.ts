import { GAME_TYPE_QUEUEID } from '@/constant';
import { RIOT_REGIONAL_HOST, RIOT_REQUEST_ENDPOINT } from '@/constant/API';
import { GAME_TYPE_RENDER_LIST } from '@/constant/renderList';
import { riotRequest } from '@/service/axios';
import { GameType } from '@/types';
import { MatchDtoType } from '@/types/response';
import { AxiosError } from 'axios';
import { NextResponse } from 'next/server';

interface Params {
  puuid: string;
}

//요청 딜레이 함수
async function requestDelay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function GET(request: Request, context: { params: Params }) {
  const searchParams = new URL(request.url).searchParams;
  const { puuid } = context.params;
  const start = searchParams.get('start') || '0';
  const type = (searchParams.get('type') as GameType | undefined) || 'TOTAL';
  try {
    if (type === 'TOTAL') {
      return filterResponseData(puuid, start);
    } else {
      const queueId = GAME_TYPE_QUEUEID[type];
      const { data } = await riotRequest.get(
        `${RIOT_REGIONAL_HOST.ASIA}${RIOT_REQUEST_ENDPOINT.MATCH_ID_LIST}${puuid}/ids?count=20&start=${start}&queue=${queueId}`,
      );
      const matchData: MatchDtoType[] = [];

      for (const matchId of data) {
        const { data } = await riotRequest.get(
          `${RIOT_REGIONAL_HOST.ASIA}${RIOT_REQUEST_ENDPOINT.MATCH_DETAIL_INFO}${matchId}`,
        );
        matchData.push(data);
        await requestDelay(100);
      }

      return NextResponse.json(matchData, { status: 200 });
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json({ error: error.message, status: error.status }, { status: error.status });
    }
  }
}

async function filterResponseData(puuid: string, start: string) {
  const matchData: MatchDtoType[] = [];
  const queueId = [450, 490, 420, 440];
  const { data } = await riotRequest.get(
    `${RIOT_REGIONAL_HOST.ASIA}${RIOT_REQUEST_ENDPOINT.MATCH_ID_LIST}${puuid}/ids?count=20&start=${start}`,
  );

  for (const matchId of data) {
    const { data } = await riotRequest.get(
      `${RIOT_REGIONAL_HOST.ASIA}${RIOT_REQUEST_ENDPOINT.MATCH_DETAIL_INFO}${matchId}`,
    );

    if (queueId.includes(data.info.queueId)) {
      matchData.push(data);
    }
    await requestDelay(100);
  }
  return NextResponse.json(matchData, { status: 200 });
}
