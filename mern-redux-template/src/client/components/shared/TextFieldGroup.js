import React from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components';

const LabelText = styled.div`
  margin-top: 30px;
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 10px;
`

const InputField = styled.input`
  width: 100%;
  height: 2rem;
  margin-top: 0px;
  margin-bottom: 0px;
  font-size: 0.8em;
  padding: 10px 15px;
  border-radius: 8px;
  outline: none;
  border: 1px solid #ddd;
`

const ErrorText = styled.div`
  color: red;
  font-size: 15px;
  font-weight: 400;
  padding-left: 5px;
  margin-bottom: 5px;
  margin-top: 5px;
`

const TextFieldGroup = ({
  name,
  placeholder,
  value,
  label,
  error,
  type,
  onChange,
  disabled
}) => {
  return (
    <>
    <LabelText>{placeholder}</LabelText>
    <InputField
      type={type}
      value={value}
      onChange={onChange}
      name={name}
      placeholder={placeholder}
      disabled={disabled}
    />
    {!!error && <ErrorText>{error}</ErrorText>}
  </>
  )
}

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string
}

TextFieldGroup.defaultprops = {
  type: 'text'
}

export default TextFieldGroup
