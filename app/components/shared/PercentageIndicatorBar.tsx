import * as React from "react";
import * as styles from "./PercentageIndicatorBar.module.scss";

interface IProps {
  percent: number;
}

export const PercentageIndicatorBar: React.SFC<IProps> = ({ percent }) => {
  return (
    <div className={styles.percentageIndicatorBar}>
      <span className={styles.label}>{percent}%</span>
      <svg width="100%" height="6">
        <rect className={styles.background} width="100%" height="100%" rx="3" ry="3" />
        <rect className={styles.progres} width={`${percent}%`} height="100%" rx="3" ry="3" />
      </svg>
    </div>
  );
};
