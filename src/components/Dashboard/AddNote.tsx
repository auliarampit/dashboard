import React from 'react';
import { useForm, SubmitHandler, useFieldArray, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// import { RootState } from '../../redux/store';
import { addNote } from '../../redux/slices/noteSlice';
// import axios from 'axios';
import { useTranslation } from 'react-i18next';
import showToast from '../../utils/toast';
import { FaPlus, FaSave } from 'react-icons/fa'

interface Note {
  title: string;
  content: string;
  date: string;
}

interface IFormInput {
  notes: Note[];
}

const schema = yup.object().shape({
  notes: yup.array().of(
    yup.object().shape({
      title: yup.string().required('This field is required'),
      content: yup.string().required('This field is required'),
      date: yup.string().required('This field is required'),
    })
  ).required(),
});

const AddNoteScreen: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  // const notes = useSelector((state: RootState) => state.notes.notes);

  const { control, handleSubmit, formState: { errors } } = useForm<IFormInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      notes: [{ title: '', content: '', date: '' }],
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: 'notes',
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    data.notes.forEach(note => dispatch(addNote({
      ...note,
      id: Date.now().toString(),
    })));
    showToast('success', t('noteAdded'));
  };

  // const saveNotesToAPI = async () => {
  //   try {
  //     await axios.post('/api/notes', notes, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         // Add authentication token if needed
  //       },
  //     });
  //     showToast('success', t('notesSaved'));
  //   } catch (error) {
  //     showToast('error', t('errorOccurred'));
  //   }
  // };

  return (
    <div className="container mx-auto p-4 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">{t('addNote')}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((item, index) => (
          <div key={item.id} className="mb-4 p-4 bg-white rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <Controller
                name={`notes.${index}.title` as const}
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    className="border p-2 mr-2 w-full rounded-lg"
                    placeholder={t('title')}
                  />
                )}
              />
              {errors.notes?.[index]?.title && <span className="text-red-500">{t('titleRequired')}</span>}
            </div>
            <div className="flex items-center mb-4">
              <Controller
                name={`notes.${index}.content` as const}
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    className="border p-2 mr-2 w-full rounded-lg"
                    placeholder={t('content')}
                  />
                )}
              />
              {errors.notes?.[index]?.content && <span className="text-red-500">{t('contentRequired')}</span>}
            </div>
            <div className="flex items-center mb-4">
              <Controller
                name={`notes.${index}.date` as const}
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="date"
                    className="border p-2 mr-2 w-full rounded-lg"
                  />
                )}
              />
              {errors.notes?.[index]?.date && <span className="text-red-500">{t('dateRequired')}</span>}
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-lg flex items-center"
              >
                <FaSave className="mr-2" />
                {t('save')}
              </button>
            </div>
          </div>
        ))}
        <div className="flex justify-center mt-6">
          <button
            type="button"
            className="bg-transparent text-blue-500 border border-blue-500 p-2 rounded-lg flex items-center"
            onClick={() => append({ title: '', content: '', date: '' })}
          >
            <FaPlus className="mr-2" />
            {t('addMore')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNoteScreen;