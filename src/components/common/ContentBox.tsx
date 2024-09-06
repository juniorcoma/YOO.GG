interface HomeContentBoxProps {
  children: React.ReactNode;
  titleText: string;
  css?: string;
  SubTitleComponent?: React.ReactNode;
}

export default function ContentBox({ children, titleText, css, SubTitleComponent }: HomeContentBoxProps) {
  return (
    <div className={`content-box ${css}`}>
      <div
        className={`p-[1.6rem] border-b border-color-gray-200 ${
          SubTitleComponent && 'flex justify-between items-center'
        }`}
      >
        <h2 className="font-bold text-color-gray-500 text-[1.4rem]">{titleText}</h2>
        {SubTitleComponent}
      </div>
      {children}
    </div>
  );
}
