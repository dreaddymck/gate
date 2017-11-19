$( document ).ready( function () {

	$('form[name=gate]').submit(function(e){

		e.preventDefault();

		$('.btn-toggle').prop('disabled', true);

		$.post('/serial/toggle',{}).done(function(response){

			console.log(response)

			$('.btn-toggle').prop('disabled', false);

		})
	})
});