
type ManagerProps = {
    id: number;
    name: string;
    experience: string;
    dob: string;
    nickname: string;
    status: 'Активен' | 'Заблокирован';
    avatar: string;
  };
  
  const ManagerCard = ({
    name,
    experience,
    dob,
    nickname,
    status,
    avatar,
  }: ManagerProps) => {
    return (
      <div className="flex bg-white rounded-lg shadow-md p-4 gap-4">
        <img
          src={avatar}
          alt={name}
          className="w-20 h-20 rounded-full object-cover"
        />
        <div className="flex-1">
          <h4 className="text-lg font-semibold">{name}</h4>
          <p>{experience}</p>
          <p>{dob}</p>
          <p className="text-sm text-gray-600">@{nickname}</p>
          <p
            className={`font-semibold ${
              status === 'Активен' ? 'text-green-600' : 'text-red-500'
            }`}
          >
            {status}
          </p>
          <p className="text-sm mt-2 text-gray-700 leading-relaxed">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..."
          </p>
        </div>
      </div>
    );
  };
  
  export default ManagerCard;
  