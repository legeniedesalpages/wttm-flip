import { Service, signal } from '@angular/core'
import { initializeApp } from 'firebase/app'
import { browserSessionPersistence, initializeAuth, signInAnonymously } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import { environment } from '../../environments/environment'

@Service()
export class FirebaseService {

  readonly database = getDatabase(initializeApp(environment.firebase))
  // identité propre à chaque onglet : les fenêtres privées d'un même navigateur partagent sinon le même joueur
  private readonly auth = initializeAuth(this.database.app, { persistence: browserSessionPersistence })

  readonly uid = signal<string | null>(null)

  /** Connecte anonymement l'utilisateur si besoin et renvoie son identifiant */
  async signIn(): Promise<string> {
    await this.auth.authStateReady()
    const user = this.auth.currentUser ?? (await signInAnonymously(this.auth)).user
    this.uid.set(user.uid)
    return user.uid
  }
}
