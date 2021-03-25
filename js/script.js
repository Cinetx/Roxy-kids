
$(document).ready(function(params) {
    $("body").on("click", "[data-calendar-open]", function(e){
		if ($(this).parents(".calendarParent").find("[data-calendar-input]").hasClass("__active")) {
			$(this).parents(".calendarParent").find("[data-calendar-input]").removeClass("__active");
			$(this).parents(".calendarParent").find(".calendarParent-main").removeClass("__open");
		}
		else {
			$(this).parents(".calendarParent").find("[data-calendar-input]").addClass("__active");
			$(this).parents(".calendarParent").find(".calendarParent-main").addClass("__open");
		}
	});
    // календарь
    moment.locale('ru');
    let now = moment();
    let todayDate = now.format('YYYY-MM-DD');
    let todayDate_t = now.format('DD.MM.YYYY');
    $(".inline--calendar").each(function(){
        let _this = $(this);
        $(this).dateRangePicker({
            language: 'ru',
            format: 'DD.MM.YYYY',
            alwaysOpen:true,
            startOfWeek: 'monday',

            // startDate: todayDate_t,
            container: _this[0],
            inline:true,
            singleDate : false,
            singleMonth: true,
            customArrowPrevSymbol: '',
            customArrowNextSymbol: '',
            showShortcuts: false,
            showTopbar: false,

            separator : ' - ',
            setValue: function(s,s1,s2)
            {
                // _this.parents(".calendarParent").find(".calendar--value").val(s);
                _this.parents(".filter__fieldset").find(".button_calendar").text(s);
            }
        });
        $(this).find(".clear--date").click(function(evt) {
            evt.stopPropagation();
            $(this).parents(".inline--calendar").data('dateRangePicker').clear();
        });
    });
});


