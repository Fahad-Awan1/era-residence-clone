import type { ImageKey } from "../assets";
import { ApartmentsCircle, Embed, Flower, FULL_WIDTH_SIZES, Img, LogoMark, U } from "../shared";
import { ChevronLeft, ChevronRight } from "../svg";

/** Horizontal desktop track (concept, New Golden Mile, coast route); stacks on mobile. */
export function LocationTrack() {
  return (
    <section data-bg="light" data-slow-scroll="" className="section clip">
      <div className="container loc">
        <div data-video-playpause="" data-scroll-horizontal="" className="loc-scroll-area">
          <div className="loc-scroll-area_screen">
            <div className="loc-scroll-area_track">
              <div data-parallax="w" className="loc-info-w">
                <div data-parallax="img-in" className="loc-info-s">
                  <div className="loc-info-s_t">
                    <U s={48} />
                    <U s={160} on="mob" />
                  </div>
                  <div className="loc-info-s_c">
                    <div className="grid">
                      <div className="s_title">
                        <h2 data-part="p" className="l1 a-center">
                          The concept
                        </h2>
                      </div>
                    </div>
                    <U s={32} on="desk" />
                    <U s={160} on="mob" />
                    <div className="grid">
                      <div className="info-s_lead">
                        <h3 data-part="p" className="h4 a-center">
                          ERA Residences is a boutique gated community of only 25 residences, designed around privacy,
                          wellbeing and timeless Mediterranean living
                        </h3>
                      </div>
                    </div>
                    <U s={96} on="mob" />
                  </div>
                  <div className="loc-info-s_b">
                    <div className="grid">
                      <div className="info-s_desc">
                        <p data-part="p" className="p1 a-center">
                          Inspired by the atmosphere of Marbella’s golden era, the project combines contemporary
                          architecture with warm materials, natural landscaping and carefully curated spaces.
                        </p>
                        <U s={32} />
                        <div className="s_logo">
                          <div data-part="ctn" className="logo_symbol ico-48">
                            <LogoMark />
                          </div>
                        </div>
                      </div>
                    </div>
                    <U s={48} />
                  </div>
                </div>
                <Flower n={1} className="loc-info" parallax="ctn-down" />
              </div>
              <div className="loc-intro-w">
                <div className="loc-intro-s">
                  <U s={48} on="desk" />
                  <U s={160} on="mob" />
                  <div className="grid _13-columns fill">
                    <div className="loc-intro-s_cap">
                      <h4 data-scroll-reveal="h" className="c1 a-center">
                        Spain
                      </h4>
                    </div>
                    <div className="loc-intro-s_title">
                      <h3 data-scroll-reveal="h" className="h1">
                        <span className="loc-intro-s_title_line is-1">{"New "}</span>
                        <span className="loc-intro-s_title_line is-2 mob_a-right">{"Golden "}</span>
                        <span className="loc-intro-s_title_line">Mile</span>
                      </h3>
                    </div>
                    <div className="loc-intro-s_img">
                      <U s={32} on="mob" />
                      <div data-scroll-reveal="slide" className="img-w">
                        <Img
                          name="era-residence-terrace-af26a"
                          alt="Sunlit modern terrace with cushioned sofas, wooden tables, climbing plants, and ocean view under clear sky."
                          sizes={FULL_WIDTH_SIZES}
                        />
                      </div>
                    </div>
                    <div className="loc-intro-s_desc">
                      <U s={32} on="mob" />
                      <h3 data-scroll-reveal="p" className="h5">
                        Between Marbella and Estepona
                      </h3>
                      <U s={16} />
                      <p data-scroll-reveal="p" className="p1">
                        Surrounded by beaches, golf courses, wellness clubs and established lifestyle destinations, the
                        project combines privacy with effortless connectivity to everything essential for Mediterranean
                        living. A location designed not around movement — but around returning.
                      </p>
                      <U s={96} on="mob" />
                    </div>
                    <div data-scroll-reveal="ctn" className="loc-intro-s_btn">
                      <ApartmentsCircle />
                    </div>
                  </div>
                  <U s={48} />
                </div>
                <Flower n={2} className="loc-intro" />
              </div>
              <div className="loc-path-w">
                <div className="loc-path-s">
                  <div className="loc-path-s_t">
                    <U s={48} on="desk" />
                    <U s={160} on="mob" />
                  </div>
                  <div className="loc-path-s_c">
                    <div className="grid">
                      <div className="loc-path-s_title">
                        <h2 className="h3 a-center">
                          <span data-scroll-reveal="h" className="loc-path-s_title_line">
                            {"The coast you wanted "}
                          </span>
                          <span data-scroll-reveal="a" className="loc-path-s_title_a a2">
                            {"yours "}
                          </span>
                          <span data-scroll-reveal="h" className="loc-path-s_title_line">
                            this year
                          </span>
                        </h2>
                      </div>
                    </div>
                  </div>
                  <div className="loc-path-s_b">
                    <U s={48} on="mob" />
                    <div className="grid">
                      <div className="loc-path-s_path scrollbar-none">
                        <div className="loc-path-s_path_c">
                          <Img name="loc_path" className="img loc-path" />
                          <img
                            data-scroll-reveal="ctn"
                            loading="eager"
                            alt=""
                            src="/sites/era/svg/loc_path_labels.svg"
                            className="img h-auto"
                          />
                        </div>
                      </div>
                    </div>
                    <U s={48} />
                  </div>
                </div>
                <div className="loc-path-w_flower">
                  <Flower n={3} className="loc-path" />
                </div>
              </div>
            </div>
          </div>
          <div data-slow-scroll="" className="slow-scroll-trigger" />
        </div>
      </div>
    </section>
  );
}

