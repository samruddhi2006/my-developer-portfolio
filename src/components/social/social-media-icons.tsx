"use client";

import { useInView } from "motion/react";
import React, { useRef } from "react";
import { Button } from "../ui/button";
import { SiGithub, SiLinkedin } from "react-icons/si";
// To re-enable X/Twitter or Instagram, re-add SiX / SiInstagram to the import above.
import { config } from "@/data/config";
import Link from "next/link";

const BUTTONS = [
  {
    name: "Github",
    href: config.social.github,
    icon: <SiGithub size={"24"} color={"currentColor"} />,
  },
  {
    name: "LinkedIn",
    href: config.social.linkedin,
    icon: <SiLinkedin size={"24"} color={"currentColor"} />,
  },
  // Not provided — hidden in UI. Uncomment and fill config.social to enable.
  // {
  //   name: "Twitter",
  //   href: config.social.twitter,
  //   icon: <SiX size={"24"} color={"#fff"} />,
  // },
  // {
  //   name: "Instagram",
  //   href: config.social.instagram,
  //   icon: <SiInstagram size={"24"} color={"#fff"} />,
  // },
].filter((button) => Boolean(button.href));

const SocialMediaButtons = () => {
  const ref = useRef<HTMLDivElement>(null);
  const show = useInView(ref, { once: true });
  return (
    <div ref={ref} className="z-10 text-foreground">
      {show &&
        BUTTONS.map((button) => (
          <Link href={button.href} key={button.name} target="_blank">
            <Button variant={"ghost"}>{button.icon}</Button>
          </Link>
        ))}
    </div>
  );
};

export default SocialMediaButtons;
