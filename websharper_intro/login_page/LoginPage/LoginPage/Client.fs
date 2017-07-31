namespace LoginPage

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next
open WebSharper.UI.Next.Client
open WebSharper.UI.Next.Html

[<JavaScript>]
module Client =
    
    type LoginTemplate = Templating.Template<"./login.html">
    
    let login(uname: IRef<string>)(passwd: IRef<string>) _ _ =
        async{
            let! un = View.GetAsync uname.View
            let! pw = View.GetAsync passwd.View
            let li =
                {
                    Username = un
                    Password = pw
                }:Server.LoginInfo
            let! login = Server.Login li
            match login with
            | None -> JS.Alert("Invalid login data")
            | Some u -> JS.Alert("Succesfully logged in");JS.Window.Location.Reload()
            return()
        }
        |> Async.Start

    let Main (uname: string option) =
        let rvUname = Var.Create ""
        let rvPassword = Var.Create ""
        let loggedin = defaultArg uname ""

        let title =
            match uname with
            | Some u -> h1 [text ("Welcome " + u + "!")]
            | None -> h1 [text "Login"]
        let content =
            match uname with
            | Some _ -> Doc.Button "Logout" [] (fun _  -> 
                async {
                    do! Server.Logout()
                    JS.Window.Location.Reload()
                } |> Async.Start)
            | None -> 
                LoginTemplate.Login()
                //       .LoggedIn(loggedin)
                    .UName(rvUname)
                    .Password(rvPassword)
                    .SignIn(login rvUname rvPassword)
                    .Elt()
        Doc.Concat[
            title
            content
        ]
        