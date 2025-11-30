import Header from '../components/Header';
import Hero from '../components/Hero';
import CourseGrid from '../components/CourseGrid';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-space-dark">
      <Header />
      <Hero />
      <CourseGrid />
      <Footer />
    </div>
  );
}
