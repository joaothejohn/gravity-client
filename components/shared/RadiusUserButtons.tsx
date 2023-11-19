import React from "react";

import { BoltIcon } from "@heroicons/react/24/outline";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem, Button, cn } from "@nextui-org/react";

export default function RadiusUserButtons() {
  const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button 
          variant="transparent" 
        >
          <BoltIcon className="w-6 h-6 mr-2" /> Actions
        </Button>
      </DropdownTrigger>
      <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
        <DropdownSection title="Actions" showDivider>  
            <DropdownItem
              key="edit"
              description="Allows you to edit the customer"
              startContent={<div className={iconClasses} />}
            >
              Edit Customer
            </DropdownItem>
        </DropdownSection>
        <DropdownSection title="Danger zone">  
          <DropdownItem
            key="delete"
            className="text-danger"
            color="danger"
            description="Delete the customer"
            startContent={<div className={cn(iconClasses, "text-danger")} />}
          >
            Delete Customer
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
