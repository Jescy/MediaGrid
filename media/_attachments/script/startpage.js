var h, w, vert, b, d;
var b2 = $('#DirListing2').attr('href');
var b3 = $('#DirListing3').attr('href');
var sleep = true;
var doc = {};

var path = unescape(document.location.pathname).split('/'),
	design = path[3],
	db = $.couch.db(path[1]);

function Setup() {
	h = window.innerHeight;
	w = window.innerWidth;
	vert = (h > w);

	if (vert) {
		b = (h/4 > w/2) ? w/2 : h/4;
		$('#DirButton').css({'top':(h/2)-(1.5*b), 'left':(w-b)/2, 'width':b, 'height':b}).addClass('top').removeClass('left');
		$('#DirButton3').css({'top':(h/2)-(0.5*b), 'left':(w-b)/2, 'width':b, 'height':b});
		$('#DirButton2').css({'top':h/2+(0.5*b), 'left':(w-b)/2, 'width':b, 'height':b});
		$('#DirButton2Box').addClass('bottom').removeClass('right');
		$('#title').css('top',(h/2)-(1.5*b)-70);
	} else {
		b = (h/2 > w/4) ? w/4 : h/2;
		$('#DirButton').css({'top':(h-b)/2, 'left':(w/2)-(1.5*b), 'width':b, 'height':b}).addClass('left').removeClass('top');
		$('#DirButton3').css({'top':(h-b)/2, 'left':(w/2)-(0.5*b), 'width':b, 'height':b});
		$('#DirButton2').css({'top':(h-b)/2, 'left':w/2+(0.5*b), 'width':b, 'height':b});
		$('#DirButton2Box').addClass('right').removeClass('bottom');
		$('#title').css('top',(h-b)/2-70);
	}
	$('.icon').css({'height':b*11/15,'top':b*2/15 + 'px'});
	$('#DirButtonBox').parent().css({'width':b, 'height':b});
	$('#DirButton2Box').css({'width':b, 'height':b});
	$('#DirButton3Box').css({'width':b, 'height':b});
	//alert($('#DirButtonBox').parent().css('width'));
	var test = $('#DirButtonBox').upload({
		name:'_attachments', 
		autoSubmit: false, 
		onSelect: function() {
		  var form = $("form"); 
		  doc = {
		    type: 'FILE',
		    dir: null,
		    created_at: new Date()
		  };
		  db.saveDoc(doc, {
		    success: function() {
			test.set({
			  action: db.uri + $.couch.encodeDocId(doc._id),
			  params: {
			    _rev: doc._rev
			  }
			});
			test.submit();
		    }
		  });
		},
		onComplete: function(){
			Explode(function() {
				location.href=b2;
			});
		}
	});
}

function Rotate() {
	d = $('#DirButtonBox').detach();
	$('#DirButton').empty();
	$('#DirButton').append(d);
	Setup();
}

$(document).ready(function(){
	window.addEventListener("resize", Rotate, false);
	window.addEventListener("orientationchange", Rotate, false);
	window.onorientationchange = Rotate;
	Setup();
	$('#DirListing2').attr('href','javascript:void(0);');
	$('#DirListing3').attr('href','javascript:void(0);');
});

$('#DirButton2').click(function(){
	Explode(function() {
		location.href=b2;
	});
});

$('#DirButton3').click(function(){
	Explode(function() {
		location.href=b3;
	});
});

function Explode(func) {
	var speed = 400;
	$('#DirButton2').css({'width': '100%', 'height': '100%', 'left': '0', 'top':'0', 'overflow':'hidden'});
	$('#DirButton3').css({'width': '100%', 'height': '100%', 'left': '0', 'top':'0', 'overflow':'hidden'});
	if (vert) {
		$('#DirButton').css({'top':(h/2)-(1.5*b), 'left':(w-b)/2});
		$('#DirButton3Box').css({'top':(h/2)-(0.5*b), 'left':(w-b)/2});
		$('#DirButton2Box').css({'top':h/2+(0.5*b), 'left':(w-b)/2});
		$('#DirButton').animate({top: '-=' + (h/2) + 'px'}, speed, 'easeInCubic');	
		$('#DirButton3').animate({left: '+=' + (w+b)/2 + 'px'}, speed, 'easeInCubic', func);
		$('#DirButton2').animate({top: '+=' + (h/2) + 'px'}, speed, 'easeInCubic', func);
	} else {
		$('#DirButton').css({'top':(h-b)/2, 'left':(w/2)-(1.5*b)});
		$('#DirButton3Box').css({'top':(h-b)/2, 'left':(w/2)-(0.5*b)});
		$('#DirButton2Box').css({'top':(h-b)/2, 'left':w/2+(0.5*b)});
		$('#DirButton').animate({left: '-=' + (w/2) + 'px'}, speed, 'easeInCubic');	
		$('#DirButton3').animate({top: '+=' + (h+b)/2 + 'px'}, speed, 'easeInCubic', func);
		$('#DirButton2').animate({left: '+=' + (w/2) + 'px'}, speed, 'easeInCubic', func);
	}
}

