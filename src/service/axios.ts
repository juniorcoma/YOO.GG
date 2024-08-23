import axios from 'axios';

export const riotRequest = axios.create({
  headers: {
    'X-Riot-Token': process.env.RIOT_DEVELOP_TOKEN,
  },
});

export const backendRequest = axios.create({
  baseURL: process.env.SERVER_HOST,
});
