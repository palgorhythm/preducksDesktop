import React, { useState } from 'react';
import {
  FormControl, InputLabel, MenuItem, Select, Input,
} from '@material-ui/core';

const TypeSelect = (props) => {
  const { selectName, outer, interfaces } = props;
  const [selector, setSelector] = useState('');
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelector(event.target.value);
  };
  const defaultItems = ['boolean', 'number', 'string'];
  const items = [...defaultItems, ...Object.keys(interfaces), 'any'];
  return (
    <FormControl>
      <InputLabel htmlFor={selectName + outer}>type</InputLabel>
      <Select
        name={selectName + outer}
        id={selectName + outer}
        value={selector || ''}
        onChange={handleSelectChange}
        input={<Input name={selectName + outer} id={selectName + outer} />}>
        {items
          && items.map((item) => {
            if (outer !== item) {
              return (
                <MenuItem value={item} key={outer + selectName + item}>
                  {item}
                </MenuItem>
              );
            }
          })}
      </Select>
    </FormControl>
  );
};

export default TypeSelect;
