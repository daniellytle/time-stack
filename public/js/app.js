(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// GOTTA DO APP - DANIEL WILSON

console.log('app.js');

if ( (location.hash == "#_=_" || location.href.slice(-1) == "#_=_") ) {
    removeHash();
}

function removeHash() {
    var scrollV, scrollH, loc = window.location;
    if ('replaceState' in history) {
        history.replaceState('', document.title, loc.pathname + loc.search);
    } else {
        // Prevent scrolling by storing the page's current scroll offset
        scrollV = document.body.scrollTop;
        scrollH = document.body.scrollLeft;

        loc.hash = '';

        // Restore the scroll offset, should be flicker free
        document.body.scrollTop = scrollV;
        document.body.scrollLeft = scrollH;
    }
}


var picker = new Pikaday(
    {
        field: document.getElementById('datepicker'),
        minDate: new Date(),
        format: 'MMM DD',
        yearRange:[new Date().getFullYear(),2020],
        onSelect: function() {
            var date = document.createTextNode(this.getMoment().format('Do MMMM YYYY') + ' ');
            document.getElementById('selected').appendChild(date);
        }
    });

//Inital Load
console.log(data);
var oneDay = 24*60*60*1000;
var date = new Date();
for (var i = data.todos.length - 1; i >= 0; i--) {
	 var task = "<div class='todo'>"+ data.todos[i].name +"</div>";
	 var diff =  Math.round(Math.abs((date.getTime() - new Date(data.todos[i].dueDate).getTime())/(oneDay)));
	 console.log(diff);
	 if(diff < 3)
	 	$(task).addClass('urgent');
	$(task).appendTo('.todos').fadeIn('slow');
};

//Enter Click
$('body').keydown(function (e){
    if(e.keyCode == 13){
        $('#goButton').click();
    }
})

//Submit new todo
$('#goButton').click(function() {
	//check empty
	if($('#task').val() == "") {
		$('#newTop').focus();
		return;
	}

	if($('#datepicker').val() == "") {
		$('#datepicker').focus();
		return;
	}

 	var task = "<div class='maybe todo'>"+ $('#task').val() +"</div>";
	$(task).appendTo('.todos').fadeIn('slow');

	data.todos.push( {
		name: $('#task').val(),
		dueDate: $('#datepicker').val()
	})

	$.post("/api",{
		fbid 	: $('.hidden').text(),
		todo: {
			name: $('#task').val(),
			dueDate: $('#datepicker').val()
		}
	},function(err) {
		if(err)
		console.log(err);
		else
			console.log('suc')
		$('.todo').removeClass('maybe');
	});

})


},{}]},{},[1]);
