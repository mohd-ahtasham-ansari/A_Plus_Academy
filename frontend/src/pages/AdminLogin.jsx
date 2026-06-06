import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin, forgotPassword, resetPassword } from '../services/adminService';

const AdminLogin = () => {
  const [view, setView] = useState('LOGIN'); // 'LOGIN', 'FORGOT_PASSWORD', 'RESET_PASSWORD'
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const data = await adminLogin(password);
      if (data.success) {
        localStorage.setItem('adminToken', data.token);
        navigate('/admin/materials');
      }
    } catch (err) {
      console.error('Admin login error:', err);
      setError(err.response?.data?.detail || 'Invalid password');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const data = await forgotPassword(email);
      if (data.success) {
        setSuccess('OTP sent to your email.');
        setView('RESET_PASSWORD');
      }
    } catch (err) {
      console.error('Forgot password error:', err);
      setError(err.response?.data?.detail || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const data = await resetPassword(email, otp, newPassword);
      if (data.success) {
        setSuccess('Password reset successfully. You can now log in.');
        setView('LOGIN');
        setPassword('');
        setOtp('');
        setNewPassword('');
      }
    } catch (err) {
      console.error('Reset password error:', err);
      setError(err.response?.data?.detail || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  const renderForm = () => {
    if (view === 'LOGIN') {
      return (
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Admin Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center justify-end">
            <button
              type="button"
              onClick={() => { setView('FORGOT_PASSWORD'); setError(''); setSuccess(''); }}
              className="text-sm text-primary hover:text-secondary font-medium"
            >
              Forgot Password?
            </button>
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${loading ? 'bg-gray-400' : 'bg-primary hover:bg-opacity-90'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
            >
              {loading ? 'Logging in...' : 'Sign in'}
            </button>
          </div>
        </form>
      );
    }

    if (view === 'FORGOT_PASSWORD') {
      return (
        <form className="mt-8 space-y-6" onSubmit={handleForgotPassword}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Admin Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => { setView('LOGIN'); setError(''); setSuccess(''); }}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              &larr; Back to Login
            </button>
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${loading ? 'bg-gray-400' : 'bg-primary hover:bg-opacity-90'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </div>
        </form>
      );
    }

    if (view === 'RESET_PASSWORD') {
      return (
        <form className="mt-8 space-y-6" onSubmit={handleResetPassword}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="otp" className="sr-only">OTP</label>
              <input
                id="otp"
                name="otp"
                type="text"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="newPassword" className="sr-only">New Password</label>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => { setView('LOGIN'); setError(''); setSuccess(''); }}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              &larr; Back to Login
            </button>
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${loading ? 'bg-gray-400' : 'bg-primary hover:bg-opacity-90'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </div>
        </form>
      );
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg border-t-4 border-primary">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-primary">
            {view === 'LOGIN' && 'Admin Login'}
            {view === 'FORGOT_PASSWORD' && 'Forgot Password'}
            {view === 'RESET_PASSWORD' && 'Reset Password'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {view === 'LOGIN' && 'Access the Study Materials Dashboard'}
            {view === 'FORGOT_PASSWORD' && 'Enter your email to receive an OTP'}
            {view === 'RESET_PASSWORD' && 'Enter the OTP and your new password'}
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{success}</span>
          </div>
        )}

        {renderForm()}
      </div>
    </div>
  );
};

export default AdminLogin;
