import type { ReactNode } from "react";
import { images, type ImageKey } from "./assets";
import { CircleArc, LineFall, LineH, LineRise, LineV, Logo } from "./svg";

declare module "react" {
  interface HTMLAttributes<T> {
    /** Marks the part of a hover component that CSS and the motion layer animate. */
    hover?: string;
  }
}

export const FULL_WIDTH_SIZES = "(max-width: 1920px) 100vw, 1920px";

const SOURCE = "https://www.era-residence.com";
/** Routes outside this clone keep pointing at the source site. */
export const APARTMENTS_URL = `${SOURCE}/apartments`;
export const CONTACT_URL = `${SOURCE}/contact`;

export const PRIVACY_URL =
  "https://cdn.prod.website-files.com/6a0853d5dab31b18f0677081/6a1576532e78ed7645599d9b_politica_privacidad_era_residence.pdf";
export const TERMS_URL =
  "https://cdn.prod.website-files.com/6a0853d5dab31b18f0677081/6a1576732e78ed764559c153_terms_of_use_era_residence%20(1).pdf";

type ImgProps = {
  name: ImageKey;
  className?: string;
  alt?: string;
  sizes?: string;
  parallax?: string;
};

export function Img({ name, className = "img", alt = "", sizes, parallax }: ImgProps) {
  const image: { src: string; srcSet?: string } = images[name];
  return (
    <img
      src={image.src}
      srcSet={image.srcSet}
      sizes={image.srcSet ? sizes : undefined}
      loading="eager"
      alt={alt}
      className={className}
      data-parallax={parallax}
    />
  );
}

export function Embed({ className, children }: { className: string; children: ReactNode }) {
  return <div className={`${className} w-embed`}>{children}</div>;
}

export function LogoMark() {
  return (
    <Embed className="logo">
      <Logo />
    </Embed>
  );
}

/** Spacer utilities from the source design system: u-48, u-160 b-mob, and so on. */
export function U({ s, on }: { s: number; on?: "desk" | "mob" }) {
  return <div className={`u-${s}${on ? ` b-${on}` : ""}`} />;
}

const MED_VARIANT = "w-variant-db77920b-274b-9558-1ced-34e87f5b7d94";

export function Decor({ variant }: { variant: "large" | "med" }) {
  const frames: [string, ReactNode][] = [
    ["frame_l-tb", <LineV key="l" />],
    ["frame_lt", <LineFall key="lt" />],
    ["frame_t-lr", <LineH key="t" />],
    ["frame_rt", <LineRise key="rt" />],
    ["frame_r-tb", <LineV key="r" />],
    ["frame_rb", <LineFall key="rb" />],
    ["frame_b-lr", <LineH key="b" />],
    ["frame_lb", <LineRise key="lb" />],
  ];
  return (
    <div data-wf--decor--variant={variant} className="decor">
      {frames.map(([name, line]) => (
        <Embed key={name} className={variant === "med" ? `${name} ${MED_VARIANT}` : name}>
          {line}
        </Embed>
      ))}
    </div>
  );
}

export function Flower({ n, className, parallax }: { n: number; className: string; parallax?: string }) {
  const posters: Record<number, string> = {
    1: "bougainvillea-flowers_01-0caed",
    2: "bougainvillea-flowers_02-84c4a",
    3: "bougainvillea-flowers_03-1647a",
    4: "bougainvillea-flowers_04-07e84",
    5: "bougainvillea-flowers_05-f295d",
    6: "bougainvillea-flowers_06-5fef2",
    7: "bougainvillea-flowers_07-0caf0",
  };
  const name = `bougainvillea-flowers_0${n}`;
  return (
    <div data-parallax={parallax} className={`flower ${className}`}>
      <video
        muted
        playsInline
        loop
        disablePictureInPicture
        poster={`/sites/era/images/${posters[n]}.avif`}
        className="video"
      >
        <source src={`/sites/era/video/${name}.webm`} type="video/webm" />
        <source src={`/sites/era/video/${name}.mov`} type="video/mp4" />
      </video>
    </div>
  );
}

