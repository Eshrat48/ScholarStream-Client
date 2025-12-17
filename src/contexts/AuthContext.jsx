import { createContext, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../config/firebase';
import { post } from '../utils/apiClient';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        console.log('Auth state changed - currentUser:', {
          displayName: currentUser.displayName,
          email: currentUser.email,
          photoURL: currentUser.photoURL,
          uid: currentUser.uid
        });

        // Ensure user data is in database (for Google login, this might be missing photoURL)
        try {
          const userData = {
            name: currentUser.displayName,
            email: currentUser.email,
            role: 'Student',
          };
          
          // Only include photoURL if it exists
          if (currentUser.photoURL) {
            userData.photoURL = currentUser.photoURL;
          }
          
          const syncResponse = await post('/users', userData);
          
          console.log('User sync response:', syncResponse);
          
          // Enhance currentUser with photoURL from sync response if available
          if (syncResponse.data?.photoURL && !currentUser.photoURL) {
            currentUser.photoURL = syncResponse.data.photoURL;
            console.log('Enhanced photoURL from sync response:', currentUser.photoURL);
          }
        } catch (err) {
          // User might already exist or other error - continue anyway
          console.log('User data sync note:', err.message);
        }
        
        setUser(currentUser);
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
          setToken(storedToken);
        }
      } else {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const register = async (name, email, password, photoURL) => {
    try {
      setError(null);
      // Create Firebase user
      const result = await createUserWithEmailAndPassword(auth, email, password);

      // Prepare user data - only include photoURL if it's not null/empty
      const userData = {
        name,
        email,
        role: 'Student',
      };
      
      if (photoURL && photoURL.trim() !== '') {
        userData.photoURL = photoURL;
      }

      // Save user to database
      const response = await post('/users', userData);

      // Generate JWT token
      const tokenResponse = await post('/auth/jwt', { email });
      const newToken = tokenResponse.token;

      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser(result.user);

      return result.user;
    } catch (err) {
      const errorMessage = err.message || 'Registration failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const login = async (email, password) => {
    try {
      setError(null);
      const result = await signInWithEmailAndPassword(auth, email, password);

      // Generate JWT token
      console.log('Requesting JWT for:', email);
      const tokenResponse = await post('/auth/jwt', { email });
      console.log('JWT response:', tokenResponse);
      const newToken = tokenResponse.token;

      if (!newToken) {
        throw new Error('No token received from server');
      }

      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser(result.user);

      console.log('Token stored successfully');

      return result.user;
    } catch (err) {
      console.error('Login error:', err);
      const errorMessage = err.message || 'Login failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('token');
      setUser(null);
      setToken(null);
      setError(null);
    } catch (err) {
      setError(err.message || 'Logout failed');
      throw new Error(err.message || 'Logout failed');
    }
  };

  const value = {
    user,
    token,
    loading,
    error,
    register,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
