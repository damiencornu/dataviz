var fini = 0;
$(function() {
  $.ajax({
      url       : 'timeline.xml',
      dataType  : 'xml'
    }).done(function(xml){
      xml = xml.getElementsByTagName('timeline')[0];
      var mois = xml.getElementsByTagName('mois');
      var moisLength = mois.length;
      for(var i=0; i<moisLength; i++){
        var a = mois[i].getElementsByTagName('evenement'),
            aLength = a.length;
        var $mois = '<div class="mois cf hide" id="mois-'+mois[i].getAttribute('id')+'"></div>';
        $('#evenements').append($mois);
        if(aLength==0){
          $('#mois-'+i).append('<p>Il n\'y a pas d\'événements sur cette période.</p>');
        }
        for (var j=0; j<aLength; j++){
          b = a[j];
          var parti = b.getElementsByTagName('parti')[0].childNodes[0].nodeValue,
              date = b.getElementsByTagName('date')[0].childNodes[0].nodeValue + '.' +mois[i].getAttribute('mois') ,
              titre = b.getElementsByTagName('titre')[0].childNodes[0].nodeValue,
              partiTab = parti.split(','),
              partiClass = '';
              for (var l=0; l<partiTab.length; l++){
                partiClass+= ' parti-'+partiTab[l];
              }
          $evenement = '<div class="event hide cf'+partiClass+'">';
          $evenement+= '<div class="aside">';
          $evenement+= '<div class="pin-parti">';
          for(var k=0; k<partiTab.length; k++){
            $evenement+='<span class="pin-'+partiTab[k]+'" style="left:'+k*12+'px"></span>';
          }
          $evenement+= '</div>';
          $evenement+= '<div class="date">'+date+'</div>';
          $evenement+= '</div><!--/.aside-->';
          $evenement+= '<h3>'+titre+'</h3>';
          $evenement+= '</div><!--/.event-->';
          $('#mois-'+i).append($evenement);
        }
        if(i == moisLength - 1) {
          fini++;
          if(fini == 2){
            showEvents(0);
          }
        }
      }
    });
    $.ajax({
        url       : 'sondage.xml',
        dataType  : 'xml'
      }).done(function(xml){
        xml = xml.getElementsByTagName('sondage')[0];
          var mois = xml.getElementsByTagName('mois');
          var moisLength = mois.length;
          for(var i=0; i<moisLength; i++){
            var a = mois[i].getElementsByTagName('parti'),
                aLength = a.length;
            var $mois = '<div class="mois cf hide" id="sondage-'+mois[i].getAttribute('id')+'"></div>';
            $('#sondage').append($mois);
            if(aLength>0){
              for (var j=0; j<aLength; j++){
                b = a[j];
                var nom = b.getAttribute('nom'),
                    percent = b.getAttribute('percent'),
                    aPrec = '',
                    bPrec = '';
                if(aLength > 0) {
                  aPrec = mois[i-1].getElementsByTagName('parti')[j];
                  if(aPrec) {
                    aPrec = aPrec.getAttribute('percent');
                    bPrec = ' ('+aPrec.replace('.',',')+'% le mois dernier)';
                  }
                }
                    
                $sondage = '<div class="sondage cf parti-'+nom+'">';
                $sondage+= '<img src="img/photo-'+nom+'.jpg" alt="photo candidat" />';
                $sondage+= '<div class="floatLeft">';
                $sondage+= '<p class="chiffres"><span>'+percent.replace('.',',')+'%</span>'+bPrec+'</p>';
                $sondage+= '<div class="graph"><span data-percent="'+percent+'"></span></div>';
                $sondage+= '<p class="nom-parti">'+nom+'</p>';
                $sondage+= '</div>';
                $sondage+= '</div>';
                $('#sondage-'+i).append($sondage);
              }
            } else {
              $('#sondage-'+i).append('<p>Il n\'y a pas de sondage pour cette période.</p>')
            }
          if(i == moisLength - 1) {
              fini++;
              if(fini == 2){
                showEvents(0);
              }
            }
          } // Fin du for mois
    });
});

function showEvents(moisId){
  var mois = $('#mois-'+moisId),
      sondage = $('#sondage-'+moisId);
      
  $('#evenements .mois:not(.hide)').addClass('hide');
  mois.removeClass('hide');
  mois.find('.event').each(function(num, item){
    var $this = $(this);
    $this.delay(num*300).animate({height:'90px'}, 250);
  });
  if(sondage.length>0){
    $('#sondage .mois:not(.hide)').find('.sondage .graph span').each(function() {
      $(this).css('width',0);
    });
    $('#sondage .mois:not(.hide)').addClass('hide');
    sondage.removeClass('hide');
    sondage.find('.sondage .graph').each(function(num, item){
      var $this = $(this).find('span'),
          percentFinal = $this.attr('data-percent') * 7;
          $this.animate({width : percentFinal}, 1000);
    })
  }
}

function sendMonth(moisId){
  showEvents(moisId);
}