"use client";
import dynamic from "next/dynamic";

const DefaultComponent = dynamic(() => import("./DefaultComponent"), {
  ssr: false, // Prevent server-side rendering if necessary
});

export default DefaultComponent;
