import React from 'react';
import { useForm } from 'react-hook-form';

import { Button } from 'rebass';
import { Label, Input, Textarea, Select } from '@rebass/forms';

import { useDispatch } from 'react-redux';

export default function LogEntryForm({ location, onClose }) {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    dispatch({
      type: 'CREATE_LOCATION_LOG',
      payload: {
        ...data,
        latitude: location.latitude,
        longitude: location.longitude,
      },
    });
    onClose();
  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form className="form-logentry" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-item-wrap">
        <Label>Title</Label>
        <Input defaultValue="" {...register('title')} />
        {errors.title && (
          <span className="form-error">This field is required</span>
        )}
      </div>
      <div className="form-item-wrap">
        <Label>Description</Label>
        <Textarea defaultValue="" {...register('description')} />
        {errors.description && (
          <span className="form-error">This field is required</span>
        )}
      </div>
      <div className="form-item-wrap">
        <Label>Entry Status</Label>
        <Select
          defaultValue="PUBLISHED"
          options={['PUBLISHED', 'DRAFT', 'SCHEDULED', 'DELETED', 'PRIVATE']}
          {...register('status')}
        >
          <option>PUBLISHED</option>
          <option>DRAFT</option>
          <option>PRIVATE</option>
        </Select>
        {errors.status && (
          <span className="form-error">This field is required</span>
        )}
      </div>

      <Button className="btn btn-primary btn-full" type="submit">
        Add Entry
      </Button>
    </form>
  );
}
