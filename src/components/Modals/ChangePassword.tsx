import React, { useState } from 'react';
import Modal from 'react-modal';
import { useTranslation } from 'react-i18next';

interface ChangePasswordProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newPassword: string) => void;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ isOpen, onClose, onSubmit }) => {
  const { t } = useTranslation();
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(newPassword);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel={t('changePassword')}
      ariaHideApp={false}
    >
      <h2>{t('changePassword')}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>{t('newPassword')}</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">{t('save')}</button>
        <button type="button" onClick={onClose}>{t('cancel')}</button>
      </form>
    </Modal>
  );
};

export default ChangePassword;
