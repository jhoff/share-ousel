//$("#footer_left").qtip({ content: 'Sharing is simple! Just drag the icon of your choice onto the story you want to share!', show: 'mouseover', hide: 'mouseout', style: { tip: true, name: 'dark', border: { width: 1, radius: 4, color: '#000000' } }, position: { corner: { target: 'rightTop', tooltip: 'leftBottom' }, adjust: { x: -80, y: 25 } } });
//Get a random starting point for the image thinger
$(document).ready(function() {
	Shadowbox.init({
		showMovieControls: 	false,
		displayNav:			false
	});
	
	var start = Math.floor(Math.random() * document.getElementById('share_ousel').getElementsByTagName('img').length);
	var share_ousel = new ImageFlow();
	share_ousel.init({ ImageFlowID: 'share_ousel',
	                      circular: true,
	                      reflections: false,
	                      reflectionP: 0,
	                      slider: false,
	                      captions: true,
	                      buttons: false,
	                      opacity: false,
	                      xStep: 75,
						  height: 100,
						  width: 300,
	                      percentLandscape: 90, 
	                      percentOther: 50, 
	                      imageFocusM: 1.3,
	                      imageFocusMax: 3,
	                      slideshow: true,
	                      slideshowAutoplay: true,
	                      slideshowSpeed: 3000,
	                      startID: start });

	                $(".shareable").each(function() { $(this).droppable({
	                        accept: '.ui-draggable',
	                        drop: function(event,ui){ shareHandler(ui.helper[0].id,this.id); },
	                        over: function(event,ui){ $(this).effect('highlight',{color: '#006699'},5000); },
	                        out: function(event,ui){ $(this).stop(true,true); }
	                }) });

					$("#share_ousel img").each( function() {
						$( this ).draggable({
							appendTo: 'body', 
							helper: function(event) {
								return "<img src=\"" + $(this)[0].src + "\" id=\"" + $(this)[0].id + "\">";
							}
						});
					});
});

function get_properties(object) {
     var _output = "";
     jQuery.each(object, function(name, value) {
          _output = _output + "<b>" + name + ": </b><pre>" + value + "</pre><br>";
     });
     return _output;
}

function shareHandler(share_method,element) {
	var sharelink = ($('#'+element).attr('sharelink')?$('#'+element).attr('sharelink'):location.href);
	var title = ($('#'+element).attr('title')?$('#'+element).attr('title'):"Shared content from " + location.href);
    switch(share_method) {
          case 'share_facebook':
               var url = "http://www.facebook.com/sharer.php?u=" + sharelink + "&t=" + title;
               window.open(url,"FacebookShare","width=700,height=300");
               break;
          case 'share_twitter':
               var url = "http://twitter.com/home?status=Share-ousel+is+awesome:+" + sharelink;
               window.open(url,"TwitterShare","width=800,height=400");
               break;
          case 'share_digg':
               var url = "http://digg.com/submit?url=" + sharelink + "&title=" + title;
               windowopen(url,"DiggShare");
               break;
          case 'share_mixx':
               var url = "http://www.mixx.com/submit?page_url=" + sharelink;
               windowopen(url,"MixxShare");
               break;
          case 'share_reddit':
               var url = "http://reddit.com/submit?url=" + sharelink + "&title=" + title;
               windowopen(url,"RedditShare");
               break;
          case 'share_delicious':
               var url = "http://del.icio.us/post?v=2&url=" + sharelink + "&title=" + title;
               windowopen(url,"DeliciousShare");
               break;
          case 'share_stumbleupon':
               var url = "http://www.stumbleupon.com/submit?url=" + sharelink + "&title=" + title;
               windowopen(url,"StumbleuponShare");
               break;
          default:
               alert('This function is not ready yet!');
               break;
     }
}

function windowopen(url,name) {
	Shadowbox.open({
		content:    url,
		title: 		name,
		player:     "iframe",
		width: 		1000,
		height: 	700, 
	});
}