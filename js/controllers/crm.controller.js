(function() {
    'use strict';
    angular
        .module('CRM')
        .controller('CRMController', CRMController);


        CRMController.$inject = ['$scope'];

   
    /* @ngInject */ 

    function CRMController($scope) {
        $scope.usuarios = [];
        $scope.nuevoUsuario = { nombre : '',
                                direccionFoto : '',
                                telefono : '',
                                edad : '',
                                correo: '',
                                descripcion :'',
                                otros : '',
                                primaria : '',
                                secundaria :'',
                                bachillerato : '',
                                ciclograd : '',
                                };
        $scope.crearUsuario = crearUsuario;
        $scope.borrarUsuario = borrarUsuario;
        $scope.clean = clean;
        $scope.actualizarFormularioUsuario =  actualizarFormularioUsuario;
        $scope.flagModificar = false;
        $scope.flagCrear = true;
        $scope.modificarUsuario = modificarUsuario;
        $scope.saveState = saveState;
        $scope.cursos = ['primaria','secundaria', 'bachillerato', 'Ciclo o Grado'];
        // Variables relativas a localStorage 
       // $scope.state = {};
        $scope.search ='';

        /* La forma de state es : */
        $scope.state = {    usuarios : [],                            
                            form : {    
                                id : '',                         
                                edad : '',
                                nombre : '',
                                direccionFoto : '',
                                correo:'',
                                telefono : '',
                                descripcion :'',
                                otros : '',                               
                                primaria :false,
                                secundaria :false,
                                bachillerato:false,
                                ciclograd :false,

                                },
                            // 
                            filter : '',
                            };
        
       

        activate();


        ////////////////


        function activate() {            

            if ( 'state' in localStorage){
                loadState();

                

            } else {
                alert("No existen usuarios, cree uno usando el formulario de la derecha")
                $scope.usuarios = [];

                //$scope.usuarios = UserLocalProvider.getAllUsuarios();

            }
        }


        function crearUsuario(usuario){
            usuario.id =randId();


           	$scope.usuarios.push(usuario);

            //UserLocalProvider.addUsuario(usuario);
            //$scope.usuarios = UserLocalProvider.getAllUsuarios();
            console.log(usuario);
            saveState();
           
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
                    $scope.nuevoUsuario.nombre = $scope.usuarios[i].nombre;
                    $scope.nuevoUsuario.edad =$scope.usuarios[i].edad;
                    $scope.nuevoUsuario.correo = $scope.usuarios[i].correo;
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
                    $scope.usuarios[i].edad = usuario.edad;
                    $scope.usuarips[i].correo = usuario.correo;
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
            $scope.nuevoUsuario = {};
           $scope.formUsuario.$setUntouched();
            saveState();
        }


        // funcion para guardar en localStorage(){}

        function saveState(){

            $scope.state.usuarios = $scope.usuarios.slice(0);
            $scope.state.form.id = $scope.nuevoUsuario.id;
            $scope.state.form.nombre = $scope.nuevoUsuario.nombre;
            $scope.state.form.edad = $scope.nuevoUsuario.edad;
            $scope.state.form.correo = $scope.nuevoUsuario.correo;
            $scope.state.form.direccionFoto =$scope.nuevoUsuario.direccionFoto;
            $scope.state.form.telefono = $scope.nuevoUsuario.telefono;
            $scope.state.form.descripcion  = $scope.nuevoUsuario.descripcion;
            $scope.state.form.otros  = $scope.nuevoUsuario.otros; 
            $scope.state.form.otros  = $scope.nuevoUsuario.otros;                
            $scope.state.form.primaria = $scope.nuevoUsuario.primaria;
            $scope.state.form.secundaria = $scope.nuevoUsuario.secundaria;
            $scope.state.form.bachillerato = $scope.nuevoUsuario.bachillerato;
            $scope.state.form.ciclograd = $scope.nuevoUsuario.ciclograd;
            $scope.state.filter = $scope.search;

            console.log($scope.state);


            localStorage.setItem('state', JSON.stringify($scope.state));
        }


        // función para cargar localStorage () 

        function loadState(){
            $scope.state = JSON.parse(localStorage.getItem('state'));
            $scope.usuarios = $scope.state.usuarios;
            $scope.nuevoUsuario.id = $scope.state.form.id;
            $scope.nuevoUsuario.nombre =$scope.state.form.nombre;
            $scope.nuevoUsuario.edad = $scope.state.form.edad;
            $scope.nuevoUsuario.correo = $scope.state.form.correo;
            $scope.nuevoUsuario.direccionFoto =$scope.state.form.direccionFoto;
            $scope.nuevoUsuario.telefono =$scope.state.form.telefono;
            $scope.nuevoUsuario.descripcion =$scope.state.form.descripcion;
            $scope.nuevoUsuario.otros =$scope.state.form.otros;
            $scope.nuevoUsuario.primaria=$scope.state.form.primaria;
            $scope.nuevoUsuario.secundaria = $scope.state.form.secundaria;
            $scope.nuevoUsuario.bachillerato =$scope.state.form.bachillerato;
            $scope.nuevoUsuario.ciclograd = $scope.state.form.ciclograd ;
            console.log($scope.state.search)
            $scope.search = $scope.state.filter;

          }

        // Generador de numeros aleatorios para ID de usuarios 

        function randId() {   
            return Math.random().toString(36).substr(2, 10);  
        }

    }
})();