import React from 'react';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { RootState } from '../../redux/store';
import { addNote } from '../../redux/slices/noteSlice';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import showToast from '../../utils/toast';

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
  const notes = useSelector((state: RootState) => state.notes.notes);

  const { register, control, handleSubmit, formState: { errors } } = useForm<IFormInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      notes: [{ title: '', content: '', date: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
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

  const saveNotesToAPI = async () => {
    try {
      await axios.post('/api/notes', notes, {
        headers: {
          'Content-Type': 'application/json',
          // Add authentication token if needed
        },
      });
      showToast('success', t('notesSaved'));
    } catch (error) {
      showToast('error', t('errorOccurred'));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-2xl bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-6">{t('addNote')}</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center mb-4">
              <div className="flex-1 mr-2">
                <label htmlFor={`notes.${index}.title`} className="block text-sm font-medium text-gray-700">
                  {t('title')}
                </label>
                <input
                  {...register(`notes.${index}.title` as const)}
                  id={`notes.${index}.title`}
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                />
                {errors.notes?.[index]?.title && <p className="text-red-600 text-sm">{errors.notes[index]?.title?.message}</p>}
              </div>

              <div className="flex-1 mx-2">
                <label htmlFor={`notes.${index}.content`} className="block text-sm font-medium text-gray-700">
                  {t('content')}
                </label>
                <textarea
                  {...register(`notes.${index}.content` as const)}
                  id={`notes.${index}.content`}
                  rows={2}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                />
                {errors.notes?.[index]?.content && <p className="text-red-600 text-sm">{errors.notes[index]?.content?.message}</p>}
              </div>

              <div className="flex-1 mx-2">
                <label htmlFor={`notes.${index}.date`} className="block text-sm font-medium text-gray-700">
                  {t('date')}
                </label>
                <input
                  {...register(`notes.${index}.date` as const)}
                  id={`notes.${index}.date`}
                  type="date"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                />
                {errors.notes?.[index]?.date && <p className="text-red-600 text-sm">{errors.notes[index]?.date?.message}</p>}
              </div>

              <button
                type="button"
                onClick={handleSubmit(onSubmit)}
                className="p-2 bg-green-500 text-white rounded"
              >
                {t('save')}
              </button>
              <button type="button" onClick={() => remove(index)} className="text-red-600 text-sm ml-2">
                {t('remove')}
              </button>
            </div>
          ))}
        </form>
        <button
          type="button"
          onClick={() => append({ title: '', content: '', date: '' })}
          className="flex items-center mt-4 p-2 text-blue-500 border border-blue-500 rounded"
        >
          {t('addMore')}
        </button>
        <button onClick={saveNotesToAPI} className="w-full p-2 bg-blue-500 text-white rounded mt-4">
          {t('saveToAPI')}
        </button>
        <button onClick={() => window.location.reload()} className="w-full p-2 bg-red-500 text-white rounded mt-4">
          {t('cancel')}
        </button>
      </div>
    </div>
  );
};

export default AddNoteScreen;
