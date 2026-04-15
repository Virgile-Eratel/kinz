import Link from 'next/link';

export const metadata = {
  title: 'Politique de confidentialité — KINZ',
  description: 'Politique de confidentialité du site KINZ.',
};

export default function Confidentialite() {
  return (
    <main className="min-h-screen bg-charbon px-6 py-16 text-sable md:px-12 md:py-24">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="mb-12 inline-block text-sm text-sable/60 transition-colors hover:text-lagoon-pop"
        >
          ← Accueil
        </Link>

        <h1 className="mb-12 text-4xl font-bold md:text-5xl">Politique de confidentialité</h1>

        <section className="mb-10">
          <h2 className="mb-3 text-xl font-semibold text-pumpkin-pop">Aucune collecte de données</h2>
          <p className="leading-relaxed text-sable/80">
            Le site KINZ ne collecte, ne stocke et ne traite aucune donnée personnelle. Il n&apos;existe
            ni formulaire de contact, ni inscription, ni espace membre, ni newsletter sur ce site.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-xl font-semibold text-pumpkin-pop">Aucun cookie ni traceur</h2>
          <p className="leading-relaxed text-sable/80">
            Le site n&apos;utilise aucun cookie, aucun outil de mesure d&apos;audience, aucun traceur
            publicitaire et aucun service d&apos;analyse tiers. Votre navigation est totalement anonyme.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-xl font-semibold text-pumpkin-pop">Hébergement</h2>
          <p className="leading-relaxed text-sable/80">
            Le site est hébergé par Vercel Inc. (États-Unis). Vercel peut enregistrer des journaux
            techniques (adresse IP, user-agent) à des fins de sécurité et de bon fonctionnement du
            service, conformément à sa propre politique :{' '}
            <a
              href="https://vercel.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lagoon-pop hover:underline"
            >
              vercel.com/legal/privacy-policy
            </a>
            .
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-xl font-semibold text-pumpkin-pop">Liens vers des services tiers</h2>
          <p className="leading-relaxed text-sable/80">
            Le site propose des liens vers Instagram et Discord. Lorsque vous cliquez sur ces liens, vous
            quittez le site KINZ et vous êtes soumis aux politiques de confidentialité de ces plateformes,
            sur lesquelles nous n&apos;avons aucun contrôle.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-xl font-semibold text-pumpkin-pop">Vos droits (RGPD)</h2>
          <p className="leading-relaxed text-sable/80">
            Conformément au Règlement général sur la protection des données (RGPD), vous disposez
            d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, de limitation et
            d&apos;opposition sur vos données. Aucune donnée n&apos;étant collectée par ce site, ces
            droits sont sans objet ici. Pour toute question, vous pouvez nous contacter à{' '}
            <a href="mailto:kinzgameynov@gmail.com" className="text-lagoon-pop hover:underline">
              kinzgameynov@gmail.com
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-pumpkin-pop">Mise à jour</h2>
          <p className="leading-relaxed text-sable/80">
            Cette politique peut être modifiée à tout moment pour refléter des évolutions légales ou
            techniques. Dernière mise à jour : avril 2026.
          </p>
        </section>
      </div>
    </main>
  );
}
