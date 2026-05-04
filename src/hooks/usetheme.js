"use client";
import { useState } from "react";

export default function useTheme() {

  const [lampOn, setLampOn] = useState(true);
  const [bounce, setBounce] = useState(false);

  const toggleLamp = () => {

    setBounce(true);

    setLampOn(prev => !prev);

    setTimeout(() => {
      setBounce(false);
    }, 250);

  };

  return {
    lampOn,
    bounce,
    toggleLamp
  };
}