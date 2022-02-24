import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { saveChangesToStorage, setFontFamily } from '../features/editorSlice';
import { fontstyles } from '../scripts/fontStyles';

const FontList = () => {
  const dispatch = useDispatch();
  const { fontFamily } = useSelector((state) => state.editor);

  const handleFontChange = (font) => {
    dispatch(setFontFamily(font));
  };

  return (
    <FontListWrap>
      <label>Change font</label>
      <select
        value={fontFamily}
        style={{ fontFamily: fontFamily }}
        onChange={(e) => handleFontChange(e.target.value)}
      >
        {fontstyles.map((font, i) => (
          <option key={i} value={font.name} style={font.webStyles}>
            {font.name}
          </option>
        ))}
      </select>
    </FontListWrap>
  );
};

const FontListWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  label {
    font-size: 14px;
    margin-bottom: 5px;
  }
  select {
    width: 250px;
    margin-bottom: 10px;
    height: 30px;
    border-radius: 5px;
    padding: 0 10px;
    border: 1px solid #999;
    outline: none;
    font-size: 16px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: #e5e5e5
      url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0iIzZlNzY4MSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNC40MjcgOS40MjdsMy4zOTYgMy4zOTZhLjI1MS4yNTEgMCAwMC4zNTQgMGwzLjM5Ni0zLjM5NkEuMjUuMjUgMCAwMDExLjM5NiA5SDQuNjA0YS4yNS4yNSAwIDAwLS4xNzcuNDI3ek00LjQyMyA2LjQ3TDcuODIgMy4wNzJhLjI1LjI1IDAgMDEuMzU0IDBMMTEuNTcgNi40N2EuMjUuMjUgMCAwMS0uMTc3LjQyN0g0LjZhLjI1LjI1IDAgMDEtLjE3Ny0uNDI3eiIgLz48L3N2Zz4=')
      96% / 20px no-repeat ${(props) => props.theme.inputBg};
  }
`;

export default FontList;
