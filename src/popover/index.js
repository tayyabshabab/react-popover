import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withContentRect } from 'react-measure';
import './index.css';

class Popover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sourceEl: {top: 0, left: 0, width: 0, height: 0},
      popover: {show: false, top: 0, left: 0, width: 0, height: 0},
    };
  }

  componentWillReceiveProps(nextProps) {
    try {
      const { width, height } = nextProps.contentRect.offset;
      const {top, left} = this.calculatePosition(width, height);
      const popover = {...this.state.popover, top, left};
      this.setState({ popover });
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  calculatePosition = (width, height) => {
    const {left: sourceLeft, top: sourceTop, width: sourceWidth, height: sourceHeight} = this.el.getBoundingClientRect();
    let top = 0, left = 0;
    switch (this.props.placement) {
      case 'top':
        return {
          top: sourceTop - height,
          left: sourceLeft - (width / 2) + (sourceWidth/2),
        };
      case 'bottom':
        return {
          top: sourceTop + sourceHeight,
          left: sourceLeft - (width / 2) + (sourceWidth/2),
        };
      case 'left':
        return {
          top: sourceTop - (height / 2) + (sourceHeight / 2),
          left: sourceLeft - width,
        };
      case 'right':
        return {
          top: sourceTop - (height / 2) + (sourceHeight / 2),
          left: sourceLeft + sourceWidth,
        };
      default:
        return {top, left};
    }
  };

  handleBackgroundClick = e => {
    if (e.target === e.currentTarget) {
      this.setState({ popover: {...this.state.popover, show: false} });
    };
  };

  handleMouseEnter = e => {
    this.props.trigger === 'hover' && this.setState({ popover: {...this.state.popover, show: true} });
  };

  handleMouseLeave = e => {
    this.props.trigger === 'hover' && this.setState({ popover: {...this.state.popover, show: false} });
  };

  handleClick = e => {
    e.preventDefault();
    this.props.trigger === 'click' && this.setState({ popover: {...this.state.popover, show: true} });
  };

  renderPopoverWithBackdrop = () => {
    return (
      <div className="backdrop" onClick={this.handleBackgroundClick}>
        {this.renderPopover()}
      </div>
    );
  }

  renderPopover = () => {
    const {popover: {top, left}} = this.state;
    const {placement} = this.props;

    return (
      <div ref={this.props.measureRef} className={classNames('popover', 'fade', 'in', placement)} role="tooltip" id="popover309809" style={{ top, left }}>
        <div className="arrow"></div>
        <h3 className="popover-title">abc</h3>
        <div className="popover-content">Vivamus sagittis lacus vel augue laoreet rutrum faucibus.</div>
      </div>
    );
  };

  render() {
    const {popover: {show}} = this.state;
    const { trigger } = this.props;

    return (
      <div>
        {React.cloneElement(this.props.children, {
          ref: (element) => this.el = element,
          onMouseEnter: this.handleMouseEnter,
          onMouseLeave: this.handleMouseLeave,
          onClick: this.handleClick,
        })}

        {show && trigger === 'hover' && this.renderPopover()}
        {show && trigger === 'click' && this.renderPopoverWithBackdrop()}
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
  // content: PropTypes.string.isRequired,
};

export default withContentRect('offset')(Popover);
