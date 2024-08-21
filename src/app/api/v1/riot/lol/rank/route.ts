import { RIOT_PLATFORM_HOST, RIOT_REQUEST_ENDPOINT } from '@/constant/API';
import { riotRequest } from '@/service/axios';
import { AxiosError } from 'axios';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { data } = await riotRequest.get(`${RIOT_PLATFORM_HOST.KR}${RIOT_REQUEST_ENDPOINT.RANK}`);
    const sliceData = data.slice(0, 20);
    return NextResponse.json(sliceData, { status: 200 });
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json({ error: error.message, status: error.status }, { status: error.status });
    }
  }
}
