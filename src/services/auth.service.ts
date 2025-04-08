import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateEmail,
  EmailAuthProvider,
  reauthenticateWithCredential,
  User,
  UserCredential,
  deleteUser as deleteAuthUser,
  sendEmailVerification
} from '@angular/fire/auth';
import {
  Firestore,
  doc,
  setDoc,
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
  CollectionReference
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersCollection: CollectionReference;

  constructor(private auth: Auth, private firestore: Firestore) {
    this.usersCollection = collection(this.firestore, 'users');
  }

  // Registrar usuario
  async register(email: string, password: string) {
    const userCredential: UserCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(this.usersCollection, user.uid), {
      uid: user.uid,
      email: user.email
    });

    // Enviar correo de verificación
    await sendEmailVerification(user);

    return user;
  }

  // Login
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // Logout
  logout() {
    return signOut(this.auth);
  }

  // Obtener usuarios
  async getUsers() {
    const usersSnapshot = await getDocs(this.usersCollection);
    return usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  // Eliminar usuario
  async deleteUser(uid: string) {
    await deleteDoc(doc(this.usersCollection, uid));

    const user = this.auth.currentUser;
    if (user && user.uid === uid) {
      await deleteAuthUser(user);
    }

    console.log(`Usuario con UID ${uid} eliminado correctamente.`);
  }

  // Actualizar usuario en Firestore
  async updateUser(uid: string, newData: any) {
    await updateDoc(doc(this.usersCollection, uid), newData);
    console.log(`Usuario con UID ${uid} actualizado correctamente.`);
  }

  // Verificar correo
  async sendVerificationEmail(user: User) {
    try {
      await sendEmailVerification(user);
      console.log('Correo de verificación enviado');
    } catch (error) {
      console.error('Error enviando correo de verificación: ', error);
      throw new Error('Error enviando correo de verificación');
    }
  }

  // Actualizar email con reautenticación
  async updateUserEmail(user: User, newEmail: string, password: string) {
    const credential = EmailAuthProvider.credential(user.email || '', password);
    try {
      await reauthenticateWithCredential(user, credential);
      await updateEmail(user, newEmail);
      console.log('Correo actualizado correctamente');
      return true;
    } catch (error) {
      console.error('Error actualizando correo: ', error);
      throw new Error('Error actualizando correo');
    }
  }
}
