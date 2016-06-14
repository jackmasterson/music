

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
  favoritesInfo: ko.observableArray([]),
  artistInfo: ko.observableArray([]),
  albumInfo: ko.observableArray([]),
  trackInfo: ko.observableArray([]),
  typeInfo: ko.observableArray([])
};

var viewModel = {

	init: function(){
	//	musicView.init();
   // dragIt.init();
	}
};
 
var musicView = {

  init: function() {
    var that = this;
    model.typeInfo.push({'type': 'Artist',
                         'clickId': 'artistSearch'},
                        {'type': 'Album',
                         'clickId': 'albumSearch'},
                        {'type': 'Track',
                         'clickId': 'trackSearch'});

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
      var artist, itemImg, spotSite, followers, genres, item,
        album, track;

     // console.log(model.typeInfo());
      $.ajax({
          url: that.url,
          success: function(response) {
         //   console.log(response);

            var artistVal = that.typeVal === 'artist';
            var trackVal = that.typeVal === 'track';
            var albumVal = that.typeVal === 'album';

            if(artistVal) {
              item = response.artists.items[0];
                  artist = item.name;
                  itemImg = item.images[1].url;
                  spotSite = item.external_urls.spotify;
                  followers = item.followers;
                  genres = item.genres;

              model.musicInfo.push({
                'title': 'artistSearch',
                'type': 'Artist',
                'artist': artist,
                'itemImg': itemImg,
                'spotSite': spotSite,
                'track': ko.observable(false),
                'album': ko.observable(false),
                'followers': followers,
                'addedId': artist+'-added',
                'infoId': artist+'-info',
                'stageId': artist+'-stage'
              });
            }

            if(trackVal) {
              item = response.tracks.items[0];
                artist = item.artists[0].name;
                //itemImg = artist.images[1].url;
                spotSite = item.external_urls.spotify;
                track = item.name;

                model.musicInfo.push({
                  'title': 'trackSearch',
                  'type': 'Track',
                  'artist': artist,
                  'itemImg': ko.observable(false),//itemImg,
                  'spotSite': spotSite,
                  'track': track,
                  'album': ko.observable(false),
                  'followers': ko.observable(false),
                  'addedId': track+'-added',
                  'infoId': track+'-info',
                  'stageId': track+'-stage'
                });
            }

            if(albumVal) {
              item = response.albums.items[0];
                album = item.name;
                spotSite = item.external_urls.spotify;
                itemImg = item.images[0].url;

                model.musicInfo.push({
                  'title': 'albumSearch',
                  'type': 'Album',
                  'artist': ko.observable(false),
                  'itemImg': itemImg,
                  'spotSite': spotSite,
                  'track': ko.observable(false),
                  'album': album,
                  'followers': ko.observable(false),
                  'addedId': album+'-added',
                  'infoId': album+'-info',
                  'stageId': album+'-stage'
                });
            }

      //      console.log(model.musicInfo()[0]);
            $('icons-each').hide();
            $('#login').hide();
            $('#loggedin').show();
          }
      });

    }
};

var toggle = {

  addClick: function(clicked) {
      model.artistInfo.removeAll();
      model.albumInfo.removeAll();
      model.trackInfo.removeAll();

      var modelTitle, clickedTitle, matchedArt, matchedAlb, matchedTrack,
        modelType, typeId;
      var title;
      var infoId = document.getElementById(title + "-info");
      var len = model.musicInfo().length;

      model.favoritesInfo.push(clicked);

      model.favoritesInfo().forEach(function(fav){
        var allEl = document.getElementsByClassName('fav-li');
        $('.fav-li').children().css("color", "white");
     /*   var allLen = allEl.length;
        for(var t=0; t<len; t++){
          console.log(allEl);
          console.log(allEl[t]);
          allEl[t].children().css("color", 'white');
        }*/

        var type = fav.type;
        var artMatch = type === 'Artist';
        var albMatch = type === 'Album';
        var trackMatch = type === 'Track';
        $('icons.each').hide();

        if(artMatch){
          var el = document.getElementById(fav.type);
          el.style.color = 'red';
          model.artistInfo.push(fav);
          typeId = "#"+fav.type;
          $("artistSearch").show();
          $(typeId).trigger('click');

        }

        if(albMatch){
          var el = document.getElementById(fav.type);
          el.style.color = 'red';
          model.albumInfo.push(fav);
          typeId = "#"+fav.type;
          $("albumSearch").show();
          $(typeId).trigger('click');
        }

        if(trackMatch){
          var el = document.getElementById(fav.type);
          el.style.color = 'red';
          model.trackInfo.push(fav);
          typeId = "#"+fav.type;
          $("trackSearch").show();
          $(typeId).trigger('click');
        }


      });

      for(var i=0; i<len; i++){

        modelTitle = model.musicInfo()[i].title;
        clickedTitle = clicked.title;
        matched = modelTitle === clickedTitle;

        if(matched){
          model.musicInfo.splice(i, 1);
        }
      }

      $(".info").show();
  },

  deleteStage: function(clicked) {
      var modelTitle, clickedTitle, matched;
      var len = model.musicInfo().length;
      
      for(var i=0; i<len; i++){
        modelTitle = model.musicInfo()[i].title;
        clickedTitle = clicked.title;
        matched = modelTitle === clickedTitle;

        if(matched){
          model.musicInfo.splice(i, 1);
        }
      }
  },

  delete: function(clicked) {

  },

  deleteIcon: function() {  

  },

  navShow: function(clicked) {
  //  console.log(clicked);
    var clickedId = clicked.clickId;
 //   console.log(clickedId);
    var clickedEl = document.getElementsByClassName(clickedId);
  //  console.log(clickedEl);
    var title = document.getElementsByClassName(this.title);
  //  console.log(model.musicInfo());
   // var titleId = "#"+title;
    $('.icons-each').hide();
    $(clickedEl).show();
   // $(titleId).show();
  //  console.log(model.favoritesInfo());

    model.favoritesInfo().forEach(function(click){
 //     console.log(click);
    })

  },

  drag: function(clicked) {
     //   console.log(this);
        var infoId = document.getElementById((this.artist) + "-info");
        var ID = "#"+infoId

        $( infoId ).draggable({
          axis: "y",
          containment: ".icons-div",
          opacity: "0.3",
          revert: "invalid",
          scope: "favorites",
          scroll: "true",
          snap: "true"
        });
        $( ".will-drop" ).droppable({
          accept: infoId,
          addClasses: "droppable",
          hoverClass: "highlight",
          scope: "favorites"
        });
  //  dragIt.init();

  }
};

var dragIt = {
  
  init: function() {
    console.log(this);

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

