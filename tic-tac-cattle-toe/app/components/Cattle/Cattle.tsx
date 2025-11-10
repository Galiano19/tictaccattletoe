import Image from "next/image";
import cattlePic from "./cattle.png";
import { Tooltip } from "@heroui/tooltip";

export default function Cattle() {
  return (
    <Tooltip content='Click me' placement='bottom' showArrow={true}>
      <Image src={cattlePic} width={100} height={100} alt='Cattle' />
    </Tooltip>
  );
}
