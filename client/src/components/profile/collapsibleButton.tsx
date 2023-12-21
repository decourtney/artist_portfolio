import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";

interface ButtonProps {
  handleOnClick: Dispatch<SetStateAction<boolean>>;
  display: boolean;
  title: string;
  symbol: string;
}

const CollapsibleButton = ({
  handleOnClick,
  display,
  title,
  symbol,
}: ButtonProps) => {
  const controls = useAnimationControls();
  const [isHover, setIsHover] = useState(false);

  // Use UseEffect to manipulate controls
  useEffect(() => {
    if (isHover) controls.start("open");
    else controls.start("close");
  }, [isHover]);

  return (
    <section className="inline-flex items-center text-xs">
      <motion.button
        type="button"
        className="inline-flex items-center"
        onHoverStart={() => setIsHover(true)}
        onHoverEnd={() => setIsHover(false)}
        onClick={() => handleOnClick(!display)}
      >
        <motion.div
          className="overflow-hidden whitespace-nowrap"
          initial="close"
          animate={controls}
          variants={{
            open: { maxWidth: 100 },
            close: { maxWidth: 0 },
          }}
        >
          <p>{title}</p>
        </motion.div>
        <span className="material-symbols-rounded px-1 text-lg pointer-events-none">
          {symbol}
        </span>
      </motion.button>
    </section>
  );
};

export default CollapsibleButton;
