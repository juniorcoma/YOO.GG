interface RuneTooltipProps {
  data: {
    id: number;
    key: string;
    icon: string;
    name: string;
    shortDesc?: string;
  };
}

export default function RuneTooltip({ data }: RuneTooltipProps) {
  console.log(data);
  return (
    <div className={`flex flex-col text-[1.2rem] gap-[0.4rem] ${data?.shortDesc ? 'min-w-[20rem]' : ''}`}>
      <strong className="text-[1.4rem] text-[#FFA500]">{data.name}</strong>
      {data.shortDesc && <p dangerouslySetInnerHTML={{ __html: data.shortDesc }}></p>}
    </div>
  );
}
