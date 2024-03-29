import React, { ChangeEvent, KeyboardEvent, ReactElement, useState } from 'react';

import { Button, TextField } from '@mui/material';

import { RequestStatus } from '../../store/slices/appSlice';

const FullInput = React.memo((props: FullInputPropsType): ReactElement => {
  const [title, setTitle] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
    if (error) {
      setError(false);
    }
  };

  const onKeyPressOnClickAddTask = (e: KeyboardEvent<HTMLInputElement>) =>
    e.key === 'Enter' && onClickAddTask();

  const onClickAddTask = () => {
    if (title.trim()) {
      props.callback(title.trim());
      setTitle('');
    } else {
      setError(true);
    }
  };

  return (
    <div>
      <TextField
        id="outlined-basic"
        label={error ? 'Title is required' : 'Title'}
        variant="outlined"
        size="small"
        value={title}
        error={error}
        disabled={props.disabled === 'loading'}
        onChange={onChangeSetTitle}
      />
      <Button
        variant="contained"
        size="small"
        style={{
          maxWidth: '39px',
          maxHeight: '39px',
          minWidth: '39px',
          minHeight: '39px',
          backgroundColor: '#7F77E0',
          color: 'black',
          marginLeft: '10px',
        }}
        disabled={props.disabled === 'loading'}
        onClick={onClickAddTask}
      >
        +
      </Button>
    </div>
  );
});

export default FullInput;

type FullInputPropsType = {
  callback: (title: string) => void;
  disabled?: RequestStatus;
};
