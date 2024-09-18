// authService.js
import { signOut } from 'firebase/auth';
import { auth } from './firebaseConfig';

// Abstract the Firebase logic into this service
const logout = async () => {
    try {
        await signOut(auth);
        return { success: true };
    } catch (error) {
        console.error('Error logging out: ', error);
        return { success: false, error };
    }
};

const isAuthenticated = () => {
    return !!auth.currentUser;
};

export { logout, isAuthenticated };