import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Stranka nenalezena</h1>
      <p className="text-slate-600">
        Obsah pro tento odkaz neni v databazi dostupny.
      </p>
      <Link
        href="/uvod"
        className="text-sm font-medium text-slate-700 transition hover:text-slate-900"
      >
        Zpet na uvod
      </Link>
    </div>
  );
}
