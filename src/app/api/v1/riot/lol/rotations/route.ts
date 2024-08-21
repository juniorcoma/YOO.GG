import { RIOT_PLATFORM_HOST, RIOT_REQUEST_ENDPOINT } from '@/constant/API';
import { riotRequest } from '@/service/axios';
import { RotationsDataType } from '@/types/response';
import { AxiosError } from 'axios';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { data } = await riotRequest.get<RotationsDataType>(
      `${RIOT_PLATFORM_HOST.KR}${RIOT_REQUEST_ENDPOINT.CHAMP_ROTATIONS}`,
    );
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json({ error: error.message, status: error.status }, { status: error.status });
    }
  }
}
