

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
  typeInfo: ko.observableArray([]),
  exp: ko.observableArray(),
  expInfo: ko.observableArray()
};

var viewModel = {

	init: function(){
	//	musicView.init();
   // dragIt.init();
   search.init();
	}
};
 
var musicView = {

  init: function() {
    var that = this;
    model.typeInfo.push({'type': 'artist',
                         'clickId': 'artistSearch'},
                        {'type': 'album',
                         'clickId': 'albumSearch'},
                        {'type': 'track',
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
        //    console.log(response);
            model.exp.push(response);
            var exp = model.exp();
            var itemLen, typed, len, item;
            var len = model.exp().length;
            var inf = model.musicInfo();


              for(var t=0; t<len; t++){
                 typed = Object.getOwnPropertyNames(exp[t])[0];
           //      console.log(typed);
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
                var type = item[i].type;
          //      console.log(type);
                var spotSite = item[i].external_urls.spotify;
         
                var followers = ko.observable(false);
                var itemImg = ko.observable(false);
                var artist = ko.observable(false);

                if(item[i].images !== undefined && item[i].images.length > 0){
                  itemImg = item[i].images[1].url;
                }

                if(item[i].artists !== undefined){
                    artist = item[i].artists[0].name;
                }

                if(item[i].followers !== undefined){
                  followers = item[i].followers;
                }
                importantInfo = 
                  {
                   name: name,
                   itemImg: itemImg,
                   artist: artist,
                   spotSite: spotSite,
                   followers: followers,
                   type: type
                  };

                 model.musicInfo.push(importantInfo);
                 
              }

         
         //   $('icons-each').hide();
            $('#login').hide();
            $('#loggedin').show();
          }
      });
    },

    addClick: function(clicked){
      
      model.expInfo.push(clicked);
      
      model.expInfo().forEach(function(info){

        var type = info.type;
        var typeId = "#"+type;
        var typeClass= "."+type;
       
        $(typeId).click(function(){
          $('.iconsUl').hide();
          $(typeClass).show();
          $('.fav-a').css("color", "white");
          $(typeId).css("color", "red")
        });
        $(typeId).trigger("click");

      });

      $(".stage").hide();
      $(".info").show();

    }
};
var x = 0;
var toggle = {

  init: function(){
    $('.cutesy').slideUp(function(){
      $('.stage').slideDown();
    });
  },

  deleteStage: function(clicked) {
    $('.stage').hide();
    $('.cutesy').show();
  },

  delete: function(clicked) {
    var index;
    model.expInfo().forEach(function(info){

      if(clicked === info) {
        index = model.expInfo().indexOf(info);
        model.expInfo.splice(index, 1);
      }
    })
    console.log(model.expInfo()[0]);
    if(model.expInfo()[0] === undefined){
      $('.info').hide();
      $('.cutesy').show();
    }
  },

  navShow: function(clicked) {
    var clickedId = clicked.clickId;
    var clickedEl = document.getElementsByClassName(clickedId);
    var title = document.getElementsByClassName(this.title);

  }
};

var count = {

  up: function(clicked){
    console.log(this);
    var clickedId, children, counter;

      clickedId = document.getElementById(clicked.name);
      children = $(clickedId).children();
      counter = $(children).children('h3');
      var up = document.getElementsByClassName('up')[0];
          console.log(clicked);
    console.log(up);
      function filter(){
          x = counter[0].innerHTML;
          return ++x;
          
       
     };
     counter[0].innerHTML = filter();
  },

  down: function(clicked){
        console.log(this);
        var clickedId, children, counter;

      clickedId = document.getElementById(clicked.name);
      children = $(clickedId).children();
      counter = $(children).children('h3');
      var up = document.getElementsByClassName('up')[0];
          console.log(clicked);
        console.log(up);
      function filter(){
          x = counter[0].innerHTML;
          return --x;
          
       
     };
     counter[0].innerHTML = filter();

  }
};

var search = {

  init: function() {
    var that = this;

    $(".auto-search").keyup(function(){
      that.auto();
    });
  },

  auto: function() {
    var that = this;
    this.source = [];
    model.expInfo().forEach(function(each){
      console.log(each);
      that.source.push(each.name);
      
    })
    console.log(this.source);
    $(".auto-search").autocomplete({
      source: that.source,
      select: function(e, ui){
        if(e.keyCode === 9){
         // that.getVal();
        }
      }
    });
  }
};


var slide = {

  out: function() {
    $(".icons").animate({
      opacity: 1,
      left: "1"
    });
  },

  in: function() {
    $(".icons").animate({
      opacity: 0,
      left: "-30vw"
    });
  }
};

var enlarge = {
  
  in: function(clicked) {
    

    var clickId = "."+clicked.name;
    console.log([clicked.name]);
    var clickArr = [clicked.name];
    console.log(JSON.stringify(clickArr));

    var str = clicked.name;
    console.log(str);
    var res = str.split(' ');
   // var resClass = "."+res;
   // var res = str.replace("' '", ".");
    console.log(res);
    var resClass = "."+res[0];


    //var string = clickId.stringify();
    //console.log(string);
  
    $(".jumboUl").hide();
    $(resClass).show();
    $(".jumbo").slideDown();
  },

  out: function(clicked){
    $(".jumbo").slideUp();
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

