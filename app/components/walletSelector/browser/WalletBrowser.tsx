import * as cn from "classnames";
import * as React from "react";
import { Col, Row } from "reactstrap";
import { compose } from "redux";

import { walletFlows } from "../../../modules/wallet-selector/flows";
import { appConnect } from "../../../store";
import { withActionWatcher } from "../../../utils/withActionWatcher";
import { HiResImage } from "../../shared/HiResImage";
import { HorizontalLine } from "../../shared/HorizontalLine";
import { LoadingIndicator } from "../../shared/LoadingIndicator";
import { StepCard } from "../../shared/StepCard";
import { WarningAlert } from "../../shared/WarningAlert";

import * as browserIcon from "../../../assets/img/wallet_selector/browser_icon.svg";
import * as lockIcon from "../../../assets/img/wallet_selector/lock_icon.svg";
import * as walletIcon from "../../../assets/img/wallet_selector/wallet_icon.svg";

import { selectIsLoginRoute } from "../../../modules/wallet-selector/selectors";
import * as styles from "./WalletBrowser.module.scss";

export const BROWSER_WALLET_RECONNECT_INTERVAL = 1000;

interface IWalletBrowserProps {
  errorMessage?: string;
  isLoading: boolean;
  isLoginRoute: boolean;
}

export const WalletBrowserComponent: React.SFC<IWalletBrowserProps> = ({
  errorMessage,
  isLoading,
  isLoginRoute,
}) => (
  <div>
    <h1 className="text-center mb-3">
      {isLoginRoute ? "Login with existing wallet" : "Register your existing wallet"}
    </h1>

    {isLoading ? (
      <LoadingIndicator />
    ) : (
      <div>
        <Row className="justify-content-center mb-4">
          <WarningAlert>
            <span data-test-id="browser-wallet-error-msg">{errorMessage}</span>
          </WarningAlert>
        </Row>

        <Row className="mb-4 text-center">
          <StepCard img={walletIcon} text="1. Choose existing wallet" />
          <StepCard img={browserIcon} text="2. Turn on your browser plugin" />
          <StepCard img={lockIcon} text="3. Unlock your wallet to register" />
        </Row>

        <HorizontalLine className="mb-4" />

        <Row className="text-center mb-4">
          <Col>
            <span className="font-weight-bold">NEUFUND supports</span>
          </Col>
        </Row>
        <Row className={cn("justify-content-center text-center", styles.walletLogos)}>
          <Col sm="auto">
            <HiResImage partialPath="wallet_selector/logo_parity" alt="Parity" title="Parity" />
          </Col>
          <Col sm="auto">
            <HiResImage
              partialPath="wallet_selector/logo_metamask"
              alt="Metamask"
              title="Metamask"
            />
          </Col>
          <Col sm="auto">
            <HiResImage partialPath="wallet_selector/logo_mist" alt="Mist" title="Mist" />
          </Col>
        </Row>
      </div>
    )}
  </div>
);

export const WalletBrowser = compose<React.SFC>(
  appConnect<IWalletBrowserProps>({
    stateToProps: state => ({
      errorMessage: state.browserWalletWizardState.errorMsg,
      isLoading: state.browserWalletWizardState.isLoading,
      isLoginRoute: selectIsLoginRoute(state.router),
    }),
  }),
  withActionWatcher({
    actionCreator: dispatch => dispatch(walletFlows.tryConnectingWithBrowserWallet),
    interval: BROWSER_WALLET_RECONNECT_INTERVAL,
  }),
)(WalletBrowserComponent);
