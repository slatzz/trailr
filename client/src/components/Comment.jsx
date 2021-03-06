import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Input from './input.jsx';
import { deleteComment, useForm, updateComment } from '../helpers';

/**
 * A single comment with a username
 * @param {Object} info comment to be displayed
 * @param {Object} user loggedIn, name, id
 */
const commentComponent = ({ info, user, removeComment }) => {
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState(info.text);

  const submitComment = ({ comment }) => {
    setEdit(false);
    updateComment(info.id, comment)
      .then((response) => {
        setText(comment);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const { submitHandler, changeHandler, values } = useForm(submitComment);
  const deleteHandler = () => {
    deleteComment(info.id)
      .then((response) => {
        removeComment();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const editToggle = () => {
    values.comment = info.text;
    setEdit((prev) => !prev);
  };

  const { name } = info;
  return (
    <>
      {!edit
        ? (
          <blockquote className="blockquote">
            <p className="mb-0">{text}</p>
            <footer className="blockquote-footer">{name}</footer>
          </blockquote>
        )
        : (
          <>
            <Input value={values.comment} changeHandler={changeHandler} name="comment" label="" type="textarea" />
            <Button variant="success" onClick={submitHandler}>Submit</Button>
          </>
        )}
      {user.loggedIn && user.id === info.id_user
        ? (
          <>
            <Button variant="danger" onClick={deleteHandler}>Delete Comment</Button>
            <Button variant="info" onClick={editToggle}>{edit ? 'Cancel' : 'Update Comment'}</Button>
          </>
        )
        : null}
    </>
  );
};

export default commentComponent;

commentComponent.propTypes = {
  info: PropTypes.shape({
    text: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    id_user: PropTypes.number.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    loggedIn: PropTypes.bool.isRequired,
    name: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  removeComment: PropTypes.func.isRequired,
};
