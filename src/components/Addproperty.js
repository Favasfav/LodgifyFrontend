import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Typography,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Select,
  Option,
} from "@material-tailwind/react";
import {
  BanknotesIcon,
  CreditCardIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";

function formatCardNumber(value) {
  const val = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
  const matches = val.match(/\d{4,16}/g);
  const match = (matches && matches[0]) || "";
  const parts = [];

  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }

  if (parts.length) {
    return parts.join(" ");
  } else {
    return value;
  }
}

function formatExpires(value) {
  return value
    .replace(/[^0-9]/g, "")
    .replace(/^([2-9])$/g, "0$1")
    .replace(/^(1{1})([3-9]{1})$/g, "0$1/$2")
    .replace(/^0{1,}/g, "0")
    .replace(/^([0-1]{1}[0-9]{1})([0-9]{1,2}).*/g, "$1/$2");
}

export default function Addproperty() {
  
  const [type, setType] = React.useState("card");
  const [cardNumber, setCardNumber] = React.useState("");
  const [cardExpires, setCardExpires] = React.useState("");

  return (
    <Card className="w-full max-w-[24rem]">
      <CardHeader
        color="gray"
        floated={false}
        shadow={false}
        className="m-0 grid place-items-center rounded-b-none py-8 px-4 text-center"
      >
        <div className="mb-4 rounded-full border border-white/10 bg-white/10 p-6 text-white">
          <BanknotesIcon className="h-10 w-10" />
        </div>
        <Typography variant="h4" color="white">
          Material Tailwind PRO
        </Typography>
      </CardHeader>
      <CardBody>
        <Tabs value={type} className="overflow-visible">
          <TabsHeader className="relative z-0">
            <Tab value="card" onClick={() => setType("card")}>
              Pay with Card
            </Tab>
            <Tab value="paypal" onClick={() => setType("paypal")}>
              Pay with PayPal
            </Tab>
          </TabsHeader>
          <TabsBody
            className="!overflow-x-hidden !overflow-y-visible"
            animate={{
              initial: {
                x: type === "card" ? 400 : -400,
              },
              mount: {
                x: 0,
              },
              unmount: {
                x: type === "card" ? 400 : -400,
              },
            }}
          >
            <TabPanel value="card" className="p-0">
              <form className="mt-12 flex flex-col gap-4">
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-4 font-medium"
                  >
                    Personal Details
                  </Typography>
                  <Input type="email" label="Email Address" />
                </div>

                <div className="my-6">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-4 font-medium"
                  >
                    Card Details
                  </Typography>

                  <Input
                    label="Card Number"
                    maxLength={19}
                    value={formatCardNumber(cardNumber)}
                    onChange={(event) => setCardNumber(event.target.value)}
                    icon={
                      <CreditCardIcon className="h-5 w-5 text-blue-gray-300" />
                    }
                  />
                  <div className="my-4 flex items-center gap-4">
                    <Input
                      label="Expires"
                      maxLength={5}
                      value={formatExpires(cardExpires)}
                      onChange={(event) => setCardExpires(event.target.value)}
                      containerProps={{ className: "min-w-[72px]" }}
                    />
                    <Input
                      label="CVC"
                      maxLength={4}
                      containerProps={{ className: "min-w-[72px]" }}
                    />
                  </div>
                  <Input label="Holder Name" />
                </div>
                <Button size="lg">Pay Now</Button>
                <Typography
                  variant="small"
                  color="gray"
                  className="mt-2 flex items-center justify-center gap-2 font-normal opacity-60"
                >
                  <LockClosedIcon className="-mt-0.5 h-4 w-4" /> Payments are
                  secure and encrypted
                </Typography>
              </form>
            </TabPanel>
            <TabPanel value="paypal" className="p-0">
              <form className="mt-12 flex flex-col gap-4">
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-4 font-medium"
                  >
                    Personal Details
                  </Typography>
                  <Input type="email" label="Email Address" />
                </div>

                <div className="my-6">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-4 font-medium"
                  >
                    Billing Address
                  </Typography>

                  
                  <Input
                    label="Postal Code"
                    containerProps={{ className: "mt-4" }}
                  />
                </div>
                <Button size="lg" color="amber" className="relative h-12">
                  <img
                    alt="paypal"
                    className="absolute top-2/4 left-2/4 w-16 -translate-x-2/4 -translate-y-2/4"
                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAxcHgiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAxMDEgMzIiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaW5ZTWluIG1lZXQiIHhtbG5zPSJodHRwOiYjeDJGOyYjeDJGO3d3dy53My5vcmcmI3gyRjsyMDAwJiN4MkY7c3ZnIj48cGF0aCBmaWxsPSIjMDAzMDg3IiBkPSJNIDEyLjIzNyAyLjggTCA0LjQzNyAyLjggQyAzLjkzNyAyLjggMy40MzcgMy4yIDMuMzM7IDMuNyBMIDAuMjM3IDIzLjcgQyAwLjEzNyAyNC4xIDAuNDM3IDI0LjQgMC44MzcgMjQuNCBMIDQuNTM3IDI0LjQgQyA1LjAzNyAyNC4uNSA1LjUzNyAyNC4wMyA1LjYzNyAyMy41IEwgNi40MzcgMTguMSBDIDYuNTM3IDE3LjYgNi45MzcgMTcuMiA3LjUzNyAxNy4yIEwgMTAuMDM3IDE3LjIgQyAxNS4xMzcgMTcuMiAxOC4xMzcgMTQuNyAxOC45MzcgOS44IEMgMTkuMjM3IDcuNyAxOC45MzcgNiAxNy45MzcgNC44IEMgMTYuODM3IDMuNSAxNC44MzcgMi44IDEyLjIzNyAyLjggWiBNIDEzLjEzNyAxMC4xIEMgMTIuNzM3IDEyLjkgMTAuNSAzLjkgMTAuMiAzLjMgTCAzMC45MzcgMTEuNSBMIDMwLjYzNyAxMS4xIEMgMjkuODM3IDkuOSAyOC4wMzcgOS41IDI2LjIzNyAyLjkgMjYuMjM3IDIuOSBaIE0gMTMuMTM3IDEwLjEgQyAxMi43MzcgMTIuOSAxMC41MzcgMTIuOSA4LjUzNyAxMi45IEwgNy4zMzcgMTIuOSBDIDcuMSAxMS45MzcgNy4xIDEyLjYzNyA4LjggNy45MzcgOC43IEMgOC4xMzcgNy40IDguNDM3IDcuMiA4LjczNyA3LjIgTCA5LjIzNyA3LjIgQyAxMC42MzcgNy4yIDEyLjkzNyA3LjIgMTIuNiAxNy45MzcgMTcuOSBMIDExLjUzNyAxOS4zIDExLjkgMi4xIDExLjkgMS45IEMgMTguMTM3IDEuOSAxOC4zMzcgMTguMiAxOC4wMzcgMjAuOCBMIDE3LjUzNyAyMS4zIEwgMTkuMzM3IDIyLjcgQyAyMC40MzcgMjQuMjM3IDIyLjEzNyAyNC42IDIyLjUgMjkuMiBMIDI5LjIzNyAyMy41IEMgMjguOTM3IDIzLjkgMjkuMjM3IDI0LjMgMjkuNjM3IDI0LjMgTCAzMy4wMzcgMjQuMyBDIDMzLjUzNyAyNC4zIDM0LjAzNyAyMy45IDM0LjEzNyAyMy40IEwgMzYuMTM3IDEwLjYgQyAzNi4yMzcgMTAuNCAzNS44MzcgMTAgMzUuNDM3IDEwIFogTSAzMC4zMzcgMTcuMiBDIDI5LjkzNyAxOS4zIDI4LjMzNyAyMC44IDI2LjEzNyAyMC44IEMgMjUuMDM3IDIwLjggMjQuMjM3IDIwLjUgMjMuNjM3IDE5LjggQyAyMy4wMzcgMTkuMSAyMi44MzcgMTguMiAyMy4wMzcgMTcuMiBDIDIzLjMzNyAxNS4xIDI1LjEzNyAxMy42IDI3LjIzNyAxMy42IEMgMjguMzM7IDEzLjYgMjkuMTM3IDE0IDI5LjczNyAxNC42IEMgMzAuMjM3IDE1LjMgMzAuNDM3IDE2LjIgMzAuMzM3IDE3LjIgWiI+PC9wYXRoPjxwYXRoIGZpbGw9IiMwMDMwODciIGQ9Ik0gNTUuMzM3IDEwIEwgNTEuNjM3IDEwIEMgNTEuMjM3IDEwIDUwLjkzNyAxMC4yIDUwLjczNyAxMC41IEwgNDUuNTM3IDE4LjEgTCA0My4zMzcgMTAuOCBDIDQzLjIzNyAxMC4zIDQyLjczNyAxMCA0Mi4zMzcgMTAgTCAzOC42MzcgMTAgQyAzOC4yMzcgMTAgMzcuODM3IDEwLjQgMzguMDM3IDEwLjkgTCA0Mi4xMzcgMjMgTCAzOC4yMzcgMjguNCBDIDM3LjkzNyAyOC44IDM4LjIzNyAyOS40IDM4LjczNyAzMC4wMzcgMzguMyBMIDMwLjczNyA1My40MzcgQyAzMC4yMzcgNzAuNSAzMC4yMzcgODUuMTM3IDM2LjggODMuNzM3IDM2LjggTCA1My4zIDM2LjggWiI+PC9wYXRoPjwvc3ZnPgo="/>
                  <Typography
                    variant="button"
                    color="amber"
                    className="mt-2 text-center"
                  >
                    Pay with PayPal
                  </Typography>
                </Button>
                <Typography
                  variant="small"
                  color="gray"
                  className="mt-2 flex items-center justify-center gap-2 font-normal opacity-60"
                >
                  <LockClosedIcon className="-mt-0.5 h-4 w-4" /> Payments are
                  secure and encrypted
                </Typography>
              </form>
            </TabPanel>
          </TabsBody>
        </Tabs>
      </CardBody>
    </Card>
  );
}
