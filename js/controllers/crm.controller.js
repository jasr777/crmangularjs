(function() {
    'use strict';
    angular
        .module('CRM')
        .controller('CRMController', CRMController);
    CRMController.$inject = ['$scope'];
    /* @ngInject */
    function CRMController($scope) {
        $scope.usuarios = [];
        $scope.nuevoUsuario ={}; /*{ nombre : '',
                                direccionFoto : '',
                                telefono : '',
                                descripcion :'',
                                otros : '',};*/

        $scope.crearUsuario = crearUsuario;
        $scope.borrarUsuario = borrarUsuario;
        $scope.clean = clean;
        $scope.actualizarFormularioUsuario =  actualizarFormularioUsuario;
        $scope.flagModificar = false;
        $scope.flagCrear = true;
        $scope.modificarUsuario = modificarUsuario;
        $scope.saveState = saveState;
        
        // Variables relativas a localStorage 
       // $scope.state = {};
        
        /* La forma de state es : */
        $scope.state = {    usuarios : [],
                            form : {    
                                id : '',                         
                                nombre : '',
                                direccionFoto : '',
                                telefono : '',
                                descripcion :'',
                                otros : '',
                                curso : {
                                    primaria :'',
                                    secundaria :'',
                                    bachillerato:'',
                                    ciclograd :'',

                                },
                            },
                        };
        
       

        activate();


        ////////////////


        function activate() {            
            if (localStorage.getItem('state') == null){
                alert("No existen usuarios, cree uno usando el formulario de la derecha")
               
            } else {
                loadState();
            }
        }


        function crearUsuario(usuario){
            usuario.id =randId();
        	$scope.usuarios.push(usuario);
            console.log("Guardar el estado del formulario : ")           
            saveState();
            console.log("-- FIN SAVE STATE --");
            clean();
            if ($scope.flagModificar){
                $scope.flagCrear = false;
            } else {
                $scope.flagCrear = true;
            }

        }


        // Borrar Usuario por id 

        function borrarUsuario(id){
            console.log(id);

            for (var i = 0; i < $scope.usuarios.length;i++){
                console.log("--for--");
                if (id == $scope.usuarios[i].id){
                    var checkUsername = prompt ("¿Está seguro de querer borrar el usuario? Para confirmar introduzca el nombre del usuario");
                    if (checkUsername == $scope.usuarios[i].nombre){
                       $scope.usuarios.splice(i,1);
                       saveState();
                    } else {
                        alert("El nombre del usuario introducido no es correcto, no se eliminará el usuario");
                    }

                } else {
                    alert("no se encuentra el usuario");
                }
            }

            
        }


        function actualizarFormularioUsuario(id){

            for(var i = 0; i < $scope.usuarios.length; i ++){       
                if(id == $scope.usuarios[i].id){
            
                    $scope.nuevoUsuario.id = $scope.usuarios[i].id;
                    $scope.nuevoUsuario.nombre = $scope.usuarios[i].nombre 
                    $scope.nuevoUsuario.direccionFoto =$scope.usuarios[i].direccionFoto;
                    $scope.nuevoUsuario.telefono= $scope.usuarios[i].telefono;
                    $scope.nuevoUsuario.descripcion=$scope.usuarios[i].descripcion;
                    $scope.nuevoUsuario.otros = $scope.usuarios[i].otros;
                    $scope.nuevoUsuario.curso.primaria=$scope.usuarios[i].curso.primaria;
                    $scope.nuevoUsuario.curso.secundaria = $scope.usuarios[i].curso.secundaria;
                    $scope.nuevoUsuario.curso.bachillerato =$scope.usuarios[i].curso.bachillerato;
                    $scope.nuevoUsuario.curso.ciclograd = $scope.usuarios[i].curso.ciclograd ;


                }
        }
             $scope.flagModificar = true;
            $scope.flagCrear = false;
    }

        function modificarUsuario( usuario ){
            for (var i = 0; i < $scope.usuarios.length;i++){
                if (usuario.id == $scope.usuarios[i].id){
                    console.log("ESTOY AQUI");
                    $scope.usuarios[i].nombre = usuario.nombre;
                    $scope.usuarios[i].direccionFoto = usuario.direccionFoto;
                    $scope.usuarios[i].telefono = usuario.telefono;
                    $scope.usuarios[i].descripcion = usuario.descripcion;
                    $scope.usuarios[i].otros = usuario.otros;
                    $scope.usuarios[i].curso.primaria = usuario.primaria;
                    $scope.usuarios[i].curso.secundaria = usuario.secundaria;
                    $scope.usuarios[i].curso.bachillerato = usuario.bachillerato;
                    $scope.usuarios[i].curso.ciclograd  = usuario.ciclograd;

                    saveState();
                   
                }
            }
            $scope.flagModificar =false;
            $scope.flagCrear = true;
            clean();

        }

        function clean(){
            $scope.nuevoUsuario = {};
            saveState();
        }


        // funcion para guardar en localStorage(){}

        function saveState(){

            $scope.state.usuarios = $scope.usuarios.slice(0);
            $scope.state.form.id = $scope.nuevoUsuario.id;
            $scope.state.form.nombre = $scope.nuevoUsuario.nombre;
            $scope.state.form.direccionFoto =$scope.nuevoUsuario.direccionFoto;
            $scope.state.form.telefono = $scope.nuevoUsuario.telefono;
            $scope.state.form.descripcion  = $scope.nuevoUsuario.descripcion;
            $scope.state.form.otros  = $scope.nuevoUsuario.otros;
            // Aqui falla


            console.log($scope.state.form.primaria + " scope state form primaria ");
            console.log($scope.nuevoUsuario.curso.primaria + "scope nuevousuario curso primaria");
            $scope.state.form.curso.primaria = $scope.nuevoUsuario.curso.primaria;
            $scope.state.form.curso.secundaria = $scope.nuevoUsuario.curso.secundaria;
            $scope.state.form.curso.bachillerato = $scope.nuevoUsuario.curso.bachillerato;
            $scope.state.form.curso.ciclograd = $scope.nuevoUsuario.curso.ciclograd;




            localStorage.setItem('state', JSON.stringify($scope.state));
        }


        // función para cargar localStorage () 

        function loadState(){
            $scope.state = JSON.parse(localStorage.getItem('state'));
            $scope.usuarios = $scope.state.usuarios;
            $scope.nuevoUsuario.id = $scope.state.form.id;
            $scope.nuevoUsuario.nombre =$scope.state.form.nombre;
            $scope.nuevoUsuario.direccionFoto =$scope.state.form.direccionFoto;
            $scope.nuevoUsuario.telefono =$scope.state.form.telefono;
            $scope.nuevoUsuario.descripcion =$scope.state.form.descripcion;
            $scope.nuevoUsuario.otros =$scope.state.form.otros;
            $scope.nuevoUsuario.curso.primaria=$scope.state.form.curso.primaria;
           $scope.nuevoUsuario.curso.secundaria = $scope.state.form.curso.secundaria;
            $scope.nuevoUsuario.curso.bachillerato =$scope.state.form.curso.bachillerato;
            $scope.nuevoUsuario.curso.ciclograd = $scope.state.form.curso.ciclograd ;



          }

        // Generador de numeros aleatorios para ID de usuarios 

        function randId() {   
            return Math.random().toString(36).substr(2, 10);  
        }

    }
})();