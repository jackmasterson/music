 addClick: function(clicked) {
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

          console.log(model.artistInfo());
          console.log(fav);

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