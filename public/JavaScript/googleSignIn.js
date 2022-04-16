var xhr = new XMLHttpRequest();   
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    var id_token = googleUser.getAuthResponse().id_token;
    console.log('ID Token: ' + id_token);
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    verify(profile, googleUser)
    .then( (res,req) => {
        console.log(res);
        console.log(req);
        let user =  `Hello! ${profile.getName()}!`;
        let text = `You are logged in using Google Sign in!\n${user.toUpperCase()}\n\nPress Cancel to Logout!`;
        if (confirm(text) == true) {  
            location.href = "/user/profile";
        } else {
            signOut().then( () => {
                alert("You are Logged Out");
                location.href ='/user/logout';
            });
        }
    })
    .catch((err)=>{
        console.log(`Error During Google Login ${err}!`);
    });    
}

async function verify(profile, googleUser){
    var name = profile.getName();
    var email = profile.getEmail();
    var phone = 1111111111;
    var id_token = googleUser.getAuthResponse().id_token;
    xhr.open("POST", '/user/profile');    
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        value: {id_token: id_token, data: {name, email, phone}} 
        })
    );
}

async function signOut() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}