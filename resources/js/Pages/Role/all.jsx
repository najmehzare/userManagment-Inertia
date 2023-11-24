import NavLink from '@/Components/NavLink';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function All({ auth, roles }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Roles Managment</h2>}
        >
            <Head title="Roles Managment" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <PrimaryButton className="ms-4 ">
                        <NavLink className='text-white focus:text-white hover:text-white' href={route('roles.create')} active={route().current('roles.create')}>
                            Create New Role
                        </NavLink>
                    </PrimaryButton>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <table className="w-full table-fixed">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Name</th>
                                    <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Lable</th>
                                    <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {
                                    roles.map((role, key) => (
                                        <tr key={key}>
                                            <td className="py-4 px-6 border-b border-gray-200">{role.name}</td>
                                            <td className="py-4 px-6 border-b border-gray-200 truncate">{role.lable}</td>
                                            <td className="py-4 px-6 border-b border-gray-200">
                                                <span className="bg-green-500 text-white py-1 px-2 rounded-full text-xs">
                                                    Edit Role
                                                </span>
                                                <span className="bg-red-500 text-white py-1 px-2 rounded-full text-xs">
                                                    delete Role
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
