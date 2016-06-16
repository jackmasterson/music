
var x = 0;
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
  typeInfo: ko.observableArray([]),
  exp: ko.observableArray(),
  expStage: ko.observableArray()
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
        album, track, type;

     // console.log(model.typeInfo());
      $.ajax({
          url: that.url,
          success: function(response) {
            console.log(response);
            model.exp.push(response);
            var exp = model.exp();
            var itemLen, typed, len, item;
            var len = model.exp().length;
            var inf = model.musicInfo();

              for(var t=0; t<len; t++){
                 typed = Object.getOwnPropertyNames(exp[t])[0];
                 console.log(typed);
                if(typed === 'artists'){
                  item = response.artists.items;
                }

                if(typed === 'tracks'){
                  item = response.tracks.items;
                }

                if(typed === 'albums'){
                  item = response.albums.items;
                }

              }
              model.exp.removeAll();
              
              itemLen = item.length;
              
              model.musicInfo.removeAll();

              for(var i=0; i<itemLen; i++){
                
                var name = item[i].name;
                var itemImg = ko.observable(false);
                var artist = ko.observable(false);
                if(item[i].images !== undefined){
                    itemImg = item[i].images[1].url;
                }
                if(item[i].artists !== undefined){
                    artist = item[i].artists[0].name;
                    console.log(artist);
                }
                  
                 model.musicInfo.push({name: name, 'itemImg': itemImg, 'artist': artist});
              }

         
            $('icons-each').hide();
            $('#login').hide();
            $('#loggedin').show();
          }
      });

    }
};

var typed;
var toggle = {

  init: function(){
    $('.cutesy').slideUp(function(){
      $('.stage').slideDown();
    });
  },

  addClick: function(clicked){
 //   console.log(clicked);
    typed = clicked.type;
   // console.log(typed);
    
    function typeIt(){
      var all = "model."+typed+"Info()";
   //   console.log(all);
     // return all;
    
      return function(){
        var all = "model."+typed+"Info()";
    //    console.log(all);
      //  typeIt();
      };
    };
   // console.log(typeIt());
    // addClick: function(clicked) {
      model.artistInfo.removeAll();
      model.albumInfo.removeAll();
      model.trackInfo.removeAll();

      //instead of removing all, why not just add the latest?
      //that way the add/subtract counter won't get messed up
      //every time you add a new one

      var modelTitle, clickedTitle, matchedArt, matchedAlb, matchedTrack,
        modelType, typeId;
      var title;
      var infoId = document.getElementById(title + "-info");
      var len = model.musicInfo().length;

      model.favoritesInfo.push(clicked);

      model.favoritesInfo().forEach(function(fav){
        var allEl = document.getElementsByClassName('fav-li');
        $('.fav-li').children().css("color", "white");


        var type = fav.type;
        var artFav = fav.artist;
        var artClick = clicked.artist;
        var artMatch = type === 'Artist';
        var noArtDup = artFav !== artClick;
        var albMatch = type === 'Album';
        var trackMatch = type === 'Track';
        $('icons.each').hide();

        if(artMatch){
        //  console.log(fav);

          var el = document.getElementById(fav.type);
          el.style.color = 'red';

          model.artistInfo.push(fav);
          typeId = "#"+fav.type;
          $("artistSearch").show();
          $(typeId).trigger('click');

    //      console.log(model.artistInfo());
      //    console.log(fav);

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

    //  toggle.addExp();

  },

  addExp: function(clicked) {
  //  console.log(model.exp());
    var exp = model.exp();
   // console.log(exp);
    var len = exp.length;
    var arr = [];
    var stage = model.expStage();
    stage = [];
    for(var i=0;i<len;i++){

      var typed = Object.getOwnPropertyNames(exp[i])[0];
      arr = [];
      if(typed === 'artists'){
        
        arr.push(exp[i].artists);
      }
      if(typed === 'albums'){
       
        arr.push(exp[i].albums);
      }
      if(typed === 'tracks'){
   
        arr.push(exp[i].tracks);
      }
    }
  //  console.log(arr[0].items);
    var item = arr[0].items;
    var itemLen;
    if(item.length>5){
      itemLen = 5;
    }
    else {
      itemLen = item.length;
    }
    for(var t=0; t<itemLen; t++){
    //  model.expStage().removeAll();

      console.log(item[t])
      model.expStage.push(item[t]);
      console.log(model.expStage());
    }


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
    var clickedId = clicked.clickId;
    var clickedEl = document.getElementsByClassName(clickedId);
    var title = document.getElementsByClassName(this.title);
    $('.icons-each').hide();
    $(clickedEl).show();

  },

  up: function(clicked) {
   var el = document.getElementById(clicked.artist);
   $(el)[0].innerHTML = ++x;

  },

  down: function(clicked) {
    var el = document.getElementById(clicked.artist);
    $(el)[0].innerHTML = --x;
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

