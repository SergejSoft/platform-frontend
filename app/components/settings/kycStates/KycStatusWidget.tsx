import * as cn from "classnames";
import * as React from "react";
import * as styles from "./KycStatusWidget.module.scss";

import * as arrowRight from "../../../assets/img/inline_icons/arrow_right.svg";
import * as successIcon from "../../../assets/img/notfications/Success_small.svg";
import * as warningIcon from "../../../assets/img/notfications/warning.svg";

import { Col } from "reactstrap";
import { compose } from "redux";
import { TRequestStatus } from "../../../lib/api/KycApi.interfaces";
import { actions } from "../../../modules/actions";
import { selectIsUserEmailVerified } from "../../../modules/auth/selectors";
import { selectKycRequestStatuts } from "../../../modules/kyc/selectors";
import { appConnect } from "../../../store";
import { Dictionary } from "../../../types";
import { onEnterAction } from "../../../utils/OnEnterAction";
import { Button } from "../../shared/Buttons";
import { PanelDark } from "../../shared/PanelDark";

interface IStateProps {
  requestStatus?: TRequestStatus;
  isUserEmailVerified: boolean;
}

interface IDispatchProps {
  onStartKyc: () => void;
}

type IProps = IStateProps & IDispatchProps;

const statusTextMap: Dictionary<string> = {
  Approved: "Your Kyc request is has been approved. Happy investing!",
  Rejected: "Your Kyc request was rejected. ",
  Pending:
    "We are currently reviewing your Kyc request. You will receive and email once your request has been processed.",
  Draft: "Please submit your Kyc request now.",
  Outsourced:
    "Your instant identification is being processed. You will be notified by e-mail once this is completed.",
};

const getStatus = (selectIsUserEmailVerified: boolean, requestStatus?: TRequestStatus): string => {
  if (!selectIsUserEmailVerified) {
    return "You need to verify email before starting KYC";
  }

  if (!requestStatus) {
    return "";
  }

  return statusTextMap[requestStatus];
};

export const KycStatusWidgetComponent: React.SFC<IProps> = props => {
  return (
    <PanelDark
      headerText="KYC PROCESS"
      rightComponent={
        props.requestStatus === "Approved" ? (
          <img src={successIcon} className={styles.icon} aria-hidden="true" />
        ) : (
          <img src={warningIcon} className={styles.icon} aria-hidden="true" />
        )
      }
    >
      {props.requestStatus === "Approved" ? (
        <div data-test-id="verified-section" className={cn(styles.content)}>
          <div className="pt-2">{statusTextMap[props.requestStatus]}</div>
        </div>
      ) : (
        <div
          data-test-id="unverified-section"
          className={cn(styles.content, "d-flex flex-wrap align-content-around")}
        >
          <p className={cn(styles.text, "pt-2")}>
            {getStatus(props.isUserEmailVerified, props.requestStatus)}
          </p>
          <Col xs={12} className="d-flex justify-content-center">
            {props.requestStatus && props.requestStatus === "Draft" ? (
              <Button
                layout="secondary"
                iconPosition="icon-after"
                svgIcon={arrowRight}
                onClick={props.onStartKyc}
                disabled={!props.isUserEmailVerified}
              >
                Verify KYC
              </Button>
            ) : (
              <div />
            )}
          </Col>
        </div>
      )}
    </PanelDark>
  );
};

export const KycStatusWidget = compose<React.ComponentClass>(
  appConnect<IStateProps, IDispatchProps>({
    stateToProps: s => ({
      requestStatus: selectKycRequestStatuts(s.kyc),
      isUserEmailVerified: selectIsUserEmailVerified(s.auth),
    }),
    dispatchToProps: dispatch => ({
      onStartKyc: () => dispatch(actions.routing.goToKYCHome()),
    }),
  }),
  onEnterAction({
    actionCreator: dispatch => {
      dispatch(actions.kyc.kycLoadIndividualRequest());
      dispatch(actions.kyc.kycLoadBusinessRequest());
    },
  }),
)(KycStatusWidgetComponent);
