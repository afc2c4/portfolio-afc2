
'use client';
import {
  Auth,
  signInWithEmailAndPassword,
} from 'firebase/auth';

/** 
 * Inicia o login por e-mail/senha (não bloqueante).
 * O cadastro foi removido por segurança para garantir que apenas o dono acesse.
 */
export function initiateEmailSignIn(authInstance: Auth, email: string, password: string): void {
  // CRITICAL: Chama signInWithEmailAndPassword diretamente. 
  // O estado de autenticação é capturado pelo listener onAuthStateChanged no Provider.
  signInWithEmailAndPassword(authInstance, email, password);
}
