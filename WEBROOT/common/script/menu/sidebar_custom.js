/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/** ******  left menu  *********************** **/
$(function () {
    //$('.sb-nav-md li ul').slideUp();
    //$('.sb-nav-md li').removeClass('active');
	$('.sb-nav-md li').off();
    $('.sb-nav-md li').on('click', function() {
    	var link;
    	if ($(this).is('.active')){
    		link = $('a', this).attr('href');
    	}else{
    		link = $('ul.li.a', this).attr('href');
    	}
        if(link) { 
            window.location.href = link;
        } else {
            if ($(this).is('.active')) {
                $(this).removeClass('active');
                $('ul', this).slideUp();
            } else {
                $('.sb-nav-md li').removeClass('active');
                $('.sb-nav-md li ul').slideUp();
                
                $(this).addClass('active');
                $('ul', this).slideDown();
            }
        }
    });
});

/* Sidebar Menu active class */
$(function () {
    var url = window.location;
    
    $('.sb-nav-md a[href="' + url + '"]').parent('li').addClass('current-page');
    $('.sb-nav-md a').filter(function () {
        return this.href == url;
    }).parent('li').addClass('current-page').parent('ul').slideDown().parent().addClass('active');
});

