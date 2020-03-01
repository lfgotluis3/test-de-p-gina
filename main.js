var purposesDb = firebase.database();
var purposesReference = purposesDb.ref(`projectsCollection`);
var usersReference = firebase.database().ref(`/usersCollection`);

var purposesContent;

purposesReference.on('value', function(snapshot) 
    {
        console.log(snapshot.val());
        purposesContent = snapshot.val();
        getPurposes();
    });

$("#formulario").submit(function(event)
    {
        getFormData();
        event.preventDefault ();
    })

$("#get-purposes").on("click", function()
    {
        getPurposes();
    })

function getFormData()
    {
        var projectObject = {};

        var projectName = $("#project-name").val();
        var projectDescription = $("#project-description").val();
        var customerMail = $("#customer-mail").val();
        var customerPhone = $("#customer-phone").val();
        var customerName = $("#customer-name").val();

        projectObject.projectName = projectName;
        projectObject.projectDescription = projectDescription;
        projectObject.customerMail = customerMail;
        projectObject.customerPhone = customerPhone;
        projectObject.customerName = customerName;
        console.log(projectObject)
        $("input").val("");
        $("textarea").val("");
        purposesReference.push(projectObject)
    }

function getPurposes()
    {
        console.log(purposesContent)
        $("#purposes-wrapper").empty();
        $.each(purposesContent, function(key,value)
            {
                console.log(value,key);
                var projectName = value.projectName;
                var projectDescription = value.projectDescription;
                var customerName = value.customerName;
                var customerPhone = value.customerPhone;
                var customerMail = value.customerMail;
            /*});{*/
                var projectPurposeHtml =    `<div class="col-lg-3">
                                                <div class="card my-2">
                                                    <div class="card-body">
                                                        <h5 class="card-title">${projectName}</h5>
                                                        <h6 class="card-subtitle mb-2 text-muted">${customerName}< /h6>
                                                        <p class="card-text">${projectDescription}</p>
                                                        <p>${customerMail}</p>
                                                        <p>${customerPhone}</p>
                                                    </div>
                                                </div>
                                            </div>`

                $("#purposes-wrapper").append(projectPurposeHtml);
            })
    }
/*function eliminar(clave) {
    if (confirm(`Esta seguro?`)) {
        sessionStorage.removeItem(clave);
        mostrar();
    }
}
function eliminarTodo() {
    if (confirm(`Esta seguro?`)) {
        sessionStorage.clear();
        mostrar();
    }
}*/