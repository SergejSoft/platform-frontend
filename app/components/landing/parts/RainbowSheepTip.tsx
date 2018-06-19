import * as cn from "classnames";
import * as React from "react";

import { ScrollSpy } from "./ScrollSpy";

import * as sheep from "../../../assets/img/landing/rainbowsheep.gif";
import * as styles from "./RainbowSheepTip.module.scss";

interface IProps {
  side: "left" | "right";
  triggerY: number;
  tip: string[];
}

interface IState {
  open: boolean;
  tipIndex: number;
}

interface IThoughtsProps {
  isHidden: boolean;
}

const TRIGGER_DELTA = 100;
const TIP_TIMEOUT = 5000;
const DEFAULT_MESSAGE = "Never stop bouncing :)";

const Thoughts: React.SFC<IThoughtsProps> = ({ children, isHidden }) => {
  const hiddenClass = isHidden && styles.isHidden;

  return (
    <div className={styles.thoughts}>
      <div className={cn(styles.thoughtsText, hiddenClass)}>{children}</div>
      <svg width="120" height="120" viewBox="0 0 120 120">
        <g fill="#FFF" stroke="#000" transform="translate(2 2)">
          <path
            d="M96.004942,41.2155479 C98.489606,37.6168933 99.828889,33.3393465 99.828889,28.8603501 C99.828889,16.9599574 90.293343,7.27848356 78.5724274,7.27848356 C74.7230325,7.27848356 70.9535846,8.34655547 67.6780069,10.3306402 C61.5295145,3.72830494 53.0677368,0 44.0087207,0 C26.0150007,0 11.376355,14.8633718 11.376355,33.1335523 C11.376355,36.1230561 11.7686586,39.0684284 12.5451586,41.9266812 C4.9256401,45.9174881 0,53.9478065 0,62.8369726 C0,75.811611 10.3955959,86.3670242 23.1738396,86.3670242 C26.2291687,86.3670242 29.2545459,85.7503276 32.0603501,84.5672396 C36.4137494,89.2707804 42.5476036,92.0099012 48.9640876,92.0099012 C53.0143637,92.0099012 56.9274911,90.9550916 60.4068775,88.9408237 C64.9208465,91.6031147 70.0219198,93 75.2923457,93 C91.673162,93 105,79.4688026 105,62.8369726 C105,54.5789087 101.759329,46.8742025 96.004942,41.2155479 Z"
            transform="matrix(-1 0 0 1 105 0)"
            className={cn(styles.cloud, hiddenClass)}
          />
          <circle cx="90" cy="104" r="4" className={cn(styles.bubbleLarge, hiddenClass)} />
          <circle cx="112" cy="112" r="3" className={cn(styles.bubbleSmall, hiddenClass)} />
        </g>
      </svg>
    </div>
  );
};

export class RainbowSheepTip extends React.Component<IProps> {
  state: IState = {
    open: false,
    tipIndex: -1,
  };

  timerTask: any;

  onClick = () => {
    this.setState({
      open: true,
      tipIndex: this.state.tipIndex + 1,
    });

    if (this.timerTask) {
      clearTimeout(this.timerTask);
    }

    this.timerTask = setTimeout(() => this.setState({ ...this.state, open: false }), TIP_TIMEOUT);
  };

  render(): React.ReactNode {
    const { side, triggerY, tip } = this.props;
    const { open, tipIndex } = this.state;

    return (
      <ScrollSpy condition={y => y > triggerY - TRIGGER_DELTA && y < triggerY + TRIGGER_DELTA}>
        {visible => (
          <div
            className={cn(styles.sheepWrapper, !visible && styles.isHidden, styles[side])}
            onClick={this.onClick}
          >
            <Thoughts isHidden={!open || !visible}>{tip[tipIndex] || DEFAULT_MESSAGE}</Thoughts>
            <img src={sheep} alt="sheep" className={styles.sheepImage} />
          </div>
        )}
      </ScrollSpy>
    );
  }
}
