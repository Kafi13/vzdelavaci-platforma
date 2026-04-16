import DomainMap from '@/components/DomainMap';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#eef2ff_45%,#f8fafc_100%)] px-4 py-6 sm:px-8 sm:py-10">
      <div className="mx-auto w-full max-w-7xl space-y-8">
        <div className="space-y-3">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-slate-500">
            Domovská Stránka
          </p>
          <h1 className="max-w-4xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            Interaktivní mapa předmětu
          </h1>
          <p className="max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
            Jasný přehled studijní cesty od kapitol po zkoušku.
          </p>
        </div>
        <DomainMap />
      </div>
    </main>
  );
}
