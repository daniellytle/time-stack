(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// GOTTA DO APP - DANIEL WILSON

console.log('app.js');

if ( (location.hash == "#_=_" || location.href.slice(-1) == "#_=_") ) {
    removeHash();
}

var date;

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
        field: document.getElementById('dateHolder'),
        minDate: new Date(),
        // format: 'MMM DD',
        yearRange:[new Date().getFullYear(),2020],
        onSelect: function() {
            date = this.getMoment();
            $('#datepicker').css({background:'none'});
            $('#datepicker').text(this.getMoment().format('MMM DD'));
        }
    });

//Inital Load
data.todos.sort(function(a,b) {return a.dueDate < b.dueDate});

for (var i = data.todos.length - 1; i >= 0; i--) {
	 var create = moment(data.todos[i].createDate);
	 var due 	= moment(data.todos[i].dueDate);
	 var today 	= moment();

	 var diff = due.diff(create, 'days');
	 var task = $("<div class='tOut'><div class='todo'>"+ data.todos[i].name +"</div><div class='status'>"+ diff +"d</div></div>");


	 console.log(diff);

	 if(diff < 2) {
	 	task.addClass('urgent');
	 } else if(diff < 4) {
	 	task.addClass('mild');
	 } else
	 	task.addClass('fine');

	task.appendTo('.todos').fadeIn('slow');
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
		$('.newTop').addClass('empty');
		return;
	}

	if(date == undefined) {
		$('#dateHolder').addClass('empty');
		return;
	}

	 var create = moment();
	 var due 	= date;

	console.log(create);
  console.log(due);

	var diff = due.diff(create, 'days');
  console.log(diff);
 	var task = $("<div class='tOut'><div class='maybe todo'>"+ $('#task').val() +"</div><div class='status'>"+ diff +"d</div></div>");


	if(diff < 2) {
	 	task.addClass('urgent');
	 } else if(diff < 4) {
	 	task.addClass('mild');
	 } else
	 	task.addClass('fine');

	task.appendTo('.todos').fadeIn('slow');

  var newTask = {
		name: $('#task').val(),
		dueDate: due._d,
    createDate: moment()._d
	};

	$.post("/api",{
		Fbid 	: data.facebookId,
		todo : newTask
	},function(success, err) {
		if(err)
		console.log(err);
		else
			console.log(success);
    newTask._id = success;
    data.todos.push(newTask);
		task.children().removeClass('maybe');

	});
})

$('.newTop').click(function() {
	$('#task').focus();
});

// Delete Todo
$(document).on('click','.tOut', function() {
  console.log('got delete');
	//find which task
	var i = 0;
	for (i = data.todos.length - 1; i >= 0; i--) {
		if(data.todos[i].name == $(this).children('.todo').text())
			break;
	};

	var Id = data.todos[i]._id;
	var FbId = data.facebookId;

	var obj = $(this);

	//delete the task
	$.ajax({
	    url: '/api' + '?' + $.param({"Id": Id, "FbId" : FbId}),
	    type: 'DELETE',
	    success: function() {
	    	console.log("good");
	    	obj.fadeOut(200).remove();
	    },
	    error: function(err) {
	    	obj.addClass('maybe');
	    }
	});

});

},{}]},{},[1]);
