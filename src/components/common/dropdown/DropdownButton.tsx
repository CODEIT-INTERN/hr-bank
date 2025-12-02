import { ChevronDown, Check } from "@untitledui/icons";
import { Dropdown } from "./Dropdown";
import { useState } from "react";
import { Button } from "../buttons/Button";

interface DropdownButtonProps {
  placeholder?: string;
  label: Record<string, string>;
  onChange?: (value: string) => void;
}

export const DropdownButton = ({
  placeholder,
  label,
  onChange,
}: DropdownButtonProps) => {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const selectedLabel = (selectedKey && label[selectedKey]) || placeholder;

  return (
    <Dropdown>
      <Button className="group" color="secondary" iconTrailing={ChevronDown}>
        {selectedLabel}
      </Button>
      <Dropdown.Popover>
        <Dropdown.Menu>
          <Dropdown.Section>
            {Object.entries(label).map(([key, value]) => (
              <Dropdown.Item
                key={key}
                id={key}
                onClick={() => {
                  setSelectedKey(key);
                  onChange?.(key);
                }}
                icon={selectedKey === key ? Check : undefined}
              >
                {value}
              </Dropdown.Item>
            ))}
          </Dropdown.Section>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
};
