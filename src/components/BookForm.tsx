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
  isSubmitting: boolean;
  data: IFormInput;
  type: 'create' | 'edit';
}

const schema = yup.object({
  title: yup.string().required('Please fill in the book title'),
  writer: yup.string().required('Please fill in the writter'),
  genres: yup.string().required('Please specified the genre'),
  coverImgUrl: yup.string().required('Please find an image for the cover'),
  done: yup.boolean(),
  notes: yup
    .string()
    .required('Please tell us about your first impression about this book'),
});

const BookForm = (props: IBookFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: 'onTouched' });

  const isEdit = props.type === 'edit';
  console.log(props.data);

  return (
    <form>
      {/* Title Input */}
      <label htmlFor="title-input">Title</label>
      <input
        id="title-input"
        placeholder="Title"
        defaultValue={isEdit ? props.data.title : ''}
      />
      {errors?.title && <span>{errors.title.message}</span>}

      {/* Writer Input */}
      <label htmlFor="writer-input">Writer</label>
      <input
        id="writer-input"
        placeholder="Writer"
        defaultValue={isEdit ? props.data.writer : ''}
      />
      {errors?.writer && <span>{errors.writer.message}</span>}

      {/* Genres Input */}
      <label htmlFor="genres-input">Genres</label>
      <input
        id="genres-input"
        placeholder="Genres"
        defaultValue={isEdit ? props.data.genres : ''}
      />
      {errors?.genres && <span>{errors.genres.message}</span>}

      {/* Cover Image Url Input */}
      <label htmlFor="cover-img-url-input">Cover Image Url</label>
      <input
        id="cover-img-url-input"
        placeholder="https://example.com/image.webp"
        defaultValue={isEdit ? props.data.coverImgUrl : ''}
      />
      {errors?.coverImgUrl && <span>{errors.coverImgUrl.message}</span>}

      {/* isDone Input */}
      <input
        id="is-done-input"
        type="checkbox"
        defaultChecked={isEdit ? props.data.done : false}
      />
      <label htmlFor="is-done-input">Done Reading</label>
      {errors?.done && <span>{errors.done.message}</span>}

      {/* Notes Input */}
      <label htmlFor="notes-input">Notes</label>
      <input
        id="notes-input"
        type="text-box"
        defaultValue={isEdit ? props.data.notes : ''}
      />
      {errors?.notes && <span>{errors.notes.message}</span>}

      <button>{isEdit ? 'Create' : 'Save'}</button>
    </form>
  );
};

export default BookForm;
