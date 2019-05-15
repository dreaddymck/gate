$(document).ready(function () {

	$('form[name=gate]').submit(function (e) {

		e.preventDefault();

		$('.btn-toggle').prop('disabled', false);
		$('.btn-toggle').removeClass('btn-primary');
		$('.btn-toggle').addClass('btn-warning');
		$('.btn-toggle').val("Please wait");

		$.post('/serial/toggle', {}).done(function (response) {

			//console.log(response.status)

			if (response.status) {
				message.display(response.status, "message_danger");
			}

			setTimeout(function () {

				$('.btn-toggle').prop('disabled', false);
				$('.btn-toggle').removeClass('btn-warning');
				$('.btn-toggle').addClass('btn-primary');
				$('.btn-toggle').val("Toggle Open/Close");

			}, 3000);

		})
	}),
	$(".theme-selection").on('click', 'li a', function (e) {

		e.preventDefault();

		$.get('/preferences/theme', {
			theme: $(this).attr("value")
		}).done(function (response) {
			location.reload()
		})

	});

	$('.btn-toggle').prop('disabled', false);
	$('.btn-toggle').removeClass('btn-warning');
	$('.btn-toggle').addClass('btn-primary');
	$('.btn-toggle').val("Toggle Open/Close");
	if(typeof globals !== 'undefined'){
		if(globals.image){
			let img=new Image();
			img.src = globals.image
			img.onload = function(){
				$('#image').attr({"src": img.src, "width": "100%", "height": "100%" })
			}			
		}
	}
});