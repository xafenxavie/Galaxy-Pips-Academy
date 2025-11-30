import header from '../components/header';
import hero from '../components/hero';
import coursegrid from '../components/coursegrid';
import footer from '../components/footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-space-dark">
      <header />
      <hero />
      <coursegrid />
      <footer />
    </div>
  );
}
