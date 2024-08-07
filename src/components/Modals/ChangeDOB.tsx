import React, { useState } from 'react';
import Modal from 'react-modal';
import { useTranslation } from 'react-i18next';

interface ChangeDOBProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newDOB: string) => void;
}

const ChangeDOB: React.FC<ChangeDOBProps> = ({ isOpen, onClose, onSubmit }) => {
  const { t } = useTranslation();
  const [newDOB, setNewDOB] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(newDOB);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel={t('changeDOB')}
      ariaHideApp={false}
    >
      <h2>{t('changeDOB')}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>{t('newDOB')}</label>
          <input
            type="date"
            value={newDOB}
            onChange={(e) => setNewDOB(e.target.value)}
            required
          />
        </div>
        <button type="submit">{t('save')}</button>
        <button type="button" onClick={onClose}>{t('cancel')}</button>
      </form>
    </Modal>
  );
};

export default ChangeDOB;
