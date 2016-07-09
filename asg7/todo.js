var To_do_list = new Array();
var Line_Through = new Array();

window.onload = function()
{
    console.log("Executing Window.onload()");
	if(localStorage.getItem('to_do_list') != null)
        {
            To_do_list  = localStorage.getItem('to_do_list');
			To_do_list = JSON.parse(To_do_list);
          //  To_do_list = To_do_list.split(',');
            if(localStorage.getItem('Line')!=null)
                {
                    Line_Through  = localStorage.getItem('Line');
					Line_Through = JSON.parse(Line_Through);
                   // Line_Through = Line_Through.split(',');
					console.log("Line");
					console.log(Line_Through);
					if(Line_Through[0]!=="")
						{
					for(var i = 0; i<Line_Through.length; i++)
						{
							Line_Through[i] = ((Line_Through[i])*10)/10;
						}
					console.log(Line_Through);
                }
					else
						{
							Line_Through = [];
						}
				}
            
            ShowTodo();
        }
}

function AddTodo()
{
    var str =  document.getElementById('Work_input').value;
	if(str=="")
		{
			window.alert("Please write something in the input box. Null string cannot be added");
		}
	else{
			To_do_list.push(str);
			document.getElementById('Work_input').value = "";
		   // document.getElementById('mylist').innerHTML+='<li>' + str + '</li>';
		    SaveTodo();
			ShowTodo();

	}
}

function SaveTodo()
{
    console.log("Inside local storage");
    console.log(To_do_list);
	var T = To_do_list;
	T = JSON.stringify(T);
    localStorage.setItem('to_do_list',T);                        
}

function ShowTodo()
{
    var list = "";
    T = new Array();
    T  = localStorage.getItem('to_do_list');
	T = JSON.parse(T);
   // T = T.split(',');
    console.log("inside Show todo");
    console.log(T);
    for(var i = 0; i<T.length; i++)
        {
            console.log("Printing list item ");
			console.log(i);
			list += '<li id ="l'+i+'">'+ T[i] +' <input type="checkbox" id=' + i +' onclick="C('+ i + ')" > </li>';
        }
    document.getElementById('mylist').innerHTML=list;
	console.log("Done Printing");
	console.log("line");
	console.log(Line_Through);
    for(var i = 0; i<T.length; i++)
        {
            
              if(Line_Through.indexOf(i)>-1)
                {
                    document.getElementById(i).checked = true;
                    console.log("show function passing control to C with");
					C(i);					
					console.log(i);
                }
            
        }
}

function C (arg)
{
    console.log("inside C with argument");
	console.log(arg);
	
    var Check = document.getElementById(arg);
    if(Check.checked == true)
        {
            
            console.log("Oh yess"); document.getElementById('l'+arg).style.textDecoration = "line-through";
            var str ="";
            str = arg;
            if(Line_Through.indexOf(arg)<=-1)
				{
					Line_Through.push(arg);
					var L = Line_Through;
					L = JSON.stringify(L);
					localStorage.setItem('Line',L);
				}
            
            
        }
    else
        {
            document.getElementById('l'+arg).style.textDecoration = "none";
            var index = Line_Through.indexOf(arg);
			console.log("Index is");
			console.log(index);
			var L = new Array();
			console.log("Line before loop");
			console.log(Line_Through);
			for(var i=0; i<Line_Through.length; i++)
				{
					if(i!==index)
						{
							console.log("i is"+i)
							L.push(Line_Through[i]);
						}
				}
	
			console.log(L);
			Line_Through = L;            
			console.log("Line Spliced");
			console.log(Line_Through);
            localStorage.removeItem('Line');
			var L = Line_Through;
			L = JSON.stringify(L);
            localStorage.setItem('Line',L);   
        }
    
}

function Clear()
{
   console.log("inside clear");
    localStorage.clear();
    To_do_list = [];
    Line_Through = [];
    document.getElementById('mylist').innerHTML="";
}

function D()
{
	var list = "";
    T = new Array();
    T  = localStorage.getItem('to_do_list');
	T = JSON.parse(T);
//    T = T.split(',');
    console.log("inside Show todo");
    console.log(T);
    for(var i = 0; i<T.length; i++)
        {
			if(Line_Through.indexOf(i)<=-1)
			{console.log("Printing list item ");
			console.log(i);
			list += '<li id ="l'+i+'">'+ T[i] +' <input type="checkbox" id=' + i +' onclick="C('+ i + ')" > </li>';
			}
           
          }
    document.getElementById('mylist').innerHTML=list;
	
	To_do_list = [];
	
	for(var i = 0; i<T.length; i++)
        {
			if(Line_Through.indexOf(i)<=-1)
			{
				To_do_list.push(T[i]);
			}
           
          }
	localStorage.clear();
	SaveTodo();
	Line_Through = [];
	if(localStorage.getItem('Line')!=null)
	{
		localStorage.removeItem('Line');
	}
	if(To_do_list.length == 0)
		{
			localStorage.removeItem('to_do_list');
		}
		
}