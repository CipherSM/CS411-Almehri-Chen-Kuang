// useLenis.js
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

const useLenis = () => {
  useEffect(() => {
    const lenis = new Lenis();
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(raf);
    };
  }, []);
};

export default useLenis;
