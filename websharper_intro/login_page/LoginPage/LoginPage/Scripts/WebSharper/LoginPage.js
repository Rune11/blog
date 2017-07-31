(function()
{
 "use strict";
 var Global,LoginPage,Client,LoginPage_Templates,WebSharper,UI,Next,Var,List,Concurrency,View,Remoting,AjaxRemotingProvider,Doc;
 Global=window;
 LoginPage=Global.LoginPage=Global.LoginPage||{};
 Client=LoginPage.Client=LoginPage.Client||{};
 LoginPage_Templates=Global.LoginPage_Templates=Global.LoginPage_Templates||{};
 WebSharper=Global.WebSharper;
 UI=WebSharper&&WebSharper.UI;
 Next=UI&&UI.Next;
 Var=Next&&Next.Var;
 List=WebSharper&&WebSharper.List;
 Concurrency=WebSharper&&WebSharper.Concurrency;
 View=Next&&Next.View;
 Remoting=WebSharper&&WebSharper.Remoting;
 AjaxRemotingProvider=Remoting&&Remoting.AjaxRemotingProvider;
 Doc=Next&&Next.Doc;
 Client.Main=function(uname)
 {
  var rvUname,rvPassword,t,t$1,t$2,S;
  rvUname=Var.Create$1("");
  rvPassword=Var.Create$1("");
  return LoginPage_Templates.login((t=(t$1=(t$2=List.T.Empty,new List.T({
   $:1,
   $0:{
    $:6,
    $0:"uname",
    $1:rvUname
   },
   $1:t$2
  })),new List.T({
   $:1,
   $0:{
    $:6,
    $0:"password",
    $1:rvPassword
   },
   $1:t$1
  })),(S=function(a,a$1)
  {
   return Client.login(rvUname,rvPassword,a,a$1);
  },new List.T({
   $:1,
   $0:{
    $:4,
    $0:"signin",
    $1:function($1)
    {
     return function($2)
     {
      return S($1,$2);
     };
    }
   },
   $1:t
  }))));
 };
 Client.login=function(uname,passwd,a,a$1)
 {
  Concurrency.Start(Concurrency.Delay(function()
  {
   var x;
   x=View.GetAsync(uname.RView());
   return Concurrency.Bind(x,function(a$2)
   {
    var x$1;
    x$1=View.GetAsync(passwd.RView());
    return Concurrency.Bind(x$1,function(a$3)
    {
     var x$2;
     x$2=(new AjaxRemotingProvider.New()).Async("LoginPage:LoginPage.Server.Login:380063967",[{
      Username:a$2,
      Password:a$3
     }]);
     return Concurrency.Bind(x$2,function(a$4)
     {
      var a$5;
      a$5=(a$4!=null?a$4.$==1:false)?(Global.alert("Succesfully logged in"),Concurrency.Return(null)):(Global.alert("Invalid login data"),Concurrency.Return(null));
      return Concurrency.Combine(a$5,Concurrency.Delay(function()
      {
       return Concurrency.Return(null);
      }));
     });
    });
   });
  }),null);
 };
 LoginPage_Templates.login=function(h)
 {
  var n,e;
  n={
   $:1,
   $0:"login"
  };
  e=function()
  {
   return Global.jQuery.parseHTML("<div class=\"login-class\">\r\n    <div>Username: </div>\r\n    <input placeholder=\"required\" ws-var=\"UName\" type=\"text\">\r\n    <div>Password: </div>\r\n    <input type=\"password\" placeholder=\"required\" ws-var=\"Password\">\r\n    <button class=\"login-btn\" ws-onclick=\"SignIn\">Sign in!</button>\r\n</div>");
  };
  return h?Doc.GetOrLoadTemplate("login",n,e,h):Doc.PrepareTemplate("login",n,e);
 };
}());
