// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your Javascript code.

var addusers = function () {
    $("#msg").html("");
    $("#error").addClass('hidden');
    if (document.getElementById("first-name").value == "") {
        $("#msg").html("Please enter the First Name");
        $("#error").removeClass('hidden');
        $("#first-name").focus();
        setInterval(function () { ClearAll(); }, 10000);
        return false;
    }

    if (document.getElementById("last-name").value == "") {
        $("#msg").html("Please enter the Last Name");
        $("#error").removeClass('hidden');
        $("#last-name").focus();
        setInterval(function () { ClearAll(); }, 10000);
        return false;
    }

    if (document.getElementById("exampleAddress").value == "") {
        $("#msg").html("Please enter the address");
        $("#error").removeClass('hidden');
        $("#exampleAddress").focus();
        setInterval(function () { ClearAll(); }, 10000);
        return false;
    }

    if (document.getElementById("exampleCity").value == "") {
        $("#msg").html("Pease enter the city");
        $("#error").removeClass('hidden');
        $("#exampleCity").focus();
        setInterval(function () { ClearAll(); }, 10000);
        return false;
    }

    if (document.getElementById("exampleState").value == "") {
        $("#msg").html("Please enter the state");
        $("#error").removeClass('hidden');
        $("#exampleState").focus();
        setInterval(function () { ClearAll(); }, 10000);
        return false;
    }

    if (document.getElementById("phone").value == "") {
        $("#msg").html("Please enter the phone number");
        $("#error").removeClass('hidden');
        $("#phone").focus();
        setInterval(function () { ClearAll(); }, 10000);
        return false;
    }

    var pix = document.getElementById("exampleFile").files[0];
    if (pix == "") {
        $("#msg").html("Please upload the owner's picture");
        $("#error").removeClass('hidden');
        setInterval(function () { ClearAll(); }, 10000);
        return false;
    }

    $("#processor").removeClass("hidden");
    $("#btnAddUser").addClass("hidden");
    $("#btnAddUser").prop("disabled", true);

    var formdata = new FormData();

    formdata.append("Pix", pix);
    formdata.append("FirstName", document.getElementById("first-name").value);
    formdata.append("LastName", document.getElementById("last-name").value);
    formdata.append("Address", document.getElementById("exampleAddress").value);
    formdata.append("City", document.getElementById("exampleCity").value);
    formdata.append("State", document.getElementById("exampleState").value);
    formdata.append("Phone", document.getElementById("phone").value);
    formdata.append("AgentId", localStorage.getItem("agentid"));

    $("#btnAddUser").prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "/Users/addusers",
        contentType: false,
        processData: false,
        data: formdata,
        success: function (data) {
            setInterval(function () { ClearAll(); }, 10000);
            
            if (data == 0) {
                $("#msg").html("Something went wrong. Please try again");
                $("#error").removeClass('hidden');
                $("#processor").addClass("hidden");
                $("#btnAddUser").removeClass("hidden");
                $("#btnAddUser").prop("disabled", false);
            } else {
                localStorage.setItem("clientid", data);
                location.href = "/users/vehicle?id=" + data;;
            }
        },
        error: function (req, status, error) {
            setInterval(function () { ClearAll(); }, 10000);
            $("#msg").html("Something went wrong. Please try again");
            $("#error").removeClass('hidden');
            $("#processor").addClass("hidden");
            $("#btnAddUser").removeClass("hidden");
            $("#btnAddUser").prop("disabled", false);
        }
    });
}


function AddVehicle() {
    if (document.getElementById("itemType").value == "") {
        $("#msg").html("Please select the item type");
        $("#error").removeClass('hidden');
        $("#itemType").focus();
        setInterval(function () { ClearAll(); }, 10000);
        return false;
    }

    if (document.getElementById("plate-number").value == "") {
        $("#msg").html("Please enter the plate number");
        $("#error").removeClass('hidden');
        $("#plate-number").focus();
        setInterval(function () { ClearAll(); }, 10000);
        return false;
    }

    if (document.getElementById("chasis-number").value == "") {
        $("#msg").html("Please enter the chasis number");
        $("#error").removeClass('hidden');
        $("#chasis-number").focus();
        setInterval(function () { ClearAll(); }, 10000);
        return false;
    }

    var pix = document.getElementById("exampleFile").files[0];
    if (pix == "") {
        return false;
    }

    var _query = location.search.split('='); 
    localStorage.setItem("clientid", _query[1]);

    $("#processor").removeClass("hidden");
    $("#btnAddVehicle").addClass("hidden");
    $("#btnAddVehicle").prop("disabled", true);

    var formdata = new FormData();

    formdata.append("Photo", pix);
    formdata.append("itemType", document.getElementById("itemType").value);
    formdata.append("PlateNumber", document.getElementById("plate-number").value);
    formdata.append("ChasisNumber", document.getElementById("chasis-number").value);
    formdata.append("UserId", _query[1]);

    $("#btnAddVehicle").prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "/Users/additems",
        contentType: false,
        processData: false,
        data: formdata,
        success: function (data) {
            setInterval(function () { ClearAll(); }, 10000);
            if (data == 0) {
                $("#msg").html("Something went wrong. Please try again");
                $("#error").removeClass('hidden');
                $("#processor").addClass("hidden");
                $("#btnAddVehicle").removeClass("hidden");
                $("#btnAddVehicle").prop("disabled", false);
            } else {

                location.href = "/users/details?id=" + localStorage.getItem("clientid");
            }
        },
        error: function (req, status, error) {
            setInterval(function () { ClearAll(); }, 10000);
            $("#msg").html("Something went wrong. Please try again");
            $("#error").removeClass('hidden');
            $("#processor").addClass("hidden");
            $("#btnAddVehicle").removeClass("hidden");
            $("#btnAddVehicle").prop("disabled", false);
        }
    });
}

var addagents = function () {

    $("#error").html("");
    if (document.getElementById("first-name").value == "") {
        return false;
    }

    if (document.getElementById("last-name").value == "") {
        return false;
    }

    if (document.getElementById("login_name").value == "") {
        return false;
    }

    if (document.getElementById("password").value == "") {
        return false;
    }

    if (document.getElementById("repassword").value == "") {
        return false;
    }
    if (document.getElementById("password").value != document.getElementById("repassword").value) {
        return false;
    }
    if (document.getElementById("phone").value == "") {
        return false;
    }
    var pix = document.getElementById("exampleFile").files[0];
    if (pix == "") {
        return false;
    }

    $("#processor").removeClass("hidden");
    $("#btnRegisterUser").addClass("hidden");

    var formdata = new FormData();

    formdata.append("Pix", pix);
    formdata.append("FirstName", document.getElementById("first-name").value);
    formdata.append("LastName", document.getElementById("last-name").value); 
    formdata.append("LoginName", document.getElementById("login_name").value);
    formdata.append("Password", document.getElementById("password").value); 
    formdata.append("Phone", document.getElementById("phone").value); 
    formdata.append("Admin", document.getElementById("usertype").value); 

    $("#btnRegisterUser").prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "/Users/addagent",
        contentType: false,
        processData: false,
        data: formdata,
        success: function (data) {
            setInterval(function () { ClearAll(); }, 10000);
            if (!data) {
                $("#msg").html("User name may already be in use. Please try again"); 
                $("#error").removeClass('hidden');
                $("#success").addClass('hidden');
                $("#processor").addClass("hidden");
                $("#btnRegisterUser").removeClass("hidden");
                $("#btnRegisterUser").prop("disabled", false);
            } else {

                $("#msgs").html("User successfully registered!");
                $("#success").removeClass('hidden');
                $("#error").addClass('error');
                $("#processor").addClass("hidden");
                $("#btnRegisterUser").removeClass("hidden");
                $("#btnRegisterUser").prop("disabled", false);
                //location.href = "/admin";
            }
        },
        error: function (req, status, error) {
            setInterval(function () { ClearAll(); }, 10000);
            $("#msg").html("User name may already be in use. Please try again"); 
            $("#error").removeClass('hidden');
            $("#success").addClass('hidden');
            $("#processor").addClass("hidden");
            $("#btnRegisterUser").removeClass("hidden");
            $("#btnRegisterUser").prop("disabled", false);
        }
    });
}

function ClearAll() {
    $("#error").addClass('hidden');
    $("#success").addClass('hidden');
    $("#processor").addClass("hidden");
}

