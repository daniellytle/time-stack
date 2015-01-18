// GOTTA DO APP - DANIEL WILSON

console.log('app.js');

if (window.location.hash && window.location.hash == '#_=_')
   		history.replaceState('/',{},{});

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

 	var task = "<div class='maybe todo'>"+ $('#task').val() +"</div>";
	$(task).appendTo('.todos').fadeIn('slow');

	$.post("/api",{
		fbid 	: $('.hidden').text(),
		todo: {
			name: $('#task').val(),
			dueDate: $('#datepicker').val()
		}
	},function() {
		console.log('suc')
			$('.todo').removeClass('maybe');
	});

})

