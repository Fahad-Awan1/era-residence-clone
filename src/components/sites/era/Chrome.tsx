import { PINS } from "./content";
import { APARTMENTS_URL, CONTACT_URL, Decor, Embed, HeadingLink, Img, LogoMark, NavItemL2, U } from "./shared";
import { HeaderRingDesk, HeaderRingMob, MenuBars, ScrollArrowDown } from "./svg";

export function LandscapeCover() {
  return (
    <div className="landscape-cover">
      <div className="landscape-cover_img">
        <Img name="landscape" className="img contain" />
      </div>
      <div className="landscape-cover_bg" />
    </div>
  );
}

export function Preloader() {
  return (
    <>
      <div data-master-preloader="" className="master-preloader theme_on-dark" />
      <div data-preloader="" className="preloader theme_on-dark">
        <div className="preloader_ctn">
          <div className="preloader_t">
            <U s={48} />
            <div className="s_logo">
              <div data-part="ctn" className="logo_symbol ico-48">
                <LogoMark />
              </div>
            </div>
          </div>
          <div className="preloader_c">
            <div className="grid">
              <div className="preloader_title-l">
                <div data-part="h" className="c1 a-center">
                  Costa
                </div>
              </div>
              <div className="preloader_logo">
                <div data-part="h" className="h3 a-center">
                  Era
                  <br />
                  Residence
                </div>
                <div className="preloader_logo_a">
                  <div data-part="a" className="a2 preloader_a a-center">
                    Estepona
                  </div>
                </div>
              </div>
              <div className="preloader_title-r">
                <div data-part="h" className="c1 a-center">
                  del Sol
                </div>
              </div>
            </div>
          </div>
          <div className="preloader_b">
            <div className="grid">
              <div className="s_title">
                <div data-part="line" className="preloader_progress">
                  <div className="preloader_progress_fill">
                    <div className="preloader_progress_track" />
                  </div>
                </div>
                <U s={32} />
                <p data-part="p" className="l1 a-center">
                  Era Residence
                  <br />A place to return to.
                </p>
              </div>
            </div>
            <U s={48} />
          </div>
        </div>
        <div className="preloader_bg_arch">
          <div className="preloader_bg_arch_is-1" />
          <div className="preloader_bg_arch_is-2" />
        </div>
        <div className="preloader_bg">
          <div className="preloader_bg_a">
            <Img name="preloader_bg" />
          </div>
          <div className="preloader_bg_decor">
            <Decor variant="large" />
          </div>
        </div>
      </div>
    </>
  );
}

export function CookieBanner() {
  return (
    <div data-cookies="" className="cookies">
      <div className="cookies_c">
        <div className="grid">
          <div className="cookies_card" id="w-node-a93c3093-e77a-7926-27af-e0a2d9898e16-d9898e13">
            <div className="cookies_card_t">
              <div className="l1 reg b-mob">Cookies</div>
              <div className="cookies_card_title b-desk">
                <div className="a1 a-center">Cookies</div>
              </div>
            </div>
            <div className="cookies_card_b">
              <div className="l1 a-center mob_a-left">
                This website uses cookies to ensure you get the best experience on website.
              </div>
              <U s={24} />
              <div className="cookies_card_btn-list">
                <HeadingLink label="Accept" extra={{ "data-cookies": "accept" }} />
                <div className="h6">/</div>
                <HeadingLink label="Decline" extra={{ "data-cookies": "decline" }} />
              </div>
            </div>
            <div className="card_decor">
              <Decor variant="med" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Header() {
  return (
    <div className="theme_on-color">
      <a aria-label="Back to top" data-theme="" href="#hero" className="header-logo w-inline-block">
        <div data-modal-close="menu" className="logo_symbol header">
          <LogoMark />
        </div>
        <Embed className="header-logo_bg b-desk">
          <HeaderRingDesk />
        </Embed>
        <Embed className="header-logo_bg b-mob">
          <HeaderRingMob />
        </Embed>
      </a>
      <div data-theme="" className="header-nav">
        <div className="header-nav_list f-mob">
          <div hover-nav-item-l2-trigger="" data-modal-menu-btn="mob" className="btn-menu">
            <div className="btn-menu_label is-active">
              <NavItemL2 label="Menu" />
            </div>
            <div className="btn-menu_label">
              <NavItemL2 label="Close" />
            </div>
            <div className="ico-24">
              <div className="ico">
                <div data-ico-menu="is-1" className="ico w-embed">
                  <MenuBars />
                </div>
                <div data-ico-menu="is-2" className="ico ia-2 w-embed">
                  <MenuBars />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="header-nav_list f-desk">
          <HeadingLink
            label="Select an Apartment"
            href={APARTMENTS_URL}
            text={
              <>
                Select <br />
                an Apartment
              </>
            }
          />
          <U s={24} />
          <NavItemL2 label="Book a call" extra={{ "data-modal-cta-btn": "book-a-call" }} />
          <U s={4} />
          <NavItemL2 label="Contact" href={CONTACT_URL} />
        </div>
      </div>
      <div data-theme="" className="s-bar-w">
        <div data-s-bar="" className="s-bar">
          <div data-s-bar-thumb="" className="s-bar_thumb">
            <div data-s-bar-label="" className="l1 a-center">
              00
            </div>
          </div>
          <div data-s-bar-fill="" className="s-bar_fill" />
          <div data-s-bar-track="" className="s-bar_track" />
        </div>
      </div>
      <div data-theme="" className="s-down">
        <Embed className="s-down_arrow">
          <ScrollArrowDown />
        </Embed>
        <div className="l2">Scroll</div>
      </div>
    </div>
  );
}

export function FloatingTips() {
  return (
    <div className="floating-tips w-dyn-list">
      <div role="list" className="floating-tips_list w-dyn-items">
        {PINS.map((pin) => (
          <div key={pin.id} floating-tip={pin.id} role="listitem" className="floating-tip w-dyn-item">
            <div className="floating-tip-card">
              <div className="floating-tip-card_t">
                <h1 className="h5">{pin.title}</h1>
              </div>
              <div className="floating-tip-card_b">
                <p className="p1">{pin.body}</p>
              </div>
              <div className="card_decor">
                <Decor variant="med" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
