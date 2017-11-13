/* eslint no-restricted-globals: ["off", "screen"] */
import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './index.css';

const screenWidth = screen.width;
const screenHeight = screen.height;

class Popover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: {top: null, left: null, width: null, height: null},
      popover: {show: false, placement: props.placement, top: null, left: null, width: null, height: null},
      arrow: {left: null, top: null},
    };
    this.anchorRef = null;
    this.popoverRef = null;
  }

  // componentDidMount () {
  //   try {
  //     const { width, height } = this.popoverRef.getBoundingClientRect();
  //     if (width && height) {
  //       const {top, left} = this.calculatePosition(width, height);
  //       const popover = {...this.state.popover, top, left, width, height};
  //       console.log(popover);
  //       this.setState({ popover });
  //     }
  //   } catch (error) {
  //     console.log(`Error: ${error}`);
  //   }
  // }

  // componentWillReceiveProps(nextProps) {
  //   debugger;
  //   // console.log(nextProps.measure());
  //   try {
  //     const { width, height } = this.popoverRef.getBoundingClientRect();
  //     debugger;
  //     if (width && height) {
  //       const {top, left} = this.calculatePosition(width, height);
  //       const popover = {...this.state.popover, top, left, width, height};
  //       // console.log(popover);
  //       this.setState({ popover });
  //     }
  //   } catch (error) {
  //     console.log(`Error: ${error}`);
  //   }
  // }

  calculatePosition = (placement = this.state.popover.placement) => {
    const { width, height } = this.popoverRef.getBoundingClientRect();
    const {left: anchorLeft, top: anchorTop, width: anchorWidth, height: anchorHeight} = this.anchorRef.getBoundingClientRect();
    let top = 0, left = 0, arrowLeft = null, arrowTop = null;
    console.log(placement)
    switch (placement) {
      case 'top':
        top = anchorTop - height;
        left = anchorLeft - (width / 2) + (anchorWidth/2);
        break;
      case 'bottom':
        top = anchorTop + anchorHeight;
        left = anchorLeft - (width / 2) + (anchorWidth/2);
        break;
      case 'left':
        top = anchorTop - (height / 2) + (anchorHeight / 2);
        left = anchorLeft - width;
        break;
      case 'right':
        top = anchorTop - (height / 2) + (anchorHeight / 2);
        left = anchorLeft + anchorWidth;
        break;
      default:
        break;
    }
    console.log(left, top);
    console.log(left + width, screenWidth);

    // Reverse placement if no space
    if (left < 0 && placement === 'left')                       { this.calculatePosition('right'); return; }
    if (left + width > screenWidth && placement === 'right')    { this.calculatePosition('left'); return; }
    if (top < 0 && placement === 'top')                         { this.calculatePosition('bottom'); return; }
    if (top + height > screenHeight && placement === 'bottom')  { this.calculatePosition('top'); return; }

    // Don't let the popover exit the screen
    if (top < 0)    {top = 0; arrowTop = anchorTop + anchorHeight / 2; }
    if (left < 0)   {left = 0; arrowLeft = anchorLeft + anchorWidth / 2; }


    const popover = {...this.state.popover, placement, top, left, width, height};
    console.log(popover);
    const arrow = {...this.state.arrow, left: arrowLeft, top: arrowTop};
    this.setState({ popover, arrow });
  };

  handleBackgroundClick = e => {
    if (e.target === e.currentTarget) {
      this.setState({ popover: {...this.state.popover, show: false} });
    };
  };

  handleMouseEnter = e => {
    this.props.trigger === 'hover' && this.setState({ popover: {...this.state.popover, show: true} }, this.calculatePosition);
  };

  handleMouseLeave = e => {
    this.props.trigger === 'hover' && this.setState({ popover: {...this.state.popover, show: false} });
  };

  handleClick = e => {
    e.preventDefault();
    this.props.trigger === 'click' && this.setState({ popover: {...this.state.popover, show: true} }, this.calculatePosition);
  };

  shouldDisplayPopover = (triggerMethod) => {
    const {popover: {show, left, top}} = this.state;
    const { trigger } = this.props;
    return show && triggerMethod === trigger;
  };

  renderPopoverWithBackdrop = () => {
    return (
      <div className="backdrop" onClick={this.handleBackgroundClick}>
        {this.renderPopover()}
      </div>
    );
  };

  renderPopover = () => {
    const {popover: {show, placement, top, left}, arrow: {left: arrowLeft, top: arrowTop}} = this.state;
    // console.log(this.state.popover);

    return (
      <div
        ref={(element) => this.popoverRef = element}
        className={classNames('popover', 'fade', 'in', placement, {hidden: !show})}
        role="tooltip"
        style={show ? {top, left} : {}}
      >
        <div className="arrow" style={{left: arrowLeft, top: arrowTop}}></div>
        <h3 className="popover-title">abc</h3>
        <div className="popover-content">Vivamus sagittis lacus vel augue laoreet rutrum faucibus.</div>
      </div>
    );
  };

  render() {
    return (
      <div>
        {React.cloneElement(this.props.children, {
          ref: (element) => this.anchorRef = element,
          onMouseEnter: this.handleMouseEnter,
          onMouseLeave: this.handleMouseLeave,
          onClick: this.handleClick,
        })}

        {this.shouldDisplayPopover('hover') && this.renderPopover()}
        {this.shouldDisplayPopover('click') && this.renderPopoverWithBackdrop()}
      </div>
    );
  }
}

Popover.defaultProps = {
  trigger: 'hover',
  placement: 'bottom',
}

Popover.propTypes = {
  children: PropTypes.node,
  trigger: PropTypes.string,
  placement: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string.isRequired,
};

export default Popover;
