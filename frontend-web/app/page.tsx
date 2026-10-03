import { About } from "./_components/About";
import { CaseStudies } from "./_components/CaseStudies";
import { Contact } from "./_components/Contact";
import { Footer } from "./_components/Footer";
import { GithubActivity } from "./_components/GithubActivity";
import { Header } from "./_components/Header";
import { Hero } from "./_components/Hero";
import { Homelab } from "./_components/Homelab";
import { site } from "@/lib/site";

// GitHub data is re-fetched at most hourly.
export const revalidate = 3600;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: "Full-stack engineer",
  email: `mailto:${site.email}`,
  alumniOf: { "@type": "CollegeOrUniversity", name: "Brunel University London" },
  sameAs: [site.github.url, site.linkedin.url],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Header />
      <main>
        <Hero />
        <About />
        <CaseStudies />
        <Homelab />
        <GithubActivity />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
