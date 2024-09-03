import SummonerSearchForm from '@/components/summonersearchform/SummonerSearchForm';

interface HiddenHeaderProps {
  open: boolean;
  path: string;
}

export default function HiddenHeader({ open, path }: HiddenHeaderProps) {
  return (
    <div className={`hidden-header ${open ? 'view' : ''} ${path === '/' ? 'hidden' : ''}`}>
      <div>
        <SummonerSearchForm />
      </div>
      <div className="bottom-line" />
    </div>
  );
}
