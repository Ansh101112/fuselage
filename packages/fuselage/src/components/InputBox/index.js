/* eslint-disable complexity */
import { useMergedRefs } from '@rocket.chat/fuselage-hooks';
import PropTypes from 'prop-types';
import React, { useCallback, useLayoutEffect, useRef } from 'react';

import { createStyledComponent } from '../../styles';
import { Option } from './Option';
import { Placeholder } from './Placeholder';
import { Skeleton } from './Skeleton';

const Wrapper = createStyledComponent('rcx-input-box__wrapper', 'span');
const Input = createStyledComponent('rcx-input-box', 'input');
const Addon = createStyledComponent('rcx-input-box__addon', 'span');

export const InputBox = React.forwardRef(function InputBox({
  className,
  addon,
  error,
  floatingAddon,
  hidden,
  invisible,
  multiple,
  placeholderVisible,
  type,
  onChange,
  ...props
}, ref) {
  const innerRef = useRef();
  const mergedRef = useMergedRefs(ref, innerRef);

  useLayoutEffect(() => {
    if (innerRef.current && innerRef.current.setCustomValidity) {
      innerRef.current.setCustomValidity(error || '');
    }
  }, [error]);

  useLayoutEffect(() => {
    if (addon) {
      innerRef.current.parentElement.classList.toggle('invalid', !innerRef.current.checkValidity());
    }
  }, []);

  const handleChange = useCallback((event, ...args) => {
    if (addon) {
      innerRef.current.parentElement.classList.toggle('invalid', !innerRef.current.checkValidity());
    }

    return onChange && onChange.call(event.currentTarget, event, ...args);
  }, [addon, onChange]);

  if (!addon) {
    return <Input
      as={
        (type === 'textarea' && 'textarea')
      || (type === 'select' && 'select')
      || 'input'}
      className={className}
      cols={
        (type === 'textarea' && 1)
      || (type === 'select' && 0)
      || 0}
      hidden={hidden}
      invisible={invisible}
      multiple={multiple}
      ref={mergedRef}
      size={
        (type === 'textarea' && undefined)
      || (type === 'select' && 1)
      || 1}
      type={type === 'textarea' || type === 'select' ? undefined : type}
      onChange={handleChange}
      mod-multiple={multiple}
      mod-placeholder-visible={placeholderVisible}
      mod-type={type}
      {...props}
    />;
  }

  return <Wrapper
    className={[props.disabled && 'disabled', className].filter(Boolean).join(' ')}
    hidden={hidden}
    invisible={invisible}
  >
    <Input
      as={
        (type === 'textarea' && 'textarea')
      || (type === 'select' && 'select')
      || 'input'}
      className={className}
      cols={
        (type === 'textarea' && 1)
      || (type === 'select' && 0)
      || 0}
      multiple={multiple}
      ref={mergedRef}
      size={
        (type === 'textarea' && undefined)
      || (type === 'select' && 1)
      || 1}
      type={type === 'textarea' || type === 'select' ? undefined : type}
      onChange={handleChange}
      mod-multiple={multiple}
      mod-placeholder-visible={placeholderVisible}
      mod-type={type}
      mod-undecorated
      mod-under-addon={floatingAddon}
      {...props}
    />
    <Addon children={addon} mod-over-input={floatingAddon} />
  </Wrapper>;
});

InputBox.defaultProps = {
  type: 'text',
};

InputBox.displayName = 'InputBox';

InputBox.propTypes = {
  addon: PropTypes.element,
  input: PropTypes.element,
  error: PropTypes.string,
  floatingAddon: PropTypes.bool,
  invisible: PropTypes.bool,
  type: PropTypes.oneOf([
    'button',
    'checkbox',
    'color',
    'date',
    'datetime',
    'datetime-local',
    'email',
    'file',
    'hidden',
    'image',
    'month',
    'number',
    'password',
    'radio',
    'range',
    'reset',
    'search',
    'submit',
    'tel',
    'text',
    'time',
    'url',
    'week',
    'textarea',
    'select',
  ]).isRequired,
};

InputBox.Placeholder = Placeholder;

InputBox.Option = Option;

InputBox.Skeleton = Skeleton;