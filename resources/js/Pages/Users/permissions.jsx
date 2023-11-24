import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';


export default function UserPermissions({ auth, permissions, roles, user }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        user: user.id,
        roles: [],
        permissions: []
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('users.setPermissions'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Change roles & permissions</h2>}
        >
            <Head title="change roles & permissions" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <form onSubmit={submit}>
                            <div>
                                <InputLabel htmlFor="name" value={user.name} />
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="permissions" value="permissions" />
                                <select onChange={(e) => {
                                    const updatedOptions = [...e.target.options]
                                        .filter(option => option.selected)
                                        .map(x => x.value);
                                    setData('permissions', updatedOptions)
                                }}
                                    options={permissions}
                                    name="permissions[]"
                                    id="permissions"
                                    multiple
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    {
                                        permissions.map((permission, key) => (
                                            <option value={permission.id} >{permission.name} - {permission.label}</option>
                                        ))
                                    }
                                </select>

                                <InputError message={errors.permissions} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="roles" value="roles" />
                                <select onChange={(e) => {
                                    const updatedOptions = [...e.target.options]
                                        .filter(option => option.selected)
                                        .map(x => x.value);
                                    setData('roles', updatedOptions)
                                }}
                                    options={roles}
                                    name="roles[]"
                                    id="roles"
                                    multiple
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    {
                                        roles.map((role, key) => (
                                            <option value={role.id}>{role.name} - {role.label}</option>
                                        ))
                                    }
                                </select>

                                <InputError message={errors.roles} className="mt-2" />
                            </div>

                            <div className="flex items-center justify-end mt-4">
                                <Link
                                    href={route('users.index')}
                                    className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Back
                                </Link>
                                <PrimaryButton className="ms-4" disabled={processing}>
                                    change roles & permissions
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
