import { STATIC_DATA_HOST } from '@/constant/API';
import axios, { AxiosError } from 'axios';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { data } = await axios.get(`${STATIC_DATA_HOST.CHAMPION_DATA}`);
    const formatData = Object.values(data.data);
    return NextResponse.json(formatData, { status: 200 });
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json({ error: error.message, status: error.status }, { status: error.status });
    }
  }
}
