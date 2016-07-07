var op1=Math.max();
var op;
var op2 = Math.max();
var op3 = 0;
var f1 = 0;

function setnumber(arg)
{
  //console.log("hello");
  document.getElementById('result_screen').innerHTML = "";
  document.getElementById('show_screen').innerHTML+=arg;

}



function getop(operator)
{
  if(document.getElementById('show_screen').innerHTML.length==0)
  {
    document.getElementById('show_screen').innerHTML = "";
    document.getElementById('result_screen').innerHTML = "Invalid Syntax";
  }
  else{

  if(op3 == 1)
  {
    var str = document.getElementById('show_screen').innerHTML;
    var pos = str.indexOf(".")
    var n1 = str.slice(0,pos+1);
    var n2 = str.slice(pos+1,str.length);
    op1 = (n1*10)/10;
    var l = n2.length;
    l = Math.pow(10,l);
    var O = (n2*10)/10;
    O = O/l;
    op1 += O;
    op3=0;

  }
  else{

  op1 =((document.getElementById('show_screen').innerHTML)*10)/10;
}
  op = operator;
  document.getElementById('show_screen').innerHTML = "";
}
}



function result ()
{
  if(op3 == 1)
  {

    var str = document.getElementById('show_screen').innerHTML;
    var pos = str.indexOf(".")
    var n1 = str.slice(0,pos+1);
    var n2 = str.slice(pos+1,str.length);
    op2 = (n1*10)/10;
    var l = n2.length;
    l = Math.pow(10,l);
    var O = (n2*10)/10;
    O = O/l;
    op2 += O;
    op3 = 0;

  }
  else {
      op2 = ((document.getElementById('show_screen').innerHTML)*10)/10;
  }


  if(op1 == Math.max()||op2 == Math.max())
  {
    console.log("hello");
    document.getElementById('result_screen').innerHTML = "Invalid Syntax";
    document.getElementById('show_screen').innerHTML = "";

  }

else{

  var res;
  var flag = 1;

document.getElementById('show_screen').innerHTML = "";
  switch (op) {
    case '+': res = op1 + op2;
      break;
    case 'x': res = op1 * op2;
      break;
    case '/': if (op2 == 0) {
       help();
       flag = 0;

    }

    res = op1 / op2;

      break;
    case '-': res = op1 - op2;
      break;
    case '^' : res = Math.pow(op1,op2);
               break;
    case '%': if (op2 == 0) {
       help();
       flag = 0;

    }

            res = op1%op2;

      break;

    default: document.getElementById('result_screen').innerHTML = "Invalid Syntax";
             flag = 0;

  }
  if(flag==1)
  {
    /*document.getElementById('result_screen').style.color="darkgreen";
      document.getElementById('result_screen').style.background="lightcyan";*/
      if(f1==1)
      {
        res = res.toFixed(3);
      }
      if(isNaN(res))
      {
          document.getElementById('result_screen').innerHTML = "Invalid Syntax";
            document.getElementById('show_screen').innerHTML = "";

      }
      else{
    document.getElementById('result_screen').innerHTML =  "Result: " + res;
}
  }

}
}

function cl ()
{
//  console.log("HELLO");

  document.getElementById('result_screen').innerHTML = "";
  document.getElementById('show_screen').innerHTML = "";
  /*document.getElementById('result_screen').style.color="darkgrey";
    document.getElementById('result_screen').style.background="black";*/
  op1=Math.max();
   op2 = Math.max();
   op3 = 0;
   f1 = 0;
}

function decimal()
{
 setnumber('.');
  op3 = op3+1;
  f1=1;
  if(op3 == 2)
  {
    document.getElementById('result_screen').innerHTML = "Invalid Syntax";
    document.getElementById('show_screen').innerHTML = "";
    //document.getElementById('result_screen').innerHTML = "";
    document.getElementById('show_screen').innerHTML = "";
  /*  document.getElementById('result_screen').style.color="darkgrey";
      document.getElementById('result_screen').style.background="black";*/
    op1=Math.max();
     op2 = Math.max();
     op3 = 0;
     f1 = 0;

}
}

function help ()
{
  document.getElementById('result_screen').innerHTML = "Invalid Syntax";
  document.getElementById('show_screen').innerHTML = "";
  //document.getElementById('result_screen').innerHTML = "";
  document.getElementById('show_screen').innerHTML = "";
/*  document.getElementById('result_screen').style.color="darkgrey";
    document.getElementById('result_screen').style.background="black";*/
  op1=Math.max();
   op2 = Math.max();
   op3 = 0;
   f1 = 0;

}
