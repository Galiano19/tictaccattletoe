import { locations } from "@/app/api/coordinates/locations";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import styles from "./LocationSelector.module.css";
import { AiFillEdit } from "react-icons/ai";

interface LocationSelectorProps {
  onLocationChange: (location: (typeof locations)[number]) => void;
}

export default function LocationSelector({
  onLocationChange,
}: LocationSelectorProps) {
  return (
    <Dropdown>
      <DropdownTrigger>
        <button className={styles.trigger}>
          <i>Select Location</i> <AiFillEdit />
        </button>
      </DropdownTrigger>
      <DropdownMenu
        className={styles.wrapper}
        disallowEmptySelection
        aria-label='Dynamic Actions'
        variant='flat'
        items={locations.map((location) => ({
          key: location,
          label: location,
        }))}
        onAction={(item) =>
          onLocationChange(item as (typeof locations)[number])
        }
      >
        {(item: { key: string; label: string }) => (
          <DropdownItem key={item.key}>
            <button>{item.label}</button>
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}
