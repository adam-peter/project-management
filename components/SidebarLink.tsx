"use client";
import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Settings, User, Grid, Calendar } from "react-feather";

const icons = {
  Settings,
  User,
  Grid,
  Calendar,
};

interface SidebarLinkProps {
  link: {
    link: string;
    icon: string;
  };
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ link }) => {
  const pathname = usePathname(); //doesn't have to be a state - it reloads every time the path changes anyways
  let isActive = false;

  if (pathname === link.link) {
    isActive = true;
  }

  // @ts-ignore
  const Icon = icons[link.icon];

  return (
    <Link href={link.link}>
      <Icon
        size={40}
        className={`stroke-gray-400 transition duration-200 ease-in-out hover:stroke-violet-600 ${
          isActive && "stroke-violet-600"
        }`}
      />
    </Link>
  );
};

export default SidebarLink;
