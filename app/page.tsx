import DomainMap from '@/components/DomainMap';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-8 sm:py-10">
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
          Rozcestník
        </h1>
        <DomainMap />
      </div>
    </main>
  );
}
