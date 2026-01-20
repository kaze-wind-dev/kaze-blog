import Splide from "@splidejs/splide";
import { Intersection } from "@splidejs/splide-extension-intersection";

import "@splidejs/splide/css/core";

document.addEventListener("DOMContentLoaded", () => {
  const slider = new Splide("#works-slider", {
    type: "loop",
    padding: {
      top: 6,
      bottom: 6,
    },
    perPage: 2,
    autoplay: "pause",
    intersection: {
      inView: {
        autoplay: true,
      },
      outView: {
        autoplay: false,
      },
    },
    gap: "-7.5rem",
    interval: 6000,
    speed: 1000,
    focus: "center",
    rewind: true,
    pauseOnHover: false,
    pauseOnFocus: true,
    pauseOnScroll: true,
    clones: 2,
    pagination: true,
    updateOnMove: true,
    i18n: {
      prev: "前のスライドに移動する",
      next: "次のスライドに移動する",
      first: "最初のスライドに移動する",
      last: "最後のスライドに移動する",
      play: "スライドの自動再生",
      pause: "スライドの自動再生を停止",
      select: "閲覧したいスライドを選択",
      slideLabel: "%s / %s",
    },
    paginationKeyboard: true,
    breakpoints: {
      480: {
        gap: "-7.5rem",
        perPage: 1.2,
      },
      768: {
        gap: "-8rem",
        perPage: 1.4,
      },
    },
  });
  slider.mount({ Intersection });
});
