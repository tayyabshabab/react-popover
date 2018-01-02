import React from 'react';
import ReactDOM, { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';

const KEYCODES = {
  ESCAPE: 27,
};

class Portal extends React.Component {
  constructor() {
    super();
    this.state = { active: false, renderMethod: '' };
    this.portal = null;
    this.node = null;
  }

  componentDidMount() {
    if (this.props.closeOnEsc) {
      document.addEventListener('keydown', this.handleKeydown);
    }

    if (this.props.closeOnOutsideClick) {
      document.addEventListener('mouseup', this.handleOutsideMouseClick);
      document.addEventListener('touchstart', this.handleOutsideMouseClick);
    }

    if (this.props.isOpened) {
      this.openPortal();
    }
  }

  componentWillReceiveProps(newProps) {
    // portal's 'is open' state is handled through the prop isOpened
    if (typeof newProps.isOpened !== 'undefined') {
      if (newProps.isOpened) {
        if (this.state.active) {
          this.renderPortal(newProps);
        } else {
          this.openPortal(newProps);
        }
      }
      if (!newProps.isOpened && this.state.active) {
        this.closePortal();
      }
    }

    // portal handles its own 'is open' state
    if (typeof newProps.isOpened === 'undefined' && this.state.active) {
      this.renderPortal(newProps);
    }
  }

  componentWillUnmount() {
    if (this.props.closeOnEsc) {
      document.removeEventListener('keydown', this.handleKeydown);
    }

    if (this.props.closeOnOutsideClick) {
      document.removeEventListener('mouseup', this.handleOutsideMouseClick);
      document.removeEventListener('touchstart', this.handleOutsideMouseClick);
    }

    this.closePortal(true);
  }

  handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.openPortal(this.props, 'click');
  }

  handleMouseOver = () => {
    this.openPortal(this.props, 'hover');
  }

  handleMouseLeave = () => {
    if (this.state.renderMethod === 'hover') {
      this.closePortal();
    }
  }

  openPortal = (props = this.props, renderMethod = '') => {
    if (this.state.active) { return; }
    this.setState({ active: true, renderMethod });
    this.renderPortal(props, renderMethod);
    this.props.onOpen(this.node);
  }

  closePortal = (isUnmounted = false) => {
    const resetPortalState = (overrideIsUnmounted) => {
      if (this.node) {
        ReactDOM.unmountComponentAtNode(this.node);
        document.body.removeChild(this.node);
      }
      this.portal = null;
      this.node = null;

      const finalIsUnmounted = overrideIsUnmounted === undefined
        ? isUnmounted
        : overrideIsUnmounted;

      if (finalIsUnmounted !== true) {
        this.setState({ active: false });
      }
    };

    if (this.state.active) {
      if (this.props.beforeClose) {
        this.props.beforeClose(this.node, resetPortalState);
      } else {
        resetPortalState();
      }

      this.props.onClose();
    }
  }

  handleOutsideMouseClick = (e) => {
    if (!this.state.active) { return; }

    const root = findDOMNode(this.portal);
    if (root.contains(e.target) || (e.button && e.button !== 0)) { return; }

    e.stopPropagation();
    this.closePortal();
  }

  handleKeydown = (e) => {
    if (e.keyCode === KEYCODES.ESCAPE && this.state.active) {
      this.closePortal();
    }
  }

  renderPortal = (props, renderMethod = '') => {
    if (!this.node) {
      this.node = document.createElement('div');
      document.body.appendChild(this.node);
    }

    let children = props.children;
    if (typeof props.children.type === 'function') {
      children = React.cloneElement(props.children, {
        closePortal: this.closePortal,
        renderedUsing: renderMethod,
      });
    }

    this.portal = ReactDOM.render(children, this.node);
  }

  render() {
    const { anchor, triggerOn } = this.props;
    const conditionalPropsForClick = { // Use different props for HTML element and different for React Components
      ...typeof anchor.type === 'string'
        ? {
          onClick: this.handleClick,
        } : {
          whenClicked: this.handleClick,
        },
    };

    if (anchor) {
      if (triggerOn === 'click') {
        return React.cloneElement(anchor, { ...conditionalPropsForClick });
      }
      if (triggerOn === 'hover') {
        return React.cloneElement(anchor, {
          onMouseEnter: this.handleMouseOver,
          onMouseLeave: this.handleMouseLeave,
        });
      }

      // Return both for rest
      return React.cloneElement(anchor, {
        ...conditionalPropsForClick,
        onMouseEnter: this.handleMouseOver,
        onMouseLeave: this.handleMouseLeave,
      });
    }
    return null;
  }
}

Portal.defaultProps = {
  onOpen: () => {},
  onClose: () => {},
  beforeClose: null,
  triggerOn: 'hover',
  closeOnEsc: false,
  closeOnOutsideClick: false,
  isOpened: false,
};

Portal.propTypes = {
  children: PropTypes.element.isRequired,
  anchor: PropTypes.element,
  triggerOn: PropTypes.string,
  closeOnEsc: PropTypes.bool,
  closeOnOutsideClick: PropTypes.bool,
  isOpened: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  beforeClose: PropTypes.func,
};

export default Portal;
