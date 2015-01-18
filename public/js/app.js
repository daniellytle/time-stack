(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// GOTTA DO APP - DANIEL WILSON

console.log('app.js');

if (window.location.hash && window.location.hash == '#_=_')
        window.location.href = '';

var picker = new Pikaday(
    {
        field: document.getElementById('datepicker'),
        minDate: new Date(),
        yearRange: [2000,2020],
        format: 'MMM DD'
        // onSelect: function() {
        //     var date = document.createTextNode(this.getMoment().format('M-DD') + ' ');
        //     document.getElementById('selected').appendChild(date);
        // }
    });

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

 	var task = "<div class='todo'>"+ $('#task').val() +"</div>";
	$(task).appendTo('.todos').fadeIn('slow');

	$.post("/api",{
		name: $('#task').val(),
		dueDate: $('#datepicker').val()
	},function(err, success) {
		if(err)
			console.log(err);
	});

})


},{}]},{},[1]);
