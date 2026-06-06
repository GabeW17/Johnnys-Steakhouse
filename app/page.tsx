import Nav from "@/components/Nav";
import LocationBar from "@/components/LocationBar";
import Hero from "@/components/Hero";
import Signatures from "@/components/Signatures";
import Atmosphere from "@/components/Atmosphere";
import Locations from "@/components/Locations";
import Proof from "@/components/Proof";
import Connect from "@/components/Connect";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import EditBridge from "@/components/EditBridge";
import { getContent } from "@/lib/getContent";

export default async function Home({
  searchParams,
}: {
  searchParams?: { edit?: string };
}) {
  const c = await getContent();
  const editing = searchParams?.edit === "1";
  return (
    <>
      <EditBridge />
      <Nav />
      <LocationBar />
      <main>
        <Hero data={c.hero} />
        <Banner data={c.banner} editing={editing} />
        <Signatures data={c.signatures} />
        <Locations />
        <Atmosphere data={c.atmosphere} />
        <Proof />
        <Connect />
      </main>
      <Footer />
    </>
  );
}
