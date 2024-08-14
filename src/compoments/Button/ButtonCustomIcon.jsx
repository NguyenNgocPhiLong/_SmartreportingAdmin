
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ButtonCustomIcon(props) {


    return (
        <div className='w-full ml-5 mr-9'>
            <div onClick={props?.onClick}
                className="w-[200px] flex cursor-pointer text-xl transform transition-transform duration-200 hover:scale-11 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
                <FontAwesomeIcon
                    icon={props?.icon}
                />
                <span className='text-[18px] ml-4'>{props?.title}</span>
            </div>

        </div>
    );
}

export default ButtonCustomIcon;
