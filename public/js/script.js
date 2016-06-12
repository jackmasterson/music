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
	],
  musicInfo: []
};

var viewModel = {

	init: function(){
	//	musicView.init();
	}
};

var musicView = {

  init: function() {
    console.log('hey');
    var that = this;
    var item = document.getElementsByClassName('item-val')[0];
    var type = document.getElementsByClassName('type-val')[0];
    var itemVal, typeVal;

    $('.search-button').click(function(){
      console.log('hoo');
      itemVal = $(item).val();
      typeVal = $(type).val();
      that.url = "https://api.spotify.com/v1/search?q="+
        itemVal+
        "&type="+
        typeVal;

      that.render();
    });
  },

    render: function() {
      var that = this;

      $.ajax({
          url: that.url,
          success: function(response) {
            console.log(response);
            /*-----search by artist--------*/
            var item = response.artists.items[0];
            var artist = item.name
            var artistImg = item.images[1];
            var spotSite = item.external_urls.spotify;
            var followers = item.followers;
            var genres = item.genres;
            /*-----search by album--------*/
            
            console.log(spotSite);
            console.log(response.artists.items[0].images[1]);
            model.musicInfo.push({
              'artist': artist,
              'artistImg': artistImg,
              'spotSite': spotSite,
              'followers': followers,
              'genres': genres
            });

            console.log(model.musicInfo);
            $('#login').hide();
            $('#loggedin').show();
          }
      });

    }
};

	(function() {
        /**
         * Obtains parameters from the hash of the URL
         * @return Object
         */
        function getHashParams() {
          var hashParams = {};
          var e, r = /([^&;=]+)=?([^&;]*)/g,
              q = window.location.hash.substring(1);
          while ( e = r.exec(q)) {
             hashParams[e[1]] = decodeURIComponent(e[2]);
          }
          return hashParams;
        }
        var oauthSource = document.getElementById('oauth-template').innerHTML,
            oauthTemplate = Handlebars.compile(oauthSource),
            oauthPlaceholder = document.getElementById('oauth');
        var params = getHashParams();
        var access_token = params.access_token,
            refresh_token = params.refresh_token,
            error = params.error;
        if (error) {
          alert('There was an error during the authentication');
        } else {
          if (access_token) {
            // render oauth info
            musicView.init();
              $('#login').hide();
              $('#loggedin').show();
          } else {
              // render initial screen
              $('#login').show();
              $('#loggedin').hide();
          }
          document.getElementById('obtain-new-token').addEventListener('click', function() {
            $.ajax({
              url: '/refresh_token',
              data: {
                'refresh_token': refresh_token
              }
            }).done(function(data) {
              access_token = data.access_token;
              oauthPlaceholder.innerHTML = oauthTemplate({
                access_token: access_token,
                refresh_token: refresh_token
              });
            });
          }, false);
        }
      })();


ko.applyBindings(viewModel.init());