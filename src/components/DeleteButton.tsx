import Image from 'next/image';

const DeleteButton = () => {
  return (
    <div className="flex px-3 py-1 mt-4 rounded-md bg-red-600/20 border-2 border-red-700 max-w-fit">
      <Image
        src="/assets/icon/delete-icon.svg"
        width={14}
        height={14}
        alt="done icon"
        className="mr-2"
      />
      <p className="text-red-700 text-sm">Delete</p>
    </div>
  );
};

export default DeleteButton;
