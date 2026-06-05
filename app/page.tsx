import Nav from "@/components/Nav";
import LocationBar from "@/components/LocationBar";
import Hero from "@/components/Hero";
import Signatures from "@/components/Signatures";
import Atmosphere from "@/components/Atmosphere";
import Locations from "@/components/Locations";
import Proof from "@/components/Proof";
import Connect from "@/components/Connect";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <LocationBar />
      <main>
        <Hero />
        <Signatures />
        <Locations />
        <Atmosphere />
        <Proof />
        <Connect />
      </main>
      <Footer />
    </>
  );
}
