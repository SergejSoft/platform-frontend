import * as React from "react";

import { Money, selectCurrencySymbol, TCurrency } from "./Money";
import * as styles from "./MoneySuiteWidget.module.scss";

interface IMoneySuiteWidgetProps {
  icon: string;
  currency: TCurrency;
  currencyTotal: TCurrency;
  largeNumber: string;
  value: string;
  percentage?: string;
}

export const MoneySuiteWidget: React.SFC<
  IMoneySuiteWidgetProps & React.HTMLAttributes<HTMLDivElement>
> = ({ icon, currency, currencyTotal, largeNumber, value, percentage }) => (
  <>
    <div className={styles.moneySuiteWidget}>
      <img className={styles.icon} src={icon} />
      <div>
        <div className={styles.money}>
          <span className={styles.currency}>{selectCurrencySymbol(currency)}</span>
          <Money value={largeNumber} currency={currency} noCurrencySymbol />
        </div>
        <div className={styles.totalMoney}>
          = <Money value={value} currency={currencyTotal} />
          {percentage && (
            <span className={`${parseInt(percentage, 10) > 0 ? styles.green : styles.red}`}>
              {" "}
              ({percentage}%)
            </span>
          )}
        </div>
      </div>
    </div>
  </>
);
