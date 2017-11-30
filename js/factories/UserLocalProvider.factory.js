/*


(function() {
    'use strict';
    angular
        .module('CRM')
        .factory('UserLocalProvider', UserLocalProvider);
    
    UserLocalProvider.$inject = [];
    /* @ngInject */
    /*
    function UserLocalProvider() {
        var service = {

        	/// Funciones 
        	getAllUsuarios : getAllUsuarios,
            addUsuario :  addUsuario,
            removeUsuario : removeUsuario,
        };
        return service;
        ////////////////


        function getAllUsuarios (){     

           	var before = JSON.parse(localStorage.getItem('state'));        	
        	if (before == null){
        		console.log("no existe local storage")
        		return [];
        	} else {
        		console.log("existe, devuelvo el array");
                var usuarios =  JSON.parse(localStorage.getItem('state')).usuarios;
        		return usuarios;
        	}

        }

        function addUsuario(usuario) {

        	//var usuarios = getAllUsuarios();

            var before = JSON.parse(localStorage.getItem('state'));
            before.usuarios.push(usuario);
            localStorage.setItem('state',JSON.stringify(before));  

        }    


        function removeUsuario(id){
            var usuarios = getAllUsuarios();

            var cache = JSON.parse(localStorage.getItem('state'));

            for (var i = 0 ; i < usuarios.length ; i++){
                if (id = usuarios[i].id){
                    usuarios.splice(i,1);
                }

            }
        // todo           cache.usuarios = 




        }



          	/*
            usuarios.push(usuario);
            localStorage.setItem('state',JSON.stringify(usuarios);
*/


            /*  $scope.state.usuarios = $scope.usuarios.slice(0);
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
*/



            /*
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
        */
/*
        }
    }
})();*/