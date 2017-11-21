$( document ).ready( function () {

	$('form[name=gate]').submit(function(e){

		e.preventDefault();

		$('.btn-toggle').prop('disabled', true);
		$('.btn-toggle').val("Wait");

		$.post('/serial/toggle',{}).done(function(response){

			//console.log(response.status)

			if( response.status ){
				message.display(response.status, "message_danger");
			}

			setTimeout(	function(){

				$('.btn-toggle').prop('disabled', false);
				$('.btn-toggle').val("Toggle");

			},3000);

		})
	}),
    $(".theme-selection").on('click', 'li a', function(e){

    	e.preventDefault();

    	$.get('/preferences/theme', {theme: $(this).attr("value")} ).done(function(response){
    		location.reload()
		})

    });
});