import Image from 'next/image';

const EditButton = () => {
  return (
    <button className="flex px-3 py-1 mt-4 rounded-md bg-sky-600/20 border-2 border-sky-600 max-w-fit">
      <div className="flex gap-2">
        <Image
          src="/assets/icon/edit-icon.svg"
          width={14}
          height={14}
          alt="done icon"
        />
        <p className="text-sky-600 text-sm">Edit</p>
      </div>
    </button>
  );
};

export default EditButton;
