//firebase appを全部使えるようにする
var firebase = require("firebase");

//初期設定を追加
firebase.initializeApp({
    apiKey: "AIzaSyC8yOeWFHPsFAGw_wvHcx4--R2xfc4QdSE",
    authDomain: "chatapp-3596d.firebaseapp.com",
    databaseURL: "https://chatapp-3596d.firebaseio.com",
    projectId: "chatapp-3596d",
    storageBucket: "chatapp-3596d.appspot.com",
    messagingSenderId: "672788672627"
});

//pluginが読み込まれたらvar firebase をexport
//export default firebase;
export default ({ store }, inject) => {
    inject('firebase', firebase)
}