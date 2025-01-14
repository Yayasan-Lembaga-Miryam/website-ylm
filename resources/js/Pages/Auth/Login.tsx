import Checkbox from '@/Components/Auth/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/Shared/InputLabel';
import PrimaryButton from '@/Components/Shared/PrimaryButton';
import TextInput from '@/Components/Shared/TextInput';
import Layout from '@/Layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <Layout isLogin={false} isAdmin={true}>
            <div className="flex min-h-screen w-full items-center justify-center bg-[url(/images/bg-LoginAdmin.png)] bg-cover bg-center bg-no-repeat">
                <Head title="Log in" />

                {status && (
                    <div className="mb-4 text-sm font-medium text-green-600">
                        {status}
                    </div>
                )}

                <div className="flex w-[80%]">
                    <div className="flex w-1/2 items-center justify-start">
                        <img
                            src="/images/img-LogoPic.png"
                            className="w-[70%]"
                            alt="Logo YLM"
                        />
                    </div>
                    <div className="flex w-1/2 items-center justify-center">
                        <form onSubmit={submit} className="w-[90%]">
                            <div>
                                <InputLabel
                                    className="block text-deep-blue"
                                    htmlFor="email"
                                    value="Email"
                                />

                                <TextInput
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="password"
                                    value="Password"
                                    className="block text-deep-blue"
                                />

                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    placeholder="Password"
                                    className="mt-1 block w-full"
                                    autoComplete="current-password"
                                    onChange={(e) =>
                                        setData('password', e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-4 block">
                                <label className="flex items-center">
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) =>
                                            setData(
                                                'remember',
                                                e.target.checked,
                                            )
                                        }
                                    />
                                    <span className="ms-2 text-sm text-gray-600">
                                        Remember me
                                    </span>
                                </label>
                            </div>

                            <div className="mt-4 flex items-center justify-end gap-5">
                                {/* {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        Forgot your password?
                                    </Link>
                                )} */}

                                <PrimaryButton
                                    className="mt-4"
                                    disabled={processing}
                                >
                                    Log in
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
