(function()
{
 "use strict";
 var Global,RegistrationPage,Client,RegistrationPage_Templates,WebSharper,UI,Next,Var,List,Doc,Concurrency,Remoting,AjaxRemotingProvider,View;
 Global=window;
 RegistrationPage=Global.RegistrationPage=Global.RegistrationPage||{};
 Client=RegistrationPage.Client=RegistrationPage.Client||{};
 RegistrationPage_Templates=Global.RegistrationPage_Templates=Global.RegistrationPage_Templates||{};
 WebSharper=Global.WebSharper;
 UI=WebSharper&&WebSharper.UI;
 Next=UI&&UI.Next;
 Var=Next&&Next.Var;
 List=WebSharper&&WebSharper.List;
 Doc=Next&&Next.Doc;
 Concurrency=WebSharper&&WebSharper.Concurrency;
 Remoting=WebSharper&&WebSharper.Remoting;
 AjaxRemotingProvider=Remoting&&Remoting.AjaxRemotingProvider;
 View=Next&&Next.View;
 Client.RegPage=function()
 {
  var rvUname,rvPw1,rvPw2,content,t,t$1,t$2,t$3,S,a;
  rvUname=Var.Create$1("");
  rvPw1=Var.Create$1("");
  rvPw2=Var.Create$1("");
  content=RegistrationPage_Templates.registration((t=(t$1=(t$2=(t$3=List.T.Empty,new List.T({
   $:1,
   $0:{
    $:6,
    $0:"uname",
    $1:rvUname
   },
   $1:t$3
  })),new List.T({
   $:1,
   $0:{
    $:6,
    $0:"password1",
    $1:rvPw1
   },
   $1:t$2
  })),new List.T({
   $:1,
   $0:{
    $:6,
    $0:"password2",
    $1:rvPw2
   },
   $1:t$1
  })),(S=function(a$1,a$2)
  {
   return Client.Signup(rvUname,rvPw1,rvPw2,a$1,a$2);
  },new List.T({
   $:1,
   $0:{
    $:4,
    $0:"signup",
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
  return Doc.Concat([(a=[Doc.TextNode("Registration")],Doc.Element("h1",[],a)),content]);
 };
 Client.Signup=function(uname,pw1,pw2,a,a$1)
 {
 };
 Client.Main=function(uname)
 {
  var rvUname,rvPassword,title,a,u,a$1,content,t,t$1,t$2,S;
  rvUname=Var.Create$1("");
  rvPassword=Var.Create$1("");
  title=uname==null?(a=[Doc.TextNode("Login")],Doc.Element("h1",[],a)):(u=uname.$0,(a$1=[Doc.TextNode("Welcome "+u+"!")],Doc.Element("h1",[],a$1)));
  content=uname==null?RegistrationPage_Templates.login((t=(t$1=(t$2=List.T.Empty,new List.T({
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
  })),(S=function(a$2,a$3)
  {
   return Client.login(rvUname,rvPassword,a$2,a$3);
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
  })))):Doc.Button("Logout",[],function()
  {
   Concurrency.Start(Concurrency.Delay(function()
   {
    var x;
    x=(new AjaxRemotingProvider.New()).Async("RegistrationPage:RegistrationPage.Server.Logout:-829366048",[]);
    return Concurrency.Bind(x,function()
    {
     Global.window.location.reload();
     return Concurrency.Return(null);
    });
   }),null);
  });
  return Doc.Concat([title,content]);
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
     x$2=(new AjaxRemotingProvider.New()).Async("RegistrationPage:RegistrationPage.Server.Login:-667848513",[{
      Username:a$2,
      Password:a$3
     }]);
     return Concurrency.Bind(x$2,function(a$4)
     {
      var a$5;
      a$5=(a$4!=null?a$4.$==1:false)?(Global.alert("Succesfully logged in"),Global.window.location.reload(),Concurrency.Return(null)):(Global.alert("Invalid login data"),Concurrency.Return(null));
      return Concurrency.Combine(a$5,Concurrency.Delay(function()
      {
       return Concurrency.Return(null);
      }));
     });
    });
   });
  }),null);
 };
 RegistrationPage_Templates.login=function(h)
 {
  var n,e;
  n={
   $:1,
   $0:"login"
  };
  e=function()
  {
   return Global.jQuery.parseHTML("<div class=\"login-class\">\r\n    <div>Username: </div>\r\n    <input placeholder=\"required\" ws-var=\"UName\" type=\"text\">\r\n    <div>Password: </div>\r\n    <input type=\"password\" placeholder=\"required\" ws-var=\"Password\"><br>\r\n    <button class=\"login-btn\" ws-onclick=\"SignIn\">Sign in!</button>\r\n</div>");
  };
  return h?Doc.GetOrLoadTemplate("login",n,e,h):Doc.PrepareTemplate("login",n,e);
 };
 RegistrationPage_Templates.registration=function(h)
 {
  var n,e;
  n={
   $:1,
   $0:"registration"
  };
  e=function()
  {
   return Global.jQuery.parseHTML("<div class=\"reg-class\">\r\n    <div>Username</div>\r\n    <input placeholder=\"required\" ws-var=\"UName\" type=\"text\">\r\n    <div>Password: </div>\r\n    <input type=\"password\" placeholder=\"required\" ws-var=\"Password1\">\r\n    <div>Password Again: </div>\r\n    <input type=\"password\" placeholder=\"required\" ws-var=\"Password2\"><br>\r\n    <button class=\"login-btn\" ws-onclick=\"SignUp\">Sign up</button>\r\n</div>");
  };
  return h?Doc.GetOrLoadTemplate("registration",n,e,h):Doc.PrepareTemplate("registration",n,e);
 };
}());
