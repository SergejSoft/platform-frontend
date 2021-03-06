import * as React from "react";
import * as styles from "./TotalEuro.module.scss";

import { FormattedMessage } from "react-intl-phraseapp";
import { Money } from "../shared/Money";

interface ITotalEuroProps {
  totalEurValue: string;
}

export const TotalEuro: React.SFC<ITotalEuroProps> = ({ totalEurValue }) => (
  <div className={styles.totalEuro}>
    <span className={styles.label}>
      <FormattedMessage id="wallet.total" />
    </span>
    <Money
      className={styles.money}
      currency="eur"
      value={totalEurValue}
      style={{}}
      currencyStyle={{ fontSize: "16px", fontWeight: 500 }}
    />
  </div>
);
