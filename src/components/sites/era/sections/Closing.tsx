import { FACTS, GALLERY } from "../content";
import { Pagination } from "../Pagination";
import {
  ApartmentsCircle,
  BookCallCircle,
  Divider,
  Embed,
  Flower,
  FULL_WIDTH_SIZES,
  Img,
  LogoMark,
  NavItem,
  PRIVACY_URL,
  Tagline,
  TERMS_URL,
  U,
} from "../shared";
import { Plus, ScrollArrowUp } from "../svg";

export function Interior() {
  return (
    <section className="section arch clip">
      <div className="container">
        <div className="interior-w">
          <div className="interior-s">
            <U s={272} />
            <div className="grid">
              <div className="interior-s_title">
                <h2 data-scroll-reveal="h" className="h1 a-center">
                  The
                  <br />
                  space
                  <br />
                  to
                </h2>
                <div className="interior-s_title_a">
                  <h3 data-scroll-reveal="a" className="a1 a-center">
                    Live in
                  </h3>
                </div>
              </div>
            </div>
            <div className="interior-s_imgs">
              <div data-parallax="ctn-down" className="interior-s_l">
                <U s={272} />
                <div className="grid _5-columns">
                  <div data-video-playpause="" className="interior-s_l_img-w">
                    <div className="interior-s_l_img">
                      <div data-scroll-reveal="slide" className="img-w">
                        <Img
                          name="era-residence-garden-2"
                          alt="Outdoor seating with modern chair, ottoman, table, and orange drink in a garden with pink flowers."
                          sizes={FULL_WIDTH_SIZES}
                        />
                      </div>
                    </div>
                    <Flower n={6} className="interior" parallax="ctn-up" />
                  </div>
                  <div className="interior-s_l_desc">
                    <U s={16} />
                    <h4 data-scroll-reveal="p" className="l1">
                      Optional upgrades are available: <br />• Private jacuzzi <br />• EV charging point installation{" "}
                      <br />• Photovoltaic panels
                    </h4>
                    <U s={160} on="mob" />
                  </div>
                </div>
              </div>
              <div data-parallax="ctn-up" className="interior-s_r">
                <div className="grid _5-columns">
                  <div className="interior-s_r_img">
                    <div data-scroll-reveal="slide" className="img-w">
                      <Img
                        name="era-residence-terrace-af26a"
                        alt="Sunlit terrace with cushioned seating, wooden tables, plants, flowering vine canopy, and ocean in the distance."
                        sizes={FULL_WIDTH_SIZES}
                      />
                    </div>
                  </div>
                  <div className="interior-s_r_lead w-clearfix">
                    <U s={16} />
                    <div className="red-line" />
                    <h4 data-scroll-reveal="p" className="h5">
                      Every detail was selected to create homes that feel elegant, intuitive and effortless to live in
                    </h4>
                  </div>
                  <div className="interior-s_r_desc">
                    <U s={64} />
                    <p data-scroll-reveal="p" className="p1">
                      Underfloor heating throughout the property. Climate automation systems. Smart lock access systems.
                      Electrically adjustable aluminium shutters. Schneider Electric DLIFE switches and mechanisms .
                    </p>
                    <U s={96} />
                  </div>
                  <div data-scroll-reveal="ctn" className="interior-s_r_btn">
                    <ApartmentsCircle />
                  </div>
                </div>
              </div>
            </div>
            <U s={272} />
            <div className="grid">
              <div data-slider="" className="interior-s_gallery-cms">
                <div className="gallery-cms w-dyn-list">
                  <div role="list" className="gallery-cms_list w-dyn-items">
                    {GALLERY.map((name) => (
                      <div
                        key={name}
                        data-reveal-first=""
                        data-slider="slide"
                        role="listitem"
                        className="gallery-cms_list_item w-dyn-item"
                      >
                        <div className="gallery-slide">
                          <div data-scroll-reveal="slide" data-slider="img" className="img-w">
                            <Img name={name} sizes="100vw" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <U s={16} />
                <div className="interior-s_gallery-cms_pag">
                  <Pagination />
                </div>
              </div>
            </div>
            <U s={96} />
          </div>
          <div className="interior_themes">
            <div data-bg="light" className="interior_themes_light-1" />
            <div className="themes_row">
              <div data-bg="dark" className="interior_themes_dark-2" />
              <div data-bg="light" className="interior_themes_light-2" />
            </div>
            <div data-bg="light" className="interior_themes_light-3" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function Architecture() {
  return (
    <section className="section clip">
      <div className="container">
        <div data-video-playpause="" className="arch-scroll-area">
          <div className="arch-intro-s">
            <div className="w_bg">
              <div className="arch-intro-s_bg_l" />
              <div className="arch-intro-s_bg_r">
                <div className="w-embed" />
              </div>
              <Flower n={5} className="arch-intro-l" />
              <Flower n={7} className="arch-intro-r" />
            </div>
          </div>
          <div className="arch-w theme_on-color">
            <div className="arch-s">
              <div className="arch-s_t">
                <U s={48} />
                <h2 data-text="h" data-fit-text="" className="h1 a-center">
                  Architecture
                </h2>
                <U s={32} />
                <div className="grid">
                  <div className="arch-s_desc">
                    <p data-text="p" className="l1 a-center" />
                  </div>
                </div>
              </div>
              <div className="arch-s_b">
                <div className="grid">
                  <div className="arch-s_quote w-clearfix">
                    <div className="red-line" />
                    <h3 data-part="p" className="h5">
                      The architecture of ERA Residences balances clean contemporary lines with Mediterranean warmth and
                      texture
                    </h3>
                    <U s={64} />
                    <div className="grid _4-columns">
                      <div className="arch-s_author">
                        <div data-part="p" className="l1">
                          By Schiemann Weyers
                        </div>
                        <div data-part="p" className="l1 reg">
                          Architects OCWA Architects
                        </div>
                      </div>
                    </div>
                    <U s={160} on="desk" />
                  </div>
                  <div data-part="ctn" className="arch-s_btn">
                    <BookCallCircle />
                  </div>
                </div>
                <U s={96} />
              </div>
            </div>
            <div className="w_bg">
              <div data-desk="off" data-parallax="w" className="img-w">
                <Img
                  name="img_cam_02-79c8a"
                  alt="Modern terrace apartments with green plants, flowering vines, and outdoor seating on a sunny day."
                  sizes={FULL_WIDTH_SIZES}
                  parallax="img"
                />
                <div className="img-over-grad bot _100vh" />
                <div className="img-over-grad bot _100vh" />
              </div>
            </div>
          </div>
          <div className="_100vh" />
          <div className="_100vh" />
          <div className="arch_themes">
            <div data-bg="light" className="arch_themes_light" />
            <div data-bg="color" className="arch_themes_color" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function Facts() {
  return (
    <section data-bg="light" className="section clip">
      <div className="container">
        <div data-video-playpause="" className="other-w">
          <div className="other-s">
            <U s={48} />
            <Tagline />
            <U s={48} />
            <Divider />
            <U s={64} />
            <div className="grid">
              <div className="other-s_cms">
                <div className="other-cms w-dyn-list">
                  <div role="list" className="other-cms_list w-dyn-items">
                    {FACTS.map((fact) => (
                      <div key={fact.title} role="listitem" className="other-cms_list_item w-dyn-item">
                        <div data-accordion-card="" className="other-card">
                          <div className="other-card_name">
                            <div className="other-card_name_label">
                              <h4 data-scroll-reveal="h" className="h3 a-center">
                                {fact.title}
                              </h4>
                              <div data-scroll-reveal="ctn" data-ico-plus="" className="other-card_ico">
                                <div className="ico-16">
                                  <Embed className="ico">
                                    <Plus />
                                  </Embed>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div data-accordion-card="content" className="other-card_info">
                            <U s={32} />
                            <div className="grid _6-columns">
                              <div className="other-card_info_desc">
                                {fact.logoBody && (
                                  <>
                                    <div data-accordion-card="ctn" className="other-card_info_logo">
                                      <img src="/sites/era/svg/unreal-logo.svg" loading="eager" alt="" className="logo b" />
                                    </div>
                                    <U s={32} />
                                  </>
                                )}
                                <p data-accordion-card="p" className="p1 a-center">
                                  {fact.body ?? fact.logoBody}
                                </p>
                                <U s={32} />
                                <div data-accordion-card="ctn" className="info_divider">
                                  <div className="line-h" />
                                </div>
                                <U s={48} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <U s={160} />
          </div>
          <Flower n={7} className="other" parallax="ctn-down" />
        </div>
      </div>
    </section>
  );
}

export function Cta() {
  return (
    <section data-bg="color" className="section theme_on-color">
      <div data-footer-clip="" className="container">
        <div className="cta-w">
          <div className="cta-s">
            <U s={48} />
            <div className="grid">
              <div className="cta-s_desc">
                <p data-scroll-reveal="p" className="l1 a-center">
                  A short conversation is enough to understand which apartment fits your use case — whether it is a
                  family second home, a longer stay, or a place to return to year after year.
                </p>
              </div>
            </div>
            <U s={272} />
            <div className="grid">
              <div className="cta-s_title">
                <h2 data-scroll-reveal="h" className="h1 a-center">
                  Perfect <br />
                  sea views
                </h2>
                <U s={32} />
                <h3 data-scroll-reveal="h" className="c1 a-center">
                  From rooftop terraces
                </h3>
                <U s={160} />
                <div data-scroll-reveal="ctn" className="cta-s_title_btn">
                  <ApartmentsCircle />
                </div>
              </div>
            </div>
          </div>
          <div className="w_bg">
            <div data-parallax="w" className="img-w">
              <Img name="img_cta_1920" className="img-p" sizes={FULL_WIDTH_SIZES} parallax="img" />
              <div className="img-over-grad from-top _4x" />
              <div className="img-over-grad" />
              <div className="img-over-grad" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const address = "Avenida Litoral, 29680 Estepona, Málaga, Spain";
  return (
    <section data-bg="dark" className="section theme_on-dark">
      <div className="container">
        <div className="footer-w">
          <a href="#hero" className="footer-s_s-top w-inline-block">
            <div className="l2">To top</div>
            <Embed className="s-down_arrow">
              <ScrollArrowUp />
            </Embed>
          </a>
          <div className="footer-s">
            <div className="footer-s_t" />
            <div className="footer-s_c">
              <div className="grid">
                <div className="footer-s_contact">
                  <div className="s_logo">
                    <div data-text="ctn" className="logo_symbol ico-64">
                      <LogoMark />
                    </div>
                  </div>
                  <U s={32} />
                  <div className="contact-cms w-dyn-list">
                    <div role="list" className="contact-cms_list w-dyn-items">
                      <div role="listitem" className="contact-cms_list_item w-dyn-item">
                        <a href="tel:+447460671890" target="_blank" className="nav-item w-inline-block">
                          <div data-text="h" className="h2 a-center">
                            +44 7460 671890
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                  <U s={48} />
                </div>
                <div className="footer-s_address">
                  <div className="loc-cms w-dyn-list">
                    <div role="list" className="loc-cms_list w-dyn-items">
                      <div data-text="ctn" role="listitem" className="loc-cms_list_item w-dyn-item">
                        <h3 className="l1 reg a-center">Sales Office</h3>
                        <U s={4} />
                        <NavItem label={address} href="https://maps.app.goo.gl/EzyfT2M6vR5aBdMu9" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-s_b">
              <div className="grid">
                <div className="footer-s_info">
                  <div data-text="p" className="l1">
                    Era Residence.
                  </div>
                  <div data-text="p" className="l1 reg no-wrap">
                    ©<span className="year">2026</span> All rights reserved
                  </div>
                  <U s={12} />
                  <div data-text="p" className="legal-cms w-dyn-list">
                    <div role="list" className="legal-cms_list w-dyn-items">
                      <div role="listitem" className="legal-cms_list_item w-dyn-item">
                        <NavItem label="Privacy policy" href={PRIVACY_URL} />
                        <div data-comma="" className="l1">
                          ,
                        </div>
                      </div>
                      <div role="listitem" className="legal-cms_list_item w-dyn-item">
                        <NavItem label="Terms of Use" href={TERMS_URL} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="footer-s_credits">
                  <div hover-nav-item-trigger="" className="credits">
                    <a
                      aria-label="The First The Last"
                      href="https://thefirstthelast.agency/?utm_source=era-residence&utm_medium=article&utm_campaign=promo"
                      target="_blank"
                      className="credits_link w-inline-block"
                    />
                    <div data-text="ctn" data-scrub-reveal="ctn" className="credits_logo-w">
                      <div data-json="/sites/era/lottie/tftl-logo_white.json" className="credits_logo" />
                    </div>
                    <U s={12} />
                    <div data-text="p" className="l1 reg a-right">
                      Made by
                    </div>
                    <div data-text="p">
                      <NavItem label="Thefirstthelast" href="#" />
                    </div>
                  </div>
                </div>
              </div>
              <U s={48} />
            </div>
          </div>
          <div className="footer-w_bg" />
        </div>
      </div>
    </section>
  );
}
