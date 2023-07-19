import {
  SubmitHandler,
  UseFormHandleSubmit,
  useForm,
  FieldErrors,
  UseFormRegister,
} from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { IFormInput } from '@/pages/books/new';

interface IBookFormProps {
  handleSubmit: UseFormHandleSubmit<IFormInput, undefined>;
  onSubmit: SubmitHandler<IFormInput>;
  errors: FieldErrors<IFormInput>;
  register: UseFormRegister<IFormInput>;
  data: IFormInput;
  type: 'create' | 'edit';
}

const BookForm = (props: IBookFormProps) => {
  const isEdit = props.type === 'edit';

  return (
    <form onSubmit={props.handleSubmit(props.onSubmit)}>
      {/* Title Input */}
      <label htmlFor="title-input">Title</label>
      <input
        id="title-input"
        placeholder="Title"
        defaultValue={isEdit ? props.data.title : ''}
        {...props.register('title')}
      />
      {props.errors?.title && <span>{props.errors.title.message}</span>}

      {/* Writer Input */}
      <label htmlFor="writer-input">Writer</label>
      <input
        id="writer-input"
        placeholder="Writer"
        defaultValue={isEdit ? props.data.writer : ''}
        {...props.register('writer')}
      />
      {props.errors?.writer && <span>{props.errors.writer.message}</span>}

      {/* Genres Input */}
      <label htmlFor="genres-input">Genres</label>
      <input
        id="genres-input"
        placeholder="Genres"
        defaultValue={isEdit ? props.data.genres : ''}
        {...props.register('genres')}
      />
      {props.errors?.genres && <span>{props.errors.genres.message}</span>}

      {/* Cover Image Url Input */}
      <label htmlFor="cover-img-url-input">Cover Image Url</label>
      <input
        id="cover-img-url-input"
        placeholder="https://example.com/image.webp"
        defaultValue={isEdit ? props.data.coverImgUrl : ''}
        {...props.register('coverImgUrl')}
      />
      {props.errors?.coverImgUrl && (
        <span>{props.errors.coverImgUrl.message}</span>
      )}

      {/* isDone Input */}
      <input
        id="is-done-input"
        type="checkbox"
        defaultChecked={isEdit ? props.data.done : false}
        {...props.register('done')}
      />
      <label htmlFor="is-done-input">Done Reading</label>
      {props.errors?.done && <span>{props.errors.done.message}</span>}

      {/* Notes Input */}
      <label htmlFor="notes-input">Notes</label>
      <input
        id="notes-input"
        type="text-box"
        defaultValue={isEdit ? props.data.notes : ''}
        {...props.register('notes')}
      />
      {props.errors?.notes && <span>{props.errors.notes.message}</span>}

      <button>{isEdit ? 'Save' : 'Create'}</button>
    </form>
  );
};

export default BookForm;
