import { RIOT_PLATFORM_HOST, RIOT_REGIONAL_HOST, RIOT_REQUEST_ENDPOINT } from '@/constant/API';
import { riotRequest } from '@/service/axios';
import { AccountType, SummonerDataType } from '@/types/response';
import { AxiosError } from 'axios';
import { NextResponse } from 'next/server';

interface Params {
  gamename: string;
  tagid: string;
}

export async function GET(request: Request, context: { params: Params }) {
  const { gamename, tagid } = context.params;
  try {
    const { data: accountData } = await riotRequest.get<AccountType>(
      `${RIOT_REGIONAL_HOST.ASIA}${RIOT_REQUEST_ENDPOINT.ACCOUNT}${gamename}/${tagid}`,
    );
    const { data: accountDetailData } = await riotRequest.get<SummonerDataType>(
      `${RIOT_PLATFORM_HOST.KR}${RIOT_REQUEST_ENDPOINT.ACCOUNT_DETAIL}${accountData.puuid}`,
    );
    const data = {
      ...accountData,
      ...accountDetailData,
    };

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json({ error: error.message, status: error.status }, { status: error.status });
    }
  }
}
