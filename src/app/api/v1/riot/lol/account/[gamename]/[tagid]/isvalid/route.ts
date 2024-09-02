import { RIOT_REGIONAL_HOST, RIOT_REQUEST_ENDPOINT } from '@/constant/API';
import { riotRequest } from '@/service/axios';
import { AccountType } from '@/types/response';
import { NextResponse } from 'next/server';

interface Params {
  gamename: string;
  tagid: string;
}

export async function GET(request: Request, context: { params: Params }) {
  const { gamename, tagid } = context.params;
  try {
    await riotRequest.get<AccountType>(
      `${RIOT_REGIONAL_HOST.ASIA}${RIOT_REQUEST_ENDPOINT.ACCOUNT}${gamename}/${tagid}`,
    );

    return NextResponse.json(true);
  } catch (error) {
    return NextResponse.json(false);
  }
}
