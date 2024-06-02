import { FaTrash, FaUserFriends } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { FcDepartment } from "react-icons/fc";

export default function CompanySideNav({className}:{className:string}) {

    let {company_id} = useParams();
    
    return (
        <div className={className}>
            <div className="flex flex-col justify-between shadow-xl rounded-lg fixed  w-[15%] bg-white max-h-[80%] overflow-y-auto">
                <div className="px-3 py-6">
                    <ul className="">

                        <li>
                            <Link
                                to={`/companies/${company_id}/dashboard`}
                                className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                            >
                                <FaHome />
                                Home
                            </Link>
                        </li>  

                        <li>
                            <Link
                                to={`/companies/${company_id}/dashboard/departments`}
                                className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                            >
                                <FcDepartment />
                                <span className="lg:text-sm text-xs">
                                    Departments
                                </span>
                            </Link>
                        </li>                    

                        <li>
                            <Link
                                to={`/companies/${company_id}/dashboard/employees`}
                                className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                            >
                                <FaUserFriends />
                                Employees
                            </Link>
                        </li>


                        <li>
                            <Link
                                to={`/companies/${company_id}/dashboard/delete`}
                                className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-100"
                            >
                                <FaTrash />
                                Delete
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}