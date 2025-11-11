import Image from "next/image";
import cattlePic from "./cattle.png";
import styles from "./Cattle.module.css";
import { contentStrings } from "@/lib/constants/content";
import { useState } from "react";

function Content({ children }: { children: string }) {
  return <div className={styles.content}>Did you know that... {children}?</div>;
}

export default function Cattle() {
  const [content, setContent] = useState<(typeof contentStrings)[number]>(
    contentStrings[0]
  );

  const handleClick = () => {
    const randomIndex = Math.floor(Math.random() * contentStrings.length);
    setContent(contentStrings[randomIndex]);
  };

  return (
    <div className={styles.wrapper}>
      <button onClick={handleClick}>
        <Image src={cattlePic} width={100} height={100} alt='Cattle' />
      </button>
      <Content>{content}</Content>
    </div>
  );
}
