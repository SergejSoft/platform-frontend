import { effects } from "redux-saga";
import { call, fork, put, select } from "redux-saga/effects";
import { CHANGE_EMAIL_PERMISSION } from "../../config/constants";
import { TGlobalDependencies } from "../../di/setupBindings";
import { IAppState } from "../../store";
import { accessWalletAndRunEffect } from "../accessWallet/sagas";
import { TAction } from "../actions";
import { ensurePermissionsArePresent, loadUser, updateUser } from '../auth/sagas';
import { selectUser } from "../auth/selectors";
import { neuCall, neuTakeEvery } from "../sagas";
import { actions } from "./../actions";

export function* addNewEmail(
  { notificationCenter }: TGlobalDependencies,
  action: TAction,
): Iterator<any> {
  if (action.type !== "SETTINGS_ADD_NEW_EMAIL") return;

  const email = action.payload.email;
  const user = yield select((s: IAppState) => selectUser(s.auth));

  try {
    yield neuCall(
      ensurePermissionsArePresent,
      [CHANGE_EMAIL_PERMISSION],
      "Change email",
      "Confirm changing your email.",
    );

    yield effects.call(updateUser, { ...user, new_email: email });
    notificationCenter.info("New Email added");
  } catch {
    yield effects.call(loadUser);
    notificationCenter.error("Failed to send email");
  }
}

export function* resendEmail(
  { notificationCenter }: TGlobalDependencies,
  action: TAction,
): Iterator<any> {
  if (action.type !== "SETTINGS_RESEND_EMAIL") return;

  const user = yield select((s: IAppState) => selectUser(s.auth));
  const email = user.unverifiedEmail;

  try {
    if (!email) throw new Error("No unverified email");

    yield neuCall(
      ensurePermissionsArePresent,
      [CHANGE_EMAIL_PERMISSION],
      "Resend email",
      "Confirm resending activation email.",
    );
    yield effects.call(updateUser, { ...user, new_email: email });
    notificationCenter.info("Email successfully resent");
  } catch {
    notificationCenter.error("Failed to resend email");
  }
}

export function* loadSeedOrReturnToSettings(): Iterator<any> {
  // unlock wallet
  try {
    const signEffect = put(actions.web3.fetchSeedFromWallet());
    return yield call(
      accessWalletAndRunEffect,
      signEffect,
      "Access seed",
      "Please confirm to access your seed.",
    );
  } catch {
    yield put(actions.routing.goToSettings());
  }
}

export const settingsSagas = function*(): Iterator<effects.Effect> {
  yield fork(neuTakeEvery, "SETTINGS_ADD_NEW_EMAIL", addNewEmail);
  yield fork(neuTakeEvery, "SETTINGS_RESEND_EMAIL", resendEmail);
  yield fork(neuTakeEvery, "LOAD_SEED_OR_RETURN_TO_SETTINGS", loadSeedOrReturnToSettings);
};
