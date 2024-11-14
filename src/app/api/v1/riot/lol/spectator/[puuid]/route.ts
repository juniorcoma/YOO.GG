import { RIOT_PLATFORM_HOST, RIOT_REQUEST_ENDPOINT } from '@/constant/API';
import { riotRequest } from '@/service/axios';
import { AxiosError } from 'axios';
import { NextResponse } from 'next/server';

interface Params {
  puuid: string;
}

export async function GET(request: Request, context: { params: Params }) {
  const { puuid } = context.params;

  try {
    const { data } = await riotRequest.get(`${RIOT_PLATFORM_HOST.KR}${RIOT_REQUEST_ENDPOINT.SPECTATOR}${puuid}`);

    return NextResponse.json({ ingame: true, data }, { status: 200 });
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 404) {
        return NextResponse.json({ ingame: false }, { status: 200 });
      }
      return NextResponse.json({ error: error, status: error.status }, { status: error.status });
    }
  }
}
