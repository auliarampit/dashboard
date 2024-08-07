import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { updateNote } from '../../redux/slices/noteSlice';
import { useTranslation } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';
import showToast from '../../utils/toast';

const EditNote: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const note = useSelector((state: RootState) => state.notes.notes.find(note => note.id === id));
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleUpdateNote = () => {
    if (note) {
      const updatedNote = { ...note, title, content };
      dispatch(updateNote(updatedNote));
      showToast('success', 'Note updated successfully');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 shadow-md">
        <h1 className="text-2xl font-bold">{t('editNote')}</h1>
        <input
          type="text"
          placeholder={t('title')}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-4 p-2 border border-gray-300"
        />
        <textarea
          placeholder={t('content')}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mt-4 p-2 border border-gray-300"
        />
        <button onClick={handleUpdateNote} className="mt-4 p-2 bg-blue-500 text-white">
          {t('updateNote')}
        </button>
      </div>
    </div>
  );
};

export default EditNote;
