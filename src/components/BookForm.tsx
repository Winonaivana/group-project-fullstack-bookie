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
import Link from 'next/link';

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
    <form
      onSubmit={props.handleSubmit(props.onSubmit)}
      className="flex flex-col items-start min-w-[522px] ph:min-w-[342px]"
    >
      {isEdit ? (
        <div className="flex flex-row items-center ">
          <img src="/assets/icon/edit-book-icon.svg" alt="edit book icon" />
          <h2 className="ml-3 text-3xl">Edit Book</h2>
        </div>
      ) : (
        <div className="flex flex-row items-center justify-between w-full">
          <div className="flex flex-row items-center">
            <img src="/assets/icon/add-book-icon.svg" alt="add book icon" />
            <h2 className="ml-3 text-3xl">Create New Book</h2>
          </div>
          <Link href="/" className="text-[12px] text-red-500">
            Cancel
          </Link>
        </div>
      )}

      {/* Title Input */}
      <label htmlFor="title-input" className="mt-10 ">
        Title
      </label>
      <input
        id="title-input"
        placeholder="Title"
        defaultValue={isEdit ? props.data.title : ''}
        {...props.register('title')}
        className="input-primary"
      />
      {props.errors?.title && <span>{props.errors.title.message}</span>}

      {/* Writer Input */}
      <label htmlFor="writer-input" className="mt-5 ">
        Writer
      </label>
      <input
        id="writer-input"
        placeholder="Writer"
        defaultValue={isEdit ? props.data.writer : ''}
        {...props.register('writer')}
        className="input-primary"
      />
      {props.errors?.writer && <span>{props.errors.writer.message}</span>}

      {/* Genres Input */}
      <label htmlFor="genres-input" className="mt-5">
        Genres
      </label>
      <input
        id="genres-input"
        placeholder="Genres"
        defaultValue={isEdit ? props.data.genres : ''}
        {...props.register('genres')}
        className="input-primary"
      />
      {props.errors?.genres && <span>{props.errors.genres.message}</span>}

      {/* Cover Image Url Input */}
      <label htmlFor="cover-img-url-input" className="mt-5">
        Cover Image Url
      </label>
      <input
        id="cover-img-url-input"
        placeholder="https://example.com/image.webp"
        defaultValue={isEdit ? props.data.coverImgUrl : ''}
        {...props.register('coverImgUrl')}
        className="input-primary"
      />
      {props.errors?.coverImgUrl && (
        <span>{props.errors.coverImgUrl.message}</span>
      )}

      {/* isDone Input */}
      <div className="flex flex-row mt-5">
        <input
          id="is-done-input"
          type="checkbox"
          defaultChecked={isEdit ? props.data.done : false}
          {...props.register('done')}
        />
        <label htmlFor="is-done-input" className="ml-3">
          Done Reading
        </label>
      </div>

      {/* Notes Input */}
      <label htmlFor="notes-input" className="mt-5">
        Notes
      </label>
      <textarea
        id="notes-input"
        defaultValue={isEdit ? props.data.notes : ''}
        {...props.register('notes')}
        className="h-40 input-primary"
      />
      {props.errors?.notes && <span>{props.errors.notes.message}</span>}

      <button className="font-semibold text-[#f1f1f1] rounded-lg bg-emerald-500 py-3 px-6 min-w-full mt-5 focus:ring-4 focus:ring-blue-600  hover:bg-emerald-700">
        {isEdit ? 'Save' : 'Create'}
      </button>
    </form>
  );
};

export default BookForm;
