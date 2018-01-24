import { expect } from "chai";
import { shallow } from "enzyme";
import * as React from "react";

import { LoadingIndicator } from "../../../app/components/LoadingIndicator";
import { WalletLedgerInitComponent } from "../../../app/components/walletSelector/WalletLedgerInitComponent";
import { tid } from "../../testUtils";

describe("<WalletLedgerInitComponent />", () => {
  it("should render LoadingIndicator", () => {
    const component = shallow(<WalletLedgerInitComponent />);
    expect(component.find(LoadingIndicator)).to.have.length(1);
  });

  it("should render error message", () => {
    const errorMsg = "some error";
    const component = shallow(<WalletLedgerInitComponent errorMessage={errorMsg} />);
    expect(component.find(tid("ledger-wallet-error-msg")).text()).to.be.eq(errorMsg);
  });
});
