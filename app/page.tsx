import Nav from "@/components/Nav";
import LocationBar from "@/components/LocationBar";
import Hero from "@/components/Hero";
import Statement from "@/components/Statement";
import OccasionBar from "@/components/OccasionBar";
import Signatures from "@/components/Signatures";
import Atmosphere from "@/components/Atmosphere";
import Locations from "@/components/Locations";
import Proof from "@/components/Proof";
import Visit from "@/components/Visit";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <LocationBar />
      <main>
        <Hero />
        <Statement />
        <OccasionBar />
        <Signatures />
        <Atmosphere />
        <Locations />
        <Proof />
        <Visit />
      </main>
      <Footer />
    </>
  );
}
