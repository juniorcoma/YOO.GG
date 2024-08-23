import { STATIC_DATA_HOST } from '@/constant/API';
import { getRotationsChampion } from '@/service/server.api';
import Image from 'next/image';
import Link from 'next/link';

export default async function RotationsList() {
  const rotationsData = await getRotationsChampion();
  console.log(rotationsData);
  return (
    <ul className="px-[1.6rem] py-[1.2rem] flex flex-wrap gap-[1.2rem]">
      {rotationsData.map((champ: any) => (
        <li key={champ.key} className="relative ">
          <Link href={`/champions/${champ.id}/info`}>
            <Image
              src={`${STATIC_DATA_HOST.CHAMPION_SQUARE_IMG}${champ.image.full}`}
              width={64}
              height={64}
              alt="이미지"
            />
            <div className="champ-name">{champ.name}</div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
