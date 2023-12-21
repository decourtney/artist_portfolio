import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const About = () => {
  const { ref, inView, entry } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView) {
      // window.history.replaceState(null, "", "/about");
      window.location.hash = "about";
    }
  }, [inView]);

  return (
    <>
      <section
        ref={ref}
        className="flex flex-col justify-center items-center w-full h-screen bg-primary"
      >
        <p className="text-lg font-black">About</p>
      </section>
    </>
  );
};

export default About;
