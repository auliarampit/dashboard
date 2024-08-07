import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { registerUser } from '../../redux/slices/authSlice';
import showToast from '../../utils/toast';

interface IFormInput {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: string;
}

const schema = yup.object().shape({
  username: yup.string().required('This field is required'),
  email: yup.string().email('Must be a valid email').required('This field is required'),
  password: yup.string().required('This field is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), undefined], 'Passwords must match')
    .required('This field is required'),
  dateOfBirth: yup.string().required('This field is required'),
});

const RegisterScreen: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const result = await dispatch(registerUser(data));
    if (registerUser.fulfilled.match(result)) {
      showToast('success', t('registrationSuccess'));
      navigate('/login');
    } else {
      showToast('error' ,t('registrationFailed'));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-6">{t('register')}</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              {t('username')}
            </label>
            <input
              {...register('username')}
              id="username"
              type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
            {errors.username && <p className="text-red-600 text-sm">{errors.username.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              {t('email')}
            </label>
            <input
              {...register('email')}
              id="email"
              type="email"
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
            {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              {t('password')}
            </label>
            <input
              {...register('password')}
              id="password"
              type="password"
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
            {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              {t('confirmPassword')}
            </label>
            <input
              {...register('confirmPassword')}
              id="confirmPassword"
              type="password"
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
            {errors.confirmPassword && <p className="text-red-600 text-sm">{errors.confirmPassword.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
              {t('dateOfBirth')}
            </label>
            <input
              {...register('dateOfBirth')}
              id="dateOfBirth"
              type="date"
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
            {errors.dateOfBirth && <p className="text-red-600 text-sm">{errors.dateOfBirth.message}</p>}
          </div>

          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded mt-4">
            {t('register')}
          </button>

          <div className="mt-4 text-center">
            <span>{t('haveAccount')}</span>
            <Link to="/login" className="text-blue-500 ml-2">{t('loginHere')}</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterScreen;
