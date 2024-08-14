import React, { useEffect, useState } from 'react';
import { db, newEnumUser } from '../../db/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
// add thư viện bằng lệnh npm i => npm i react-responsive-pagination

function TableCustom() {

    const [currentPage, setCurrentPage] = useState(8);
    const totalPages = 10;

    const [resources, setResources] = useState([]); // State để lưu trữ danh sách dữ liệu người dùng
    const navigate = useNavigate(); // Hook điều hướng của react-router-dom

    // Hàm xử lý khi nhấn vào nút "Edit"
    const handleEditClick = (userId) => {
        navigate(`/update/${userId}`); // Điều hướng tới trang cập nhật với ID người dùng
    };

    // Hàm gọi API để lấy danh sách người dùng
    const getResource = async () => {
        await axios
            .get(`http://localhost:8000/resources`, {
                withCredentials: true,
            })
            .then(function (response) {
                setResources(response.data); // Cập nhật state với dữ liệu nhận được từ server
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    // Sử dụng useEffect để gọi hàm getResource khi component được render lần đầu
    useEffect(() => {
        getResource();
    }, []);

    // Hàm xử lý khi nhấn vào nút "Delete"
    const handleDeleteResource = async (id) => {
        await axios
            .delete(`http://localhost:8000/resources/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            })
            .then(function (response) {
                console.log(response);
                getResource(); // Gọi lại hàm getResource để cập nhật danh sách sau khi xóa thành công
                alert("Delete success");
            })
            .catch(function (error) {
                console.log(error);
                alert("Delete fail");
            });
    };

    // Hàm định dạng ngày tháng năm
    function formatDate(dateStr) {
        const date = new Date(dateStr);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();

        return `${day}/${month}/${year}`; // Trả về ngày tháng năm dưới dạng "dd/mm/yyyy"
    }

    return (
        <div className='w-[100%] ml-auto mr-auto my-5'>
            {/* Phần bảng */}
            <div className="overflow-x-auto h-[70vh]">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {/* Các tiêu đề cột của bảng */}
                            {/* <th scope="col" className="px-6 py-3 text-center">ID</th> */}
                            <th scope="col" className="px-6 py-3 text-center">Full Name</th>
                            <th scope="col" className="px-6 py-3 text-center">Date Birth</th>
                            <th scope="col" className="px-6 py-3 text-center">Sex</th>
                            <th scope="col" className="px-6 py-3 text-center">Phone</th>
                            <th scope="col" className="px-6 py-3 text-center">CCCD</th>
                            <th scope="col" className="px-6 py-3 text-center">Email</th>
                            <th scope="col" className="px-6 py-3 text-center">Account</th>
                            {/* <th scope="col" className="px-6 py-3 text-center">Position</th> */}
                            <th scope="col" className="px-6 py-3 text-center">Status</th>
                            <th scope="col" className="px-6 py-3 text-center">Contract Type</th>
                            <th scope="col" className="px-6 py-3 text-center">Start Date</th>
                            <th scope="col" className="px-6 py-3 text-center">End Date</th>
                            <th scope="col" className="px-6 py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="h-48 overflow-y-auto">
                        {/* Duyệt qua danh sách người dùng và tạo các hàng bảng */}
                        {resources.map((resource) => (
                            <tr key={resource._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                {/* <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {resource._id}
                                </th> */}
                                <td className="px-6 py-4">{resource.name}</td>
                                <td className="px-6 py-4">{formatDate(resource.dateOfBirth)}</td>
                                <td className="px-6 py-4">{resource.sex}</td>
                                <td className="px-6 py-4">{resource.phoneNumber}</td>
                                <td className="px-6 py-4">{resource.identityCard}</td>
                                <td className="px-6 py-4">{resource.email}</td>
                                <td className="px-6 py-4">{resource.account}</td>

                                {/* <td className="px-6 py-4">
                                    {Object.keys(newEnumresource.position).find(key => newEnumUser.position[key] === user.position)}
                                </td> */}

                                <td className="px-6 py-4">
                                    {/* Hiển thị trạng thái dựa trên giá trị enum và áp dụng màu sắc */}
                                    <span className={resource.status === newEnumUser.status.active ? "text-green-500" : "text-red-500"}>
                                        {resource.status}
                                    </span>
                                </td>

                                <td className="px-6 py-4">
                                    {/* Hiển thị loại hợp đồng dựa trên giá trị enum */}
                                    {resource.contract}
                                </td>
                                <td className="px-6 py-4">{formatDate(resource.startDate)}</td>
                                <td className="px-6 py-4">{formatDate(resource.endDate)}</td>
                                <td className="px-6 py-12 flex space-x-4 items-center">
                                    {/* Các biểu tượng hành động */}
                                    <FontAwesomeIcon
                                        icon={faEdit}
                                        className="cursor-pointer text-blue-500 text-xl transform transition-transform duration-200 hover:scale-110"
                                        onClick={() => handleEditClick(resource._id)}
                                    />
                                    <FontAwesomeIcon
                                        icon={faTrash}
                                        className="cursor-pointer text-red-500 text-xl transform transition-transform duration-200 hover:scale-110"
                                        onClick={() => handleDeleteResource(resource._id)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Phần phân trang */}
            <ResponsivePagination
                current={currentPage}
                total={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}

export default TableCustom;
