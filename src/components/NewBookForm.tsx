import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface INewBookFormProps {}

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

const NewBookForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: 'onTouched' });

  return (
    <form>
      {/* Title Input */}
      <label htmlFor="title-input">Title</label>
      <input id="title-input" placeholder="Title" />
      {errors?.title && <span>{errors.title.message}</span>}

      {/* Writer Input */}
      <label htmlFor="writer-input">Writer</label>
      <input id="writer-input" placeholder="Writer" />
      {errors?.writer && <span>{errors.writer.message}</span>}

      {/* Genres Input */}
      <label htmlFor="genres-input">Genres</label>
      <input id="genres-input" placeholder="Genres" />
      {errors?.genres && <span>{errors.genres.message}</span>}

      {/* Cover Image Url Input */}
      <label htmlFor="cover-img-url-input">Cover Image Url</label>
      <input
        id="cover-img-url-input"
        placeholder="https://example.com/image.webp"
      />
      {errors?.coverImgUrl && <span>{errors.coverImgUrl.message}</span>}

      {/* isDone Input */}
      <input id="is-done-input" type="checkbox" />
      <label htmlFor="is-done-input">Done Reading</label>
      {errors?.done && <span>{errors.done.message}</span>}

      {/* Notes Input */}
      <label htmlFor="notes-input">Notes</label>
      <input id="notes-input" type="text-box" />
      {errors?.notes && <span>{errors.notes.message}</span>}

      <button>Create</button>
    </form>
  );
};
