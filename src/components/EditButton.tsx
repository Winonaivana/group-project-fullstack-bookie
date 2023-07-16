import Image from 'next/image';

const EditButton = () => {
  return (
    <div className="flex px-3 py-1 mt-4 rounded-md bg-sky-600/20 border-2 border-sky-600 max-w-fit">
      <Image
        src="/assets/icon/edit-icon.svg"
        width={14}
        height={14}
        alt="done icon"
        className="mr-2"
      />
      <p className="text-sky-600 text-sm">Edit</p>
    </div>
  );
};

export default EditButton;
