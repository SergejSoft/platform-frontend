import { some } from "lodash";

import { appRoutes } from "../../components/appRoutes";
import { IAppState } from "../../store";
import { selectBackupCodesVerified, selectIsUserEmailVerified } from "../auth/selectors";
import { selectKycRequestStatus, selectWidgetLoading } from "./../kyc/selectors";
import { settingsNotification } from "./reducer";

export const selectIsActionRequiredSettings = (state: IAppState): boolean => {
  if (selectWidgetLoading(state.kyc)) {
    return false;
  }

  return (
    !selectIsUserEmailVerified(state.auth) ||
    !selectBackupCodesVerified(state.auth) ||
    selectKycRequestStatus(state.kyc) !== "Accepted"
  );
};

/**
 * Hides notification on blacklisted routes.
 */
export const selectIsVisibleSecurityNotification = (state: IAppState): boolean => {
  const disallowedViewsPaths = [appRoutes.settings, appRoutes.kyc];

  if (
    state.router.location &&
    some(disallowedViewsPaths, p => state.router.location!.pathname.startsWith(p))
  ) {
    return false;
  }

  return selectIsActionRequiredSettings(state);
};

export const selectSettingsNotification = (state: IAppState) =>
  selectIsVisibleSecurityNotification(state) ? settingsNotification() : undefined;
