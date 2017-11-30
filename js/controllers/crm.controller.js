(function() {
    'use strict';
    angular
        .module('CRM')
        .controller('CRMController', CRMController);


        CRMController.$inject = ['$scope' , 'UserLocalProvider'];

   
    /* @ngInject */ 

    function CRMController($scope, UserLocalProvider) {
        $scope.usuarios = [];
        $scope.nuevoUsuario = { nombre : '',
                                direccionFoto : '',
                                telefono : '',
                                descripcion :'',
                                otros : '',
                                primaria : '',
                                secundaria :'',
                                bachillerato : '',
                                ciclograd : '',
                                };
        $scope.cursos = {

        }
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
                                    primaria :false,
                                    secundaria :false,
                                    bachillerato:false,
                                    ciclograd :false,

                                },
                            },
                        };
        
       

        activate();


        ////////////////


        function activate() {            
            if (UserLocalProvider.getAllUsuarios().length == 0){
                alert("No existen usuarios, cree uno usando el formulario de la derecha")

            } else {
                $scope.usuarios = UserLocalProvider.getAllUsuarios();

                loadState();
            }
        }


        function crearUsuario(usuario){
            usuario.id =randId();


    //        	$scope.usuarios.push(usuario);

            UserLocalProvider.addUsuario(usuario);
            $scope.usuarios = UserLocalProvider.getAllUsuarios();
          //  console.log(usuario);
          //  saveState();
           
            if ($scope.flagModificar){
                $scope.flagCrear = false;
            } else {
                $scope.flagCrear = true;
            }
             clean();

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
                    $scope.nuevoUsuario.primaria=$scope.usuarios[i].primaria;
                    $scope.nuevoUsuario.secundaria = $scope.usuarios[i].secundaria;
                    $scope.nuevoUsuario.bachillerato =$scope.usuarios[i].bachillerato;
                    $scope.nuevoUsuario.ciclograd = $scope.usuarios[i].ciclograd ;


                }
        }
             $scope.flagModificar = true;
            $scope.flagCrear = false;
    }

        function modificarUsuario( usuario ){
            for (var i = 0; i < $scope.usuarios.length;i++){
                if (usuario.id == $scope.usuarios[i].id){
                    $scope.usuarios[i].nombre = usuario.nombre;
                    $scope.usuarios[i].direccionFoto = usuario.direccionFoto;
                    $scope.usuarios[i].telefono = usuario.telefono;
                    $scope.usuarios[i].descripcion = usuario.descripcion;
                    $scope.usuarios[i].otros = usuario.otros;
                    $scope.usuarios[i].primaria = usuario.primaria;
                    $scope.usuarios[i].secundaria = usuario.secundaria;
                    $scope.usuarios[i].bachillerato = usuario.bachillerato;
                    $scope.usuarios[i].ciclograd  = usuario.ciclograd;

                    saveState();
                   
                }
            }
            $scope.flagModificar =false;
            $scope.flagCrear = true;
            clean();

        }

        function clean(){
            $scope.nuevoUsuario = { nombre : '',
                                    direccionFoto : '',
                                    telefono : '',
                                    descripcion :'',
                                    otros : '',
                                    primaria : '',
                                    secundaria :'',
                                    bachillerato : '',
                                    ciclograd : '',
                            };
            
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
            $scope.state.form.curso.primaria = $scope.nuevoUsuario.primaria;
            $scope.state.form.curso.secundaria = $scope.nuevoUsuario.secundaria;
            $scope.state.form.curso.bachillerato = $scope.nuevoUsuario.bachillerato;
            $scope.state.form.curso.ciclograd = $scope.nuevoUsuario.ciclograd;




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
            $scope.nuevoUsuario.primaria=$scope.state.form.curso.primaria;
            $scope.nuevoUsuario.secundaria = $scope.state.form.curso.secundaria;
            $scope.nuevoUsuario.bachillerato =$scope.state.form.curso.bachillerato;
            $scope.nuevoUsuario.ciclograd = $scope.state.form.curso.ciclograd ;



          }

        // Generador de numeros aleatorios para ID de usuarios 

        function randId() {   
            return Math.random().toString(36).substr(2, 10);  
        }

    }
})();