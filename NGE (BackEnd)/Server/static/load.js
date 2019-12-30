function load(){
    var user = checkforuser();
    if(user == false){
        window.location.replace('Login.htm');
    }
}

function lLoad(){
    var user = checkforuser();
    alert("Hello")
    if(user == true){
        window.location.replace('index.htm');
        
    }
}

function checkforuser(){
    if(window.localStorage.getItem('userID') != null){
        return true;
    }
    else{
        return false;
    }

}

function ajaxCalls(type, url, data)
{
    url = 'http://127.0.0.1:5000/' + url
    $.ajax({
        type: type,
        url: "http://127.0.0.1:5000/checkEmail",
        contentType: "application/json",
        dataType: "json",
        data: data,
        success: function(data){
            return data
        }
    })

}