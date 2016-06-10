//key = RCSWLKK118ZODUFE

var model = {
	headImg: [
		{
			src:'img/search.png',
			text: "Search"
		}, 
		{
			src:'img/save.png',
			text: "Save"
		}, 
		{
			src:'img/friends.png',
			text: "Share"
		}
	]
};

var viewModel = {

	init: function(){
		musicView.init();
	}
};

var musicView = {

	init: function() {
		var that = this;
		var searchBar = document.getElementsByClassName('search')[0];


		$('.search-button').click(function(){
			val = $(searchBar).val();
			//console.log(val);
			that.key = "RCSWLKK118ZODUFE";
			that.url = "https://freemusicarchive.org/api/trackSearch?q="+val+"&limit=10"
			 + that.key;
			that.render();

		});

			
		
			

	

		
	},

	render: function(){

		var that = this;
		$.ajax({
			url: this.url,
			dataType: 'json'
		})
		.done(function(response){
			console.log(response);
		});
	}
};

ko.applyBindings(viewModel.init());