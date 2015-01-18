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
data.todos.sort(function(a,b) {return a.dueDate < b.dueDate});

var oneDay = 24*60*60*1000;
var date = new Date();
for (var i = data.todos.length - 1; i >= 0; i--) {
	 var task = $("<div class='todo'>"+ data.todos[i].name +"</div>");
	 
	 if(data.todos[i].dueDate < "Jan 21") {
	 	console.log("urg");
	 	task.addClass('urgent');
	 }
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

