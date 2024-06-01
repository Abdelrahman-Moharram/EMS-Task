import { FaFile, FaTrash, FaUserFriends } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";
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
                            <details className="group [&_summary::-webkit-details-marker]:hidden">
                            <summary
                                className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                            >
                                <span className="flex items-center gap-2 text-sm font-medium"> <MdManageAccounts /> Manage </span>

                                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                    />
                                </svg>
                                </span>
                            </summary>

                            <ul className="mt-2 space-y-1 px-4">
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
                                        to={`/companies/${company_id}/dashboard/applications`}
                                        className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                    >
                                        <FaFile />
                                        Job Applications
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
                            </details>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}