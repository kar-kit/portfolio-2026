import { site } from "@/lib/site";
import { ContactForm } from "./ContactForm";

export function Contact() {
  const links = [
    ["Email", site.email, `mailto:${site.email}`],
    ["GitHub", site.github.handle, site.github.url],
    ["LinkedIn", site.linkedin.handle, site.linkedin.url],
  ] as const;
  return (
    <section id="contact" className="relative overflow-hidden border-t border-line">
      <div aria-hidden className="numeral -right-[0.04em] -bottom-[0.12em]">
        05
      </div>
      <div className="gutter relative mx-auto max-w-[1280px] pt-[clamp(72px,9vw,128px)] pb-[clamp(96px,12vw,160px)]">
        <h2 className="font-mono text-[clamp(44px,9vw,136px)] leading-[0.95] font-bold tracking-[-0.055em]">
          Get in touch
        </h2>
        <div className="mt-[clamp(40px,5vw,72px)] flex flex-wrap items-start gap-x-[clamp(40px,7vw,120px)] gap-y-12">
          <div className="max-w-[380px] min-w-0 flex-[1_1_260px]">
            <p className="text-pretty text-ink-2">
              For roles, interviews or questions about any of the work above. I read every message myself and reply
              within two working days.
            </p>
            <dl className="mt-7 grid grid-cols-[auto_minmax(0,1fr)] gap-x-5 gap-y-2.5 text-[15px]">
              {links.map(([k, label, href]) => (
                <div key={k} className="contents">
                  <dt className="pt-0.5 font-mono text-[13px] text-ink-3">{k}</dt>
                  <dd>
                    <a href={href}>{label}</a>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="ml-auto max-w-[680px] min-w-0 flex-[2_1_420px]">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
