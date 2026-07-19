import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import OurStory from "./components/OurStory";
import Gallery from "./components/Gallery";
import SharedMoments from "./components/SharedMoments";
import EventDetails from "./components/EventDetails";
import Schedule from "./components/Schedule";
import Registry from "./components/Registry";
import Faq from "./components/Faq";
import Rsvp from "./components/Rsvp";
import Footer from "./components/Footer";
import MusicPlayer from "./components/MusicPlayer";
import WelcomeGate from "./components/WelcomeGate";
import UploadModal from "./components/moments/UploadModal";

export default function App() {
  return (
    <div id="top" className="overflow-x-clip">
      <WelcomeGate />
      <UploadModal />
      <MusicPlayer />
      <Navbar />
      <main>
        <Hero />
        <OurStory />
        <Gallery />
        <SharedMoments />
        <EventDetails />
        <Schedule />
        <Registry />
        <Faq />
        <Rsvp />
      </main>
      <Footer />
    </div>
  );
}
