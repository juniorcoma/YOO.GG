import useOutsideClick from '@/hook/useOutsideClick';

export default function YouTubeVideoBox({ videoSrc }: { videoSrc: string }) {
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