var agentLogin = function () {
    if (document.getElementById("login_name").value == "") {
        return false;
    }

    if (document.getElementById("password").value == "") {
        return false;
    }

    $("#processor").removeClass("hidden");
    $("#btnLoginUser").addClass("hidden");
    var _data = {
        LoginName: document.getElementById("login_name").value,
        Password: document.getElementById("password").value
    };
     
    $("#btnLoginUser").prop("disabled", true);
    $.ajax({
        type: "GET",
        url: "/Users/login", 
        data: _data,
        success: function (data) {
            setInterval(function () { ClearAll(); }, 10000);
            if (data == 0) {
                $("#msg").html("Invalid username or password. Please try again"); 
                $("#error").removeClass('hidden');
                $("#processor").addClass("hidden");
                $("#btnLoginUser").removeClass("hidden");
                $("#btnLoginUser").prop("disabled", false);
            } else {

                data.forEach(item => {
                    localStorage.setItem("agentid", item.id);
                    localStorage.setItem("agentpix", item.photo);
                    localStorage.setItem("agentname", item.firstName + " " + item.lastName);
                    if (item.admin == "admin") {
                        location.href = "/admin";
                    } else {
                        if (item.admin == "agent") {
                            location.href = "/agent";
                        } else {
                            $("#msg").html("Invalid username or password. Please try again");
                            $("#error").removeClass('hidden');
                            $("#processor").addClass("hidden");
                            $("#btnLoginUser").removeClass("hidden");
                            $("#btnLoginUser").prop("disabled", false);
                        }
                    }
                    
                });
                
            }
        },
        error: function (req, status, error) {
            setInterval(function () { ClearAll(); }, 10000);
            $("#msg").html("Invalid username or password. Please try again");
            $("#error").removeClass('hidden');
            $("#processor").addClass("hidden");
            $("#btnLoginUser").removeClass("hidden");
            $("#btnLoginUser").prop("disabled", false);
        }
    });
}

var forgotLogin = function () {
    $("#error").addClass('hidden');
    $("#success").addClass('hidden');

    if (document.getElementById("login_name").value == "") {
        $("#msg").html("please enter your email address");
        $("#error").removeClass('hidden');
        setInterval(function () { ClearAll(); }, 10000);
        return false;
    } 

    $("#processor").removeClass("hidden");
    $("#btnForgot").addClass("hidden");
    var _data = {
        LoginName: document.getElementById("login_name").value 
    };

    $("#btnForgot").prop("disabled", true);
    $.ajax({
        type: "GET",
        url: "/Users/Forgot",
        data: _data,
        success: function (data) {
            setInterval(function () { ClearAll(); }, 10000);
            $("#msgs").html("Password reset details has been sent to your email address");
            $("#success").removeClass('hidden');
            $("#processor").addClass("hidden");
            $("#btnForgot").removeClass("hidden");
            $("#btnForgot").prop("disabled", false);
        },
        error: function (req, status, error) {
            setInterval(function () { ClearAll(); }, 10000);
            $("#msg").html("Something went wrong. Please try again");
            $("#error").removeClass('hidden');
            $("#processor").addClass("hidden");
            $("#btnForgot").removeClass("hidden");
            $("#btnForgot").prop("disabled", false);
        }
    });
}

var ConfirmCode = function () {
    if (document.getElementById("login_name").value == "") {
        $("#msg").html("please enter your email address");
        $("#error").removeClass('hidden');
        setInterval(function () { ClearAll(); }, 10000);
        return false;
    }
    if (document.getElementById("code_name").value == "") {
        $("#msg").html("please enter the confirmation code sent to your email address");
        $("#error").removeClass('hidden');
        setInterval(function () { ClearAll(); }, 10000);
        return false;
    }

    $("#processor").removeClass("hidden");
    $("#btnForgot").addClass("hidden");
    var _data = {
        LoginName: document.getElementById("login_name").value,
        ConfirmationCode: document.getElementById("code_name").value
    };
    var _codec = document.getElementById("code_name").value;
    $("#btnForgot").prop("disabled", true);
    $.ajax({
        type: "GET",
        url: "/Users/ConfirmCode",
        data: _data,
        success: function (data) {
            setInterval(function () { ClearAll(); }, 10000);
            if (data == true) {
                location.href = "/account/changepassword?code=" + _codec;
            } else {
                $("#msg").html("Invalid Credentials. Please supply valid credentials");
                $("#error").removeClass('hidden');
                $("#processor").addClass("hidden");
                $("#btnForgot").removeClass("hidden");
                $("#btnForgot").prop("disabled", false);
            }
        },
        error: function (req, status, error) {
            setInterval(function () { ClearAll(); }, 10000);
            $("#msg").html("Something went wrong. Please try again");
            $("#error").removeClass('hidden');
            $("#processor").addClass("hidden");
            $("#btnForgot").removeClass("hidden");
            $("#btnForgot").prop("disabled", false);
        }
    });
}


var ChangePassword = function () {
    if (document.getElementById("pass").value == "") {
        $("#msg").html("please enter your new password");
        $("#error").removeClass('hidden');
        setInterval(function () { ClearAll(); }, 10000);
        return false;
    }
    if (document.getElementById("pass_c").value == "") {
        $("#msg").html("please confirm your new password");
        $("#error").removeClass('hidden');
        setInterval(function () { ClearAll(); }, 10000);
        return false;
    }
    var pass = document.getElementById("pass").value;
    var pass_c = document.getElementById("pass_c").value;

    if (pass != pass_c) {
        $("#msg").html("Your new password and it's confirmation do not match");
        $("#error").removeClass('hidden');
        setInterval(function () { ClearAll(); }, 10000);
        return false;
    }

    var _query = location.search.split('=');
    var _code = _query[1];

    $("#processor").removeClass("hidden");
    $("#btnForgot").addClass("hidden");
    var _data = {
        Password: pass,
        ConfirmationCode: _code
    }; 
    $("#btnForgot").prop("disabled", true);
    $.ajax({
        type: "GET",
        url: "/Users/ChangePassword",
        data: _data,
        success: function (data) {
            setInterval(function () { ClearAll(); }, 10000);
            if (data == true) {
                location.href = "/account";
            } else {
                $("#msg").html("Invalid Credentials. Please supply valid credentials");
                $("#error").removeClass('hidden');
                $("#processor").addClass("hidden");
                $("#btnForgot").removeClass("hidden");
                $("#btnForgot").prop("disabled", false);
            }
        },
        error: function (req, status, error) {
            setInterval(function () { ClearAll(); }, 10000);
            $("#msg").html("Something went wrong. Please try again");
            $("#error").removeClass('hidden');
            $("#processor").addClass("hidden");
            $("#btnForgot").removeClass("hidden");
            $("#btnForgot").prop("disabled", false);
        }
    });
}


var logout = function () {
    localStorage.clear();
    location.href = "/";
}

var search = function () { 
    var srcText = document.getElementById("txtSearch").value;
     
    if (srcText != "") {
         $("#processor").removeClass("hidden");
         $("#error").html("");
        $.ajax({
            
            type: "GET",
            url: "/Home/search/",
            contentType: "application/json; charset=utf-8",
            data: { TagNumber: document.getElementById("txtSearch").value },
            dataType: "json",
            success: function (data) {
                console.log(data);
                if (data.length != 0) {
                    var htm = "";
                    $("#tbody").html(htm);
                    var i = 1;
                    data.forEach(item => {

                        $("#firstname").html(item.firstName);
                        $("#lastname").html(item.lastName);
                        $("#state").html("State: " + item.state);
                        $("#city").html("City: " + item.city);
                        $("#phone").html("Phone: " + item.phone);

                        $("#my_img").attr("src", "/uploads/" + item.pix);
                        $("#car_img").attr("src", "/uploads/" + item.photo); 

                        htm += "<tr>"
                        htm += "<th scope='row'>" + i + "</th>";
                        htm += "<td>" + item.tagNumber + "</td>"
                        htm += "<td>" + item.itemType + "</td>"
                        if (item.paid) {
                            if (item.expired == "Expired") {
                                htm += "<td><a class='badge badge-danger' href='#'>" + item.expired + "</a></td>"
                            } else {
                                htm += "<td><span  class='badge badge-info'>" + item.expired + "</span></td>"
                            }
                        } else {
                            htm += "<td><a  class='badge badge-warning' href='#'> Not Paid </a></td>"
                        }

                        htm += "</tr> "
                        i++;
                    });
                    $("#tbody").append(htm);
                    $("#searchTag").removeClass('hidden');
                    $("#processor").addClass("hidden");
                } else {
                    $("#tbody").html("");
                    $("#searchTag").addClass('hidden');
                    $("#error").html("No Item found for the Tag Number. Please try again");
                    $("#processor").addClass("hidden");
                    $("#btnSearch").removeClass("hidden");
                    $("#btnSearch").prop("disabled", false);
                }
            },
            error: function (req, status, error) {
                $("#tbody").html("");
                $("#searchTag").addClass('hidden');
                $("#error").html("No Item found for the Tag Number. Please try again");
                $("#processor").addClass("hidden");
                $("#btnSearch").removeClass("hidden");
                $("#btnSearch").prop("disabled", false);
            }
        });
    }
}


