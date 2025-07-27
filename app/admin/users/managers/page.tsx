import Sidebar from './Sidebar';
import ManagerCard from './ManagerCard';
import Link from 'next/link';

const managers = [
  {
    id: '1',
    name: 'Азимов Марат Рустамович',
    experience: '3 года в компании',
    dob: '14.05.1996',
    nickname: 'nickname',
    status: 'Активен',
    avatar: '/avatars/avatar1.jpg',
  },
  {
    id: '2',
    name:"Сагынбаева Альмира Зариповна",
    experience:"1 год в компании",
    dob:"05.03.2003",
    nickname:"nickname",
    status:"Активен",
    avatar:"/avatars/avatar2.jpg",
  },
  {
    id:'3',
    name:"Марсова Яна Михайловна",
    experience:"2 года в компании",
    dob:"30.11.1999",
    nickname:"nickname",
    status:"Заблокирован",
    avatar:"/avatars/avatar3.jpg",
  },
  {
    id:'4',
    name:"Вайнец Лера",
    experience:"4 года в компании",
    dob:"29.02.2000",
    nickname:"nickname",
    status:"Активен",
    avatar:"/avatars/avatar4.jpg",
  }
];

export default function Home() {
  return (
    <div className="flex p-6">
      <Sidebar />
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 pl-6 w-full">
        {managers.map((manager) => (
          <Link href={`/managers/${manager.id}`} key={manager.id}>
            <ManagerCard {...manager} />
          </Link>
        ))}
      </div>
    </div>
  );
}
