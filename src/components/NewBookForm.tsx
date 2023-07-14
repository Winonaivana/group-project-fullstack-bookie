import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface INewBookFormProps {}

const schema = yup.object({
  title: yup.string().required('Please fill in the book title'),
  writer: yup.string(),
  genres: yup.string(),
  coverImgUrl: yup.string(),
  done: yup.boolean(),
  notes: yup.string(),
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

      {/* Writer Input */}
      <label htmlFor="writer-input">Writer</label>
      <input id="writer-input" placeholder="Writer" />

      {/* Genres Input */}
      <label htmlFor="genres-input">Genres</label>
      <input id="genres-input" placeholder="Genres" />

      {/* Cover Image Url Input */}
      <label htmlFor="cover-img-url-input">Cover Image Url</label>
      <input
        id="cover-img-url-input"
        placeholder="https://example.com/image.webp"
      />

      {/* isDone Input */}
      <input id="is-done-input" type="checkbox" />
      <label htmlFor="is-done-input">Done Reading</label>

      {/* Notes Input */}
      <label htmlFor="notes-input">Notes</label>
      <input id="notes-input" type="text-box" />

      <button>Create</button>
    </form>
  );
};