var agentSearch = function () { 
    var srcText = document.getElementById("txtSearch").value;
     
    if (srcText != "") {
        $("#processor").removeClass("hidden");
        $("#searchTag").addClass('hidden');
         $("#error").html("");
        $.ajax({
            
            type: "GET",
            url: "/Users/searcher/",
            contentType: "application/json; charset=utf-8",
            data: { TagNumber: document.getElementById("txtSearch").value },
            dataType: "json",
            success: function (data) {
                console.log(data);
                if (data.length > 0) {
                    var htm = "";
                    $("#tbody").html(htm);
                    var i = 1;
                    data.forEach(item => {

                        $("#firstname").html(item.firstName);
                        $("#lastname").html(item.lastName);
                        $("#state").html("State: " + item.state);
                        $("#city").html("City: " + item.city);
                        $("#phone").html("Phone: " + item.phone);

                        $("#my_img").attr("src", "/uploads/" + item.pix);
                        $("#car_img").attr("src", "/uploads/" + item.photo); 

                        htm += "<tr>"
                        htm += "<th scope='row'>" + i + "</th>";
                        htm += "<td>" + item.tagNumber + "</td>"
                        htm += "<td>" + item.itemType + "</td>"
                        if (item.paid) {
                            if (item.expired == "Expired") {
                                htm += "<td><a class='badge badge-danger' href='/users/details?id=" + item.id + "'>" + item.expired + "</a></td>"
                            } else {
                                htm += "<td><span  class='badge badge-info'>" + item.expired + "</span></td>"
                            }
                        } else {
                            htm += "<td><a  class='badge badge-warning' href='/users/details?id=" + item.id + "'> Not Paid </a></td>"
                        }

                        htm += "</tr> "
                        i++;
                    });
                    $("#tbody").append(htm);
                    $("#searchTag").removeClass('hidden');
                    $("#processor").addClass("hidden");  
                } else {
                    $("#tbody").html(""); 
                    $("#searchTag").addClass('hidden');
                    $("#error").html("No Item found for the Tag Number. Please try again");
                    $("#processor").addClass("hidden");
                    $("#btnSearch").removeClass("hidden");
                    $("#btnSearch").prop("disabled", false);
                }
            },
            error: function (req, status, error) {
                $("#tbody").html("");
                $("#searchTag").addClass('hidden');
                $("#error").html("No Item found for the Tag Number. Please try again");
                $("#processor").addClass("hidden");
                $("#btnSearch").removeClass("hidden");
                $("#btnSearch").prop("disabled", false);
            }
        });
    }
}



var adminSearch = function () {
    var srcText = document.getElementById("txtSearch").value;

    if (srcText != "") {
        $("#processor").removeClass("hidden");
        $("#searchTag").addClass('hidden');
        $("#error").html("");
        $.ajax({

            type: "GET",
            url: "/Users/AdminSearcher/",
            contentType: "application/json; charset=utf-8",
            data: { TagNumber: document.getElementById("txtSearch").value },
            dataType: "json",
            success: function (data) {
                console.log(data);
                if (data.length > 0) {
                    var htm = "";
                    $("#tbody").html(htm);
                    var i = 1;
                    data.forEach(item => {

                        $("#firstname").html(item.firstName);
                        $("#lastname").html(item.lastName);
                        $("#state").html("State: " + item.state);
                        $("#city").html("City: " + item.city);
                        $("#phone").html("Phone: " + item.phone);

                        $("#my_img").attr("src", "/uploads/" + item.pix);
                        $("#car_img").attr("src", "/uploads/" + item.photo); 

                        htm += "<tr>"
                        htm += "<th scope='row'>" + i + "</th>";
                        htm += "<td>" + item.tagNumber + "</td>"
                        htm += "<td>" + item.itemType + "</td>"
                        if (item.paid) {
                            if (item.expired == "Expired") {
                                htm += "<td><a class='badge badge-danger' href='/users/details?id=" + item.id + "'>" + item.expired + "</a></td>"
                            } else {
                                htm += "<td><span  class='badge badge-info'>" + item.expired + "</span></td>"
                            }
                        } else {
                            htm += "<td><a  class='badge badge-warning' href='/users/details?id=" + item.id + "'> Not Paid </a></td>"
                        }

                        htm += "</tr> "
                        i++;
                    });
                    $("#tbody").append(htm);
                    $("#searchTag").removeClass('hidden');
                    $("#processor").addClass("hidden");
                } else {
                    $("#tbody").html("");
                    $("#searchTag").addClass('hidden');
                    $("#error").html("No Item found for the Tag Number. Please try again");
                    $("#processor").addClass("hidden");
                    $("#btnSearch").removeClass("hidden");
                    $("#btnSearch").prop("disabled", false);
                }
            },
            error: function (req, status, error) {
                $("#tbody").html("");
                $("#searchTag").addClass('hidden');
                $("#error").html("No Item found for the Tag Number. Please try again");
                $("#processor").addClass("hidden");
                $("#btnSearch").removeClass("hidden");
                $("#btnSearch").prop("disabled", false);
            }
        });
    }
}

if ($("#cashout").length > 0) {
    $("#processor").removeClass("hidden"); 
    $.ajax({
        type: "GET",
        url: "/admin/getcashouts/",
        contentType: "application/json; charset=utf-8",
        
        dataType: "json",
        success: function (data) {
            console.log(data);
            if (data == 0) {
                $("#processor").addClass("hidden"); 
            } else {
                var htm = "";
                var i = 1;
                data.forEach(item => {
                     
                    htm += "<tr>"
                    htm += "<th scope='row'>" + i + "</th>";
                    htm += "<td>" + item.name + "</td>"
                    htm += "<td>" + item.date + "</td>"
                    htm += "<td>" + item.amount + "</td>"
                    htm += "<td>" + item.paid + "</td>"
                    htm += "<td><a class='badge badge-danger' href='javascript: setPaid(" + item.id + ");'>Set As Paid</a></td>"
                         
                    htm += "</tr> "
                    i++;
                });
                $("#tbody").append(htm);
                $("#processor").addClass("hidden"); 
            }
        },
        error: function (req, status, error) {
            $("#processor").addClass("hidden");
            $("#btnAddVehicle").removeClass("hidden");
            $("#btnAddVehicle").prop("disabled", false);
        }
    });
}

function setPaid(id) {
    $.ajax({

        type: "GET",
        url: "/admin/setpaid/",
        data: { Id: id },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            location.reload();
        },
        error: function (req, status, error) {
            location.reload();
        }
    });
}

if ($("#userdetails").length > 0) {
    var _query = location.search.split('=');
    console.log(_query);
    localStorage.setItem("clientid", _query[1]);
    display(_query[1]);
}

function display(id) {
    $("#processor").removeClass("hidden");
    $.ajax({
        type: "GET",
        url: "/Users/getuseritems/",
        contentType: "application/json; charset=utf-8",
        data: { id: id },
        dataType: "json",
        success: function (data) {
            console.log(data);
            if (data == 0) {
                $("#processor").addClass("hidden");
                $("#btnAddVehicle").removeClass("hidden");
                $("#btnAddVehicle").prop("disabled", false);
            } else {
                var htm = "";
                var i = 1;
                data.forEach(item => {

                    $("#firstname").html(item.firstName);
                    $("#lastname").html(item.lastName);
                    $("#state").html("State: " + item.state);
                    $("#city").html("City: " + item.city);
                    $("#phone").html("Phone: " + item.phone);

                    $("#my_img").attr("src", "/uploads/" + item.pix);

                    htm += "<tr>"
                    htm += "<th scope='row'>" + i + "</th>";
                    htm += "<td>" + item.tagNumber + "</td>"
                    htm += "<td>" + item.itemType + "</td>"
                    if (item.paid) {
                        if (item.expired == "Expired") {
                            htm += "<td><a class='badge badge-danger' href='javascript: payWithPaystack(" + item.itemId + ");'>" + item.expired + "</a></td>"
                        } else {
                            htm += "<td><span  class='badge badge-info'>" + item.expired + "</span></td>"
                        }
                    } else {
                        htm += "<td><a  class='badge badge-warning' href='javascript: payWithPaystack(" + item.itemId + ");'> Not Paid </a></td>"
                    }

                    htm += "</tr> "
                    i++;
                });
                $("#ubody").append(htm);
                $("#processor").addClass("hidden");
            }
        },
        error: function (req, status, error) {
            $("#processor").addClass("hidden");
            $("#btnAddVehicle").removeClass("hidden");
            $("#btnAddVehicle").prop("disabled", false);
        }
    });

}

