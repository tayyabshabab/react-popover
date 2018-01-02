import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import ReactDOMServer from 'react-dom/server';
import sinon from 'sinon';
import Popover from './';

let wrapper;
const props = {
  trigger: 'click',
  placement: ['left', 'right', 'top', 'bottom'],
  title: 'Test',
  content: ['Test', <div>Test</div>],
  className: 'test',
  size: 'small',
};


describe('Popover', () => {
  beforeEach(() => {
    wrapper = mount(<Popover content={props.content[0]}><button>Test</button></Popover>);
  });

  describe('renders correctly with props', () => {

    it('should render button with class btn', () => {
      expect(wrapper.find('button')).to.have.length(1);
    });

    it('should render popover (IN DOM) on hovering child node as default', () => {
      wrapper.find('button').simulate('mouseEnter');
      expect(document.getElementsByClassName('lv--popover')).to.have.length(1);
    });

    it(`should have title ${props.title} if respective prop is set`, () => {
      wrapper.setProps({ title: props.title });
      wrapper.find('button').simulate('mouseEnter');
      expect(document.getElementsByClassName('popover-title')[0].innerHTML).to.equal(props.title);
    });

    it('should show content element', () => {
      wrapper = mount(<Popover content={props.content[1]}><button>Test</button></Popover>);
      wrapper.find('button').simulate('mouseEnter');
      expect(document.getElementsByClassName('popover-content')[2].firstChild.outerHTML).to.equal(ReactDOMServer.renderToStaticMarkup(props.content[1]));
    });

    it(`should have class ${props.className}`, () => {
      wrapper.setProps({ className: props.className });
      wrapper.find('button').simulate('mouseEnter');
      expect(document.getElementsByClassName(props.className)).to.have.length(1);
    });

    it('should have class "normal" on hover', () => {
      wrapper.find('button').simulate('mouseEnter');
      expect(document.getElementsByClassName('lv--popover normal').length).to.have.at.least(1);
    });

    it('should have class "small" on hover if respective prop is set', () => {
      wrapper.setProps({ size: props.size });
      wrapper.find('button').simulate('mouseEnter');
      expect(document.getElementsByClassName(`lv--popover ${props.size}`).length).to.have.at.least(1);
    });

    it(`should have respective class to placement prop`, () => {
      props.placement.forEach((placement) => {
        wrapper = mount(
          <Popover placement={placement} content={props.content[0]}>
            <button>Test</button>
          </Popover>);
        wrapper.find('button').simulate('mouseEnter');
        expect(document.getElementsByClassName(placement).length).to.have.at.least(1);
      });
    });
  });

  describe('behaves correctly', () => {
    it('should invoke onClose function on mouseleave', () => {
      const spy = sinon.spy();
      wrapper.setProps({ onClose: spy });
      wrapper.find('button').simulate('mouseEnter');
      expect(spy.calledOnce).to.equal(false);
      wrapper.find('button').simulate('mouseLeave');
      expect(spy.calledOnce).to.equal(true);
      spy.reset();
    });
  });
});