/** Label that swaps with a duplicate on hover, animated per character. */
function DoubleLabel({ wrap, text, textClass }: { wrap: string; text: ReactNode; textClass: string }) {
  return (
    <div className={`${wrap}_label`}>
      <div className={`${wrap}_label_text`}>
        <div hover="text" className={textClass}>
          {text}
        </div>
      </div>
      <div className={`${wrap}_label_text is-2`}>
        <div hover="text" className={textClass}>
          {text}
        </div>
      </div>
    </div>
  );
}

/** Body-size text link with the per-character swap. */
export function NavItem({ label, href, external }: { label: string; href: string; external?: boolean }) {
  return (
    <a
      hover-nav-item=""
      aria-label={label}
      href={href}
      target={external ? "_blank" : undefined}
      className="nav-item w-inline-block"
    >
      <DoubleLabel wrap="nav-item" text={label} textClass="l1" />
    </a>
  );
}

/** Small uppercase navigation label; its swap is pure CSS. */
export function NavItemL2({
  label,
  href = "#",
  extra,
}: {
  label: string;
  href?: string;
  extra?: Record<string, string>;
}) {
  return (
    <a hover-nav-item-l2="" aria-label={label} href={href} className="nav-item w-inline-block" {...extra}>
      <div className="nav-item_label">
        {[false, true].map((second) => (
          <div key={String(second)} hover="text" className={`nav-item_label_text${second ? " is-2" : ""}`}>
            <div className="l2">{label}</div>
          </div>
        ))}
      </div>
    </a>
  );
}

/** Underlined heading link. */
export function HeadingLink({
  label,
  text,
  href = "#",
  extra,
}: {
  label: string;
  text?: ReactNode;
  href?: string;
  extra?: Record<string, string>;
}) {
  return (
    <a hover-link="" aria-label={label} href={href} className="link w-inline-block" {...extra}>
      <DoubleLabel wrap="link" text={text ?? label} textClass="h6" />
    </a>
  );
}

/** The large circular CTA with magnetic pointer follow and growing arcs. */
export function BtnCircle({ label, href, modal }: { label: string; href?: string; modal?: "book-a-call" }) {
  const target = href ?? "#";
  return (
    <div
      hover-btn-circle=""
      data-magnetic-btn=""
      hover-nav-item-trigger=""
      data-modal-cta-btn={modal}
      className="btn-circle"
    >
      <div data-magnetic-inner="" className="btn-circle_label">
        <a hover-nav-item="" aria-label={label} href={target} className="nav-item w-inline-block">
          <DoubleLabel wrap="nav-item" text={label} textClass="l1" />
        </a>
      </div>
      <Embed className="btn-circle_bg">
        <CircleArc />
      </Embed>
      <a aria-label={label} href={target} className="btn-circle_link w-inline-block" />
    </div>
  );
}

export const ApartmentsCircle = () => <BtnCircle label="View available apartments" href={APARTMENTS_URL} />;
export const BookCallCircle = () => <BtnCircle label="Book a call now" modal="book-a-call" />;

/** Pill button with a fill that rises on hover. */
export function Btn({ label, href = "#", extra }: { label: string; href?: string; extra?: Record<string, string> }) {
  return (
    <a
      aria-label={label}
      hover-btn=""
      hover-nav-item=""
      data-wf--btn--variant="sec"
      href={href}
      className="btn w-inline-block"
      {...extra}
    >
      <DoubleLabel wrap="btn" text={label} textClass="l1" />
      <div className="btn_bg">
        <div hover="bg" className="btn_bg_fill" />
      </div>
    </a>
  );
}

export function Divider() {
  return (
    <div className="divider">
      <div data-scroll-reveal="line" className="line-v" />
    </div>
  );
}

export const TAGLINE = "A place to live — to return year after year";

export function Tagline() {
  return (
    <div className="grid">
      <div className="s_title">
        <p data-scroll-reveal="p" className="l1 a-center">
          {TAGLINE}
        </p>
      </div>
    </div>
  );
}
