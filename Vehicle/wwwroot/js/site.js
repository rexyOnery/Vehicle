// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your Javascript code.

var addusers = function () {
    if (document.getElementById("first-name").value == "") {
        return false;
    }

    var pix = document.getElementById("exampleFile").files[0];
    if (pix == "") {
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
            console.log(data);
            if (data == 0) {
                $("#processor").addClass("hidden");
                $("#btnAddUser").removeClass("hidden");
                $("#btnAddUser").prop("disabled", false);
            } else {
                localStorage.setItem("clientid", data);
                location.href = "/users/vehicle?id=" + data;;
            }
        },
        error: function (req, status, error) {
            $("#processor").addClass("hidden");
            $("#btnAddUser").removeClass("hidden");
            $("#btnAddUser").prop("disabled", false);
        }
    });
}


function AddVehicle() {
    if (document.getElementById("itemType").value == "") {
        return false;
    }

    if (document.getElementById("plate-number").value == "") {
        return false;
    }

    if (document.getElementById("chasis-number").value == "") {
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
            console.log(data);
            if (data == 0) {
                $("#processor").addClass("hidden");
                $("#btnAddVehicle").removeClass("hidden");
                $("#btnAddVehicle").prop("disabled", false);
            } else {

                location.href = "/users/details?id=" + localStorage.getItem("clientid");
            }
        },
        error: function (req, status, error) {
            $("#processor").addClass("hidden");
            $("#btnAddVehicle").removeClass("hidden");
            $("#btnAddVehicle").prop("disabled", false);
        }
    });
}

var addagents = function () {
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

    $("#btnRegisterUser").prop("disabled", true);
    $.ajax({
        type: "POST",
        url: "/Users/addagent",
        contentType: false,
        processData: false,
        data: formdata,
        success: function (data) {
            console.log(data);
            if (!data) {
                $("#error").html("User name may already be in use. Please try again"); 
                $("#processor").addClass("hidden");
                $("#btnRegisterUser").removeClass("hidden");
                $("#btnRegisterUser").prop("disabled", false);
            } else {
                location.href = "/account";
            }
        },
        error: function (req, status, error) {
            $("#error").html("User name may already be in use. Please try again"); 
            $("#processor").addClass("hidden");
            $("#btnRegisterUser").removeClass("hidden");
            $("#btnRegisterUser").prop("disabled", false);
        }
    });
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
            console.log(data);
            if (data == 0) {
                $("#error").html("Invalid username or password. Please try again");
                $("#processor").addClass("hidden");
                $("#btnLoginUser").removeClass("hidden");
                $("#btnLoginUser").prop("disabled", false);
            } else {

                data.forEach(item => {
                    localStorage.setItem("agentid", item.id);
                    localStorage.setItem("agentpix", item.photo);
                    localStorage.setItem("agentname", item.firstName + " " + item.lastName);
                    location.href = "/agent";
                    
                });
                
            }
        },
        error: function (req, status, error) {
            $("#error").html("Invalid username or password. Please try again");
            $("#processor").addClass("hidden");
            $("#btnLoginUser").removeClass("hidden");
            $("#btnLoginUser").prop("disabled", false);
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

 

if ($("#det").length > 0) {
    var _query = location.search.split('=');
    console.log(_query);
    localStorage.setItem("clientid", _query[1]);
    display(_query[1]);
}

function display(id) {

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
                $("#tbody").append(htm);
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
        }
    });
}


function displayAdminExisting() {

    $.ajax({
        type: "GET",
        url: "/admin/GetAllForAdmin/",
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
                     
                    htm += "            <td class='text-center'>" + item.itemType + "</td>"
                    htm += "        </tr>"
                    i++;
                });
                $("#tbody").append(htm);
            }
        },
        error: function (req, status, error) {
            $("#processor").addClass("hidden");
            $("#btnAddVehicle").removeClass("hidden");
            $("#btnAddVehicle").prop("disabled", false);
        }
    });

}


if ($("#board").length > 0) {

    var agentid = localStorage.getItem("agentid");
    displayAgentExisting(agentid);
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

if ($("#existing").length > 0) {

    var agentid = localStorage.getItem("agentid");
    displayAgentExisting(agentid);
}

function displayAgentExisting(id) {

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
    location.href = "/users/vehicle";
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
            }
        },
        error: function (req, status, error) {
            $("#processor").addClass("hidden");
            $("#btnAddVehicle").removeClass("hidden");
            $("#btnAddVehicle").prop("disabled", false);
        }
    });

}
