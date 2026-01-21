import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import HorizontalScroll from '@/components/HorizontalScroll';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navigation />
      
      <main>
        <Hero />
        
        <section id="features">
          <HorizontalScroll />
        </section>
        
      </main>
      
      <section id="footer">
        <Footer />
      </section>
    </>
  );
}
