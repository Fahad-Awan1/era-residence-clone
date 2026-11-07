import {
  APARTMENTS_URL,
  Btn,
  CONTACT_URL,
  Embed,
  HeadingLink,
  LogoMark,
  PRIVACY_URL,
  U,
} from "./shared";
import { CloseX, Facebook, HeaderRingDesk, HeaderRingMob, Instagram, LinkedIn } from "./svg";

const FIELDS = [
  { id: "name", label: "Name:", type: "text", autoComplete: "name" },
  { id: "email", label: "Email:", type: "email", autoComplete: "email" },
  { id: "phone", label: "Phone:", type: "tel", autoComplete: "tel" },
];

const TRACKING_FIELDS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_url", "page_url"];

const SOCIALS = [
  {
    label: "Linkedin",
    href: "https://www.linkedin.com/company/eraresidenceestepona/?viewAsMember=true",
    icon: <LinkedIn />,
  },
  { label: "Facebook", href: "https://www.facebook.com/era.residence.estepona", icon: <Facebook /> },
  { label: "Instagram", href: "https://www.instagram.com/era.residence.estepona", icon: <Instagram /> },
];

function HiddenInput({ name }: { name: string }) {
  return <input className="d-none w-input" maxLength={256} name={name} type="text" id={name} />;
}

