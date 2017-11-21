let message = {

		display: function(message, type){

			if(typeof message === 'object'){
				message = JSON.stringify(message)
			}
			$('.' + type).text(message);
			$('.' + type).removeClass('hidden');
			$('.' + type).show();

			setTimeout(function()
			{
				$('.' + type).fadeOut('slow');
			},2000);

		}

}

