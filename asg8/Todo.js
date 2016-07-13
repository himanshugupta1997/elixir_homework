var To_do_list = new Array();

function Load()
{
	console.log("Loading");
	if(localStorage.getItem('To_Do_List')==null)
		{
			return;
		}
	To_do_list = JSON.parse(localStorage.getItem('To_Do_List'));
	ShowTodo();
	return;
}

function AddTodo()
{
	var W = $('#Work');
	var Work = W.val();
	if(Work == "")
		{
			window.alert("Null string cannot be added.");
			return;
		}
	console.log("Work is " + Work);
	W.val("");
	var temp = new Object();
	temp[0] = Work;
	temp[1] = false;
	To_do_list.push(temp);
	SaveTodo();
	ShowTodo();
}

function SaveTodo()
{
	var T = JSON.stringify(To_do_list);	
	localStorage.setItem('To_Do_List',T);


}

function ShowTodo()
{
	//No need of local storage here
	//Everything can be manipulated using Todo
	
	var L = $('#list');
	var str = '';
	for(var i = 0; i<To_do_list.length; i++)
		{
			if(To_do_list[i][1])
				{
					str = str + '<li id="l' + i +'">' +
					To_do_list[i][0] + '<input type="checkbox" checked="" id = "'+ i +'"onclick="action('+i+')"></li>';
				}
			else
				{
					str = str + '<li id="l' + i +'">' +
					To_do_list[i][0] + '<input type="checkbox" id="'+i+'" onclick="action('+i+')"></li>';
					
				}
			
		}
	L.html(str);
	for(var i = 0; i<To_do_list.length; i++)
		{
			//Strike off
			if(To_do_list[i][1])
				{
					$('#l'+i).css({'text-decoration':'line-through',
								  'font-size': '0.7em'});
					$('#'+i).attr('checked','true');
				}
		}
	
	//Finished
	
}

function action(arg)
{
	console.log("Action");
	console.log("value of arg is"+arg);
	var i = arg;
	if(!($('#'+arg).is(':checked')))
		{
			console.log("Inside first if");
			$('#'+i).attr('checked','false');
			$('#l'+i).css({'text-decoration':'none',
								  'font-size': '1em'});
			To_do_list[i][1] = false;
		}
	else
		{
			console.log("Inside second if");
			$('#l'+i).css({'text-decoration':'line-through',
								  'font-size': '0.7em'});
			$('#'+i).attr('checked','true');
			To_do_list[i][1] = true;
		}
	var T = JSON.stringify(To_do_list);
	localStorage.setItem('To_Do_List',T);
}

function D()
{
	//Lets do it
	if(To_do_list.length==0)
		{
			return;
		}
	var T = new Array;
	for(var i=0; i<To_do_list.length; i++)
		{
			if(To_do_list[i][1])
				{
					continue;
				}
			else
				{
					T.push(To_do_list[i]);
				}
			
		}
	To_do_list = T;
	var J = JSON.stringify(To_do_list);
	localStorage.setItem('To_Do_List',J);
	ShowTodo();
	
}

function Clear()
{
	$('#list').html("");
	To_do_list = [];
	localStorage.clear();
}



$('#Add_button').click(AddTodo);
$('#Clear_button').click(Clear);
$(document).on('load',Load());
$('#Delete_button').click(D);

