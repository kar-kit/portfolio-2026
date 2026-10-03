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

const person = {
  "@type": "Person",
  "@id": `${site.url}/#person`,
  name: site.name,
  alternateName: "Joey Karkit Pang",
  url: site.url,
  image: `${site.url}/opengraph-image`,
  jobTitle: "Full-stack engineer",
  description: site.description,
  email: `mailto:${site.email}`,
  address: { "@type": "PostalAddress", addressLocality: "London", addressCountry: "GB" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Brunel University London", url: "https://www.brunel.ac.uk" },
  knowsAbout: ["Full-stack development", "TypeScript", "Next.js", "Python", "FastAPI", "Local LLM inference", "Ollama", "Docker", "Proxmox"],
  sameAs: [site.github.url, site.linkedin.url],
};

// One graph so search engines can link the site, the profile page and the person.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebSite", "@id": `${site.url}/#website`, url: site.url, name: site.name, inLanguage: "en-GB", publisher: { "@id": person["@id"] } },
    {
      "@type": "ProfilePage",
      "@id": `${site.url}/#profilepage`,
      url: site.url,
      name: site.title,
      isPartOf: { "@id": `${site.url}/#website` },
      mainEntity: { "@id": person["@id"] },
      inLanguage: "en-GB",
    },
    person,
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <a
        href="#main"
        className="sr-only z-20 rounded-control bg-accent px-4 py-2 text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3 hover:text-ink"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
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
