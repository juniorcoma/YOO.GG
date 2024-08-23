import { STATIC_DATA_HOST } from '@/constant/API';
import axios, { AxiosError } from 'axios';
import { NextResponse } from 'next/server';

interface Params {
  champname: string;
}
export async function GET(request: Request, context: { params: Params }) {
  const { champname } = context.params;
  const requestValue = champname[0].toUpperCase() + champname.slice(1);
  try {
    const { data } = await axios.get(`${STATIC_DATA_HOST.CHAMPION_DETAIL_DATA}${requestValue}.json`);

    return NextResponse.json(data.data[requestValue], { status: 200 });
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json({ error: error.message, status: error.status }, { status: error.status });
    }
  }
}
