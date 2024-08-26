import { STATIC_DATA_HOST } from '@/constant/API';
import axios, { AxiosError } from 'axios';
import { NextResponse } from 'next/server';

interface Params {
  champkey: string;
}

export async function GET(request: Request, context: { params: Params }) {
  const requestUrlParams = new URL(request.url).searchParams;
  const startValue = requestUrlParams.get('skillkey') || '';
  const { champkey } = context.params;
  try {
    const { data } = await axios.get(`${STATIC_DATA_HOST.OTHER_CHAMPION_DATA}${champkey}.json`);
    if (startValue === 'p') return NextResponse.json(data.passive, { status: 200 });
    return NextResponse.json(
      data.spells.find((data: any) => data.spellKey === startValue),
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json({ error: error.message, status: error.status }, { status: error.status });
    }
  }
}
