import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Portal from '../Portal';
import './popover.css';

class Popover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popover: { show: false, placement: props.placement, top: null, left: null },
      arrow: { left: null, top: null },
    };
    this.popoverRef = null;
  }

  componentDidMount() {
    this.calculatePosition();
  }

  closePopover = () => {
    this.props.closePortal();
  };

  calculatePosition = (placement = this.state.popover.placement) => {
    if (!this.popoverRef) {
      return;
    }

    const SCREEN_WIDTH = window.innerWidth;
    const SCREEN_HEIGHT = window.innerHeight;
    let top = 0; let left = 0; let arrowLeft = null; let arrowTop = null;
    const { width, height } = this.popoverRef.getBoundingClientRect();
    const { left: anchorLeft, top: anchorTop,
      width: anchorWidth, height: anchorHeight } = this.props.getAnchorBoundingRect();
    switch (placement) {
      case 'top':
        top = anchorTop - height;
        left = (anchorLeft - (width / 2)) + (anchorWidth / 2);
        break;
      case 'bottom':
        top = anchorTop + anchorHeight;
        left = (anchorLeft - (width / 2)) + (anchorWidth / 2);
        break;
      case 'left':
        top = (anchorTop - (height / 2)) + (anchorHeight / 2);
        left = anchorLeft - width;
        break;
      case 'right':
        top = (anchorTop - (height / 2)) + (anchorHeight / 2);
        left = anchorLeft + anchorWidth;
        break;
      default:
        break;
    }

    // Reverse placement if no space
    if (left < 0 && placement === 'left') { this.calculatePosition('right'); return; }
    if (left + width > SCREEN_WIDTH && placement === 'right') { this.calculatePosition('left'); return; }
    if (top < 0 && placement === 'top') { this.calculatePosition('bottom'); return; }
    if (top + height > SCREEN_HEIGHT && placement === 'bottom') { this.calculatePosition('top'); return; }

    // Adjust popover position if rendering out of screen
    if (top < 0) { top = 0; arrowTop = anchorTop + (anchorHeight / 2); }
    if (left < 0) { left = 0; arrowLeft = anchorLeft + (anchorWidth / 2); }
    if (left + width > SCREEN_WIDTH) {
      left -= (width - (SCREEN_WIDTH - left));
      arrowLeft = (anchorLeft - left) + (anchorWidth / 2);
    }
    if (top + height > SCREEN_HEIGHT) {
      top -= (height - (SCREEN_HEIGHT - top));
      arrowTop = (anchorTop - top) + (anchorHeight / 2);
    }

    const popover = { ...this.state.popover, placement, top, left, width, height };
    const arrow = { ...this.state.arrow, left: arrowLeft, top: arrowTop };
    this.setState({ popover, arrow });
  };

  renderTooltip = () => {
    const { content, tooltip } = this.props;
    return this.renderPopover({ content, tooltip, size: 'small' });
  }

  renderPopover = ({ title, content, size, tooltip }) => {
    const { popover: { placement, top, left }, arrow: { left: arrowLeft, top: arrowTop } } = this.state;
    const { className } = this.props;

    return (
      <div
        ref={(element) => { this.popoverRef = element; }}
        className={
          classNames('lv--popover', className, placement, size)
        }
        style={{ top, left }}
        id="popover"
      >
        <div className="arrow" style={{ left: arrowLeft, top: arrowTop }} />
        {title && !tooltip && <h3 className="popover-title">{title}</h3>}
        {tooltip && <div className="popover-content">{tooltip}</div>}
        {!tooltip && <div className="popover-content">{content}</div>}
      </div>
    );
  }

  render() {
    const { title, content, size, tooltip, renderedUsing } = this.props;

    return tooltip && renderedUsing === 'hover'
      ? this.renderTooltip()
      : this.renderPopover({ title, content, size });
  }
}

Popover.defaultProps = {
  placement: 'bottom',
  title: '',
  size: 'normal',
  onClose: () => {},
  closePortal: () => {},
  style: {},
  getAnchorBoundingRect: () => {},
  className: '',
  renderedUsing: 'hover',
  tooltip: '',
};

Popover.propTypes = {
  placement: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
  title: PropTypes.string,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  className: PropTypes.string,
  size: PropTypes.oneOf(['normal', 'small']),
  closePortal: PropTypes.func,
  getAnchorBoundingRect: PropTypes.func,
  renderedUsing: PropTypes.oneOf(['click', 'hover']),
  tooltip: PropTypes.string,
};

const PopoverAnchor = (props) => {
  let anchorRef = null;

  const getAnchorBoundingRect = () => anchorRef.getBoundingClientRect();

  const { title, content, size, placement, style, children, onClose, triggerOn, className,
    tooltip, setPopoverRef } = props;
  const conditionalProps = { // Use different props for HTML element and different for React Components
    ...typeof children.type === 'string'
      ? {
        ref: (element) => { anchorRef = element; },
      } : {
        setRef: (element) => { anchorRef = element; },
      },
  };

  const anchor = React.cloneElement(React.Children.only(children), {
    ...conditionalProps,
  });

  return (
    <Portal anchor={anchor} triggerOn={tooltip ? 'both' : triggerOn} onClose={onClose} closeOnOutsideClick closeOnEsc>
      <Popover
        placement={placement}
        title={title}
        content={content}
        className={className}
        size={size}
        style={style}
        getAnchorBoundingRect={getAnchorBoundingRect}
        tooltip={tooltip}
        ref={setPopoverRef}
      />
    </Portal>
  );
};

PopoverAnchor.defaultProps = {
  triggerOn: 'hover',
  placement: 'bottom',
  title: '',
  size: 'normal',
  tooltip: '',
  onClose: () => {},
  setPopoverRef: () => {},
  style: {},
  className: '',
};

PopoverAnchor.propTypes = {
  triggerOn: PropTypes.string,
  placement: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
  title: PropTypes.string,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  tooltip: PropTypes.string,
  size: PropTypes.oneOf(['normal', 'small']),
  onClose: PropTypes.func,
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  className: PropTypes.string,
  setPopoverRef: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default PopoverAnchor;
