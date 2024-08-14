import { useEffect, useState } from 'react'
import axios from 'axios';

import ButtonCustom from '../../compoments/Button'
import AntTableCustom from '../../compoments/nTable'

import { formatDate } from '../../utils/format';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'; // Import các icon FontAwesome cho hành động chỉnh sửa và xóa
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';  // Import hook useNavigate để điều hướng


function HomePage() {
  // State để lưu giá trị tìm kiếm đầu vào
  const [Search, setSearch] = useState('');

  // State để lưu trữ tài nguyên được fetch từ server
  const [resources, setResources] = useState([]);
  const navigate = useNavigate(); // Hook điều hướng từ react-router-dom

  // Định nghĩa các cột cho thành phần AntTableCustom
  const columns = [
    {
      title: 'Full Name', // Tiêu đề cột Tên đầy đủ
      dataIndex: 'name', // Khóa của dữ liệu tương ứng
      fixed: 'left', // Cố định cột bên trái
    },
    {
      title: 'Date Birth', // Tiêu đề cột Ngày sinh
      dataIndex: 'dateOfBirth',
    },
    {
      title: 'Sex', // Tiêu đề cột Giới tính
      dataIndex: 'sex',
      width: 100, // Độ rộng cột
    },
    {
      title: 'CCCD', // Tiêu đề cột CCCD
      dataIndex: 'identityCard',
    },
    {
      title: 'Phone', // Tiêu đề cột Số điện thoại
      dataIndex: 'phoneNumber',
    },
    {
      title: 'Account', // Tiêu đề cột Tài khoản
      dataIndex: 'account',
    },
    {
      title: 'Contract Type', // Tiêu đề cột Loại hợp đồng
      dataIndex: 'contract',
    },
    {
      title: 'End Date', // Tiêu đề cột Ngày kết thúc
      dataIndex: 'endDate',
    },
    {
      title: 'Action', // Tiêu đề cột Hành động
      fixed: 'right', // Cố định cột bên phải
      width: 80, // Độ rộng cột
      render: (item) => (
        <>
          <div className='w-full flex justify-between'>
            {/* Nút chỉnh sửa với sự kiện click để điều hướng đến trang cập nhật */}
            <FontAwesomeIcon
              icon={faEdit}
              className="cursor-pointer text-blue-500 text-xl transform transition-transform duration-200 hover:scale-110"
              onClick={() => navigate(`/update/${item?._id}`)}
            />
            {/* Nút xóa với sự kiện click để xóa tài nguyên */}
            <FontAwesomeIcon
              icon={faTrash}
              className="cursor-pointer text-red-500 text-xl transform transition-transform duration-200 hover:scale-110"
              onClick={(e) => handleDeleteResource(item?._id)}
            />
          </div>
        </>
      ),
    },
  ];

  // Hàm để fetch tài nguyên từ server và định dạng dữ liệu
  const getResource = async () => {
    await axios
      .get(`http://localhost:8000/resources?search=${Search}`, { // Query tìm kiếm trên BE
        withCredentials: true,
      })
      .then(function (response) {
        console.log(response.data?.length);
        const formattedData = response.data.map((item, index) => {
          return {
            key: index + 1, // Thêm index cho mỗi item
            ...item, // Spread các thuộc tính của item
            phoneNumber: item.phoneNumber,
            dateOfBirth: formatDate(item.dateOfBirth),  // Định dạng lại ngày sinh
            startDate: formatDate(item.startDate), // Định dạng lại ngày bắt đầu
            endDate: formatDate(item.endDate), // Định dạng lại ngày kết thúc
          };
        });

        setResources(formattedData); // Cập nhật state với dữ liệu đã định dạng
        console.log(formattedData);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Hàm xử lý xóa tài nguyên
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
        getResource(); // Fetch lại tài nguyên sau khi xóa thành công
        alert("Delete success");
      })
      .catch(function (error) {
        console.log(error);
        alert("Delete fail");
      });
  };

  // useEffect để fetch tài nguyên khi component được mount hoặc khi giá trị tìm kiếm thay đổi
  useEffect(() => {
    getResource();
  }, [Search]);

  return (
    <div>
      {/* Thành phần Button tùy chỉnh để xử lý đầu vào tìm kiếm */}
      <ButtonCustom setSearch={setSearch} />
      {/* Thành phần Bảng tùy chỉnh để hiển thị tài nguyên */}
      <AntTableCustom data={resources} columnsTable={columns} />
    </div>
  );
}

export default HomePage;