const CLOUD_LAYERS: { name: ImageKey; className: string; sizes?: string }[] = [
  { name: "img_clouds_33", className: "clouds is-33", sizes: "(max-width: 2146px) 100vw, 2146px" },
  { name: "img_clouds_47", className: "clouds is-47" },
  { name: "img_clouds_02", className: "clouds is-02" },
];

function CloudMarquee({ name, className, sizes }: (typeof CLOUD_LAYERS)[number]) {
  const list = (
    <div data-marquee-css="list" className="marquee_list">
      {[0, 1].map((item) => (
        <div key={item} className="marquee_list_item">
          <Img name={name} className={className} sizes={sizes} />
        </div>
      ))}
    </div>
  );
  return (
    <div className="loc-w_clouds">
      <div data-marquee-css="" className="marquee">
        <div data-marquee-css="track" className="marquee_track">
          {list}
          {list}
        </div>
      </div>
    </div>
  );
}

/** Master-plan aerial with drifting cloud layers. */
export function MasterPlan() {
  return (
    <section data-bg="color" className="section clip theme_on-color">
      <div className="container">
        <div data-parallax="w" className="loc-w">
          <div className="loc-w_over-grad" />
          <div className="loc-w_over-grad" />
          {CLOUD_LAYERS.map((layer) => (
            <CloudMarquee key={layer.name} {...layer} />
          ))}
          <div className="loc-s">
            <div className="grid">
              <div className="loc-s_desc">
                <div className="b-desk">
                  <div className="loc-s_desc_line">
                    <div data-scroll-reveal="line" className="line-v" />
                  </div>
                  <h3 data-scroll-reveal="p" className="l1">
                    New Golden Mile, Estepona
                  </h3>
                  <U s={32} />
                  <h4 data-scroll-reveal="p" className="p1">
                    Costa del Sol
                  </h4>
                  <U s={32} />
                  <h5 data-scroll-reveal="p" className="p1">
                    Spain
                  </h5>
                </div>
                <div className="b-mob">
                  <div className="l1-list">
                    <div className="ico-16">
                      <Embed className="ico">
                        <ChevronLeft />
                      </Embed>
                    </div>
                    <div className="l1">Drag to see more</div>
                    <div className="ico-16">
                      <Embed className="ico">
                        <ChevronRight />
                      </Embed>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <U s={48} />
            <div className="loc-w_decor theme_on-brand" />
          </div>
          <div data-parallax="img" className="loc-w_bg">
            <div className="loc-w_bg_img">
              <div className="img-w h-auto">
                <Img
                  name="era-residence-master-plan"
                  className="img h-auto"
                  alt="Coastal residential complex with pools, beachfront, roads, and distant mountains under clear blue sky."
                  sizes={FULL_WIDTH_SIZES}
                />
                <div className="img-over-grad from-bot bot _100vh" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
