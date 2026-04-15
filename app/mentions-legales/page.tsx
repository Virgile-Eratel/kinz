import Link from 'next/link';

export const metadata = {
  title: 'Mentions légales — KINZ',
  description: 'Mentions légales du site KINZ.',
};

export default function MentionsLegales() {
  return (
    <main className="min-h-screen bg-charbon px-6 py-16 text-sable md:px-12 md:py-24">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="mb-12 inline-block text-sm text-sable/60 transition-colors hover:text-lagoon-pop"
        >
          ← Accueil
        </Link>

        <h1 className="mb-12 text-4xl font-bold md:text-5xl">Mentions légales</h1>

        <section className="mb-10">
          <h2 className="mb-3 text-xl font-semibold text-pumpkin-pop">Éditeur du site</h2>
          <p className="leading-relaxed text-sable/80">
            Virgile Marty
            <br />
            Rennes (35000), France
            <br />
            Contact : <a href="mailto:kinzgameynov@gmail.com" className="text-lagoon-pop hover:underline">kinzgameynov@gmail.com</a>
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-xl font-semibold text-pumpkin-pop">Directeur de la publication</h2>
          <p className="leading-relaxed text-sable/80">Virgile Marty</p>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-xl font-semibold text-pumpkin-pop">Hébergeur</h2>
          <p className="leading-relaxed text-sable/80">
            Vercel Inc.
            <br />
            440 N Barranca Ave #4133
            <br />
            Covina, CA 91723, États-Unis
            <br />
            <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-lagoon-pop hover:underline">vercel.com</a>
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-xl font-semibold text-pumpkin-pop">Propriété intellectuelle</h2>
          <p className="leading-relaxed text-sable/80">
            L&apos;ensemble du site — structure, textes, visuels, logos, illustrations et code — est la propriété
            exclusive de Virgile Marty et du projet KINZ, sauf mention contraire. Toute reproduction,
            représentation ou diffusion, totale ou partielle, sans autorisation écrite préalable est interdite
            et constituerait une contrefaçon sanctionnée par les articles L.335-2 et suivants du Code de la
            propriété intellectuelle.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-xl font-semibold text-pumpkin-pop">Responsabilité</h2>
          <p className="leading-relaxed text-sable/80">
            Les informations présentes sur ce site sont fournies à titre indicatif. L&apos;éditeur s&apos;efforce
            d&apos;en garantir l&apos;exactitude mais ne saurait être tenu responsable d&apos;éventuelles
            erreurs, omissions ou indisponibilités du service.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-pumpkin-pop">Droit applicable</h2>
          <p className="leading-relaxed text-sable/80">
            Le présent site est soumis au droit français. Tout litige relatif à son utilisation relève de la
            compétence des juridictions françaises.
          </p>
        </section>
      </div>
    </main>
  );
}
