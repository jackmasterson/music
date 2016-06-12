

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
  musicInfo: ko.observableArray([]),
  favoriteArtistInfo: ko.observableArray([])
};

var viewModel = {

	init: function(){
	//	musicView.init();
	}
};
 
var musicView = {

  init: function() {
    var that = this;
    var item = document.getElementsByClassName('item-val')[0];
    var type = document.getElementsByClassName('type-val')[0];

    $('.search-button').click(function(){
      that.itemVal = $(item).val();
      that.typeVal = $(type).val();
      that.url = "https://api.spotify.com/v1/search?q="+
        that.itemVal+
        "&type="+
        that.typeVal;

      that.render();
    });
  },

    render: function() {
      var that = this;
      var artist, artistImg, spotSite, followers, genres, item,
        album, track;
      $.ajax({
          url: that.url,
          success: function(response) {
     //       console.log(response);
            /*-----search by artist--------*/
            

            /*-----search by album--------*/
            
           // console.log(spotSite);
           // console.log(response.artists.items[0].images[1]);
       //     console.log(that.typeVal);
            var artistVal = that.typeVal === 'artist';
            var trackVal = that.typeVal === 'track';
            var albumVal = that.typeVal === 'album';

            if(artistVal) {
              item = response.artists.items[0];
                  artist = item.name
                  artistImg = item.images[1].url;
                  spotSite = item.external_urls.spotify;
                  followers = item.followers;
                  genres = item.genres;

              model.musicInfo.push({
                'artist': artist,
                'artistImg': artistImg,
                'spotSite': spotSite,
                'followers': followers,
                'genres': genres,
                'addedId': artist+'-added',
                'infoId': artist+'-info'
              });
            }

            if(trackVal) {
              item = response.tracks.items[0];
                artist = item.artists[0].name;
                spotSite = item.external_urls.spotify;
                track = item.name;

                model.musicInfo.push({
                  'artist': artist,
                  'track': track,
                  'spotSite': spotSite
                });
            }

            if(albumVal) {
              item = response.albums.items[0];
                album = item.name;
                spotSite = item.external_urls.spotify;
                albumImg = item.images[0].url;

                model.musicInfo.push({
                  'album': album,
                  'spotSite': spotSite,
                  'albumImg': albumImg
                });
            }

      //      console.log(model.musicInfo()[0]);
            $('#login').hide();
            $('#loggedin').show();
          }
      });

    }
};

var toggle = {

  addClick: function(clicked) {

    var thisId = document.getElementById(this.artist);
    var thisIdAdd = document.getElementById((this.artist) + "-added");
    var infoId = document.getElementById((this.artist) + "-info");
  //  console.log(thisIdAdd);
    $(thisId).hide();
    $('.info').slideDown();
    $(thisIdAdd).show();
    $(infoId).show();
    console.log(model.musicInfo());

  },

  delete: function(clicked) {
 //   console.log(clicked);
   // console.log(this);
    var thisIdAdd = document.getElementById((this.artist) + "-added");
    var infoId = document.getElementById((this.artist) + "-info");
   // $(thisIdAdd).hide();
    //$(infoId).hide();
    var len = model.musicInfo().length;
    console.log(clicked);
    for(var i=0; i<len; i++){
      var artist = model.musicInfo()[i].artist
      console.log(artist);
      console.log(clicked.artist);
      var matched = clicked.artist === artist;
      if(matched){
     //   console.log(this);
        console.log(model.musicInfo());
        model.musicInfo.splice(i, 1);
        console.log(model.musicInfo());
      }
    }


    
  //  var matchingID = thisIdAdd
  //  if(matchingID){
    //  console.log(clicked)
    //}

    var icons = document.getElementsByClassName('icons-div')[0];
  //  console.log(icons)

    //need to refine; arrays will get huge;
    //possible solution is use autocomplete to have a "previous searches"
      //autofill
  },

  hide: function(clicked) {
    console.log(clicked);

  },

  drag: function(clicked) {

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
        }
  })();


ko.applyBindings(viewModel.init());

