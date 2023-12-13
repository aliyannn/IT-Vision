function ValidateHelp() {
    function IsEmail(strValue) {
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(strValue);
    }
    var errors = new Array();
    var k = -1;
    var Fields = "";

    Fields = Fields + "Name ~" + document.getElementById("name").value + "|";
    if (document.getElementById("name").value == "") {
        k = k == -1 ? 0 : ++k;
        errors[k] = "Please enter Name.\n";
    }

    Fields = Fields + "Company Name ~" + document.getElementById("cname").value + "|";
    if (document.getElementById("cname").value == "") {
        k = k == -1 ? 0 : ++k;
        errors[k] = "Please enter valid Company Name.\n";
    }

    var Email = document.getElementById("email").value;
    Fields = Fields + "Email ~" + document.getElementById("email").value + "|";
    if (IsEmail(Email) == false) {
        k = k == -1 ? 0 : ++k;
        errors[k] = "Please enter valid Email.\n";
    }

    Fields = Fields + "Phone ~" + document.getElementById("phone").value + "|";
    if (document.getElementById("phone").value == "") {
        k = k == -1 ? 0 : ++k;
        errors[k] = "Please enter valid Phone.\n";
    }

    Fields = Fields + "Message ~" + document.getElementById("message").value + "|";
    if (document.getElementById("message").value == "") {
        k = k == -1 ? 0 : ++k;
        errors[k] = "Please enter Message.\n";
    }


    if (errors.length > 0) {
        var ErrorString = "Error occured while contacting Contact Us,\n";
        for (var i = 0; i < errors.length; i++) {
            ErrorString = ErrorString + (i + 1) + "]  " + errors[i];
        }
        alert(ErrorString);
        return false;
    } else {
        var xhr = new XMLHttpRequest();
        var url = "https://www.itvisionnetworks.com/itvisionnetworks.com/Page/SendMailForm";
        xhr.open("POST", url, true);
        xhr.withCredentials = false;
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                Swal.fire({
                    position: 'middle',
                    icon: 'success',
                    title:'Thank you!',
                    text: 'Your Submission has been sent',
                    showConfirmButton: true,
                    timer: 9000
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        window.location.href = "/home";
                    }
                });
            }
        };
        var data = JSON.stringify({
            EmailFrom: "sales@itvisionnetworks.com",
            EmailTo: "sales@itvisionnetworks.com",
            Subject: "Contact Us",
            EmailBody: "Contact Us",
            FileName: "Contact Us",
            Fields: escape(Fields),
            HtmlContent: escape(document.getElementById("FormContainer").innerHTML)
        });

        xhr.send(data);
    }
}