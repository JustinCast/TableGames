import {Service} from 'react-services-injector';

class FirebaseAuth extends Service {
  constructor() {
    super();
    this.setConfigAuth();
  }

  // Configuration firebase
  setConfigAuth() { 
    this.CONFIG = {
        apiKey: "AIzaSyBUDHajC_WsEn0u3skyDuQ_XPehC61o-lY",
        authDomain: "fir-auth-react-64f8d.firebaseapp.com",
        databaseURL: "https://fir-auth-react-64f8d.firebaseio.com",
        projectId: "fir-auth-react-64f8d",
        storageBucket: "fir-auth-react-64f8d.appspot.com",
        messagingSenderId: "460343751130"
    };
  }

  // Get Config Auth 
  get getConfigAuth() {
      return this.CONFIG;
  }
}

//"publicName" property is important if you use any kind of minimization on your JS
FirebaseAuth.publicName = 'FirebaseAuth';

export default FirebaseAuth;
