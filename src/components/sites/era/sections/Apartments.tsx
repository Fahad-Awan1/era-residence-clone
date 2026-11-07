import { AMENITIES, APARTMENT_TYPES } from "../content";
import { Pagination } from "../Pagination";
import { BookCallCircle, Btn, Divider, Flower, Img, LogoMark, Tagline, U } from "../shared";

export function ApartmentTypes() {
  return (
    <section data-bg="light" data-snap="" className="section theme_on-brand">
      <div className="container">
        <div className="apart-type-w">
          <div className="apart-type-s">
            <U s={48} on="desk" />
            <U s={96} on="mob" />
            <div className="grid fill">
              <div data-slider="" className="apart-type-s_cms">
                <div className="apart-type-cms w-dyn-list">
                  <div role="list" className="apart-type-cms_list w-dyn-items">
                    {APARTMENT_TYPES.map((type) => (
                      <div
                        key={type.title}
                        data-reveal-first=""
                        data-slider="slide"
                        role="listitem"
                        className="apart-type-cms_list_item w-dyn-item"
                      >
                        <div className="apart-type-slide">
                          <div className="apart-type-slide_t b-desk" />
                          <div className="apart-type-slide_c">
                            <div className="grid _8-columns">
                              <div className="apart-type-slide_data">
                                <div className="data-list">
                                  <div className="data-item">
                                    <h4 data-scroll-reveal="p" data-slider="p" className="l1 reg">
                                      Bedrooms
                                    </h4>
                                    <U s={8} />
                                    <h5 data-scroll-reveal="p" data-slider="p" className="h5">
                                      {type.bedrooms}
                                    </h5>
                                  </div>
                                  <div className="data-item">
                                    <h4 data-scroll-reveal="p" data-slider="p" className="l1 reg">
                                      Area up to
                                    </h4>
                                    <U s={8} />
                                    <h5 data-scroll-reveal="p" data-slider="p" className="h5">
                                      {type.area}
                                    </h5>
                                  </div>
                                </div>
                                <U s={48} on="mob" />
                              </div>
                              <div className="apart-type-slide_desc">
                                <p data-scroll-reveal="p" data-slider="p" className="p1 mob_a-center">
                                  {type.body}
                                </p>
                                <U s={24} />
                                <div data-scroll-reveal="ctn" data-slider="ctn" className="apart-type-slide_btn">
                                  <Btn label={type.cta} href={type.href} />
                                </div>
                                <U s={16} on="mob" />
                              </div>
                            </div>
                          </div>
                          <div className="apart-type-slide_b">
                            <U s={48} on="desk" />
                            <h3 data-scroll-reveal="h" data-slider="h" className="h2 a-center">
                              {type.title}
                            </h3>
                            <U s={32} on="mob" />
                          </div>
                          <div className="apart-type-slide_img-w">
                            <div className="apart-type-slide_img">
                              <div data-scroll-reveal="slide" data-slider="img" className="img-w">
                                <Img name={type.image} sizes="100vw" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <U s={16} />
                <Pagination />
              </div>
            </div>
            <U s={48} />
          </div>
        </div>
      </div>
    </section>
  );
}

export function ApartmentInfo() {
  return (
    <section data-bg="light" className="section clip theme_on-brand">
      <div className="container">
        <div data-video-playpause="" className="apart-info-w">
          <div className="apart-info-s">
            <U s={48} />
            <Divider />
            <U s={48} />
            <Tagline />
            <U s={160} />
            <div className="grid">
              <div className="info-s_lead">
                <h3 data-scroll-reveal="p" className="h4 a-center">
                  Residences range from 104 to 244 sq.m., offering spacious single level and duplex layouts with
                  generous terraces and rooftop solariums.
                </h3>
              </div>
            </div>
            <U s={160} />
            <div className="grid">
              <div className="info-s_desc">
                <p data-scroll-reveal="p" className="p1 a-center" />
                <U s={32} />
                <div className="s_logo">
                  <div data-scroll-reveal="ctn" className="logo_symbol ico-48">
                    <LogoMark />
                  </div>
                </div>
              </div>
            </div>
            <U s={48} />
          </div>
          <Flower n={4} className="apart-info" parallax="ctn-down" />
        </div>
      </div>
    </section>
  );
}

export function Amenities() {
  return (
    <div className="amen-scroll-area">
      <div className="scroll-area_screen">
        <section className="section clip theme_on-color">
          <div className="container">
            <div className="amen-w">
              <div className="amen-s">
                <div data-tabs-hilight="ver" data-tabs="" className="amen-s_cms">
                  <div className="amen-cms w-dyn-list">
                    <div role="list" className="amen-cms_list w-dyn-items">
                      {AMENITIES.map((amenity) => (
                        <div
                          key={amenity.id}
                          data-reveal-first=""
                          data-tab-content={amenity.id}
                          role="listitem"
                          className="amen-cms_list_item w-dyn-item"
                        >
                          <div data-parallax="w" className="amen-slide">
                            <div className="amen-slide_b">
                              <div className="grid">
                                <div className="amen-slide_title">
                                  <h3 data-scroll-reveal="p" data-tab="p" className="l1">
                                    {amenity.name}
                                  </h3>
                                  <U s={32} />
                                </div>
                                <div className="amen-slide_desc w-clearfix">
                                  <div className="red-line" />
                                  <h4 data-scroll-reveal="p" data-tab="p" className="h5">
                                    {amenity.body}
                                  </h4>
                                </div>
                              </div>
                              <U s={48} />
                            </div>
                            <div className="amen-slide_img">
                              <div data-tab="slide" className="img-w">
                                <div className="img-w">
                                  <Img name={amenity.image} className="img-p" sizes="100vw" parallax="img-in" />
                                </div>
                                <div className="img-over-grad from-top" />
                                <div className="img-over-grad from-bot _4x bot" />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="amm-s_cms_tabs-w">
                    <div className="grid">
                      <div className="amm-s_cms_tabs">
                        <div className="amen-tabs-cms w-dyn-list">
                          <div role="list" className="amen-tabs-cms_list w-dyn-items">
                            {AMENITIES.map((amenity) => (
                              <div key={amenity.id} role="listitem" className="amen-tabs-cms_list_item w-dyn-item">
                                <div data-tab="" data-tab-trigger={amenity.id} className="amen-tab">
                                  <div data-scroll-reveal="p" className="h5">
                                    {amenity.name}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div data-scroll-reveal="line" className="amm-s_cms_tabs_line">
                          <div data-tab-hilight="" className="amm-s_cms_tabs_line_hilight" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="amm-s_cms_btn-w b-desk">
                    <div className="grid">
                      <div data-scroll-reveal="ctn" className="amm-s_cms_btn">
                        <BookCallCircle />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="hero_themes">
        <div data-bg="color" className="hero_themes_color" />
        <div data-bg="light" className="hero_themes_light" />
      </div>
    </div>
  );
}
