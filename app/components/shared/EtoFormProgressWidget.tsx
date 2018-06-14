import * as React from "react";
import { FormattedMessage } from "react-intl-phraseapp";
import { Link } from "react-router-dom";

import { Button } from "./Buttons";
import { ChartCircle, IChartCircleProps } from "./charts/ChartCircle";

import * as arrowRightIcon from "../../assets/img/inline_icons/arrow_right.svg";
import * as styles from "./EtoFormProgressWidget.module.scss";

interface IProps {
  to: string;
}

export const EtoFormProgressWidget: React.SFC<IProps & IChartCircleProps> = ({
  to,
  progress,
  name,
}) => {
  return (
    <div className={styles.etoFormProgressWidget}>
      <ChartCircle progress={progress} name={name} />
      <Link to={to} className={styles.linkWrapper}>
        <Button
          theme="silver"
          layout="secondary"
          iconPosition="icon-after"
          svgIcon={arrowRightIcon}
        >
          {progress < 1 ? (
            <FormattedMessage id="shared-component.eto-form-progress-widget.complete" />
          ) : (
            <FormattedMessage id="shared-component.eto-form-progress-widget.edit" />
          )}
        </Button>
      </Link>
    </div>
  );
};
