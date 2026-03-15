import DomainMap from '@/components/DomainMap';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 sm:p-12">
      <div className="w-full max-w-5xl space-y-8">
        <div className="text-center space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Interaktivní mapa předmětu</h1>
          <p className="text-gray-600 text-lg">Klikněte na libovolný modul pro zahájení studia.</p>
        </div>
        <DomainMap />
      </div>
    </main>
  );
}
