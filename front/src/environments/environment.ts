/**
    * @description      : 
    * @author           : renau
    * @group            : 
    * @created          : 07/07/2023 - 08:20:00
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 07/07/2023
    * - Author          : renau
    * - Modification    : 
**/
export const environment = {
    production: false,
    assetsPrefix: '',
    version: 'dev',
    title: 'WTTM Flipcard - Dev',
    firebase: {
        apiKey: 'FIREBASE_API_KEY',
        authDomain: 'FIREBASE_AUTH_DOMAIN',
        databaseURL: 'FIREBASE_BDD_URL',
        projectId: 'wttm-flip',
        appId: 'FIREBASE_APP_ID',
        storageBucket: 'FIREBASE_STORAGE_BUCKET',
        messagingSenderId: 'FIREBASE_MESSAGING_SENDER_ID',
        measurementId: 'FIREBASE_MEASUREMENT_ID'
    },
    pusher: {
        key: 'SECRET_PUSHER_KEY',
        cluster: 'eu'
      }
};