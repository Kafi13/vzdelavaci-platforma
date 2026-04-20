import DomainMap from '@/components/DomainMap';

export default function HomePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
        Rozcestník
      </h1>
      <DomainMap />
    </div>
  );
}
