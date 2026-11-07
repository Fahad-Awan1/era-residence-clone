import { BENEFITS } from "../content";
import { Pagination } from "../Pagination";
import { Divider, Embed, FULL_WIDTH_SIZES, Img, LogoMark, TAGLINE, U } from "../shared";
import { CircleTextDesk, CircleTextMob, QuoteMark } from "../svg";

export function BenefitsIntro() {
  return (
    <section className="section arch clip theme_on-brand">
      <div className="container">
        <div className="benefits-intro-w">
          <div className="benefits-intro-s">
            <U s={48} on="mob" />
            <U s={272} on="mob" />
            <div className="s_logo">
              <div className="info-s_logo_l">
                <div data-scroll-reveal="p" className="l1 a-center">
                  Costa
                </div>
              </div>
              <div data-scroll-reveal="ctn" className="logo_symbol ico-48">
                <LogoMark />
              </div>
              <div className="info-s_logo_r">
                <div data-scroll-reveal="p" className="l1 a-center">
                  del Sol
                </div>
              </div>
            </div>
            <U s={48} />
            <Divider />
            <U s={48} />
            <div className="grid">
              <div className="s_title">
                <p data-scroll-reveal="p" className="l1 a-center">
                  {TAGLINE}
                </p>
              </div>
            </div>
            <U s={96} />
            <div className="benefits-intro-s_title">
              <Embed className="benefits-intro-s_title_svg b-desk">
                <CircleTextDesk />
              </Embed>
              <Embed className="benefits-intro-s_title_svg b-mob">
                <CircleTextMob />
              </Embed>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BenefitsSlider() {
  return (
    <section data-bg="light" data-snap="" className="section z-2 theme_on-brand">
      <div className="container">
        <div className="benefits-w">
          <div className="benefits-s">
            <div className="grid fill">
              <div data-slider="" className="benefits-s_cms">
                <div className="benefits-s_cms_pag">
                  <U s={48} />
                  <U s={16} />
                  <div className="benefit-slide_img" />
                  <U s={16} />
                  <Pagination />
                </div>
                <div className="benefits-cms w-dyn-list">
                  <div role="list" className="benefits-cms_list w-dyn-items">
                    {BENEFITS.map((benefit) => (
                      <div
                        key={benefit.title}
                        data-reveal-first=""
                        data-slider="slide"
                        role="listitem"
                        className="benefits-cms_list_item w-dyn-item"
                      >
                        <div className="benefit-slide">
                          <div className="benefit-slide_t">
                            <U s={48} on="desk" />
                            <U s={272} on="mob" />
                            <h3 data-scroll-reveal="h" data-slider="h" className="h1 a-center b-desk">
                              {benefit.title}
                            </h3>
                            <div data-scroll-reveal="h" data-slider="h" className="h2 a-center b-mob">
                              {benefit.title}
                            </div>
                            <U s={48} />
                          </div>
                          <div className="benefit-slide_c">
                            <U s={16} />
                            <div className="benefit-slide_img">
                              <div data-scroll-reveal="slide" data-slider="img" className="img-w">
                                <Img name={benefit.image} sizes="100vw" />
                              </div>
                            </div>
                            <U s={16} />
                          </div>
                          <div className="benefit-slide_b">
                            <U s={48} />
                            <div className="grid _8-columns">
                              <div className="benefit-slide_desc">
                                <p data-scroll-reveal="p" data-slider="p" className="p1 a-center">
                                  {benefit.body}
                                </p>
                              </div>
                            </div>
                            <U s={48} />
                            <div className="grid _8-columns">
                              <div className="benefit-slide_cap">
                                <p data-scroll-reveal="p" data-slider="p" className="l1 a-center">
                                  {benefit.caption}
                                </p>
                              </div>
                            </div>
                            <U s={48} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Quote() {
  return (
    <section className="section z-2 theme_on-brand">
      <div className="container">
        <div className="quote-w">
          <div className="quote-s theme_on-color">
            <div className="grid">
              <div className="quote-s_c w-clearfix">
                <div className="grid _4-columns">
                  <div className="quote-s_ico">
                    <div data-scroll-reveal="ctn" className="ico-48">
                      <Embed className="ico">
                        <QuoteMark />
                      </Embed>
                    </div>
                    <U s={32} />
                  </div>
                </div>
                <div className="red-line" />
                <h4 data-scroll-reveal="p" data-tab="p" className="h5">
                  Instead of corridors, walking paths connect the apartments — making Era Residence feel closer to a
                  group of private homes than a standard
                </h4>
                <U s={64} />
                <div className="grid _4-columns">
                  <div className="quote-s_author">
                    <div data-scroll-reveal="p" className="l1">
                      Architecture Team
                    </div>
                    <div data-scroll-reveal="p" className="l1 reg">
                      Era Residence
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <U s={48} />
          </div>
          <div data-parallax="w" className="quote-w_bg">
            <div className="img-w h-auto quote-w_bg_img">
              <div className="img-over-grad from-bot bot _4x" />
              <div className="img-over-grad from-bot bot _4x" />
              <Img
                name="img_cam_05_alpha"
                className="img h-auto quote-w_bg_img"
                alt="Modern building with flowering vines beside a rectangular swimming pool and palm trees."
                sizes={FULL_WIDTH_SIZES}
                parallax="img-out"
              />
            </div>
          </div>
          <div className="w_themes">
            <div className="w_themes_row fill">
              <div data-bg="color" className="quote-w_themes_color-1" />
              <div data-bg="light" className="quote-w_themes_light-1" />
            </div>
            <div className="w_themes_row">
              <div data-bg="color" className="quote-w_themes_color-2" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
