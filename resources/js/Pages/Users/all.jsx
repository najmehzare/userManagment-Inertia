import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function All({ auth, users, canEditUser }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Users Managment</h2>}
        >
            <Head title="Users Managment" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <table className="w-full table-fixed">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Name</th>
                                    <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Email</th>
                                    <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">level</th>
                                    <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {
                                    users.map((user, key) => (
                                        <tr key={key}>
                                            <td className="py-4 px-6 border-b border-gray-200">{user.name}</td>
                                            <td className="py-4 px-6 border-b border-gray-200 truncate">{user.email}</td>
                                            <td className="py-4 px-6 border-b border-gray-200 truncate">{user.level}</td>
                                            <td className="py-4 px-6 border-b border-gray-200">
                                                {canEditUser && user.level != 'admin' && (
                                                    <>
                                                        <span className="bg-green-500 text-white py-1 px-2 rounded-full text-xs">
                                                            <Link
                                                                href={route('users.permissions', user.id)}
                                                                className=""
                                                            >
                                                                Change Role
                                                            </Link>
                                                        </span>
                                                        <span className={` ${user.banned == 1 ? 'bg-red-500 ' : ' bg-orange-500 '}   text-white py-1 px-2 rounded-full text-xs `}>
                                                            <Link
                                                                href={route('users.changeBanned', user.id)}
                                                                className=""
                                                            >
                                                                {user.banned ? 'banned' : 'not banned' }
                                                            </Link>
                                                        </span>
                                                    </>
                                                )}
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
