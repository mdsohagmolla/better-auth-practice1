import React, { Suspense } from 'react';
import ResetPasswordForm from './Reset-password-form';

const ResetPasswordPage = () => {
    return (
        <div>
            <h2>Reset password</h2>
            {/* use search params */}
            <Suspense fallback="Loading">
                <ResetPasswordForm></ResetPasswordForm>
            </Suspense>
        </div>
    );
};

export default ResetPasswordPage;