import React from "react";

const Sidebar = () => {
    return (
      <aside className="min-w-[200px] p-6 font-sans text-gray-800">
        <h3 className="font-bold text-lg mb-4">Менеджеры</h3>
        <ul className="space-y-3">
          <li className="cursor-pointer hover:text-blue-600">Гиды</li>
          <li className="cursor-pointer hover:text-blue-600">Пользователи</li>
          <li className="cursor-pointer hover:text-blue-600">Чёрный список</li>
        </ul>
      </aside>
    );
  };
  
  export default Sidebar;
  