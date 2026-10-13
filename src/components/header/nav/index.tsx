import { useState } from "react";
import { motion } from "motion/react";
import styles from "./style.module.scss";
import { height } from "../anim";
import Body from "./body/body";
// Hover preview disabled until real menu thumbnails are provided — the old
// files were someone else's screenshots. Re-enable by uncommenting the
// <Image> usage below and adding your own /assets/nav-link-previews/*.png.
// import Image from "./image/image";
import MotionToggle from "@/components/motion-toggle";

import { links } from "@/components/header/config";
import { cn } from "@/lib/utils";

interface IndexProps {
  setIsActive: (isActive: boolean) => void;
}

interface SelectedLinkState {
  isActive: boolean;
  index: number;
}

const Index: React.FC<IndexProps> = ({ setIsActive }) => {
  const [selectedLink, setSelectedLink] = useState<SelectedLinkState>({
    isActive: false,
    index: 0,
  });

  return (
    <motion.div
      variants={height}
      initial="initial"
      animate="enter"
      exit="exit"
      // Clicking the empty overlay area (anything that isn't a link/control)
      // closes the menu.
      onClick={() => setIsActive(false)}
      className={cn(styles.nav, "relative")}
    >
      <div className={cn(styles.wrapper, 'flex justify-end sm:justify-start')}>
        <div className={styles.container}>
          <Body
            links={links}
            selectedLink={selectedLink}
            setSelectedLink={setSelectedLink}
            setIsActive={setIsActive}
          />
        </div>
        {/* Hover preview goes here when thumbnails exist (see import note).
            Kept out for now: it overlapped the motion toggle and showed
            stale screenshots.
        <Image
          src={links[selectedLink.index].thumbnail}
          isActive={selectedLink.isActive}
        />
        */}
      </div>
      {/* Subtle reduced-motion control, tucked into the bottom-right of the menu.
          Stop propagation so toggling motion doesn't also close the menu. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        onClick={(e) => e.stopPropagation()}
        className="absolute bottom-0 right-0"
      >
        <MotionToggle />
      </motion.div>
    </motion.div>
  );
};

export default Index;