if ($("#admindet").length > 0) {
    var _query = location.search.split('=');
    console.log(_query);
    localStorage.setItem("clientid", _query[1]);
    Admindisplay(_query[1]);
}

function Admindisplay(id) {
    $("#processor").removeClass("hidden");
    $.ajax({
        type: "GET",
        url: "/Users/getuseritems/",
        contentType: "application/json; charset=utf-8",
        data: { id: id },
        dataType: "json",
        success: function (data) {
            console.log(data);
            if (data == 0) {
                $("#processor").addClass("hidden");
                $("#btnAddVehicle").removeClass("hidden");
                $("#btnAddVehicle").prop("disabled", false);
            } else {
                var htm = "";
                var i = 1;
                data.forEach(item => {

                    $("#firstname").html(item.firstName);
                    $("#lastname").html(item.lastName);
                    $("#state").html("State: " + item.state);
                    $("#city").html("City: " + item.city);
                    $("#phone").html("Phone: " + item.phone);
                    $("#address").html("Address: " + item.address);
                     

                    $("#my_img").attr("src", "/uploads/" + item.pix);

                    htm += "<tr>"
                    htm += "<th scope='row'>" + i + "</th>";
                    htm += "<td><img src='/uploads/" + item.photo + "' height='150' width='150' class='rounded-circle'/></td>"
                    htm += "<td>" + item.tagNumber + "</td>"
                    htm += "<td>" + item.itemType + "</td>"
                    htm += "<td>" + item.chasis + "</td>"
                    htm += "<td>" + item.plate + "</td>"
                    htm += "<td>" + item.agentName + "</td>"
                    htm += "<td>" + item.agentPhone + "</td>"
                    if (item.paid) {
                        if (item.expired == "Expired") {
                            htm += "<td><a class='badge badge-danger' href='javascript: payWithPaystack(" + item.itemId + ");'>" + item.expired + "</a></td>"
                        } else {
                            htm += "<td><span  class='badge badge-info'>" + item.expired + "</span></td>"
                        }
                    } else {
                        htm += "<td><a  class='badge badge-warning' href='javascript: payWithPaystack(" + item.itemId + ");'> Not Paid </a></td>"
                    }

                    htm += "</tr> "
                    i++;
                });
                $("#tbody").append(htm);
                $("#processor").addClass("hidden");
            }
        },
        error: function (req, status, error) {
            $("#processor").addClass("hidden");
            $("#btnAddVehicle").removeClass("hidden");
            $("#btnAddVehicle").prop("disabled", false);
        }
    });

}
const _key = "pk_test_eda062a81ed9102f087935cbf3d78dbbe5297105";

function payWithPaystack(id) {

    var email = 'test@mail.com';
    var price = 1000;

    var handler = PaystackPop.setup({
        key: _key, // Replace with your public key
        email: email,//document.getElementById("email-address").value,
        amount: price * 100,
        //firstname: first,//document.getElementById("first-name").value,
        //lastname: last,//document.getElementById("first-name").value,
        ref: '' + Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
        // label: "Optional string that replaces customer email"
        onClose: function () {

        },
        callback: function (response) {

            processPayment(id);
        }
    });

    handler.openIframe();
}

function processPayment(id) {
    
    $.ajax({
        type: "PUT",
        url: "/Users/setPayment/" + id,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            console.log(data);

            location.reload();
        },
        error: function (req, status, error) {

        }
    });
}


if ($("#admin").length > 0) {
    $("#processor").removeClass('hidden');
    displayAdminExisting();
    $.ajax({
        type: "GET",
        url: "/admin/GetAdminDashBoardInfo/",
        contentType: "application/json; charset=utf-8",
        //data: { id: agentid },
        dataType: "json",
        success: function (data) {
            console.log(data);
            data.forEach(item => {
                $("#totalIncome").html(item.accrued);
                $("#totalActive").html(item.activeCustomers);
                $("#totalClients").html(item.customers);
            });
            $("#processor").addClass("hidden"); 
        },
        error: function (req, status, error) {
            $("#processor").addClass("hidden");
        }
    });
}


function displayAdminExisting() {
    $("#processor").removeClass("hidden");
    $.ajax({
        type: "GET",
        url: "/admin/GetAllForAdmin/",
        contentType: "application/json; charset=utf-8", 
        dataType: "json",
        success: function (data) {
            console.log(data);
            if (data == 0) {
                $("#processor").addClass("hidden"); 
            } else {
                var htm = "";
                var i = 1;
                data.forEach(item => {

                    htm += "<tr>"
                    htm += "            <td class='text-center text-muted'>#" + i + "</td>"
                    htm += "            <td>"
                    htm += "                <div class='widget-content p-0'>"
                    htm += "                    <div class='widget-content-wrapper'>"
                    htm += "                        <div class='widget-content-left mr-3'>"
                    htm += "                            <div class='widget-content-left'>"
                    htm += "                                <img height='40' width='40' class='rounded-circle' src='/uploads/" + item.photo + "' alt=''>"
                    htm += "                            </div>"
                    htm += "                        </div>"
                    htm += "                        <div class='widget-content-left flex2'>"
                    htm += "                            <div class='widget-heading'>" + item.firstName + " " + item.lastName + "</div>" 
                    htm += "                        </div>"
                    htm += "                    </div>"
                    htm += "                </div>"
                    htm += "            </td>"
                    htm += "            <td class='text-center'>" + item.phone + "</td>"
                     
                    htm += "            <td class='text-center'>" + item.expired + "</td>"
                    if (item.expired == "Active") {
                        htm += "<td class='text-center'><a href='javascript: disableAgent(" + item.id + ");' class='badge badge-success'>Disable Agent</a></td>"
                    } else {
                        htm += "<td class='text-center'><a href='javascript: enableAgent(" + item.id + ");' class='badge badge-warning'>Enable Agent</a></td>"
                    }
                    htm += "<td class='text-center'><a href='/admin/client?id=" + item.id + "' class=''>View Client</a></td>"
                    htm += "        </tr>"
                    i++;
                });
                $("#tbody").append(htm);
                $("#processor").addClass('hidden');
            }
        },
        error: function (req, status, error) {
            $("#processor").addClass("hidden"); 
        }
    });

}

function disableAgent(id) {
    $("#processor").removeClass("hidden");
        $.ajax({

            type: "GET",
            url: "/admin/disableagent/",
            data: { Id: id },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                location.reload();
            },
            error: function (req, status, error) {
                location.reload();
            }
        });
   
}

function enableAgent(id) {
    $("#processor").removeClass("hidden");
        $.ajax({

            type: "GET",
            url: "/admin/enableagent/",
            data: { Id: id },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                location.reload();
            },
            error: function (req, status, error) {
                location.reload();
            }
        });
    
}

if ($("#client").length > 0) {
    $("#processor").removeClass("hidden"); 
    var _query = location.search.split('='); 
    $.ajax({
        type: "GET",
        url: "/Admin/GetAgentClient/",
        contentType: "application/json; charset=utf-8",
        data: { Id: _query[1] },
        dataType: "json",
        success: function (data) {
            console.log(data);
            if (data == 0) {
                $("#processor").addClass("hidden"); 
            } else {
                var htm = "";
                var i = 1;
                data.forEach(item => {

                    
                    $("#agent").html("Agent: " + item.agentName);  

                    htm += "<tr>"
                    htm += "<th scope='row'>" + i + "</th>";
                    htm += "<td>" + item.firstName + " " + item.lastName+"</td>"
                    htm += "<td>" + item.phone + "</td>"
                    htm += "<td>" + item.state + "</td>"
                    htm += "<td>" + item.city + "</td>"
                    htm += "<td>" + item.address + "</td>"
                    htm += "<td class='text-center'><a href='/admin/details?id=" + item.id + "' class=''>View Items</a></td>"
                    htm += "</tr> "
                    i++;
                });
                $("#tbody").append(htm);
                $("#processor").addClass("hidden"); 
            }
        },
        error: function (req, status, error) {
            $("#processor").addClass("hidden"); 
        }
    });
}


