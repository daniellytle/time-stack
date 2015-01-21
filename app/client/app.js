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
        // format: 'MMM DD',
        yearRange:[new Date().getFullYear(),2020],
        onSelect: function() {
            var date = document.createTextNode(this.getMoment().format('Do MMMM YYYY') + ' ');
            //$('selected').appendChild(date);
            console.log(date);
            console.log($("selected"))
        }
    });

//Inital Load
data.todos.sort(function(a,b) {return a.dueDate < b.dueDate});

for (var i = data.todos.length - 1; i >= 0; i--) {
	 var create = moment(data.todos[i].createDate);
	 var due 	= moment(data.todos[i].dueDate,"YYYY-MM-DD");
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

	if($('#datepicker').val() == "") {
		$('#dateHolder').addClass('empty');
		return;
	}
	 var create = moment();
	 var due 	= moment($('#datepicker').val());

	console.log(create, due);

	 var diff = due.diff(create, 'days');

	var d = $('#datepicker').val();

 	var task = $("<div class='tOut'><div class='maybe todo'>"+ $('#task').val() +"</div><div class='status'>"+ diff +"d</div></div>");


	if(diff < 2) {
	 	task.addClass('urgent');
	 } else if(diff < 4) {
	 	task.addClass('mild');
	 } else 
	 	task.addClass('fine');

	task.appendTo('.todos').fadeIn('slow');

	data.todos.push( {
		name: $('#task').val(),
		dueDate: $('#datepicker').val()
	})

	$.post("/api",{
		fbid 	: $('.hidden').text(),
		todo: {
			name: $('#task').val(),
			dueDate: $('#datepicker').val(),
			createDate: moment()._d
		}
	},function(err, success) {
		if(err)
		console.log(err);
		else
			console.log('suc')
		task.children().removeClass('maybe');
	});
})

$('.tOut').hover(function() {
	$(this).css({'margin-left':'10px'});
}, function() {
	$(this).css({'margin-left':'0px'});
})

$('.newTop').click(function() {
	$('#task').focus();
});

$('.tOut').click(function() {
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
	    	obj.fadeOut(200);
	    },
	    error: function(err) {
	    	console.log("err");
	    }
	});

})
