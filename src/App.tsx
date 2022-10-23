import React from "react";
import {
  DatePicker,
  DefaultButton,
  defaultDatePickerStrings,
  Dropdown,
  TextField,
} from "@fluentui/react";
import { FabricTypeOptions, FabricTypes } from "./data";
import {
  calculateShippingTime,
  firstDayOfWeek,
  onFormatDate,
} from "./services";
import "./App.css";

const App = () => {
  const [shippingTime, setShippingTime] = React.useState<Date | string>(
    "Undefined"
  );
  const [orderDate, setOrderDate] = React.useState<Date | null | undefined>(
    undefined
  );

  const [quantity, setQuantity] = React.useState<string | undefined>("");

  const [fabricType, setFabricType] = React.useState<FabricTypes>();

  return (
    <div className={"app"}>
      <div className={"main-container"}>
        <div className={"title-container"}>The Company</div>
        <div className={"calculator-title-container"}>
          Shipping Time Calculator
        </div>
        <div className={"calculator-inputs-container"}>
          <DatePicker
            className={"order-date-picker"}
            aria-required={"false"}
            firstDayOfWeek={firstDayOfWeek}
            placeholder={"Order Date"}
            ariaLabel={"Order Date"}
            strings={defaultDatePickerStrings}
            formatDate={onFormatDate}
            minDate={new Date()}
            value={orderDate ? orderDate : undefined}
            onSelectDate={(date) => {
              setOrderDate(date);
            }}
          />

          <Dropdown
            className={"fabric-type-dropdown"}
            placeholder={"Fabric Type"}
            options={FabricTypeOptions}
            onChange={(e, v) => {
              setFabricType(v?.key as FabricTypes);
            }}
          />

          <TextField
            className={"quantity-input"}
            placeholder={"Quantity"}
            type={"number"}
            value={quantity}
            iconProps={{
              iconName: "Info",
            }}
            onChange={(e, v) => {
              setQuantity(v);
            }}
            errorMessage={
              (Number(quantity) < 1 || Number(quantity) > 100) &&
              quantity !== ""
                ? "Quantity must be between 1 and 100"
                : ""
            }
          />
        </div>
        <div className={"calculate-button-container"}>
          <DefaultButton
            className={"calculate-button"}
            text={"Calculate"}
            onClick={() => {
              if (quantity && orderDate && fabricType) {
                setShippingTime(
                  onFormatDate(
                    calculateShippingTime(
                      fabricType as FabricTypes,
                      Number(quantity),
                      orderDate as Date
                    )
                  )
                );
              } else {
                setShippingTime("Undefined");
              }
            }}
            styles={{
              root: {
                backgroundImage:
                  "linear-gradient(60deg, #2514db 0%, #ae70ff 100%)",
                color: "white",
                fontFamily: "Poppins",
                fontSize: "27pt",
                borderRadius: "50px",
                padding: "30px 0px",
                width: "300px",
              },
              rootHovered: {
                color: "white",
              },
            }}
          />
        </div>
        <div className={"shipping-time-container"}>
          <div className={"shipping-time-description"}>
            Your Estimated Shipping Time Is
          </div>
          <div className={"shipping-time"}>{`${shippingTime}`}</div>
        </div>
      </div>
      <div className={"space-container"}></div>
    </div>
  );
};

export default App;
