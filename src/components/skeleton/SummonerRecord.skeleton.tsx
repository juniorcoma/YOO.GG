export default function SummonerRecordSkeleton() {
  return (
    <div className="flex flex-col gap-[2.4rem]">
      <div className="skeleton rounded-[0.8rem] h-[21.5rem]"></div>
      <div className="flex flex-col gap-[0.8rem]">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="rounded-[0.4rem] h-[10.8rem] skeleton"></div>
        ))}
      </div>
    </div>
  );
}
