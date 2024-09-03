'use client';

import { LOL_CINEMATIC_MUSIC, LOL_WORLDS_MUSIC } from '@/constant/API';
import { LOL_CINEMATIC_RENDER_LIST, LOL_WORLDS_RENDER_LIST } from '@/constant/renderList';
import useModal from '@/hook/useModal';
import useOutsideClick from '@/hook/useOutsideClick';

interface LolMusicListProps {
  contentType: 'worlds' | 'cinematic';
}

export default function LolMusicList({ contentType }: LolMusicListProps) {
  const { openModal } = useModal();
  return (
    <div className="h-[24rem] overflow-auto hidden-scroll pb-[1.6rem]">
      <ul className="flex flex-wrap text-[1.4rem] flex-col">
        {contentType === 'worlds'
          ? LOL_WORLDS_RENDER_LIST.map(item => (
              <li key={item.id} className="hover:bg-color-primary-100 h-[4rem]">
                <button
                  onClick={() => openModal({ component: Video, props: { videoSrc: LOL_WORLDS_MUSIC[item.year] } })}
                  className="flex py-[0.8rem] px-[1.6rem] items-center w-full justify-between"
                  type="button"
                >
                  <div>
                    <span className="text-color-gray-400">{item.year}</span>
                    <span className="ml-[0.8rem] text-[1.6rem] font-bold">{item.info.title}</span>
                  </div>
                  <span className="artist">{item.info.artist}</span>
                </button>
              </li>
            ))
          : LOL_CINEMATIC_RENDER_LIST.map(item => (
              <li key={item.id} className="hover:bg-color-primary-100 h-[4rem]">
                <button
                  onClick={() => openModal({ component: Video, props: { videoSrc: LOL_CINEMATIC_MUSIC[item.year] } })}
                  className="flex py-[0.8rem] px-[1.6rem] items-center w-full"
                  type="button"
                >
                  <span className="text-color-gray-400">{item.year}</span>
                  <span className="ml-[0.8rem] text-[1.6rem] font-bold">{item.title}</span>
                </button>
              </li>
            ))}
      </ul>
    </div>
  );
}

function Video({ videoSrc }: { videoSrc: string }) {
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
