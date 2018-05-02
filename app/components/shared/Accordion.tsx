import * as React from "react";
import * as styles from "./Accordion.module.scss";
import { InlineIcon } from "./InlineIcon";

import * as indicatorIcon from "../../assets/img/inline_icons/accordion_arrow.svg";

interface IAccordionElementProps {
  title: string | React.ReactNode;
  children: any;
  isOpened?: boolean;
}

interface IAccordionElementState {
  isOpened: boolean;
}

export class AccordionElement extends React.Component<
  IAccordionElementProps,
  IAccordionElementState
> {
  state = {
    isOpened: this.props.isOpened || false,
  };

  toggleClose = () => {
    this.setState({ isOpened: !this.state.isOpened });
  };

  render(): React.ReactChild {
    const { title, children } = this.props;
    const { isOpened } = this.state;

    return (
      <div className={`${styles.accordionElement} ${isOpened ? "" : "is-closed"}`}>
        <h4 className={styles.title} onClick={this.toggleClose}>
          <span>{title}</span>
          <InlineIcon width="22px" height="22px" svgIcon={indicatorIcon} />
        </h4>
        <div className={styles.content}>{children}</div>
      </div>
    );
  }
}

export const Accordion: React.SFC = ({ children }) => (
  <div className={styles.accordion}>{children}</div>
);
