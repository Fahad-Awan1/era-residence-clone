import { PINS } from "../content";
import { ApartmentsCircle, Embed, FULL_WIDTH_SIZES, Img, NavItemL2, U } from "../shared";
import { Plus } from "../svg";

function Pin({ id }: { id: string }) {
  return (
    <div
      data-modal-tip-btn={id}
      data-pin={id}
      floating-tip-trigger={id}
      role="listitem"
      className="pins-cms_list_item w-dyn-item"
    >
      <div hover-pin="" className="pin">
        <div hover="bg" className="pin_dot">
          <div hover="ico" className="ico-16 theme_on-light">
            <Embed className="ico">
              <Plus />
            </Embed>
          </div>
        </div>
        <div className="pin_bg">
          <div data-pin-pulse="" className="pin_bg_pulse" />
          <div data-pin-pulse="" className="pin_bg_pulse" />
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="hero" className="section clip theme_on-color">
      <div className="container">
        <div className="hero-scroll-area">
          <div data-tabs-hero="" className="hero-w">
            <div className="hero-s">
              <U s={48} />
              <U s={272} on="mob" />
              <div className="grid">
                <div className="hero-s_logo">
                  <h1 data-prevent-flicker="" data-scroll-reveal="h" className="h1 a-center">
                    Era <br />
                    Residence
                  </h1>
                  <div className="hero-s_logo_a">
                    <h2 data-prevent-flicker="" data-scroll-reveal="a" className="a2">
                      Estepona
                    </h2>
                  </div>
                </div>
              </div>
              <U s={48} />
              <div className="grid">
                <h3 className="hero-s_title h5">
                  <span data-scroll-reveal="h" data-prevent-flicker="" className="a-left">
                    <div className="span">{"A place "}</div>
                  </span>
                  <div data-prevent-flicker="" data-scroll-reveal="ctn" className="hero-s_tabs">
                    <NavItemL2 label="by day" extra={{ "hover-tab": "", "data-tab-trigger": "day" }} />
                    <div className="hero-s_tabs_divider" />
                    <NavItemL2 label="by night" extra={{ "hover-tab": "", "data-tab-trigger": "night" }} />
                  </div>
                  <span data-scroll-reveal="h" data-prevent-flicker="" className="a-right">
                    <div className="span">to return to</div>
                  </span>
                </h3>
              </div>
            </div>
            <div className="hero-w_bg">
              <div className="hero-w_bg_master">
                <div className="hero-w_bg_master_img">
                  <div className="pins-cms w-dyn-list">
                    <div role="list" className="pins-cms_list w-dyn-items">
                      {PINS.map((pin) => (
                        <Pin key={pin.id} id={pin.id} />
                      ))}
                    </div>
                  </div>
                  <div data-tab-content="day" className="hero-w_bg_master_img_day">
                    <div data-tab="img" className="img-w h-auto">
                      <Img
                        name="era-residence_gated-community_day"
                        className="img h-auto hero-img"
                        sizes={FULL_WIDTH_SIZES}
                      />
                    </div>
                  </div>
                  <div data-tab-content="night" className="hero-w_bg_master_img_night">
                    <div data-tab="img" className="img-w h-auto">
                      <Img
                        name="era-residence_gated-community_night"
                        className="img h-auto hero-img"
                        sizes={FULL_WIDTH_SIZES}
                      />
                    </div>
                  </div>
                  <div className="img-over-grad from-top _100vh" />
                  <div className="img-over-grad from-bot bot _6x" />
                  <div className="img-over-grad from-bot bot _6x" />
                </div>
                <div className="hero-s_b">
                  <div data-prevent-flicker="" data-scroll-reveal="ctn" className="hero-s_btn">
                    <div className="e-auto">
                      <ApartmentsCircle />
                    </div>
                  </div>
                  <U s={32} />
                  <div className="grid">
                    <div className="hero-s_desc">
                      <p className="l1 a-center" />
                    </div>
                  </div>
                  <U s={48} />
                </div>
              </div>
            </div>
          </div>
          <div className="hero_themes">
            <div data-bg="color" className="hero_themes_color" />
            <div data-bg="light" className="hero_themes_light" />
          </div>
        </div>
      </div>
    </section>
  );
}
