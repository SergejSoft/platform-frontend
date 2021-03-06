import { storiesOf } from "@storybook/react";
import * as React from "react";

import { withStore } from "../../../utils/storeDecorator";
import { WalletLedgerNotSupported } from "./WalletLedgerNotSupportedComponent";

storiesOf("WalletLedgerNotSupported", module)
  .addDecorator(withStore())
  .add("default", () => <WalletLedgerNotSupported />);
