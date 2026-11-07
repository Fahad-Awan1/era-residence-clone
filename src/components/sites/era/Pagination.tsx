import { Embed } from "./shared";
import { ChevronLeft, ChevronRight } from "./svg";

/** Slider controls: previous, numbered progress bar, next. */
export function Pagination() {
  return (
    <div data-scroll-reveal="ctn" data-slider="pag" className="pag">
      <div data-slider="prev" className="pag_prev">
        <div className="ico-16">
          <Embed className="ico">
            <ChevronLeft />
          </Embed>
        </div>
        <div className="pag_prev_label">
          <div data-slider="current" className="l1">
            00
          </div>
        </div>
      </div>
      <div className="pag_progress">
        <div data-slider="progress" className="pag_progress_fill" />
      </div>
      <div data-slider="next" className="pag_next">
        <div className="pag_prev_label">
          <div data-slider="next-num" className="l1">
            00
          </div>
        </div>
        <div className="ico-16">
          <Embed className="ico">
            <ChevronRight />
          </Embed>
        </div>
      </div>
    </div>
  );
}
