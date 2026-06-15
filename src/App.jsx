import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import OurStory from "./components/OurStory";
import Gallery from "./components/Gallery";
import EventDetails from "./components/EventDetails";
import Schedule from "./components/Schedule";
import Registry from "./components/Registry";
import Faq from "./components/Faq";
import Travel from "./components/Travel";
import Rsvp from "./components/Rsvp";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div id="top" className="overflow-x-clip">
      <Navbar />
      <main>
        <Hero />
        <OurStory />
        <Gallery />
        <EventDetails />
        <Schedule />
        <Registry />
        <Faq />
        <Travel />
        <Rsvp />
      </main>
      <Footer />
    </div>
  );
}
