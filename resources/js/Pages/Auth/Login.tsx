import Checkbox from '@/Components/Auth/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/Shared/InputLabel';
import PrimaryButton from '@/Components/Shared/PrimaryButton';
import TextInput from '@/Components/Shared/TextInput';
import Layout from '@/Layout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect, useState } from 'react';

interface LoginForm {
    email: string;
    password: string;
    remember: boolean;
}

interface Errors {
    email?: string;
    password?: string;
}

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } =
        useForm<LoginForm>({
            email: '',
            password: '',
            remember: false,
        });

    const [customError, setCustomError] = useState<string>('');

    useEffect(() => {
        if (errors.email === 'These credentials do not match our records.') {
            setCustomError(
                'Email atau password yang Anda masukkan salah. Silakan coba lagi.',
            );
        }
    }, [errors]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        setCustomError('');

        post(route('login'));
    };

    const handleInputChange = (
        field: keyof LoginForm,
        value: string | boolean,
    ) => {
        setData(field, value);
        if (customError) {
            setCustomError('');
        }
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
                            <input
                                type="hidden"
                                name="_token"
                                value="{{ csrf_token() }}"
                            />
                            {customError && (
                                <div className="mb-4 rounded-md bg-red-50 p-4">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <svg
                                                className="h-5 w-5 text-red-400"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <div className="text-sm text-red-700">
                                                {customError}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div>
                                <InputLabel
                                    className="block text-deep-blue"
                                    htmlFor="email"
                                    value="Email"
                                />

                                <TextInput
                                    id="email"
                                    type="email"
                                    placeholder="Masukkan email Anda"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) =>
                                        handleInputChange(
                                            'email',
                                            e.target.value,
                                        )
                                    }
                                />

                                <InputError
                                    message={
                                        errors.email !==
                                        'These credentials do not match our records.'
                                            ? errors.email
                                            : ''
                                    }
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
                                    placeholder="Masukkan password Anda"
                                    className="mt-1 block w-full"
                                    autoComplete="current-password"
                                    onChange={(e) =>
                                        handleInputChange(
                                            'password',
                                            e.target.value,
                                        )
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
                                            handleInputChange(
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
