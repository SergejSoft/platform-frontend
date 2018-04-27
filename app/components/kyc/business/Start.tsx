import * as React from "react";
import { FormattedMessage } from "react-intl";
import { compose } from "redux";

import { actions } from "../../../modules/actions";
import { appConnect } from "../../../store";

import { TKycBusinessType } from "../../../lib/api/KycApi.interfaces";
import { injectIntlHelpers } from "../../../utils/injectIntlHelpers";
import { Button } from "../../shared/Buttons";
import { KycPanel } from "../KycPanel";
import { Panels, PanelTheme } from "../shared/Panels";

interface IStateProps {
  loading: boolean;
}

interface IDispatchProps {
  setBusinessType: (type: TKycBusinessType) => void;
}

type IProps = IStateProps & IDispatchProps;

export const KycBusinessStartComponent = injectIntlHelpers<IProps>(
  ({ intl: { formatIntlMessage }, ...props }) => (
    <KycPanel
      steps={4}
      currentStep={1}
      title={formatIntlMessage("kyc.business.start.title")}
      backLink={""}
      isMaxWidth={true}
    >
      <Panels
        panels={[
          {
            content: (
              <Button
                theme="t-white"
                disabled={props.loading}
                onClick={() => props.setBusinessType("small")}
              >
                <FormattedMessage id="kyc.business.start.type.small" />
              </Button>
            ),
            theme: PanelTheme.black,
            id: 1,
          },
          {
            content: (
              <Button
                theme="t-white"
                disabled={props.loading}
                onClick={() => props.setBusinessType("corporate")}
              >
                <FormattedMessage id="kyc.business.start.type.corporation" />
              </Button>
            ),
            theme: PanelTheme.grey,
            id: 2,
          },
          {
            content: (
              <Button
                theme="t-white"
                disabled={props.loading}
                onClick={() => props.setBusinessType("partnership")}
              >
                <FormattedMessage id="kyc.business.start.type.partnership" />
              </Button>
            ),
            theme: PanelTheme.blue,
            id: 3,
          },
        ]}
      />
    </KycPanel>
  ),
);

export const KycBusinessStart = compose<React.SFC>(
  appConnect<IStateProps, IDispatchProps>({
    stateToProps: state => ({
      loading: !!state.kyc.businessDataLoading,
    }),
    dispatchToProps: dispatch => ({
      setBusinessType: (type: TKycBusinessType) => dispatch(actions.kyc.kycSetBusinessType(type)),
    }),
  }),
)(KycBusinessStartComponent);
