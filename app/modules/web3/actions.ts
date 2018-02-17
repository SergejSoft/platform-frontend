import { IAppAction } from "../../store";
import { makeActionCreator } from "../../storeHelpers";
import { EthereumAddress } from "../../types";
import { createSimpleAction } from "../actionsUtils";
import { WalletSubType, WalletType } from "./types";

export const web3Actions = {
  personalWalletDisconnected: () => createSimpleAction("PERSONAL_WALLET_DISCONNECTED"),
};

export interface INewPersonalWalletPluggedAction extends IAppAction {
  type: "NEW_PERSONAL_WALLET_PLUGGED";
  payload: {
    type: WalletType;
    subtype: WalletSubType;
    ethereumAddress: EthereumAddress;
  };
}
export const newPersonalWalletPluggedAction = makeActionCreator<INewPersonalWalletPluggedAction>(
  "NEW_PERSONAL_WALLET_PLUGGED",
);
