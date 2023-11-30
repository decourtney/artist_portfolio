import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const Contact = () => {
  const { ref, inView, entry } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView) {
      // window.history.replaceState(null, "", "/contact");
      window.location.hash = "contact";
    }
  }, [inView]);

  return (
    <>
      <section
        ref={ref}
        className="flex flex-col justify-center items-center w-full h-screen bg-secondary"
      >
        <p className="text-lg font-black">Contact</p>
      </section>
    </>
  );
};

export default Contact;
