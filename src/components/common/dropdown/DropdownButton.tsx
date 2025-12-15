import { Check, ChevronDown } from "@untitledui/icons";
import { Button } from "../buttons/Button";
import { Dropdown } from "./dropdown";

interface DropdownButtonProps {
  placeholder?: string;
  label: Record<string, string>;
  value?: string | null;
  onChange?: (value: string) => void;
  className?: string;
}

export const DropdownButton = ({
  placeholder,
  label,
  value,
  onChange,
  className,
}: DropdownButtonProps) => {
  const selectedLabel = (value && label[value]) || placeholder;

  return (
    <Dropdown>
      <Button
        className={`group justify-between, focus:ring-brand text-md flex justify-between rounded-lg px-3 py-2 text-left font-medium focus:ring-2 ${className}`}
        color="secondary"
        iconTrailing={<ChevronDown size={16} />}
      >
        {selectedLabel}
      </Button>
      <Dropdown.Popover>
        <Dropdown.Menu>
          <Dropdown.Section>
            {Object.entries(label).map(([key, itemLabel]) => (
              <Dropdown.Item
                key={key}
                id={key}
                onClick={() => {
                  onChange?.(key);
                }}
                icon={value === key ? Check : undefined}
                className="text-md font-medium"
              >
                {itemLabel}
              </Dropdown.Item>
            ))}
          </Dropdown.Section>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
};
