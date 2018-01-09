$(document).ready(function(){
	var $moviesBox = $('#movies');
	var template = $('#movie-template').html();
	var $singlemoviebox = $('#movie');
	var singleTemplate = $('#single-movie-template').html();


	function addMovies(movie){
		$moviesBox.append(Mustache.render(template,movie));
	}

	function showMovie(movieData){
		$singlemoviebox.append(Mustache.render(singleTemplate,movieData));
	}

	$('#searchForm').on('submit',function(e){
		$moviesBox.html("");
		e.preventDefault();
		var searchtext = $('#searchText').val();
		getMovies(searchtext);
	});

	function getMovies(searchtext){
		axios.get('http://www.omdbapi.com/?s='+searchtext+'&apikey=6a09eded')
		.then(function(response){
			var movies = response.data.Search;
			

			$.each(movies,function(i,movie){
				addMovies(movie);
			})
		})
		.catch(function(err){
			console.log(err);
		})
	}

	$moviesBox.on('click','a',function(e){
		e.preventDefault();
		var id = $(this).data('id');
		// console.log(id);

		
			sessionStorage.setItem('movieId', id);
			window.location = 'movie.html';
			return false;
	
		
	});

	function getMovie(){
		var moviepageid = sessionStorage.getItem('movieId');
		// console.log(moviepageid);

		axios.get('http://www.omdbapi.com/?i='+moviepageid+'&apikey=6a09eded')
		.then(function(response){
			// console.log(response);
			var movie = response.data;
			showMovie(movie);

		})
		.catch(function(err){
			console.log(err);
		})
	};

	getMovie();

	
	


});