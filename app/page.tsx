import Navigation from '@/components/Navigation';
import CardsShowcase from '@/components/CardsShowcase';
import CardsShowcaseMobile from '@/components/CardsShowcaseMobile';
import ImageMarquee from '@/components/ImageMarquee';
import BuySection from '@/components/BuySection';
import TeamSection from '@/components/TeamSection';
import Footer from '@/components/Footer';
import HeroParallax from '@/components/HeroParallax';

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <HeroParallax />
        <div id="rules" className="relative">
          <div className="hidden md:block relative z-10 -mt-[40vh]">
            <CardsShowcase />
          </div>
          <div className="block md:hidden relative z-10 -mt-[25vh]">
            <CardsShowcaseMobile />
          </div>
        </div>
        <ImageMarquee />
        <div data-nav-theme="dark">
          <BuySection />
        </div>
        <div data-nav-theme="dark">
          <TeamSection />
        </div>
      </main>
      <div data-nav-theme="dark">
        <section id="footer">
          <Footer />
        </section>
      </div>
    </>
  );
}
