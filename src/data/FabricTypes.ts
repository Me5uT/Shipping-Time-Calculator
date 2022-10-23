import { IDropdownOption } from "@fluentui/react";

export const FabricTypeOptions: IDropdownOption[] = [
  { key: "cotton", text: "Cotton" },
  { key: "linen", text: "Linen" },
];

export enum FabricTypes {
  Cotton = "cotton",
  Linen = "linen",
}
