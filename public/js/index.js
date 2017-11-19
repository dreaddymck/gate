$( document ).ready( function () {

	$('form[name=gate]').submit(function(e){

		e.preventDefault();

		$('.btn-toggle').prop('disabled', true);
		$('.btn-toggle').val("Wait");

		$.post('/serial/toggle',{}).done(function(response){

			console.log(response)

			setTimeout(	function(){

				$('.btn-toggle').prop('disabled', false);
				$('.btn-toggle').val("Toggle");

			},3000);

		})
	})
});