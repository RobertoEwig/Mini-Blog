
angular.module("miniblog", []);

angular.module("miniblog").controller("PostControl", function($scope, $http){
	
	var postPerPag = 10;
	
	//carregar os posts da API
	loadPosts =  function(){
		$http.get('https://jsonplaceholder.typicode.com/posts').then(function (response){
			posts = response.data;
			numberPosts = posts.length;
			//carregar o numero de posts dado pela var "postPerPag"
			for(var i = 0; i<postPerPag; i++){
				view.push(posts[i]);
			}
			//sectio guarda qual a seção do "postPerPag" esta sendo lida, exemplo, na pagina 2 o sction esta em 20.
			section = postPerPag;
		});
	};
	
	//Deixar em maiusculo a primeira letra de uma frase ou string
	$scope.stringUp = function(string){
		var newString;
		
		newString = string[0].toUpperCase();
		
		for(var i = 1; i < string.length; i++){
			newString+= string[i];
		}
		
		return newString;
	};
		
	//mostra a atual seção de post na pag principal, obedecendo o "postPerPag" 
	$scope.nextView = function(){
		view = [];
		for(var i = section; i<section+postPerPag; i++){
			if(i == numberPosts)
				break
			else
				view.push(posts[i]);
		}	
		section = section + postPerPag;
		scroll(0,0); 
	};
	
	//carrega os usuarios da API
	loadUsers = function(){
		$http.get('https://jsonplaceholder.typicode.com/users').then(function (response){
			users = response.data;
		});
	};		
	
	//carrega os comentarios da API
	loadComments = function(){
		$http.get('https://jsonplaceholder.typicode.com/comments').then(function (response){
			comments = response.data;
		});
	};
	
	//alterna entre a visão limitada de 10 posts e a visão de todos os posts para a busca
	$scope.getPosts = function(){	
		if(buscaOn)
			return posts;
		else
			return view;
	};
	
	//retorna o vetor de usuarios
	$scope.getUsers = function(){
		return users;
	};		

	//retorna o veotr de comentarios
	$scope.getComments = function(){
		return comments;
	};		
	
	//saber se os ids de comentarios e usuarios são iguais ao do posts
	$scope.search = function(a, b){
		if(a===b)
			return true;
		else
			return false;
	};
	
	//alternar entre post e as informações do usuario
	$scope.outUser = function(user){
		tempUser = user;
		homeOn = false;
		userOn = true;
	};
	
	//retorna o usuario clicado no post
	$scope.getUserView = function(){
		return tempUser;
	};
	
	//variavel do ng-model para as buscas
	$scope.buscaPag;
	
	//guarda as variavels da pagina principal
	$scope.setHomeOn = function(){
		buscaOn = false;
		homeOn = true;
		userOn = false;
		this.buscaPag=undefined;
	};
	
	//verificar se ha algum usuario sendo visto
	$scope.isUserOn = function(){
		return userOn;
	};
	
	//verificar se esta na tela inicial
	$scope.isHomeOn = function(){
		return homeOn;
	};
	
	//objeto contendo informações para abertura de comentarios de cada post
	$scope.showComment = {
		//obejto contendo o id do post e se os comentarios estão ativos ou não
		postComment: [
			{	
				postId: "",
				commentOn: false,
			}
		],
		
		//procura se ja ha algum objeto do tipo "postComment" linkado a algum post se houver ele salva o inverso do boolean "commentOn", se não houver ele cria um novo objeto.
		setComment:	function(postId){
			var i;
			for(i = 0;i<this.postComment.length;i++){
				if(this.postComment[i].postId === postId){
					this.postComment[i].commentOn = !this.postComment[i].commentOn; 
					break;
				}
			}
			
			if(i==this.postComment.length)
				this.postComment.push({postId: postId, commentOn: true});
			
		},
		
		//retorna se os comentarios daquele post esta on ou não
		isCommentOn: function(id){
			var i;
			for(i in this.postComment){
				if(this.postComment[i].postId === id){
					return this.postComment[i].commentOn;
				}
			}
		}
	};

	//restorna se ha alguma busca ativa
	$scope.getBusca = function(){
		return buscaOn;
	}
	
	//caso comece alguma busca, avisa a variavel
	$scope.setBuscar = function(bool){
		buscaOn = bool;
	};
	
	//carregar os posts, users e comments
	loadPosts();
	loadUsers();
	loadComments();
});

var buscaOn = false;

var section;

var homeOn = true;

var userOn = false;

var tempUser;

var numberPosts = 5;

var view = [];

var posts =[]; 

var users = [];

var comments = [];
