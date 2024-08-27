import { RIOT_REGIONAL_HOST, RIOT_REQUEST_ENDPOINT } from '@/constant/API';
import { riotRequest } from '@/service/axios';
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
  const type = searchParams.get('type') || 'normal';
  try {
    const { data } = await riotRequest.get(
      `${RIOT_REGIONAL_HOST.ASIA}${RIOT_REQUEST_ENDPOINT.MATCH_ID_LIST}${puuid}/ids?count=20&start=${start}&type=${type}`,
    );
    const matchData: MatchDtoType[] = [];

    for (const matchId of data) {
      const { data } = await riotRequest.get(
        `${RIOT_REGIONAL_HOST.ASIA}${RIOT_REQUEST_ENDPOINT.MATCH_DETAIL_INFO}${matchId}`,
      );
      matchData.push(data);
      await requestDelay(200);
    }

    return NextResponse.json(matchData, { status: 200 });
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json({ error: error.message, status: error.status }, { status: error.status });
    }
  }
}
