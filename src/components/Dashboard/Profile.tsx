import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import ChangePassword from '../Modals/ChangePassword';
import ChangeEmail from '../Modals/ChangeEmail';
import ChangeDOB from '../Modals/ChangeDOB';
import { useTranslation } from 'react-i18next';

const Profile: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { t } = useTranslation();
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showChangeEmail, setShowChangeEmail] = useState(false);
  const [showChangeDOB, setShowChangeDOB] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold">{t('profile')}</h1>
      <div className="mt-4 p-4 bg-white shadow-md">
        <p><strong>{t('username')}:</strong> {user?.username}</p>
        <p><strong>{t('email')}:</strong> {user?.email}</p>
        <p><strong>{t('dateOfBirth')}:</strong> {user?.dateOfBirth}</p>
        <button
          onClick={() => setShowChangePassword(true)}
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          {t('changePassword')}
        </button>
        <button
          onClick={() => setShowChangeEmail(true)}
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          {t('changeEmail')}
        </button>
        <button
          onClick={() => setShowChangeDOB(true)}
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          {t('changeDOB')}
        </button>
      </div>
      {showChangePassword && (
        <ChangePassword
          isOpen={showChangePassword}
          onClose={() => setShowChangePassword(false)}
          onSubmit={(newPassword) => console.log('Password changed to:', newPassword)}
        />
      )}
      {showChangeEmail && (
        <ChangeEmail
          isOpen={showChangeEmail}
          onClose={() => setShowChangeEmail(false)}
          onSubmit={(newEmail) => console.log('Email changed to:', newEmail)}
        />
      )}
      {showChangeDOB && (
        <ChangeDOB
          isOpen={showChangeDOB}
          onClose={() => setShowChangeDOB(false)}
          onSubmit={(newDOB) => console.log('Date of Birth changed to:', newDOB)}
        />
      )}
    </div>
  );
};

export default Profile;
