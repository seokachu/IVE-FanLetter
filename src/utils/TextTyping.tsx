"use client";

import { hiMelody } from "@/assets/fonts/font";
import { useState, useEffect, FunctionComponent } from "react";

const TextTyping: FunctionComponent = () => {
  const typingName = "DIVE IN TO IVE";
  const [text, setText] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count < typingName.length) {
      const interval = setInterval(() => {
        setText((prevText) => prevText + typingName[count]); // 이전 set한 문자 + 다음 문자
        setCount((prevCount) => prevCount + 1); // 개수 만큼 체크
      }, 100);

      return () => clearInterval(interval);
    }
  }, [count, typingName]);

  return <h2 className={`${hiMelody.className}`}>{text}</h2>;
};

export default TextTyping;
