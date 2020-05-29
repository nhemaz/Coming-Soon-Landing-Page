// Initialize Firebase
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

var config = {
    apiKey: "AIzaSyAdOBNd2bQ-ynm2Qcu0mGmOqRqDCIt8dsY",
    authDomain: "aialanding.firebaseapp.com",
    databaseURL: "https://aialanding.firebaseio.com",
    projectId: "aialanding",
    storageBucket: "aialanding.appspot.com",
    messagingSenderId: "55793774953",
    appId: "1:55793774953:web:baff7910b4c675c131cdf8"
};
firebase.initializeApp(config);
var db = firebase.firestore();
db.settings({
    timestampsInSnapshots: true
});

$(document).ready(function () {

    $('#notifs-form-btn').click(function (e) {
        var is_present = false;
        email = $('#notifs-form-input').val();
        if (validateEmail(email)) {
            db.collection('Emails').get().then(function (qs) {
                qs.forEach(function (element) {
                    if (element.data()['ID'] == email) {
                        is_present = true;
                    }
                });

                if (is_present == false) {
                    db.collection("Emails").add({
                        'ID': email,
                    })
                        .then(function (docRef) {
                            console.log("Document written with ID: ", docRef.id);
                            $("#notifs-form-btn").text("Notified!");
                        })
                        .catch(function (error) {
                            console.error("Error adding document: ", error);
                        });
                }
            });

        }
        else {
            alert('Invalid Email');
        }
    });

});