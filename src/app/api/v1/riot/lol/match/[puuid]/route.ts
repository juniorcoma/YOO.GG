import { GAME_TYPE_QUEUEID } from '@/constant';
import { RIOT_REGIONAL_HOST, RIOT_REQUEST_ENDPOINT } from '@/constant/API';
import { riotRequest } from '@/service/axios';
import { GameType } from '@/types';

import { AxiosError } from 'axios';
import { NextResponse } from 'next/server';

interface Params {
  puuid: string;
}

export async function GET(request: Request, context: { params: Params }) {
  const searchParams = new URL(request.url).searchParams;
  const { puuid } = context.params;
  const start = searchParams.get('start') || '0';
  const type = (searchParams.get('type') as GameType | undefined) || 'TOTAL';

  try {
    let dataArr;
    if (type === 'TOTAL') {
      const data = await filterResponseData(puuid, start);
      dataArr = data.slice();
    } else {
      const queueId = GAME_TYPE_QUEUEID[type];
      const { data } = await riotRequest.get(
        `${RIOT_REGIONAL_HOST.ASIA}${RIOT_REQUEST_ENDPOINT.MATCH_ID_LIST}${puuid}/ids?count=15&start=${start}&queue=${queueId}`,
      );
      const matchPromises = data.map(async (matchId: string) => {
        const { data } = await riotRequest.get(
          `${RIOT_REGIONAL_HOST.ASIA}${RIOT_REQUEST_ENDPOINT.MATCH_DETAIL_INFO}${matchId}`,
        );
        return data;
      });

      const resolvedMatchData = await Promise.all(matchPromises);
      const filterEmptyData = resolvedMatchData.filter(data => data !== undefined);

      dataArr = filterEmptyData.slice();
    }

    return NextResponse.json(dataArr, { status: 200 });
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json({ error: error.message, status: error.status }, { status: error.status });
    }
  }
}

async function filterResponseData(puuid: string, start: string) {
  const queueId = [450, 490, 420, 440];
  const { data } = await riotRequest.get(
    `${RIOT_REGIONAL_HOST.ASIA}${RIOT_REQUEST_ENDPOINT.MATCH_ID_LIST}${puuid}/ids?count=20&start=${start}`,
  );

  const matchPromises = data.map(async (matchId: string) => {
    const { data } = await riotRequest.get(
      `${RIOT_REGIONAL_HOST.ASIA}${RIOT_REQUEST_ENDPOINT.MATCH_DETAIL_INFO}${matchId}`,
    );

    if (queueId.includes(data.info.queueId)) {
      return data;
    }
  });

  const resolvedMatchData = await Promise.all(matchPromises);
  return resolvedMatchData.filter(match => match !== undefined);
}
