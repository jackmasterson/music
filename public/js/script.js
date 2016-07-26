/* use a template data-bind for the staging, listing, and favorites
areas, because they're all so similar and just use a different
observableArray from the model*/

var model = {
	headImg: 
  [
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
  musicInfo: ko.observable(),
  usableInfo: ko.observableArray(),
  typeInfo: 
  [
      {
        'type': 'artist',
        'clickId': 'artistSearch'
      },
      {
        'type': 'album',
        'clickId': 'albumSearch'
      },
      {
        'type': 'track',
        'clickId': 'trackSearch'
      }
  ],
  smallNav: [
    {
      text: 'artist'
    },    
    {
      text: 'track'
    },    
    {
      text: 'album'
    }
  ],
  exp: ko.observableArray(),
  listInfo: ko.observableArray(),
  listUseInfo: ko.observableArray(),
  sortInfo: ko.observableArray()
};

var Option = function(name, value){
  this.name = name;
  this.value = value;
}
var viewModel = {

	init: function(){
   search.init();
  // musicView.highlightClick();
	},

  selectOptions: ko.observableArray([
      new Option("tracks", "track"),
      new Option("artists", "artist"),
      new Option("albums", "album")
  ]),

  chosenOption: ko.observable()
};
 
var musicView = {

  init: function() {
    var that = this;
    $('.search-button').click(function(){
      that.typeVal = viewModel.chosenOption().value;
      that.itemVal = viewModel.chosenOption().name;
      that.searchVal = $('.item-val').val();
    
      that.url = "https://api.spotify.com/v1/search?q="+
        that.searchVal+
        "&type="+
        that.typeVal;

      that.ajax();
    });
  },

  ajax: function() {
      var that = this;
      var artist, itemImg, spotSite, followers, genres, item,
        album, track, type;

      $.ajax({
          url: that.url,

          success: function(data){
           // console.log(data);
            model.usableInfo.removeAll();
            model.musicInfo(data);
            musicView.render(musicView.itemVal);
          }
      });
    },

    moreInfo: function(data, named){

      if(data){
        musicView.use['imaged'] = ko.observable(false);
        musicView.use['artists'] = ko.observable(false);
        musicView.use['followers'] = ko.observable(false);
        musicView.use[named] = ko.observable(data);
        model.usableInfo.push(musicView.use);
      }
    },

    render: function(typed) {
        
        var info = model.musicInfo();
        var item = info[typed];
        var items = item.items;

        items.forEach(function(data){
       //   console.log(data);
          var name = data.name;
          var type = data.type;
          var spotSite = data.external_urls.spotify;
          musicView.use = {};
          musicView.use['name'] = name;
          musicView.use['type'] = type;
          musicView.use['spotSite'] = spotSite;
          
          musicView.moreInfo(data.artists, 'artists');
          musicView.moreInfo(data.images, 'imaged');
          
       //   musicView.moreInfo(data.followers, 'followers');
        });

        
     
    },

    highlightClick: function(clicked){

      musicView.spot = document.getElementById(clicked.spotSite);
      var par = $(musicView.spot).parent();
     // console.log(par);
      musicView.parClass = par[0].className;
      
      if(musicView.parClass === 'staged'){
        model.listInfo.push(clicked);
      }

      $(musicView.spot).css('opacity', '1');
   //   console.log(model.usableInfo());

    },

    addClick: function(clicked){
      model.listInfo().forEach(function(each){
        model.listUseInfo.push(each);
      })
     // model.listUseInfo.push(model.listInfo());
      console.log(model.listUseInfo());
      model.listInfo.removeAll();
      model.usableInfo.removeAll();
    //  console.log(musicView.spot);

      
      $('.stage').hide();
      $('.list').show();
      

      musicView.changeOpacity();

    },

    changeOpacity: function() {
        
        $('.listed').children().css('opacity', '1');
        $('.listed').children().css('display', 'inline-block');
        $('.stageUl').hide();
        var classed = '.'+model.listUseInfo()[0].type;
        $(classed).show();


    },

    filterList: function(clicked) {

      console.log(this);
      var classedUl = "."+this.text;

      var id = "#"+this.text;
      $('.stageUl').hide();
      $('.text').css('color', 'white');
      $(id).css('color', 'red');
    //  
    //$('.album').show();
      $(classedUl).show();
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
    console.log(model.listInfo());
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

    if(model.expInfo()[0] === undefined){
      $('.info').hide();
      $('.cutesy').show();
    }
    $('.jumbo').hide();
  },

  navShow: function(clicked) {
    var clickedId = clicked.clickId;
    var clickedEl = document.getElementsByClassName(clickedId);
    var title = document.getElementsByClassName(this.title);

  }
};

var count = {

  up: function(clicked){
   // console.log(this);
    var clickedId, children, counter;

      clickedId = document.getElementById(clicked.name);
      children = $(clickedId).children();
      counter = $(children).children('h3');
      var up = document.getElementsByClassName('up')[0];

      function filter(){
          x = counter[0].innerHTML;
          return ++x;      
     };
     counter[0].innerHTML = filter();
     clicked.value(counter[0].innerHTML);
     count.sorting();
 },

  down: function(clicked){
      var clickedId, children, counter;

      clickedId = document.getElementById(clicked.name);
      children = $(clickedId).children();
      counter = $(children).children('h3');
      var up = document.getElementsByClassName('up')[0];
      function filter(){
          x = counter[0].innerHTML;
          if(x>0){
            return --x;
          }
          else {
            return x=0;
          }
     };
     counter[0].innerHTML = filter();
     clicked.value(counter[0].innerHTML);
     count.sorting();

  }, 

  sorting: function() {
      var aValArr = [];
      var bValArr = [];
      function sort(a, b){
        aVal = a.value();
        aValArr.push(aVal);
        bVal = b.value();
        bValArr.push(bVal);
        if(aVal<bVal){
          return -1;
        }
        if(aVal>bVal){
          return 1;
        }
        return 1;
      }
  //    console.log(aValArr.length, bValArr.length);
      if((aValArr.length>-1) && (bValArr.length>-1)){

        var sorted = model.expInfo().sort(sort);
        var reversed = sorted.reverse();
        model.sortInfo.push(sorted);
        return model.sortInfo()[0];
      }
      
        return model.expInfo()[0];
     
  }
};

var search = {

  init: function() {
    var that = this;

    $(".auto-search").keyup(function(){
      that.auto();
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

