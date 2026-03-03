import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import HorizontalScroll from '@/components/HorizontalScroll';
import TeamSection from '@/components/TeamSection';
import Footer from '@/components/Footer';
import HeroParallax from '@/components/HeroParallax';

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <HeroParallax />
        <section id="features">
          <div className="block md:hidden">
            <p>TODO scroll mobile</p>
          </div>
          <div className="hidden md:block">
            <HorizontalScroll />
          </div>
        </section>
        <TeamSection />
      </main>
      <section id="footer">
        <Footer />
      </section>
    </>
  );
}
