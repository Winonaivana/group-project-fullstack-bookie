import Image from 'next/image';

type Props = { onDelete: () => void };

const DeleteButton = ({ onDelete }: Props) => {
  return (
    <button
      onClick={onDelete}
      className="flex px-3 py-1 mt-4 rounded-md bg-red-600/20 border-2 border-red-700 max-w-fit"
    >
      <div className="flex gap-2">
        <Image
          src="/assets/icon/delete-icon.svg"
          width={14}
          height={14}
          alt="done icon"
        />
        <p className="text-red-700 text-sm">Delete</p>
      </div>
    </button>
  );
};

export default DeleteButton;
