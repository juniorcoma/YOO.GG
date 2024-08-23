interface HomeContentBoxProps {
  children: React.ReactNode;
  titleText: string;
  css?: string;
}

export default function HomeContentBox({ children, titleText, css }: HomeContentBoxProps) {
  return (
    <div className={`content-box ${css}`}>
      <div className="p-[1.6rem] border-b border-color-primary-500">
        <h2 className="font-bold text-color-gray-500 text-[1.4rem]">{titleText}</h2>
      </div>
      {children}
    </div>
  );
}
