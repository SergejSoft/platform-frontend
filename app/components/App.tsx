import * as React from "react";
import { ToastContainer } from "react-toastify";

import { compose } from "redux";
import { actions } from "../modules/actions";
import { appConnect } from "../store";
import { onEnterAction } from "../utils/OnEnterAction";
import { AppRouter } from "./AppRouter";
import { Header } from "./Header";
import { AccessWalletModal } from "./modals/AccessWalletModal";
import { GenericModal } from "./modals/GenericModal";
import { LoadingIndicator } from "./shared/LoadingIndicator";

interface IStateProps {
  done: boolean;
  error: boolean;
  errorMsg?: string;
}

class AppComponent extends React.Component<IStateProps> {
  render(): React.ReactNode {
    if (this.props.error) {
      return <h1>Critical error occured: {this.props.errorMsg}</h1>;
    }

    if (!this.props.done) {
      return <LoadingIndicator />;
    }

    return (
      <>
        <Header />
        <div className="wrapper">
          <AppRouter />
        </div>
        <AccessWalletModal />
        <ToastContainer />
        <GenericModal />
      </>
    );
  }
}

export const App = compose<React.ComponentClass>(
  onEnterAction({
    actionCreator: dispatch => dispatch(actions.init.start()),
    pure: false,
  }),
  appConnect<IStateProps>({
    stateToProps: s => ({
      done: s.init.done,
      error: s.init.error,
      errorMsg: s.init.errorMsg,
    }),
    options: { pure: false }, // we need this because of:https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md
  }),
)(AppComponent);
