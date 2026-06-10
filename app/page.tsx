import Nav from "@/components/Nav";
import LocationBar from "@/components/LocationBar";
import Hero from "@/components/Hero";
import Signatures from "@/components/Signatures";
import Atmosphere from "@/components/Atmosphere";
import Locations from "@/components/Locations";
import Proof from "@/components/Proof";
import Connect from "@/components/Connect";
import Promos from "@/components/Promos";
import Footer from "@/components/Footer";
import EditBridge from "@/components/EditBridge";
import { getContent } from "@/lib/getContent";
import { homeSchema } from "@/lib/schema";

export default async function Home() {
  const c = await getContent();
  return (
    <>
      {/* Structured data — embedded once the Audit's "Structured data" fix is applied */}
      {c.seo?.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema(c)) }}
        />
      )}
      <EditBridge />
      <Nav />
      <LocationBar />
      <main>
        <Hero data={c.hero} />
        <Promos promos={c.promotions} target="home" />
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
