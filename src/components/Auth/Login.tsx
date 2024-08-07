import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { loginUser, setToken } from '../../redux/slices/authSlice';
import showToast from '../../utils/toast';

interface IFormInput {
  identifier: string;
  password: string;
}

const schema = yup.object().shape({
  identifier: yup
    .string()
    .required('This field is required')
    .test(
      'identifier',
      'Must be a valid email or username',
      (value) =>
        yup.string().email().isValidSync(value) ||
        yup.string().matches(/^[a-zA-Z0-9_]+$/).isValidSync(value)
    ),
  password: yup.string().required('This field is required'),
});

const LoginScreen: React.FC = () => {
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
    const result = await dispatch(loginUser(data));
    if (loginUser.fulfilled.match(result)) {
      dispatch(setToken(result.payload.token));
      navigate('/home');
    } else {
      showToast('error', t('loginFailed'));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-6">{t('login')}</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="identifier" className="block text-sm font-medium text-gray-700">
              {t('usernameOrEmail')}
            </label>
            <input
              {...register('identifier')}
              id="identifier"
              type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
            {errors.identifier && <p className="text-red-600 text-sm">{errors.identifier.message}</p>}
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

          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded mt-4">
            {t('login')}
          </button>

          <div className="mt-4 text-center">
            <span>{t('noAccount')}</span>
            <Link to="/register" className="text-blue-500 ml-2">{t('registerHere')}</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
