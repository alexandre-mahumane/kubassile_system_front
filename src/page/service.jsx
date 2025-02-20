import { InputsClient } from "../components/Inputs-client";
import { OrderTable } from "../components/OrderTable";

export const Service = () => {
  return (
    <>
      <div className="">
        <InputsClient />
        <OrderTable />
      </div>
    </>
  );
};
