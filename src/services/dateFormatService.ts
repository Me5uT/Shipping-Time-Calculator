import { DayOfWeek } from "@fluentui/react";
import { FabricTypes } from "../data";

export const firstDayOfWeek = DayOfWeek.Monday;

export const onFormatDate = (date?: Date): string => {
  return date
    ? date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";
};

export const getNextBusinessDay = (dateIn: Date): Date => {
  const dayOfWeek = dateIn.getDay();
  let shippingDate = new Date(dateIn);

  // Bonus dates
  // July 4
  if (dateIn.getMonth() === 6 && dateIn.getDate() === 4)
    return getNextBusinessDay(
      new Date(shippingDate.setDate(dateIn.getDate() + 1))
    );
  // December 25
  else if (dateIn.getMonth() === 11 && dateIn.getDate() === 25)
    return getNextBusinessDay(
      new Date(shippingDate.setDate(dateIn.getDate() + 1))
    );

  switch (dayOfWeek) {
    case 6:
      // for Saturday add 2 days
      return new Date(shippingDate.setDate(dateIn.getDate() + 2));

    case 0:
      // for Sunday add 1 day
      return new Date(shippingDate.setDate(dateIn.getDate() + 1));

    default:
      return shippingDate;
  }
};

export const getNextOrderBusinessDay = (dateIn: Date, day: number): Date => {
  let shipDay = dateIn;
  let newDay = dateIn;
  for (let index = 0; index < day; index++) {
    const newshipDay = new Date(newDay.setDate(shipDay.getDate() + 1));
    shipDay = getNextBusinessDay(newshipDay);

    console.log("shipDay", shipDay);
  }
  return shipDay;
};

export const calculateShippingTime = (
  goods?: FabricTypes,
  quantity?: number,
  orderDate?: Date
) => {
  if (goods && quantity && orderDate) {
    const nextBussiness = getNextBusinessDay(orderDate);
    console.log("nextBussiness", nextBussiness);

    switch (true) {
      case goods === FabricTypes.Cotton && quantity < 50:
        return getNextOrderBusinessDay(nextBussiness, 2);

      case goods === FabricTypes.Cotton && quantity >= 50:
        return getNextOrderBusinessDay(nextBussiness, 3);

      case goods === FabricTypes.Linen && quantity < 50:
        return getNextOrderBusinessDay(nextBussiness, 4);

      case goods === FabricTypes.Linen && quantity >= 50:
        return getNextOrderBusinessDay(nextBussiness, 5);

      default:
        throw new Error("Something went wrong!");
    }
  }
};
