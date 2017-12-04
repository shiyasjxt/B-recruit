!(function($){
	$(function(){

		var searchButtonSelector = "#r20_search-link";		
		$("form").first().keypress(function(e){
			if ( 13 == e.which )
			{
				$(searchButtonSelector).mousedown();
				$(searchButtonSelector).click();
				return false;
			}
		});
		// custom select
		if ( $.fn.customSelect )
		{
			$(".r20_search-field select").customSelect();
		}

	});
})(jQuery);