const user = "Admin"
const clave = "1234"

$("#btn").click(function(event){
    const url = `${window.location.origin}/index?search=${document.getElementById("in").value}`
    window.location.href = url;
})

$("#add_user").submit(function(event){
    alert("¡Informacion Agregada con Exito!");
})

function clearInput() {
    document.getElementById("usuario").value = ""
    document.getElementById("clave").value = ""
}

function redireccion() {
    location.href= "index"
}

function login() {
    const user1 = document.getElementById("usuario").value;
    const clave1 = document.getElementById("clave").value;

    if (user !== user1 || clave !== clave1) {
        alert("Los datos introducidos son INCORRECTOS");
        clearInput();
        return;
    }
   
    alert("Los datos introducidos son CORRECTOS.");
    redireccion();

}

$("#update_user").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })

    console.log(data);

    var request = {
        "url" : `http://localhost:3000/api/users/${data.id}`,
        "method" : "PUT",
        "data" : data
    }

    $.ajax(request).done(function(response){
        alert("¡Informacion Modificada con Exito!");
    })

})

if(window.location.pathname == "/index"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url" : `http://localhost:3000/api/users/${id}`,
            "method" : "DELETE"
        }

        if(confirm("Quieres Eliminar este Trailer?")){
            $.ajax(request).done(function(response){
                alert("¡Informacion Eliminada con Exito!");
                location.reload();
            })
        }

    })
}
