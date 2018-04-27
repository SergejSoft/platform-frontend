import { createStore, Store } from "redux";
import { IConfig } from "../app/config/getConfig";
import { EthereumAddress, EthereumAddressWithChecksum, EthereumNetworkId } from "../app/types";

export const dummyConfig: IConfig = {
  ethereumNetwork: {
    rpcUrl: "https://localhost:8080",
  },
  contractsAddresses: {
    universeContractAddress: "UNIVERSE_ADDRESS",
  },
};

export const dummyNetworkId: EthereumNetworkId = "5" as EthereumNetworkId;

export function createDummyStore(): Store<any> {
  return createStore(() => {});
}

export const dummyEthereumAddress = "0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359" as EthereumAddress;
export const dummyEthereumAddressWithChecksum = "0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359" as EthereumAddressWithChecksum;