if ($("#board").length > 0) {

    var agentid = localStorage.getItem("agentid");
    displayAgentClients(agentid);
    $.ajax({
        type: "GET",
        url: "/Users/GetDashBoardInfo/",
        contentType: "application/json; charset=utf-8",
        data: { id: agentid },
        dataType: "json",
        success: function (data) {
            console.log(data);
            data.forEach(item => {
                $("#totalIncome").html(item.accrued);
                $("#totalActive").html(item.activeCustomers);
                $("#totalClients").html(item.customers);
            });
        }
    });
}

function displayAgentClients(id) {
    $("#processor").removeClass("hidden");
    $.ajax({
        type: "GET",
        url: "/Users/GetAllAgentClients/",
        contentType: "application/json; charset=utf-8",
        data: { id: id },
        dataType: "json",
        success: function (data) {
            console.log(data);
            if (data == 0) {
                $("#processor").addClass("hidden");
                $("#btnAddVehicle").removeClass("hidden");
                $("#btnAddVehicle").prop("disabled", false);
            } else {
                var htm = "";
                var i = 1;
                data.forEach(item => {

                    htm += "<tr>"
                    htm += "            <td class='text-center text-muted'>#" + i + "</td>"
                    htm += "            <td>"
                    htm += "                <div class='widget-content p-0'>"
                    htm += "                    <div class='widget-content-wrapper'>"
                    htm += "                        <div class='widget-content-left mr-3'>"
                    htm += "                            <div class='widget-content-left'>"
                    htm += "                                <img height='40' width='40' class='rounded-circle' src='/uploads/" + item.pix + "' alt=''>"
                    htm += "                            </div>"
                    htm += "                        </div>"
                    htm += "                        <div class='widget-content-left flex2'>"
                    htm += "                            <div class='widget-heading'>" + item.firstName + " " + item.lastName + "</div>"
                    htm += "                            <div class='widget-subheading opacity-7'>" + item.state + " " + item.city + "</div>"
                    htm += "                        </div>"
                    htm += "                    </div>"
                    htm += "                </div>"
                    htm += "            </td>"
                    htm += "            <td class='text-center'>"+ item.phone + "</td>"
                    htm += "            <td class='text-center'>"
                    htm += "                <a href='/users/details?id=" + item.id + "' id='PopoverCustomT-1' class='btn btn-primary btn-sm'>View Items</a>"
                    htm += "            </td>"
                    htm += "        </tr>"
                    i++;
                });
                $("#tbody").append(htm);
                $("#processor").addClass("hidden");
            }
        },
        error: function (req, status, error) {
            $("#processor").addClass("hidden");
            $("#btnAddVehicle").removeClass("hidden");
            $("#btnAddVehicle").prop("disabled", false);
        }
    });

}

if ($("#existing").length > 0) {

    var agentid = localStorage.getItem("agentid");
    displayAgentExisting(agentid);
}

function displayAgentExisting(id) {
    $("#processor").removeClass("hidden");
    $.ajax({
        type: "GET",
        url: "/Users/GetAllExistingAgentUsers/",
        contentType: "application/json; charset=utf-8",
        data: { id: id },
        dataType: "json",
        success: function (data) {
            console.log(data);
            if (data == 0) {
                $("#processor").addClass("hidden");
                $("#btnAddVehicle").removeClass("hidden");
                $("#btnAddVehicle").prop("disabled", false);
            } else {
                var htm = "";
                var i = 1;
                data.forEach(item => {

                    htm += "<tr>"
                    htm += "            <td class='text-center text-muted'>#" + i + "</td>"
                    htm += "            <td>"
                    htm += "                <div class='widget-content p-0'>"
                    htm += "                    <div class='widget-content-wrapper'>"
                    htm += "                        <div class='widget-content-left mr-3'>"
                    htm += "                            <div class='widget-content-left'>"
                    htm += "                                <img height='40' width='40' class='rounded-circle' src='/uploads/" + item.pix + "' alt=''>"
                    htm += "                            </div>"
                    htm += "                        </div>"
                    htm += "                        <div class='widget-content-left flex2'>"
                    htm += "                            <div class='widget-heading'>" + item.firstName + " " + item.lastName + "</div>"
                    htm += "                            <div class='widget-subheading opacity-7'>" + item.state + " " + item.city + "</div>"
                    htm += "                        </div>"
                    htm += "                    </div>"
                    htm += "                </div>"
                    htm += "            </td>"
                    htm += "            <td class='text-center'>" + item.itemType + "</td>"
                    htm += "            <td class='text-center'>"
                    if (item.paid) {
                        if (item.expired == "Expired") {
                            htm += "                <a href='/users/details?id=" + item.id + "' class='badge badge-danger'>" + item.expired + "</a>"
                        } else {
                            htm += "                <div class='badge badge-success'>" + item.expired + "</div>"
                        }
                    } else {
                        htm += "                <a href='/users/details?id=" + item.id + "' class='badge badge-warning'>Not Processed</a>"
                    }

                    htm += "            </td>"
                    htm += "            <td class='text-center'>"
                    htm += "                <a href='/users/details?id=" + item.id + "' id='PopoverCustomT-1' class='btn btn-primary btn-sm'>Details</a>"
                    htm += "            </td>"
                    htm += "        </tr>"
                    i++;
                });
                $("#tbody").append(htm);
                $("#processor").addClass("hidden");
            }
        },
        error: function (req, status, error) {
            $("#processor").addClass("hidden");
            $("#btnAddVehicle").removeClass("hidden");
            $("#btnAddVehicle").prop("disabled", false);
        }
    });

}

if ($("#mexisting").length > 0) {
    $("#processor").removeClass("hidden");
    $.ajax({
        type: "GET",
        url: "/Users/GetAllExistingUsers/",
        contentType: "application/json; charset=utf-8", 
        dataType: "json",
        success: function (data) {
            console.log(data);
            if (data == 0) {
                $("#processor").addClass("hidden");
                $("#btnAddVehicle").removeClass("hidden");
                $("#btnAddVehicle").prop("disabled", false);
            } else {
                var htm = "";
                var i = 1;
                data.forEach(item => {

                    htm += "<tr>"
                    htm += "            <td class='text-center text-muted'>#" + i + "</td>"
                    htm += "            <td>"
                    htm += "                <div class='widget-content p-0'>"
                    htm += "                    <div class='widget-content-wrapper'>"
                    htm += "                        <div class='widget-content-left mr-3'>"
                    htm += "                            <div class='widget-content-left'>"
                    htm += "                                <img height='40' width='40' class='rounded-circle' src='/uploads/" + item.pix + "' alt=''>"
                    htm += "                            </div>"
                    htm += "                        </div>"
                    htm += "                        <div class='widget-content-left flex2'>"
                    htm += "                            <div class='widget-heading'>" + item.firstName + " " + item.lastName + "</div>"
                    htm += "                            <div class='widget-subheading opacity-7'>" + item.state + " " + item.city + "</div>"
                    htm += "                        </div>"
                    htm += "                    </div>"
                    htm += "                </div>"
                    htm += "            </td>"
                    htm += "            <td class='text-center'>" + item.itemType + "</td>"
                    htm += "            <td class='text-center'>"
                    if (item.paid) {
                        if (item.expired == "Expired") {
                            htm += "                <div class='badge badge-danger'>" + item.expired + "</div>"
                        } else {
                            htm += "                <div class='badge badge-success'>" + item.expired + "</div>"
                        }
                    } else {
                        htm += "                <div class='badge badge-warning'>Not Processed</div>"
                    }

                    htm += "            </td>"
                    htm += "            <td class='text-center'>"
                    htm += "                <a href='/admin/details?id=" + item.id + "' id='PopoverCustomT-1' class='btn btn-primary btn-sm'>Details</a>"
                    htm += "            </td>"
                    htm += "        </tr>"
                    i++;
                });
                $("#tbody").append(htm);
                $("#processor").addClass("hidden");
            }
        },
        error: function (req, status, error) {
            $("#processor").addClass("hidden");
            $("#btnAddVehicle").removeClass("hidden");
            $("#btnAddVehicle").prop("disabled", false);
        }
    });

}

if ($("#active").length > 0) {

    var agentid = localStorage.getItem("agentid");
    displayAgentActive(agentid);
}

