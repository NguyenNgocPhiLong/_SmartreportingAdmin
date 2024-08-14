import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateUser = () => {
    // State để lưu trữ dữ liệu form
    const [formData, setFormData] = useState({
        name: '',
        dateOfBirth: '',
        sex: '',
        account: '',
        status: '',
        phoneNumber: '',
        identityCard: '',
        email: '',
        contract: '',
        startDate: '',
        endDate: ''
    });

    // State để lưu trữ lỗi xác thực
    const [errors, setErrors] = useState({});

    // Hàm xử lý thay đổi dữ liệu trong các trường input
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Cập nhật giá trị của từng trường vào state formData
        setFormData({ ...formData, [name]: value });
    };

    // Hàm kiểm tra xác thực form
    const validateForm = () => {
        const newErrors = {};
        // Kiểm tra tất cả các trường để đảm bảo chúng không bị trống
        for (const key in formData) {
            if (formData[key] === '') {
                newErrors[key] = 'This field is required'; // Thêm lỗi nếu trường bị bỏ trống
            }
        }
        // Kiểm tra số điện thoại không chứa chữ
        if (formData.phoneNumber && /[a-zA-Z]/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = 'Phone number cannot contain letters';
        }
        // Kiểm tra ngày sinh không được ở tương lai
        if (formData.dateOfBirth && new Date(formData.dateOfBirth) > new Date()) {
            newErrors.dateOfBirth = 'Date of Birth cannot be in the future';
        }
        // Kiểm tra ngày kết thúc không được trước ngày bắt đầu
        if (formData.startDate && formData.endDate && new Date(formData.startDate) > new Date(formData.endDate)) {
            newErrors.endDate = 'End Date cannot be before Start Date';
        }
        return newErrors; // Trả về lỗi xác thực nếu có
    };

    const navigator = useNavigate(); // Hook điều hướng từ react-router-dom

    // Hàm để tạo mới một resource bằng cách gửi dữ liệu form qua API
    const handleNewResource = async (e) => {
        await axios
            .post(`http://localhost:8000/resources`, formData, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            })
            .then(function (response) {
                console.log(response);
                navigator('/resource'); // Điều hướng người dùng về trang resource sau khi tạo thành công
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    // Hàm xử lý khi người dùng gửi form
    const handleSubmit = (e) => {
        handleNewResource(e);
        // e.preventDefault(); // Ngăn chặn hành động mặc định của form
        // // Xác thực dữ liệu form
        // const validationErrors = validateForm();
        // if (Object.keys(validationErrors).length > 0) {
        //     // Nếu có lỗi xác thực, cập nhật trạng thái lỗi
        //     setErrors(validationErrors);
        //     return;
        // }
        // handleNewResource(e); // Gọi hàm tạo mới resource nếu form hợp lệ
        // console.log('Form data submitted:', formData);
        // setErrors({}); // Xóa lỗi nếu form hợp lệ
    };

    return (
        <div className="max-w-3xl mx-auto p-8">
            <h1 className="text-2xl font-semibold mb-6">Create User</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Sử dụng lưới để sắp xếp các trường thành 2 cột trên màn hình lớn hơn */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Trường Full Name */}
                    <div>
                        <label className="block text-sm font-medium">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 block w-full min-w-[200px] max-w-[400px] px-3 py-2 border border-gray-300 rounded-md"
                            style={{ width: 'auto' }}
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>
                    {/* Trường Date of Birth */}
                    <div>
                        <label className="block text-sm font-medium">Date of Birth</label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            className="mt-1 block w-full sm:w-48 px-3 py-2 border border-gray-300 rounded-md"
                        />
                        {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
                    </div>
                    {/* Trường Sex */}
                    <div>
                        <label className="block text-sm font-medium">Sex</label>
                        <select
                            name="sex"
                            value={formData.sex}
                            onChange={handleChange}
                            className="mt-1 block w-full sm:w-48 px-3 py-2 border border-gray-300 rounded-md"
                        >
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="lgbt">LGBT</option>
                        </select>
                        {errors.sex && <p className="text-red-500 text-sm mt-1">{errors.sex}</p>}
                    </div>
                    {/* Trường Phone */}
                    <div>
                        <label className="block text-sm font-medium">Phone</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="mt-1 block w-full sm:w-48 px-3 py-2 border border-gray-300 rounded-md"
                        />
                        {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
                    </div>
                    {/* Trường CCCD/CMND */}
                    <div>
                        <label className="block text-sm font-medium">CCCD/CMND</label>
                        <input
                            type="text"
                            name="identityCard"
                            value={formData.identityCard}
                            onChange={handleChange}
                            className="mt-1 block w-full sm:w-48 px-3 py-2 border border-gray-300 rounded-md"
                        />
                        {errors.identityCard && <p className="text-red-500 text-sm mt-1">{errors.identityCard}</p>}
                    </div>
                    {/* Trường Email */}
                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 block w-full min-w-[200px] max-w-[400px] px-3 py-2 border border-gray-300 rounded-md"
                            style={{ width: 'auto' }}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    {/* Trường account */}
                    <div>
                        <label className="block text-sm font-medium">account</label>
                        <input
                            type="text"
                            name="account"
                            value={formData.account}
                            onChange={handleChange}
                            className="mt-1 block w-full sm:w-48 px-3 py-2 border border-gray-300 rounded-md"
                        />
                        {errors.account && <p className="text-red-500 text-sm mt-1">{errors.account}</p>}
                    </div>
                    {/* Trường Status */}
                    <div>
                        <label className="block text-sm font-medium">Status</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="mt-1 block w-full sm:w-48 px-3 py-2 border border-gray-300 rounded-md"
                        >
                            <option value="">Select</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                        {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>}
                    </div>
                    {/* Trường Contract Type */}
                    <div>
                        <label className="block text-sm font-medium">Contract Type</label>
                        <input
                            type="text"
                            name="contract"
                            value={formData.contract}
                            onChange={handleChange}
                            className="mt-1 block w-full sm:w-48 px-3 py-2 border border-gray-300 rounded-md"
                        />
                        {errors.contract && <p className="text-red-500 text-sm mt-1">{errors.contract}</p>}
                    </div>
                    {/* Trường Start Date */}
                    <div>
                        <label className="block text-sm font-medium">Start Date</label>
                        <input
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            className="mt-1 block w-full sm:w-48 px-3 py-2 border border-gray-300 rounded-md"
                        />
                        {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
                    </div>
                    {/* Trường End Date */}
                    <div>
                        <label className="block text-sm font-medium">End Date</label>
                        <input
                            type="date"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                            className="mt-1 block w-full sm:w-48 px-3 py-2 border border-gray-300 rounded-md"
                        />
                        {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>}
                    </div>
                </div>
                {/* Nút submit */}
                <div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateUser;
