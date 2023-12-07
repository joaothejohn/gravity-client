import React, { useEffect, useCallback } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Select, SelectItem } from "@nextui-org/react";
import { IPlan } from "types";

interface IPlanSelect {
  label: string
  value: string
  description: string
}

interface ModalContentProps {
  onClose: () => void;
  plansInfo: IPlan[];
}

const ModalContentComponent: React.FC<ModalContentProps> = ({ onClose, plansInfo }) => {
  const mapPlanToSelectItem = useCallback((plan): IPlanSelect => {
    return {
      label: plan.name,
      value: plan.id,
      description: `Max Limit: ${plan.maxLimit}, Limit At: ${plan.limitAt}, Priority: ${plan.priority}, Burst Limit: ${plan.burstLimit}, Burst Threshold: ${plan.burstThreshold}, Burst Time: ${plan.burstTime}`
    };
  }, []);

  return (
    <>
      <ModalHeader className="flex flex-col gap-1">Add New Customer</ModalHeader>
      <ModalBody>
        <Input
          autoFocus
          label="Username"
          placeholder="Enter the customer username"
          variant="bordered"
        />
        <Input
          label="Password"
          placeholder="Enter the customer password"
          type="password"
          variant="bordered"
        />
        <Select
          size="lg"
          items={plansInfo.map(mapPlanToSelectItem)}
          label="Current Plan"
          placeholder="Select a plan"
          className="max-w-lg w-full"
        >
          {(plan) => <SelectItem key={plan.value}>{plan.label}</SelectItem>}
        </Select>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onPress={onClose}>
          Add
        </Button>
      </ModalFooter>
    </>
  );
}

export default function ModalInput({ open, onOpenChange, onOpen, plansInfo }) {
  useEffect(() => {
    if (open) onOpen()
  }, [onOpen, open])

  return (
    <Modal
      isOpen={open}
      onOpenChange={onOpenChange}
      placement="top-center"
      backdrop="opaque"
      classNames={{
        backdrop: "bg-gradient-to-t from-zinc-900"
      }}
    >
      <ModalContent>
        {(onClose) => <ModalContentComponent onClose={onClose} plansInfo={plansInfo} />}
      </ModalContent>
    </Modal>
  );
}