function displayAgentActive(id) {
    $("#processor").removeClass("hidden");
    $.ajax({
        type: "GET",
        url: "/Users/GetAllExistingAgentUsers/",
        contentType: "application/json; charset=utf-8",
        data: { id: id },
        dataType: "json",
        success: function (data) {
            console.log(data);
            if (data == 0) {
                $("#processor").addClass("hidden");
                $("#btnAddVehicle").removeClass("hidden");
                $("#btnAddVehicle").prop("disabled", false);
            } else {
                var htm = "";
                var i = 1;
                data.forEach(item => {
                    if (item.paid) {
                        if (item.expired != "Expired") {
                            htm += "<tr>"
                            htm += "            <td class='text-center text-muted'>#" + i + "</td>"
                            htm += "            <td>"
                            htm += "                <div class='widget-content p-0'>"
                            htm += "                    <div class='widget-content-wrapper'>"
                            htm += "                        <div class='widget-content-left mr-3'>"
                            htm += "                            <div class='widget-content-left'>"
                            htm += "                                <img height='40' width='40' class='rounded-circle' src='/uploads/" + item.pix + "' alt=''>"
                            htm += "                            </div>"
                            htm += "                        </div>"
                            htm += "                        <div class='widget-content-left flex2'>"
                            htm += "                            <div class='widget-heading'>" + item.firstName + " " + item.lastName + "</div>"
                            htm += "                            <div class='widget-subheading opacity-7'>" + item.state + " " + item.city + "</div>"
                            htm += "                        </div>"
                            htm += "                    </div>"
                            htm += "                </div>"
                            htm += "            </td>"
                            htm += "            <td class='text-center'>" + item.itemType + "</td>"
                            htm += "            <td class='text-center'>"

                            htm += "                <a href='/users/details?id=" + item.id + "' class='badge badge-success'>" + item.expired + "</a>"

                            htm += "            </td>"
                            htm += "            <td class='text-center'>"
                            htm += "                <a href='/users/details?id=" + item.id + "' id='PopoverCustomT-1' class='btn btn-primary btn-sm'>Details</a>"
                            htm += "            </td>"
                            htm += "        </tr>"
                            i++;
                        }
                    }
                });
                $("#tbody").append(htm);
                $("#processor").addClass("hidden");
            }
        },
        error: function (req, status, error) {
            $("#processor").addClass("hidden");
            $("#btnAddVehicle").removeClass("hidden");
            $("#btnAddVehicle").prop("disabled", false);
        }
    });

}

if ($("#mactive").length > 0) {
    $("#processor").removeClass("hidden");
    $.ajax({
        type: "GET",
        url: "/Users/GetAllUsers",
        contentType: "application/json; charset=utf-8", 
        dataType: "json",
        success: function (data) {
            console.log(data);
            if (data == 0) {
                $("#processor").addClass("hidden");
                $("#btnAddVehicle").removeClass("hidden");
                $("#btnAddVehicle").prop("disabled", false);
            } else {
                var htm = "";
                var i = 1;
                data.forEach(item => {
                    if (item.paid) {
                        if (item.expired != "Expired") {
                            htm += "<tr>"
                            htm += "            <td class='text-center text-muted'>#" + i + "</td>"
                            htm += "            <td>"
                            htm += "                <div class='widget-content p-0'>"
                            htm += "                    <div class='widget-content-wrapper'>"
                            htm += "                        <div class='widget-content-left mr-3'>"
                            htm += "                            <div class='widget-content-left'>"
                            htm += "                                <img height='40' width='40' class='rounded-circle' src='/uploads/" + item.pix + "' alt=''>"
                            htm += "                            </div>"
                            htm += "                        </div>"
                            htm += "                        <div class='widget-content-left flex2'>"
                            htm += "                            <div class='widget-heading'>" + item.firstName + " " + item.lastName + "</div>"
                            htm += "                            <div class='widget-subheading opacity-7'>" + item.state + " " + item.city + "</div>"
                            htm += "                        </div>"
                            htm += "                    </div>"
                            htm += "                </div>"
                            htm += "            </td>"
                            htm += "            <td class='text-center'>" + item.itemType + "</td>"
                            htm += "            <td class='text-center'>"

                            htm += "                <div class='badge badge-success'>" + item.expired + "</div>"

                            htm += "            </td>"
                            htm += "            <td class='text-center'>"
                            htm += "                <a href='/admin/details?id=" + item.id + "' id='PopoverCustomT-1' class='btn btn-primary btn-sm'>Details</a>"
                            htm += "            </td>"
                            htm += "        </tr>"
                            i++;
                        }
                    }
                });
                $("#tbody").append(htm);
                $("#processor").addClass("hidden");
            }
        },
        error: function (req, status, error) {
            $("#processor").addClass("hidden");
            $("#btnAddVehicle").removeClass("hidden");
            $("#btnAddVehicle").prop("disabled", false);
        }
    });

}


if ($("#expired").length > 0) {

    var agentid =  localStorage.getItem("agentid");
    displayAgentExpired(agentid);
}

function displayAgentExpired(id) {
    $("#processor").removeClass("hidden");
    $.ajax({
        type: "GET",
        url: "/Users/GetAllExistingAgentUsers/",
        contentType: "application/json; charset=utf-8",
        data: { id: id },
        dataType: "json",
        success: function (data) {
            console.log(data);
            if (data == 0) {
                $("#processor").addClass("hidden");
                $("#btnAddVehicle").removeClass("hidden");
                $("#btnAddVehicle").prop("disabled", false);
            } else {
                var htm = "";
                var i = 1;
                data.forEach(item => {
                    if (item.paid) {
                        if (item.expired == "Expired") {
                            htm += "<tr>"
                            htm += "            <td class='text-center text-muted'>#" + i + "</td>"
                            htm += "            <td>"
                            htm += "                <div class='widget-content p-0'>"
                            htm += "                    <div class='widget-content-wrapper'>"
                            htm += "                        <div class='widget-content-left mr-3'>"
                            htm += "                            <div class='widget-content-left'>"
                            htm += "                                <img height='40' width='40' class='rounded-circle' src='/uploads/" + item.pix + "' alt=''>"
                            htm += "                            </div>"
                            htm += "                        </div>"
                            htm += "                        <div class='widget-content-left flex2'>"
                            htm += "                            <div class='widget-heading'>" + item.firstName + " " + item.lastName + "</div>"
                            htm += "                            <div class='widget-subheading opacity-7'>" + item.state + " " + item.city + "</div>"
                            htm += "                        </div>"
                            htm += "                    </div>"
                            htm += "                </div>"
                            htm += "            </td>"
                            htm += "            <td class='text-center'>" + item.itemType + "</td>"
                            htm += "            <td class='text-center'>"

                            htm += "                <a href='/users/details?id=" + item.id + "' class='badge badge-success'>" + item.expired + "</a>"

                            htm += "            </td>"
                            htm += "            <td class='text-center'>"
                            htm += "                <a href='/users/details?id=" + item.id + "' id='PopoverCustomT-1' class='btn btn-primary btn-sm'>Details</a>"
                            htm += "            </td>"
                            htm += "        </tr>"
                            i++;
                        }
                    }
                });
                $("#tbody").append(htm);
                $("#processor").addClass("hidden");
            }
        },
        error: function (req, status, error) {
            $("#processor").addClass("hidden");
            $("#btnAddVehicle").removeClass("hidden");
            $("#btnAddVehicle").prop("disabled", false);
        }
    });

}


if ($("#mexpired").length > 0) {
    $("#processor").removeClass("hidden");
    $.ajax({
        type: "GET",
        url: "/Users/GetAllUsers/",
        contentType: "application/json; charset=utf-8", 
        dataType: "json",
        success: function (data) {
            console.log(data);
            if (data == 0) {
                $("#processor").addClass("hidden");
                $("#btnAddVehicle").removeClass("hidden");
                $("#btnAddVehicle").prop("disabled", false);
            } else {
                var htm = "";
                var i = 1;
                data.forEach(item => {
                    if (item.paid) {
                        if (item.expired == "Expired") {
                            htm += "<tr>"
                            htm += "            <td class='text-center text-muted'>#" + i + "</td>"
                            htm += "            <td>"
                            htm += "                <div class='widget-content p-0'>"
                            htm += "                    <div class='widget-content-wrapper'>"
                            htm += "                        <div class='widget-content-left mr-3'>"
                            htm += "                            <div class='widget-content-left'>"
                            htm += "                                <img height='40' width='40' class='rounded-circle' src='/uploads/" + item.pix + "' alt=''>"
                            htm += "                            </div>"
                            htm += "                        </div>"
                            htm += "                        <div class='widget-content-left flex2'>"
                            htm += "                            <div class='widget-heading'>" + item.firstName + " " + item.lastName + "</div>"
                            htm += "                            <div class='widget-subheading opacity-7'>" + item.state + " " + item.city + "</div>"
                            htm += "                        </div>"
                            htm += "                    </div>"
                            htm += "                </div>"
                            htm += "            </td>"
                            htm += "            <td class='text-center'>" + item.itemType + "</td>"
                            htm += "            <td class='text-center'>"

                            htm += "                <a href='/admin/details?id=" + item.id + "' class='badge badge-success'>" + item.expired + "</a>"

                            htm += "            </td>"
                            htm += "            <td class='text-center'>"
                            htm += "                <a href='/admin/details?id=" + item.id + "' id='PopoverCustomT-1' class='btn btn-primary btn-sm'>Details</a>"
                            htm += "            </td>"
                            htm += "        </tr>"
                            i++;
                        }
                    }
                });
                $("#tbody").append(htm);
                $("#processor").addClass("hidden");
            }
        },
        error: function (req, status, error) {
            $("#processor").addClass("hidden");
            $("#btnAddVehicle").removeClass("hidden");
            $("#btnAddVehicle").prop("disabled", false);
        }
    });

}


