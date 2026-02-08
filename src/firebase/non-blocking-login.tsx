
'use client';
import {
  Auth,
  signInWithEmailAndPassword,
} from 'firebase/auth';

/** 
 * Inicia o login por e-mail/senha.
 * O cadastro é proibido, apenas o dono acessa.
 */
export function initiateEmailSignIn(authInstance: Auth, email: string, password: string): void {
  // Apenas permite a tentativa de login. O Firebase Auth cuidará da validação.
  signInWithEmailAndPassword(authInstance, email, password);
}
