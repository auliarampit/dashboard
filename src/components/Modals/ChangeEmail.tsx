import React, { useState } from 'react';
import Modal from 'react-modal';
import { useTranslation } from 'react-i18next';

interface ChangeEmailProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newEmail: string) => void;
}

const ChangeEmail: React.FC<ChangeEmailProps> = ({ isOpen, onClose, onSubmit }) => {
  const { t } = useTranslation();
  const [newEmail, setNewEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(newEmail);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel={t('changeEmail')}
      ariaHideApp={false}
    >
      <h2>{t('changeEmail')}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>{t('newEmail')}</label>
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">{t('save')}</button>
        <button type="button" onClick={onClose}>{t('cancel')}</button>
      </form>
    </Modal>
  );
};

export default ChangeEmail;
