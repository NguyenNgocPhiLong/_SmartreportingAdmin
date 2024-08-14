import { useNavigate } from 'react-router-dom'; // Import useNavigate để điều hướng
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useDebouncedCallback } from 'use-debounce';

function ButtonCustom(props) {
    // Sử dụng useNavigate để điều hướng người dùng đến trang khác
    const navigate = useNavigate();

    // Hàm để điều hướng người dùng đến trang Create User khi nhấn nút Create
    const handleCreateButtonClick = () => {
        navigate('/create-user'); // Điều hướng tới trang Create User
    };

    const debounced = useDebouncedCallback(
        (value) => {
            props?.setSearch(value);
        }, 500
    );

    return (
        <div className='w-full mr-9 mb-10'>
            <div className='items-center'>
                <h1 className='font-bold text-3xl mb-4'>List Of Resource</h1>
                <div className='flex w-full  justify-between '>
                    <input
                        className='!w-[300px] h-10 border-2 border-black rounded-md pl-3'
                        type="text"
                        placeholder='Search ...' // Input tìm kiếm
                        onChange={(e) => debounced(e.target.value)}
                    />
                    <FontAwesomeIcon
                        icon={faPlus}
                        className="cursor-pointer text-xl transform transition-transform duration-200 hover:scale-110   bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                        onClick={() => handleCreateButtonClick()}
                    />
                </div>
            </div>
        </div>
    );
}

export default ButtonCustom;
