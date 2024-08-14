import { NavLink } from 'react-router-dom'; // Import NavLink để tạo các liên kết điều hướng

// Sidebar component, nhận prop `children` để hiển thị nội dung chính
const Sidebar = ({ children }) => {
    // Danh sách các mục menu với đường dẫn và tên
    const menuItem = [
        {
            path: "/",
            name: "Resource", // Mục Resource
        },
        {
            path: "/project",
            name: "Project", // Mục Project
        },
        {
            path: "/process",
            name: "Process", // Mục Process
        },
        {
            path: "/task",
            name: "Task", // Mục Task
        },
    ];

    return (
        <div className="container">
            {/* Sidebar chứa các liên kết điều hướng */}
            <div className="sidebar bg-slate-800 w-[12%] h-[100vh]">
                {/* Duyệt qua từng mục trong menuItem và tạo NavLink tương ứng */}
                {
                    menuItem.map((item, index) => (
                        <NavLink to={item.path} key={index} className="link">
                            {/* Hiển thị tên của mục menu */}
                            <div className="link_text">{item.name}</div>
                        </NavLink>
                    ))
                }
            </div>
            {/* Main area để hiển thị nội dung của từng trang */}
            <div className='h-1'>
                <main>{children}</main>
            </div>
        </div>
    );
};

export default Sidebar;
