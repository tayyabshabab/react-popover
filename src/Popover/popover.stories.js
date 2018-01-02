/* eslint-disable */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

import Popover from './index';
import Button from '../Button';

const stories = storiesOf('Popover', module);

stories.addDecorator(withKnobs);

stories.add('Standard', () => (
  <div style={{margin: '150px 0 0 285px'}}>
    <Popover
      placement="left"
      title={text('title', 'Lorem Ipsum!')}
      content={text('content', 'Vivamus sagittis lacus vel augue laoreet rutrum faucibus.')}
    >
      <Button>Lorem Ipsum!</Button>
    </Popover>
    &nbsp;

    <Popover
      placement="top"
      title={text('title', 'Lorem Ipsum!')}
      content={text('content', 'Vivamus sagittis lacus vel augue laoreet rutrum faucibus.')}
      style={{marginLeft: '20px'}}
    >
      <Button>Lorem Ipsum!</Button>
    </Popover>
    &nbsp;

    <Popover
      placement="bottom"
      title={text('title', 'Lorem Ipsum!')}
      content={text('content', 'Vivamus sagittis lacus vel augue laoreet rutrum faucibus.')}
      style={{marginLeft: '20px'}}
    >
      <Button>Lorem Ipsum!</Button>
    </Popover>
    &nbsp;

    <Popover
      placement="right"
      title={text('title', 'Lorem Ipsum!')}
      content={text('content', 'Vivamus sagittis lacus vel augue laoreet rutrum faucibus.')}
      style={{marginLeft: '20px'}}
    >
      <Button>Lorem Ipsum!</Button>
    </Popover>
  </div>
));

stories.add('Opens on click', () => (
  <div style={{margin: '150px 0 0 285px'}}>
    <Popover
      triggerOn="click"
      placement="left"
      title={text('title', 'Lorem Ipsum!')}
      content={text('content', 'Vivamus sagittis lacus vel augue laoreet rutrum faucibus.')}
    >
      <Button>Lorem Ipsum!</Button>
    </Popover>
    &nbsp;

    <Popover
      triggerOn="click"
      placement="top"
      title={text('title', 'Lorem Ipsum!')}
      content={text('content', 'Vivamus sagittis lacus vel augue laoreet rutrum faucibus.')}
      style={{marginLeft: '20px'}}
    >
      <Button>Lorem Ipsum!</Button>
    </Popover>
    &nbsp;

    <Popover
      triggerOn="click"
      placement="bottom"
      title={text('title', 'Lorem Ipsum!')}
      content={text('content', 'Vivamus sagittis lacus vel augue laoreet rutrum faucibus.')}
      style={{marginLeft: '20px'}}
    >
      <Button>Lorem Ipsum!</Button>
    </Popover>
    &nbsp;

    <Popover
      triggerOn="click"
      placement="right"
      title={text('title', 'Lorem Ipsum!')}
      content={text('content', 'Vivamus sagittis lacus vel augue laoreet rutrum faucibus.')}
      style={{marginLeft: '20px'}}
    >
      <Button>Lorem Ipsum!</Button>
    </Popover>
  </div>
));

stories.add('Small Size', () => (
  <div style={{margin: '150px 0 0 285px'}}>
    <Popover
      placement="left"
      title={text('title', 'Lorem Ipsum!')}
      content={text('content', 'Vivamus sagittis lacus vel augue laoreet rutrum.')}
      size="small"
    >
      <Button>Lorem Ipsum!</Button>
    </Popover>
    &nbsp;

    <Popover
      placement="top"
      title={text('title', 'Lorem Ipsum!')}
      content={text('content', 'Vivamus sagittis lacus vel augue laoreet rutrum.')}
      style={{marginLeft: '20px'}}
      size="small"
    >
      <Button>Lorem Ipsum!</Button>
    </Popover>
    &nbsp;

    <Popover
      placement="bottom"
      title={text('title', 'Lorem Ipsum!')}
      content={text('content', 'Vivamus sagittis lacus vel augue laoreet rutrum.')}
      style={{marginLeft: '20px'}}
      size="small"
    >
      <Button>Lorem Ipsum!</Button>
    </Popover>
    &nbsp;

    <Popover
      placement="right"
      title={text('title', 'Lorem Ipsum!')}
      content={text('content', 'Vivamus sagittis lacus vel augue laoreet rutrum.')}
      style={{marginLeft: '20px'}}
      size="small"
    >
      <Button>Lorem Ipsum!</Button>
    </Popover>
  </div>
));

stories.add('Without Title', () => (
  <div style={{margin: '10px 0 0 10px'}}>
    <Popover
      placement="bottom"
      content={text('content', 'Vivamus sagittis lacus vel augue laoreet rutrum faucibus.')}
    >
      <Button>Lorem Ipsum!</Button>
    </Popover>
  </div>
));
