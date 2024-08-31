'use client';

import { LOL_WORLDS_MUSIC } from '@/constant/API';
import { LOL_WORLDS_RENDER_LIST } from '@/constant/renderList';
import useModal from '@/hook/useModal';
import useOutsideClick from '@/hook/useOutsideClick';

export default function WorldsMusicList() {
  const { openModal } = useModal();
  return (
    <div className="p-[1.6rem]">
      <ul className="flex flex-wrap text-[1.4rem]">
        {LOL_WORLDS_RENDER_LIST.map(item => (
          <li key={item.id} className="w-[25%] aspect-square">
            <button
              onClick={() => openModal({ component: WorldsVideo, props: { videoSrc: LOL_WORLDS_MUSIC[item.year] } })}
              className="flex justify-center items-center h-full w-full"
              type="button"
            >
              <span>{item.year}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function WorldsVideo({ videoSrc }: { videoSrc: string }) {
  const ref = useOutsideClick<HTMLDivElement>();
  return (
    <div ref={ref}>
      <iframe
        width="760"
        height="515"
        src={videoSrc}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
}