if ($("#pending").length > 0) {

    var agentid =  localStorage.getItem("agentid");
    displayAgentPending(agentid);
}

function displayAgentPending(id) {
    $("#processor").removeClass("hidden");
    $.ajax({
        type: "GET",
        url: "/Users/GetAllPendingAgentUsers/",
        contentType: "application/json; charset=utf-8",
        data: { id: id },
        dataType: "json",
        success: function (data) {
            console.log(data);
            if (data == 0) {
                $("#processor").addClass("hidden");
                $("#btnAddVehicle").removeClass("hidden");
                $("#btnAddVehicle").prop("disabled", false);
            } else {
                var htm = "";
                var i = 1;
                data.forEach(item => {

                    htm += "<tr>"
                    htm += "            <td class='text-center text-muted'>#" + i + "</td>"
                    htm += "            <td>"
                    htm += "                <div class='widget-content p-0'>"
                    htm += "                    <div class='widget-content-wrapper'>"
                    htm += "                        <div class='widget-content-left mr-3'>"
                    htm += "                            <div class='widget-content-left'>"
                    htm += "                                <img height='40' width='40' class='rounded-circle' src='/uploads/" + item.pix + "' alt=''>"
                    htm += "                            </div>"
                    htm += "                        </div>"
                    htm += "                        <div class='widget-content-left flex2'>"
                    htm += "                            <div class='widget-heading'>" + item.firstName + " " + item.lastName + "</div>"
                    htm += "                            <div class='widget-subheading opacity-7'>" + item.state + " " + item.city + "</div>"
                    htm += "                        </div>"
                    htm += "                    </div>"
                    htm += "                </div>"
                    htm += "            </td>"
                    htm += "            <td class='text-center'>"
                    htm += "                <a href='javascript:remove(" + item.id + ")' id='PopoverCustomT-1' class='btn btn-danger btn-sm'>Remove</a>"
                    htm += "                <a href='javascript:addvehicle(" + item.id + ")' id='PopoverCustomT-1' class='btn btn-primary btn-sm'>Continue</a>"
                    htm += "            </td>"
                    htm += "        </tr>"
                    i++;

                });
                $("#tbody").append(htm);
                $("#processor").addClass("hidden");
            }
        },
        error: function (req, status, error) {
            $("#processor").addClass("hidden");
            $("#btnAddVehicle").removeClass("hidden");
            $("#btnAddVehicle").prop("disabled", false);
        }
    });

}


if ($("#mpending").length > 0) {
    $("#processor").removeClass("hidden");
    $.ajax({
        type: "GET",
        url: "/Users/GetAllPendingUsers/",
        contentType: "application/json; charset=utf-8", 
        dataType: "json",
        success: function (data) {
            console.log(data);
            if (data == 0) {
                $("#processor").addClass("hidden");
                $("#btnAddVehicle").removeClass("hidden");
                $("#btnAddVehicle").prop("disabled", false);
            } else {
                var htm = "";
                var i = 1;
                data.forEach(item => {

                    htm += "<tr>"
                    htm += "            <td class='text-center text-muted'>#" + i + "</td>"
                    htm += "            <td>"
                    htm += "                <div class='widget-content p-0'>"
                    htm += "                    <div class='widget-content-wrapper'>"
                    htm += "                        <div class='widget-content-left mr-3'>"
                    htm += "                            <div class='widget-content-left'>"
                    htm += "                                <img height='40' width='40' class='rounded-circle' src='/uploads/" + item.pix + "' alt=''>"
                    htm += "                            </div>"
                    htm += "                        </div>"
                    htm += "                        <div class='widget-content-left flex2'>"
                    htm += "                            <div class='widget-heading'>" + item.firstName + " " + item.lastName + "</div>"
                    htm += "                            <div class='widget-subheading opacity-7'>" + item.state + " " + item.city + "</div>"
                    htm += "                        </div>"
                    htm += "                    </div>"
                    htm += "                </div>"
                    htm += "            </td>"
                    htm += "            <td class='text-center'>"
                    htm += "                <a href='javascript:remove(" + item.id + ")' id='PopoverCustomT-1' class='btn btn-danger btn-sm'>Remove</a>"
                    htm += "                <a href='javascript:addvehicle(" + item.id + ")' id='PopoverCustomT-1' class='btn btn-primary btn-sm'>Continue</a>"
                    htm += "            </td>"
                    htm += "        </tr>"
                    i++;

                });
                $("#tbody").append(htm);
                $("#processor").addClass("hidden");
            }
        },
        error: function (req, status, error) {
            $("#processor").addClass("hidden");
            $("#btnAddVehicle").removeClass("hidden");
            $("#btnAddVehicle").prop("disabled", false);
        }
    });

}

function addvehicle(id) {
    localStorage.setItem("clientid", id);
    location.href = "/users/vehicle?id=" + id;
}
function remove(id) {
    $.ajax({
        type: "GET",
        url: "/Users/RemoveUsers/",
        contentType: "application/json; charset=utf-8",
        data: { id: id },
        dataType: "json",
        success: function (data) {
            location.reload();
        },
        error: function (req, status, error) {
            location.reload();
        }
    });
}



if ($("#inprogress").length > 0) {

    var agentid =  localStorage.getItem("agentid");
    displayAgentInProgress(agentid);
}

function displayAgentInProgress(id) {
    $("#processor").removeClass("hidden");
    $.ajax({
        type: "GET",
        url: "/Users/GetAllExistingAgentUsers/",
        contentType: "application/json; charset=utf-8",
        data: { id: id },
        dataType: "json",
        success: function (data) {
            console.log(data);
            if (data == 0) {
                $("#processor").addClass("hidden");
                $("#btnAddVehicle").removeClass("hidden");
                $("#btnAddVehicle").prop("disabled", false);
            } else {
                var htm = "";
                var i = 1;
                data.forEach(item => {
                    if (!item.paid) {
                        htm += "<tr>"
                        htm += "            <td class='text-center text-muted'>#" + i + "</td>"
                        htm += "            <td>"
                        htm += "                <div class='widget-content p-0'>"
                        htm += "                    <div class='widget-content-wrapper'>"
                        htm += "                        <div class='widget-content-left mr-3'>"
                        htm += "                            <div class='widget-content-left'>"
                        htm += "                                <img height='40' width='40' class='rounded-circle' src='/uploads/" + item.pix + "' alt=''>"
                        htm += "                            </div>"
                        htm += "                        </div>"
                        htm += "                        <div class='widget-content-left flex2'>"
                        htm += "                            <div class='widget-heading'>" + item.firstName + " " + item.lastName + "</div>"
                        htm += "                            <div class='widget-subheading opacity-7'>" + item.state + " " + item.city + "</div>"
                        htm += "                        </div>"
                        htm += "                    </div>"
                        htm += "                </div>"
                        htm += "            </td>"
                        htm += "            <td class='text-center'>" + item.itemType + "</td>"

                        htm += "            <td class='text-center'>"
                        htm += "                <a class='badge badge-info' href='/users/details?id=" + item.id + "' id='PopoverCustomT-1' class='btn btn-primary btn-sm'>Pay</a>"
                        htm += "            </td>"
                        htm += "        </tr>"
                        i++;
                    }
                });
                $("#tbody").append(htm);
                $("#processor").addClass("hidden");
            }
        },
        error: function (req, status, error) {
            $("#processor").addClass("hidden");
            $("#btnAddVehicle").removeClass("hidden");
            $("#btnAddVehicle").prop("disabled", false);
        }
    });

}



