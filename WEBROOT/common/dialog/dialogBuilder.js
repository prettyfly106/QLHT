/* This script and many more are available free online at
The JavaScript Source!! http://javascript.internet.com
Created by: Michael Leigeber | http://www.leigeber.com/ */

// global variables //
var TIMER = 5;
var SPEED = 10;
var rcount=0;
var dlgCallbackFunction;
var dialog_hide=0;
var parentWindow;//=dhxWins.window("w6")
// calculate the current window width //
// build/show the dialog box, populate the data and call the fadeDialog function //
function showDialog(parent,title,message,autohide,w,h,strLabel,r_callbackFunction){
	parentWindow=parent;
  dlgCallbackFunction=r_callbackFunction; 
  var dialog;
  if(!document.getElementById('dialog')) {
    dialog = document.createElement('div');
    dialog.id = 'dialog';
    dialog.alpha=0;
  } else {
    dialog = document.getElementById('dialog');
    dialog.style.visibility = "visible";
  }
  dialog.innerHTML = message;
  var output = "<table id='dialogTable' width=100% height=100%><tbody id='dialogTableBody'>";
  output+="<tr><td width=100% align='left' colspan='2'>"+message+"</td>";
  if(strLabel && strLabel.length>0) {
	  var tableData = strLabel.split("$");
	  
	  rcount=tableData.length;
	  for (var j = 0; j < tableData.length; j++) {
	  	if(tableData[j].indexOf("@")>0) {
	  		
	  		var label_option=tableData[j].split("@");
	  		//alert("label_option[1]="+label_option[1]);
	  		output += "<tr><td width=50%>" + label_option[0] + "</td><td>";
	  		output += "<select size='1' id='dlgText"+j+"' name=id='dlgText"+j+"' style='width: 80%; border-style: solid; border-width: 1; padding-left: 4; padding-right: 4; padding-top: 1; padding-bottom: 1; font-family:Verdana; font-size:12px; margin-top:2;margin-bottom:2' >";
	  		output +=label_option[1];//"<option value='-1'>Chọn...</option><option value='4' selected >Ninh Hòa</option>";
	  		output +="</select></td></tr>";
	  	}
	  	else {
			output += "<tr><td width=50%>" + tableData[j] + "</td><td><input type='text' id='dlgText"+j+"' value='' style='width: 100%'></td></tr>";
		}
	  }
	  output+="<tr><td width=50% align='left'><input type='button' value='Đồng ý' id='dlgOk' onclick='dlgOnOK();'></td>";
	  output+="<td align='right'><input type='button' value='Hủy bỏ' id='dlgCancel' onclick='hideDialog();'></td>";
  }
  output += "</tbody></table>";
  dialog.innerHTML = output;
  dialog.style.opacity = .00;
  dialog.style.filter = 'alpha(opacity=0)';
  dialog.alpha = 0;
  
  if(w>=0 && h>=0) {
		dialog.style.width=(w-20)+"px";
		dialog.style.height=(h-40)+"px";
  }
  dialog.style.top = "0px";
  dialog.style.left = "0px";
  
  dialog.timer = setInterval("fadeDialog(1)", TIMER);
  if(autohide>0) {
    window.setTimeout("hideDialog()", (autohide * 1000));
  } 
  dialog_hide=0;
  //alert(output);
  parentWindow.attachObject(dialog);
  parentWindow.center();
  parentWindow.show();
  
  parentWindow.setDimension(w,h);
}
// hide the dialog box //
function hideDialog() {
	dialog_hide=1;
  var dialog = document.getElementById('dialog');
  clearInterval(dialog.timer);
  dialog.timer = setInterval("fadeDialog(0)", TIMER);
}

// fade-in the dialog box //
function fadeDialog(flag) {
  if(flag == null) {
    flag = 1;
  }
  var dialog = document.getElementById('dialog');
  var value;
  if(flag == 1) {
    value = dialog.alpha + SPEED;
  } else {
    value = dialog.alpha - SPEED;
  }
  dialog.alpha = value;
  dialog.style.opacity = (value / 100);
  dialog.style.filter = 'alpha(opacity=' + value + ')';
  if(value >= 99) {
    clearInterval(dialog.timer);
    dialog.timer = null;
  } else if(value <= 1) {
    dialog.style.visibility = "hidden";
    parentWindow.hide();
    clearInterval(dialog.timer);
  }
}

function dlgOnOK() {
	var rt=''; 
	if(rcount>0) {
		for(var j=0;j<rcount;j++) {
			if(j>0) 
				rt =rt+'$'+ document.getElementById("dlgText"+j).value;
			else
				rt =document.getElementById("dlgText"+j).value;
		}
	}
	if(dlgCallbackFunction)
		dlgCallbackFunction(rt);
	hideDialog()
}

function waitHideEvent() {
	if (dialog_hide==0) {
		setTimeout(waitHideEvent, 100);        
		return;    
	} else {
		alert('finished');	
	}
}