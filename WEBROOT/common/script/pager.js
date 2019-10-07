(function(window, document, undefined) { 
function PagerCtr(cb) {
    this.id = "pagerContainer";     
    this.width = "100%";
    this.begin = 1;
    this.pageonside = 10;
    this.rowonpage = 10;
    this.rowcount = 0;
    this.currentpage = 1;
    this.maxpage = 10;
    this.topage = 0;
    this.extheight = 100;
    this.errorsmsg = '';
    this.defaulterrorsmsg = 'có lỗi không khai báo hàm gọi callback';
    this.next = '→';
    this.previous = '←'; 
    this.containerstyle = 'custom_pline';
    this.pagerstyle = 'custom_page';
    this.callback = cb || function() { this.errorsmsg = this.defaulterrorsmsg ; }; 
}

PagerCtr.prototype.Complie = function () { 
    var result = '<br><div class="' + this.containerstyle + '" style="width: ' + this.width + '">	<div style="CLEAR: both">';
    this.maxpage = parseInt(this.rowcount / this.rowonpage) + ((this.rowcount % this.rowonpage > 0) ? 1 : 0);
    this.topage = this.pageonside + this.begin -1 ;
    if (this.topage > this.maxpage) this.topage = this.maxpage;  
    if (this.begin > 1) result += '<div class="' + this.pagerstyle + '" id="' + this.id + (this.begin - 1).toString() + '" ><div>' + this.previous + '</div></div>';
    for (var i = this.begin; i <= this.topage; i++) {
        if (i != this.currentpage) 
        	result += '<div class="' + this.pagerstyle + '" id="' + (this.id + i.toString()) + '"><div style="WIDTH: 15px">' + i + '</div></div>';
        else
        	result += '<div class="' + this.pagerstyle + ' ' +  this.pagerstyle + '_active" id="' + (this.id + i.toString()) + '"><div style="WIDTH: 15px" class="' + this.pagerstyle + '_active">' + i + '</div></div>';
    }
    if (this.maxpage >= this.begin + this.pageonside) 
    	result += '<div class="' + this.pagerstyle + '" id="' + this.id + (this.pageonside + this.begin).toString() + '" ><div>' + this.next + '</div></div>';
    result += '<div class="' + this.pagerstyle + '_info"><div  align="left" style="margin-left:10px;padding:3px;">&nbsp;&nbsp;Từ dòng ' + ((this.currentpage - 1) * this.rowonpage + 1) 
    						 + ' tới dòng ' + Math.min(this.rowcount, (this.currentpage * this.rowonpage)) 
    						 + ' || Tổng số:' + (this.maxpage) + ' trang/' + this.rowcount + ' bản ghi</div></div>';
    return result;
}
PagerCtr.prototype.attachEventListener = function (pageid, pidx) {
	if (document.getElementById(pageid.toString() + pidx.toString()) != null)
		 document.getElementById(pageid.toString() + pidx.toString()).onclick = (function(that) {
             return function(event) {
                 try {	   
                 	that.ChangePage(pageid, pidx)
                 } catch(e) {}
             }
	     })(this);
}
PagerCtr.prototype.attachObject = function (id) {  
	this.id = id;	
	if (document.getElementById(this.id) != null)
		document.getElementById(this.id).innerHTML =  this.Complie();    
	for (var i = this.begin; i <= this.topage; i++) {    	
	    this.attachEventListener(this.id,i);	        
	} 
	this.attachEventListener(this.id, this.begin - 1);
	this.attachEventListener(this.id, this.pageonside + this.begin);	
}

PagerCtr.prototype.ChangePage = function (divid, idx) {	
	this.currentpage = idx;	
	if (this.currentpage > this.topage) this.begin = this.currentpage;	
	if (this.currentpage < this.begin) this.begin = this.currentpage - this.pageonside + 1;
	if (typeof this.callback === 'function') {
        this.callback(this);        
        if (this.errorsmsg)
    	{
        	alert(this.errorsmsg);
        	return false;
    	}
    }
	return true;	
}
dhtmlXGridObject.prototype.Paging= function (page) {
	var colNum = this.getColumnsNum();	
	var divpage = page.id;	
	var ftr="<div id='" + divpage + "' name='" + divpage + "'></div>";
	for(var i=1;i<colNum;i++) {
		ftr+=",#cspan";
	}
	this.attachFooter(ftr);		
	page.attachObject(divpage);
	this.entBox.style.height = parseInt(this.entBox.style.height) + page.extheight + 'px';		
}
window.PagerCtr = PagerCtr;
})(window, document);