if ($("#minprogress").length > 0) {
    $("#processor").addClass("hidden");
    $.ajax({
        type: "GET",
        url: "/Users/GetAllUsers/",
        contentType: "application/json; charset=utf-8", 
        dataType: "json",
        success: function (data) {
            console.log(data);
            if (data == 0) {
                $("#processor").addClass("hidden");
                $("#btnAddVehicle").removeClass("hidden");
                $("#btnAddVehicle").prop("disabled", false);
            } else {
                var htm = "";
                var i = 1;
                data.forEach(item => {
                    if (!item.paid) {
                        htm += "<tr>"
                        htm += "            <td class='text-center text-muted'>#" + i + "</td>"
                        htm += "            <td>"
                        htm += "                <div class='widget-content p-0'>"
                        htm += "                    <div class='widget-content-wrapper'>"
                        htm += "                        <div class='widget-content-left mr-3'>"
                        htm += "                            <div class='widget-content-left'>"
                        htm += "                                <img height='40' width='40' class='rounded-circle' src='/uploads/" + item.pix + "' alt=''>"
                        htm += "                            </div>"
                        htm += "                        </div>"
                        htm += "                        <div class='widget-content-left flex2'>"
                        htm += "                            <div class='widget-heading'>" + item.firstName + " " + item.lastName + "</div>"
                        htm += "                            <div class='widget-subheading opacity-7'>" + item.state + " " + item.city + "</div>"
                        htm += "                        </div>"
                        htm += "                    </div>"
                        htm += "                </div>"
                        htm += "            </td>"
                        htm += "            <td class='text-center'>" + item.itemType + "</td>"

                        htm += "            <td class='text-center'>"
                        htm += "                <a class='badge badge-info' href='/admin/details?id=" + item.id + "' id='PopoverCustomT-1' class='btn btn-primary btn-sm'>Pay</a>"
                        htm += "            </td>"
                        htm += "        </tr>"
                        i++;
                    }
                });
                $("#tbody").append(htm);
                $("#processor").addClass("hidden");
            }
        },
        error: function (req, status, error) {
            $("#processor").addClass("hidden");
            $("#btnAddVehicle").removeClass("hidden");
            $("#btnAddVehicle").prop("disabled", false);
        }
    });

}


if ($("#completed").length > 0) {

    var agentid =  localStorage.getItem("agentid");
    displayAgentcompleted(agentid);
}

function displayAgentcompleted(id) {
    $("#processor").removeClass("hidden");
    $.ajax({
        type: "GET",
        url: "/Users/GetAllExistingAgentUsers/",
        contentType: "application/json; charset=utf-8",
        data: { id: id },
        dataType: "json",
        success: function (data) {
            console.log(data);
            if (data == 0) {
                $("#processor").addClass("hidden");
                $("#btnAddVehicle").removeClass("hidden");
                $("#btnAddVehicle").prop("disabled", false);
            } else {
                var htm = "";
                var i = 1;
                data.forEach(item => {
                    if (item.paid) {
                        htm += "<tr>"
                        htm += "            <td class='text-center text-muted'>#" + i + "</td>"
                        htm += "            <td>"
                        htm += "                <div class='widget-content p-0'>"
                        htm += "                    <div class='widget-content-wrapper'>"
                        htm += "                        <div class='widget-content-left mr-3'>"
                        htm += "                            <div class='widget-content-left'>"
                        htm += "                                <img height='40' width='40' class='rounded-circle' src='/uploads/" + item.pix + "' alt=''>"
                        htm += "                            </div>"
                        htm += "                        </div>"
                        htm += "                        <div class='widget-content-left flex2'>"
                        htm += "                            <div class='widget-heading'>" + item.firstName + " " + item.lastName + "</div>"
                        htm += "                            <div class='widget-subheading opacity-7'>" + item.state + " " + item.city + "</div>"
                        htm += "                        </div>"
                        htm += "                    </div>"
                        htm += "                </div>"
                        htm += "            </td>"
                        htm += "            <td class='text-center'>" + item.itemType + "</td>"
                        htm += "            <td class='text-center'>"

                        if (item.expired == "Expired") {
                            htm += "                <a href='/users/details?id=" + item.id + "' class='badge badge-danger'>" + item.expired + "</a>"
                        } else {
                            htm += "                <div class='badge badge-success'>" + item.expired + "</div>"
                        }


                        htm += "            </td>"
                        htm += "            <td class='text-center'>"
                        htm += "                <a href='/users/details?id=" + item.id + "' id='PopoverCustomT-1' class='btn btn-primary btn-sm'>Details</a>"
                        htm += "            </td>"
                        htm += "        </tr>"
                        i++;
                    }
                });
                $("#tbody").append(htm);
                $("#processor").addClass("hidden");
            }
        },
        error: function (req, status, error) {
            $("#processor").addClass("hidden");
            $("#btnAddVehicle").removeClass("hidden");
            $("#btnAddVehicle").prop("disabled", false);
        }
    });

}



if ($("#mcompleted").length > 0) {
    $("#processor").removeClass("hidden");
    $.ajax({
        type: "GET",
        url: "/Users/GetAllUsers/",
        contentType: "application/json; charset=utf-8", 
        dataType: "json",
        success: function (data) {
            console.log(data);
            if (data == 0) {
                $("#processor").addClass("hidden");
                $("#btnAddVehicle").removeClass("hidden");
                $("#btnAddVehicle").prop("disabled", false);
            } else {
                var htm = "";
                var i = 1;
                data.forEach(item => {
                    if (item.paid) {
                        htm += "<tr>"
                        htm += "            <td class='text-center text-muted'>#" + i + "</td>"
                        htm += "            <td>"
                        htm += "                <div class='widget-content p-0'>"
                        htm += "                    <div class='widget-content-wrapper'>"
                        htm += "                        <div class='widget-content-left mr-3'>"
                        htm += "                            <div class='widget-content-left'>"
                        htm += "                                <img height='40' width='40' class='rounded-circle' src='/uploads/" + item.pix + "' alt=''>"
                        htm += "                            </div>"
                        htm += "                        </div>"
                        htm += "                        <div class='widget-content-left flex2'>"
                        htm += "                            <div class='widget-heading'>" + item.firstName + " " + item.lastName + "</div>"
                        htm += "                            <div class='widget-subheading opacity-7'>" + item.state + " " + item.city + "</div>"
                        htm += "                        </div>"
                        htm += "                    </div>"
                        htm += "                </div>"
                        htm += "            </td>"
                        htm += "            <td class='text-center'>" + item.itemType + "</td>"
                        htm += "            <td class='text-center'>"

                        if (item.expired == "Expired") {
                            htm += "                <a href='/admin/details?id=" + item.id + "' class='badge badge-danger'>" + item.expired + "</a>"
                        } else {
                            htm += "                <div class='badge badge-success'>" + item.expired + "</div>"
                        }


                        htm += "            </td>"
                        htm += "            <td class='text-center'>"
                        htm += "                <a href='/admin/details?id=" + item.id + "' id='PopoverCustomT-1' class='btn btn-primary btn-sm'>Details</a>"
                        htm += "            </td>"
                        htm += "        </tr>"
                        i++;
                    }
                });
                $("#tbody").append(htm);
                $("#processor").addClass("hidden");
            }
        },
        error: function (req, status, error) {
            $("#processor").addClass("hidden");
            $("#btnAddVehicle").removeClass("hidden");
            $("#btnAddVehicle").prop("disabled", false);
        }
    });

}

var PayOut = function () {
    if ($("#totalIncome").html() == 0) {
        return false;
    }

    var amt = $("#totalIncome").html();
    var agentid = localStorage.getItem("agentid");

    var _data = {
        AgentId: agentid,
        Amount: amt
    };
     
    
    $("#processor").removeClass("hidden");
    $("#pad").addClass('hidden');
    $.ajax({
        type: 'POST',
        data: _data,
        url: "/Users/CashingOut",  
        success: function (data) { 
            $("#pad").removeClass('hidden');
            if (data) {
                $("#msg").html("Request successfully sent!");
            } else {
                $("#msg").html("Seems you have a pending request. Try again");
            }
            $("#processor").addClass("hidden"); 
        },
        error: function (req, status, error) {
            $("#pad").removeClass('hidden');
            $("#msg").html("There was an error. Try again");
            $("#processor").addClass("hidden"); 
        }
    });
}