function BookingSuccess() {
  return (
    <div className="form_success w-form-done">
      <div className="form_success_c">
        <div className="form_success_title">
          <p className="l1 a-center">We’ve received your request</p>
          <U s={160} on="mob" />
        </div>
        <div className="form_success_a">
          <p className="a2 a-center">Thank you</p>
        </div>
        <div className="form_success_social">
          <U s={96} on="mob" />
          <div className="social-cms w-dyn-list">
            <div role="list" className="social-cms_list w-dyn-items">
              {SOCIALS.map((social, index) => (
                <div key={social.label} role="listitem" className="social-cms_list_item w-dyn-item">
                  <a
                    aria-label={social.label}
                    hover-social=""
                    href={social.href}
                    target="_blank"
                    className="social-btn w-inline-block"
                  >
                    <div hover="ico" className="ico-16">
                      <Embed className="ico">{social.icon}</Embed>
                    </div>
                    {index < SOCIALS.length - 1 && (
                      <div className="social-btn_line">
                        <div className="line-h" />
                      </div>
                    )}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="form_success_desc">
          <U s={48} on="mob" />
          <p className="p1 a-center">
            Our sales manager will review your message and respond personally. We typically reply within one business
            day.
          </p>
        </div>
      </div>
    </div>
  );
}

export function BookingModal() {
  return (
    <div data-modal-cta="book-a-call" className="modal">
      <div className="modal_c">
        <div className="modal_cta theme_on-brand">
          <div className="grid">
            <div data-lenis-scroll="" data-modal-container="" className="modal_cta_c">
              <div className="modal_cta_close">
                <div data-modal-close="" hover-btn="" className="btn-ico">
                  <a aria-label="Close" href="#" className="btn-ico_link w-inline-block" />
                  <div hover="ico" className="btn_ico">
                    <div className="ico-16">
                      <Embed className="ico">
                        <CloseX />
                      </Embed>
                    </div>
                  </div>
                  <div className="btn_bg">
                    <div hover="bg" className="btn_bg_fill" />
                  </div>
                </div>
              </div>
              <div id="book-a-call" className="modal_cta_form w-form">
                <form id="wf-form-Book-a-call" name="wf-form-Book-a-call" method="post" className="form_block">
                  <div className="modal_cta_l">
                    <div className="modal_cta_l_t">
                      <div className="modal_cta_a">
                        <h1 className="a2 b-desk">Book a call</h1>
                        <div className="a1 b-mob">Book a call</div>
                      </div>
                      <U s={24} />
                    </div>
                    <div className="modal_cta_l_b">
                      <div className="modal_cta_desc">
                        <div data-modal-close="menu" className="logo_symbol ico-48 b-mob">
                          <LogoMark />
                        </div>
                        <U s={32} on="mob" />
                        <p className="l1 mob_a-center">Leave your details and we will get back to you within 24 hours.</p>
                      </div>
                    </div>
                  </div>
                  <div className="modal_cta_c_c">
                    <div className="modal_cta_c_line">
                      <div data-scroll-reveal="line" className="line-v" />
                    </div>
                    <div className="modal_cta_c_logo">
                      <div data-modal-close="menu" className="logo_symbol header">
                        <LogoMark />
                      </div>
                      <Embed className="header-logo_bg b-mob">
                        <HeaderRingMob />
                      </Embed>
                      <Embed className="header-logo_bg b-desk">
                        <HeaderRingDesk />
                      </Embed>
                    </div>
                    <div className="modal_cta_c_line">
                      <div data-scroll-reveal="line" className="line-v" />
                    </div>
                  </div>
                  <div className="modal_cta_r">
                    <div className="modal_cta_form_c">
                      <div className="form_block_t">
                        <U s={32} on="desk" />
                        <U s={96} on="mob" />
                      </div>
                      <div className="form_block_list">
                        <HiddenInput name="title" />
                        {FIELDS.map((field) => (
                          <div key={field.id} className="input">
                            <div className="input_label">
                              <label htmlFor={field.id} className="l1 reg">
                                {field.label}
                              </label>
                            </div>
                            <input
                              className="input_field l1 w-input"
                              autoComplete={field.autoComplete}
                              maxLength={256}
                              name={field.id}
                              type={field.type}
                              id={field.id}
                              required
                            />
                          </div>
                        ))}
                        <div className="input">
                          <div className="input_label">
                            <label htmlFor="message" className="l1 reg">
                              Message:
                            </label>
                          </div>
                          <textarea
                            id="message"
                            name="message"
                            maxLength={5000}
                            className="input_field area l1 w-input"
                          />
                        </div>
                        {TRACKING_FIELDS.map((name) => (
                          <HiddenInput key={name} name={name} />
                        ))}
                        <U s={160} on="mob" />
                      </div>
                      <div className="form_block_b">
                        <div className="form_block_legal">
                          <div className="p2 inline">By submitting, you agree to our </div>
                          <div className="legal-cms inline w-dyn-list">
                            <div role="list" className="legal-cms_list inline w-dyn-items">
                              <div role="listitem" className="legal-cms_list_item inline w-dyn-item">
                                <a href={PRIVACY_URL} target="_blank" className="text-link inline w-inline-block">
                                  <div className="p2 inline">Privacy policy</div>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <Btn label="Submit" extra={{ "data-form-btn": "" }} />
                      </div>
                    </div>
                  </div>
                </form>
                <BookingSuccess />
                <div className="form_error theme_on-dark w-form-fail">
                  <div className="l1 a-center">Oops! Something went wrong while submitting the form.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div data-modal-close="" data-modal-over="" className="modal_over" />
    </div>
  );
}

export function MobileMenu() {
  const close = { "data-part": "ctn", "data-modal-close": "mob" };
  return (
    <div data-modal-menu="mob" className="modal menu theme_on-dark">
      <div className="modal_c">
        <div data-modal-container="" className="modal_menu">
          <div className="modal_menu_t">
            <U s={48} on="desk" />
            <U s={272} on="mob" />
            <div className="grid">
              <div className="modal_menu_title">
                <div className="modal_menu_a">
                  <div data-part="a" className="a1 a-center">
                    The
                  </div>
                </div>
                <div data-part="h" className="h1 a-center">
                  Menu
                </div>
              </div>
            </div>
          </div>
          <div className="modal_menu_c">
            <div className="grid">
              <div className="modal_menu_list">
                <HeadingLink label="Home" href="#hero" extra={close} />
                <HeadingLink label="Select an Apartment" href={APARTMENTS_URL} extra={close} />
                <HeadingLink label="Book a call" extra={{ ...close, "data-modal-cta-btn": "book-a-call" }} />
                <HeadingLink label="Contact" href={CONTACT_URL} extra={close} />
              </div>
            </div>
          </div>
          <div className="modal_menu_b">
            <div className="s_logo">
              <div data-part="ctn" className="logo_symbol ico-48">
                <LogoMark />
              </div>
            </div>
            <U s={48} />
          </div>
        </div>
      </div>
      <div data-modal-close="" data-modal-over="" className="modal_bg" />
    </div>
  );
}
